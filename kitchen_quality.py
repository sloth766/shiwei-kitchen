"""Read-only structural checks for the current recipe catalogue.

This report does not assess taste, cooking safety, source truth, or actual trial
cooking. Unknown metadata is counted without turning it into a defect.
"""
from __future__ import annotations

from collections import Counter, defaultdict
from datetime import date, datetime, timezone
import json
import math
from pathlib import Path
import re
import sqlite3
import unicodedata
from urllib.parse import urlsplit

from ingredient_rules import is_equipment


MAX_ISSUES = 10000
REQUIRED = {
    'id', 'name', 'region', 'cuisine', 'minutes', 'servings', 'diet', 'image',
    'image_alt', 'description', 'difficulty', 'tip', 'tags', 'allergens',
    'equipment', 'adaptation', 'source', 'ingredients', 'steps',
}
TEXT_FIELDS = ('name', 'cuisine', 'image_alt', 'description', 'difficulty', 'tip', 'adaptation')
CHECKS = (
    ('structure', '必填字段与数据类型'),
    ('identity', '菜谱 ID 与名称'),
    ('ingredients', '食材、数量与设备分类'),
    ('steps', '步骤完整性与重复项'),
    ('source', '来源与整理日期'),
    ('images', '本地图片'),
    ('duplicates', '相同实质内容提示'),
    ('metadata', '未知元数据统计'),
)


def _normal_text(value):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFKC', value).strip()).casefold()


def _is_heading(value):
    value = value.strip()
    return bool(re.fullmatch(r'【[^】]+】', value) or re.match(r'^#{1,6}\s', value))


def _snapshot(app):
    """Keep raw ingredients and malformed JSON visible; never migrate a DB."""
    with app.DATA_LOCK:
        uri = Path(app.DB_PATH).resolve().as_uri() + '?mode=ro'
        db = sqlite3.connect(uri, uri=True, timeout=15)
        db.row_factory = sqlite3.Row
        try:
            db.execute('PRAGMA query_only=ON')
            db.execute('BEGIN')
            rows = db.execute('''SELECT r.*, s.name AS source_name,
                s.title AS source_title, s.url AS source_url,
                s.retrieved_at AS source_retrieved_at
                FROM recipes r LEFT JOIN sources s ON r.source_id=s.id
                ORDER BY r.rowid''').fetchall()
            ingredients, steps = defaultdict(list), defaultdict(list)
            for row in db.execute('SELECT * FROM ingredients ORDER BY recipe_id,position'):
                ingredients[row['recipe_id']].append({key: row[key] for key in ('name', 'quantity', 'unit')})
            for row in db.execute('SELECT * FROM steps ORDER BY recipe_id,position'):
                steps[row['recipe_id']].append(row['instruction'])
            result = []
            for row in rows:
                recipe = dict(row)
                recipe['source'] = {key: recipe.pop('source_' + key) for key in ('name', 'title', 'url', 'retrieved_at')}
                if recipe['source']['name'] == '我的厨房' and recipe['source']['url'] == 'personal:' + recipe['id']:
                    recipe['source']['url'] = ''
                recipe.pop('source_id', None)
                for key in ('tags', 'allergens', 'equipment'):
                    try:
                        recipe[key] = json.loads(recipe[key])
                    except (TypeError, ValueError):
                        pass  # Preserve the bad value for the field-level checker.
                recipe['ingredients'] = ingredients[recipe['id']]
                recipe['steps'] = steps[recipe['id']]
                result.append(recipe)
            return result
        finally:
            db.close()


def _unknown_servings(recipe):
    note = recipe.get('servings_note', '')
    if not isinstance(note, str):
        return False
    # These are explicit existing data conventions, not inferred servings.
    return (note.strip().lower() == 'unknown'
            or any(word in note for word in ('未知', '未注明', '未标注', '按原文份量', '不按人数'))
            or bool(re.search(r'原文(?:为|约)\d+\s*(?:个|张)', note)))


