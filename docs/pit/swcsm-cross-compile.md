---
description: OK3568 定制 RT 内核上截取 swcsm 驱动源码、交叉编译并验证加载的完整记录
---

# OK3568 定制 RT 内核：swcsm 驱动交叉编译与加载验证

给 OK3568 板卡安装三未信安 PCIe 密码卡驱动时，厂商安装程序需要目标内核的构建目录，但板上既没有 `/lib/modules/4.19.232-rt104/build`，软件源也没有这版定制 RT 内核的 headers。安装程序会在失败后清理刚生成的源码，于是这次排查的关键变成了：先在板端保留临时文件，再回开发机用匹配的 SDK 编译模块。

下面保留本次实际使用的命令、目录和验证结果。路径按各自环境调整，尤其要确认内核构建树与目标板固件来自同一版本。

记录日期：2026-10-29  
目标板：OK3568，ARM64  
目标内核：`4.19.232-rt104`  
驱动：三未信安 `swcsm` PCIe 密码卡驱动

## 1. 背景与结论

目标板上的 `/lib/modules/4.19.232-rt104/build` 和整个 `/lib/modules/4.19.232-rt104` 目录均不存在。执行 `apt-get install linux-headers-$(uname -r)` 也找不到 `linux-headers-4.19.232-rt104`，因为这是定制 RT 内核。

最终采用的办法是：在目标板上运行厂商 ARM64 安装程序，截取它临时生成的 `swcsm.c` 和 `Makefile`；将这两个文件复制到 ThinkPad 开发机，用匹配的 OK3568 内核构建目录和 SDK 自带的 ARM64 交叉工具链编译。最终得到 `swcsm.ko`，并已在目标板上成功加载。

> **适用范围**：本记录中的 `.ko` 针对本次验证的 `4.19.232-rt104` 固件。批量部署时应保持目标板的内核源码、配置和构建产物与此固件一致；仅 `uname -r` 相同不能单独保证模块 ABI 完全一致。

## 2. 环境与路径

| 项目 | 本次路径或结果 |
| --- | --- |
| 目标板驱动包 | `/userdata/Sansec/drv/` |
| 目标板源码截取目录 | `/userdata/Sansec/drv-capture/` |
| ThinkPad SDK 顶层 | `/root/01_rk3568/05_rt/03_kernel/` |
| 本次使用的内核构建目录 | `/root/01_rk3568/05_rt/03_kernel/kernel-rt/` |
| SDK 交叉工具链 | `prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/` |
| ThinkPad 驱动编译目录 | `/root/01_rk3568/05_rt/02_driver/03-Jnantian/t/` |
| 交叉编译器前缀 | `aarch64-none-linux-gnu-` |

ThinkPad 上的 `/root/01_rk3568/...` 在本次环境中解析到 `/media/ljm/sda1/01_rk3568/...`。按实际机器路径调整即可。

## 3. 确认目标板内核状态

在 **OK3568 目标板**上运行：

```sh
uname -r
ls -ld /lib/modules/$(uname -r)/build
zcat /proc/config.gz 2>/dev/null | grep '^CONFIG_MODULES='
```

本次结果为 `4.19.232-rt104`、`build` 不存在、`CONFIG_MODULES=y`。内核支持可加载模块，但目标板没有用于现场编译的内核头文件和构建目录。

原始驱动包只有以下文件：

```text
INSTALL  sha256.txt  swcsm.drv
```

`INSTALL` 是 **ARM64 ELF 可执行文件**，不是 shell 脚本；在 x86_64 ThinkPad 上不能直接执行。它在目标板上会临时生成 `swcsm.c` 和 `Makefile`，随后因缺少 `build` 目录而报错并清理生成文件。

## 4. 在目标板截取驱动源码

在 **OK3568 目标板**上创建一个 `make` 包装器：厂商安装程序调用 `make` 时，包装器先保存当时生成的文件，再调用真正的 `/usr/bin/make`。

```sh
command -v make                       # 本次为 /usr/bin/make
mkdir -p /userdata/Sansec/capture-bin /userdata/Sansec/drv-capture

cat > /userdata/Sansec/capture-bin/make <<'EOF'
#!/bin/sh
cp -a /userdata/Sansec/drv/. /userdata/Sansec/drv-capture/
exec /usr/bin/make "$@"
EOF

chmod +x /userdata/Sansec/capture-bin/make
cd /userdata/Sansec/drv
PATH="/userdata/Sansec/capture-bin:$PATH" ./INSTALL swcsm.drv
ls -la /userdata/Sansec/drv-capture
```

`INSTALL` 仍会报 `/lib/modules/4.19.232-rt104/build/` 不存在，这是截取阶段的预期结果。本次截取目录中获得了：

```text
INSTALL  Makefile  sha256.txt  swcsm.c  swcsm.drv
```

生成的 `Makefile` 包含 `obj-m := swcsm.o`，因此可使用内核 kbuild 在开发机上编译。若另一套安装包生成的文件不同，应先检查其 `Makefile`，不要直接套用后续命令。

## 5. 复制到开发机并核对内核构建目录

将目标板截取的 `Makefile` 和 `swcsm.c` 复制到 ThinkPad 的驱动编译目录。将 `<板子IP>` 换成实际地址：

