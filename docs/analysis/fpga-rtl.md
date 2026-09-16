# FPGA / RTL 源码阅读

阅读 Verilog 或 SystemVerilog 时，先把代码还原成“时钟域 + 状态机 + 数据通路”。不要只按软件函数的方式理解 `always` 块，因为同一时刻可能有大量寄存器并行更新。

## RTL 的四个重点

1. **时钟**：每个寄存器由哪个时钟沿驱动，是否存在跨时钟域。
2. **复位**：同步还是异步，释放顺序是否满足外设要求。
3. **状态机**：状态转移条件、默认分支和异常恢复是否完整。
4. **接口**：寄存器地址、握手信号、FIFO/RAM 和中断如何连接到 ARM 软件。

## UART 发送状态机示例

```verilog
always_ff @(posedge clk or negedge rst_n) begin
  if (!rst_n) begin
    state <= IDLE;
    tx    <= 1'b1;
    count <= '0;
  end else begin
    case (state)
      IDLE: if (start) begin
        state <= START;
        tx    <= 1'b0;
        count <= '0;
      end
      START: if (count == BAUD_DIV - 1) begin
        state <= DATA;
        count <= '0;
      end
      DATA: if (count == BAUD_DIV - 1) begin
        count <= '0;
        // 移位并发送下一位
      end
      default: state <= IDLE;
    endcase
  end
end
```

阅读时要确认计数器位宽、波特率分频误差、停止位、`start` 脉冲宽度和 `tx_busy` 的时序。软件侧则要对照寄存器写入顺序、FIFO 深度和中断清除方式。

## 仿真与综合检查

- 先写 testbench 验证复位、边界计数和状态转移。
- 用 Verilator 或 Icarus Verilog 做快速行为仿真。
- 综合后检查时序报告、跨时钟域告警和资源利用率。
- 对 AXI-Lite 或自定义寄存器接口，确认读写握手不会重复提交命令。
