# 🍲 Shiwei Kitchen · 拾味厨房

基于 Python 与 SQLite 的本地 AI 烹饪助手。集成 DeepSeek 工具调用、食材仓库、地区菜谱检索和个人菜谱管理，支持根据库存、到期日期、人数、时间及设备生成烹饪建议。

当前版本 **v1.3.0**，内置 **1,775 条菜谱**，支持食材仓库、做饭模式、完整备份与可选联网问答。更新范围见 [CHANGELOG.md](CHANGELOG.md)。

> 让每一次下厨，都有一点新的期待。

## ✨ 功能

- 🌏 **菜谱检索**：1,775 条内置做法，96 个地区与风味分类，支持中英文菜名、食材、地区、用时和饮食类型筛选。
- 🥬 **食材仓库**：按批次记录余量、单位、类别、储存方式及到期 / 开封日期，支持临期筛选、编辑和用完标记。
- 🤖 **AI 问答**：通过 `search_recipes`、`get_recipe` 和 `get_pantry` 工具检索本地数据，结合厨房上下文推荐菜单与消耗顺序。
- 🌐 **可选联网**：按需启用 DeepSeek 原生搜索，查看编号网页来源并随对话保存；默认关闭。
- 📝 **个人菜谱**：添加、编辑、删除、收藏，支持 JSON 批量导入、导入预览及导出备份。
- 💾 **数据持久化**：SQLite 保存库存、菜谱、收藏与对话；启动时自动初始化数据库并同步内置数据。
- 🥣 **用量换算**：按份数缩放数值食材用量，保留原文中的非数值用量说明。
- 🔎 **明确的匹配结果**：支持部分菜名和食材关键词；具体查询无结果时返回独立提示，连续追问保留厨房条件。
- 🍳 **单菜谱做饭模式**：大字步骤、勾选进度与手动倒计时，刷新后继续。
- 📦 **完整备份恢复**：菜谱、库存、收藏、对话、厨房偏好和做饭进度整套导出，预览后恢复。
- 🧪 **数据集测试**：批量运行本地问答用例、比对预期结果，检查菜谱结构与一致性，并导出报告。

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

已有源码目录时直接运行，无需再次克隆。重复启动会识别并复用当前端口上的厨房服务；其他程序占用端口则提示更换端口。页面使用本机字体，离线也可正常显示样式和加载菜谱。

## ⚙️ 配置

复制 `.env.example` 为 `.env`，设置以下变量，或通过网页中的 **AI 连接设置** 保存配置。

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | 空 |
| `DEEPSEEK_MODEL` | 模型名称 | `deepseek-flash` |

`.env` 优先于同名环境变量。未配置 API Key 时使用本地菜谱检索；配置后，后端向 DeepSeek 发送相关菜谱、最近对话及厨房上下文。Key 仅由后端读取，配置接口不返回 Key。

### 🔐 密钥保护

通过网页保存的密钥仅写入本机 `.env`，并用于固定官方模型接口的认证请求头；模型接口拒绝跟随重定向。保存配置使用独立临时文件和原子替换，失败响应不回显配置内容。

服务端统一保护当前密钥、当前进程中已替换的旧密钥、常见 API Token、私钥块、认证 / Cookie 字段、带登录信息或敏感参数的链接，以及已知密钥的 URL、HTML、JSON 和 Base64 编码形式。新聊天、个人菜谱和库存备注在保存前脱敏；历史读取、公开 API、完整备份、恢复前回滚文件、测试报告和模型请求 / 返回内容也经过同一处理。聊天界面收到服务端的脱敏文本后才加入历史。

含凭据的测试集会被拒绝，请移除凭据后重试；应用不会悄悄改写测试问题或预期断言。备份中的普通文字会替换为 `[密钥已隐藏]`；如敏感内容出现在记录编号等结构字段中，则拒绝导出或恢复，避免破坏记录关联。脱敏后的文字无法从备份还原为原密钥。

上传仅包含受 Git 管理的源码、公开菜谱、测试与空配置模板，排除 `.env`、数据库、日志、运行备份及临时输出。旧数据库中的原始记录不会因读取而被重写；已经下载或分享的旧文件也不会自动更新。重启后无法识别未再次配置、且没有常见凭据特征的旧密钥；无标记的任意自定义秘密同样无法保证自动识别。请将真实密钥只填写在 **AI 连接设置**，分享时使用本次新生成的源码包。

