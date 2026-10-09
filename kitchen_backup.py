"""Versioned, credential-free backups of kitchen data.

The HTTP layer owns its application data lock. Call these functions while holding
that lock so a chat cannot write an old result after an entire-state replacement.
Only the explicit tables and browser preference fields below are exported.
"""
from __future__ import annotations

import copy
from datetime import date, datetime, timezone
import hashlib
import json
import math
import os
from pathlib import Path
import re
import sqlite3
import uuid

FORMAT = 'shiwei-kitchen-backup'
FORMAT_VERSION = 2
MAX_BACKUP_BYTES = 32 * 1024 * 1024
CONTEXT_KEYS = {'ingredients', 'servings', 'time', 'diet', 'avoid', 'equipment',
                'region', 'use_pantry', 'pantry_mode'}
TABLE_COLUMNS = {
    'sources': 'id name title url retrieved_at',
    'recipes': 'id name region cuisine minutes servings diet image image_alt description difficulty tip tags allergens equipment adaptation source_id area_group area time_note servings_note quantity_notes',
    'ingredients': 'recipe_id position name quantity unit',
    'steps': 'recipe_id position instruction',
    'favorites': 'recipe_id created_at',
    'sessions': 'id title created_at updated_at constraints',
    'messages': 'id session_id role content mode sources context created_at web_sources web_search',
    'personal_recipes': 'recipe_id created_at',
    'pantry': 'id name quantity unit category storage expires_on opened_on notes created_at updated_at',
    'data_imports': 'filename checksum',
}
TABLE_COLUMNS = {name: tuple(columns.split()) for name, columns in TABLE_COLUMNS.items()}
INSERT_ORDER = ('sources', 'recipes', 'ingredients', 'steps', 'favorites', 'sessions',
                'messages', 'personal_recipes', 'pantry', 'data_imports')
PRIMARY_KEYS = {name: ('id',) for name in ('sources', 'recipes', 'sessions', 'messages', 'pantry')}
PRIMARY_KEYS.update(ingredients=('recipe_id', 'position'), steps=('recipe_id', 'position'),
                    favorites=('recipe_id',), personal_recipes=('recipe_id',), data_imports=('filename',))
INTEGER_FIELDS = {'id', 'source_id', 'minutes', 'servings', 'position'}
BASELINE_SCHEMA = 'CREATE TABLE IF NOT EXISTS backup_restore_baseline (filename TEXT PRIMARY KEY, checksum TEXT NOT NULL)'
JSON_COLUMNS = {'recipes': {'tags', 'allergens', 'equipment'},
                'sessions': {'constraints'},
                'messages': {'sources', 'context', 'web_sources'}}
# These values identify records, encode validated state, or locate a bundled
# asset. Changing them would damage a backup. If a credential is detected in one,
# reject the operation rather than exporting it or silently changing identity.
STRUCTURAL_COLUMNS = {
    'sources': {'id', 'retrieved_at'},
    'recipes': {'id', 'source_id', 'minutes', 'servings', 'region', 'diet', 'image', 'time_note'},
    'ingredients': {'recipe_id', 'position', 'quantity'},
    'steps': {'recipe_id', 'position'},
    'favorites': {'recipe_id', 'created_at'},
    'sessions': {'id', 'created_at', 'updated_at'},
    'messages': {'id', 'session_id', 'role', 'mode', 'created_at', 'web_search'},
    'personal_recipes': {'recipe_id', 'created_at'},
    'pantry': {'id', 'quantity', 'category', 'storage', 'expires_on', 'opened_on', 'created_at', 'updated_at'},
    'data_imports': {'filename', 'checksum'},
}


def _bad(app, detail):
    raise app.AppError('备份格式无效：' + detail)


def _json(app, value, kind, label):
    try:
        parsed = json.loads(value, parse_constant=lambda _: (_ for _ in ()).throw(ValueError()))
    except (TypeError, ValueError, RecursionError):
        _bad(app, label + ' 不是有效 JSON。')
    if not isinstance(parsed, kind):
        _bad(app, label + ' 类型不正确。')
    return parsed


