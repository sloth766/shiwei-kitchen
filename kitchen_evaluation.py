"""Bounded local or explicit AI evaluations in an independent kitchen."""
from __future__ import annotations

import copy
from datetime import datetime, timezone
import importlib.util
import json
from pathlib import Path
import re
import sys
import tempfile
import threading
import time
import uuid

from kitchen_secrets import redact_data, redact_text

MAX_CASES = 50
MAX_TURNS_PER_CASE = 5
MAX_TOTAL_TURNS = 100
MAX_AI_TURNS = 20
MAX_DATASET_BYTES = 1024 * 1024
MAX_FINISHED_REPORTS = 5
_LOCK = threading.RLock()
_JOBS = {}
_ACTIVE = {'queued', 'running'}
_INPUT_CONTEXT = {'ingredients', 'avoid', 'equipment', 'servings', 'time',
                  'diet', 'use_pantry', 'pantry_mode', 'region'}
_PANTRY_FIELDS = {'name', 'quantity', 'unit', 'category', 'storage',
                  'expires_on', 'opened_on', 'notes'}
_EXPECTED_FIELDS = {'match_status', 'source_ids_include', 'source_ids_exclude',
                    'source_name_contains', 'min_sources', 'max_sources',
                    'context', 'content_contains', 'min_web_sources',
                    'max_web_sources', 'web_url_contains'}


def _secret_values(app, config=None):
    """Capture in-memory credentials; never load an env file or user DB."""
    values = []
    if callable(getattr(app, 'secret_values', None)):
        values.extend(app.secret_values())
    else:
        with app.CONFIG_LOCK:
            values.append(app.CONFIG.get('api_key', ''))
    values.append((config or {}).get('api_key', ''))
    return tuple(value for value in values if isinstance(value, str) and value)


def _reject_secret_dataset(app, value, secrets):
    # Redacting both expectations and answers before comparison can turn a
    # failing assertion into a pass. Reject such datasets without echoing them.
    if redact_data(value, secrets=secrets) != value:
        raise app.AppError('数据集含密钥或敏感凭据，请先移除后再测试；不能修改断言内容来计算通过率。')


def _public_report(app, report, secrets=()):
    return redact_data(report, secrets=tuple(secrets) + _secret_values(app))


def _object(app, value, allowed, label):
    if not isinstance(value, dict) or set(value) - allowed:
        raise app.AppError(f'{label} 必须为对象，且不能包含未知字段。')


def _text(app, value, label, maximum=200):
    if not isinstance(value, str) or not value.strip() or len(value) > maximum:
        raise app.AppError(f'{label} 需要 1–{maximum} 字的文本。')
    return value.strip()


def _context(app, value, label, expected=False):
    fields = set(app.CONSTRAINT_FIELDS) if expected else _INPUT_CONTEXT
    _object(app, value, fields, label)
    if expected and not value:
        raise app.AppError(f'{label} 不能是空对象。')
    # The application accepts numeric form strings, but the dataset is a typed
    # interchange format. Reject coercions so its assertions stay unambiguous.
    for field in ('time', 'servings'):
        if field in value and type(value[field]) is not int:
            raise app.AppError(f'{label}.{field} 必须是整数。')
    normalized = app.validate_context(value)
    return {key: normalized[key] for key in value}


def _expected(app, value, label):
    _object(app, value, _EXPECTED_FIELDS, label)
    if not value:
        raise app.AppError(f'{label} 每轮至少需要一条断言。')
    result = {}
    for key, item in value.items():
        if key == 'match_status':
            if item not in ('matched', 'no_match', 'generated'):
                raise app.AppError(f'{label}.match_status 只支持 matched、no_match 或 generated。')
            result[key] = item
        elif key in ('min_sources', 'max_sources', 'min_web_sources', 'max_web_sources'):
            if type(item) is not int or not 0 <= item <= 100:
                raise app.AppError(f'{label}.{key} 必须是 0–100 的整数。')
            result[key] = item
        elif key == 'context':
            result[key] = _context(app, item, label + '.context', expected=True)
        elif key in ('source_name_contains', 'web_url_contains'):
            result[key] = _text(app, item, label + '.' + key, 2000 if key == 'web_url_contains' else 300)
        else:
            if not isinstance(item, list) or not 1 <= len(item) <= 100:
                raise app.AppError(f'{label}.{key} 必须是非空文本数组，最多 100 项。')
            maximum = 2000 if key == 'content_contains' else 80
            result[key] = [_text(app, part, label + '.' + key, maximum) for part in item]
            if key.startswith('source_ids_') and any(
                    not re.fullmatch(r'[a-z0-9-]{1,80}', part) for part in result[key]):
                raise app.AppError(f'{label}.{key} 中的菜谱 ID 无效。')
    if result.get('min_sources', 0) > result.get('max_sources', 100):
        raise app.AppError(f'{label} 的来源数量下限不能大于上限。')
    if result.get('min_web_sources', 0) > result.get('max_web_sources', 100):
        raise app.AppError(f'{label} 的网页来源数量下限不能大于上限。')
    return result


