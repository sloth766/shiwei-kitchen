"""Conservative shared food identities and explicitly named kitchen equipment.

Search aliases, inventory equivalence and substitutes are separate concepts.
Unknown annotations are retained rather than silently treating processed food
as a fresh ingredient. Original upstream Markdown is never modified.
"""
import json
from pathlib import Path
import re
import unicodedata

INGREDIENT_ALIASES={'西红柿':'番茄','花生米':'花生','大虾':'虾','意大利面':'意面',
    'pasta':'意面','chicken':'鸡肉','tomato':'番茄','egg':'鸡蛋','salmon':'三文鱼','tofu':'豆腐'}
EQUIPMENT_NAMES=set(('冰箱 烤箱 微波炉 电饭煲 电饭锅 空气炸锅 平底锅 炒锅 锅 蒸锅 蒸笼 '
    '菜刀 砧板 菜板 搅拌机 料理机 保鲜膜 锡纸 烘焙纸 烤盘 量杯 厨房秤 漏勺 滤网 勺子 筷子 '
    '碗 盘子 铁锅 厨房纸 平底煎锅 耐热碗 电锅 锡纸盘 厚底锅 不粘平底锅 烘焙刮刀 小锅 '
    '大锅 小奶锅 高压锅 小碗 大碗 电压力锅 砂锅 粥锅 中号玻璃碗 煮锅 深锅 '
    '披萨石 大不锈钢碗 宽口平底锅 家庭小陶瓷碗 空气炸锅烤架').split())
# Whole, reviewed phrases only: never classify by finding “锅” inside food.
EQUIPMENT_PHRASES=set(('保鲜膜或微波炉专用盖|放得下玉米的锅|空气炸锅或者油锅|锡纸或保鲜膜|'
    '烤箱 大小不限|模具或碗|普通的炒锅|电饭煲/电炖锅|炒锅 / 煎锅|'
    '蒸锅或电蒸炉|盆、碗、盘子、蒜臼|平底锅 或 微波炉|必备:厨房纸|'
    '砂锅或深汤锅|瓦罐或者高压锅|烤箱或明火|一口有点深度的锅|深锅或炒锅|'
    '蒸锅,需带笼屉|砵或者有一定深度的碗').split('|'))
OPTIONAL_NOTES={'可选','选用','适量','少许','若干','按需','参考包装用量','用量见包装'}
QUANTITY=r'(?:\d+(?:\.\d+)?|[一二三四五六七八九十两半]+)\s*(?:个|只|根|块|袋|瓶|盒|片|克|千克|公斤|斤|毫升|升|g|kg|ml|l)'


# The importer's reviewed exact translations also establish the meaning of a
# bilingual annotation. Unreviewed qualifiers still remain part of the identity.
OPEN_INGREDIENT_LABELS=json.loads(
    (Path(__file__).resolve().parent/'data/open-recipe-labels.json').read_text(encoding='utf-8'))['ingredients']


def translated_note_matches(base,note):
    note=re.sub(r'^\s*(?:\d+\s+\d+/\d+|\d+/\d+|\d+(?:\.\d+)?)\s*','',note)
    # Cans are deliberately excluded: their contents are preserved food.
    note=re.sub(r'^(?:kg|g|ml|l|cups?|tablespoons?|tbsp|teaspoons?|tsp|pounds?|lbs?|ounces?|oz|cloves?)\b\s*(?:of\s+)?','',note)
    note=re.sub(r'^(?:large|medium|small|fresh)\s+','',note)
    note=re.sub(r'\s+to taste$','',note)
    head,*preparation=note.split(',')
    translated=OPEN_INGREDIENT_LABELS.get(head.strip())
    if not translated or INGREDIENT_ALIASES.get(translated,translated)!=base:
        return False
    # Cutting instructions do not change the food; drying/freezing/alternatives do.
    return all(re.fullmatch(r'(?:(?:finely|roughly|thinly)\s+)?(?:minced|chopped|diced|sliced|peeled|grated)',part.strip())
               for part in preparation)


def ingredient_identity(name):
    text=unicodedata.normalize('NFKC',name).strip().lower()
    base=re.split(r'[\(\[【]',text,maxsplit=1)[0].strip()
    base=INGREDIENT_ALIASES.get(base,base)
    def annotation(match):
        note=match.group(1).strip()
        if note in OPTIONAL_NOTES or re.fullmatch(QUANTITY,note) or translated_note_matches(base,note):
            return ''
        return '('+note+')'
    text=re.sub(r'[\(\[【]([^()\[\]【】]*)[\)\]】]',annotation,text)
    text=re.sub(r'\s*'+QUANTITY+r'\s*$','',text).strip()
    # Alias only the actual name, keeping any processing annotation intact.
    base,separator,note=text.partition('(')
    return INGREDIENT_ALIASES.get(base.strip(),base.strip())+(separator+note if separator else '')


def is_equipment(name):
    text=unicodedata.normalize('NFKC',name).strip()
    if text in EQUIPMENT_PHRASES:
        return True
    base=re.split(r'[\(\[【]',text,maxsplit=1)[0].strip()
    base=re.sub(r'\s*(?:'+QUANTITY+r'|若干)\s*$','',base).strip()
    base=re.sub(r'^'+QUANTITY+r'\s*','',base).strip()
    return base in EQUIPMENT_NAMES


def classify_recipe(recipe):
    """Return a shallow copy, moving only certain equipment into its field."""
    result=dict(recipe)
    equipment=list(recipe.get('equipment',[]))
    food=[]
    for item in recipe.get('ingredients',[]):
        name=item.get('name','') if isinstance(item,dict) else ''
        if isinstance(name,str) and len(name)<=80 and is_equipment(name):
            if name not in equipment:
                equipment.append(name)
        else:
            food.append(item)
    result['ingredients']=food
    result['equipment']=equipment
    return result