def _serialized(app, value):
    try:
        raw = json.dumps(value, ensure_ascii=False, allow_nan=False, separators=(',', ':')).encode('utf-8')
    except (TypeError, ValueError, OverflowError, RecursionError, UnicodeError):
        _bad(app, '包含无法保存的 JSON 内容。')
    if len(raw) > MAX_BACKUP_BYTES:
        raise app.AppError('完整备份超过 32 MiB，请减少历史数据后重试。', 413)
    return raw


def _timestamp(app, value, label):
    if not isinstance(value, str) or not 10 <= len(value) <= 40:
        _bad(app, label + ' 日期无效。')
    try:
        datetime.fromisoformat(value.replace('Z', '+00:00'))
    except ValueError:
        _bad(app, label + ' 日期无效。')


def _date(app, value):
    if not isinstance(value, str) or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', value):
        _bad(app, '日期格式无效。')
    try:
        date.fromisoformat(value)
    except ValueError:
        _bad(app, '日期无效。')


def _pantry_snapshot(app, value):
    if not isinstance(value, dict) or set(value) != {'today', 'items', 'excluded', 'counts', 'omitted'}:
        _bad(app, '历史库存快照字段无效。')
    _date(app, value['today'])
    count_keys = {'expired', 'today', 'soon', 'fresh', 'unknown', 'depleted', 'available', 'urgent'}
    if (not isinstance(value['counts'], dict) or set(value['counts']) != count_keys
            or any(type(count) is not int or not 0 <= count <= 2**31 - 1 for count in value['counts'].values())
            or type(value['omitted']) is not int or not 0 <= value['omitted'] <= 2**31 - 1):
        _bad(app, '历史库存统计无效。')
    item_keys = {'id', 'name', 'quantity', 'unit', 'storage', 'expires_on', 'opened_on', 'days_left', 'status', 'notes'}
    if not isinstance(value['items'], list) or len(value['items']) > 100 or not isinstance(value['excluded'], list):
        _bad(app, '历史库存记录无效。')
    for item in value['items']:
        if (not isinstance(item, dict) or set(item) != item_keys
                or not isinstance(item['id'], str) or not re.fullmatch(r'pantry-[a-f0-9]{32}', item['id'])
                or item['status'] not in ('today', 'soon', 'fresh', 'unknown')
                or item['days_left'] is not None and type(item['days_left']) is not int):
            _bad(app, '历史库存批次无效。')
        for key in ('expires_on', 'opened_on'):
            if item[key]:
                _date(app, item[key])
        app.validate_pantry_item({**item, 'opened_on': ''})
    for item in value['excluded']:
        if (not isinstance(item, dict) or set(item) != {'name', 'expires_on', 'reason'}
                or not isinstance(item['name'], str) or not 1 <= len(item['name']) <= 80
                or not isinstance(item['reason'], str) or len(item['reason']) > 200):
            _bad(app, '历史过期库存记录无效。')
        _date(app, item['expires_on'])


def _context(app, value, *, persisted=False, allow_pantry=False):
    if not isinstance(value, dict):
        _bad(app, '厨房条件必须是对象。')
    if set(value) - CONTEXT_KEYS - ({'pantry'} if allow_pantry else set()):
        _bad(app, '厨房条件包含未知字段。')
    if persisted and any(key in value and type(value[key]) is not int for key in ('time', 'servings')):
        _bad(app, '已保存的时间和人数必须是整数。')
    if 'pantry' in value:
        _pantry_snapshot(app, value['pantry'])
    app.validate_context(value)


