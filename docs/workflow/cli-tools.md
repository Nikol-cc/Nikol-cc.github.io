---
description: 嵌入式工程常用文件、文本、进程、网络、二进制和日志命令
---

# 命令行工具

## 文件与目录

```sh
find . -type f -name '*.c' -print
du -xh --max-depth=1 /var | sort -h
stat firmware.bin
realpath ./build/output
rsync -aHAX --numeric-ids --delete-delay src/ target/
```

`rsync --delete` 具有破坏性，使用前先加 `--dry-run`，并明确源目录和目标目录。根文件系统同步要排除 `/proc`、`/sys`、`/dev`、`/run`、缓存和临时目录。

## 文本与结构化数据

```sh
rg -n --glob '*.{c,h,dts,dtsi}' 'compatible|probe|DMA' .
sed -n '1,120p' driver.c
awk '$3 > 80 { print }' memory.log
sort -u symbols.txt
cut -d: -f1 errors.log | sort | uniq -c | sort -nr
jq '.devices[] | select(.enabled == true)' config.json
```

`rg` 适合源码搜索，`sed` 适合查看范围，`awk` 适合按列处理，`jq` 适合 JSON。不要用复杂正则替代对 ELF、设备树或协议格式的专用解析器。

## 进程、服务与资源

```sh
ps -ef --forest
top -H -p "$PID"
pidstat -dru -p "$PID" 1
lsof -p "$PID"
free -h
df -hT
systemctl list-units --failed
journalctl -b -u ssh.service -f
```

服务启动失败时，同时看 `systemctl status`、unit 文件、环境变量、权限、依赖和 journal；不要只重复执行 `restart`。

## 网络与串口

```sh
ip -br addr
ip route
ss -lntup
ethtool eth0
tcpdump -ni eth0 port 22
stty -F /dev/ttyUSB0 115200 cs8 -cstopb -parenb
hexdump -C capture.bin | head
```

网络故障按链路、地址、路由、监听端口、防火墙和应用协议分层验证。串口问题要记录实际波特率、流控、方向控制和原始十六进制数据。

## ELF、内核和二进制

```sh
file app.elf
readelf -h -l -S app.elf
nm -n app.elf | tail
objdump -dS app.elf | less
strings -a firmware.bin | less
xxd -g 1 -l 128 firmware.bin
sha256sum firmware.bin
```

对模块补充 `modinfo`、`uname -r`、`vermagic` 和 `file` 检查；对固件补充链接地址、入口地址、镜像长度和烧录范围检查。

## 管道、重定向与安全

```sh
set -euo pipefail
command 2>&1 | tee build.log
```

脚本中引用变量要加引号，危险操作先打印目标并支持 `--dry-run`。不要把密码、SSH token、私钥和完整环境变量写入日志或提交到 Git。
