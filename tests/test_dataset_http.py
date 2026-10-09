"""Dataset tools use the live catalogue, but never the live conversations or stock."""
import json
from pathlib import Path
import sys
import tempfile
import threading
import time
import unittest
import urllib.error
import urllib.request

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app


class DatasetHTTPTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-dataset-http-')
        self.old_db, self.old_env, self.old_config = app.DB_PATH, app.ENV_PATH, dict(app.CONFIG)
        app.DB_PATH = Path(self.temp.name) / 'kitchen.db'
        app.ENV_PATH = Path(self.temp.name) / 'unused.env'
        app.CONFIG.clear()
        app.CONFIG.update(api_key='', model=app.DEFAULT_MODEL)
        app.init_db()
        self.server = app.make_server(0)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base = f'http://127.0.0.1:{self.server.server_port}'
        self.opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        self.run_ids = []

    def tearDown(self):
        for run_id in self.run_ids:
            self.request(f'/api/dataset-tests/runs/{run_id}/cancel', {})
            self.wait_run(run_id)
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)
        app.DB_PATH, app.ENV_PATH = self.old_db, self.old_env
        app.CONFIG.clear()
        app.CONFIG.update(self.old_config)
        self.temp.cleanup()

    def request(self, path, body=None, headers=None):
        request = urllib.request.Request(self.base + path,
            data=None if body is None else json.dumps(body).encode(),
            headers={'Content-Type': 'application/json', **(headers or {})})
        try:
            response = self.opener.open(request, timeout=20)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            return response.status, json.loads(response.read())

    def wait_run(self, run_id):
        deadline = time.monotonic() + 20
        while time.monotonic() < deadline:
            status, report = self.request('/api/dataset-tests/runs/' + run_id)
            self.assertEqual(status, 200)
            if report['status'] in ('completed', 'cancelled', 'failed'):
                return report
            time.sleep(.03)
        self.fail('Dataset run did not finish')

    def dataset(self):
        return {'format': 'shiwei-evaluation', 'format_version': 1, 'name': '隔离 HTTP 回归',
            'cases': [
                {'id': 'known-dish', 'turns': [{'message': '番茄炒鸡蛋',
                    'expected': {'source_ids_include': ['tomato-eggs']}}]},
                {'id': 'intentional-failure', 'turns': [{'message': '未收录的菜9f84',
                    'expected': {'match_status': 'matched'}}]},
            ]}

    def test_template_validation_run_and_report_preserve_live_data(self):
        app.save_pantry_item({'name': '番茄', 'quantity': 3, 'unit': '个'})
        app.handle_chat({'message': '番茄炒鸡蛋'})
        with app.connect() as db:
            before = '\n'.join(db.iterdump())
        # Even a configured live app must run this feature entirely locally.
        app.CONFIG['api_key'] = 'test-sentinel-not-a-real-key'
        status, template = self.request('/api/dataset-tests/template')
        self.assertEqual(status, 200)
        self.assertEqual(template['format'], 'shiwei-evaluation')
        status, validated = self.request('/api/dataset-tests/validate', {'dataset': self.dataset()})
        self.assertEqual((status, validated['case_count'], validated['turn_count']), (200, 2, 2))
        status, started = self.request('/api/dataset-tests/run', {'dataset': self.dataset()},
            {'Origin': 'http://127.0.0.1', 'Sec-Fetch-Site': 'same-origin'})
        self.assertEqual(status, 202)
        self.run_ids.append(started['id'])
        report = self.wait_run(started['id'])
        self.assertEqual(report['status'], 'completed')
        self.assertEqual((report['passed'], report['failed'], report['skipped']), (1, 1, 0))
        self.assertEqual(report['pass_rate'], 50)
        self.assertEqual(report['results'][0]['turns'][0]['actual']['mode'], 'local')
        self.assertTrue(any(not item['passed'] for item in report['results'][1]['turns'][0]['assertions']))
        self.assertNotIn('test-sentinel-not-a-real-key', json.dumps(report))
        with app.connect() as db:
            self.assertEqual('\n'.join(db.iterdump()), before)
        self.assertEqual(app.CONFIG['api_key'], 'test-sentinel-not-a-real-key')
        self.assertFalse(app.ENV_PATH.exists())

    def test_quality_endpoint_is_read_only_and_reports_unknown_separately(self):
        with app.connect() as db:
            before = '\n'.join(db.iterdump())
        status, report = self.request('/api/dataset-tests/quality', {})
        self.assertEqual(status, 200)
        self.assertEqual(report['format'], 'shiwei-quality-report')
        self.assertEqual(report['catalogue_count'], len(app.all_recipes()))
        self.assertGreater(report['summary']['unknown_time'], 0)
        self.assertIn('issues', report)
        with app.connect() as db:
            self.assertEqual('\n'.join(db.iterdump()), before)

    def test_invalid_import_and_api_boundaries(self):
        invalid = self.dataset()
        invalid['cases'][0]['turns'][0]['expected'] = {}
        for body in ({}, {'dataset': invalid}, {'dataset': self.dataset(), 'api_key': 'not-allowed'}):
            self.assertEqual(self.request('/api/dataset-tests/run', body)[0], 400)
        # Reject the declared length before streaming a large body on Windows.
        self.assertEqual(self.request('/api/dataset-tests/validate', {'dataset': self.dataset()},
            {'Content-Length': str(2 * 1024 * 1024 + 1)})[0], 413)
        self.assertEqual(self.request('/api/dataset-tests/quality', {'recipes': []})[0], 400)
        self.assertEqual(self.request('/api/dataset-tests/run', {'dataset': self.dataset()},
            {'Origin': 'https://outside.example'})[0], 403)
        self.assertEqual(self.request('/api/dataset-tests/runs/' + 'f' * 32)[0], 404)
        self.assertEqual(self.request('/api/dataset-tests/runs/not-a-run')[0], 404)
        self.assertEqual(self.request('/api/dataset-tests/runs/' + 'f' * 32 + '/cancel', {})[0], 404)

    def test_capabilities_and_ai_modes_require_current_service_configuration(self):
        status, capabilities = self.request('/api/dataset-tests/capabilities')
        self.assertEqual(status, 200)
        self.assertFalse(capabilities['configured'])
        self.assertEqual(capabilities['max_ai_turns'], 20)
        self.assertEqual(capabilities['modes'], ['local', 'deepseek', 'deepseek_web'])
        self.assertNotIn('api_key', capabilities)
        for mode in ('deepseek', 'deepseek_web', 'unknown', None, 1):
            self.assertEqual(self.request('/api/dataset-tests/run', {'dataset': self.dataset(), 'mode': mode})[0], 400)
        app.CONFIG['api_key'] = 'test-sentinel-not-a-real-key'
        status, capabilities = self.request('/api/dataset-tests/capabilities')
        self.assertTrue(capabilities['configured'])
        self.assertNotIn('test-sentinel-not-a-real-key', json.dumps(capabilities))


if __name__ == '__main__':
    unittest.main()
