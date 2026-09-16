# .npmrc 学习笔记

`.npmrc` 是 `npm` 配置文件，可以通过修改配置项对 `npm` 做配置

> 🌰: 修改镜像源

```sh
registry=https://registry.npmmirror.com
```

```sh
# 查看所有配置
npm config ls [-l|--json]

# 查看配置
npm config get <key>
#OR
npm get <key>

# 查看配置
npm config delete <key>

# 修改配置
npm config set <key> <value>
#OR
npm set <key> <value>

# 编辑配置文件
npm config edit [-g|--global]
```

[配置说明](https://docs.npmjs.com/cli/v8/using-npm/config#config-settings)

## 配置读取顺序

1. 命令行
2. 项目配置(项目根目录下的 `npmrc` 文件)
3. 用户配置(用 `npm config get userconfig` 查看文件位置)
4. 全局配置(用 `npm config get prefix` 查看文件位置)
5. 默认配置

## 其他包管理器

### yarn

- [yarn 1](https://github.com/yarnpkg/yarn) 使用 `.yarnrc` 和 `.npmrc` 文件
- [yarn 2](https://github.com/yarnpkg/berry) 使用 `.yarnrc.yml` 文件(不再使用 `.yarnrc` 和 `.npmrc`)
  - [相关说明](https://yarnpkg.com/getting-started/migration#dont-use-npmrc-files)

#### 踩坑点

在 `yarn 1` 中如果同时存在 `.yarnrc` 和 `.npmrc` 文件时， `.npmrc` 优先级高于 `.yarnrc`
当我们使用 `yarn 1` 时项目只需要配置 `.npmrc` 文件

- 相关 issues
  - [#3683](https://github.com/yarnpkg/yarn/issues/3683)
  - [#2672](https://github.com/yarnpkg/yarn/issues/2672)

### pnpm

[pnpm](https://pnpm.io/zh/) 使用 `.npmrc` 文件
