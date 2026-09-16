# 设备树与驱动源码

设备树把硬件资源从驱动代码中分离出来。驱动通过 `compatible` 与设备树节点匹配，在 `probe()` 中读取寄存器、IRQ、时钟、GPIO、DMA 和电源资源。

## 从节点匹配到 `probe()`

```text
设备树节点
    ↓ compatible
总线创建 device
    ↓ match
驱动的 probe()
    ↓
资源申请 → 寄存器映射 → 中断注册 → DMA 初始化 → 字符设备/网络设备注册
```

一个最小的匹配结构通常类似下面这样：

```c
static const struct of_device_id demo_of_match[] = {
    { .compatible = "nikol,demo" },
    { }
};
MODULE_DEVICE_TABLE(of, demo_of_match);

static struct platform_driver demo_driver = {
    .probe = demo_probe,
    .remove = demo_remove,
    .driver = {
        .name = "demo",
        .of_match_table = demo_of_match,
    },
};
```

## `probe()` 的检查顺序

1. 使用 `devm_platform_ioremap_resource()` 映射寄存器。
2. 使用 `platform_get_irq()` 获取中断号并注册处理函数。
3. 获取时钟、复位、GPIO、regulator 和 pinctrl。
4. 申请 DMA 通道，设置方向、宽度、突发长度和回调。
5. 最后注册用户态接口，避免设备还未准备好就对外可见。

设备树里写了资源，不代表资源一定可用。要结合 `dmesg`、`/sys/firmware/devicetree/base`、`debugfs` 和内核配置，确认节点被启用且驱动真的匹配成功。

## 常见失败点

- `compatible` 拼写不一致，导致驱动没有进入 `probe()`。
- `status = "disabled"` 或 pinctrl 配置错误。
- 中断触发类型与硬件电平不一致，出现中断风暴或完全没有中断。
- DMA 地址使用虚拟地址，或缓存未同步导致数据看起来“偶尔正确”。
