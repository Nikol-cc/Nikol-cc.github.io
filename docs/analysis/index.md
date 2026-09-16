# 嵌入式源码阅读

源码阅读不再围绕前端库展开，而是围绕一条真实的嵌入式调用链展开：处理器上电后如何进入 C 代码，Linux 如何解析设备树并加载驱动，DMA 和中断如何完成数据搬运，FPGA 的 RTL 又如何与软件寄存器协同工作。

## 阅读一份嵌入式源码的顺序

1. **先找入口**：确认复位向量、`start_kernel()`、驱动 `probe()`、中断处理函数或 RTL 顶层模块。
2. **再画数据流**：标出寄存器、内存、DMA 缓冲区、队列和用户态接口之间的数据流向。
3. **最后看并发**：检查中断上下文、进程上下文、锁、屏障、缓存一致性和状态机跳转。

## 本栏内容

- [ARM 启动链源码](/analysis/arm-boot)：从 BootROM、U-Boot 到 Linux 入口，理解镜像如何接管 CPU。
- [Linux 内核源码阅读](/analysis/linux-kernel)：围绕 `start_kernel()`、设备模型、调度和日志定位代码入口。
- [设备树与驱动源码](/analysis/device-driver)：从节点匹配到 `probe()`，追踪资源申请、寄存器映射和设备节点。
- [DMA 与中断源码](/analysis/dma-interrupt)：分析 DMA 描述符、乒乓缓冲、IRQ 顶半部和线程化处理。
- [FPGA / RTL 源码阅读](/analysis/fpga-rtl)：从时钟、复位、状态机和 AXI/寄存器接口阅读 Verilog。

## 建议的源码工具链

```sh
# 搜索函数、结构体和设备树 compatible
rg "probe|interrupts|compatible|dma" drivers arch dts

# 查看目标架构的反汇编
aarch64-linux-gnu-objdump -d vmlinux | less

# 查看内核符号和模块依赖
nm -n vmlinux | less
modinfo your_driver.ko
```

阅读源码的目标不是记住每一行，而是能够回答三个问题：谁创建了资源、谁拥有这块内存、谁负责在异常路径中释放它。
