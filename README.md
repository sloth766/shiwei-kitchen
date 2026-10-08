# Shiwei Kitchen · 拾味厨房

基于 Python 与 SQLite 的本地 AI 烹饪助手。集成 DeepSeek 工具调用、地区菜谱检索和个人菜谱管理，支持根据食材、人数、时间及设备生成烹饪建议。

## 功能

- **菜谱检索**：397 条内置做法，40 个地区与风味分类，支持菜名、食材、地区、用时和饮食类型筛选。
- **AI 问答**：通过 `search_recipes` 和 `get_recipe` 工具检索本地数据，结合厨房上下文生成回答。
- **个人菜谱**：添加、编辑、删除、收藏，支持 JSON 批量导入、导入预览及导出备份。
- **数据持久化**：SQLite 保存菜谱、收藏与对话；启动时自动初始化数据库并同步内置数据。
- **用量换算**：按份数缩放数值食材用量，保留原文中的非数值用量说明。

## 技术栈

| 层级 | 实现 |
| --- | --- |
| 前端 | 原生 HTML、CSS、JavaScript |
| HTTP 服务 | Python 标准库 `http.server` |
| 数据存储 | SQLite / `sqlite3` |
| 模型接口 | DeepSeek Chat Completions、Tool Calls |
| 运行环境 | Python 3.10+ |

## 快速开始

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

## 配置

复制 `.env.example` 为 `.env`，设置以下变量，或通过网页中的 **AI 连接设置** 保存配置。

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | 空 |
| `DEEPSEEK_MODEL` | 模型名称 | `deepseek-flash` |

`.env` 优先于同名环境变量。未配置 API Key 时使用本地菜谱检索；配置后，后端向 DeepSeek 发送相关菜谱、最近对话及厨房上下文。Key 仅由后端读取，配置接口不返回 Key。

模型通过 `search_recipes`、`get_recipe` 访问菜谱库。每次问答最多执行 4 轮模型请求，上下文包含最近 12 条对话。接口实现参考 [Chat Completions](https://api-docs.deepseek.com/api/create-chat-completion/) 与 [Tool Calls](https://api-docs.deepseek.com/guides/tool_calls/)。

## 菜谱导入

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

## HTTP API

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

## 数据与目录

```text
shiwei-kitchen/
├── app.py                  HTTP 路由、SQLite、模型工具调用
├── public/                 页面、交互脚本与静态资源
├── data/
│   ├── recipes.json        精选菜谱
│   ├── community-recipes.json  社区菜谱
│   ├── recipe-sources.json 上游版本与 SHA-256
│   ├── upstream/           原始 Markdown 与许可
│   └── kitchen.db          运行时数据库
├── scripts/                数据构建与版本打包脚本
├── .env.example            配置模板
├── 启动厨房.bat            Windows 启动入口
├── INSTALL.md              安装与升级
├── CHANGELOG.md            版本记录
└── SOURCES.md              数据来源与许可说明
```

内置数据由 17 条精选家庭做法、372 条 HowToCook 配方及 8 条 Bastian/recipes 中文整理版组成。来源与许可见 [SOURCES.md](SOURCES.md)，地区统计见 [data/地区分类.md](data/地区分类.md)。地区为检索标签；未明确的用时、份量与饮食类型保留未知状态。

数据库包含 `recipes`、`ingredients`、`steps`、`sources`、`personal_recipes`、`favorites`、`sessions`、`messages`。内置数据按内容摘要增量导入，个人菜谱与对话保留。厨房偏好另存于浏览器本地存储。

重建社区数据：

```sh
python scripts/build_western.py
python scripts/expand_recipes.py
```

`--fetch` 可重新获取固定版本的上游 Markdown。版本与文件摘要记录于 `data/recipe-sources.json`。

服务绑定 `127.0.0.1`，面向单用户本地使用；请求检查 Host、Origin，静态文件仅从 `public/` 提供。运行时配置与数据库不包含在版本源码包中。

## 版本发布

[Releases](https://github.com/sloth766/shiwei-kitchen/releases) 提供源码 ZIP 与 `SHA256SUMS.txt`。在干净且已提交的 Git 工作区执行：

```sh
python scripts/package_release.py
```

版本读取自 `VERSION`，产物写入 `dist/v<version>/`。打包基于 `HEAD`，保留上游文件内容，并统一 Windows BAT 的 CRLF 换行。
