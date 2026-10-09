"""Import a pinned, Unlicense recipe snapshot. Never execute upstream code.

python scripts/expand_recipes.py --fetch  # download Markdown only, no images
python scripts/expand_recipes.py          # rebuild from the local snapshot
"""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
import hashlib
import json
from pathlib import Path
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import app

REPO = 'Anduin2017/HowToCook'
SHA = 'a2d45c6984dff9ee941da0e7c452f7965965d962'
CACHE = ROOT / 'data' / 'upstream' / 'howtocook'
RAW = f'https://raw.githubusercontent.com/{REPO}/{SHA}/'

# Editorial browsing labels. Unclear or multi-region dishes remain 家常菜.
AREA_NAMES = {
    '四川': '回锅肉 宫保鸡丁 麻婆豆腐 鱼香肉丝 水煮肉片 水煮牛肉 水煮鱼 辣子鸡 口水鸡 夫妻肺片 干煸四季豆 钵钵鸡'.split(),
    '广东': '白切鸡 白灼虾 豉汁蒸排骨 广式萝卜牛腩 广式香肠煲仔饭 煲仔饭 咕噜肉 蜜汁叉烧 梅菜扣肉'.split(),
    '湖南': '剁椒鱼头 农家一碗香 小炒肉 小炒黄牛肉 手撕包菜'.split(),
    '东北': '锅包肉 地三鲜 杀猪菜 酸菜白肉 酸菜炖白肉 猪肉炖粉条 小鸡炖蘑菇 东北大拉皮'.split(),
    '山东': '把子肉 葱烧海参 鲁菜红烧肉'.split(),
    '江苏': '盐水鸭 扬州炒饭 清炖狮子头 红烧狮子头'.split(),
    '浙江': '东坡肉 西湖牛肉羹'.split(),
    '福建': '荔枝肉 佛跳墙'.split(),
    '新疆': '新疆大盘鸡 大盘鸡 孜然羊肉'.split(),
    '湖北': '热干面 排骨藕汤 排骨莲藕汤'.split(),
    '河南': '河南蒸面条'.split(),
    '陕西': '油泼面 肉夹馍'.split(),
    '北京': '京酱肉丝 乾隆白菜 炸酱面'.split(),
    '台湾': '台式卤肉饭 三杯鸡'.split(),
}
FOREIGN_MARKERS = [
    ('亚洲', '日本', ('日式', '日本', '照烧', '寿司', '味噌', '亲子丼', '肥牛丼', '温泉蛋')),
    ('亚洲', '韩国', ('韩式', '韩国家庭')),
    ('亚洲', '印度', ('印度',)), ('亚洲', '巴基斯坦', ('巴基斯坦',)),
    ('亚洲', '泰国', ('泰式', '泰国')), ('亚洲', '印度尼西亚', ('印尼',)),
    ('欧洲', '英国', ('英式', '苏格兰')), ('欧洲', '法国', ('法式',)),
    ('欧洲', '意大利', ('意大利', '意式', '提拉米苏', '意面', '披萨')),
    ('欧洲', '西班牙', ('西班牙', '巴斯克')),
    ('美洲', '美国', ('美式', '纽约')), ('美洲', '古巴', ('Mojito', '莫吉托')),
    ('中东', '中东', ('鹰嘴豆炸丸',)), ('非洲', '北非', ('北非蛋',)),
]


def clean(text):
    text = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', text)
    text = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', text)
    text = re.sub(r'<[^>]+>', '', text)
    return text.replace('**', '').replace('`', '').strip()


