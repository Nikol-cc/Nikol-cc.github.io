# ShadowSocks PAC 用户自定规则

> 代理自动配置（Proxy auto-config 简称 PAC）是一种网页浏览器技术，用于定义如何自动选择适当的代理服务器来访问一个网址

ShadowSocks 默认使用的 [GFWList](https://github.com/gfwlist/gfwlist) 规则，当 [GFWList](https://github.com/gfwlist/gfwlist) 规则无法满足我们的要求时，就需要用到 PAC 用户自定规则

## PAC 规则语法说明

在书写 PAC 用户自定规则前，我们需要先了解其规则语法，ShadowSocks 使用的是 Adblock Plus 的规则引擎

[Adblock Plus filters 规则文档](https://adblockplus.org/en/filter-cheatsheet)

### 大概规则如下

#### 代理相关标识符

- `@@` 标识符（设置不使用代理的规则）
  - 🌰 `@@*.example.com/*` 满足 `@@` 后规则的地址不使用代理

#### 地址匹配相关规则

- 通配符 `*`
  - `*.example.com/*` 在实际使用时可省略 `*`，比如 `*.example.com/*` 可以写成 `.example.com/`
- 正则表达式：以 `\` 开始和结束
  - 🌰 `\[\w]+:\/\/example.com\`
- 匹配地址开始和结尾 `|`
  - 🌰 `|http://example.com example.com|` 分别表示以 `http://example.com` 开始和以 `example.com` 结束的地址
- 开头标识符 `||`
  - 🌰 `||example.com` 则 `http://example.com`、`https://example.com`、`ftp://example.com` 等地址均满足条件，只用于匹配地址开头
- 分隔符 `^` 表示除了字母、数字或者 `_ - . %` 之外的任何字符。
  - 🌰 `http://example.com^` 表示 `http://example.com/` 和 `http://example.com:8000/` 均满足条件，而`http://example.com.ar/` 不满足条件

#### 其他

- 注释 `!`
  - 🌰 `! 这是一条注释`

## 常用 PAC 规则

> 个人常用

```sh
! Put user rules line by line in this file.
! See https://adblockplus.org/en/filter-cheatsheet

! Github 相关
||github.com

! vercel 相关
||vercel.app
||.vercel.app

! openai 相关
||openai.com
||.openai.com

! npmtrends 相关
||npmtrends.com
||npm-trends-proxy.uidotdev.workers.dev
```

### 注意点

- **修改 PAC 用户自定规则后需要重启客户端才能生效**
- **修改 PAC 用户自定规则后需要重启客户端才能生效**
- **修改 PAC 用户自定规则后需要重启客户端才能生效**
