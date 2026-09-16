---
description: 嵌入式 C 与 C++ 编程规范、接口设计和资源管理
---

# C / C++ 编程规范

规范的目标不是让代码“看起来整齐”，而是降低硬件相关代码的歧义，明确数据宽度、所有权、并发边界和错误处理方式。嵌入式项目应优先保证可读、可测、可追踪，再考虑局部的代码压缩。

## 类型、命名与格式

- 用 `uint8_t`、`uint16_t`、`uint32_t`、`int32_t` 表达协议字段、寄存器字段和固定宽度数据；不要用 `int` 表达线上的数据。
- `const` 表示只读承诺，指针参数优先写成 `const uint8_t *data`。
- 宏只用于编译期开关、位掩码和硬件常量；函数式逻辑优先使用 `static inline` 或普通函数。
- 一个函数只负责一个可验证的动作；中断函数只做采样、清标志和投递事件。
- 命名要包含单位和语义，例如 `timeout_ms`、`rx_len`、`dma_remaining`，避免 `tmp`、`flag1` 这类无法搜索的名字。

```c
typedef struct {
    uint32_t baudrate;
    uint8_t  data_bits;
    uint8_t  stop_bits;
    bool     parity_enable;
} uart_config_t;

static bool uart_config_valid(const uart_config_t *config)
{
    if (config == NULL) {
        return false;
    }
    return config->baudrate >= 1200U && config->baudrate <= 3000000U;
}
```

## 头文件边界

头文件只暴露调用者需要知道的内容：类型、常量、公共函数和必要的错误码。私有结构体、寄存器细节和辅助函数放在 `.c` / `.cpp` 文件中。

```c
/* ring_buffer.h */
#ifndef RING_BUFFER_H
#define RING_BUFFER_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

typedef struct ring_buffer ring_buffer_t;

ring_buffer_t *ring_buffer_create(uint8_t *storage, size_t capacity);
size_t ring_buffer_write(ring_buffer_t *rb, const uint8_t *data, size_t len);
size_t ring_buffer_read(ring_buffer_t *rb, uint8_t *data, size_t len);

#endif
```

## 错误处理与资源所有权

每个函数都应明确成功返回值、失败返回值以及资源释放责任。设备驱动中不要把失败隐藏在日志里；让调用者能够根据错误码决定重试、降级还是停止。

```c
int device_open(device_t **out)
{
    device_t *dev = calloc(1U, sizeof(*dev));
    if (dev == NULL) {
        return -ENOMEM;
    }

    int ret = transport_open(&dev->transport);
    if (ret != 0) {
        free(dev);
        return ret;
    }

    *out = dev;
    return 0;
}
```

C++ 中使用 RAII 管理锁、文件描述符、映射内存和 DMA 描述符，避免异常路径或提前 `return` 导致泄漏。裸机项目不适合盲目引入动态分配，但仍可以使用对象生命周期表达资源状态。

## 并发与中断规则

1. 中断与主循环共享的变量使用 `volatile` 只解决编译器优化问题，不等于原子操作或内存屏障。
2. 多字节状态、环形队列索引和引用计数需要临界区、原子操作或锁。
3. 不在中断中执行阻塞调用、格式化打印、复杂协议解析和动态内存分配。
4. 明确谁拥有缓冲区：DMA、ISR、协议任务和应用任务不能同时修改同一块内存。
5. 对外设寄存器写入按手册要求读回、延时或等待状态位，不依赖“刚好能跑”。

## 编译器检查

推荐的基础检查项：

```sh
cc -std=c11 -Wall -Wextra -Wconversion -Wshadow -Werror \
   -ffunction-sections -fdata-sections -c uart.c

g++ -std=c++17 -Wall -Wextra -Wconversion -Wshadow \
    -fno-exceptions -fno-rtti -c device.cpp
```

对交叉编译项目，把编译器版本、宏定义、`-mcpu`、`-mfloat-abi`、链接脚本和库版本记录到构建日志中。规范最终要能被工具检查，而不是只写在文档里。
