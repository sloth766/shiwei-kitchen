# 🍲 Shiwei Kitchen · 拾味厨房

基于 Python 与 SQLite 的本地 AI 烹饪助手。集成 DeepSeek 工具调用、食材仓库、地区菜谱检索和个人菜谱管理，支持根据库存、到期日期、人数、时间及设备生成烹饪建议。

> 让每一次下厨，都有一点新的期待。

## ✨ 功能

- 🌏 **菜谱检索**：1,775 条内置做法，96 个地区与风味分类，支持中英文菜名、食材、地区、用时和饮食类型筛选。
- 🥬 **食材仓库**：按批次记录余量、单位、类别、储存方式及到期 / 开封日期，支持临期筛选、编辑和用完标记。
- 🤖 **AI 问答**：通过 `search_recipes`、`get_recipe` 和 `get_pantry` 工具检索本地数据，结合厨房上下文推荐菜单与消耗顺序。
- 📝 **个人菜谱**：添加、编辑、删除、收藏，支持 JSON 批量导入、导入预览及导出备份。
- 💾 **数据持久化**：SQLite 保存库存、菜谱、收藏与对话；启动时自动初始化数据库并同步内置数据。
- 🥣 **用量换算**：按份数缩放数值食材用量，保留原文中的非数值用量说明。
- 🔎 **明确的匹配结果**：支持部分菜名和食材关键词；具体查询无结果时返回独立提示，连续追问保留厨房条件。

## 🧩 技术栈

| 层级 | 实现 |
| --- | --- |
| 前端 | 原生 HTML、CSS、JavaScript |
| HTTP 服务 | Python 标准库 `http.server` |
| 数据存储 | SQLite / `sqlite3` |
| 模型接口 | DeepSeek Chat Completions、Tool Calls |
| 运行环境 | Python 3.10+ |

## 🚀 快速开始

```sh
git clone https://github.com/sloth766/shiwei-kitchen.git
cd shiwei-kitchen
python app.py --open
```

默认地址为 `http://127.0.0.1:8765`。使用其他端口：

```sh
python app.py --port 8766 --open
```