def _cooking(app, value, steps_by_recipe):
    if not isinstance(value, dict) or len(value) > 5000:
        _bad(app, '做饭进度必须是菜谱 ID 对象。')
    allowed = {'version', 'stepsVersion', 'completed', 'currentStep', 'timer'}
    timer_keys = {'durationMs', 'remainingMs', 'targetAt', 'status'}
    result = {}
    for recipe_id, state in value.items():
        if recipe_id not in steps_by_recipe or not isinstance(state, dict) or set(state) != allowed:
            _bad(app, '做饭进度引用了不存在的菜谱或包含未知字段。')
        if type(state['version']) is not int or state['version'] != 1:
            _bad(app, '做饭进度版本不受支持。')
        if not isinstance(state['stepsVersion'], str) or not 1 <= len(state['stepsVersion']) <= 128:
            _bad(app, '步骤版本无效。')
        # An older stepsVersion may legitimately have indices from an edited
        # recipe. Keep those indices bounded; the UI asks to reset this stale
        # version before allowing it to drive the current recipe.
        completed = state['completed']
        if (not isinstance(completed, list) or len(completed) > 100
                or any(type(index) is not int or not 0 <= index < 100 for index in completed)
                or len(set(completed)) != len(completed)
                or type(state['currentStep']) is not int or not 0 <= state['currentStep'] < 100):
            _bad(app, '做饭步骤位置无效。')
        timer = state['timer']
        if not isinstance(timer, dict) or set(timer) != timer_keys:
            _bad(app, '计时器字段无效。')
        if any(type(timer[key]) is not int or not (1 if key == 'durationMs' else 0) <= timer[key] <= 86_400_000
               for key in ('durationMs', 'remainingMs')):
            _bad(app, '计时器时长必须在 24 小时内。')
        if timer['remainingMs'] > timer['durationMs'] or timer['status'] not in ('idle', 'running', 'paused', 'done'):
            _bad(app, '计时器状态无效。')
        if timer['targetAt'] is not None and (type(timer['targetAt']) is not int or not 0 <= timer['targetAt'] <= 253402300799999):
            _bad(app, '计时器目标时间无效。')
        if (timer['status'] == 'running') != (timer['targetAt'] is not None):
            _bad(app, '运行中的计时器需要目标时间。')
        result[recipe_id] = state
    return result


def _preferences(app, value, steps_by_recipe, cooking_state=None):
    if value is None:
        value = {}
    if not isinstance(value, dict):
        _bad(app, '应用偏好必须是对象。')
    result = {}
    if 'context' in value:
        if not isinstance(value['context'], dict):
            _bad(app, '厨房偏好必须是对象。')
        context = {key: item for key, item in value['context'].items() if key in CONTEXT_KEYS}
        _context(app, context)
        result['context'] = context
    if cooking_state is not None or 'cooking' in value:
        result['cooking'] = _cooking(app, cooking_state if cooking_state is not None else value['cooking'], steps_by_recipe)
    return result


def _tables(db):
    return {name: [dict(row) for row in db.execute(f'SELECT {",".join(columns)} FROM {name} ORDER BY rowid')]
            for name, columns in TABLE_COLUMNS.items()}


def _missing_references(app, tables):
    recipe_ids = {row['id'] for row in tables['recipes']}
    missing = set()
    for message in tables['messages']:
        for source in _json(app, message['sources'], list, '消息来源'):
            if isinstance(source, dict) and isinstance(source.get('id'), str) and source['id'] not in recipe_ids:
                missing.add(source['id'])
    return sorted(missing)


def _snapshot(app, db, preferences=None, cooking_state=None):
    tables = _tables(db)
    steps = {row['id']: [] for row in tables['recipes']}
    for row in tables['steps']:
        steps[row['recipe_id']].append(row['instruction'])
    version_path = Path(app.ROOT, 'VERSION')
    backup = {'format': FORMAT, 'format_version': FORMAT_VERSION,
              'app_version': version_path.read_text(encoding='utf-8-sig').strip(),
              'exported_at': datetime.now(timezone.utc).isoformat(timespec='seconds'),
              'tables': tables, 'preferences': _preferences(app, preferences, steps, cooking_state),
              'unavailable_recipe_ids': _missing_references(app, tables)}
    return _safe_backup(app, backup)[0]


