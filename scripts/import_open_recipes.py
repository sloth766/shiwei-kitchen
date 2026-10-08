"""Build bundled recipes from pinned open data, without running upstream code.

python scripts/import_open_recipes.py --fetch
python scripts/import_open_recipes.py
"""
import argparse
import ast
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
from pathlib import Path
import re
import sys
import time
import urllib.parse
import urllib.request
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import app

SOURCES = {
    'public-domain': {
        'repository': 'ronaldl29/public-domain-recipes',
        'commit': 'da84378b36bd5b2e3cb35f610d64630bf1bd899d',
        'license': 'Unlicense', 'prefix': 'content/', 'suffix': '.md',
        'notices': ['LICENSE.md', 'README.md'],
    },
    'forkrecipe': {
        'repository': 'futurechef/forkrecipe-recipes',
        'commit': '934319313379201f91ddccdd29abd054039a3ad6',
        'license': 'CC-BY-SA-4.0', 'prefix': 'recipes/', 'suffix': '.js',
        'notices': ['LICENSE', 'NOTICE', 'README.md', 'data/users.js'],
    },
}
LABELS = json.loads((ROOT / 'data' / 'open-recipe-labels.json').read_text(encoding='utf-8'))


def js_data(text):
    """Parse only literals, arrays and objects; reject executable JS expressions."""
    prefix = re.match(r'(?:\s|//[^\n]*\n|/\*[\s\S]*?\*/)*export\s+default\s+', text)
    if not prefix:
        raise ValueError('Not a data-only default export')
    text = text[prefix.end():]
    token = re.compile(r'\s+|//[^\n]*|/\*[\s\S]*?\*/|"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[A-Za-z_$][\w$]*|[{}\[\]:,;]')
    tokens, offset = [], 0
    while offset < len(text):
        match = token.match(text, offset)
        if not match:
            raise ValueError(f'Unsupported JS token at {offset}')
        part = match.group()
        offset = match.end()
        if part.isspace() or part.startswith(('//', '/*')):
            continue
        tokens.append(part)
    position = 0

    def string(value):
        return json.loads(value) if value.startswith('"') else ast.literal_eval(value)

    def take():
        nonlocal position
        if position >= len(tokens):
            raise ValueError('Incomplete JS literal')
        part = tokens[position]
        position += 1
        return part

    def value(depth=0):
        if depth > 40:
            raise ValueError('JS literal nesting limit')
        part = take()
        if part in ('{', '['):
            result = {} if part == '{' else []
            end = '}' if part == '{' else ']'
            while position < len(tokens) and tokens[position] != end:
                if part == '{':
                    raw_key = take()
                    key = string(raw_key) if raw_key.startswith(('"', "'")) else raw_key
                    if not re.fullmatch(r'[A-Za-z_$][\w$]*', key) or key in result or take() != ':':
                        raise ValueError('Invalid or repeated object key')
                    result[key] = value(depth + 1)
                else:
                    result.append(value(depth + 1))
                if tokens[position] == end:
                    break
                if take() != ',':
                    raise ValueError('Expected comma')
            if take() != end:
                raise ValueError('Unclosed JS literal')
            return result
        if part.startswith(('"', "'")):
            return string(part)
        if part in ('true', 'false', 'null'):
            return {'true': True, 'false': False, 'null': None}[part]
        if re.fullmatch(r'-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?', part):
            return json.loads(part)
        raise ValueError('Executable JS expressions are not recipe data')

    result = value()
    if tokens[position:] not in ([], [';']) or not isinstance(result, dict):
        raise ValueError('Unexpected code after data literal')
    return result


def clean(text):
    text = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', text)
    text = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', text)
    return text.replace('**', '').replace('`', '').strip()


def duration(text):
    """Recognize complete numeric durations; ambiguous/ranged values stay unknown."""
    text = text.lower().strip().rstrip('.')
    units = {'min': 1, 'mins': 1, 'minute': 1, 'minutes': 1,
             'h': 60, 'hr': 60, 'hrs': 60, 'hour': 60, 'hours': 60,
             'day': 1440, 'days': 1440}
    matches = list(re.finditer(r'(\d+(?:\.\d+)?)\s*(minutes?|mins?|hours?|hrs?|h|days?)\b', text))
    if not matches or re.sub(r'(\d+(?:\.\d+)?)\s*(minutes?|mins?|hours?|hrs?|h|days?)\b', '', text).strip(' ,+'):
        return None
    minutes = sum(float(m[1]) * units[m[2]] for m in matches)
    return int(minutes + 0.999) if 1 <= minutes <= 1440 else None


