# 语义化版本控制

## 语义化版本说明

- 标准版本号表示: X.Y.Z
  - X: 表示主版本号，在有任何不兼容的修改时递增
  - Y: 表示次版本号，在有向下兼容的新功能出现时递增
  - Z: 表示修订版本号，在只做了向下兼容的修正时才递增
- 先行版本号，在修订版本号使用连接号加上一连串以句点分隔的标识符来修饰。
  - 先行版本号则表示这个版本并非稳定而且可能无法满足预期的兼容性需求
  - 例子: 1.0.0-alpha 1.0.0-beta
- 版本号优先级
  - 主版本号、次版本号及修订版本号以数值比较
  - 当主版本号、次版本号及修订版本号都相同时

### 版本号优先级排序

1. 要将版本号拆分为主版本号、次版本号、修订版本号及先行版本号
2. 由左到右依序比较每个标识符(主版本号、次版本号及修订版本号直接以数值比较)
3. 当主版本号、次版本号及修订版本号都相同时，以先行版本号来判断
4. 先行版本号判断通过由左到右的每个被句点分隔的标识符来比较，直到找到一个差异值后决定：只有数字的标识符以数值高低比较，有字母或连接号时则逐字以 ASCII 的排序来比较

🌰 1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0

## 使用 standard-version

[standard-version](https://github.com/conventional-changelog/standard-version) 可以进行语义化版本发布和 CHANGELOG 生成

### 安装

```sh
npm install -g standard-version
# OR
npm install --save-dev standard-version
```

### 使用

在 `package.json` 的 `scripts` 配置 `"release": "standard-version"`

```sh
# 发布第一版
npm run release -- --first-release

# Pre-Release
npm run release -- --prerelease

# alpha / beta / rc
npm run release -- --prerelease alpha

# major minor patch
npm run release -- --release-as major

# 指定版本
npm run release -- --release-as x.y.z
```

### 相关资料

[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)
[语义版本控制程序 semver](https://github.com/npm/node-semver)
