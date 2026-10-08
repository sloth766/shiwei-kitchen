# 🚀 安装与升级

## 🧰 环境

- Python 3.10+
- 支持浏览器访问的本地运行环境
- AI 问答使用 DeepSeek API Key

## 📥 获取源码

```sh
git clone https://github.com/sloth766/shiwei-kitchen.git
cd shiwei-kitchen
```

也可从 [Releases](https://github.com/sloth766/shiwei-kitchen/releases) 获取 `shiwei-kitchen-v<version>-source.zip` 并解压。源码包包含服务端、前端资源、内置菜谱与上游许可。

## ⚙️ 配置与启动

将 `.env.example` 复制为 `.env`，按需设置：

```dotenv
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=deepseek-flash
```

也可在网页的 **AI 连接设置** 中保存配置。

```sh
python app.py --open
```

系统使用 `python3` 时替换命令即可。Windows 可使用 `启动厨房.bat`。

默认监听 `http://127.0.0.1:8765`。自定义端口：

```sh
python app.py --port 8766 --open
```

首次启动自动初始化 `data/kitchen.db` 并导入内置菜谱。关闭服务使用 `Ctrl+C`。

## 💾 数据迁移

更新前停止服务，将旧目录中的 `data/kitchen.db` 与 `.env` 复制到新版对应位置后启动。启动时会同步变更的内置菜谱，并保留库存、个人菜谱、收藏与对话。v1.1.0 会自动建立食材仓库表，无需手动迁移数据库。

网页 **我的菜谱 → 导出我的菜谱** 可导出个人菜谱 JSON。该文件可用于再次导入，不包含收藏或聊天记录。

v1.1.1 自动建立会话条件字段，保留历史记录。更新代码后重启服务并刷新页面，即可使用新的检索与会话条件行为。

## 🔎 产物校验

Release 附带 `SHA256SUMS.txt`。PowerShell：

```powershell
Get-FileHash .\shiwei-kitchen-v<version>-source.zip -Algorithm SHA256
```

Linux：

```sh
sha256sum shiwei-kitchen-v<version>-source.zip
```
