"""Chinese adaptations of eight complete Bastian/recipes community recipes.

Upstream MIT license and original Markdown are in data/upstream/bastian.
Incomplete TODO recipes are deliberately excluded. Source commit is pinned.
"""
from pathlib import Path
import json
import sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import app
from expand_recipes import common_allergens

DATA=[
 ('arroz-rojo','墨西哥番茄红米饭','美洲','墨西哥','rice',
  '番茄与蔬菜煮进长粒米里，米粒裹满浓郁的红色汤汁。',
  '长粒米200克；橄榄油2汤匙；洋葱1个；蒜4瓣；胡萝卜1根；红甜椒1个；番茄4个；豌豆1杯；红辣椒2根；蔬菜高汤250毫升；盐、黑胡椒、孜然各半茶匙；辣椒粉1茶匙。原文为2份。',
  ['长粒米反复淘洗至水较清，充分沥干。','洋葱和蒜切碎；胡萝卜、甜椒与辣椒切小块；番茄打成泥。','锅中加入橄榄油，中火炒洋葱与蒜约2分钟；倒入米，转低火炒约15分钟，注意不要焦糊。','加入胡萝卜、甜椒、豌豆、辣椒和调味料，继续炒约3分钟。','加入番茄泥与蔬菜高汤，煮开后转小火约15分钟，直至米饭熟透。若米未熟而水将干，少量补水。','离火焖约4分钟，用叉子拨松。'],
  '原文为2份；保留原文用量'),
 ('enchiladas','墨西哥焗肉馅卷饼','美洲','墨西哥','chicken',
  '肉馅、红腰豆与玉米卷进薄饼，再铺上酸奶油奶酪烤香。',
  '洋葱1个；蒜1瓣；肉末350克；玉米150克；罐装红腰豆400克；番茄2个；莎莎酱150毫升；薄饼4张；切达奶酪75克；酸奶油100克；牛油果1个；柠檬汁1汤匙；油、盐、黑胡椒和辣椒粉适量。原文为4份。',
  ['洋葱和蒜切碎；豆与玉米沥干；番茄四分之三粗切，余下切细留作蘸酱。','锅中放油炒熟肉末，再放洋葱与蒜炒香。加入莎莎酱、豆、玉米和粗切番茄，用盐、黑胡椒及辣椒粉调味。','奶酪刨丝，与酸奶油拌匀。','烤盘底部铺三分之一馅料，其余卷入薄饼。卷饼切半排入烤盘，铺上奶酪酸奶油。','烤箱预热200°C，烤约30分钟至馅料热透、表面上色。','牛油果压成泥，拌入柠檬汁和预留番茄丁，用盐与黑胡椒调味，作为蘸酱。'],
  '原文为4份；保留原文用量'),
 ('nachos','墨西哥肉酱焗玉米片','美洲','墨西哥','chicken',
  '玉米片铺上牛肉豆酱与融化奶酪，适合大家一起分享。',
  '牛肉末350克；洋葱1个；红腰豆1罐；番茄泥250克；黑胡椒1茶匙；孜然四分之一茶匙；辣椒粉1茶匙；玉米片300克；番茄3个；橄榄片4汤匙；奶酪丝1包；盐适量。原文为3份。原文有一条缺失名称的半茶匙调料，未擅自补全。',
  ['洋葱切碎，番茄切丁，红腰豆沥干。将玉米片铺入耐热烤盘。','锅中炒牛肉末至变色，加入洋葱炒至透明。加入番茄泥与豆，用盐、黑胡椒、孜然和辣椒粉调味，继续煮至肉末完全熟透。','肉酱均匀铺在玉米片上，撒上番茄丁、橄榄片与奶酪丝。','烤箱预热200°C，上下火烤约10分钟，至奶酪融化，趁热食用。'],
  '原文为3份；保留原文用量'),
 ('pizza','意大利基础比萨面团','欧洲','意大利','pasta',
  '揉面、两次醒发，用基础面团做出薄底比萨。',
  '面粉500克；水250毫升；鲜酵母21克；盐10克；橄榄油25毫升；比萨馅料按喜好准备。原文面团可做3个比萨，未规定人数。',
  ['先混合水、酵母、盐与橄榄油，加入面粉，用揉面钩揉约5分钟，再手揉约10分钟。','面团盖湿布醒发至少30分钟。分成3份，略揉后搓圆，分别盖好再醒发至少60分钟。','用手把面团展开成圆饼，铺上少量喜欢的酱料与配料，避免堆得太厚。','烤箱与比萨石提前预热。原文使用300°C热风烤约6–8分钟；家庭烤箱按设备允许温度使用，观察饼底与表面熟度，低温需要更长时间。'],
  '原文为3个比萨；不按人数自动换算'),
 ('roast-potatoes','蒜香迷迭香脆皮烤土豆','欧洲','其他西式','salad',
  '先煮后烤，土豆外层酥脆，拌入蒜与迷迭香。',
  '土豆2千克；橄榄油60毫升；鲜迷迭香4枝；蒜6瓣；盐与黑胡椒适量。原文煮土豆的水约2升、盐约25克、小苏打1包；包装规格未标注，须按所用产品核对用量。原文未标注人数。',
  ['土豆去皮，切成大小接近的块；迷迭香切碎，蒜压碎；烤箱预热200°C热风。','煮开加盐的水，将土豆煮约10分钟，直至刀尖容易穿入。原文使用少量小苏打帮助表面起毛，包装规格不明时可省略。','同时用橄榄油中火煎香蒜与迷迭香约2–3分钟。过滤，将香料和油分开保留。','土豆沥干后蒸散水汽约30秒，加入香料油、盐与黑胡椒，摇晃至边缘略起毛。','摊在烤盘，先烤20分钟，翻面再烤约30分钟至金黄酥脆。','出炉后拌入预留的蒜与迷迭香。'],
  '原文未标注人数；保留原文用量'),
 ('shashlik-pot','德式甜椒猪肉炖锅','欧洲','德国','chicken',
  '猪肉、培根与甜椒在酱汁里慢慢炖软，适合周末准备。',
  '猪肉1.25千克；培根250克；甜椒3个；洋葱250克；Hela Schaschlik Pikant四分之一管；Maggi Texicana Salsa三分之二管；Knorr Schaschlik酱2瓶；水400–500毫升；食用油适量。原文为约6份，品牌包装容量未标注。',
  ['猪肉切约2厘米块，培根切丁，洋葱切半圈，甜椒切2–3厘米块。','锅中放油，分批把猪肉煎至表面上色，取出。再炒洋葱与甜椒至微黄。','将肉、培根、洋葱和甜椒放入可入烤箱的炖锅，加入三种酱料与水，拌匀。','原文以预热220°C上下火炖约4小时；中途搅拌、补水并检查软烂程度，避免酱汁烧干。搭配米饭或面包。'],
  '原文约6份；品牌酱料按原文核对包装'),
 ('smashed-burger','美式双层压扁牛肉汉堡','美洲','美国','chicken',
  '薄肉饼煎出焦香边缘，叠上切达奶酪与清爽蔬菜。',
  '汉堡面包4个；牛肉末680克；切达奶酪8片；番茄1个；澄清黄油4汤匙；生菜约五分之一颗；盐与黑胡椒适量。酱料：蛋黄酱120毫升、洋葱半个、伍斯特酱1茶匙、辣椒酱2茶匙、芥末酱1汤匙。原文可做4个汉堡。',
  ['牛肉末分成8份，每份约85克，轻轻搓圆后冷藏。生菜切碎，番茄切8片，洋葱切得很细。','将洋葱与蛋黄酱、伍斯特酱、辣椒酱和芥末酱拌匀。','平底锅中放澄清黄油，中火将面包切面煎至金黄。','锅转高火，放牛肉球，用结实锅铲压成薄饼，撒盐与黑胡椒。底部焦香后翻面，放奶酪片，煎至完全熟透。','每两块肉饼叠成一组。面包底抹酱，依次铺生菜、番茄与双层肉饼，盖上面包。'],
  '原文为4个汉堡；保留原文用量'),
 ('tarte-flambee','阿尔萨斯培根洋葱薄饼','欧洲','法国','pasta',
  '薄薄的无酵母饼底，抹上奶油与酸奶油，烤出洋葱培根香。',
  '面粉250克；水125毫升；盐5克；食用油2汤匙。馅料：洋葱1个、双倍奶油或法式酸奶油半杯、酸奶油半杯、培根丁100克、细香葱或小葱适量、盐与黑胡椒适量。原文为2张薄饼；杯的包装容量未标注。',
  ['混合面粉、水、盐与油，揉成面团，擀成很薄的饼底。','两种奶油拌匀，用盐与黑胡椒调味，薄薄抹在饼底上。','洋葱切薄半圈，加极少量水，以600瓦微波加热约1分钟。铺在饼底上，再撒培根丁。','烤箱预热250°C上下火，置下层烤约15分钟至饼底熟透、边缘上色。出炉撒上葱花。'],
  '原文为2张薄饼；不按人数自动换算'),
]