def validate_dataset(app, value):
    """Validate without reading user data or creating a run."""
    _reject_secret_dataset(app, value, _secret_values(app))
    _object(app, value, {'format', 'format_version', 'name', 'cases'}, '数据集')
    if value.get('format') != 'shiwei-evaluation' or type(value.get('format_version')) is not int or value['format_version'] != 1:
        raise app.AppError('不支持的数据集格式或版本，需要 shiwei-evaluation / 1。')
    name = _text(app, value.get('name'), '数据集名称')
    cases = value.get('cases')
    if not isinstance(cases, list) or not 1 <= len(cases) <= MAX_CASES:
        raise app.AppError(f'数据集需要 1–{MAX_CASES} 个用例。')
    output, ids, total = [], set(), 0
    for index, case in enumerate(cases, 1):
        label = f'第 {index} 个用例'
        _object(app, case, {'id', 'name', 'pantry', 'turns'}, label)
        case_id = _text(app, case.get('id'), label + '.id', 80)
        if not re.fullmatch(r'[a-zA-Z0-9_-]{1,80}', case_id) or case_id in ids:
            raise app.AppError(f'{label} 的 id 必须唯一，且仅含英文、数字、下划线或连字符。')
        ids.add(case_id)
        result = {'id': case_id, 'name': _text(app, case.get('name', case_id), label + '.name')}
        pantry = case.get('pantry', [])
        if not isinstance(pantry, list) or len(pantry) > 200:
            raise app.AppError(f'{label}.pantry 最多允许 200 项库存。')
        result['pantry'] = []
        for pantry_index, item in enumerate(pantry, 1):
            pantry_label = f'{label}.pantry 第 {pantry_index} 项'
            _object(app, item, _PANTRY_FIELDS, pantry_label)
            quantity = item.get('quantity', 1)
            # Check the bounded domain before the app calls math.isfinite:
            # arbitrarily large JSON integers cannot convert to float safely.
            if type(quantity) not in (int, float) or not 0 <= quantity <= 100000:
                raise app.AppError(f'{pantry_label} 库存数量必须是 0–100000 的数值。')
            try:
                result['pantry'].append(app.validate_pantry_item(item))
            except app.AppError as error:
                raise app.AppError(f'{pantry_label}：{error}') from None
        turns = case.get('turns')
        if not isinstance(turns, list) or not 1 <= len(turns) <= MAX_TURNS_PER_CASE:
            raise app.AppError(f'{label} 需要 1–{MAX_TURNS_PER_CASE} 轮对话。')
        total += len(turns)
        result['turns'] = []
        for turn_index, turn in enumerate(turns, 1):
            turn_label = f'{label}第 {turn_index} 轮'
            _object(app, turn, {'message', 'context', 'context_overrides', 'expected'}, turn_label)
            context = _context(app, turn.get('context', {}), turn_label + '.context')
            overrides = turn.get('context_overrides', [])
            if (not isinstance(overrides, list) or len(overrides) > len(app.CONSTRAINT_FIELDS)
                    or any(not isinstance(key, str) or key not in app.CONSTRAINT_FIELDS or key not in context for key in overrides)
                    or len(set(overrides)) != len(overrides)):
                raise app.AppError(f'{turn_label} 显式条件必须是本轮 context 中的有效字段，不能重复。')
            result['turns'].append({
                'message': _text(app, turn.get('message'), turn_label + '.message', 2000),
                'context': context, 'context_overrides': list(overrides),
                'expected': _expected(app, turn.get('expected'), turn_label + '.expected'),
            })
        output.append(result)
    if total > MAX_TOTAL_TURNS:
        raise app.AppError(f'数据集最多允许 {MAX_TOTAL_TURNS} 轮对话。')
    result = {'format': 'shiwei-evaluation', 'format_version': 1, 'name': name, 'cases': output}
    if len(json.dumps(result, ensure_ascii=False).encode('utf-8')) > MAX_DATASET_BYTES:
        raise app.AppError('规范化后的数据集不能超过 1 MB。', 413)
    return result