def common_allergens(text):
    # Labels indicate detected ingredients only, never certify absence.
    patterns={'鸡蛋':('鸡蛋','鸭蛋','蛋黄','蛋清','蛋液','蛋白','蛋黄酱'),
              '牛奶':('牛奶','奶油','黄油','奶酪','乳酪','酸奶','乳粉'),
              '小麦':('面粉','低筋','高筋','小麦','面包','酱油'),
              '大豆':('豆腐','豆浆','大豆','豆瓣','味噌','酱油','生抽','老抽'),
              '花生':('花生',),'芝麻':('芝麻',),
              '鱼':('鱼','伍斯特酱'), '虾':('虾','虾酱'),
              '贝类':('蚝','蛤','贝','蛏'), '坚果':('核桃','腰果','杏仁','榛子','松子')}
    return [name for name,terms in patterns.items() if any(t in text for t in terms)]


def classify(name, intro=''):
    if '北非蛋' in name:
        return '非洲','北非'
    if '印度尼西亚' in intro[:300] or '印尼' in name:
        return '亚洲','印度尼西亚'
    for group, area, markers in FOREIGN_MARKERS:
        if any(marker in name or marker in intro[:300] for marker in markers):
            return group, area
    if '新加坡' in intro[:300]:
        return '亚洲','新加坡'
    if '江浙沪' in intro[:300]:
        return '中国','江浙沪'
    if '川湘' in intro[:300]:
        return '中国','川湘'
    for area, names in AREA_NAMES.items():
        if name in names:
            return '中国', area
    mentioned=[a for a, words in {
        '四川':('四川','川菜','川味'),'广东':('广东','粤菜','广式','粤式'),
        '湖南':('湖南','湘菜','湘式'),'山东':('山东','鲁菜'),
        '江苏':('江苏','苏菜'),'浙江':('浙江','浙菜'),
        '福建':('福建','闽菜'),'安徽':('安徽','徽菜'),
    }.items() if any(w in intro[:300] for w in words)]
    if len(mentioned)>1:
        return '中国','家常菜'
    for area, markers in {
        '四川': ('四川', '川菜', '川味'), '广东': ('广东', '粤菜', '广式', '粤式'),
        '湖南': ('湖南', '湘菜', '湘式'), '东北': ('东北',), '山东': ('山东', '鲁菜'),
        '江苏': ('江苏', '苏菜', '南京'), '浙江': ('浙江', '浙菜'), '福建': ('福建', '闽菜'),
        '安徽': ('安徽', '徽菜'), '新疆': ('新疆',), '云南': ('云南', '滇式'),
        '贵州': ('贵州', '黔式', '贵阳'), '湖北': ('湖北', '武汉'), '河南': ('河南',),
        '陕西': ('陕西', '陕式'), '北京': ('北京', '京式'), '台湾': ('台湾', '台式'),
        '香港': ('香港', '港式'), '海南': ('海南',), '江西': ('江西', '赣菜'),
        '广西': ('广西','阳朔'), '上海': ('上海','沪菜','本帮'), '天津': ('天津','津菜'),
        '山西': ('山西','晋菜'), '重庆': ('重庆',), '河北': ('河北',),
        '甘肃': ('甘肃',), '宁夏': ('宁夏',), '内蒙古': ('内蒙古',),
    }.items():
        if any(m in name or m in intro[:300] for m in markers):
            return '中国', area
    if any(s in name for s in ('奶油蘑菇汤', '奶油蘑菇浓汤', '华夫饼', '可颂', '惠灵顿', '班尼迪克', '贝果')):
        return '欧洲', '其他西式'
    if any(s in intro[:300] for s in ('欧式','欧洲')):
        return '欧洲','其他西式'
    if any(s in intro[:300] for s in ('西式','西餐')):
        return '其他','其他西式'
    return '中国', '家常菜'


def download(path):
    target = CACHE / (hashlib.sha256(path.encode()).hexdigest()[:20] + '.md')
    if target.exists():
        return path, target
    for attempt in range(3):
        try:
            request = urllib.request.Request(RAW + urllib.parse.quote(path), headers={'User-Agent': 'ShiweiKitchen recipe importer'})
            with urllib.request.urlopen(request, timeout=35) as response:
                data = response.read(200_000)
            data.decode('utf-8')
            target.write_bytes(data)
            return path, target
        except Exception:
            if attempt == 2:
                raise
            time.sleep(attempt + 1)