def main():
    records=[]
    for slug,name,group,area,image,description,notes,steps,serving_note in DATA:
        # Names extracted from the translated quantity notes keep every listed
        # ingredient searchable, including compound condiment descriptions.
        ingredients=[dict(name=s.strip(),quantity=None,unit='见用量说明') for s in notes.split('；') if s.strip()]
        r=dict(id='bastian-'+slug,name=name,region='西方',cuisine=area+'风味',area_group=group,area=area,
               minutes=1,time_note='unknown',servings=2,servings_note=serving_note,quantity_notes=notes,
               diet='unknown',image=f'/assets/{image}.jpg',image_alt='餐桌风味示意，并非本菜实拍',description=description,
               difficulty='家常',tip='这是一份中文整理版，调味、份量与烤箱设置请结合原文和实际情况调整。',
               tags=[area,group,'西式'],allergens=common_allergens(notes),equipment=[],ingredients=ingredients,steps=steps,
               adaptation='Bastian/recipes（MIT）中文整理；原文份量保留。总用时未明确标注；饮食类型待核对。地区为浏览标签。部分原文另附有原始作者链接。',
               source=dict(name='Bastian/recipes · GitHub',title=name,retrieved_at='2026-10-08',
                           url='https://github.com/Bastian/recipes/blob/e5dd42a6a6cd1db25f083e1d0417af01c44527e9/recipes/'+slug+'.md'))
        app.validate_recipe(r)
        records.append(r)
    (ROOT/'data/western-recipes.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f'Created {len(records)} western adaptations; 2 TODO records excluded.')

if __name__=='__main__':
    main()
