---
description: SSH 端口白名单、iptables 规则重建和 systemd 开机加载
---

# SSH 白名单防火墙

## 规则设计

允许 IP 列表单独保存，例如 `/etc/firewall/allow_ip.conf`，每行一个 IPv4 地址。脚本每次执行时先删除已有的 SSH 规则，再按文件内容添加 ACCEPT，最后添加端口 22 的 DROP。

这样可以避免旧 IP 残留，也能保证规则顺序稳定。

## 更新规则

```sh
cat /etc/firewall/allow_ip.conf
/etc/firewall/ssh_firewall.sh
iptables -L INPUT --line-numbers -n
tail -f /var/log/ssh_firewall.log
```

脚本需要处理空文件、重复地址和非法地址。更新前先确认当前 SSH 会话仍然来自白名单，否则重建规则可能立刻导致失联。

## systemd 管理

```sh
systemctl daemon-reload
systemctl enable --now ssh-firewall.service
systemctl status ssh-firewall.service
journalctl -u ssh-firewall.service -b --no-pager
```

## 预防失联

- 保留串口或本地终端作为恢复入口。
- 新规则先在临时链或测试端口验证。
- 应用 DROP 规则后，使用第二个 SSH 会话测试重新连接。
- 日志记录允许地址、规则变更前后状态和失败原因。
