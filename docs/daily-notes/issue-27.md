# 常用搜索技巧

## 搜索引擎常用技巧

- `""`(双引号): 精确搜索

  - 搜索结果中必须包含关键字且顺序一致
    - `"react学习指南"`: 搜索 react 学习指南

- `-`(减号): 排除搜索

  - 搜索结果中排除减号后面的关键词，可以设置多个排除关键词
    - `react学习指南 -csdn` 搜索 react 学习指南并过滤掉带 csdn 的结果

- `*`(星号): 模糊搜索

  - 用星号代替某个字来进行搜索
    - `搜*技巧` 搜索结果中带有 搜\*技巧的网页

- `OR`(或): 组合搜索

  - 在各个关键词之间加上 `OR` 进行多个关键词搜索
    - `vue OR react` 搜索结果带有 vue 或者 react

- `..`(两个点): 数字范围搜索

  - 在某个数字范围内执行搜索
    - `手机2000..3000` 搜索 2000 - 3000 的手机

- `site`: 指定站点搜索

  - 在指定的网址对关键词进行搜索
    - `github.com 前端学习资料` 在 github 上搜索前端学习资料

- `filetype`: 文件类型搜索

  - 对关键词进行指定文件类型的资源搜索
    - `filetype:pdf JavaScript` 搜索 JavaScript 的 pdf 文件

- `inurl`: 页面 `url` 搜索

  - 在页面网址(url)对关键词进行搜索
    - `inurl:javascript` 搜索页面网址带有 javascript 的网页

- `intitle`: 页面 `title` 搜索

  - 在页面标题(title)中对关键词进行搜索
    - `intitle:react学习指南` 搜索页面标题带有 react 学习指南的网页

- `intext`: 页面内容搜索

  - 在页面正文对关键词进行搜索
    - `intext:JavaScript` 搜索页面正文带有 JavaScript 的网页

### Google 搜索帮助

- [优化网页搜索结果](https://support.google.com/websearch/answer/2466433)
- [在 Google 上进行高级搜索](https://support.google.com/websearch/answer/35890)

  - [高级搜索](https://www.google.com/advanced_search)
  - [高级图片搜索](https://www.google.com/advanced_image_search)
  - [高级视频搜索](https://www.google.com/advanced_video_search)
  - [高级图书搜索](https://books.google.com/advanced_book_search)

## Github 常用技巧

常用 [Github](https://github.com/) 搜索技巧

- `""`(双引号): 精确搜索

  - `"react-admin"`
    - 搜索结果中必须包含 react-admin

- `in`: 限制搜索的范围

  - `in:name` [关键词]
    - 范围为仓库名称
  - `in:description` [关键词]
    - 范围为仓库描述
  - `in:readme` [关键词]
    - 范围为 readme

- `stars / forks`: 限制搜索的 `star` 或 `fork` 数

  - `stars:>100`
    - `star` 数大于 100
  - `stars:>=100`
    - star 数大于等于 100
  - `stars:<100`
    - `star` 数小于 100
  - `stars:<=100`
    - `star` 数小于等于 100
  - `stars:100..200`
    - `star` 数在 100 到 200 之间（闭区间）

- `language`: 限制搜索的语言

  - `language:html`

- `created / pushed`: 限制搜索的日期范围

  - `created:>2020-01-01`
    - 创建日期大于 2020-01-01
  - `pushed:>2020-01-01`
    - 更新日期大于 2020-01-01

### Github 搜索帮助

- [GitHub 搜索文档](https://docs.github.com/cn/search-github)
- [Github 高级搜索界面](https://github.com/search/advanced)
