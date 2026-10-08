# 🍲 拾味厨房 · 下载与启动

## 1. 下载并解压

进入 [GitHub 最新 Release](https://github.com/sloth766/shiwei-kitchen/releases/latest)，在 Assets 中下载 `shiwei-kitchen-v1.0.0-source.zip`。右键选择“全部解压”，打开解压后的 `shiwei-kitchen` 文件夹。不要直接在压缩包内启动。

这是完整源码包，包含网站页面、本地服务器、菜谱数据和启动脚本。需要本机安装 Python；包内没有捆绑 Python，也没有独立 EXE。

## 2. 准备 Python

需要 Python 3.10 或更新版本。可从 [Python 官网](https://www.python.org/downloads/) 安装当前稳定版，安装后确保终端能识别 `python` 或 `py`。本项目已在 Python 3.12 上验证。

没有 npm、pip 依赖，也不用运行前端构建命令。

## 3. 打开厨房

Windows：双击 **启动厨房.bat**，浏览器会自动打开。保持启动窗口运行；按 `Ctrl+C` 可停止。

其他系统或手动启动：在解压文件夹的终端执行：

```sh
python app.py --open
```

如果系统使用 `python3` 命令，改为 `python3 app.py --open`。浏览器访问 `http://127.0.0.1:8765`。

首次启动会自动建立 SQLite 数据库并导入 397 条内置菜谱。未接入 AI 时也可以浏览、搜索、收藏、添加和导入菜谱。

## 4. 接入 AI（可选）

打开 **AI 连接设置**，填入自己的 DeepSeek API Key 并保存，再向小厨提问。AI 调用使用你自己的账户额度。Key 保存在本机 `.env`；菜谱、收藏和聊天存于 `data/kitchen.db`。

## 遇到启动问题

- **找不到 Python**：安装 Python 后重新启动；也可在终端用 `py -3 app.py --open`。
- **端口被占用**：关闭上一次厨房启动窗口，或用 `python app.py --port 8766 --open`。
- **浏览器没有自动打开**：手动访问终端显示的本地地址。
- **AI 请求失败**：检查 Key、模型名、额度和网络；菜谱浏览与导入仍可使用。

## 更新与备份

关闭厨房，下载新版并解压。需要保留个人数据时，将旧文件夹中的 `data/kitchen.db` 和 `.env` 复制到新文件夹对应位置，再启动。不要将这两个文件上传到公开仓库。

也可先在 **我的菜谱** 中选择 **导出我的菜谱**，用于备份或跨版本导入；JSON 备份仅包含自建菜谱，不包含收藏和聊天历史。

## 校验下载包（可选）

Release 的 `SHA256SUMS.txt` 记录 ZIP 的 SHA-256。在 PowerShell 中执行：

```powershell
Get-FileHash .\shiwei-kitchen-v1.0.0-source.zip -Algorithm SHA256
```

将结果与校验文件中的摘要比较。