def _public_redactor(app):
    """Use the app's in-memory secret registry without reading configuration."""
    redactor = getattr(app, 'redact_public', None)
    if callable(redactor):
        return redactor
    from kitchen_secrets import redact_data
    secret_values = getattr(app, 'secret_values', None)
    secrets = tuple(secret_values()) if callable(secret_values) else ()
    return lambda value: redact_data(value, secrets=secrets)


def _safe_backup(app, backup):
    """Validate first, then sanitize a detached copy and revalidate its shape."""
    tables, preferences = _validate_backup(app, backup)
    # The bulk redactor returns detached containers, so avoid duplicating the
    # entire catalogue twice before that pass. Validation never edits input.
    safe = dict(backup)
    # Validation upgrades legacy message columns without modifying the input.
    safe['format_version'] = FORMAT_VERSION
    safe['tables'] = tables
    safe['preferences'] = preferences
    # One bulk pass keeps a single credential snapshot and reuses scans of
    # repeated table keys/labels. Redacting every scalar separately made full
    # catalogue backups exceed normal HTTP timeouts on Python 3.12.
    cleaned = _public_redactor(app)(safe)
    for key in ('format', 'app_version', 'exported_at', 'unavailable_recipe_ids'):
        if cleaned[key] != safe[key]:
            _bad(app, '结构字段包含敏感凭据，无法安全保存。')
    for name, rows in safe['tables'].items():
        for row, clean_row in zip(rows, cleaned['tables'][name]):
            if any(clean_row[key] != row[key] for key in STRUCTURAL_COLUMNS[name]):
                _bad(app, '结构字段包含敏感凭据，无法安全保存。')
    tables, preferences = _validate_backup(app, cleaned)
    return cleaned, tables, preferences


def _validate_backup(app, backup):
    try:
        return _validate_backup_content(app, backup)
    except (ValueError, TypeError, KeyError, OverflowError, RecursionError, UnicodeError):
        _bad(app, '记录内容、类型或链接无效。')


