---
description: 用 Python 编写嵌入式构建、测试和日志分析脚本
---

# Python 语法

Python 在嵌入式工程中适合做构建封装、串口工具、协议生成、寄存器表处理、日志分析和测试编排。脚本应有明确输入、输出、退出码和可重复执行的行为。

## 基础数据结构

```python
devices = {
    "ok3568": {"arch": "arm64", "serial": "/dev/ttyUSB0"},
    "gd32f407": {"arch": "cortex-m4", "serial": "/dev/ttyACM0"},
}

for name, info in devices.items():
    print(f"{name}: {info['arch']} -> {info['serial']}")
```

列表适合有序数据，元组适合固定记录，字典适合按键访问，集合适合去重和成员判断。不要用多层匿名列表表达复杂配置，优先使用 `dataclass`。

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Toolchain:
    prefix: str
    target: str
    sysroot: str
```

## 文件、路径与 JSON

```python
from pathlib import Path
import json

config_path = Path("build/config.json")
config = json.loads(config_path.read_text(encoding="utf-8"))
output = Path(config["output"]).resolve()
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text("build complete\n", encoding="utf-8")
```

使用 `pathlib` 而不是手工拼接字符串；对用户输入的路径进行存在性、文件类型和权限检查。

## 子进程与退出码

```python
import subprocess

result = subprocess.run(
    ["make", "-C", "kernel", "modules"],
    check=False,
    text=True,
    capture_output=True,
)
if result.returncode != 0:
    raise RuntimeError(result.stderr[-2000:])
```

不要使用 `shell=True` 拼接未经验证的字符串。长时间任务可使用 `Popen` 逐行读取输出，但仍要等待进程结束并检查退出码。

## 二进制与协议数据

```python
import struct

packet = struct.pack("<HBB", 0x55AA, 0x01, 0x10)
magic, command, length = struct.unpack("<HBB", packet)
```

`struct` 的格式字符串要显式指定字节序；`bytes` 不可变，`bytearray` 适合构造缓冲区，`memoryview` 适合在不复制的情况下切片。

## 串口与日志分析

```python
import re

DMA_LINE = re.compile(r"ch=(?P<ch>\d+) len=(?P<len>\d+) status=(?P<status>\w+)")

for line in Path("uart.log").read_text(encoding="utf-8", errors="replace").splitlines():
    match = DMA_LINE.search(line)
    if match and match.group("status") != "complete":
        print("DMA异常:", match.groupdict())
```

生产脚本应使用 `argparse`、`logging`、`timeout` 和结构化输出；把临时脚本逐步整理为可以在 CI 和现场环境复用的命令。
