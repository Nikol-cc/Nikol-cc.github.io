---
description: 面向嵌入式开发的 zsh 配置、工具链切换和命令封装
---

# zsh 配置

zsh 配置的目标是让命令行环境可读、可迁移、可恢复。把交互体验配置和工程环境配置分开，避免某个插件或别名影响交叉编译、烧录和现场脚本。

## 基础配置

```zsh
# ~/.zshrc
export EDITOR="vim"
export PAGER="less -R"
export LANG="C.UTF-8"

setopt AUTO_CD
setopt HIST_IGNORE_DUPS
setopt SHARE_HISTORY
setopt NO_CASE_GLOB

autoload -Uz compinit && compinit
bindkey -e
```

历史记录不要包含密码、token 和临时密钥。对会改变系统状态的命令，先用 `history`、`fc -ln -1` 或 `print -r -- $BUFFER` 检查展开结果。

## 环境变量与工具链

```zsh
typeset -gx ARM_GNU_TOOLCHAIN=/opt/toolchains/gcc-arm-none-eabi
typeset -gx AARCH64_TOOLCHAIN=/opt/toolchains/aarch64-linux-gnu

path=($ARM_GNU_TOOLCHAIN/bin $AARCH64_TOOLCHAIN/bin $path)
export ARCH=arm64
export CROSS_COMPILE=aarch64-linux-gnu-
```

工程环境建议写成显式函数，而不是让所有项目共享一套 `CROSS_COMPILE`：

```zsh
use-arm64() {
  export ARCH=arm64
  export CROSS_COMPILE=aarch64-linux-gnu-
  export SYSROOT=/opt/sysroots/arm64
  export PKG_CONFIG_SYSROOT_DIR=$SYSROOT
  export PKG_CONFIG_PATH=$SYSROOT/usr/lib/aarch64-linux-gnu/pkgconfig
}
```

## 别名与函数

```zsh
alias ll='ls -lah'
alias grep='grep --color=auto'
alias dmesg-now='dmesg -T | less -R'

mkcd() {
  mkdir -p -- "$1" && cd -- "$1"
}

extract() {
  case "$1" in
    *.tar.gz|*.tgz) tar -xzf "$1" ;;
    *.tar.xz)       tar -xJf "$1" ;;
    *.zip)          unzip "$1" ;;
    *) print "unsupported archive: $1" >&2; return 2 ;;
  esac
}
```

函数参数要使用引号，路径要用 `--` 与命令参数隔开，避免文件名以 `-` 开头造成误解析。

## 插件选择

插件应少而稳定。常用方向包括补全、语法高亮、命令历史和 Git 提示；不要为每个小功能安装插件。引入插件后记录版本和加载顺序，现场环境可使用最小 `.zshrc` 启动：

```sh
zsh -f
```

## 启动性能与排错

```zsh
time zsh -i -c exit
zsh -xv 2> zsh-startup.log
typeset -pm path
whence -a aarch64-linux-gnu-gcc
```

遇到“命令找不到”时，先检查 `whence -a`、`$PATH` 和 shell 是否重新加载；遇到配置污染时，用 `env -i HOME="$HOME" PATH=/usr/bin:/bin zsh -f` 建立干净环境。