def _validate_backup_content(app, backup):
    _serialized(app, backup)
    keys = {'format', 'format_version', 'app_version', 'exported_at', 'tables', 'preferences', 'unavailable_recipe_ids'}
    if not isinstance(backup, dict) or set(backup) != keys or backup['format'] != FORMAT:
        _bad(app, '请选择拾味厨房完整备份文件。')
    if type(backup['format_version']) is not int or backup['format_version'] not in (1,FORMAT_VERSION):
        _bad(app, '备份版本不受支持，请使用对应版本的拾味厨房。')
    if not isinstance(backup['app_version'], str) or not re.fullmatch(r'\d+\.\d+\.\d+(?:[-+][a-zA-Z0-9.-]+)?', backup['app_version']):
        _bad(app, '应用版本无效。')
    _timestamp(app, backup['exported_at'], '导出')
    tables = backup['tables']
    if not isinstance(tables, dict) or set(tables) != set(TABLE_COLUMNS):
        _bad(app, '数据表不完整或包含未知数据表。')
    if backup['format_version']==1:
        # Upgrade the validated legacy message shape in a detached copy only.
        tables=copy.deepcopy(tables)
        old_columns=set(TABLE_COLUMNS['messages'])-{'web_sources','web_search'}
        if not isinstance(tables['messages'],list):
            _bad(app,'messages 记录数无效。')
        for row in tables['messages']:
            if not isinstance(row,dict) or set(row)!=old_columns:
                _bad(app,'旧版 messages 记录字段不完整。')
            row.update(web_sources='[]',web_search=0)
    for name, columns in TABLE_COLUMNS.items():
        rows = tables[name]
        if not isinstance(rows, list) or len(rows) > 200_000:
            _bad(app, name + ' 记录数无效。')
        seen = set()
        for row in rows:
            if not isinstance(row, dict) or set(row) != set(columns):
                _bad(app, name + ' 记录字段不完整。')
            for key, value in row.items():
                integer = key in INTEGER_FIELDS and not (key == 'id' and name not in ('sources', 'messages'))
                if key=='web_search':
                    if type(value) is not int or value not in (0,1):
                        _bad(app,'联网搜索标记无效。')
                elif integer:
                    if type(value) is not int or not (0 if key == 'position' else 1) <= value <= 2**63 - 1:
                        _bad(app, name + '.' + key + ' 必须是有效整数。')
                elif key == 'quantity':
                    if not (value is None and name == 'ingredients') and (type(value) not in (int, float) or not math.isfinite(value)):
                        _bad(app, '数量必须是有限数值。')
                elif key == 'mode' and value is None:
                    pass
                elif not isinstance(value, str) or len(value) > 200_000:
                    _bad(app, name + '.' + key + ' 必须是有效文本。')
                if key in ('created_at', 'updated_at'):
                    _timestamp(app, value, name)
            identity = tuple(row[key] for key in PRIMARY_KEYS[name])
            if identity in seen:
                _bad(app, name + ' 存在重复记录。')
            seen.add(identity)
    sources = {row['id']: row for row in tables['sources']}
    recipes = {row['id']: row for row in tables['recipes']}
    sessions = {row['id']: row for row in tables['sessions']}
    if len({row['url'] for row in tables['sources']}) != len(sources):
        _bad(app, '存在重复来源链接。')
    for source in sources.values():
        if not source['url'].startswith(('https://', 'personal:')):
            _bad(app, '菜谱来源链接无效。')
    child_rows = {name: {recipe_id: [] for recipe_id in recipes} for name in ('ingredients', 'steps')}
    for name in child_rows:
        for row in tables[name]:
            if row['recipe_id'] not in recipes:
                _bad(app, name + ' 引用了不存在的菜谱。')
            child_rows[name][row['recipe_id']].append(row)
        for rows in child_rows[name].values():
            rows.sort(key=lambda row: row['position'])
            if [row['position'] for row in rows] != list(range(len(rows))):
                _bad(app, name + ' 顺序必须从 0 连续排列。')
    for recipe_id, row in recipes.items():
        if row['source_id'] not in sources:
            _bad(app, '菜谱引用了不存在的来源。')
        source = dict(sources[row['source_id']])
        if source['url'].startswith('personal:'):
            source['url'] = ''
        recipe = {**row, 'source': source,
                  'ingredients': [{key: item[key] for key in ('name', 'quantity', 'unit')}
                                  for item in child_rows['ingredients'][recipe_id]],
                  'steps': [item['instruction'] for item in child_rows['steps'][recipe_id]]}
        for key in ('tags', 'allergens', 'equipment'):
            recipe[key] = _json(app, row[key], list, '菜谱 ' + key)
        app.validate_recipe(recipe)
    for name in ('favorites', 'personal_recipes'):
        if any(row['recipe_id'] not in recipes for row in tables[name]):
            _bad(app, name + ' 引用了不存在的菜谱。')
    if any(not re.fullmatch(r'user-[a-z0-9-]{1,75}', row['recipe_id']) for row in tables['personal_recipes']):
        _bad(app, '个人菜谱标识必须以 user- 开头。')
    for session in sessions.values():
        if not re.fullmatch(r'[a-f0-9]{32}', session['id']) or not 1 <= len(session['title']) <= 1000:
            _bad(app, '会话标识或标题无效。')
        constraints = _json(app, session['constraints'], dict, '会话条件')
        if set(constraints) - {'values', 'input', 'topic'}:
            _bad(app, '会话条件包含未知字段。')
        for field in ('values', 'input'):
            if field in constraints:
                _context(app, constraints[field], persisted=True)
        if 'topic' in constraints and (not isinstance(constraints['topic'], str) or len(constraints['topic']) > 4000):
            _bad(app, '会话主题无效。')
    unavailable = backup['unavailable_recipe_ids']
    if (not isinstance(unavailable, list) or len(unavailable) > 200_000
            or any(not isinstance(value, str) or not re.fullmatch(r'[a-z0-9-]{1,80}', value) for value in unavailable)
            or len(set(unavailable)) != len(unavailable)):
        _bad(app, '历史缺失菜谱清单无效。')
    missing = set()
    for message in tables['messages']:
        if message['session_id'] not in sessions or message['role'] not in ('user', 'assistant'):
            _bad(app, '消息的会话或角色无效。')
        if message['mode'] not in (None, '', 'local', 'deepseek'):
            _bad(app, '消息模式无效。')
        web_cards=_json(app,message['web_sources'],list,'网页来源')
        if len(web_cards)>8 or (web_cards and not message['web_search']):
            _bad(app,'网页来源数量或联网标记无效。')
        if message['web_search'] and (message['role']!='assistant' or message['mode']!='deepseek'):
            _bad(app,'联网来源仅适用于 DeepSeek 回答。')
        from kitchen_web import safe_public_url
        for card in web_cards:
            if (not isinstance(card,dict) or set(card)!={'title','url','snippet'}
                    or not isinstance(card['title'],str) or not 1<=len(card['title'])<=500
                    or not isinstance(card['snippet'],str) or len(card['snippet'])>4000
                    or not isinstance(card['url'],str) or len(card['url'])>2000
                    or not safe_public_url(card['url'])):
                _bad(app,'网页来源卡片无效。')
        _context(app, _json(app, message['context'], dict, '消息条件'), persisted=True, allow_pantry=True)
        cards = _json(app, message['sources'], list, '消息来源')
        if len(cards) > 5000:
            _bad(app, '消息来源太多。')
        for card in cards:
            if (not isinstance(card, dict) or set(card) != {'id', 'name', 'url'}
                    or any(not isinstance(card[key], str) or len(card[key]) > 2000 for key in card)
                    or not re.fullmatch(r'[a-z0-9-]{1,80}', card['id'])
                    or not card['name'] or card['url'] and not card['url'].startswith('https://')):
                _bad(app, '消息来源卡片无效。')
            if card['id'] not in recipes:
                missing.add(card['id'])
    if missing != set(unavailable):
        _bad(app, '消息引用不存在的菜谱，且与历史缺失清单不一致。')
    for item in tables['pantry']:
        if not re.fullmatch(r'pantry-[a-f0-9]{32}', item['id']):
            _bad(app, '库存批次标识无效。')
        # Validate dates independently of today's date: a historical backup must
        # not be invalidated by a machine clock or by expired/depleted batches.
        for key in ('expires_on', 'opened_on'):
            if item[key]:
                try:
                    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', item[key]):
                        raise ValueError()
                    date.fromisoformat(item[key])
                except ValueError:
                    _bad(app, '库存日期无效。')
        app.validate_pantry_item({**item, 'opened_on': ''})
    for item in tables['data_imports']:
        if (not re.fullmatch(r'[a-zA-Z0-9._-]{1,100}\.json', item['filename'])
                or not re.fullmatch(r'[a-f0-9]{64}', item['checksum'])):
            _bad(app, '内置数据导入记录无效。')
    steps = {recipe_id: [row['instruction'] for row in rows] for recipe_id, rows in child_rows['steps'].items()}
    preferences = _preferences(app, backup['preferences'], steps)
    # Reject unknown preference keys in imported files, including credentials.
    # Export intentionally filters unknown fields supplied by the browser.
    if preferences != backup['preferences']:
        _bad(app, '备份包含不允许恢复的应用偏好。')
    return tables, preferences


