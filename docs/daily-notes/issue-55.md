# 预览 Office 文档方案对比

最近搭建了一个知识库服务，需要对用户上传的文件进行预览，支持的文件类型包括：

- `Office` 文件
  - `Word` 文件：`doc`、`docx`
  - `Excel` 文件：`xls`、`xlsx`
  - `PPT` 文件：`ppt`、`pptx`
  - `PDF` 文件
- 图片文件：`jpg`、`jpeg`、`png`、`gif`、`bmp`、`tiff`
- 其他文件（需展示文件内容）：`txt`、`md`、`csv`、`json`、`xml`、`html`

经过调研，大致有以下几种解决方案

- `Office` 文件（这是最为头疼的）
  - 纯前端解析展示
    - 使用 [docx-preview](https://github.com/VolodymyrBaydalka/docxjs) 处理 docx 文件
    - 使用 [exceljs](https://github.com/exceljs/exceljs) 处理 Excel 文件
    - 使用 [pdf.js](https://github.com/mozilla/pdf.js) 处理 PDF 文件
  - 使用第三方提供的预览服务
  - 搭建专门的预览服务
- 图片文件: 直接使用 `img` 标签展示
- 其他文件: 使用微软开源的 [monaco-editor](https://github.com/microsoft/monaco-editor) 展示

## 纯前端解析展示

纯前端方案不能支持 `.doc` 文件预览，因为该格式是微软早期的专有二进制格式，内部结构复杂且没有公开标准。由于其二进制和封闭的特性，目前没有成熟的纯 JavaScript 库能解析和渲染这种格式

当前端需要支持 `.doc` 文件预览时，解决方案通常是将 `.doc` 文件先转换为 `.docx` 或 `PDF`，再利用现有的前端预览方案进行展示

### vue-office

支持多种文件(docx、excel、pdf、pptx) 预览的 vue 组件库，支持 vue2/3 和非 Vue 框架的预览

[vue-office | GitHub](https://github.com/501351981/vue-office)

## 使用第三方提供的预览服务

- 文件必须放在公网可访问的地址，否则无法预览
- 可以嵌套在 iframe 中使用

### 微软 Office Web Viewer

> 免费

```sh
https://view.officeapps.live.com/op/view.aspx?src=文件地址
```

> 举个 🌰

<https://view.officeapps.live.com/op/view.aspx?src=https://github.com/Nikol-cc>

### Google Drive 查看器

> 免费

```sh
https://drive.google.com/viewer?url=文件地址
```

> 举个 🌰

<https://drive.google.com/viewer?url=https://github.com/Nikol-cc>

### WPS WebOffice

> 收费

[WPS WebOffice 即在线文档预览编辑服务](https://solution.wps.cn/docs/start/summary.html)，可为接入方提供专业的文档在线预览编辑、格式转换、OCR 识别等能力，全平台格式兼容，API 调用简单快捷，支持多人协作，高可用、高并发，助力您的应用或业务系统更强大

## 搭建专门的预览服务

- [onlyoffice](https://github.com/ONLYOFFICE) 一个免费且开源的办公套件，用于在网页、桌面和移动平台上创建、编辑和协作处理文本文档、电子表格、演示文稿、PDF 表单和常规 PDF 文件
- [微软 Office Online Server](https://learn.microsoft.com/zh-cn/officeonlineserver/office-online-server) 私有化部署，效果等同于微软 Office Web Viewer
- [kkFileView](https://github.com/kekingcn/kkFileView) 使用 spring boot 搭建的文件在线预览项目，支持文本、图片、Office 文档、WPS 文档、PDF、视频、音频、压缩包等常见文件类型预览（发行版安装包收费，界面比较古老）

## 方案对比及建议

| 场景类型                     | 推荐方案                              | 选择理由                                   |
| ---------------------------- | ------------------------------------- | ------------------------------------------ |
| 小型项目或验证性项目         | 纯前端方案                            | 成本低，实现简单，无需额外服务器           |
| 企业内部应用(需要编辑与协作) | ONLYOFFICE                            | 数据不出内网，安全性高，功能完整           |
| 企业内部应用(仅预览)         | Office Online Server 或 kkFileView    | 最佳兼容性和用户体验，适合重度 Office 用户 |
| 面向公网的应用               | 微软/Google 第三方服务 + 前端预览组合 | 简单文件用前端渲染，复杂文件用第三方服务   |
| 对实时协作有需求             | WPS WebOffice 或 ONLYOFFICE           | 支持多人协作编辑功能                       |

### 选型决策要点

选择合适的文件预览方案需考虑以下因素：

- 业务场景和具体需求（只读预览还是需要编辑）
- 数据安全等级要求
- 可用预算
- 技术团队能力和维护成本
- 用户体验要求

建议在正式选型前，对各方案进行小规模测试，评估实际效果和性能表现