def audit_catalogue(app, recipes=None):
    """Return a JSON-compatible report for raw live rows or an explicit list.

    A supplied recipe list is useful for isolated checks before importing. It
    is never normalized, edited, or persisted. Missing DBs are not created.
    """
    if recipes is None:
        try:
            recipes = _snapshot(app)
        except sqlite3.Error as error:
            raise app.AppError('无法只读打开菜谱数据库，请先正常启动厨房。', 503) from error
        source = 'current_database'
    else:
        if not isinstance(recipes, (list, tuple)):
            raise app.AppError('待检查数据必须是菜谱数组。')
        recipes = list(recipes)
        source = 'provided_recipes'

    issues = []
    totals = Counter()
    affected = {'error': set(), 'warning': set()}
    check_counts = {code: Counter() for code, _ in CHECKS}
    unknown = Counter()
    id_groups, name_groups, content_groups = defaultdict(list), defaultdict(list), defaultdict(list)
    schema_valid = 0

    def emit(index, severity, code, message, field, group):
        recipe = recipes[index] if isinstance(recipes[index], dict) else {}
        recipe_id = recipe.get('id')
        recipe_name = recipe.get('name')
        totals[severity] += 1
        check_counts[group][severity] += 1
        if severity in affected:
            affected[severity].add(index)
        if len(issues) < MAX_ISSUES:
            issues.append({
                'recipe_id': recipe_id if isinstance(recipe_id, str) else '',
                'recipe_name': recipe_name if isinstance(recipe_name, str) else f'第 {index + 1} 条菜谱',
                'recipe_index': index, 'severity': severity, 'code': code,
                'message': message, 'field': field,
            })

    for index, recipe in enumerate(recipes):
        start_errors = totals['error']

        def error(code, message, field, group='structure'):
            emit(index, 'error', code, message, field, group)

        def warning(code, message, field, group):
            emit(index, 'warning', code, message, field, group)

        if not isinstance(recipe, dict):
            error('invalid_recipe', '菜谱必须是 JSON 对象。', '')
            continue

        for key in sorted(REQUIRED - recipe.keys()):
            error('missing_field', f'缺少必填字段：{key}。', key)

        recipe_id = recipe.get('id')
        if 'id' in recipe:
            if not isinstance(recipe_id, str) or not re.fullmatch(r'[a-z0-9-]{1,80}', recipe_id):
                error('invalid_id', '菜谱 ID 需为 1–80 位小写英文、数字或连字符，不能为空。', 'id', 'identity')
            if isinstance(recipe_id, str) and recipe_id:
                id_groups[recipe_id].append(index)

        for key in TEXT_FIELDS:
            if key in recipe and (not isinstance(recipe[key], str) or not recipe[key].strip() or len(recipe[key]) > 2000):
                error('invalid_text', f'{key} 必须为 1–2000 字的非空文本。', key)
        if isinstance(recipe.get('name'), str) and recipe['name'].strip():
            name_groups[_normal_text(recipe['name'])].append(index)
        for key in ('area_group', 'area', 'time_note', 'servings_note', 'quantity_notes'):
            value = recipe.get(key, '')
            if not isinstance(value, str) or len(value) > (12000 if key == 'quantity_notes' else 200):
                error('invalid_note', f'{key} 必须是长度受限的文本。', key)
        if 'region' in recipe and recipe['region'] not in ('东方', '西方'):
            error('invalid_region', '区域必须为东方或西方。', 'region')
        if 'diet' in recipe and recipe['diet'] not in ('vegan', 'vegetarian', 'omnivore', 'unknown'):
            error('invalid_diet', '饮食类型不在支持列表中；未核对时请保留 unknown。', 'diet')
        for key, high, label in (('minutes', 1440, '用时'), ('servings', 20, '份量')):
            if key in recipe and (type(recipe[key]) is not int or not 1 <= recipe[key] <= high):
                error('invalid_' + key, f'{label}字段必须是 1–{high} 的整数；未注明时应使用未知标记。', key)
        if recipe.get('time_note', '') not in ('', 'source', 'unknown'):
            error('invalid_time_note', '用时标记仅支持空文本、source 或 unknown。', 'time_note')
        for key in ('tags', 'allergens', 'equipment'):
            if key in recipe:
                value = recipe[key]
                if (not isinstance(value, list) or len(value) > 30
                        or any(not isinstance(item, str) or not item.strip() or len(item) > 80 for item in value)):
                    error('invalid_text_array', f'{key} 需为不超过 30 项的非空文本数组，每项不超过 80 字。', key)

        image = recipe.get('image')
        if 'image' in recipe:
            if not isinstance(image, str) or not re.fullmatch(r'/assets/[a-zA-Z0-9._-]+', image):
                error('invalid_image_path', '图片需使用 /assets/ 下的本地文件路径。', 'image', 'images')
            else:
                try:
                    exists = (app.PUBLIC / image.lstrip('/')).is_file()
                except OSError:
                    exists = False
                if not exists:
                    error('missing_image', f'本地图片不存在：{image}。', 'image', 'images')

        if 'source' in recipe:
            origin = recipe['source']
            if not isinstance(origin, dict):
                error('invalid_source', '来源必须包含名称、标题、链接和整理日期。', 'source', 'source')
            else:
                for key in ('name', 'title', 'retrieved_at'):
                    value = origin.get(key)
                    if not isinstance(value, str) or not value.strip() or len(value) > 2000:
                        error('invalid_source_field', f'来源 {key} 不能为空，且须为不超过 2000 字的文本。', 'source.' + key, 'source')
                url = origin.get('url')
                valid_url = isinstance(url, str) and len(url) <= 2000
                if valid_url and url:
                    try:
                        parsed = urlsplit(url)
                        valid_url = bool(parsed.scheme == 'https' and parsed.hostname and not any(c.isspace() for c in url)
                                         and parsed.port != 0 and parsed.username is None and parsed.password is None)
                    except ValueError:
                        valid_url = False
                elif valid_url:
                    valid_url = origin.get('name') == '我的厨房'
                if not valid_url:
                    error('invalid_source_url', '外部来源需有格式有效的 HTTPS 链接；自创菜谱可使用“我的厨房”和空链接。', 'source.url', 'source')
                retrieved = origin.get('retrieved_at')
                if isinstance(retrieved, str) and retrieved:
                    try:
                        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', retrieved):
                            raise ValueError
                        date.fromisoformat(retrieved)
                    except ValueError:
                        error('invalid_source_date', '整理日期必须是有效的 YYYY-MM-DD 日期。', 'source.retrieved_at', 'source')

        ingredients = recipe.get('ingredients')
        if 'ingredients' in recipe:
            if not isinstance(ingredients, list) or not 1 <= len(ingredients) <= 50:
                error('invalid_ingredients', '菜谱需要 1–50 项食材。', 'ingredients', 'ingredients')
            if isinstance(ingredients, list):
                for position, item in enumerate(ingredients):
                    field = f'ingredients[{position}]'
                    if not isinstance(item, dict):
                        error('invalid_ingredient', f'第 {position + 1} 项食材必须包含名称、数量与单位。', field, 'ingredients')
                        continue
                    name = item.get('name')
                    if not isinstance(name, str) or not name.strip() or len(name) > 300:
                        error('invalid_ingredient_name', f'第 {position + 1} 项食材名称不能为空，且不超过 300 字。', field + '.name', 'ingredients')
                    elif is_equipment(name):
                        error('equipment_as_ingredient', f'“{name}”属于设备，应列入设备区；本次检查保留原记录。', field + '.name', 'ingredients')
                    if not isinstance(item.get('unit'), str) or len(item['unit']) > 100:
                        error('invalid_ingredient_unit', f'第 {position + 1} 项食材单位必须是文本，且不超过 100 字。', field + '.unit', 'ingredients')
                    quantity = item.get('quantity')
                    if quantity is not None and (type(quantity) not in (int, float) or not 0 < quantity <= 100000 or not math.isfinite(quantity)):
                        error('invalid_quantity', f'第 {position + 1} 项食材数量必须为有限正数（不超过 100000），或 null 表示适量。', field + '.quantity', 'ingredients')

        steps = recipe.get('steps')
        action_steps = []
        if 'steps' in recipe:
            if not isinstance(steps, list) or not 1 <= len(steps) <= 100:
                error('invalid_steps', '菜谱需要 1–100 项步骤。', 'steps', 'steps')
            if isinstance(steps, list):
                seen_steps = {}
                for position, step in enumerate(steps):
                    field = f'steps[{position}]'
                    if not isinstance(step, str) or not step.strip() or len(step) > 2000:
                        error('invalid_step', f'第 {position + 1} 项步骤必须是 1–2000 字的非空文本。', field, 'steps')
                        continue
                    if _is_heading(step):
                        continue
                    normalized = _normal_text(step)
                    action_steps.append(normalized)
                    if normalized in seen_steps:
                        warning('duplicate_step', f'第 {position + 1} 项与第 {seen_steps[normalized] + 1} 项步骤相同，请人工核对是否需要重复操作。', field, 'steps')
                    else:
                        seen_steps[normalized] = position
                if steps and not action_steps and all(isinstance(step, str) and step.strip() and _is_heading(step) for step in steps):
                    error('heading_only_steps', '只有章节标题，缺少可以执行的做法步骤。', 'steps', 'steps')

        # Follow the app's import contract as well as our more detailed checks.
        try:
            app.validate_recipe(recipe)
        except (app.AppError, TypeError, ValueError, KeyError, AttributeError, OverflowError, OSError) as exception:
            if totals['error'] == start_errors:
                error('schema_validation', str(exception) or '未通过应用菜谱格式校验。', '')
        else:
            schema_valid += 1

        unknown['time'] += recipe.get('time_note') == 'unknown'
        unknown['servings'] += _unknown_servings(recipe)
        unknown['diet'] += recipe.get('diet') == 'unknown'

        if totals['error'] == start_errors and isinstance(ingredients, list) and action_steps:
            content = {
                'ingredients': [[_normal_text(item['name']), item.get('quantity'), _normal_text(item['unit'])]
                                for item in ingredients],
                'steps': action_steps,
            }
            # JSON string ordering handles null and numeric amounts consistently.
            content['ingredients'].sort(key=lambda item: json.dumps(item, ensure_ascii=False))
            key = json.dumps(content, ensure_ascii=False, sort_keys=True, allow_nan=False)
            content_groups[key].append(index)

    for code, groups, severity, field, group, message in (
        ('duplicate_id', id_groups, 'error', 'id', 'identity', '相同 ID 出现 {count} 次，无法唯一引用菜谱。'),
        ('duplicate_name', name_groups, 'warning', 'name', 'identity', '相同名称出现 {count} 次，可能是不同版本，请人工核对。'),
        ('duplicate_content', content_groups, 'warning', 'ingredients,steps', 'duplicates', '相同食材、用量和做法出现 {count} 次，可能为重复整理，请人工核对。'),
    ):
        for indices in groups.values():
            if len(indices) > 1:
                for index in indices:
                    emit(index, severity, code, message.format(count=len(indices)), field, group)

    info = sum(unknown.values())
    check_counts['metadata']['info'] = info
    checks = []
    for code, label in CHECKS:
        counts = check_counts[code]
        status = 'error' if counts['error'] else 'warning' if counts['warning'] else 'info' if counts['info'] else 'passed'
        checks.append({'code': code, 'label': label, 'status': status,
                       'errors': counts['error'], 'warnings': counts['warning'], 'info': counts['info']})
    issue_total = totals['error'] + totals['warning']
    return {
        'format': 'shiwei-quality-report', 'format_version': 1,
        'generated_at': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
        'source': source, 'catalogue_count': len(recipes),
        'scope': '只读检查菜谱结构、字段与记录一致性；不联网核验来源，不代表原文已核对、实际试做或做法正确。未知用时、份量和饮食类型仅按显式标记统计。',
        'summary': {'errors': totals['error'], 'warnings': totals['warning'], 'info': info,
                    'recipes_with_errors': len(affected['error']), 'recipes_with_warnings': len(affected['warning']),
                    'unknown_time': unknown['time'], 'unknown_servings': unknown['servings'], 'unknown_diet': unknown['diet']},
        'schema_validation': {'passed': schema_valid, 'failed': len(recipes) - schema_valid},
        'checks': checks, 'issues': issues, 'issue_total': issue_total,
        'truncated': issue_total > len(issues), 'issue_limit': MAX_ISSUES,
    }