def translated_terms(text, mapping):
    return list(dict.fromkeys(chinese for english, chinese in mapping.items()
                             if re.search(r'(?<![a-z])' + re.escape(english) + r'(?![a-z])', text.lower())))


def ingredient_name(text, with_amount=False):
    # Only translate an exact head. Sauce, dried and powdered forms retain their
    # own identity, and alternative ingredients must not claim inventory equality.
    identity = text
    if with_amount:
        identity = re.sub(r'^\s*(?:\d+\s+\d+/\d+|\d+/\d+|\d+(?:\.\d+)?|[¼½¾])\s*', '', identity)
        identity = re.sub(r'^(?:kg|g|ml|l|cups?|tablespoons?|tbsp|teaspoons?|tsp|pounds?|lbs?|ounces?|oz|cloves?|cans?)\b\s*(?:of\s+)?', '', identity, flags=re.I)
        identity = re.sub(r'^\([^)]*\)\s*', '', identity)
        identity = re.sub(r'^(?:large|medium|small|fresh)\s+', '', identity, flags=re.I)
        identity = re.sub(r'\s+to taste$', '', identity, flags=re.I)
    head = re.split(r'[,()]', identity, maxsplit=1)[0].strip().lower()
    translated = LABELS['ingredients'].get(head)
    return f'{translated}（{text}）' if translated else text


def classify(title, tags, cuisine='', culture=''):
    places = LABELS['places']
    for label in [culture, cuisine, *tags]:
        if label.lower().strip() in places:
            return places[label.lower().strip()]
    for marker in sorted(places, key=len, reverse=True):
        if re.search(r'(?<![a-z])' + re.escape(marker) + r'(?![a-z])', title.lower()):
            return places[marker]
    return '其他', '国际家常'


def split_steps(pieces):
    result = []
    for piece in pieces:
        text = clean(piece)
        while len(text) > 1900:
            cut = text.rfind(' ', 0, 1900)
            if cut < 1:
                cut = 1900
            result.append(text[:cut])
            text = text[cut:].strip()
        if text:
            result.append(text)
    return result


def base_recipe(key, path, title, tags, ingredients, steps, group, area, description, minutes, notes, credit):
    source = SOURCES[key]
    original_slug = Path(path).stem
    slug = unicodedata.normalize('NFKD', original_slug).encode('ascii', 'ignore').decode()
    chinese_title = LABELS['titles'].get(original_slug)
    name = f'{chinese_title} · {title}' if chinese_title else title
    keywords = translated_terms(title + ' ' + ' '.join(tags), LABELS['food_terms'])
    keywords += translated_terms(' '.join(i['name'] for i in ingredients), LABELS['ingredients'])
    tags = list(dict.fromkeys([area, group, *keywords, *tags]))[:30]
    image = 'rice.jpg'
    for word, filename in [('pasta', 'pasta.jpg'), ('soup', 'mushroom-soup.jpg'), ('salad', 'salad.jpg'),
                           ('chicken', 'chicken.jpg'), ('salmon', 'salmon.jpg'), ('shrimp', 'shrimp.jpg'),
                           ('pancake', 'pancakes.jpg'), ('hummus', 'hummus.jpg')]:
        if word in title.lower():
            image = filename
            break
    allergens = translated_terms(' '.join(i['name'] for i in ingredients), {
        'egg': '鸡蛋', 'eggs': '鸡蛋', 'milk': '牛奶', 'butter': '牛奶', 'cream': '牛奶', 'cheese': '牛奶',
        'yogurt': '牛奶', 'paneer': '牛奶', 'parmesan': '牛奶', 'flour': '小麦', 'wheat': '小麦',
        'soy sauce': '大豆', 'tofu': '大豆', 'miso': '大豆', 'peanut': '花生', 'peanuts': '花生',
        'sesame': '芝麻', 'tahini': '芝麻', 'fish': '鱼', 'salmon': '鱼', 'cod': '鱼', 'tuna': '鱼',
        'shrimp': '虾', 'prawns': '虾', 'mussels': '贝类', 'clams': '贝类', 'oyster': '贝类',
        'almonds': '坚果', 'walnuts': '坚果', 'cashews': '坚果'})
    adaptation = f'由拾味厨房结构化整理；英文制作步骤保留原文，补充中文菜名、检索词和地区标签。{credit} '
    adaptation += ('本菜谱及其整理版本采用 CC BY-SA 4.0：https://creativecommons.org/licenses/by-sa/4.0/；改编时须署名并以相同许可分享。' if key == 'forkrecipe' else '原文采用 Unlicense；作者署名保留。')
    adaptation += ' 用时、份量未明确则保持未知；饮食类型与过敏原未经逐条认证。'
    r = dict(id=('pdr-' if key == 'public-domain' else 'fork-') + slug, name=name,
             region='东方' if group in ('中国', '亚洲', '中东') else '西方',
             cuisine=area + '风味', area_group=group, area=area,
             minutes=minutes or 1, time_note='source' if minutes else 'unknown',
             servings=2, servings_note='原文基准配方；人数未核对，保留原文用量，不自动缩放', quantity_notes=notes,
             diet='unknown', image='/assets/' + image, image_alt='餐桌风味示意图，并非本菜实拍',
             description=clean(description)[:500] or name, difficulty='家常',
             tip='步骤保留英文原文；可向小厨询问中文做法。按原文份量与实际锅具判断火候。',
             tags=tags, allergens=allergens, equipment=[], adaptation=adaptation,
             ingredients=ingredients, steps=split_steps(steps),
             source=dict(name='Public Domain Recipes · 原文' if key == 'public-domain' else 'ForkRecipe · FoodML / CC BY-SA 4.0',
                         title=title, url=f"https://github.com/{source['repository']}/blob/{source['commit']}/" + urllib.parse.quote(path),
                         retrieved_at='2026-10-08'))
    app.validate_recipe(r)
    return r