def load_template(app, mode='local'):
    if mode not in ('local', 'deepseek', 'deepseek_web'):
        raise app.AppError('测试模式必须为 local、deepseek 或 deepseek_web。')
    filename = {'local': 'evaluation-cases.json', 'deepseek': 'evaluation-ai-cases.json',
                'deepseek_web': 'evaluation-web-cases.json'}[mode]
    return validate_dataset(app, json.loads((Path(__file__).parent / 'data' / filename).read_text(encoding='utf-8')))


def _now():
    return datetime.now(timezone.utc).isoformat(timespec='seconds')


def _refresh(report):
    report['passed'] = sum(case['status'] == 'passed' for case in report['results'])
    report['failed'] = sum(case['status'] in ('failed', 'error') for case in report['results'])
    report['skipped'] = sum(case['status'] == 'skipped' for case in report['results'])
    report['completed'] = report['passed'] + report['failed']
    report['executed_turns'] = sum(turn['status'] in ('passed', 'failed', 'error')
                                   for case in report['results'] for turn in case['turns'])
    report['pass_rate'] = round(100 * report['passed'] / report['completed'], 2) if report['completed'] else None


def _prune():
    finished = [job_id for job_id, job in _JOBS.items() if job['report']['status'] not in _ACTIVE]
    for job_id in finished[:-MAX_FINISHED_REPORTS]:
        del _JOBS[job_id]


def start_run(app, dataset, mode='local'):
    dataset = validate_dataset(app, dataset)
    if mode not in ('local', 'deepseek', 'deepseek_web'):
        raise app.AppError('测试模式必须为 local、deepseek 或 deepseek_web。')
    total_turns = sum(len(case['turns']) for case in dataset['cases'])
    if mode != 'local' and total_turns > MAX_AI_TURNS:
        raise app.AppError(f'调用 DeepSeek 的测试最多允许 {MAX_AI_TURNS} 轮，避免意外消耗。')
    config = None
    if mode != 'local':
        with app.CONFIG_LOCK:
            config = {key: app.CONFIG.get(key, '') for key in ('api_key', 'model')}
        if not config['api_key']:
            raise app.AppError('请先在 AI 连接设置中配置 DeepSeek API Key，再运行 AI 测试。')
        config['model'] = config['model'] or app.DEFAULT_MODEL
    secrets = _secret_values(app, config)
    _reject_secret_dataset(app, dataset, secrets)
    with _LOCK:
        if any(job['report']['status'] in _ACTIVE for job in _JOBS.values()):
            raise app.AppError('已有数据集正在测试，请等待完成或先取消。', 409)
        # Local runs copy only recipes. Explicit AI runs additionally receive a
        # private credential snapshot, never retained in the report/job store.
        # No run receives real stock, sessions, or the host DB connection.
        recipes = redact_data(app.all_recipes(), secrets=secrets)
        job_id = uuid.uuid4().hex
        report = {
            'format': 'shiwei-evaluation-report', 'format_version': 1,
            'id': job_id, 'name': dataset['name'], 'status': 'queued',
            'mode': mode, 'model': config['model'] if config else None,
            'catalogue_count': len(recipes),
            'dataset': dataset,
            'total': len(dataset['cases']),
            'total_turns': total_turns,
            'cancel_note': '取消在当前轮回答完成后生效，已发送的 API 请求不能撤回。',
            'started_at': None, 'finished_at': None, 'cancel_requested': False,
            'results': [{'id': case['id'], 'name': case['name'], 'status': 'queued',
                         'duration_ms': 0,
                         'turns': [{'message': turn['message'], 'status': 'queued',
                                    'assertions': [], 'duration_ms': 0} for turn in case['turns']]}
                        for case in dataset['cases']],
        }
        report = _public_report(app, report, secrets)
        _refresh(report)
        _JOBS[job_id] = {'report': report, 'cancel': threading.Event()}
        thread = threading.Thread(target=_run, args=(app, job_id, dataset, recipes, mode, config, secrets), daemon=True,
                                  name='shiwei-evaluation-' + job_id[:8])
        try:
            thread.start()
        except Exception:
            del _JOBS[job_id]
            raise
        _prune()
        return _public_report(app, report, secrets)


