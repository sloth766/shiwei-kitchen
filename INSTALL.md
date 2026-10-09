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

已经下载或解压源码时，直接进入包含 `app.py` 的目录启动，不需要再次 `git clone`。`destination path ... already exists` 表示目标目录已有文件，不代表厨房启动失败；请保留目录中的修改和本机数据。

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

重复启动时会检查目标端口：已有厨房服务则复用，并在指定 `--open` 或使用 Windows 启动器时打开现有页面；其他程序占用端口时会提示更换端口，不会关闭该程序。关闭网页标签并不会结束 Python 服务。

页面布局、图标和脚本均从本机加载，字体使用已安装的系统字体。若看到巨大黑色图标和默认超链接，先确认使用当前代码，再按 `Ctrl+F5` 强制刷新；旧版在线字体请求挂起可能阻塞整张样式表和页面初始化。

若控制台同时出现资源 `403` 和 `application/json` MIME 报错，实际是访问校验返回了 JSON 错误，并非 CSS 文件类型损坏。已兼容本机同一主机、`Sec-Fetch-Site: same-origin` 且 `Origin` 省略端口的请求；不同端口、其他主机、`null` 来源及缺少同源标记的省略端口请求仍会拒绝。修改服务端后需要重启服务才生效。

## 💾 数据迁移

更新前停止服务，将旧目录中的 `data/kitchen.db` 与 `.env` 复制到新版对应位置后启动。启动时会同步变更的内置菜谱，并保留库存、个人菜谱、收藏与对话。v1.1.0 会自动建立食材仓库表，无需手动迁移数据库。

网页 **我的菜谱 → 导出我的菜谱** 可导出个人菜谱 JSON。该文件可用于再次导入，不包含收藏或聊天记录。

v1.1.1 自动建立会话条件字段，保留历史记录。更新代码后重启服务并刷新页面，即可使用新的检索与会话条件行为。

包含后续改进的版本可在侧栏 **备份与恢复** 导出完整 JSON，包括库存、收藏、对话、厨房偏好和做饭进度。选择文件后先预览再确认整套恢复；恢复前自动保存当前数据到 `data/backups/`。这些备份和 `.env` 应单独保管，不加入源码包。

恢复文件仅支持本应用的完整备份格式，最大 32 MiB。若正在问答或写入数据，先等待操作完成；不需要删除数据库再恢复。恢复失败时数据库事务回滚，现有数据保留。其他浏览器页面在恢复后应刷新。

## 🔎 产物校验

Release 附带 `SHA256SUMS.txt`。PowerShell：

```powershell
Get-FileHash .\shiwei-kitchen-v<version>-source.zip -Algorithm SHA256
```

Linux：

```sh
sha256sum shiwei-kitchen-v<version>-source.zip
```