def parse_public_domain(path, text):
    match = re.match(r'^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)', text)
    if not match:
        raise ValueError('Missing frontmatter')
    metadata, body = match.groups()
    title_match = re.search(r'^title:\s*(.+)$', metadata, re.M)
    title = title_match[1].strip().strip('"\'') if title_match else Path(path).stem
    tags_match = re.search(r'^tags:\s*(\[[^\n]*\])', metadata, re.M)
    tags = []
    if tags_match:
        # This small frontmatter subset also accepts unquoted YAML list labels.
        for tag in tags_match[1][1:-1].split(','):
            tag = tag.strip().strip('"\'')
            if not re.fullmatch(r'[\w -]{1,80}', tag):
                raise ValueError('Unsupported frontmatter tag')
            tags.append(tag)
    author = re.search(r'^author:\s*(.+)$', metadata, re.M)
    pieces = re.split(r'^##\s+(.+?)\s*$', body, flags=re.M)
    sections = {pieces[n].lower().strip(): pieces[n + 1] for n in range(1, len(pieces) - 1, 2)}
    raw_ingredients = sections.get('ingredients', sections.get('ingredient', ''))
    raw_steps = '\n'.join('### ' + label + '\n' + sections[label] for label in sections
                          if 'directions' in label or label in ('instructions', 'method', 'preparation', 'steps'))
    ingredients = [dict(name=ingredient_name(clean(m[1]), with_amount=True), quantity=None, unit='原文用量')
                   for m in re.finditer(r'^\s*[-*+]\s+(.+)', raw_ingredients, re.M) if clean(m[1])]
    steps, current = [], []
    for raw_line in raw_steps.splitlines():
        line = clean(raw_line)
        if not line:
            continue
        if re.match(r'^(?:\d+[.)]|[-*+]\s|###)', line):
            if current:
                steps.append('\n'.join(current))
            current = [re.sub(r'^(?:\d+[.)]|[-*+]\s|###)\s*', '', line)]
        else:
            current.append(line)
    if current:
        steps.append('\n'.join(current))
    timing = {}
    for label, text_value in re.findall(r'(Prep time|Cook time|Total time):\s*([^\n]+)', body, re.I):
        timing[label.lower()] = duration(text_value)
    minutes = timing.get('total time')
    if not minutes and timing.get('prep time') and timing.get('cook time'):
        minutes = timing['prep time'] + timing['cook time']
        if minutes > 1440:
            minutes = None
    group, area = classify(title, tags)
    info = clean(pieces[0] + sections.get('description', ''))
    notes = raw_ingredients.strip() + '\n\n' + info
    r = base_recipe('public-domain', path, title, tags, ingredients, steps, group, area,
                    info.split('\n')[0], minutes, notes, '原文作者：' + (author[1].strip() if author else 'Public Domain Recipes contributors') + '。')
    note = sections.get('notes', sections.get('tips', ''))
    if note.strip():
        r['steps'].extend(split_steps(['Notes: ' + note]))
    servings = re.search(r'Servings:\s*(\d+)\s*$', pieces[0], re.M | re.I)
    if servings and 1 <= int(servings[1]) <= 20:
        r['servings'] = int(servings[1])
        r['servings_note'] = f'原文 {servings[1]} 份；食材行保留原文用量'
    app.validate_recipe(r)
    return r


