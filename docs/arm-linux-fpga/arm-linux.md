---
title: ARM
description: ARM SoC、RK3568/OK3568 开发板与 AArch64 交叉编译实践
---

# ARM

ARM 这一栏关注处理器架构、板级启动和交叉编译，重点围绕 `RK3568 / Forlinx OK3568` 以及 ARM64 开发环境展开。

## ARM 平台与开发板

拿到一块 ARM 开发板时，先建立硬件和软件画像：

- SoC 型号、核心数和架构：例如 RK3568、AArch64。
- 启动介质、U-Boot、内核和设备树的来源。
- 内存、存储、串口、网口和调试接口。
- 目标系统版本、根文件系统和工具链版本。

```sh
uname -m
cat /proc/cpuinfo
cat /etc/os-release
```

开发机和目标板的职责要分开：主机负责源码、交叉编译和镜像准备，目标板负责安装、运行和现场验证；串口则作为网络失效时的恢复入口。

## ARM64 交叉编译

编译板端程序或 Linux 内核模块时，明确目标架构和工具链前缀：

```sh
export ARCH=arm64
export CROSS_COMPILE=aarch64-linux-gnu-

make -C /path/to/kernel \
  M="$PWD" \
  ARCH="$ARCH" \
  CROSS_COMPILE="$CROSS_COMPILE" \
  modules
```

工具链、内核配置和目标机运行的内核必须匹配。模块编译成功不代表一定能加载，还要检查 `uname -r`、`vermagic` 和 `Module.symvers`。

## 根文件系统准备

ARM 板卡的根文件系统要同时满足：

- 目标架构的动态链接器和运行库完整。
- `/lib/modules/$(uname -r)` 与运行内核匹配。
- 串口、网络、SSH 和日志服务可用。
- 应用依赖、设备节点和权限配置明确。

同步或制作镜像前，先确认挂载点和剩余空间，避免把普通目录误认为目标根文件系统。
