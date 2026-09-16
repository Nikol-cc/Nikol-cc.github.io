# 在 Github Actions 环境变量中传递数组或对象

大多数常见下我们只需要传递简单的字符串即可，但是当字段越来越多的时候或者一些特殊场景下，使用对象或数组更好

通过研究，我们可以通过配置 `json` 数据 + 环境变量输出到文件来实现数组或对象的传递

## 配置 `Secrets`

`Secrets` 中的 `Name` 和 `Value` 示例格式如下：

| Name      | Value       |
| --------- | ----------- |
| JSON_DATA | `json` 数据 |

> `json` 数据内容如下

```json
[
  {
    "name": "maomao"
  },
  {
    "name": "maomao1996"
  }
]
```

- 需要注意 `json` 格式。在填写之前建议使用 [json 校验工具](https://www.bejson.com/)进行校验。

## 在 `.github/workflows/print-env.yml` 配置文件中使用环境变量

```yml
name: Print Env

on:
  push:
    branches:
      - main

jobs:
  bot:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Run Script
        # 设置环境变量
        env:
          JSON_DATA: ${{ secrets.JSON_DATA }}
        # 先将环境变量内容输出到文件，然后执行脚本
        run: |
          echo "$JSON_DATA" > ./config.json
          npm run install && node index.js
```

[GitHub Actions 表达式语法](https://docs.github.com/cn/actions/learn-github-actions/expressions)

## 在 index.js 中引入 json 文件

```js
const config = require('./config.json')
```
