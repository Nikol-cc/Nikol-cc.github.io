---
description: Linux 根文件系统同步时的挂载点、排除项和空间检查
---

# 根文件系统同步

## 典型现象

把开发板根文件系统同步到开发机后，出现空间快速耗尽、同步时间异常长，或者开发机中出现一层重复的 `rootfs` 目录。

## 原因

Linux 的 `/proc`、`/sys`、`/dev`、`/run` 是运行时文件系统，不能当作普通目录复制。日志、缓存、机器标识和挂载目录也可能把大量无关内容带入镜像。

## 推荐做法

```sh
rsync -aHAX --numeric-ids \
  --exclude=/proc --exclude=/sys --exclude=/dev \
  --exclude=/run --exclude=/tmp --exclude=/mnt \
  --exclude=/media --exclude=/lost+found \
  --exclude=/var/log --exclude=/var/cache --exclude=/var/tmp \
  root@board:/ /mnt/rootfs/
```

执行前确认 `/mnt/rootfs` 确实是目标挂载点，而不是误创建的普通目录：

```sh
findmnt /mnt/rootfs
df -h /mnt/rootfs
df -i /mnt/rootfs
```

## 空间不足时的定位顺序

1. 检查目标分区和 inode 是否耗尽。
2. 检查是否存在 `/mnt/rootfs/rootfs` 这类重复嵌套目录。
3. 用 `du` 找出最大的一级目录。
4. 确认是否误同步了 Docker、日志、缓存或备份文件。
5. 删除或移动前先确认路径，不要对根目录使用无范围的递归删除。

同步系统文件时，路径确认和排除规则比单纯提高 rsync 参数更重要。
