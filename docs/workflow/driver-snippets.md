---
description: Linux 与 MCU 常用 GPIO、字符设备、IRQ、ioctl、DMA 驱动代码模板
---

# 常用驱动代码

下面的代码是结构模板，实际使用前必须替换寄存器、设备树资源、错误回滚和并发保护逻辑。驱动代码首先要保证资源生命周期正确，再追求功能完整。

## Linux platform 驱动

```c
static int demo_probe(struct platform_device *pdev)
{
    struct resource *res;
    void __iomem *base;

    res = platform_get_resource(pdev, IORESOURCE_MEM, 0);
    base = devm_ioremap_resource(&pdev->dev, res);
    if (IS_ERR(base))
        return PTR_ERR(base);

    platform_set_drvdata(pdev, base);
    return 0;
}

static const struct of_device_id demo_of_match[] = {
    { .compatible = "nikol,demo" },
    { }
};
MODULE_DEVICE_TABLE(of, demo_of_match);

static struct platform_driver demo_driver = {
    .probe = demo_probe,
    .driver = {
        .name = "nikol-demo",
        .of_match_table = demo_of_match,
    },
};
module_platform_driver(demo_driver);
```

## 字符设备与 file_operations

```c
static ssize_t demo_read(struct file *file, char __user *buf,
                         size_t count, loff_t *ppos)
{
    const char message[] = "embedded\n";
    size_t length = sizeof(message) - 1U;

    if (*ppos >= length)
        return 0;
    if (count > length - *ppos)
        count = length - *ppos;
    if (copy_to_user(buf, message + *ppos, count) != 0)
        return -EFAULT;
    *ppos += count;
    return count;
}
```

用户指针必须使用 `copy_to_user` / `copy_from_user`；不能直接解引用。生产代码还需要完整的 `alloc_chrdev_region`、`cdev_add`、`class_create`、`device_create` 和反向释放路径。

## ioctl 参数

```c
struct demo_config {
    __u32 baudrate;
    __u32 flags;
};

#define DEMO_IOC_CONFIG _IOW('D', 0x01, struct demo_config)

case DEMO_IOC_CONFIG: {
    struct demo_config config;
    if (copy_from_user(&config, argp, sizeof(config)) != 0)
        return -EFAULT;
    if (config.baudrate == 0U)
        return -EINVAL;
    break;
}
```

接口要考虑 32/64 位兼容、结构体大小、版本字段和并发访问，不要直接把内核指针暴露给用户空间。

## 中断处理

```c
static irqreturn_t demo_irq(int irq, void *data)
{
    struct demo_device *dev = data;
    u32 status = readl(dev->base + STATUS_REG);

    if ((status & RX_READY) == 0U)
        return IRQ_NONE;
    writel(status, dev->base + STATUS_REG); /* 按手册清除 */
    schedule_work(&dev->rx_work);
    return IRQ_HANDLED;
}
```

顶半部只读取状态、清除中断和保存最少数据；复杂处理放入 workqueue、threaded IRQ 或内核线程。确认共享中断、屏蔽位和清除顺序。

## DMA 基本原则

1. 确认设备支持的 DMA 地址宽度和可访问内存区域。
2. 对流式 DMA 正确调用 `dma_map_single` / `dma_unmap_single`，检查返回值。
3. 明确 CPU 与设备之间的 ownership，避免 DMA 仍在写时读取缓冲区。
4. 发生丢包时同时记录 DMA 剩余计数、描述符状态和缓存同步点。

## GPIO 与 sysfs/debugfs

新驱动优先使用 GPIO descriptor API 和 `devm_gpiod_get_optional`。debugfs 只用于调试信息，不应作为稳定用户态 ABI；稳定配置优先使用 ioctl、sysfs 属性或 netlink 等明确接口。