def get_run(app, job_id):
    with _LOCK:
        job = _JOBS.get(job_id)
        if job is None:
            raise app.AppError('测试报告不存在或已过期；仅保留最近 5 份完成报告。', 404)
        return _public_report(app, job['report'])


def cancel_run(app, job_id):
    with _LOCK:
        job = _JOBS.get(job_id)
        if job is None:
            raise app.AppError('测试报告不存在或已过期。', 404)
        if job['report']['status'] in _ACTIVE:
            job['cancel'].set()
            job['report']['cancel_requested'] = True
        return _public_report(app, job['report'])


def _blocked_model(*args, **kwargs):
    raise RuntimeError('此测试模式不允许调用该网络功能或加载 AI 配置。')


def _error_text(error, secrets):
    return redact_text(str(error), secrets=secrets)[:2000]


def _load_worker(app, directory, mode='local', config=None):
    module_name = '_shiwei_evaluation_' + uuid.uuid4().hex
    spec = importlib.util.spec_from_file_location(module_name, app.__file__)
    worker = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = worker
    try:
        spec.loader.exec_module(worker)
        worker.DB_PATH = Path(directory) / 'evaluation.db'
        worker.ENV_PATH = Path(directory) / 'unused.env'
        worker.CONFIG = dict(config) if mode != 'local' and config else {'api_key': '', 'model': worker.DEFAULT_MODEL}
        worker.load_config = _blocked_model
        if mode == 'local':
            worker.deepseek_request = _blocked_model
            worker.answer_with_deepseek = _blocked_model
        if mode != 'deepseek_web':
            worker.search_web = _blocked_model
        return worker
    except Exception:
        sys.modules.pop(module_name, None)
        raise


def _install_catalogue(worker, recipes):
    worker.init_db(import_bundles=False)
    with worker.connect() as db:
        for table in ('messages', 'sessions', 'pantry', 'favorites', 'personal_recipes',
                      'ingredients', 'steps', 'recipes', 'sources'):
            db.execute('DELETE FROM ' + table)
        worker.write_recipes(db, recipes)
        db.executemany('INSERT INTO personal_recipes(recipe_id) VALUES(?)',
                       [(recipe['id'],) for recipe in recipes if recipe.get('personal')])


def _assertions(expected, actual):
    results = []
    sources = actual['sources']
    ids = [source['id'] for source in sources]
    web_sources = actual.get('web_sources', [])

    def add(field, desired, value, passed):
        results.append({'field': field, 'passed': bool(passed), 'expected': desired, 'actual': value})

    for key, desired in expected.items():
        if key == 'match_status':
            add(key, desired, actual.get(key), actual.get(key) == desired)
        elif key == 'source_ids_include':
            add(key, desired, ids, all(item in ids for item in desired))
        elif key == 'source_ids_exclude':
            add(key, desired, ids, not any(item in ids for item in desired))
        elif key == 'source_name_contains':
            names = [source['name'] for source in sources]
            add(key, desired, names, bool(names) and all(desired in name for name in names))
        elif key in ('min_sources', 'max_sources'):
            count = len(sources)
            add(key, desired, count, count >= desired if key == 'min_sources' else count <= desired)
        elif key in ('min_web_sources', 'max_web_sources'):
            count = len(web_sources)
            add(key, desired, count, count >= desired if key == 'min_web_sources' else count <= desired)
        elif key == 'web_url_contains':
            urls = [source.get('url', '') for source in web_sources]
            add(key, desired, urls, any(desired in url for url in urls))
        elif key == 'context':
            for field, value in desired.items():
                received = actual.get('context', {}).get(field)
                add('context.' + field, value, received, received == value)
        elif key == 'content_contains':
            for value in desired:
                found = value in actual['content']
                # Full content is already retained once in turn.actual. Do not
                # multiply a long recipe response for each text assertion.
                add(key, value, '包含' if found else '未包含', found)
    return results


