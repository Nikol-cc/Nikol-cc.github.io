# ARM 启动链源码

ARM Linux 启动问题通常不是从 `main()` 开始的。处理器上电后，代码会经过 BootROM、一级/二级引导程序、TF-A（如果使用）、U-Boot、设备树和 Linux 内核入口，最终才进入内核初始化。

## 启动链的职责

| 阶段       | 主要工作                         | 阅读重点                          |
| ---------- | -------------------------------- | --------------------------------- |
| BootROM    | 初始化最小硬件并寻找启动介质     | 启动介质、下载模式、镜像头        |
| U-Boot     | 初始化 DDR、加载内核和设备树     | `bootcmd`、`bootargs`、`booti`    |
| 设备树     | 描述 CPU、内存、时钟、串口和外设 | `/chosen`、`memory`、`compatible` |
| Linux 入口 | 建立页表、异常向量和内核环境     | `head.S`、`__primary_switched`    |
| C 初始化   | 初始化内核子系统并启动用户空间   | `start_kernel()`、`rest_init()`   |

## 追踪 Linux 入口

在 ARM64 内核中，可以从架构入口开始追踪：

```text
arch/arm64/kernel/head.S
        ↓
__primary_switched
        ↓
start_kernel()
        ↓
rest_init()
        ↓
kernel_init() / kthreadd()
```

`head.S` 主要完成异常级别、页表、栈和地址空间切换；`start_kernel()` 进入通用内核初始化；`rest_init()` 创建 `kthreadd` 和 `kernel_init`，之后由用户空间的 `init` 或 `systemd` 接管系统服务启动。

## 排查启动问题

- 没有串口输出：先检查 BootROM 启动介质、串口复用和 U-Boot 是否运行。
- U-Boot 能启动但内核失败：检查 `bootargs`、内核镜像格式、加载地址和设备树地址。
- 内核启动后外设缺失：检查设备树 `status`、`compatible`、时钟、复位和 pinctrl。
- 模块加载失败：确认 `make kernelrelease` 与目标板内核版本完全一致，并检查 `Module.symvers`。

```sh
strings Image | head
make kernelrelease
cat /proc/cmdline
uname -a
```