def parse(path, text):
    rid = 'htc-' + hashlib.sha256(path.encode()).hexdigest()[:16]
    name = re.search(r'^#\s+(.+)', text, re.M).group(1).strip()
    name = re.sub(r'的做法$', '', name)
    sections = re.split(r'^##\s+(.+?)\s*$', text, flags=re.M)
    intro = clean(sections[0].split('\n', 1)[1])
    pieces = {sections[i].strip(): sections[i + 1] for i in range(1, len(sections) - 1, 2)}
    required = next((v for k, v in pieces.items() if '原料' in k), '')
    operation = next((v for k, v in pieces.items() if k in ('操作', '制作步骤') or k.startswith('操作')), '')
    calculation = next((v for k, v in pieces.items() if '计算' in k), '')
    names = [clean(m.group(1)) for m in re.finditer(r'^\s*[-*+]\s+(.+)', required, re.M)]
    names = list(dict.fromkeys(n for n in names if n and len(n) <= 500))
    # Keep subsection headings and all continuations; don't merge alternative
    # methods into one fictional sequence. Strip Markdown images only.
    steps = []
    current = []
    for raw_line in operation.splitlines():
        line = clean(raw_line)
        if not line or line.startswith('如果您遵循'):
            continue
        if line.startswith('###'):
            if current:
                steps.append('\n'.join(current))
                current=[]
            steps.append('【'+line.lstrip('#').strip()+'】')
            continue
        if re.match(r'^\s{2,}[-*+]\s+',raw_line) and current:
            current.append('补充：'+re.sub(r'^[-*+]\s*','',line))
            continue
        if re.match(r'^(?:\d+[.)、]|[-*+]\s|###)', line):
            content=re.sub(r'^(?:\d+[.)、]|[-*+]+|#+)\s*', '', line)
            if not content:
                continue
            if current:
                steps.append('\n'.join(current))
            current = [content]
        else:
            current.append(line)
    if current:
        steps.append('\n'.join(current))
    if not names or len(names) > 50 or not steps or len(steps) > 100 or any(len(s) > 2000 for s in steps):
        raise ValueError('missing/oversized ingredients or steps')
    group, area = classify(name, intro)
    time_match = re.search(r'(\d+(?:\.\d+)?|[一二两三四五六七八九十半]+)\s*(?:个)?\s*(半)?\s*(分钟|小时|钟头)', intro)
    minutes=1
    time_note = 'source' if time_match else 'unknown'
    if time_match:
        raw=time_match.group(1)
        digits={'一':1,'二':2,'两':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'半':0.5}
        if re.fullmatch(r'\d+(?:\.\d+)?',raw):
            number=float(raw)
        elif '十' in raw:
            a,b=raw.split('十',1)
            number=digits.get(a,1)*10+digits.get(b,0)
        else:
            number=digits.get(raw,1)
        if time_match.group(2):
            number+=0.5
        minutes=int(number*(60 if time_match.group(3)!='分钟' else 1))
    stars = re.search(r'难度[：:]\s*(★+)', intro)
    description = next((s for s in intro.splitlines() if s and not s.startswith(('预估', '#'))), name).split('。')[0]+'。'
    notes = clean(calculation)
    tip = clean(pieces.get('附加内容', '')).split('如果您遵循')[0].strip().rstrip('-* \n')
    # Incoming diet status is unverified. Never guess vegan/allergen-free.
    r = dict(id=rid, name=name, region='东方' if group in ('中国','亚洲','中东') else '西方',
             cuisine=area + ('风味' if area != '家常菜' else ''), area_group=group, area=area,
             minutes=min(max(minutes, 1), 1440), time_note=time_note, servings=2,
             servings_note='按原文份量；原文用量说明保留，不自动缩放', quantity_notes=notes,
             diet='unknown', image='/assets/rice.jpg', image_alt='餐桌风味示意图，并非本菜实拍',
             description=description[:260], difficulty='进阶' if stars and len(stars.group(1)) >= 4 else '家常',
             tip=(tip[:1800] or '按照食材与设备情况调整，完整说明可查看来源。'),
             tags=[area,group,path.split('/')[1]], allergens=common_allergens(' '.join(names)+notes), equipment=[],
             adaptation='来自 HowToCook 开源社区菜谱，保留原文食材、用量与操作；用时若未标注不参与限时筛选。地区标签用于浏览，非地域真实性认证。饮食类型未经逐条核对。',
             ingredients=[dict(name=n,quantity=None,unit='见用量说明' if notes else '原文未标注') for n in names],
             steps=steps,
             source=dict(name='HowToCook · GitHub',title=name,url=f'https://github.com/{REPO}/blob/{SHA}/'+urllib.parse.quote(path),retrieved_at=date.today().isoformat()))
    # Existing images are illustrative; choose a relevant broad food category.
    images={'meat_dish':'chicken.jpg','aquatic':'salmon.jpg','dessert':'pancakes.jpg',
            'breakfast':'pancakes.jpg','soup':'mushroom-soup.jpg','staple':'rice.jpg'}
    image=images.get(path.split('/')[1], 'salad.jpg')
    if (app.PUBLIC/'assets'/image).exists():
        r['image']='/assets/'+image
    r=app.classify_recipe(r)
    app.validate_recipe(r)
    return r


