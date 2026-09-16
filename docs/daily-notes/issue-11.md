# 获取当前 `git` 分支

## 命令

> git 2.22 版本之后

```sh
git branch --show-current
```

> git 2.22 版本之前

```sh
# 使用 rev-parse
git rev-parse --abbrev-ref HEAD

# 使用 symbolic-ref
git symbolic-ref --short -q HEAD
```

如果当前处于一个提交（commit）而不是分支上时会有以下区别

- 使用 `rev-parse` 子命令时会返回 `HEAD`
- 使用 `symbolic-ref` 子命令时会返回错误（空字符串）

[symbolic-ref 和 rev-parse 的区别](https://stackoverflow.com/questions/45028134/whats-the-difference-between-the-output-from-rev-parse-and-symbolic-ref)

## 在 `node` 中使用

### `execa`

```js
const execa = require('execa')
const branchName = execa.commandSync('git rev-parse --abbrev-ref HEAD').stdout
```

### `shelljs`

```js
const shell = require('shelljs')
const branchName = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim()
```

### `child_process`

```js
const child_process = require('child_process')
const branchName = child_process
  .execSync('git rev-parse --abbrev-ref HEAD', {
    encoding: 'utf8',
  })
  .trim()
```

## 用途

可以根据分支名在 `webpack` 编译时做处理（如: 线上环境打包只允许在 `master` 分支）
