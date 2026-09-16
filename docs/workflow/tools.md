---
description: 嵌入式开发常用编译、烧录、调试、分析和验证工具
---

# 常用工具整理

## 编译与构建

| 工具                  | 主要用途               | 重点检查                          |
| --------------------- | ---------------------- | --------------------------------- |
| GCC / Clang           | C/C++ 编译、汇编和链接 | 目标架构、ABI、优化级别、警告     |
| CMake / Make / Ninja  | 组织构建流程           | 依赖、增量构建和可复现参数        |
| `arm-none-eabi-*`     | Cortex-M 裸机交叉编译  | linker script、启动文件、浮点 ABI |
| `aarch64-linux-gnu-*` | ARM64 Linux 交叉编译   | sysroot、内核版本、动态库         |
| `objcopy` / `objdump` | 镜像转换和反汇编       | 段地址、入口地址、重定位          |

常用检查：

```sh
file firmware.elf
readelf -h firmware.elf
readelf -S firmware.elf
arm-none-eabi-size firmware.elf
arm-none-eabi-objdump -dS firmware.elf > firmware.lst
```

## 烧录与调试

- CMSIS-DAP、J-Link、ST-Link：下载、复位、断点和寄存器查看。
- OpenOCD：用配置文件描述调试器和目标芯片，适合脚本化烧录。
- GDB：查看调用栈、变量、内存和异常现场；配合 `target remote` 连接远端调试器。
- `gdb-multiarch`：调试不同架构的 Linux ELF 和内核模块。

```gdb
target remote :3333
monitor reset halt
load
break main
continue
info registers
backtrace
```

## Linux 运行时检查

```sh
uname -a
dmesg -T
journalctl -b -p warning
systemctl status your-service
lsmod
modinfo your_module.ko
readlink -f /sys/class/net/eth0/device/driver
```

进程问题用 `ps`、`top`、`pidstat`；文件问题用 `lsof`、`strace`；网络问题用 `ip`、`ss`、`ethtool`、`tcpdump`；磁盘问题用 `df`、`du`、`iostat`。

## 性能和内存

- `perf`：Linux CPU、调度、缓存和调用栈分析。
- `ftrace` / trace-cmd：内核函数、调度、IRQ 和延迟分析。
- `valgrind`：主机侧内存错误和泄漏检查。
- AddressSanitizer：主机或支持的目标环境中的越界、UAF 和栈错误。
- `nm`、`size`、`readelf`：固件空间、符号和段布局分析。

## 波形与协议

逻辑分析仪用于确认 UART、SPI、I2C、RS-422、PWM 的时序；示波器用于观察电平、边沿、复位、时钟和电源。抓包工具只能证明线上数据，不能替代驱动日志和寄存器状态。

## 工具链记录模板

每个项目保存以下信息：工具名称和版本、目标三元组、编译参数、sysroot 路径、烧录命令、调试器固件、镜像校验和。把这些信息写入脚本或构建日志，避免依赖个人电脑的隐式配置。
