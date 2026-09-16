---
description: 面向嵌入式开发的 C 与 C++ 语法、内存模型和位操作
---

# C / C++ 语法

## 指针、数组与内存

数组在作为函数参数时会退化为指针，长度必须单独传入。不要通过 `sizeof(pointer)` 推断缓冲区容量。

```c
void packet_dump(const uint8_t *data, size_t len)
{
    for (size_t i = 0; i < len; ++i) {
        printf("%02X ", data[i]);
    }
}

uint8_t frame[64];
packet_dump(frame, sizeof(frame));
```

`const uint8_t *`、`uint8_t * const` 和 `const uint8_t * const` 的含义不同：分别表示指向只读数据、指针本身不可变、数据和指针都不可变。

## 结构体、对齐与序列化

结构体可能包含填充字节，不能直接把任意结构体强转成协议帧。协议数据应明确字节序和字段宽度。

```c
static void put_u16_le(uint8_t out[2], uint16_t value)
{
    out[0] = (uint8_t)(value & 0xffU);
    out[1] = (uint8_t)(value >> 8U);
}

static uint16_t get_u16_le(const uint8_t in[2])
{
    return (uint16_t)in[0] | ((uint16_t)in[1] << 8U);
}
```

只有在确认硬件手册、编译器 ABI 和对齐要求后，才使用 `__attribute__((packed))`；packed 结构体在某些架构上可能产生非对齐访问。

## 位操作与寄存器

```c
#define REG_ENABLE        (1U << 0U)
#define REG_MODE_MASK     (3U << 4U)
#define REG_MODE(value)   (((uint32_t)(value) << 4U) & REG_MODE_MASK)

reg |= REG_ENABLE;
reg = (reg & ~REG_MODE_MASK) | REG_MODE(2U);
```

移位前要保证操作数是无符号类型，并确认移位量小于类型宽度。清除状态位时要阅读寄存器的 W1C、读清、写保护和读回语义，不能把所有寄存器都当普通 RAM 使用。

## 函数指针与回调

```c
typedef void (*event_handler_t)(uint32_t event, void *context);

typedef struct {
    event_handler_t handler;
    void *context;
} event_listener_t;
```

回调接口要定义调用上下文：是否在中断、是否允许阻塞、参数有效期多久、回调执行期间谁持有锁。

## C++ 的核心用法

- 用 `enum class` 避免枚举值隐式转换。
- 用 `std::array` 表达固定长度数组，用 `std::span` 或指针加长度表达非拥有视图。
- 用构造函数建立不变量，析构函数释放资源。
- 在没有堆的 MCU 项目中，可以使用静态对象、对象池和 placement new，但必须明确生命周期。
- 嵌入式 C++ 中尽量限制异常、RTTI 和不可控的动态分配，具体取决于运行时和链接配置。

```cpp
class GpioOutput {
public:
    explicit GpioOutput(uint32_t pin) : pin_(pin) { gpio_init(pin_); }
    ~GpioOutput() { gpio_deinit(pin_); }

    void set(bool high) { gpio_write(pin_, high); }

private:
    uint32_t pin_;
};
```

## 常见未定义行为

- 使用未初始化变量或越过数组边界。
- 对空指针解引用、释放后继续使用、重复释放。
- 有符号整数溢出、错误的指针类型转换和不满足对齐要求的访问。
- 在多个执行上下文中读写非原子共享对象。
- 返回局部变量地址，或保存已经失效的栈缓冲区指针。

编译器警告、静态分析器、AddressSanitizer/UndefinedBehaviorSanitizer 和硬件单步调试应组合使用，而不是等到现场故障才定位。
