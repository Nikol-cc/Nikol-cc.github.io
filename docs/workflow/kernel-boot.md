---
description: ARM Linux 从复位到用户空间的内核启动流程
---

# 内核启动流程

理解启动链的关键是区分每一阶段的职责、地址空间和可用设备。出现黑屏、串口无输出、挂载失败或服务未启动时，应先判断故障发生在哪一阶段。

## 启动链

```text
上电 / 复位
  → BootROM
  → SPL / TPL
  → U-Boot
  → Linux decompressor
  → start_kernel()
  → init / systemd
  → 用户空间服务
```

BootROM 选择启动介质并加载第一阶段代码；SPL 完成 DDR、时钟和最小硬件初始化；U-Boot 加载内核、设备树和 initramfs，并设置 `bootargs`；内核完成架构、内存、调度器、驱动模型和根文件系统初始化。

## U-Boot 传参

常见参数包括：

```text
console=ttyS2,1500000n8 root=/dev/mmcblk0p3 rootwait rw
rootfstype=ext4 loglevel=7 earlycon
```

`console` 决定早期串口输出，`root` 决定根文件系统来源，`rootwait` 适合等待 MMC/USB 设备，`earlycon` 用于内核早期日志。参数错误时，内核可能已经启动，只是没有输出或无法找到根设备。

## 内核早期阶段

架构入口完成异常向量、页表和内存布局准备后，进入 `start_kernel()`。随后依次初始化内存管理、调度器、中断、定时器、workqueue、VFS、网络和设备模型。`initcall` 机制按照级别调用各子系统初始化函数。

驱动 probe 通常发生在总线、设备树节点、时钟和电源域准备好之后。出现 `-EPROBE_DEFER` 不一定是驱动错误，而是依赖资源尚未就绪；应继续查看后续日志和依赖驱动。

## 根文件系统

内核必须找到并挂载 rootfs，然后执行 `/sbin/init` 或 `init=` 指定的程序。常见失败原因：分区设备名错误、文件系统驱动未编入内核、设备树存储控制器未启用、根文件系统缺少动态链接器或 init 权限错误。

```sh
cat /proc/cmdline
mount
ls -l /sbin/init /lib/ld-linux-aarch64.so.1
journalctl -b -k
```

## systemd 阶段

systemd 读取 unit、挂载文件系统、启动网络和业务服务。服务问题应区分“内核没有创建设备”“设备节点存在但权限不对”“服务启动失败”和“服务启动后立即退出”。

```sh
systemctl get-default
systemctl --failed
systemctl status ssh.service
journalctl -b -u ssh.service
```

## 启动问题定位顺序

1. 确认电源、复位、启动介质和串口参数。
2. 分别确认 BootROM、U-Boot、内核 decompressor 是否有输出。
3. 检查 `bootargs`、内核镜像、设备树和 initramfs 是否成套。
4. 检查根设备、文件系统和 `/sbin/init`。
5. 最后再定位 systemd、网络和业务服务。
