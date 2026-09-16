# 本地部署 DeepSeek 大模型

最近 DeepSeek 老转圈圈和系统繁忙，所以决定自己部署一个

## 下载和安装 Ollama

Ollama 是一个强大的开源框架，旨在为本地运行大型语言模型提供便利。通过简单的安装指令，用户可以快速在本地运行开源大型语言模型

### 安装 Ollama

1. 打开 [Ollama 官网](https://ollama.com/download)
2. 下载对应系统的安装包
3. 安装并启动 Ollama

### Ollama 常用命令

```sh
# 在命令行中运行模型
ollama run <模型名称>

# 列出可用模型
ollama list

# 查看模型状态
ollama ps

# 删除模型
ollama rm <模型名称>

# 启动 API 服务
ollama serve
```

## 部署 DeepSeek R1 大模型

> 部署 DeepSeek R1 大模型前，需要确保系统具备足够的内存和存储空间（本人电脑为 M3 Pro 36GB 内存，运行 14B 模型没啥压力，运行 32B 模型会卡顿）

1. 打开 [DeepSeek R1 | Ollama](https://ollama.com/library/deepseek-r1)
2. 复制相应的模型安装指令
3. 在终端中运行模型安装指令

```sh
# 下载 deepseek-r1 8b 模型
ollama run deepseek-r1:8b
```

### 解决 Ollama 下载模型速度变慢

如果在下载模型时速度变慢，可以使用 `Ctrl + C` 取消下载，然后重新运行下载指令。

解决 Ollama 下载模型速度变慢

- [模型下载最后 1%速度骤降，导致下载时间超长](https://github.com/ollama/ollama/issues/3794)

## 接入到 WebUI 中

接入 WebUI 有多种方式：

1. 自行搭建 WebUI
2. 使用浏览器插件接入
3. 使用第三方提供的 WebUI

### 自行搭建 WebUI

1. 下载并安装 [Docker](https://www.docker.com/)
2. 使用 Docker 运行 [Open WebUI](https://github.com/open-webui/open-webui)

```sh
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

3. 在浏览器中访问 <http://localhost:3000>

---

- [Open WebUI | GitHub](https://github.com/open-webui/open-webui)

### 使用浏览器插件

1. 安装浏览器扩展 —— [Page Assist - 本地 AI 模型的 Web UI](https://chromewebstore.google.com/detail/page-assist-%E6%9C%AC%E5%9C%B0-ai-%E6%A8%A1%E5%9E%8B%E7%9A%84-web/jfgfiigpkhlkbnfnbobbkinehhfdhndo)
2. 在浏览器中访问 `chrome-extension://jfgfiigpkhlkbnfnbobbkinehhfdhndo/options.html`

---

- [page-assist | GitHub](https://github.com/n4ze3m/page-assist)
- [Page Assist - 本地 AI 模型的 Web UI | Chrome Web Store](https://chromewebstore.google.com/detail/page-assist-%E6%9C%AC%E5%9C%B0-ai-%E6%A8%A1%E5%9E%8B%E7%9A%84-web/jfgfiigpkhlkbnfnbobbkinehhfdhndo)

### 使用第三方提供的 WebUI

> 以 [Chatbox](https://web.chatboxai.app) 为例

#### 设置环境变量

默认情况下，Ollama 只允许本地访问。如果希望其他网站也能访问，需要设置环境变量 `OLLAMA_ORIGINS`。

1. 打开终端
2. 运行以下命令（以 MacOS 和 zsh 为例）

```sh
# 允许所有来源访问
echo 'export OLLAMA_ORIGINS="*"' >> $HOME/.zshrc
```

3. 关闭并重新启动 Ollama 软件

#### 使用 Chatbox

> 以 [Chatbox](https://web.chatboxai.app) 为例

1. 在浏览器中访问 [Chatbox](https://web.chatboxai.app)
2. 点击 `设置`
3. 将模型提供方设置为 `OLLAMA API`（选择后会自动获取到本地的 Ollama 模型）
4. 点击 `保存`