def main():
    args=argparse.ArgumentParser()
    args.add_argument('--fetch', action='store_true')
    opts=args.parse_args()
    CACHE.mkdir(parents=True,exist_ok=True)
    tree=json.loads((ROOT/'data'/'HowToCook-tree.json').read_text(encoding='utf-8'))
    assert tree['sha']==SHA, 'Snapshot version mismatch'
    paths=sorted(x['path'] for x in tree['tree'] if x['type']=='blob' and x['path'].startswith('dishes/') and x['path'].endswith('.md') and '/template/' not in x['path'])
    if opts.fetch:
        with ThreadPoolExecutor(max_workers=8) as pool:
            pending=[pool.submit(download,p) for p in paths]
            for n, future in enumerate(as_completed(pending),1):
                future.result()
                if n%50==0:
                    print(f'Downloaded {n}/{len(paths)}', flush=True)
        download('LICENSE')
    recipes=json.loads((ROOT/'data'/'recipes.json').read_text(encoding='utf-8'))
    seed_count=len(recipes)
    rejected=[]
    checksums={}
    for path in paths:
        cached=CACHE/(hashlib.sha256(path.encode()).hexdigest()[:20]+'.md')
        try:
            content=cached.read_bytes()
            recipe=parse(path,content.decode('utf-8'))
            checksums[path]=hashlib.sha256(content).hexdigest()
            recipes.append(recipe)
        except (ValueError,AttributeError,app.AppError) as error:
            rejected.append(dict(path=path,reason=str(error)))
    howtocook_count=len(recipes)-seed_count
    for filename in ('western-recipes.json',):
        extra=ROOT/'data'/filename
        if extra.exists():
            recipes.extend(json.loads(extra.read_text(encoding='utf-8')))
    (ROOT/'data'/'community-recipes.json').write_text(json.dumps(recipes[seed_count:],ensure_ascii=False,indent=2),encoding='utf-8')
    manifest=dict(repository=REPO,commit=SHA,license='Unlicense',retrieved_at=date.today().isoformat(),imported=howtocook_count,rejected=rejected,checksums=checksums,
                  supplemental_source=dict(repository='Bastian/recipes',commit='e5dd42a6a6cd1db25f083e1d0417af01c44527e9',license='MIT',imported=len(recipes)-seed_count-howtocook_count,excluded=['pasta-salad (TODO)','tomatosoup (TODO)']))
    (ROOT/'data'/'recipe-sources.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(dict(imported=len(recipes)-seed_count,rejected=rejected),ensure_ascii=False))


if __name__=='__main__':
    main()
