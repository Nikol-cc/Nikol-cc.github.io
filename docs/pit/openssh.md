---
description: Ubuntu arm64 上升级 OpenSSH / OpenSSL 时的版本、依赖和服务验证
---

# OpenSSH / OpenSSL 升级

## 容易误判的地方

`ssh -V`、`sshd -V`、dpkg 包版本和实际运行中的服务，可能来自不同安装路径。只看到一个版本号，不能证明升级已经完整生效。

## 升级前记录

```sh
which ssh
which sshd
ssh -V
sshd -V
openssl version -a
dpkg -l | grep -E 'openssh|openssl|libssl'
systemctl status ssh
```

同时保存 `/etc/ssh` 配置和当前服务状态，避免编译安装后丢失原有配置。

## 编译安装后的验证顺序

```sh
sshd -t
sshd -V
ssh -V
systemctl restart ssh
systemctl status ssh --no-pager
journalctl -u ssh -b --no-pager | tail -n 80
```

验证时要区分三件事：

- 新二进制是否位于预期路径。
- 动态链接库是否能被正确加载。
- systemd 启动的 `sshd` 是否确实使用了新版本。

远程升级 SSH 时必须保留当前会话和串口入口，确认新服务可以重新连接后再关闭旧会话。
