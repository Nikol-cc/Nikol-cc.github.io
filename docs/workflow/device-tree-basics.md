---
description: Linux 设备树节点、属性、资源引用和驱动匹配基础
---

# 设备树基础知识

设备树描述“硬件有哪些资源以及资源如何连接”，驱动描述“如何操作这些资源”。设备树不是脚本，也不能替代驱动逻辑；节点属性必须与驱动解析代码和芯片手册一致。

## 节点与属性

```dts
uart2: serial@fe670000 {
    compatible = "rockchip,rk3568-uart", "snps,dw-apb-uart";
    reg = <0x0 0xfe670000 0x0 0x100>;
    interrupts = <GIC_SPI 121 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cru SCLK_UART2>, <&cru PCLK_UART2>;
    clock-names = "baudclk", "apb_pclk";
    pinctrl-names = "default";
    pinctrl-0 = <&uart2m0_xfer>;
    status = "okay";
};
```

- `compatible` 用于匹配驱动的 `of_device_id`。
- `reg` 描述寄存器基地址和长度，具体 cell 数量由父节点决定。
- `interrupts`、`clocks`、`resets`、`dmas` 通过 phandle 连接其他控制器。
- `status = "disabled"` 表示节点默认不启用，板级 DTS 可以覆盖为 `okay`。

## 引用、继承与覆盖

`.dtsi` 适合放 SoC 和公共板级内容，具体开发板的 `.dts` 通过 `&node` 覆盖属性。覆盖时要确认数组属性是替换还是追加，避免残留旧的 `pinctrl`、`interrupts` 或 `status`。

```dts
&uart2 {
    status = "okay";
    current-speed = <115200>;
};
```

## pinctrl、时钟和复位

外设节点存在但没有输出时，按顺序检查：节点状态、pinctrl 复用、输入输出电气属性、时钟是否打开、复位是否释放，以及驱动是否成功 probe。一个外设通常至少依赖寄存器、中断、时钟、复位和引脚五类资源。

## reserved-memory 与 DMA

```dts
reserved-memory {
    #address-cells = <2>;
    #size-cells = <2>;
    ranges;

    dma_pool: buffer@0 {
        compatible = "shared-dma-pool";
        reusable;
        size = <0x0 0x04000000>;
        alignment = <0x0 0x00100000>;
    };
};
```

固定地址保留区、CMA 和普通 DMA 内存用途不同。修改后要检查 `/proc/iomem`、启动日志、驱动映射地址和设备实际访问范围，不能只看 `dtc` 是否编译通过。

## 编译与运行时验证

```sh
make dtbs
dtc -I dtb -O dts -o running.dts /boot/dtb/board.dtb
grep -nE 'compatible|status|reg|interrupt|pinctrl' running.dts
dmesg -T | grep -Ei 'probe|defer|failed|clock|reset|irq|dma'
```

运行时设备树位于 `/sys/firmware/devicetree/base`。注意编译后的设备树可能被 bootloader 修改或追加 chosen、memory 等节点，分析时要以实际运行版本为准。