Windows 可使用 `启动厨房.bat`。版本源码包见 [Releases](https://github.com/sloth766/shiwei-kitchen/releases)，安装与升级说明见 [INSTALL.md](INSTALL.md)。

## ⚙️ 配置

复制 `.env.example` 为 `.env`，设置以下变量，或通过网页中的 **AI 连接设置** 保存配置。

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | 空 |
| `DEEPSEEK_MODEL` | 模型名称 | `deepseek-flash` |

`.env` 优先于同名环境变量。未配置 API Key 时使用本地菜谱检索；配置后，后端向 DeepSeek 发送相关菜谱、最近对话及厨房上下文。Key 仅由后端读取，配置接口不返回 Key。

模型通过 `search_recipes`、`get_recipe` 访问菜谱库，启用仓库时可通过 `get_pantry` 读取当前问答的库存快照。每次问答最多执行 4 轮模型请求，上下文包含最近 12 条对话。接口实现参考 [Chat Completions](https://api-docs.deepseek.com/api/create-chat-completion/) 与 [Tool Calls](https://api-docs.deepseek.com/guides/tool_calls/)。

### 🔎 检索与会话条件

输入“咖喱”等部分菜名可查找相关做法；明确菜名受到用时等条件限制时，返回没有匹配的结果。只有“推荐晚餐”等泛化请求使用通用菜单。“还有什么建议”等明确追问继承上一话题，新菜名或食材按本轮问题检索。

同一会话保留时间、人数、饮食偏好、菜式偏好、忌口和设备等结构化条件。对话中明确提出的新条件和侧栏修改优先，刷新后可恢复已保存的条件。服务端对模型的搜索和菜谱读取工具统一落实时间、饮食及菜式限制。

## 🥬 食材仓库

在 **食材仓库 → 放入新食材** 中记录名称、余量和单位。同种食材可保存不同批次，选择冷藏、冷冻或常温储存，并按包装或消耗计划填写到期日期；日期可留空，不自动推算保质期。

- **用库存想菜单**：开启仓库上下文并发起新对话，优先匹配现有食材，列出建议用量和需补充的材料。
- **优先消耗临期**：优先考虑今天及未来 3 天内到期的批次，再结合时间、饮食偏好、忌口与厨房设备安排做法。
- **更新余量 / 已用完**：手动编辑数量，或将批次数量标记为零。AI 问答只读取库存，不自动扣减。

每次启用仓库的问答都从 SQLite 读取新快照，已删除或用完的食材不进入可用列表。已过标注日期的批次单独列为待检查，不纳入自动用料推荐。日期用于消耗排序，不能单独证明食材可食用，需结合包装说明、开封情况及储存条件判断。

最多保存 200 个批次；单次问答优先参考最近到期的 100 个可用批次，超过时会提示未纳入数量。只有开启 **今天的厨房 → 使用食材仓库** 才发送库存信息给 DeepSeek。未配置 Key 时，提供基于食材名称的本地匹配、临期列表和缺料提示；名称匹配不表示库存数量足够。

库存使用独立的食材等价表，例如“西红柿”与“番茄”可匹配，“番茄酱”与鲜番茄分别处理。名称差异较大的食材可能需要统一录入名称；AI 建议的替代材料不会自动视为已持有。已识别设备不进入库存缺料列表，原始菜谱内容保留。

## 📥 菜谱导入

### 网页导入

在 **我的菜谱** 中选择 **批量导入 JSON**，上传文件或粘贴数组，预览后提交。每批最多 500 条，请求体上限 2 MiB；任意记录不符合格式时整批不写入。

```json
[
  {
    "name": "番茄炒鸡蛋",
    "area_group": "中国",
    "area": "家常菜",
    "minutes": 15,
    "servings": 2,
    "diet": "vegetarian",
    "allergens": ["鸡蛋"],
    "ingredients": [
      {"name": "番茄", "quantity": 2, "unit": "个"},
      {"name": "鸡蛋", "quantity": 3, "unit": "个"},
      {"name": "盐", "quantity": null, "unit": "适量"}
    ],
    "steps": ["番茄切块，鸡蛋打散。", "分别炒制后合炒调味。"]
  }
]
```

必填字段为 `name`、`ingredients`、`steps`。`ingredients` 可使用对象数组、字符串数组或多行文本；`steps` 可使用字符串数组或多行文本。

| 字段 | 约定 |
| --- | --- |
| `id` | 可省略，自动生成 `user-` 前缀编号；显式编号须以 `user-` 开头 |
| `area_group` | 中国、亚洲、欧洲、美洲、中东、非洲、大洋洲、其他 |
| `area` | 具体地区或风味名称 |
| `minutes` | 1–1440；省略时标为用时未注明 |
| `servings` | 1–20；省略时保留原文份量 |
| `diet` | `unknown`、`omnivore`、`vegetarian`、`vegan`，默认 `unknown` |
| `quantity` | 正数或 `null`；只有数值用量参与份数换算 |
| `source` | 可选对象，包含 `name`、`title`、`url`、`retrieved_at`；外部链接使用 HTTPS |

默认跳过已有编号，也可选择更新已有个人菜谱并保留收藏。不同编号的同名菜谱分别保存。导出文件保留编号，支持再次导入。网页接口仅管理个人菜谱，不覆盖或删除内置数据。

手动录入的食材支持 `番茄 | 2 | 个`、`盐 | 适量`，每行一项。

### 命令行导入

批量维护完整菜谱记录时，参照 `data/recipes.json`：

```sh
python app.py --import-recipes path/to/recipes.json
```

命令行导入按 `id` 更新记录，不删除文件中未出现的菜谱。图片路径须引用 `public/assets/` 中已有资源。

## 🔌 HTTP API

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | `/api/health` | 服务状态与菜谱数量 |
| GET | `/api/recipes` | 菜谱列表与检索 |
| GET | `/api/recipes/{id}` | 菜谱详情 |
| POST | `/api/recipes/import` | 个人菜谱导入与预览 |
| GET | `/api/personal-recipes` | 个人菜谱列表，可用于导出 |
| DELETE | `/api/personal-recipes/{id}` | 删除个人菜谱 |
| GET | `/api/favorites` | 收藏列表 |
| PUT | `/api/favorites/{id}` | 设置收藏状态 |
| GET / POST | `/api/pantry` | 查询库存及状态统计 / 新增批次 |
| PUT / DELETE | `/api/pantry/{id}` | 更新 / 移除库存批次 |
| GET / POST | `/api/settings` | 读取或保存模型配置 |
| POST | `/api/chat` | 发送问题与厨房上下文 |
| GET | `/api/sessions` | 对话列表 |
| GET | `/api/sessions/{id}` | 对话详情 |

`/api/recipes` 支持 `q`、`region`、`area_group`、`area`、`max_minutes`、`diet` 和 `avoid`。带查询参数时返回最多 8 条检索结果；不带参数时返回完整列表。

导入请求格式：

```json
{
  "recipes": [{"name": "番茄炒鸡蛋", "ingredients": ["番茄", "鸡蛋"], "steps": ["分别炒制后合炒调味。"]}],
  "dry_run": true,
  "on_conflict": "skip"
}
```

`recipes` 应包含 1–500 条记录；`dry_run` 控制预览；`on_conflict` 支持 `skip`、`update`。响应包含 `added`、`updated`、`skipped` 和菜谱摘要。

库存写入对象示例：

```json
{"name":"番茄","quantity":2,"unit":"个","category":"蔬菜","storage":"冷藏","expires_on":"2026-10-11","opened_on":"","notes":"适合炒蛋"}
```

`name` 必填；`quantity` 为 0–100000 的数值（默认 1），`unit` 默认“份”。`category` 支持蔬菜、水果、肉禽、水产、蛋奶、豆制品、主食、调味、其他；`storage` 支持冷藏、冷冻、常温。日期为 `YYYY-MM-DD` 或空字符串；开封日期不可晚于服务器当天。`PUT` 替换整条记录，未提供的可选字段使用默认值。

`POST /api/chat` 的 `context` 可设置 `use_pantry: true` 与 `pantry_mode: "menu"` / `"expiry"`。库存由服务端读取，客户端传入的库存快照不被采用。日期状态按服务器本地日历日计算。

聊天响应包含 `match_status`（`matched`、`no_match`、`generated`）、`match_count` 与本次有效 `context`。本地零匹配使用 HTTP 200，返回 `match_status: "no_match"`、`match_count: 0`、`sources: []`，保存及重新读取会话后仍保留该结果。`generated` 表示 AI 回答未附本地菜谱来源。

`context` 支持 `time`、`servings`、`diet`、`avoid`、`equipment`、`ingredients`、`region`（空字符串 / `东方` / `西方`）。省略的条件继承会话状态；与上一轮侧栏默认值相同的输入保留对话推断条件。顶层 `context_overrides` 可列出需显式覆盖的字段，如 `["time", "diet"]`，用于主动重置限制；这些字段须同时出现在 `context` 中。

## 🗂️ 数据与目录

```text
shiwei-kitchen/
├── app.py                  HTTP 路由、SQLite、模型工具调用
├── public/                 页面、交互脚本与静态资源
├── data/
│   ├── recipes.json        精选菜谱
│   ├── community-recipes.json  社区菜谱
│   ├── public-domain-recipes.json  公有领域菜谱
│   ├── forkrecipe-recipes.json  世界菜谱 · CC BY-SA 4.0
│   ├── recipe-sources.json 上游版本与 SHA-256
│   ├── open-recipe-sources.json  新增数据版本与 SHA-256
│   ├── open-recipe-labels.json  中文菜名、食材与地区词表
│   ├── upstream/           原始文本、作者署名与许可
│   └── kitchen.db          运行时数据库
├── scripts/                数据构建与版本打包脚本
├── .env.example            配置模板
├── 启动厨房.bat            Windows 启动入口
├── INSTALL.md              安装与升级
├── CHANGELOG.md            版本记录
└── SOURCES.md              数据来源与许可说明
```

内置数据包含 17 条精选家庭做法、372 条 HowToCook 配方、8 条 Bastian/recipes 中文整理版、415 条 Public Domain Recipes 做法，以及 963 条 ForkRecipe 配方。来源与许可见 [SOURCES.md](SOURCES.md)，地区统计见 [data/地区分类.md](data/地区分类.md)。同名菜的不同做法分别保留；地区为检索标签，未明确的用时、份量与饮食类型保留未知状态。

新增海外菜谱保留英文制作步骤，常见菜名和食材提供中文检索词。可按意大利、印度、越南、墨西哥、摩洛哥等地区浏览，再向小厨询问中文做法或根据库存调整。ForkRecipe 原文以基准配方比例记录用量，未注明人数时保留原始数值，不自动换算为人均份量。

ForkRecipe 数据及本项目对该数据的整理采用 **CC BY-SA 4.0**，保留 FoodML 和原作者署名；再次发布其改编版本时须按同一许可分享。此许可适用于对应菜谱数据，不改变其他来源的许可。

数据库包含 `recipes`、`ingredients`、`steps`、`sources`、`personal_recipes`、`pantry`、`favorites`、`sessions`、`messages`。内置数据按内容摘要增量导入，库存、个人菜谱与对话保留。厨房偏好另存于浏览器本地存储。

重建社区数据：

```sh
python scripts/build_western.py
python scripts/expand_recipes.py
```

`--fetch` 可重新获取固定版本的上游 Markdown。版本与文件摘要记录于 `data/recipe-sources.json`。

重建新增的世界菜谱：

```sh
python scripts/import_open_recipes.py
# 获取固定版本的文本快照，再重建：
python scripts/import_open_recipes.py --fetch
```

脚本仅解析上游文本与数据字面量，校验固定 Git 版本的文件内容，跳过目录索引和模板，不执行上游 JavaScript。快照、署名与许可证位于 `data/upstream/`；导入统计和 SHA-256 位于 `data/open-recipe-sources.json`，中文词表位于 `data/open-recipe-labels.json`。启动时按文件摘要自动同步新增数据，保留个人菜谱、库存、收藏和对话。

服务绑定 `127.0.0.1`，面向单用户本地使用；请求检查 Host、Origin，静态文件仅从 `public/` 提供。运行时配置与数据库不包含在版本源码包中。

## 📦 版本发布

[Releases](https://github.com/sloth766/shiwei-kitchen/releases) 提供源码 ZIP 与 `SHA256SUMS.txt`。在干净且已提交的 Git 工作区执行：

```sh
python scripts/package_release.py
```

版本读取自 `VERSION`，产物写入 `dist/v<version>/`。打包基于 `HEAD`，保留上游文件内容，并统一 Windows BAT 的 CRLF 换行。

## 🛠️ 自动检查

GitHub Actions 在 `main` 推送和 Pull Request 时执行 JavaScript 语法检查与隔离数据库的集成测试，覆盖 Windows / Linux 和 Python 3.10 / 3.12。测试使用独立数据库和模拟模型响应，无需配置 API Key。也可在 [Actions](https://github.com/sloth766/shiwei-kitchen/actions) 手动运行。

本地执行：

```sh
node --check public/app.js
python -m unittest discover -s tests -v
```

## 🤝 致谢

感谢 [@mumoaurora](https://github.com/mumoaurora) 提供 [Issue #1](https://github.com/sloth766/shiwei-kitchen/issues/1) 中的详细复现与检索修复补丁，帮助小厨更准确地理解每一餐的需求。