def parse_forkrecipe(path, text):
    original = js_data(text)
    if Path(path).stem.startswith('_') or original.get('license') != 'CC-BY-SA':
        raise ValueError('Template or unsupported recipe license')
    ingredients, amounts = [], []
    for item in original['ingredients']:
        name = item['name']
        ingredients.append(dict(name=ingredient_name(name), quantity=None, unit='见原文基准用量'))
        amounts.append(f"{name}: {item.get('ratioValue', '')} {item.get('defaultUnit', '')}")
        if item.get('substitutions'):
            amounts.append('  Alternatives: ' + '; '.join(item['substitutions']))
    steps = []
    for node in original['processNodes']:
        piece = node['instructions']
        cue = node.get('visualCue', {})
        if cue.get('primaryTarget'):
            piece += '\nVisual cue: ' + cue['primaryTarget']
        for state in cue.get('spectrum', []):
            piece += '\n' + state['state'] + ': ' + state['description'] + ' ' + state.get('action', '')
        if node.get('feelCue'):
            piece += '\nFeel cue: ' + node['feelCue']
        steps.append(piece)
    group, area = classify(original['title'], original.get('tags', []), original.get('cuisine', ''), original.get('culture', ''))
    notes = '原文基准用量（ratioSystem=' + original.get('ratioSystem', '') + '）；不是经核对的人均用量。\n'
    notes += '\n'.join(amounts) + '\nActive time: ' + str(original.get('activeTime', '')) + '\nTotal time: ' + str(original.get('totalTime', ''))
    r = base_recipe('forkrecipe', path, original['title'], original.get('tags', []), ingredients, steps,
                    group, area, original['description'], duration(str(original.get('totalTime', ''))), notes,
                    '© 2026 FoodML 与 ForkRecipe contributors；原文作者：' + original.get('author', 'ForkRecipe Kitchen') + '。')
    r['difficulty'] = '进阶' if original.get('difficulty', 1) >= 4 else '家常'
    return r


def build_source(key, source):
    cache = ROOT / 'data' / 'upstream' / key
    tree = json.loads((cache / 'tree.json').read_text(encoding='utf-8'))
    if tree.get('sha') != source['commit'] or tree.get('truncated'):
        raise ValueError('Snapshot version mismatch')
    for notice in source['notices']:
        if not (cache / notice).is_file():
            raise ValueError('Missing upstream credit or license notice')
    paths = sorted(item['path'] for item in tree['tree'] if item['type'] == 'blob'
                   and item['path'].startswith(source['prefix']) and item['path'].endswith(source['suffix']))
    parsed, rejected, checksums, seen = [], [], {}, set()
    blob_ids = {item['path']: item['sha'] for item in tree['tree'] if item['type'] == 'blob'}
    for path in paths:
        if Path(path).stem.startswith('_'):
            continue
        cached = cache / path
        if not cached.resolve().is_relative_to(cache.resolve()):
            raise ValueError('Invalid snapshot path')
        raw = cached.read_bytes()
        blob = hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()
        if blob != blob_ids[path]:
            raise ValueError('Snapshot content does not match pinned Git blob: ' + path)
        checksums[path] = hashlib.sha256(raw).hexdigest()
        try:
            recipe = (parse_public_domain if key == 'public-domain' else parse_forkrecipe)(path, raw.decode('utf-8'))
            fingerprint = hashlib.sha256(json.dumps([recipe['name'], recipe['ingredients'], recipe['steps']], ensure_ascii=False, sort_keys=True).encode()).hexdigest()
            if fingerprint in seen:
                raise ValueError('Exact duplicate recipe content')
            seen.add(fingerprint)
            parsed.append(recipe)
        except (ValueError, KeyError, TypeError, IndexError, SyntaxError, app.AppError) as error:
            rejected.append(dict(path=path, reason=str(error)))
    manifest = {key: value for key, value in source.items() if key in ('repository', 'commit', 'license')}
    manifest.update(imported=len(parsed), rejected=rejected, checksums=checksums,
                    notice_checksums={path: hashlib.sha256((cache / path).read_bytes()).hexdigest() for path in source['notices']})
    return parsed, manifest


