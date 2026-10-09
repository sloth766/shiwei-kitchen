"""The dataset runner must never borrow the active kitchen's mutable state."""
import copy
import json
from pathlib import Path
import sys
import tempfile
import threading
import time
from types import SimpleNamespace
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
import kitchen_evaluation as evaluation
from kitchen_secrets import REDACTED


class EvaluationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='shiwei-evaluation-tests-')
        self.directory = Path(self.temp.name)
        self.recipes = json.loads((app.ROOT / 'data' / 'recipes.json').read_text(encoding='utf-8'))
        self.real_database = self.directory / 'real-kitchen.db'
        self.real_database.write_bytes(b'USER DATABASE MUST NOT CHANGE')
        self.env = self.directory / '.env'
        self.env.write_text('DEEPSEEK_API_KEY=never-use-this-key', encoding='utf-8')
        self.host = SimpleNamespace(
            __file__=app.__file__, AppError=app.AppError,
            CONSTRAINT_FIELDS=app.CONSTRAINT_FIELDS,
            validate_context=app.validate_context, validate_pantry_item=app.validate_pantry_item,
            all_recipes=lambda: copy.deepcopy(self.recipes), DB_PATH=self.real_database,
            ENV_PATH=self.env, CONFIG={'api_key': 'never-use-this-key'},
            CONFIG_LOCK=threading.Lock(), DEFAULT_MODEL=app.DEFAULT_MODEL,
        )
        with evaluation._LOCK:
            self.assertFalse(any(job['report']['status'] in evaluation._ACTIVE for job in evaluation._JOBS.values()))
            evaluation._JOBS.clear()

    def tearDown(self):
        for job_id in list(evaluation._JOBS):
            evaluation.cancel_run(self.host, job_id)
        deadline = time.monotonic() + 10
        while any(job['report']['status'] in evaluation._ACTIVE for job in evaluation._JOBS.values()):
            if time.monotonic() > deadline:
                self.fail('evaluation worker did not finish')
            time.sleep(.01)
        self.temp.cleanup()

    def dataset(self, expected=None, turns=None):
        return {'format': 'shiwei-evaluation', 'format_version': 1, 'name': '检索测试',
                'cases': [{'id': 'first', 'turns': turns or [
                    {'message': '番茄炒鸡蛋', 'expected': expected or {'match_status': 'matched', 'source_ids_include': ['tomato-eggs']}}]}]}

    def wait(self, job_id):
        deadline = time.monotonic() + 15
        while time.monotonic() < deadline:
            report = evaluation.get_run(self.host, job_id)
            if report['status'] not in evaluation._ACTIVE and report['finished_at']:
                return report
            time.sleep(.01)
        self.fail('evaluation did not complete')

    def run_dataset(self, dataset, mode='local'):
        return self.wait(evaluation.start_run(self.host, dataset, mode)['id'])

    def test_success_failure_and_exportable_assertion_evidence(self):
        dataset = self.dataset({'match_status': 'matched', 'source_ids_include': ['tomato-eggs'],
                                'source_ids_exclude': ['carbonara'], 'min_sources': 1,
                                'max_sources': 3, 'source_name_contains': '番茄炒鸡蛋',
                                'context': {'time': 30}, 'content_contains': ['番茄炒鸡蛋']})
        dataset['cases'].append({'id': 'intentional-failure', 'turns': [
            {'message': '未收录的菜9f84', 'expected': {'match_status': 'matched', 'min_sources': 1}}]})
        report = self.run_dataset(dataset)
        self.assertEqual((report['status'], report['passed'], report['failed'], report['completed']), ('completed', 1, 1, 2))
        self.assertEqual(report['pass_rate'], 50)
        self.assertEqual(report['dataset'], evaluation.validate_dataset(self.host, dataset))
        self.assertTrue(all(item['passed'] for item in report['results'][0]['turns'][0]['assertions']))
        failure = report['results'][1]['turns'][0]
        self.assertEqual(failure['actual']['sources'], [])
        self.assertEqual(failure['actual']['match_status'], 'no_match')
        self.assertFalse(any(item['passed'] for item in failure['assertions']))
        self.assertEqual(report, json.loads(json.dumps(report)))

    def test_strict_schema_rejects_empty_assertions_unknown_keys_and_wrong_types(self):
        invalid = []
        for expected in ({}, {'typo': 1}, {'source_ids_include': []}, {'context': {}},
                         {'context': {'use_pantry': True}}, {'context': {'time': '30'}},
                         {'match_status': 'invalid'}, {'min_sources': True},
                         {'min_sources': 2, 'max_sources': 1}, {'content_contains': ['']}):
            item = self.dataset()
            item['cases'][0]['turns'][0]['expected'] = expected
            invalid.append(item)
        for context in ({'time': '30'}, {'time': False}, {'typo': 1}, {'pantry': {}}, {'region': '亚洲'}):
            item = self.dataset()
            item['cases'][0]['turns'][0]['context'] = context
            invalid.append(item)
        for overrides in (['time'], ['time', 'time'], 'time', [[]]):
            item = self.dataset()
            item['cases'][0]['turns'][0]['context_overrides'] = overrides
            invalid.append(item)
        item = self.dataset()
        item['cases'][0]['pantry'] = [{'name': '番茄', 'api_key': 'bad'}]
        invalid.append(item)
        item = self.dataset()
        item['format_version'] = True
        invalid.append(item)
        for item in invalid:
            with self.subTest(item=item), self.assertRaises(app.AppError):
                evaluation.validate_dataset(self.host, item)
        with evaluation._LOCK:
            self.assertEqual(evaluation._JOBS, {})

    def test_case_turn_and_total_limits(self):
        for case_count, turns in ((51, 1), (1, 6), (21, 5)):
            dataset = self.dataset()
            case = dataset['cases'][0]
            case['turns'] *= turns
            dataset['cases'] = [{**copy.deepcopy(case), 'id': str(index)} for index in range(case_count)]
            with self.assertRaises(app.AppError):
                evaluation.validate_dataset(self.host, dataset)
        duplicate = self.dataset()
        duplicate['cases'] *= 2
        with self.assertRaises(app.AppError):
            evaluation.validate_dataset(self.host, duplicate)

    def test_oversized_pantry_integer_is_a_located_validation_error(self):
        dataset = self.dataset()
        dataset['cases'][0]['pantry'] = [{'name': '番茄', 'quantity': 10 ** 500}]
        with self.assertRaises(app.AppError) as error:
            evaluation.validate_dataset(self.host, dataset)
        self.assertEqual(error.exception.status, 400)
        self.assertIn('第 1 个用例.pantry 第 1 项', str(error.exception))

    def test_canonical_utf8_dataset_limit_is_one_mib(self):
        self.assertEqual(evaluation.MAX_DATASET_BYTES, 1024 * 1024)
        dataset = self.dataset()
        # All fields are valid individually; the combined canonical UTF-8
        # representation must still fit the documented 1 MiB maximum.
        dataset['cases'] = []
        for index in range(50):
            dataset['cases'].append({'id': str(index), 'turns': [{
                'message': '番茄', 'expected': {'content_contains': ['番' * 2000] * 4}}]})
        with self.assertRaises(app.AppError) as error:
            evaluation.validate_dataset(self.host, dataset)
        self.assertEqual(error.exception.status, 413)

    def test_terminal_snapshot_is_published_only_after_worker_cleanup(self):
        entering_cleanup, finish_cleanup = threading.Event(), threading.Event()
        original_temp_directory = evaluation.tempfile.TemporaryDirectory

        class DelayedCleanup:
            def __enter__(self):
                self.inner = original_temp_directory(prefix='shiwei-cleanup-test-')
                return self.inner.__enter__()

            def __exit__(self, *args):
                entering_cleanup.set()
                finish_cleanup.wait(5)
                return self.inner.__exit__(*args)

        with patch.object(evaluation.tempfile, 'TemporaryDirectory', side_effect=lambda **kwargs: DelayedCleanup()):
            try:
                start = evaluation.start_run(self.host, self.dataset())
                self.assertTrue(entering_cleanup.wait(5))
                snapshot = evaluation.get_run(self.host, start['id'])
                self.assertEqual(snapshot['status'], 'running')
                self.assertIsNone(snapshot['finished_at'])
            finally:
                finish_cleanup.set()
            report = self.wait(start['id'])
        self.assertEqual(report['status'], 'completed')
        self.assertIsNotNone(report['finished_at'])

    def test_multiturn_and_pantry_are_isolated_by_case(self):
        dataset = self.dataset(turns=[
            {'message': '番茄炒鸡蛋，15 分钟内，4 人份', 'expected': {'match_status': 'matched', 'context': {'time': 15, 'servings': 4}}},
            {'message': '再推荐一道，5 分钟内', 'expected': {'match_status': 'no_match', 'context': {'time': 5, 'servings': 4}}},
        ])
        dataset['cases'].extend([
            {'id': 'stock', 'pantry': [{'name': '番茄'}, {'name': '鸡蛋'}], 'turns': [
                {'message': '根据库存推荐番茄炒鸡蛋', 'context': {'use_pantry': True}, 'expected': {'match_status': 'matched'}}]},
            {'id': 'empty-stock', 'turns': [
                {'message': '根据库存推荐菜单', 'context': {'use_pantry': True}, 'expected': {'match_status': 'no_match', 'context': {'time': 30, 'servings': 2}}}]},
        ])
        report = self.run_dataset(dataset)
        self.assertEqual((report['passed'], report['failed'], report['executed_turns']), (3, 0, 4), report)

    def test_worker_uses_current_catalogue_snapshot_and_never_loads_live_config(self):
        custom = app.normalize_personal_recipe({'id': 'user-snapshot', 'name': '仅在快照中的番茄菜', 'minutes': 10,
                                               'ingredients': ['番茄'], 'steps': ['拌匀。']})
        self.recipes[:] = [custom]
        dataset = self.dataset({'source_ids_include': ['user-snapshot'], 'source_ids_exclude': ['tomato-eggs']})
        dataset['cases'][0]['turns'][0]['message'] = '番茄'
        original_loader = evaluation._load_worker
        observed = {}

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)
            observed.update(db=worker.DB_PATH, config=dict(worker.CONFIG))
            self.assertIsNot(worker.DATA_LOCK, app.DATA_LOCK)
            self.assertIsNot(worker.CONFIG_LOCK, app.CONFIG_LOCK)
            with self.assertRaises(RuntimeError):
                worker.load_config()
            with self.assertRaises(RuntimeError):
                worker.deepseek_request([], {})
            with self.assertRaises(RuntimeError):
                worker.answer_with_deepseek(None)
            with self.assertRaises(RuntimeError):
                worker.search_web('test')
            return worker

        with patch.object(evaluation, '_load_worker', side_effect=load), patch.object(app, 'handle_chat', side_effect=AssertionError('main app called')):
            report = self.run_dataset(dataset)
        self.assertEqual((report['catalogue_count'], report['passed']), (1, 1), report)
        self.assertEqual(observed['config']['api_key'], '')
        self.assertNotEqual(observed['db'], self.host.DB_PATH)
        self.assertFalse(observed['db'].exists())
        self.assertEqual(self.real_database.read_bytes(), b'USER DATABASE MUST NOT CHANGE')
        self.assertEqual(self.host.CONFIG, {'api_key': 'never-use-this-key'})
        self.assertEqual(self.env.read_text(encoding='utf-8'), 'DEEPSEEK_API_KEY=never-use-this-key')
        self.assertNotIn('never-use-this-key', json.dumps(report))

    def test_empty_catalogue_does_not_repopulate_from_bundles(self):
        self.recipes.clear()
        report = self.run_dataset(self.dataset({'match_status': 'no_match', 'max_sources': 0}))
        self.assertEqual((report['catalogue_count'], report['passed']), (0, 1), report)

    def test_one_active_run_cancellation_and_snapshot_are_thread_safe(self):
        entered, release = threading.Event(), threading.Event()
        original_loader = evaluation._load_worker

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)
            original_chat = worker.handle_chat

            def chat(body):
                entered.set()
                release.wait(5)
                return original_chat(body)
            worker.handle_chat = chat
            return worker

        dataset = self.dataset()
        dataset['cases'][0]['turns'] *= 2
        dataset['cases'].append({'id': 'later', 'turns': copy.deepcopy(dataset['cases'][0]['turns'])})
        with patch.object(evaluation, '_load_worker', side_effect=load):
            try:
                start = evaluation.start_run(self.host, dataset)
                self.assertTrue(entered.wait(5))
                # Input mutations after start must not change the captured set.
                self.recipes.clear()
                dataset['cases'][0]['turns'][0]['message'] = 'changed'
                with self.assertRaises(app.AppError) as error:
                    evaluation.start_run(self.host, self.dataset())
                self.assertEqual(error.exception.status, 409)
                partial = evaluation.get_run(self.host, start['id'])
                partial['results'].clear()
                self.assertEqual(len(evaluation.get_run(self.host, start['id'])['results']), 2)
                cancelled = evaluation.cancel_run(self.host, start['id'])
                self.assertTrue(cancelled['cancel_requested'])
            finally:
                release.set()
            report = self.wait(start['id'])
        self.assertEqual((report['status'], report['passed'], report['skipped'], report['completed']), ('cancelled', 0, 2, 0))
        self.assertIsNone(report['pass_rate'])
        self.assertEqual(report['executed_turns'], 1)
        self.assertEqual(report['results'][0]['turns'][0]['actual']['sources'][0]['id'], 'tomato-eggs')
        self.assertEqual(report['results'][1]['turns'][0]['status'], 'skipped')

    def test_runtime_error_is_reported_and_dependent_turns_skip(self):
        original_loader = evaluation._load_worker

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)
            worker.handle_chat = lambda body: (_ for _ in ()).throw(RuntimeError('deliberate error'))
            return worker

        dataset = self.dataset()
        dataset['cases'][0]['turns'] *= 2
        with patch.object(evaluation, '_load_worker', side_effect=load):
            report = self.run_dataset(dataset)
        self.assertEqual((report['status'], report['failed'], report['passed']), ('completed', 1, 0))
        self.assertEqual(report['results'][0]['status'], 'error')
        self.assertEqual(report['results'][0]['turns'][0]['error'], 'deliberate error')
        self.assertEqual(report['results'][0]['turns'][1]['status'], 'skipped')

    def test_initialization_failure_and_report_retention(self):
        with patch.object(evaluation, '_load_worker', side_effect=RuntimeError('cannot initialize')):
            first = self.run_dataset(self.dataset())
        self.assertEqual((first['status'], first['skipped'], first['passed']), ('failed', 1, 0))
        self.assertEqual(first['error'], 'cannot initialize')
        for _ in range(5):
            self.run_dataset(self.dataset())
        with self.assertRaises(app.AppError) as error:
            evaluation.get_run(self.host, first['id'])
        self.assertEqual(error.exception.status, 404)
        self.assertEqual(len(evaluation._JOBS), 5)

    def test_bundled_template_runs_against_bundled_catalogue(self):
        for filename in ('community-recipes.json', 'public-domain-recipes.json', 'forkrecipe-recipes.json'):
            self.recipes.extend(json.loads((app.ROOT / 'data' / filename).read_text(encoding='utf-8')))
        template = evaluation.load_template(self.host)
        started = evaluation.start_run(self.host, template)
        deadline = time.monotonic() + 60
        while time.monotonic() < deadline:
            report = evaluation.get_run(self.host, started['id'])
            if report['status'] not in evaluation._ACTIVE:
                break
            time.sleep(.03)
        else:
            self.fail('Full-catalogue evaluation did not complete')
        self.assertEqual(report['total'], 12)
        self.assertEqual(report['total_turns'], 15)
        failures = [(case['id'], turn['assertions']) for case in report['results']
                    for turn in case['turns'] if turn['status'] != 'passed']
        self.assertEqual((report['status'], report['passed'], report['failed']), ('completed', 12, 0), failures)

    def test_ai_modes_require_key_and_limit_to_twenty_turns(self):
        for mode in ('deepseek', 'deepseek_web'):
            with self.subTest(mode=mode):
                self.host.CONFIG.clear()
                with self.assertRaises(app.AppError) as missing:
                    evaluation.start_run(self.host, self.dataset(), mode)
                self.assertEqual(missing.exception.status, 400)
                self.assertIn('API Key', str(missing.exception))
                self.host.CONFIG['api_key'] = 'never-use-this-key'
                dataset = self.dataset()
                case = dataset['cases'][0]
                dataset['cases'] = [{**copy.deepcopy(case), 'id': str(index)} for index in range(21)]
                with self.assertRaises(app.AppError) as limited:
                    evaluation.start_run(self.host, dataset, mode)
                self.assertIn('20', str(limited.exception))
        with self.assertRaises(app.AppError):
            evaluation.start_run(self.host, self.dataset(), 'unknown')
        self.assertEqual(evaluation._JOBS, {})

    def test_ai_captures_configuration_and_uses_real_chat_with_mock_model(self):
        entered, release = threading.Event(), threading.Event()
        original_loader = evaluation._load_worker
        calls = []
        self.host.CONFIG.update(model='snapshot-model')

        def load(host, directory, mode='local', config=None):
            entered.set()
            release.wait(5)
            worker = original_loader(host, directory, mode, config)
            self.assertEqual(mode, 'deepseek')
            with self.assertRaises(RuntimeError):
                worker.search_web('not allowed')
            with self.assertRaises(RuntimeError):
                worker.load_config()

            def model(messages, supplied_config, allow_tools=True):
                calls.append(copy.deepcopy(supplied_config))
                return {'role': 'assistant', 'content': '来自模拟模型的番茄炒鸡蛋回答'}

            worker.deepseek_request = model
            return worker

        dataset = self.dataset({'content_contains': ['来自模拟模型'], 'max_web_sources': 0})
        with patch.object(evaluation, '_load_worker', side_effect=load):
            try:
                start = evaluation.start_run(self.host, dataset, 'deepseek')
                self.assertTrue(entered.wait(5))
                self.host.CONFIG.update(api_key='new-config-must-not-be-used', model='changed-model')
            finally:
                release.set()
            report = self.wait(start['id'])
        self.assertEqual(calls, [{'api_key': 'never-use-this-key', 'model': 'snapshot-model'}])
        self.assertEqual((report['mode'], report['model'], report['passed']), ('deepseek', 'snapshot-model', 1))
        actual = report['results'][0]['turns'][0]['actual']
        self.assertEqual(actual['mode'], 'deepseek')
        self.assertFalse(actual['web_search'])
        self.assertEqual(actual['web_sources'], [])
        self.assertEqual(self.real_database.read_bytes(), b'USER DATABASE MUST NOT CHANGE')
        serialized = json.dumps(report)
        self.assertNotIn('never-use-this-key', serialized)
        self.assertNotIn('new-config-must-not-be-used', serialized)

    def test_web_mode_passes_flag_retains_evidence_and_tests_any_url(self):
        original_loader = evaluation._load_worker
        seen = []

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)
            self.assertEqual(mode, 'deepseek_web')

            def chat(body):
                seen.append(copy.deepcopy(body))
                return {'session_id': 'a' * 32, 'content': '模拟联网结果', 'sources': [],
                        'context': {}, 'mode': 'deepseek', 'match_status': 'generated', 'match_count': 0,
                        'web_search': True, 'web_sources': [
                            {'title': '来源甲', 'url': 'https://example.org/cooking'},
                            {'title': '来源乙', 'url': 'https://example.com/recipes/eggs'},
                        ]}
            worker.handle_chat = chat
            return worker

        dataset = self.dataset({'match_status': 'generated', 'min_web_sources': 2,
                                'max_web_sources': 2, 'web_url_contains': 'example.com/recipes'})
        with patch.object(evaluation, '_load_worker', side_effect=load):
            report = self.run_dataset(dataset, 'deepseek_web')
        self.assertEqual(report['passed'], 1)
        self.assertEqual(report['mode'], 'deepseek_web')
        self.assertTrue(seen[0]['web_search'])
        actual = report['results'][0]['turns'][0]['actual']
        self.assertTrue(actual['web_search'])
        self.assertEqual(len(actual['web_sources']), 2)
        self.assertFalse(evaluation._assertions({'web_url_contains': 'example.com'},
                                               {'sources': [], 'web_sources': []})[0]['passed'])
        self.assertFalse(evaluation._assertions({'web_url_contains': 'absent'}, actual)[0]['passed'])
        for expected in ({'web_url_contains': ''}, {'min_web_sources': True},
                         {'min_web_sources': 2, 'max_web_sources': 1}):
            with self.assertRaises(app.AppError):
                evaluation.validate_dataset(self.host, self.dataset(expected))

    def test_ai_cancel_waits_for_current_model_answer_then_skips_next_turn(self):
        entered, release = threading.Event(), threading.Event()
        original_loader = evaluation._load_worker
        calls = []

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)

            def model(messages, supplied_config, allow_tools=True):
                calls.append(1)
                entered.set()
                release.wait(5)
                return {'role': 'assistant', 'content': '已完成模拟回答'}

            worker.deepseek_request = model
            return worker

        dataset = self.dataset()
        dataset['cases'][0]['turns'] *= 2
        with patch.object(evaluation, '_load_worker', side_effect=load):
            try:
                start = evaluation.start_run(self.host, dataset, 'deepseek')
                self.assertTrue(entered.wait(5))
                snapshot = evaluation.cancel_run(self.host, start['id'])
                self.assertEqual(snapshot['status'], 'running')
                self.assertIsNone(snapshot['finished_at'])
                self.assertTrue(snapshot['cancel_requested'])
            finally:
                release.set()
            report = self.wait(start['id'])
        self.assertEqual(calls, [1])
        self.assertEqual((report['status'], report['skipped'], report['passed']), ('cancelled', 1, 0))
        self.assertEqual(report['results'][0]['turns'][1]['status'], 'skipped')

    def test_ai_runtime_errors_redact_credential_snapshot(self):
        original_loader = evaluation._load_worker

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)

            def model(*args, **kwargs):
                raise RuntimeError('failure with never-use-this-key')

            worker.deepseek_request = model
            return worker

        with patch.object(evaluation, '_load_worker', side_effect=load):
            report = self.run_dataset(self.dataset(), 'deepseek')
        self.assertEqual(report['failed'], 1)
        self.assertNotIn('never-use-this-key', json.dumps(report))
        self.assertIn(REDACTED, report['results'][0]['turns'][0]['error'])

    def test_secret_bearing_dataset_is_rejected_without_redefining_assertions(self):
        sentinel = self.host.CONFIG['api_key']
        variants = []
        for field in ('name', 'message', 'expected', 'pantry', 'context'):
            dataset = self.dataset()
            case, turn = dataset['cases'][0], dataset['cases'][0]['turns'][0]
            if field == 'name':
                dataset['name'] = '测试 ' + sentinel
            elif field == 'message':
                turn['message'] = '番茄 ' + sentinel
            elif field == 'expected':
                turn['expected'] = {'content_contains': [sentinel]}
            elif field == 'pantry':
                case['pantry'] = [{'name': '番茄', 'notes': sentinel}]
            else:
                turn['context'] = {'ingredients': [sentinel]}
            variants.append(dataset)
        dataset = self.dataset()
        dataset['cases'][0]['turns'][0]['message'] = 'api_key=unconfigured-secret-sentinel'
        variants.append(dataset)
        with patch.object(evaluation, '_load_worker') as loader:
            for dataset in variants:
                unchanged = copy.deepcopy(dataset)
                with self.subTest(field=dataset['name']), self.assertRaises(app.AppError) as raised:
                    evaluation.start_run(self.host, dataset)
                self.assertNotIn(sentinel, str(raised.exception))
                self.assertEqual(dataset, unchanged)
            loader.assert_not_called()
        self.assertEqual(evaluation._JOBS, {})

    def test_success_and_failure_evidence_redact_snapshot_after_config_rotation(self):
        sentinel, replacement = 'never-use-this-key', 'rotated-test-secret-sentinel'
        entered, release = threading.Event(), threading.Event()
        original_loader = evaluation._load_worker

        def load(host, directory, mode='local', config=None):
            entered.set()
            release.wait(5)
            worker = original_loader(host, directory, mode, config)
            worker.handle_chat = lambda body: {
                'session_id': 'a' * 32, 'content': '模拟回答 ' + sentinel + ' ' + replacement,
                'sources': [{'id': 'tomato-eggs', 'name': '番茄 ' + sentinel}],
                'context': {'ingredients': [sentinel]}, 'mode': 'deepseek',
                'match_status': 'matched', 'match_count': 1,
                'web_sources': [{'title': sentinel, 'url': 'https://example.com/recipe?api_key=' + sentinel,
                                 'snippet': replacement}], 'web_search': True,
            }
            return worker

        dataset = self.dataset({'content_contains': ['模拟'], 'source_name_contains': '番茄'})
        dataset['cases'].append({'id': 'must-still-fail', 'turns': [
            {'message': '番茄', 'expected': {'content_contains': [REDACTED]}}]})
        with patch.object(evaluation, '_load_worker', side_effect=load):
            try:
                start = evaluation.start_run(self.host, dataset, 'deepseek')
                self.assertTrue(entered.wait(5))
                self.host.CONFIG.update(api_key=replacement)
            finally:
                release.set()
            report = self.wait(start['id'])
        self.assertEqual((report['passed'], report['failed']), (1, 1))
        self.assertFalse(report['results'][1]['turns'][0]['assertions'][0]['passed'])
        self.assertEqual(report['results'][1]['turns'][0]['assertions'][0]['actual'], '未包含')
        for value in (report, evaluation._JOBS[start['id']]['report'],
                      evaluation.get_run(self.host, start['id']), evaluation.cancel_run(self.host, start['id'])):
            serialized = json.dumps(value, ensure_ascii=False)
            self.assertNotIn(sentinel, serialized)
            self.assertNotIn(replacement, serialized)
            self.assertIn(REDACTED, serialized)
        actual = report['results'][0]['turns'][0]['actual']
        self.assertTrue(actual['web_sources'][0]['url'].startswith('https://example.com/recipe'))

    def test_recipe_snapshot_and_retired_key_are_redacted_before_worker_install(self):
        current, retired = self.host.CONFIG['api_key'], 'retired-test-key-sentinel'
        self.host.secret_values = lambda: (current, retired)
        custom = app.normalize_personal_recipe({'id': 'user-safe-recipe', 'name': '番茄菜', 'minutes': 10,
                                               'ingredients': ['番茄'], 'steps': ['拌匀。 ' + retired]})
        self.recipes[:] = [custom]
        captured = []
        original_install = evaluation._install_catalogue

        def install(worker, recipes):
            captured.extend(copy.deepcopy(recipes))
            return original_install(worker, recipes)

        with patch.object(evaluation, '_install_catalogue', side_effect=install):
            report = self.run_dataset(self.dataset({'min_sources': 1}))
        self.assertEqual(report['passed'], 1)
        self.assertNotIn(retired, json.dumps(captured))
        self.assertNotIn(retired, json.dumps(report))
        self.assertIn(retired, json.dumps(self.recipes))
        dataset = self.dataset({'content_contains': [retired]})
        with self.assertRaises(app.AppError):
            evaluation.validate_dataset(self.host, dataset)

    def test_report_embedded_json_and_public_url_remain_serializable(self):
        sentinel = self.host.CONFIG['api_key']
        original_loader = evaluation._load_worker
        normal_url = 'https://example.com/a%2Fb?name=Basic+cooking&page=2'
        nested = {'answer': '模拟回答', 'api_key': {'nested': sentinel},
                  'metadata': {'cookie': 'unconfigured-cookie-sentinel'}, 'url': normal_url}

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)
            worker.handle_chat = lambda body: {
                'session_id': 'a' * 32, 'content': json.dumps(nested, ensure_ascii=False),
                'sources': [], 'context': {}, 'mode': 'deepseek', 'match_status': 'generated', 'match_count': 0,
                'web_sources': [{'title': 'Basic cooking', 'url': normal_url, 'snippet': '普通说明'}],
            }
            return worker

        with patch.object(evaluation, '_load_worker', side_effect=load):
            report = self.run_dataset(self.dataset({'content_contains': ['模拟回答']}), 'deepseek')
        exported = json.loads(json.dumps(report, ensure_ascii=False))
        self.assertEqual(exported['passed'], 1)
        actual = exported['results'][0]['turns'][0]['actual']
        cleaned = json.loads(actual['content'])
        self.assertEqual(cleaned['api_key'], REDACTED)
        self.assertEqual(cleaned['metadata']['cookie'], REDACTED)
        self.assertEqual(cleaned['url'], normal_url)
        self.assertEqual(actual['web_sources'][0]['url'], normal_url)
        self.assertNotIn(sentinel, json.dumps(exported))
        self.assertNotIn('unconfigured-cookie-sentinel', json.dumps(exported))

    def test_mode_specific_templates_validate_and_run_with_mock_network(self):
        original_loader = evaluation._load_worker
        web_calls = []

        def load(host, directory, mode='local', config=None):
            worker = original_loader(host, directory, mode, config)
            worker.deepseek_request = lambda *args, **kwargs: {
                'role': 'assistant', 'content': '模拟回答；只说明已提供的菜谱资料。'}
            if mode == 'deepseek_web':
                def search(query, supplied_config):
                    web_calls.append(query)
                    return [{'title': '模拟网页来源', 'url': 'https://example.com/recipe',
                             'snippet': '仅用于自动测试的搜索结果。'}]
                worker.search_web = search
            return worker

        local = evaluation.load_template(self.host)
        self.assertEqual(local, evaluation.load_template(self.host, 'local'))
        self.assertEqual(len(local['cases']), 12)
        for mode in ('deepseek', 'deepseek_web'):
            with self.subTest(mode=mode):
                template = evaluation.load_template(self.host, mode)
                self.assertEqual(len(template['cases']), 3)
                self.assertEqual(sum(len(case['turns']) for case in template['cases']), 3)
                with patch.object(evaluation, '_load_worker', side_effect=load):
                    report = self.run_dataset(template, mode)
                self.assertEqual((report['status'], report['passed'], report['failed']), ('completed', 3, 0),
                                 [(case['id'], case['turns']) for case in report['results'] if case['status'] != 'passed'])
        self.assertEqual(len(web_calls), 3)
        with self.assertRaises(app.AppError) as invalid:
            evaluation.load_template(self.host, 'invalid')
        self.assertEqual(invalid.exception.status, 400)


if __name__ == '__main__':
    unittest.main()