def _run(app, job_id, dataset, recipes, mode='local', config=None, secrets=()):
    worker = None
    terminal_status, terminal_error = 'completed', None
    with _LOCK:
        job = _JOBS[job_id]
        report, cancelled = job['report'], job['cancel']
        report.update(status='running', started_at=_now())
    try:
        with tempfile.TemporaryDirectory(prefix='shiwei-evaluation-') as directory:
            worker = _load_worker(app, directory, mode, config)
            _install_catalogue(worker, recipes)
            for case_index, case in enumerate(dataset['cases']):
                if cancelled.is_set():
                    break
                started = time.monotonic()
                case_result = report['results'][case_index]
                with _LOCK:
                    case_result['status'] = 'running'
                try:
                    with worker.connect() as db:
                        db.execute('DELETE FROM messages')
                        db.execute('DELETE FROM sessions')
                        db.execute('DELETE FROM pantry')
                    for item in case['pantry']:
                        worker.save_pantry_item(item)
                    session_id = None
                    for turn_index, turn in enumerate(case['turns']):
                        if cancelled.is_set():
                            break
                        turn_result = case_result['turns'][turn_index]
                        turn_started = time.monotonic()
                        with _LOCK:
                            turn_result['status'] = 'running'
                        try:
                            body = {key: copy.deepcopy(turn[key]) for key in ('message', 'context', 'context_overrides')}
                            body['web_search'] = mode == 'deepseek_web'
                            if session_id:
                                body['session_id'] = session_id
                            answer = worker.handle_chat(body)
                            session_id = answer['session_id']
                            actual = {key: answer[key] for key in ('content', 'sources', 'context', 'mode', 'match_status', 'match_count')}
                            actual['web_search'] = answer.get('web_search', False)
                            actual['web_sources'] = answer.get('web_sources', [])
                            assertions = _assertions(turn['expected'], actual)
                            with _LOCK:
                                # Assertions compare the original, validated
                                # expectation and answer. Only stored evidence
                                # is redacted, so the metrics keep their meaning.
                                turn_result.update(actual=_public_report(app, actual, secrets),
                                                   assertions=_public_report(app, assertions, secrets),
                                                   status='passed' if all(item['passed'] for item in assertions) else 'failed')
                        except Exception as error:
                            with _LOCK:
                                turn_result.update(status='error', error=_error_text(error, secrets + _secret_values(app, config)))
                            # Later turns depend on the missing answer/session.
                            break
                        finally:
                            with _LOCK:
                                turn_result['duration_ms'] = round((time.monotonic() - turn_started) * 1000, 2)
                                _refresh(report)
                    with _LOCK:
                        statuses = [turn['status'] for turn in case_result['turns']]
                        if 'error' in statuses:
                            case_result['status'] = 'error'
                        elif all(status in ('passed', 'failed') for status in statuses):
                            case_result['status'] = 'failed' if 'failed' in statuses else 'passed'
                        else:
                            case_result.update(status='skipped', reason='测试已取消，用例未完整执行。')
                except Exception as error:
                    with _LOCK:
                        case_result.update(status='error', error=_error_text(error, secrets + _secret_values(app, config)))
                finally:
                    with _LOCK:
                        case_result['duration_ms'] = round((time.monotonic() - started) * 1000, 2)
                        for turn_result in case_result['turns']:
                            if turn_result['status'] in ('queued', 'running'):
                                turn_result.update(status='skipped', reason='前序运行出错或测试已取消。')
                        _refresh(report)
            terminal_status = 'cancelled' if cancelled.is_set() else 'completed'
    except Exception as error:
        terminal_status, terminal_error = 'failed', _error_text(error, secrets + _secret_values(app, config))
    finally:
        if worker:
            sys.modules.pop(worker.__name__, None)
        with _LOCK:
            for case_result in report['results']:
                if case_result['status'] in ('queued', 'running'):
                    case_result.update(status='skipped', reason='测试已取消或初始化失败，未执行此用例。')
                for turn_result in case_result['turns']:
                    if turn_result['status'] in ('queued', 'running'):
                        turn_result.update(status='skipped', reason='测试已取消或运行失败，未执行此轮。')
            report.update(status=terminal_status, finished_at=_now())
            if terminal_error is not None:
                report['error'] = terminal_error
            _refresh(report)
            _prune()
