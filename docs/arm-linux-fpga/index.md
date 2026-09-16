---
title: 嵌入式物语
description: ARM、Linux 与 FPGA 工程实践
---

# 嵌入式物语

这里记录我在嵌入式系统开发中遇到的真实问题和解决过程，现在按 **ARM、Linux、FPGA** 三个方向整理。

## ARM

关注处理器架构、开发板、板级启动和 AArch64 交叉编译，实践平台包括 Forlinx OK3568 / RK3568。

[阅读 ARM 平台与开发板 →](/arm-linux-fpga/arm-linux)

## Linux

关注 ARM Linux 系统启动、根文件系统、设备树、驱动、systemd、SSH、防火墙和现场调试。

- [阅读 Linux 系统实践 →](/arm-linux-fpga/linux)
- [阅读嵌入式调试与 DMA →](/arm-linux-fpga/embedded-debug)

## FPGA

关注 FPGA 与 ARM SoC 协同开发中的寄存器映射、DMA 数据通路、缓存和软硬件联调。

[阅读 FPGA 工程方向 →](/arm-linux-fpga/fpga)

::: tip 记录方式

优先记录可以复现的命令、配置、日志和代码路径；遇到系统问题时，先保留现场，再做最小范围修改。

:::
