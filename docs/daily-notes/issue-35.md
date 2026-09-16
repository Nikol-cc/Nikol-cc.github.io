# 使用 Shell 脚本检查并配置 git user 信息

最近在使用 `fnm` 时，发现项目配置了 `.node-version` 或 `.nvmrc` 文件时，可以自动切换 `node` 版本，于是我就想到可以利用 `shell` 脚本来帮我检查和修改 `git user` 信息，防止造成用公司信息提交到 `github` 的尴尬（毕竟主要用公司电脑写代码）

[fnm 检测 .node-version 和 .nvmrc 源码地址](https://github.com/Schniz/fnm/blob/master/src/shell/zsh.rs#L34)

## 常用的 Shell 检测运算符

```sh
# 检测 filename 是否为目录
-d filename

# 检测 filename 是否为普通文件
-f file

# 检测文件或目录是否存在
-e file

# 检测文件是否可读
-r file

# 检测文件是否可写
-w file

# 检测文件是否可执行
-x file

# 检测文件是否为空
-s file
```

[Shell 基本运算符 | 菜鸟教程](https://www.runoob.com/linux/linux-shell-basic-operators.html)

## 编写 Shell 脚本代码

```zsh
# 检测 .git 目录是否存在
if [[ -d .git ]]; then
  # github 用户名
  githubName=""
  # github 邮箱地址
  githubEmail=""
  # 获取项目的 git 仓库地址
  repositoryUrl=$(git remote get-url origin)
  # 获取当前项目的 user.name
  localName=$(git config user.name)
  # 获取当前项目的 user.email
  localEmail=$(git config user.email)

  # 只判断 github 仓库，根据需要修改（判断字符建议写长点）
  if [[ $repositoryUrl =~ "github.com/Nikol-cc" ]]; then
    # 提示当前为 github 项目（不需要就注释）
    echo -e "\033[34m当前为 github 项目\033[0m"

    # 当 githubName 存在并与当前项目的 user.name 不一致时
    if [[ $githubName && $githubName != $localName ]]; then
      # 修改当前项目的 user.name 信息
      git config user.name "$githubName"

      echo -e "已将当前仓库的 name 从\033[33m $localName \033[0m修改为\033[32m $githubName \033[0m"
    fi

    # 当 githubEmail 存在并与当前项目的 user.email 不一致时
    if [[ $githubEmail && $githubEmail != $localEmail ]]; then
      # 修改当前项目的 user.email 信息
      git config user.email "$githubEmail"

      echo -e "已将当前仓库的 email 从\033[33m $localEmail \033[0m修改为\033[32m $githubEmail \033[0m"
    fi
  fi
fi
```

## 其他

其实配置 `SSH Key` 就没这么多事，但如果项目使用的是 `https` 源，则需要修改为 `SSH` 源，而且个人觉得 `https` 源方便，在浏览器上复制 `url` 就行
