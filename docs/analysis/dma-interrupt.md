# DMA 与中断源码

DMA 源码阅读要同时看三个对象：硬件控制器、DMA 缓冲区和上层协议状态机。只看 `dma_transfer_number_get()` 或中断函数，很容易漏掉缓存、并发和缓冲区所有权问题。

## 典型的数据流

```text
外设接收 → DMA 写入缓冲区 → DMA 完成/空闲中断
        → ISR 记录长度 → 唤醒任务 → 协议解析 → 重新提交 DMA
```

中断处理函数应尽量短：读取并清除状态、保存必要的计数器、切换缓冲区、投递事件。协议解析、内存拷贝和日志输出应放到任务或线程中完成。

## 乒乓缓冲的核心不变量

- DMA 只能写当前活动缓冲区。
- 应用层只能读已经完成的缓冲区。
- 切换缓冲区前先关闭 DMA 或确保硬件已经产生边界事件。
- 重新配置地址和传输计数后，再清除标志并重新使能通道。
- 上层处理速度跟不上时必须有丢包、覆盖或流控策略。

```c
dma_channel_disable(DMA0, DMA_CH2);
len = RX_SIZE - dma_transfer_number_get(DMA0, DMA_CH2);

completed = active;
active ^= 1U;
dma_memory_address_config(DMA0, DMA_CH2, (uint32_t)rx_buf[active]);
dma_transfer_number_config(DMA0, DMA_CH2, RX_SIZE);
dma_flag_clear(DMA0, DMA_CH2, DMA_FLAG_G);
dma_channel_enable(DMA0, DMA_CH2);

queue_put(rx_buf[completed], len);
```

## 源码检查清单

- DMA 缓冲区是否满足芯片的对齐和地址范围要求？
- 片外 RAM 是否被 DMA 控制器和 MPU/cache 正确配置？
- 中断标志是否在重新使能前清除？
- 读取传输计数时 DMA 是否仍在运行？
- 队列满时，是否会在中断上下文中阻塞？
- 任务栈、队列和缓冲区是否有水位监控？