def _counts(tables):
    return {name: len(rows) for name, rows in tables.items()}


def _write_rollback(app, backup):
    # Keep this boundary safe even when called independently of restore_backup.
    backup = _safe_backup(app, backup)[0]
    directory = Path(app.DB_PATH).parent / 'backups'
    directory.mkdir(parents=True, exist_ok=True)
    filename = 'before-restore-' + datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '-' + uuid.uuid4().hex + '.json'
    target = directory / filename
    # Exclusive creation avoids replacing an older recovery file. A crash while
    # writing this new file cannot change the SQLite database.
    with target.open('xb') as handle:
        handle.write(_serialized(app, backup))
        handle.flush()
        os.fsync(handle.fileno())
    return filename


def _insert_table(db, name, rows):
    columns = TABLE_COLUMNS[name]
    if rows:
        db.executemany(f'INSERT INTO {name}({",".join(columns)}) VALUES({",".join("?" for _ in columns)})',
                       [tuple(row[column] for column in columns) for row in rows])


def export_backup(app, body):
    """Return a backup dict. The caller must hold its shared application lock."""
    if not isinstance(body, dict):
        _bad(app, '导出参数必须是对象。')
    with app.connect() as db:
        db.execute('BEGIN')
        backup = _snapshot(app, db, body.get('preferences'), body.get('cooking_state'))
    return backup


