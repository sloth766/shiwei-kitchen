"""Web chat integration uses an isolated database and simulated providers only."""
import copy
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
import kitchen_backup

WEB = [{'title': '网页菜谱', 'url': 'https://www.example.com/recipe', 'snippet': '原文提供的做法片段。'}]


class WebChatTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-web-chat-')
        self.old_db, self.old_config = app.DB_PATH, dict(app.CONFIG)
        app.DB_PATH = Path(self.temp.name) / 'test.db'
        app.CONFIG.clear()
        app.CONFIG.update(api_key='test-key-never-sent', model=app.DEFAULT_MODEL)
        app.init_db()

    def tearDown(self):
        app.DB_PATH = self.old_db
        app.CONFIG.clear()
        app.CONFIG.update(self.old_config)
        self.temp.cleanup()

    def web_chat(self, sources=WEB):
        with patch.object(app, 'search_web', return_value=copy.deepcopy(sources)), \
             patch.object(app, 'deepseek_request', return_value={'role': 'assistant', 'content': '查询结果 [网页1]'}):
            return app.handle_chat({'message': '未收录的网页菜9f84', 'web_search': True})

    def test_web_sources_survive_history_and_backup_without_local_recipe_ids(self):
        response = self.web_chat()
        self.assertTrue(response['web_search'])
        self.assertEqual(response['web_sources'], WEB)
        self.assertEqual(response['sources'], [])
        self.assertEqual((response['match_status'], response['match_count']), ('generated', 0))
        history = app.read_session(response['session_id'])['messages'][-1]
        self.assertTrue(history['web_search'])
        self.assertEqual(history['web_sources'], WEB)
        backup = kitchen_backup.export_backup(app, {})
        self.assertEqual(backup['format_version'], 2)
        self.assertEqual(backup['unavailable_recipe_ids'], [])
        self.assertNotIn('test-key-never-sent', json.dumps(backup))
        with app.connect() as db:
            db.execute('DELETE FROM sessions')
        kitchen_backup.restore_backup(app, {'backup': backup, 'dry_run': False})
        self.assertEqual(app.read_session(response['session_id'])['messages'][-1], history)

    def test_web_search_is_explicit_and_model_receives_only_current_web_evidence(self):
        captured = []
        def reply(messages, config, allow_tools=True):
            captured.append(messages)
            return {'role': 'assistant', 'content': '回答'}
        with patch.object(app, 'search_web', return_value=WEB) as search, patch.object(app, 'deepseek_request', side_effect=reply):
            first = app.handle_chat({'message': '咖喱'})
            search.assert_not_called()
            self.assertFalse(first['web_search'])
            self.assertIn('没有启用联网', captured[-1][0]['content'])
            app.handle_chat({'message': '再推荐一道', 'session_id': first['session_id'], 'web_search': True})
            self.assertIn('咖喱', search.call_args.args[0])
            self.assertIn(WEB[0]['url'], captured[-1][0]['content'])
            self.assertIn('不可信参考资料', captured[-1][0]['content'])

    def test_missing_key_invalid_switch_and_search_failure_never_write_turns(self):
        with app.connect() as db:
            before = '\n'.join(db.iterdump())
        for switch in ('true', 1, None, []):
            with self.subTest(switch=switch), self.assertRaises(app.AppError):
                app.handle_chat({'message': '咖喱', 'web_search': switch})
        with patch.object(app, 'CONFIG', {'api_key': '', 'model': app.DEFAULT_MODEL}), \
             patch.object(app, 'search_web') as search:
            with self.assertRaisesRegex(app.AppError, '尚未配置'):
                app.handle_chat({'message': '咖喱', 'web_search': True})
            search.assert_not_called()
        with patch.object(app, 'search_web', side_effect=app.AppError('搜索不可用', 502)), \
             patch.object(app, 'deepseek_request') as model:
            with self.assertRaisesRegex(app.AppError, '搜索不可用'):
                app.handle_chat({'message': '咖喱', 'web_search': True})
            model.assert_not_called()
        with app.connect() as db:
            self.assertEqual('\n'.join(db.iterdump()), before)

    def test_empty_structured_search_stays_distinct_from_search_disabled(self):
        result = self.web_chat([])
        self.assertTrue(result['web_search'])
        self.assertEqual(result['web_sources'], [])
        self.assertTrue(app.read_session(result['session_id'])['messages'][-1]['web_search'])

    def test_old_database_and_version_one_backups_upgrade_without_changing_input(self):
        app.DB_PATH = Path(self.temp.name) / 'old.db'
        sid = '1' * 32
        with app.connect() as db:
            db.executescript(app.SCHEMA)
            db.execute('INSERT INTO sessions(id,title) VALUES(?,?)', (sid, '旧版会话'))
            db.execute("INSERT INTO messages(session_id,role,content,mode) VALUES(?,'assistant','旧版回答','local')", (sid,))
        app.init_db()
        message = app.read_session(sid)['messages'][0]
        self.assertEqual(message['content'], '旧版回答')
        self.assertEqual(message['web_sources'], [])
        self.assertFalse(message['web_search'])
        legacy = kitchen_backup.export_backup(app, {})
        legacy['format_version'] = 1
        for row in legacy['tables']['messages']:
            del row['web_sources'], row['web_search']
        unchanged = copy.deepcopy(legacy)
        kitchen_backup.restore_backup(app, {'backup': legacy, 'dry_run': False})
        self.assertEqual(legacy, unchanged)
        self.assertEqual(app.read_session(sid)['messages'][0], message)

    def test_invalid_web_backup_is_atomic(self):
        self.web_chat()
        backup = kitchen_backup.export_backup(app, {})
        for change in (
            lambda row: row.update(web_sources='[{"title":"x","url":"javascript:alert(1)","snippet":""}]'),
            lambda row: row.update(web_sources='[{"title":"x","url":"http://127.0.0.1/private","snippet":""}]'),
            lambda row: row.update(web_search=0),
            lambda row: row.update(web_search=True),
            lambda row: row.update(mode='local'),
        ):
            broken = copy.deepcopy(backup)
            change(broken['tables']['messages'][-1])
            with self.assertRaises(app.AppError):
                kitchen_backup.restore_backup(app, {'backup': broken, 'dry_run': False})
            self.assertEqual(kitchen_backup.export_backup(app, {})['tables'], backup['tables'])


if __name__ == '__main__':
    unittest.main()
