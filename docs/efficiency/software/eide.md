---
description: VS Code Embedded IDE（EIDE）配置、工具链、烧录和调试实践
---

# EIDE 配置

EIDE（Embedded IDE）是 VS Code 上的嵌入式开发扩展，面向 8051、STM8、Cortex-M、MIPS 和 RISC-V 等 MCU 工程，提供项目管理、编译、烧录和调试能力。它适合把 GD32、ARM Cortex-M 和多种 GCC 工具链统一到一个编辑器工作流中。

## 安装

1. 安装 VS Code。
2. 在扩展市场搜索 `Embedded IDE` 或 `EIDE`，确认扩展标识为 `CL.eide`。
3. 首次启动后完成工具目录初始化。
4. 根据项目实际情况安装或配置 `gcc-arm-none-eabi`、`arm-none-eabi-gdb`、OpenOCD、J-Link 或厂商烧录工具。

离线环境可从 [EIDE GitHub Releases](https://github.com/github0null/eide/releases) 获取版本包；安装后仍要单独准备编译器和调试器工具。

## 建立 Cortex-M 工程

新建项目时先固定四类信息：芯片型号、编译器、启动文件/链接脚本、烧录器。以 GD32 工程为例，检查：

- CMSIS 或厂商固件库的设备头文件；
- `system_gd32xxx.c` 的时钟初始化；
- 启动文件中的中断向量表；
- linker script 中 Flash、SRAM、外部 RAM 和栈的位置；
- `-mcpu`、`-mthumb`、浮点 ABI 与库文件是否匹配。

典型 GCC 参数：

```text
-mcpu=cortex-m4 -mthumb -mfloat-abi=softfp -mfpu=fpv4-sp-d16
-ffunction-sections -fdata-sections -Wl,--gc-sections
-Wl,-Map=${BuildDir}/${ProjectName}.map
```

GD32F103 使用 Cortex-M3 参数；GD32F407 使用 Cortex-M4 参数；GD32H759 使用 Cortex-M7 参数。不要直接复制其他芯片工程的启动文件和链接脚本。

## 工具链配置

在 EIDE 的项目设置中分别确认：

| 项目      | 检查内容                                 |
| --------- | ---------------------------------------- |
| Toolchain | GCC、ArmClang、Keil 或其他工具链路径     |
| Compiler  | `arm-none-eabi-gcc` 是否能在终端执行     |
| Assembler | 启动文件能否被正确汇编                   |
| Linker    | 链接脚本、库目录和 `nosys` / `nano` 选项 |
| Debugger  | GDB 版本、架构和连接方式                 |
| Flasher   | OpenOCD、J-Link、pyOCD 或厂商工具        |

在 VS Code 的终端中验证：

```sh
arm-none-eabi-gcc --version
arm-none-eabi-gdb --version
openocd --version
```

## 编译产物检查

```sh
arm-none-eabi-size build/firmware.elf
arm-none-eabi-objcopy -O binary build/firmware.elf build/firmware.bin
arm-none-eabi-objcopy -O ihex build/firmware.elf build/firmware.hex
arm-none-eabi-objdump -h -d build/firmware.elf > build/firmware.lst
sha256sum build/firmware.bin
```

重点检查 MAP 文件中的 Flash、RAM、栈和堆空间；不要只看编译器输出的“Build complete”。

## 烧录与复位

首次烧录先确认芯片连接、供电、SWD/JTAG 接口、复位线和读保护状态。烧录后执行一次硬件复位，再通过串口或 GPIO 验证启动，不要把“下载成功”当成“程序运行正常”。

## 调试配置

断点、单步和变量查看依赖 ELF 文件中的符号信息。调试版本保留 `-g3`，不要启用过高优化；Release 版本可以优化，但要保存对应 ELF，方便根据地址定位。

```text
启动顺序：编译 → 连接调试器 → 复位暂停 → 下载 → 设置断点 → 运行
故障顺序：看 HardFault 寄存器 → 看调用栈 → 看 MAP/反汇编 → 检查时钟和内存
```

## 常见问题

- **头文件能跳转但编译失败**：EIDE 的 IntelliSense 配置和真实编译参数不一致。
- **能编译但无法启动**：启动文件、向量表地址、链接脚本或时钟初始化不匹配。
- **DMA 数据异常**：检查缓冲区地址、数据宽度、对齐、外部 RAM 和缓存维护。
- **烧录后无法连接**：检查复位、SWD 频率、读保护和程序是否关闭了调试引脚。
- **Debug 变量显示异常**：检查优化级别、调试符号和实际使用的 ELF 是否对应。

## 推荐资料

- [EIDE 官方文档](https://em-ide.com/en/docs/getting-started/setup)
- [EIDE GitHub 仓库](https://github.com/github0null/eide)
- [VS Code 官方文档](https://code.visualstudio.com/docs)
