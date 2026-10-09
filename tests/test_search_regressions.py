"""Search and legacy-session regressions; use an isolated local database only."""
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app


class SearchRegressionTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-search-tests-')
        self.original_db, self.original_env = app.DB_PATH, app.ENV_PATH
        self.original_config = dict(app.CONFIG)
        app.DB_PATH = Path(self.temp.name) / 'kitchen.db'
        app.ENV_PATH = Path(self.temp.name) / '.env'
        app.CONFIG.clear()
        app.CONFIG.update(api_key='', model=app.DEFAULT_MODEL)
        app.init_db()
        app.import_personal_recipes({'recipes': [
            {'id': 'user-test-curry', 'name': '西式咖喱', 'region': '西方',
             'area_group': '欧洲', 'area': '英国', 'diet': 'vegan',
             'minutes': 12, 'ingredients': ['土豆', '咖喱粉'], 'steps': ['煮熟。']},
            {'id': 'user-test-crab', 'name': '清蒸蟹', 'minutes': 12,
             'ingredients': ['蟹'], 'steps': ['蒸熟。']},
        ]})

    def tearDown(self):
        app.DB_PATH, app.ENV_PATH = self.original_db, self.original_env
        app.CONFIG.clear()
        app.CONFIG.update(self.original_config)
        self.temp.cleanup()

    def test_dictionary_single_character_foods_match_without_generic_fallback(self):
        for query in ('虾', '鱼', '蟹'):
            with self.subTest(query=query):
                result = app.search_recipes(query, limit=8)
                self.assertTrue(result)
                self.assertTrue(all(any(query in i['name'] for i in r['ingredients'])
                                    for r in result))
        for query in ('香', '未收录的菜9f84', '推荐西式的未收录的菜9f84'):
            self.assertEqual(app.search_recipes(query), [])

    def test_conditional_followup_keeps_food_topic_and_saves_it_separately(self):
        first = app.handle_chat({'message': '咖喱'})
        second = app.handle_chat({'message': '再推荐一道西式的，15 分钟内，4 人份',
                                  'session_id': first['session_id']})
        self.assertEqual([r['id'] for r in second['sources']], ['user-test-curry'])
        self.assertEqual(second['context']['region'], '西方')
        self.assertEqual(second['context']['time'], 15)
        self.assertEqual(second['context']['servings'], 4)
        with app.connect() as db:
            saved = json.loads(db.execute('SELECT constraints FROM sessions WHERE id=?',
                                         (first['session_id'],)).fetchone()[0])
        self.assertEqual(saved['topic'], '咖喱')
        self.assertNotIn('topic', saved['values'])
        app.init_db()
        again = app.handle_chat({'message': '还有什么建议？', 'session_id': first['session_id']})
        self.assertEqual(again['sources'], second['sources'])

    def test_new_unknown_topic_replaces_previous_even_in_followup_framing(self):
        first = app.handle_chat({'message': '咖喱'})
        second = app.handle_chat({'message': '再推荐一道未收录的菜9f84',
                                  'session_id': first['session_id']})
        again = app.handle_chat({'message': '再推荐一道西式的',
                                 'session_id': first['session_id']})
        self.assertEqual(second['sources'], [])
        self.assertEqual(again['sources'], [])
        self.assertEqual(again['match_status'], 'no_match')

    def test_condition_reset_and_sidebar_edits_do_not_replace_food_topic(self):
        first = app.handle_chat({'message': '西式咖喱，15 分钟内，纯素'})
        second = app.handle_chat({'message': '再推荐一道，不限饮食，不限菜式，12 分钟内',
                                  'session_id': first['session_id'],
                                  'context': {'time': 5, 'servings': 3},
                                  'context_overrides': ['time', 'servings']})
        self.assertEqual([r['id'] for r in second['sources']], ['user-test-curry'])
        self.assertEqual(second['context']['time'], 12)
        self.assertEqual(second['context']['servings'], 3)
        self.assertEqual(second['context']['diet'], '')
        self.assertEqual(second['context']['region'], '')

    def test_inherited_topic_does_not_repeat_old_region_or_time(self):
        first = app.handle_chat({'message': '推荐 30 分钟内中式咖喱'})
        followup = app.handle_chat({'message': '再推荐一道西式的，15 分钟内',
                                    'session_id': first['session_id']})
        self.assertEqual([r['id'] for r in followup['sources']], ['user-test-curry'])
        impossible = app.handle_chat({'message': '再推荐一道，5 分钟内',
                                      'session_id': first['session_id']})
        self.assertEqual(impossible['sources'], [])
        self.assertEqual(impossible['match_status'], 'no_match')

    def test_real_two_turn_legacy_history_recovers_lost_conditions_on_read(self):
        sid = 'e' * 32
        initial = app.validate_context({'time': 15, 'servings': 4, 'diet': 'vegan',
                                        'equipment': '电磁炉'})
        lost = app.validate_context({'region': '西方', 'equipment': '电磁炉'})
        with app.connect() as db:
            db.execute('INSERT INTO sessions(id,title) VALUES(?,?)', (sid, '旧版对话'))
            for text, context in [('推荐 15 分钟内的纯素菜，4 人份', initial),
                                  ('再推荐一道西式的', lost)]:
                db.execute('INSERT INTO messages(session_id,role,content,context) VALUES(?,?,?,?)',
                           (sid, 'user', text, app.json_text(context)))
                db.execute('INSERT INTO messages(session_id,role,content,mode) VALUES(?,?,?,?)',
                           (sid, 'assistant', '旧版回答', 'local'))
        recovered = app.read_session(sid)['context']
        for key, value in {'time': 15, 'servings': 4, 'diet': 'vegan',
                           'region': '西方', 'equipment': '电磁炉'}.items():
            self.assertEqual(recovered[key], value)
        result = app.handle_chat({'message': '咖喱', 'session_id': sid})
        self.assertEqual([r['id'] for r in result['sources']], ['user-test-curry'])
        with app.connect() as db:
            original = db.execute('SELECT context FROM messages WHERE session_id=? ORDER BY id',
                                  (sid,)).fetchone()[0]
        self.assertEqual(json.loads(original), initial)

    def test_legacy_explicit_updates_replay_in_message_order(self):
        sid = 'f' * 32
        with app.connect() as db:
            db.execute('INSERT INTO sessions(id,title) VALUES(?,?)', (sid, '旧条件变化'))
            for text in ('推荐 15 分钟内的纯素菜，4 人份', '改成 25 分钟，2 人份，不限饮食'):
                db.execute('INSERT INTO messages(session_id,role,content,context) VALUES(?,?,?,?)',
                           (sid, 'user', text, app.json_text(app.validate_context({}))))
        recovered = app.read_session(sid)['context']
        self.assertEqual((recovered['time'], recovered['servings'], recovered['diet']), (25, 2, ''))


if __name__ == '__main__':
    unittest.main()
