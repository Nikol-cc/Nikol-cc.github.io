---
title: Linux
description: ARM Linux 启动、根文件系统、systemd、SSH 与安全配置实践
---

# Linux

Linux 这一栏关注系统启动后的软件环境、服务管理、网络、安全和现场恢复，重点记录在 ARM64 开发板上的可复现操作。

## 从启动链定位问题

系统异常时按照启动链逐层确认：

1. 启动介质和 U-Boot 是否能找到内核。
2. 内核是否解压并识别 CPU、内存、存储和串口。
3. 设备树是否被正确加载。
4. 根文件系统是否挂载成功。
5. systemd 是否进入目标状态。
6. 应用和自定义服务是否正常启动。

```sh
dmesg -T | less
journalctl -b -p warning
systemctl --failed
systemctl list-units --type=service --state=running
```

## 根文件系统与开发机同步

同步系统文件时，`/proc`、`/sys`、`/dev`、`/run` 等目录不能按普通文件复制。日志、缓存和机器标识也应根据需要排除，避免把运行时状态带入镜像。

```sh
rsync -aHAX --numeric-ids \
  --exclude=/proc --exclude=/sys --exclude=/dev \
  --exclude=/run --exclude=/tmp --exclude=/mnt \
  --exclude=/media --exclude=/lost+found \
  root@board:/ /mnt/rootfs/
```

真正执行前，要确认目标路径是挂载的根文件系统，而不是普通目录。遇到 `No space left on device` 时，先检查目标分区和 inode，再判断是否出现重复的 `rootfs` 嵌套目录。

## systemd 服务

板端自定义功能应尽量通过 systemd 管理，而不是把命令散落在多个启动脚本里。服务至少要验证：

- `systemctl status 服务名` 是否正常。
- 是否已启用开机启动。
- `journalctl -u 服务名` 是否有完整日志。
- 服务失败后是否会影响 SSH、网络或系统恢复。

```ini
[Unit]
Description=Board service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/board-service
Restart=on-failure
RestartSec=2

[Install]
WantedBy=multi-user.target
```

## SSH 与系统安全

现场设备不应默认暴露所有入口。可以把允许的 IP 写入配置文件，再由脚本统一重建端口 22 的 iptables 规则：先清理旧规则，再按白名单添加 ACCEPT，最后添加 DROP。

```sh
ss -lntp
iptables -L INPUT -n --line-numbers
systemctl status ssh-firewall.service
tail -f /var/log/ssh_firewall.log
```

修改防火墙或 SSH 配置前，务必保留串口或本地控制台作为恢复入口。

## OpenSSH / OpenSSL 升级

系统升级前先记录发行版自带版本、动态库版本和服务状态。手动编译 OpenSSH 后，需要分别确认：

```sh
ssh -V
sshd -V
sshd -t
systemctl status ssh
```

软件升级、systemd 服务和防火墙策略相互影响，不能只验证 `ssh -V` 就认为系统已经恢复完成。
