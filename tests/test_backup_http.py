"""Exercise full backup HTTP flows and conflicts against a real local server."""
from concurrent.futures import ThreadPoolExecutor
import http.client
import json
from pathlib import Path
import sys
import tempfile
import threading
import unittest
from unittest.mock import patch
import urllib.error
import urllib.request

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
import kitchen_backup


class BackupHTTPTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-backup-http-')
        self.original_db, self.original_env = app.DB_PATH, app.ENV_PATH
        self.original_config = dict(app.CONFIG)
        app.DB_PATH = Path(self.temp.name, 'kitchen.db')
        app.ENV_PATH = Path(self.temp.name, '.env')
        app.CONFIG.clear()
        app.CONFIG.update(api_key='', model=app.DEFAULT_MODEL)
        app.init_db()
        self.server = app.make_server(0)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base = f'http://127.0.0.1:{self.server.server_port}'

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)
        app.DB_PATH, app.ENV_PATH = self.original_db, self.original_env
        app.CONFIG.clear()
        app.CONFIG.update(self.original_config)
        self.temp.cleanup()
        self.assertEqual(app.ACTIVE_DATA_OPERATIONS, 0)
        self.assertFalse(app.DATA_RESTORING)

    def request(self, path, method='POST', body=None):
        request = urllib.request.Request(self.base + path,
            data=None if body is None else json.dumps(body, ensure_ascii=False).encode(),
            method=method, headers={'Content-Type': 'application/json'})
        try:
            # Full-catalogue JSON includes thousands of rows and a rollback
            # snapshot. This is a correctness check, not a latency benchmark.
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.status, json.loads(response.read())
        except urllib.error.HTTPError as error:
            return error.code, json.loads(error.read())

    def backup(self):
        status, backup = self.request('/api/backup/export', body={'preferences': {'context': {'time': '15'}}})
        self.assertEqual(status, 200)
        return backup

    def test_http_preview_replace_rollback_download_and_bad_format(self):
        backup = self.backup()
        status, _ = self.request('/api/favorites/tomato-eggs', 'PUT', {'favorite': True})
        self.assertEqual(status, 200)
        status, preview = self.request('/api/backup/restore', body={'backup': backup, 'dry_run': True})
        self.assertEqual(status, 200)
        self.assertEqual(preview['counts']['favorites'], 0)
        self.assertEqual(preview['existing_counts']['favorites'], 1)
        self.assertEqual(self.request('/api/favorites', 'GET')[1], ['tomato-eggs'])
        status, restored = self.request('/api/backup/restore', body={'backup': backup, 'dry_run': False,
            'current_preferences': {'context': {'time': '60'}}})
        self.assertEqual(status, 200)
        self.assertEqual(restored['preferences']['context']['time'], '15')
        self.assertEqual(len(restored['rollback_backup']['tables']['favorites']), 1)
        self.assertEqual(restored['rollback_backup']['preferences']['context']['time'], '60')
        self.assertEqual(self.request('/api/favorites', 'GET')[1], [])
        self.assertEqual(self.backup()['tables'], backup['tables'])
        backup['format_version'] = 999
        self.assertEqual(self.request('/api/backup/restore', body={'backup': backup})[0], 400)

    def test_personal_recipe_referenced_by_history_cannot_be_deleted_or_lost_from_backup(self):
        recipe_id = 'user-backup-history'
        status, _ = self.request('/api/recipes/import', body={'recipes': [{
            'id': recipe_id, 'name': '历史引用豆腐', 'region': '东方', 'diet': 'vegan',
            'minutes': 10, 'servings': 2, 'ingredients': ['豆腐'], 'steps': ['将豆腐炒熟。']}]})
        self.assertEqual(status, 200)
        status, original = self.request('/api/recipes/' + recipe_id, 'GET')
        self.assertEqual(status, 200)
        session_id = '12345678123456781234567812345678'
        with app.connect() as db:
            db.execute('INSERT INTO sessions(id,title) VALUES(?,?)', (session_id, '引用个人菜谱'))
            db.execute('INSERT INTO messages(session_id,role,content,mode,sources) VALUES(?,?,?,?,?)',
                       (session_id, 'assistant', '请参考这道个人菜谱。', 'local',
                        app.json_text([{'id': recipe_id, 'name': original['name'], 'url': original['source']['url']}])))
        before = self.backup()
        status, error = self.request('/api/personal-recipes/' + recipe_id, 'DELETE')
        self.assertEqual(status, 409)
        self.assertIn('历史对话引用', error['error'])
        status, retained = self.request('/api/recipes/' + recipe_id, 'GET')
        self.assertEqual(status, 200)
        self.assertEqual(retained, original)
        after = self.backup()
        self.assertEqual(after['tables'], before['tables'])
        self.assertEqual(after['unavailable_recipe_ids'], [])

    def test_restore_conflicts_with_actual_inflight_pantry_write(self):
        backup = self.backup()
        entered, release = threading.Event(), threading.Event()
        original = app.save_pantry_item
        def hold_write(*args, **kwargs):
            entered.set()
            if not release.wait(30):
                raise RuntimeError('test write was not released')
            return original(*args, **kwargs)
        with patch.object(app, 'save_pantry_item', side_effect=hold_write), ThreadPoolExecutor(max_workers=1) as pool:
            future = pool.submit(self.request, '/api/pantry', 'POST', {'name': '番茄', 'quantity': 2, 'unit': '个'})
            try:
                self.assertTrue(entered.wait(30))
                self.assertEqual(self.request('/api/backup/restore', body={'backup': backup, 'dry_run': False})[0], 409)
                self.assertFalse(Path(app.DB_PATH.parent, 'backups').exists())
            finally:
                release.set()
            self.assertEqual(future.result(timeout=5)[0], 201)
        self.assertEqual(len(self.request('/api/pantry', 'GET')[1]['items']), 1)

    def test_restore_conflicts_with_model_response_without_blocking_other_reads(self):
        backup = self.backup()
        entered, release = threading.Event(), threading.Event()
        def model(*args, **kwargs):
            entered.set()
            if not release.wait(30):
                raise RuntimeError('test model was not released')
            return {'content': '模拟模型回答：参考番茄炒蛋。'}
        app.CONFIG['api_key'] = 'test-only-not-transmitted'
        with patch.object(app, 'deepseek_request', side_effect=model), ThreadPoolExecutor(max_workers=1) as pool:
            future = pool.submit(self.request, '/api/chat', 'POST', {'message': '番茄炒蛋', 'context': {'time': 60}})
            try:
                self.assertTrue(entered.wait(30))
                self.assertEqual(self.request('/api/backup/restore', body={'backup': backup, 'dry_run': False})[0], 409)
                self.assertEqual(self.request('/api/pantry', 'GET')[0], 200)
            finally:
                release.set()
            status, chat = future.result(timeout=5)
            self.assertEqual(status, 200)
        status, session = self.request('/api/sessions/' + chat['session_id'], 'GET')
        self.assertEqual(status, 200)
        self.assertEqual(len(session['messages']), 2)
        self.assertNotIn('test-only-not-transmitted', json.dumps(self.backup()))

    def test_new_write_is_rejected_while_restore_is_running(self):
        backup = self.backup()
        entered, release = threading.Event(), threading.Event()
        original = kitchen_backup._write_rollback
        def hold_restore(*args, **kwargs):
            entered.set()
            if not release.wait(30):
                raise RuntimeError('test restore was not released')
            return original(*args, **kwargs)
        with patch.object(kitchen_backup, '_write_rollback', side_effect=hold_restore), ThreadPoolExecutor(max_workers=1) as pool:
            future = pool.submit(self.request, '/api/backup/restore', 'POST', {'backup': backup, 'dry_run': False})
            try:
                self.assertTrue(entered.wait(30))
                self.assertEqual(self.request('/api/favorites/tomato-eggs', 'PUT', {'favorite': True})[0], 409)
            finally:
                release.set()
            self.assertEqual(future.result(timeout=30)[0], 200)
        self.assertEqual(self.request('/api/favorites', 'GET')[1], [])

    def test_oversized_http_request_is_rejected_without_reading_a_body(self):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port, timeout=5)
        try:
            connection.putrequest('POST', '/api/backup/export')
            connection.putheader('Content-Type', 'application/json')
            connection.putheader('Content-Length', str(kitchen_backup.MAX_BACKUP_BYTES * 3))
            connection.endheaders()
            self.assertEqual(connection.getresponse().status, 413)
        finally:
            connection.close()
        self.assertFalse(Path(app.DB_PATH.parent, 'backups').exists())


if __name__ == '__main__':
    unittest.main()
