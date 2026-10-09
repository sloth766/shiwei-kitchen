# 📚 菜谱与素材来源

数据快照日期：**2026-10-08**。共 1,775 条做法，保存来源与版本信息；同名菜的不同来源或不同做法分别保留。精选家庭做法为中文改编，社区配方保留上游文字与许可。

### 设备分类核验

`ingredient_rules.py` 使用精确名称和已核对短语区分食材与设备；原始 Markdown 不变，菜谱 ID、来源、用时和饮食类型不因分类而改写。`data/equipment-corrections.json` 记录每项原文字段、源文件 SHA-256、移动目标及核验状态。`source_checked` 只表示本次设备条目与原文核对，`cooking_tested` 表示实际试做，两者不能混用；当前没有新增试做结论。

运行 `python scripts/classify_equipment.py` 查看检查结果，显式加 `--apply` 才更新分类和核验记录。仍混写食材与设备的条目保留原文并列入 `pending`，不以模糊规则自动剔除。

引入的 Inkensai 新增代码与文档贡献保留其 MIT 许可，范围见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。原有项目许可安排保持不变；下列第三方菜谱、图片及来源快照继续保留各自许可。

## 🌏 社区菜谱

| 来源 | 收录 | 固定版本 | 许可 |
| --- | ---: | --- | --- |
| [Anduin2017/HowToCook](https://github.com/Anduin2017/HowToCook) | 372 | `a2d45c6984dff9ee941da0e7c452f7965965d962` | [Unlicense](data/upstream/howtocook/LICENSE) |
| [Bastian/recipes](https://github.com/Bastian/recipes) | 8 | `e5dd42a6a6cd1db25f083e1d0417af01c44527e9` | [MIT · Bastian Oppermann](data/upstream/bastian/LICENSE) |
| [ronaldl29/public-domain-recipes](https://github.com/ronaldl29/public-domain-recipes) | 415 | `da84378b36bd5b2e3cb35f610d64630bf1bd899d` | [Unlicense](data/upstream/public-domain/LICENSE.md) |
| [futurechef/forkrecipe-recipes](https://github.com/futurechef/forkrecipe-recipes) | 963 | `934319313379201f91ddccdd29abd054039a3ad6` | [CC BY-SA 4.0](data/upstream/forkrecipe/LICENSE) · FoodML 与 ForkRecipe contributors |

HowToCook：仅收录 dishes/ 下有食材和操作的372篇 Markdown，排除示例模板。保存原文食材、用量和操作文字，去掉图片与 Markdown 样式，保留分支/小节。简短描述只保留风味介绍首句。

Bastian/recipes：保存原始 Markdown 快照，8道完整配方整理为中文（墨西哥米饭/卷饼/玉米片、比萨、烤土豆、德式炖锅、美式汉堡、阿尔萨斯薄饼）。意面沙拉与番茄汤仅有 TODO，未入库。部分原文另引用 Chefkoch 或视频作者，原始链接在快照中保留。品牌酱料和未明确的包装容量不擅自填数。

Public Domain Recipes：[上游许可声明](https://github.com/ronaldl29/public-domain-recipes/blob/da84378b36bd5b2e3cb35f610d64630bf1bd899d/README.md#license) 明确将网站及全部内容置于公有领域。收录 `content/` 下 415 篇食谱，排除首页索引。保留作者署名、原文食材用量、准备及制作步骤、补充说明；不收录图片。前置元数据与 Markdown 样式转换为本项目 JSON 格式。

ForkRecipe：该固定版本包含 963 篇食谱，另有一份模块索引和一份模板，均不作为食谱导入。保留原文食材名称、基准用量、替代建议、制作步骤、视觉及触感提示、作者和完整快照。`ratioValue` 与 `defaultUnit` 记录在原文用量说明中；人数未明确时不自动缩放。用时仅采用 `totalTime`，不以 `activeTime` 代替总用时。超出本项目时间范围或包含不明确的等待说明时，标为用时未注明并保留原文。

**ForkRecipe 署名与许可**：Copyright © 2026 FoodML 与 ForkRecipe contributors。作者登记见 [data/users.js](data/upstream/forkrecipe/data/users.js)，上游声明见 [NOTICE](data/upstream/forkrecipe/NOTICE)。`data/forkrecipe-recipes.json` 及其中由拾味厨房添加的中文菜名、检索词和结构化整理属于对应数据的改编版本，采用 [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)。每条菜谱保留固定版本原文链接和署名，详情页说明许可。再次分享该数据或其中文讲解、调整版本时，请保留来源与作者、说明改动并使用相同许可。ForkRecipe 与 FoodML 商标不属于许可范围，本项目不表示获得其背书。

新增两库保留英文步骤，中文词表用于常见菜名、食材检索及明确的地区映射，并非全部菜谱的全文翻译。地区根据上游 `cuisine`、`culture`、标签和明确菜名归类；不明地区使用“国际家常”。素食属性均保持待核对，原文 `fasting` 等标签不直接作为纯素认证。

社区配方没有经过逐条试做；原文明确的总用时以约数显示，没有总用时则不参与限时筛选。饮食类型统一设为待核对；常见过敏原为关键词检测补充，不能认证不含过敏原。地区标签来自菜名、明确的风味介绍及少量经典菜名映射；含糊或多地区的中式菜归入家常菜。这些是浏览分类，不是原产地认证。

[recipe-sources.json](data/recipe-sources.json) 保存版本、整理日期与每篇 Markdown 的 SHA-256；`scripts/expand_recipes.py` 支持从已保存快照离线重建。

[open-recipe-sources.json](data/open-recipe-sources.json) 记录新增两库的版本、收录及排除结果、原文和许可证 SHA-256。`scripts/import_open_recipes.py` 可离线重建；`--fetch` 从固定版本下载文本。解析器只接受数据字面量，不执行上游代码。原文快照按字节保存，构建时与固定版本的 Git blob 校验值比较。

## 🥢 精选家庭菜谱

| 中文家庭版 | 公开参考来源 |
| --- | --- |
| 番茄炒鸡蛋 | [The Woks of Life · Chinese Tomato Egg Stir-fry](https://thewoksoflife.com/stir-fried-tomato-and-egg/) |
| 宫保鸡丁 | [The Woks of Life · Kung Pao Chicken](https://thewoksoflife.com/kung-pao-chicken/) |
| 家常麻婆豆腐 | [The Woks of Life · Mapo Tofu](https://thewoksoflife.com/ma-po-tofu-real-deal/) |
| 缤纷蔬菜炒饭 | [The Woks of Life · Vegetable Fried Rice](https://thewoksoflife.com/vegetable-fried-rice/)；家庭版省去鸡蛋并简化蔬菜 |
| 照烧鸡腿饭 | [Just One Cookbook · Chicken Teriyaki](https://www.justonecookbook.com/chicken-teriyaki/) |
| 日式鸡肉亲子丼 | [Just One Cookbook · Oyakodon](https://www.justonecookbook.com/oyakodon/)；家庭版鸡蛋煮全熟 |
| 豆腐海带味噌汤 | [Just One Cookbook · Homemade Miso Soup](https://www.justonecookbook.com/homemade-miso-soup/)；家庭版选择素高汤 |
| 韩式蔬菜拌饭 | [Maangchi · Bibimbap](https://www.maangchi.com/recipe/bibimbap)；家庭版省去牛肉和山菜 |
| 培根蛋香意面 | [Good Food · Cream-free spaghetti carbonara](https://www.bbcgoodfood.com/recipes/two-step-carbonara) |
| 法式田园炖蔬菜 | [Good Food · Ratatouille](https://www.bbcgoodfood.com/recipes/ratatouille) |
| 经典牛奶薄煎饼 | [Good Food · Classic pancakes](https://www.bbcgoodfood.com/recipes/classic-pancakes) |
| 希腊田园沙拉 | [Good Food · Greek salad](https://www.bbcgoodfood.com/recipes/greek-salad) |
| 奶香蘑菇浓汤 | [Good Food · Creamy mushroom soup](https://www.bbcgoodfood.com/recipes/creamy-mushroom-soup)；家庭版调整奶油和搅打方式 |
| 柠檬香草烤三文鱼 | [Good Food · Baked salmon](https://www.bbcgoodfood.com/recipes/baked-salmon) |
| 黄油蒜香辣虾 | [Good Food · Buttery chilli prawns](https://www.bbcgoodfood.com/recipes/buttery-chilli-prawns)；家庭版使用去壳虾仁 |
| 柠檬鹰嘴豆泥 | [Good Food · Hummus](https://www.bbcgoodfood.com/recipes/hummus)；家庭版减少用油 |
| 罗勒番茄烤面包 | [Good Food · Tomato bruschetta](https://www.bbcgoodfood.com/recipes/tomato-bruschetta)；家庭版缩短拌料等待时间 |

鸡肉、碎肉、鱼类、剩饭的温度及全熟鸡蛋原则参考 [FoodSafety.gov · Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)。

## 🤖 DeepSeek 接口

- [Your First API Call](https://api-docs.deepseek.com/)
- [Chat Completions](https://api-docs.deepseek.com/api/create-chat-completion/)
- [Tool Calls](https://api-docs.deepseek.com/guides/tool_calls/)

项目默认模型为 `deepseek-flash`，可通过 `.env` 或网页配置修改。

## 🥬 食材日期说明

仓库日期用于安排消耗顺序，未填写时不推算保质期；已过标注日期的批次单独列为待检查。日期与可食用状态的关系可参考 [USDA FSIS · Food Product Dating](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-product-dating)，具体储存和开封要求以包装说明为准。

## 🎨 图片与字体

图片下载到 `public/assets/` 用于本地网站的食物氛围展示，均为 **风味示意图**，不代表所列菜谱的实际成品。页面菜谱详情和列表均说明这一点。

| 文件 | Unsplash 图片 |
| --- | --- |
| hero.jpg | [蔬菜餐碗](https://images.unsplash.com/photo-1512621776951-a57141f2eefd) |
| pasta.jpg | [意面](https://images.unsplash.com/photo-1473093295043-cdd812d0e601) |
| rice.jpg | [米饭与蔬菜](https://images.unsplash.com/photo-1512058564366-18510be2db19) |
| salad.jpg | [沙拉](https://images.unsplash.com/photo-1547592180-85f173990554) |
| salmon.jpg | [三文鱼](https://images.unsplash.com/photo-1467003909585-2f8a72700288) |
| pancakes.jpg | [煎饼](https://images.unsplash.com/photo-1528207776546-365bb710ee93) |
| mushroom-soup.jpg | [蘑菇汤 · David Todd McCarty](https://unsplash.com/photos/bowl-of-creamy-mushroom-soup-with-garnish-on-table-GjwUs-RRzYk) |
| miso.jpg | [味噌汤 · note thanun](https://unsplash.com/photos/bowl-of-miso-soup-with-tofu-and-seaweed-HQNhc58_6mI) |
| eggs.jpg | [鸡蛋与番茄早餐 · Raamin ka](https://unsplash.com/photos/scrambled-eggs-with-olives-and-tomato-served-with-coffee-xzND4BsdiTQ) |
| chicken.jpg | [照烧鸡肉 · Tomoyo S](https://unsplash.com/photos/VhuC3z2o8vQ) |
| shrimp.jpg | [虾仁 · Fernando Andrade](https://unsplash.com/photos/TrD7yA09Vg8) |
| hummus.jpg | [鹰嘴豆泥 · Sandie Clarke](https://unsplash.com/photos/a-bowl-of-hummus-next-to-some-garlic--ulJ5sF0NPg) |
| bruschetta.jpg | [番茄香草面包 · Diego Arenas de Rodrigo](https://unsplash.com/photos/bruschetta-with-fresh-tomatoes-and-herbs-JK1Iog4H4u0) |

图片使用范围参见 [Unsplash License](https://unsplash.com/license)。品牌 SVG 和界面图标在项目中绘制。页面只使用本机已安装字体：优先 Noto Sans SC / Noto Serif SC，再回退系统中文字体；不请求 Google Fonts，避免字体网络超时阻塞页面样式和脚本。图片和业务资源均已本地保存。