模型通过 `search_recipes`、`get_recipe` 访问菜谱库，启用仓库时可通过 `get_pantry` 读取当前问答的库存快照。每次问答最多执行 4 轮模型请求，上下文包含最近 12 条对话。接口实现参考 [Chat Completions](https://api-docs.deepseek.com/api/create-chat-completion/) 与 [Tool Calls](https://api-docs.deepseek.com/guides/tool_calls/)。

在 **问问小厨** 的输入框上方勾选 **联网搜索**，本轮会额外调用 DeepSeek 原生网页搜索，再结合返回的引用片段回答。开关默认关闭；仅配置 Key 不会自动开启联网。回答下方的编号网页来源可点击打开，历史对话也保留这些来源。搜索最多使用 3 次原生搜索，返回最多 8 条来源；不会自动把网页写入菜谱库。没有结果和搜索失败会明确区分，不用模型生成的文字伪装网页证据。

联网复用 AI 连接设置中的 Key 与模型，使用固定官方 Anthropic-compatible Messages 接口；普通问答继续使用 Chat Completions。搜索和整理回答会产生额外模型请求及 Token 费用，详见 [DeepSeek 官方联网说明](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/#using-web-search-in-claude-code)。如果当前页面仍显示“本地菜谱模式”，请在这个页面的 AI 连接设置中保存配置；不同安装目录、端口或预览服务的配置可能不同。

### 🔎 检索与会话条件

输入“咖喱”等部分菜名可查找相关做法；明确菜名受到用时等条件限制时，返回没有匹配的结果。只有“推荐晚餐”等泛化请求使用通用菜单。“还有什么建议”等明确追问继承上一话题，新菜名或食材按本轮问题检索。

同一会话保留时间、人数、饮食偏好、菜式偏好、忌口和设备等结构化条件。对话中明确提出的新条件和侧栏修改优先，刷新后可恢复已保存的条件。服务端对模型的搜索和菜谱读取工具统一落实时间、饮食及菜式限制。

食材词典中的单字（如“虾、鱼、蟹”）可独立检索，避免把“鱼香肉丝”的菜名当作含鱼的依据。会话单独保存当前主题；“咖喱 → 再推荐一道西式的”只更新条件，仍查找咖喱，没有满足条件的做法时返回零匹配。明确的新菜名会替换主题。旧会话按历史用户明确表达恢复条件，打开后可在侧栏核对。

## 🧪 数据集测试

从侧栏进入 **数据集测试**，可运行两类检查：

- **批量问答检索**：加载内置回归案例或导入 JSON 测试集，查看运行进度、通过率、失败断言与实际回答，并可取消和下载报告。默认“本地检索”不调用模型；也可显式选择“DeepSeek 问答”或“DeepSeek 联网问答”，真实调用当前配置的模型并消耗额度。通过率仅表示所选模式、案例的断言通过比例，不代表模型准确率。
- **菜谱质量检查**：只读检查当前菜谱库的必填字段、食材设备分类、步骤、来源、本地图片和重复情况。未知时间、份量、饮食类型单独统计为信息提示；重复名称仅作为核对提示。结构检查不代表实际试做、营养评估或内容正确性认证。

批量测试在开始时截取当前菜谱快照，使用独立临时数据库。每个案例的多轮问题在自己的测试会话内连续执行，不同案例互相隔离；库存只使用案例内的 `pantry`，不读取个人库存，不写入日常对话、收藏、库存、配置或浏览器做饭进度。AI 模式还会复制启动时的模型配置，仅用于本批请求；Key 不进入报告。运行结束后临时数据库清理，报告暂存在服务内存中，重启会消失；需要保留时请下载 JSON 报告。

同一时间只运行一批测试；最多 50 个案例，每案例最多 5 轮，本地模式总计最多 100 轮，AI 模式总计最多 20 轮。导入文件最大 1 MiB，至少为每轮设置一条有效断言。取消在当前轮完成后生效，当前轮可能继续产生 API 请求和费用；尚未完成的案例显示为跳过，不计入通过率。

切换模式后点击“加载内置用例”或“下载 JSON 模板”获取该模式的模板：本地 12 例，AI 与联网各 3 例。切换模式不会覆盖已编辑的 JSON。本地零匹配为 `no_match`，AI 无本地来源而生成回答时为 `generated`；两种预期不能混用。联网模板检查网页来源数量，真实可用性需配置 Key 后运行确认。

点击 **下载模板** 获取完整格式。最小示例：

```json
{
  "format": "shiwei-evaluation",
  "format_version": 1,
  "name": "我的检索回归",
  "cases": [{
    "id": "unknown-dish",
    "name": "不存在的菜名应零匹配",
    "turns": [{
      "message": "未收录的菜9f84",
      "context": {"time": 30},
      "expected": {"match_status": "no_match", "max_sources": 0}
    }]
  }]
}
```

`expected` 支持 `match_status`、`source_ids_include`、`source_ids_exclude`、`source_name_contains`、`min_sources`、`max_sources`、`context` 和 `content_contains`，以及 `min_web_sources`、`max_web_sources` 和 `web_url_contains`（至少一个网页 URL 包含指定文本）。本地来源和网页来源分别计数；新增网页结果不会抬高本地匹配数。内置用例按内置菜谱编写；添加、修改或恢复菜谱后，失败结果可用于核对变更，不会自动修改菜谱或预期值。

## 🍳 做饭模式

打开菜谱详情，点击 **开始做饭**。逐步勾选完成状态，使用上一步、下一步切换；原文小节标题保留为标题。勾选、当前位置和计时保存于当前浏览器，刷新可以继续，不会串到另一道菜。

手动倒计时支持 1 秒至 24 小时，可开始、暂停、继续和重置。切回前台按目标时间校准；开始另一道菜的计时会暂停原计时。浏览器关闭后不提供提醒。菜谱步骤变化时会先提示重置旧进度，避免把旧勾选套到新步骤上。

## 📦 完整备份与恢复

侧栏 **备份与恢复 → 导出完整备份** 下载版本化 JSON。包含完整菜谱及来源快照、食材、步骤、个人菜谱标识、库存批次、收藏、全部对话和会话条件，以及当前浏览器的厨房偏好、做饭进度。备份不读取 AI 配置或 `.env`；仅允许指定的偏好字段进入备份。

完整备份格式现为版本 2，新增消息的联网标记与网页引用。仍可恢复版本 1 备份，旧消息按“未联网、无网页来源”迁移；新版本备份需使用支持版本 2 的应用恢复。

恢复时选择不超过 **32 MiB** 的完整备份，先预览各类记录数量和警告，再确认整套替换。个人菜谱数组仍使用原“批量导入”入口。应用会先将当前状态保存至 `data/backups/before-restore-*.json`，恢复成功后可下载该回滚文件。备份文件包含个人对话，请自行妥善保存。

所有数据验证通过后在同一数据库事务中替换；格式、引用、写入或回滚文件保存失败时不提交替换。正在进行问答或数据写入时，恢复返回 HTTP 409，请操作结束后重试。原已删除菜谱的历史引用会明确列为缺失，保留其原始来源文字，不生成虚构菜谱；仍被历史消息引用的个人菜谱不能直接删除。

恢复的菜谱快照在相同安装版本重启后保持不变；以后升级改变内置数据时，按正常升级规则同步。恢复会更新当前浏览器偏好，其他已打开页面应刷新。API Key 与 AI 连接设置由本机单独管理。

## 🥬 食材仓库

在 **食材仓库 → 放入新食材** 中记录名称、余量和单位。同种食材可保存不同批次，选择冷藏、冷冻或常温储存，并按包装或消耗计划填写到期日期；日期可留空，不自动推算保质期。

- **用库存想菜单**：开启仓库上下文并发起新对话，优先匹配现有食材，列出建议用量和需补充的材料。
- **优先消耗临期**：优先考虑今天及未来 3 天内到期的批次，再结合时间、饮食偏好、忌口与厨房设备安排做法。
- **更新余量 / 已用完**：手动编辑数量，或将批次数量标记为零。AI 问答只读取库存，不自动扣减。

每次启用仓库的问答都从 SQLite 读取新快照，已删除或用完的食材不进入可用列表。已过标注日期的批次单独列为待检查，不纳入自动用料推荐。日期用于消耗排序，不能单独证明食材可食用，需结合包装说明、开封情况及储存条件判断。

最多保存 200 个批次；单次问答优先参考最近到期的 100 个可用批次，超过时会提示未纳入数量。只有开启 **今天的厨房 → 使用食材仓库** 才发送库存信息给 DeepSeek。未配置 Key 时，提供基于食材名称的本地匹配、临期列表和缺料提示；名称匹配不表示库存数量足够。

库存使用独立的食材等价表，例如“西红柿”与“番茄”可匹配，“番茄酱”与鲜番茄分别处理。名称差异较大的食材可能需要统一录入名称；AI 建议的替代材料不会自动视为已持有。已识别设备不进入库存缺料列表，原始菜谱内容保留。

库存身份保留“罐头、冷冻、干制”等括注，仅去掉明确数量、可选说明，以及词表确认是同一食材的英文原文和简单切法标注。导入、详情、库存匹配及模型工具共同使用精确设备分类；例如冰箱和碗进入设备区，火锅底料和锅巴仍是食材。分类修正与原文核验记录见 `data/equipment-corrections.json`，不代表实际试做。

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
| POST | `/api/backup/export` | 导出完整备份，可附带允许保存的本机偏好 |
| POST | `/api/backup/restore` | 验证、预览或整套恢复完整备份 |
| GET | `/api/dataset-tests/capabilities` | 当前服务配置状态、模型与 AI 轮数上限，不含 Key |
| GET | `/api/dataset-tests/template?mode=local` | 按 local、deepseek、deepseek_web 获取模板，默认 local |
| POST | `/api/dataset-tests/validate` | 校验 `{"dataset":测试集}`，返回规范数据与案例、轮次数量 |
| POST | `/api/dataset-tests/run` | 提交 `{"dataset":测试集,"mode":"local"}`；模式可选 deepseek/deepseek_web，HTTP 202 返回运行 ID 与状态 |
| GET | `/api/dataset-tests/runs/{id}` | 运行进度和可导出的完整报告 |
| POST | `/api/dataset-tests/runs/{id}/cancel` | 以空对象请求取消测试 |
| POST | `/api/dataset-tests/quality` | 以空对象启动当前菜谱库的只读质量检查 |

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

聊天请求可在顶层传 `"web_search": true` 显式开启本轮联网（默认 false，须配置 Key）。回答及历史新增 `web_search` 布尔值与 `web_sources: [{title,url,snippet}]`，原 `sources`、`match_status` 和 `match_count` 继续描述本地菜谱匹配。

聊天响应的 `user_content` 为服务端脱敏后的本轮用户文本；客户端应使用该字段显示和保存用户消息。

完整备份导出请求为 `{"preferences":{"context":{},"cooking":{}}}`。`context` 仅接受下文厨房条件字段，`cooking` 为按菜谱 ID 索引的步骤版本、勾选和计时状态。响应含 `format: "shiwei-kitchen-backup"`、`format_version: 2`、`app_version`、`exported_at`、`tables`、`preferences` 和历史缺失菜谱清单 `unavailable_recipe_ids`。

恢复请求为 `{"backup":完整备份对象,"dry_run":true}`，响应含备份数量 `counts`、当前数量 `existing_counts` 与 `warnings`。确认恢复须显式设置 `dry_run: false`，并携带 `current_preferences` 用于保存恢复前的本机偏好；成功响应增加 `preferences`、`rollback_backup_id` 和可下载的 `rollback_backup`。省略 `dry_run` 只预览。

`context` 支持 `time`、`servings`、`diet`、`avoid`、`equipment`、`ingredients`、`region`（空字符串 / `东方` / `西方`）。省略的条件继承会话状态；与上一轮侧栏默认值相同的输入保留对话推断条件。顶层 `context_overrides` 可列出需显式覆盖的字段，如 `["time", "diet"]`，用于主动重置限制；这些字段须同时出现在 `context` 中。

## 🗂️ 数据与目录

```text
shiwei-kitchen/
├── app.py                  HTTP 路由、SQLite、模型工具调用
├── kitchen_backup.py       完整备份、验证与原子恢复
├── kitchen_evaluation.py   隔离批量问答与断言
├── kitchen_quality.py      菜谱结构与来源检查
├── kitchen_web.py          原生联网搜索与网页引用
├── kitchen_secrets.py      统一凭据脱敏与安全链接处理
├── ingredient_rules.py     共用食材与设备分类
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
├── tests/                  隔离集成测试与前端状态测试
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
node --check public/cooking.js
node --check public/kitchen-tools.js
node --check public/dataset-tests.js
node --test tests/cooking.test.cjs tests/dataset-tests.test.cjs tests/chat-secrets.test.cjs
python -m unittest discover -s tests -v
```

## 🤝 参与改进

帮助修改项目时，请先将 [原仓库](https://github.com/sloth766/shiwei-kitchen) Fork 到自己的 GitHub 账号，在新分支提交修改，再向原仓库的 `main` 分支发起 Pull Request，由维护者审核合并。Fork、提交和 Pull Request 都使用贡献者自己的账号。

提交前执行上面的自动检查；前端、后端、测试和相关说明应一起提交。仓库的 `.gitignore` 排除本机 `.env`、SQLite 数据库、备份与测试临时输出。合并上游菜谱扩展时，完整备份恢复的内容摘要基线需要覆盖全部四份内置菜谱数据，避免重启后重新导入已恢复快照之外的菜谱。

## 📜 许可

原有项目许可安排保持不变。本次引入的 Inkensai 新增代码与文档贡献保留 MIT 许可，具体范围与署名见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。这份贡献许可不构成整个项目的统一授权。第三方菜谱、来源快照和图片仍遵循 [SOURCES.md](SOURCES.md) 中列明的各自许可。

## 🤝 致谢

感谢 [@mumoaurora](https://github.com/mumoaurora) 提供 [Issue #1](https://github.com/sloth766/shiwei-kitchen/issues/1) 中的详细复现与检索修复补丁，帮助小厨更准确地理解每一餐的需求。

感谢 [@Inkensai](https://github.com/Inkensai) 在 [fork](https://github.com/Inkensai/shiwei-kitchen) 中贡献做饭模式、备份恢复、数据集评估、联网搜索与密钥保护等改进，让日常使用更顺手。
