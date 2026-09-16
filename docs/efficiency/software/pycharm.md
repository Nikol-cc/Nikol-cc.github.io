---
description: PyCharm 配置、Python 解释器、代码规范和嵌入式辅助脚本
---

# PyCharm 配置

PyCharm 适合维护 Python 工具、串口测试程序、协议分析脚本、构建辅助脚本和日志处理工具。配置的核心是把解释器、项目依赖、格式化规则和运行入口固定下来，让脚本可以在另一台开发机上复现。

## 项目解释器

进入 `Settings / Preferences → Project → Python Interpreter`，为每个项目选择独立环境。推荐使用项目目录下的 `.venv`，不要把系统 Python 和项目依赖混在一起。

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install pyserial pyyaml pytest
python -m pip freeze > requirements.txt
```

在 PyCharm 中选择 `.venv/bin/python`（Windows 为 `.venv\\Scripts\\python.exe`），并在 Terminal 中确认：

```sh
python -c "import sys; print(sys.executable)"
python -m pip list
```

## 代码风格

推荐将格式化和静态检查写入项目依赖：

```sh
python -m pip install black isort ruff
ruff check .
black --check .
isort --check-only .
```

PyCharm 中打开 `Settings → Tools → Actions on Save`，可以启用代码格式化或外部工具；团队项目更建议把检查命令放入 `Makefile`、`pyproject.toml` 或 CI，而不是只依赖个人 IDE 设置。

## `pyproject.toml` 示例

```toml
[tool.ruff]
line-length = 100
target-version = "py311"
exclude = [".venv", "build", "dist"]

[tool.black]
line-length = 100
target-version = ["py311"]

[tool.isort]
profile = "black"
line_length = 100
```

## 嵌入式脚本运行配置

为串口工具、日志解析和镜像打包分别创建 Run/Debug Configuration：

- Script path：固定到项目内的入口脚本；
- Parameters：把串口、波特率、输入文件和输出目录显式写出；
- Working directory：使用项目根目录；
- Environment variables：只放非敏感配置，密钥不要保存到工程文件；
- Python interpreter：使用项目解释器，不要依赖 IDE 的默认解释器。

例如串口测试脚本的参数可以是：

```text
--port /dev/ttyUSB0 --baudrate 115200 --timeout 1.0
```

## 调试与测试

对涉及硬件的 Python 工具，把串口、文件和网络访问封装成可替换接口，主机侧可以用假数据测试协议解析。

```python
def parse_frame(frame: bytes) -> dict:
    if len(frame) < 4 or frame[0:2] != b"\\x55\\xaa":
        raise ValueError("invalid frame")
    return {"command": frame[2], "payload": frame[3:-1]}
```

运行测试：

```sh
python -m pytest -q
python -m compileall -q src tests
```

## Git 与终端

在 PyCharm 中配置 Git 可执行文件、提交检查和外部终端。提交前至少检查：解释器是否正确、依赖文件是否更新、日志和构建产物是否被忽略、脚本是否能从项目根目录运行。

## 推荐资料

- [PyCharm 官方文档](https://www.jetbrains.com/help/pycharm/)
- [Python 虚拟环境](https://docs.python.org/3/library/venv.html)
- [Ruff](https://docs.astral.sh/ruff/)