```sh
DRV="$HOME/01_rk3568/05_rt/02_driver/03-Jnantian/t"
mkdir -p "$DRV"
scp root@<板子IP>:/userdata/Sansec/drv-capture/Makefile \
    root@<板子IP>:/userdata/Sansec/drv-capture/swcsm.c \
    "$DRV/"
```

SDK 顶层的 `Makefile` 是指向 `device/rockchip/common/Makefile` 的构建包装器，不支持 `kernelrelease` 目标。本次实际用于编译的目录是 `kernel-rt`。在 **ThinkPad** 上核对：

```sh
SDK="$HOME/01_rk3568/05_rt/03_kernel"
KDIR="$SDK/kernel-rt"

ls -l "$KDIR/Makefile" "$KDIR/.config" "$KDIR/Module.symvers"
cat "$KDIR/include/config/kernel.release"
```

本次 `kernel.release` 为 `4.19.232-rt104`，且 `.config`、`Module.symvers` 均存在。SDK 中其他目录也可能显示相同版本号；应选实际用于构建目标板固件的那份内核树。

## 6. 使用 SDK 工具链交叉编译

在 **ThinkPad** 上运行：

```sh
SDK="$HOME/01_rk3568/05_rt/03_kernel"
KDIR="$SDK/kernel-rt"
TOOLCHAIN="$SDK/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin"
DRV="$HOME/01_rk3568/05_rt/02_driver/03-Jnantian/t"

"$TOOLCHAIN/aarch64-none-linux-gnu-gcc" --version | head -1
grep -n 'obj-m' "$DRV/Makefile"

cd "$DRV"
make -C "$KDIR" M="$PWD" ARCH=arm64 \
  CROSS_COMPILE="$TOOLCHAIN/aarch64-none-linux-gnu-" modules
```

本次编译器版本是 GCC `10.3.1`。成功时输出包含 `CC [M] swcsm.o`、`MODPOST 1 modules` 和 `LD [M] swcsm.ko`。

### 编译结果核验

```sh
ls -lh swcsm.ko
file swcsm.ko
modinfo -F vermagic swcsm.ko
modinfo -F depends swcsm.ko
```

本次得到的 `swcsm.ko` 大小为 `468656` 字节，`file` 显示为 ARM aarch64 ELF 模块，`vermagic` 为：

```text
4.19.232-rt104 SMP preempt mod_unload aarch64
```

`depends` 没有列出其他模块。`vermagic` 匹配是必要检查；实际能否加载仍须在目标板验证。

## 7. 目标板加载验证

将模块复制到目标板：

```sh
scp swcsm.ko root@<板子IP>:/userdata/Sansec/drv/
```

本次服务容器把宿主模块映射到容器的 `/opt/driver/swcsm.ko`，入口程序优先加载已编译模块：

```sh
docker run -d --name watchman-hsm --privileged --restart unless-stopped \
  -p 20601:20601 \
  -v /lib/modules:/lib/modules:ro \
  -v /usr/src:/usr/src:ro \
  -v /userdata/Sansec/drv/swcsm.ko:/opt/driver/swcsm.ko:ro \
  -v /userdata/Sansec/logs:/opt/pcieserver/log \
  watchman-hsm:1.0.0-arm64
```

镜像需要预先通过 `docker load -i /userdata/Sansec/watchman-hsm-1.0.0-arm64.tar` 加载。上述 `docker run` 仅适用于尚无同名容器的情况。

验证命令：

```sh
docker logs --tail 100 watchman-hsm
lsmod | grep swcsm
curl -i http://127.0.0.1:20601/health
```

本次日志显示“发现已编译驱动，直接加载”，设备节点 `/dev/swcsm-pci30-0` 至 `-3` 已发现；`lsmod` 显示 `swcsm` 已加载，`/health` 返回 HTTP 200、`status: ok`，密码卡设备为 `SC62-MAN`。

## 8. 本次遇到的错误及处理

| 现象 | 原因与处理 |
| --- | --- |
| `/lib/modules/4.19.232-rt104/build` 不存在 | 目标板没有该定制内核的构建目录；使用匹配 SDK 在开发机交叉编译。 |
| `apt` 找不到 `linux-headers-4.19.232-rt104` | Ubuntu 软件源不提供此定制 RT 内核的 headers。 |
| 对 `INSTALL` 执行 `sed` 得到乱码 | `INSTALL` 是 ARM64 ELF 二进制程序。 |
| SDK 顶层 `make kernelrelease` 报 `No rule to make target` | 顶层 `Makefile` 是 Rockchip 包装器；应指向 `kernel-rt` 内核目录。 |
| `aarch64-linux-gnu-gcc: No such file or directory` | 工具链前缀用错；本次 SDK 实际提供 `aarch64-none-linux-gnu-`。 |
| 工具链路径误设为 `$PWD/bin` | `$PWD` 当时是驱动目录；改用 SDK 下工具链的绝对路径。 |

批量部署时，应把同一版固件、匹配的 `swcsm.ko`、离线 Docker 镜像及启动配置一并纳入系统镜像，并在每台板上执行驱动加载与业务自检。