def restore_backup(app, body):
    """Validate/preview, or replace all backed-up data in one SQLite transaction."""
    if not isinstance(body, dict):
        _bad(app, '恢复参数必须是对象。')
    dry_run = body.get('dry_run', True)
    if type(dry_run) is not bool:
        _bad(app, 'dry_run 必须是布尔值。')
    backup, tables, preferences = _safe_backup(app, body.get('backup'))
    warnings = []
    if backup['unavailable_recipe_ids']:
        warnings.append(f'历史消息中有 {len(backup["unavailable_recipe_ids"])} 个已删除的菜谱来源；恢复后保留来源文字，详情仍不可用。')
    result = {'dry_run': dry_run, 'counts': _counts(tables), 'warnings': warnings}
    try:
        with app.connect() as db:
            db.execute('BEGIN' if dry_run else 'BEGIN IMMEDIATE')
            result['existing_counts'] = {name: db.execute(f'SELECT COUNT(*) FROM {name}').fetchone()[0] for name in TABLE_COLUMNS}
            if dry_run:
                return result
            rollback = _snapshot(app, db, body.get('current_preferences'), body.get('current_cooking_state'))
            filename = _write_rollback(app, rollback)
            for name in reversed(INSERT_ORDER):
                db.execute(f'DELETE FROM {name}')
            db.execute("DELETE FROM sqlite_sequence WHERE name='messages'")
            for name in INSERT_ORDER:
                _insert_table(db, name, tables[name])
            if db.execute('PRAGMA foreign_key_check').fetchone() is not None:
                raise sqlite3.IntegrityError('restored foreign key check failed')
            # Preserve exported data_imports exactly, while preventing the next
            # restart from overwriting a restored catalogue with this same app's
            # bundled data. A future, changed bundle can still be imported.
            db.execute(BASELINE_SCHEMA)
            db.execute('DELETE FROM backup_restore_baseline')
            for bundle in ('recipes.json', 'community-recipes.json', 'public-domain-recipes.json', 'forkrecipe-recipes.json'):
                path = Path(app.ROOT, 'data', bundle)
                if path.is_file():
                    checksum = hashlib.sha256(path.read_bytes()).hexdigest()
                    db.execute('INSERT INTO backup_restore_baseline VALUES(?,?)', (bundle, checksum))
        result.update(preferences=preferences, cooking_state=preferences.get('cooking', {}),
                      rollback_backup_id=filename, rollback_backup=rollback)
        return result
    except (sqlite3.Error, OSError) as error:
        raise app.AppError('恢复未完成，原数据库保持不变。请检查磁盘空间、备份目录写入权限后重试。', 500) from error