def write_region_counts():
    from collections import Counter
    recipes = []
    for filename in ('recipes.json', 'community-recipes.json', 'public-domain-recipes.json', 'forkrecipe-recipes.json'):
        recipes.extend(json.loads((ROOT / 'data' / filename).read_text(encoding='utf-8')))
    groups = Counter(r['area_group'] for r in recipes)
    areas = Counter((r['area_group'], r['area']) for r in recipes)
    order = ['中国', '亚洲', '欧洲', '美洲', '中东', '非洲', '大洋洲', '其他']
    text = f'# 地区分类\n\n共 **{len(recipes):,} 条做法**，**{len({r["area"] for r in recipes})} 个地区与风味标签**。同名菜的不同来源或不同做法分别计数。分类依据上游 cuisine / culture / tags 与明确的菜名，不明出处保留为国际家常；标签用于浏览，不代表原产地认证。\n\n| 大类 | 数量 |\n| --- | ---: |\n'
    text += ''.join(f'| {group} | {groups[group]} |\n' for group in order)
    for group in order:
        text += f'\n## {group}\n\n| 地区与风味 | 数量 |\n| --- | ---: |\n'
        text += ''.join(f'| {area} | {count} |\n' for (g, area), count in sorted(areas.items(), key=lambda item: (-item[1], item[0])) if g == group)
    (ROOT / 'data' / '地区分类.md').write_text(text, encoding='utf-8')


def request_bytes(url):
    for attempt in range(4):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'ShiweiKitchen/recipe-data-importer'})
            with urllib.request.urlopen(request, timeout=40) as response:
                data = response.read(2_000_001)
            if len(data) > 2_000_000:
                raise ValueError('Upstream text exceeds size limit')
            data.decode('utf-8')
            return data
        except (OSError, TimeoutError):
            if attempt == 3:
                raise
            time.sleep(attempt + 1)


def fetch_source(key, source):
    cache = ROOT / 'data' / 'upstream' / key
    cache.mkdir(parents=True, exist_ok=True)
    tree_path = cache / 'tree.json'
    if not tree_path.exists():
        url = f"https://api.github.com/repos/{source['repository']}/git/trees/{source['commit']}?recursive=1"
        tree_path.write_bytes(request_bytes(url))
    tree = json.loads(tree_path.read_text(encoding='utf-8'))
    if tree.get('sha') != source['commit'] or tree.get('truncated'):
        raise ValueError('Incomplete or unexpected upstream tree')
    paths = sorted(item['path'] for item in tree['tree'] if item['type'] == 'blob'
                   and item['path'].startswith(source['prefix']) and item['path'].endswith(source['suffix']))
    if key == 'public-domain':
        paths = [path for path in paths if Path(path).name != '_index.md']

    def download(path):
        target = cache / path
        if not target.resolve().is_relative_to(cache.resolve()):
            raise ValueError('Invalid snapshot path')
        if not target.exists():
            url = f"https://raw.githubusercontent.com/{source['repository']}/{source['commit']}/" + urllib.parse.quote(path)
            content = request_bytes(url)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(content)

    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(download, path) for path in paths + source['notices']]
        for count, future in enumerate(as_completed(futures), 1):
            future.result()
            if count % 100 == 0:
                print(f'{key}: downloaded {count}/{len(futures)} text files', flush=True)
    print(f'{key}: snapshot ready ({len(paths)} recipes)', flush=True)
    return paths


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fetch', action='store_true', help='Download the pinned text snapshots')
    options = parser.parse_args()
    if options.fetch:
        for key, source in SOURCES.items():
            fetch_source(key, source)
    recipes, manifests = [], {}
    for key, source in SOURCES.items():
        imported, manifest = build_source(key, source)
        recipes.extend(imported)
        manifests[key] = manifest
        print(f"{key}: imported {len(imported)}, excluded {len(manifest['rejected'])}", flush=True)
    if len({recipe['id'] for recipe in recipes}) != len(recipes):
        raise ValueError('Repeated recipe IDs')
    output = ROOT / 'data'
    for key in SOURCES:
        prefix = 'pdr-' if key == 'public-domain' else 'fork-'
        path = output / (key + '-recipes.json')
        path.write_text(json.dumps([r for r in recipes if r['id'].startswith(prefix)], ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    manifests['retrieved_at'] = '2026-10-08'
    manifests['labels_sha256'] = hashlib.sha256((output / 'open-recipe-labels.json').read_bytes()).hexdigest()
    (output / 'open-recipe-sources.json').write_text(json.dumps(manifests, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    write_region_counts()


if __name__ == '__main__':
    main()
