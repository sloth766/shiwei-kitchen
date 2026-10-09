"""Synthetic-secret boundary checks; all persisted state is temporary.

No stored user credentials, environment values, or live databases are read.
Provider requests are mocked; the only real HTTP traffic is to an isolated
localhost server used to check public settings and log output.
"""
import copy
import io
import json
from pathlib import Path
import sys
import tempfile
import threading
import unittest
from unittest.mock import MagicMock, patch
import urllib.error
import urllib.request

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
import kitchen_backup


CURRENT_KEY = 'sk-' + 'C' * 48
PASTED_KEY = 'sk-' + 'P' * 48
LEGACY_KEY = 'sk-' + 'L' * 48
REDACTED = '[密钥已隐藏]'


class SecretBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-secret-boundaries-')
        self.directory = Path(self.temp.name)
        self.original_db, self.original_env = app.DB_PATH, app.ENV_PATH
        self.original_config = dict(app.CONFIG)
        app.DB_PATH = self.directory / 'isolated.db'
        app.ENV_PATH = self.directory / '.env'
        app.CONFIG.clear()
        app.CONFIG.update(api_key=CURRENT_KEY, model=app.DEFAULT_MODEL)
        # Minimal fresh catalogue: never open or initialize the real database.
        bundle_root = self.directory / 'bundles'
        (bundle_root / 'data').mkdir(parents=True)
        (bundle_root / 'data' / 'recipes.json').write_text('[]', encoding='utf-8')
        with patch.object(app, 'ROOT', bundle_root):
            app.init_db()
        app.import_personal_recipes({'recipes': [{
            'id': 'user-secret-fixture', 'name': '清炒豆腐', 'minutes': 10,
            'servings': 2, 'diet': 'vegan', 'ingredients': ['豆腐'],
            'steps': ['将豆腐炒熟。'],
        }]})

    def tearDown(self):
        app.DB_PATH, app.ENV_PATH = self.original_db, self.original_env
        app.CONFIG.clear()
        app.CONFIG.update(self.original_config)
        self.temp.cleanup()
        self.assertFalse(app.ACTIVE_SESSIONS)

    def assert_private(self, value, secrets=(CURRENT_KEY, PASTED_KEY, LEGACY_KEY)):
        text = json.dumps(value, ensure_ascii=False) if not isinstance(value, str) else value
        for secret in secrets:
            self.assertNotIn(secret, text)

    def seed_legacy_session(self):
        session_id = '12345678123456781234567812345678'
        constraints = {'values': {'time': 30}, 'input': {'time': 30},
                       'topic': '豆腐 ' + LEGACY_KEY}
        with app.connect() as db:
            db.execute('INSERT INTO sessions(id,title,constraints) VALUES(?,?,?)',
                       (session_id, '旧对话 ' + LEGACY_KEY, json.dumps(constraints)))
            db.execute('INSERT INTO messages(session_id,role,content,context) VALUES(?,?,?,?)',
                       (session_id, 'user', '豆腐 ' + LEGACY_KEY,
                        json.dumps({'ingredients': '豆腐 ' + LEGACY_KEY})))
            db.execute('INSERT INTO messages(session_id,role,content,mode,sources) VALUES(?,?,?,?,?)',
                       (session_id, 'assistant', '历史回答 ' + CURRENT_KEY, 'deepseek', '[]'))
        return session_id

    def test_pasted_chat_secrets_never_enter_provider_body_or_persisted_turns(self):
        messages_seen = []

        def model(messages, config, allow_tools=True):
            self.assertEqual(config['api_key'], CURRENT_KEY)
            messages_seen.append(copy.deepcopy(messages))
            return {'role': 'assistant', 'content': '两人份豆腐：' + CURRENT_KEY + ' ' + PASTED_KEY}

        body = {'message': '清炒豆腐，30 分钟内，2 人份。API Key: ' + PASTED_KEY,
                'context': {'ingredients': '豆腐 ' + CURRENT_KEY, 'time': 30, 'servings': 2}}
        original = copy.deepcopy(body)
        with patch.object(app, 'deepseek_request', side_effect=model):
            result = app.handle_chat(body)
        self.assertEqual(body, original, 'Redaction must not mutate the caller input.')
        self.assert_private(messages_seen)
        self.assert_private(result)
        self.assertIn(REDACTED, result['content'])
        self.assertEqual((result['context']['time'], result['context']['servings']), (30, 2))
        self.assertRegex(result['session_id'], r'^[a-f0-9]{32}$')
        with app.connect() as db:
            saved = [dict(row) for row in db.execute('SELECT title,constraints FROM sessions')]
            saved += [dict(row) for row in db.execute('SELECT content,context FROM messages')]
        self.assert_private(saved)
        self.assertIn('清炒豆腐', json.dumps(saved, ensure_ascii=False))

    def test_old_history_is_safe_on_read_and_when_reused_for_a_provider_request(self):
        session_id = self.seed_legacy_session()
        session = app.read_session(session_id)
        self.assert_private(session)
        self.assertEqual(session['id'], session_id)
        self.assertIn('旧对话', session['title'])
        messages_seen = []

        def model(messages, config, allow_tools=True):
            messages_seen.append(copy.deepcopy(messages))
            return {'role': 'assistant', 'content': '继续炒熟豆腐。'}

        with patch.object(app, 'deepseek_request', side_effect=model):
            result = app.handle_chat({'message': '继续做这道，4 人份', 'session_id': session_id})
        self.assert_private(messages_seen)
        self.assert_private(result)
        self.assertEqual(result['session_id'], session_id)
        self.assertEqual(result['context']['servings'], 4)

    def test_old_records_and_preferences_are_redacted_in_direct_backup_export(self):
        session_id = self.seed_legacy_session()
        app.save_pantry_item({'name': '豆腐', 'notes': '旧备注 ' + PASTED_KEY})
        backup = kitchen_backup.export_backup(app, {'preferences': {
            'context': {'ingredients': '豆腐 ' + CURRENT_KEY, 'time': '30'},
        }})
        self.assert_private(backup)
        self.assertEqual(backup['tables']['sessions'][0]['id'], session_id)
        self.assertEqual(backup['tables']['recipes'][0]['id'], 'user-secret-fixture')
        self.assertEqual(backup['tables']['pantry'][0]['name'], '豆腐')
        self.assertNotIn('api_key', backup)
        self.assertNotIn('config', backup)
        self.assertIn(REDACTED, json.dumps(backup, ensure_ascii=False))

    def test_generic_json_response_hides_key_fields_and_error_text(self):
        handler = app.Handler.__new__(app.Handler)
        handler.send_bytes = MagicMock()
        payload = {'api_key': 'opaque-synthetic-credential',
                   'nested': {'Authorization': 'Bearer ' + CURRENT_KEY,
                              'error': 'provider echoed ' + PASTED_KEY},
                   'id': 'user-secret-fixture', 'message': '请将豆腐炒熟。', 'count': 2}
        original = copy.deepcopy(payload)
        handler.respond(payload, 403)
        data, content_type, status = handler.send_bytes.call_args.args
        public = json.loads(data)
        self.assert_private(public, (CURRENT_KEY, PASTED_KEY, 'opaque-synthetic-credential'))
        self.assertEqual(payload, original)
        self.assertEqual((public['id'], public['message'], public['count']),
                         ('user-secret-fixture', '请将豆腐炒熟。', 2))
        self.assertEqual(status, 403)
        self.assertIn('application/json', content_type)

    def test_dispatch_errors_and_terminal_logs_hide_secrets(self):
        for error in (app.AppError('上游错误 ' + CURRENT_KEY, 502),
                      RuntimeError('私有诊断 ' + PASTED_KEY)):
            with self.subTest(error_type=type(error).__name__):
                handler = app.Handler.__new__(app.Handler)
                handler.command = 'GET'
                handler.path = '/api/synthetic?api_key=' + CURRENT_KEY
                handler.route = MagicMock(side_effect=error)
                handler.send_bytes = MagicMock()
                captured = io.StringIO()
                with patch('sys.stdout', captured):
                    handler.dispatch()
                self.assert_private(json.loads(handler.send_bytes.call_args.args[0]))
                self.assert_private(captured.getvalue())

    def test_model_authentication_is_header_only_and_redirects_are_blocked(self):
        opener = MagicMock()
        response = opener.open.return_value.__enter__.return_value
        response.read.return_value = json.dumps({'choices': [{'message': {
            'role': 'assistant', 'content': '炒熟豆腐 ' + CURRENT_KEY,
        }}]}).encode()
        messages = [{'role': 'user', 'content': '豆腐 ' + CURRENT_KEY + ' ' + PASTED_KEY}]
        with (patch.object(app.urllib.request, 'build_opener', return_value=opener) as build,
              patch.object(app.urllib.request, 'urlopen', side_effect=AssertionError('Unprotected transport used'))):
            result = app.deepseek_request(messages, {'api_key': CURRENT_KEY, 'model': app.DEFAULT_MODEL})
        request = opener.open.call_args.args[0]
        self.assertEqual(request.full_url, app.DEEPSEEK_URL)
        self.assertEqual(request.get_header('Authorization'), 'Bearer ' + CURRENT_KEY)
        self.assert_private(json.loads(request.data))
        self.assert_private(result)
        redirects = [handler for handler in build.call_args.args
                     if isinstance(handler, urllib.request.HTTPRedirectHandler)]
        self.assertTrue(redirects, 'Model transport must install an explicit no-redirect handler.')
        for redirect in redirects:
            self.assertIsNone(redirect.redirect_request(request, None, 302, 'Found', {},
                                                        'https://outside.example/collect'))

    def test_settings_store_only_the_legitimate_local_key_and_never_return_it(self):
        saved = app.update_settings({'api_key': PASTED_KEY, 'model': app.DEFAULT_MODEL})
        self.assertTrue(saved['configured'])
        self.assert_private(saved)
        self.assert_private(app.public_settings())
        self.assertEqual(app.CONFIG['api_key'], PASTED_KEY)
        # This is a newly created synthetic file under TemporaryDirectory.
        self.assertIn('DEEPSEEK_API_KEY=' + PASTED_KEY, app.ENV_PATH.read_text(encoding='utf-8'))
        self.assertEqual(saved['model'], app.DEFAULT_MODEL)

    def test_opaque_configured_key_and_prior_rotation_remain_redacted(self):
        previous = 'opaque-old-synthetic-credential-001122334455'
        replacement = 'opaque-new-synthetic-credential-667788990011'
        app.CONFIG['api_key'] = previous
        app.update_settings({'api_key': replacement, 'model': app.DEFAULT_MODEL})
        public = app.redact_public({'message': '旧值 ' + previous + ' 新值 ' + replacement,
                                    'session_id': '12345678123456781234567812345678'})
        self.assert_private(public, (previous, replacement))
        self.assertEqual(public['session_id'], '12345678123456781234567812345678')
        self.assertEqual(app.CONFIG['api_key'], replacement)

    def test_pantry_ingress_redacts_before_persistence_and_preserves_stock_fields(self):
        body = {'name': '豆腐', 'quantity': 2, 'unit': '盒', 'storage': '冷藏',
                'category': '其他', 'notes': '炖汤用 ' + CURRENT_KEY + ' ' + PASTED_KEY}
        original = copy.deepcopy(body)
        saved = app.save_pantry_item(body)
        self.assertEqual(body, original)
        self.assert_private(saved)
        self.assertRegex(saved['id'], r'^pantry-[a-f0-9]{32}$')
        self.assertEqual((saved['name'], saved['quantity'], saved['unit'], saved['storage']),
                         ('豆腐', 2, '盒', '冷藏'))
        self.assertIn('炖汤用', saved['notes'])
        with app.connect() as db:
            row = dict(db.execute('SELECT * FROM pantry WHERE id=?', (saved['id'],)).fetchone())
        self.assert_private(row)
        self.assertEqual(row['id'], saved['id'])

    def test_personal_recipe_ingress_redacts_text_before_persistence(self):
        recipe = {'id': 'user-secret-ingress', 'name': '家常豆腐', 'minutes': 15,
                  'servings': 3, 'diet': 'vegan', 'description': '试做记录 ' + CURRENT_KEY,
                  'ingredients': [{'name': '豆腐', 'quantity': 2, 'unit': '块'}],
                  'steps': ['切块 ' + PASTED_KEY, '炒熟豆腐。'],
                  'tip': '备注 ' + LEGACY_KEY}
        original = copy.deepcopy(recipe)
        result = app.import_personal_recipes({'recipes': [recipe]})
        self.assertEqual(recipe, original)
        self.assertEqual(result['added'], 1)
        actual = app.get_recipe(recipe['id'])
        self.assert_private(actual)
        self.assertEqual((actual['id'], actual['name'], actual['minutes'], actual['servings']),
                         ('user-secret-ingress', '家常豆腐', 15, 3))
        self.assertEqual(actual['ingredients'], [{'name': '豆腐', 'quantity': 2, 'unit': '块'}])
        self.assertEqual(actual['steps'][1], '炒熟豆腐。')
        with app.connect() as db:
            stored = dict(db.execute('SELECT * FROM recipes WHERE id=?', (recipe['id'],)).fetchone())
            stored_steps = [dict(row) for row in db.execute('SELECT * FROM steps WHERE recipe_id=?', (recipe['id'],))]
        self.assert_private([stored, stored_steps])

    def test_key_rotation_during_model_response_cannot_persist_the_new_key(self):
        replacement = 'opaque-raced-synthetic-credential-554433221100'

        def model(messages, config, allow_tools=True):
            self.assertEqual(config['api_key'], CURRENT_KEY)
            app.update_settings({'api_key': replacement, 'model': app.DEFAULT_MODEL})
            return {'role': 'assistant', 'content': '炒熟豆腐 ' + replacement + ' ' + CURRENT_KEY}

        with patch.object(app, 'deepseek_request', side_effect=model):
            result = app.handle_chat({'message': '清炒豆腐', 'context': {'time': 30, 'servings': 3}})
        self.assert_private(result, (CURRENT_KEY, replacement))
        self.assertIn('炒熟豆腐', result['content'])
        self.assertEqual(result['user_content'], '清炒豆腐')
        self.assertEqual((result['context']['time'], result['context']['servings']), (30, 3))
        with app.connect() as db:
            stored = [dict(row) for row in db.execute('SELECT content,context FROM messages')]
        self.assert_private(stored, (CURRENT_KEY, replacement))

    def test_malformed_request_error_omits_raw_request_details(self):
        handler = app.Handler.__new__(app.Handler)
        handler.send_bytes = MagicMock()
        handler.send_error(400, 'Malformed private request ' + CURRENT_KEY,
                           'Authorization: Bearer ' + PASTED_KEY)
        data, content_type, status = handler.send_bytes.call_args.args
        public = json.loads(data)
        self.assert_private(public)
        self.assertNotIn('Malformed private request', public['error'])
        self.assertEqual(status, 400)
        self.assertIn('application/json', content_type)
        self.assertTrue(handler.close_connection)

    def test_request_logging_handles_missing_fields_and_redacts_secret_paths(self):
        handler = app.Handler.__new__(app.Handler)
        captured = io.StringIO()
        with patch('sys.stdout', captured):
            handler.log_message('%s', CURRENT_KEY)
            handler.command = 'GET'
            handler.path = '/api/' + CURRENT_KEY + '?ignored=' + PASTED_KEY
            handler.log_message('%s', LEGACY_KEY)
        self.assert_private(captured.getvalue())
        self.assertIn('GET /api/', captured.getvalue())
        self.assertIn(REDACTED, captured.getvalue())

    def test_public_http_metadata_and_logs_do_not_echo_secret_queries(self):
        server = app.make_server(0)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            base = 'http://127.0.0.1:' + str(server.server_port)
            captured = io.StringIO()
            with patch('sys.stdout', captured):
                for path in ('/api/settings', '/api/health', '/api/dataset-tests/capabilities'):
                    with urllib.request.urlopen(base + path + '?ignored=' + CURRENT_KEY, timeout=5) as response:
                        data = json.loads(response.read())
                    self.assert_private(data)
                    self.assertTrue(data['configured'])
                    self.assertEqual(data['model'], app.DEFAULT_MODEL)
            self.assert_private(captured.getvalue())
            self.assertIn('GET /api/settings', captured.getvalue())
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=3)


if __name__ == '__main__':
    unittest.main(verbosity=2)
