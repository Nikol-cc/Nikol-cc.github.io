# 使用 shell 脚本复制项目信息到剪切板

> 这是去年朋友跟我交流的一个问题，最近在整理吃灰笔记时挖出来的（当时写了笔记，但没写完）

| 聊天 | 记录 |
| :--: | :--: |
| 44-1 | 44-2 |

## 实现步骤

1. 打开冰箱
2. 把大象放进冰箱
3. 关闭冰箱

### 1. 获取当前项目名

一般来说我们的项目名就是当前的文件夹名称

- `PWD`: 表示当前工作目录的路径（一个常用的环境变量）

获取到当前工作目录的路径后，可以使用以下两种方法对其进行处理

**使用 `basename` 命令**

```sh
$(basename $PWD)

# 在终端中输出
echo $(basename $PWD)
```

**使用字符串操作**

```sh
${PWD##*/}

# 在终端中输出
echo ${PWD##*/}
```

### 2. 获取当前分支名

**使用 `zsh` 内置方法**

```sh
echo $(git_current_branch)
```

**使用 `git` 命令**

```sh
git branch --show-current
```

> 只介绍最新的命令，需要兼容老版本可以看这里 [获取当前 git 分支](/daily-notes/issue-11)

### 3. 复制到剪切板

复制到剪贴板的命令

- `pbcopy`: macOS 系统
- `clip`: Windows 系统

再配合 `echo` 与管道操作符 `|` 即可食用

```sh
echo "茂 茂" | pbcopy
```

再结合刚刚的知识点，实现复制项目信息到剪切板

```sh
echo "项目名: $(basename $PWD)\n分支名: $(git_current_branch)" | pbcopy
```

### 4. 简化使用命令

为了方便使用，可以在 `shell` 配置文件中配置别名或定义方法

打开 `~/.zshrc` 配置文件

**配置别名**

```sh
alias c="echo -n \"项目名: ${PWD##*/}\n分支名: $(git_current_branch)\" | pbcopy"
```

**定义方法**

```sh
c() {
  echo -n "项目名: ${PWD##*/}\n分支名: $(git_current_branch)" | pbcopy
}
```

## 完整版本

经历后面一段时间的学习和打磨后，最终版本如下:

- 判断是否存在 `.git` 目录
- 输出相应操作提示
- 将字符串操作改为 `basename` 命令（编辑器高亮显示有问题，看着难受）

```sh
# 复制当前信息（项目名和分支名）方便提测
c() {
  if [[ -d .git ]]; then
    local data="项目名: $(basename $PWD)\n分支名: $(git_current_branch)"

    if echo -n $data | pbcopy; then
      echo -e "$data\n\033[32m复制成功\033[0m"
    else
      echo -e "$data\n\033[33m复制失败，请检查 pbcopy 是否可用\033[0m"
    fi

  else
    echo "\033[33m当前目录不存在 .git 配置\033[0m"
  fi
}
```

> 使用效果

使用效果

如果只关心将项目名和分支名复制到剪贴板，可直接使用[配置别名版本](#4-简化使用命令)
