---
description: 面向 ARM、Linux、MCU 与 FPGA 的嵌入式工程知识库
---

# Workflow

> 面向嵌入式软件工程的系统化知识库：从 C/C++ 基础、编码规范和开发工具，到设备树、内核启动、驱动、DMA、FPGA 以及 GD32 MCU 外设资源。

嵌入式系统的问题通常跨越硬件、启动链、编译器、操作系统、驱动和应用层。Workflow 按“语言基础 → 工程方法 → 系统软件 → 芯片资源 → 工具环境”的顺序组织内容，示例尽量给出可编译、可验证、可迁移的写法。

## 知识地图

```text
C / C++ 与 Python
  → 编码规范、接口设计与调试技巧
  → 交叉编译、命令行工具与 zsh
  → BootROM / U-Boot / Linux / init
  → 设备树、驱动、DMA 与通信
  → GD32 外设资源与 FPGA 数据通路
```

## 基础语言与工程方法

- [C / C++ 编程规范](/workflow/c-cpp-style)：命名、接口、错误处理、资源所有权和可测试性。
- [C / C++ 语法](/workflow/c-cpp-syntax)：指针、数组、结构体、位操作、函数指针和 C++ RAII。
- [Python 语法](/workflow/python)：脚本、数据结构、文件处理、子进程和自动化校验。
- [嵌入式开发技巧](/workflow/embedded-tips)：从现象到根因的排查、日志、断言、测量和版本化。

## 系统原理与底层代码

- [设备树基础知识](/workflow/device-tree-basics)：节点、属性、资源、pinctrl、时钟和 reserved-memory。
- [内核启动流程](/workflow/kernel-boot)：BootROM、U-Boot、Kernel、initramfs、systemd 和驱动探测。
- [常用驱动代码](/workflow/driver-snippets)：GPIO、字符设备、ioctl、platform、IRQ、DMA 和 sysfs 模板。

## GD32 芯片资源

- [GD32F103 芯片资源](/workflow/gd32f103)：Cortex-M3、时钟、GPIO、定时器、USART、DMA 和 ADC。
- [GD32F407 芯片资源](/workflow/gd32f407)：Cortex-M4F、高速时钟、FMC、Ethernet、USB、定时器和 DMA。
- [GD32H759 芯片资源](/workflow/gd32h759)：Cortex-M7、缓存/MPU、片上 RAM、CAN-FD、Ethernet、USB 和高性能 DMA。

## 工具与命令行环境

- [常用工具整理](/workflow/tools)：编译、烧录、调试、抓包、性能分析和系统验证工具。
- [zsh 配置](/workflow/zsh)：插件、补全、别名、环境变量和多工具链切换。
- [命令行工具](/workflow/cli-tools)：文件、文本、进程、网络、二进制和日志分析工具。

## 实践原则

1. 先确认架构、时钟、内存布局和版本，再修改软件。
2. 先看日志、寄存器、波形和反汇编，再猜代码逻辑。
3. 每次只改变一个变量，并保留可以回滚的版本。
4. 让编译、烧录、部署和验证步骤可以被别人重复执行。
