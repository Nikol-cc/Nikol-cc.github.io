# Plop 实战笔记

[Plop](https://github.com/plopjs/plop) 是一个轻量级的项目搭建生成工具，提供了一种以一致的方式生成代码或任何其他类型的纯文本文件的简单方法

当我们在项目中引入时，可以通过定制对应的命令询问，可以帮助我们自动生成页面文件，添加对应的路由配置等

## 安装 Plop

```sh
npm install --save-dev plop
```

## 添加运行脚本命令

修改 `package.json` 文件

```diff
"scripts": {
+   "plop": "plop"
}
```

## 创建配置文件

在项目根目录创建 `plopfile.js` 文件

```js
module.exports = function (plop) {
  // 添加一个生成器(生成器名称和配置项)
  plop.setGenerator('basics', {
    // 生成器描述
    description: 'this is a skeleton plopfile',
    /**
     * 添加交互式问答
     * 文档: https://github.com/SBoudrias/Inquirer.js
     **/
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入组件名',
      },
      {
        type: 'confirm',
        name: 'style',
        message: '是否需要样式文件?',
        default: false,
      },
    ],
    // 需要执行的操作
    actions: [
      {
        // 添加一个全新的文件
        type: 'add',
        // 通过双花括号语法使用用户输入的答案
        path: 'src/{{name}}.js',
        templateFile: '/plop-templates/pages/index.hbs',
      },
      {
        // 修改一个文件
        type: 'modify',
        //
        /**
         * 通过双花括号语法使用用户输入的答案
         * 同时可以使用辅助函数对参数进行修饰
         * 例子：使用 {{pascalCase name}} 可以将 name 修饰为大写驼峰
         **/
        path: 'src/{{name}}.js',
        /**
         * 可以通过设置 pattern 匹配对应的特殊字符，在某个位置进行修改操作
         * 具体案例地址:
         * https://github.com/Nikol-cc
         * https://github.com/Nikol-cc
         **/
        pattern: /(\/\* plop add \*\/)/g,
        templateFile: '/plop-templates/pages/index.hbs',
        // 可以设置 data 传入额外参数供模板使用
        data: {},
      },
    ],
    // 高阶用法可以使用函数，返回一个 actions 数组
    actions(data) {
      const actions = []
      if (data.style) {
        actions.push({})
      }
      return actions
    },
  })
}
```

## 其他

Plop 的字符串转化函数底层([相关源码](https://github.com/plopjs/node-plop/blob/master/src/baked-in-helpers.js))使用了 [change-case](https://github.com/blakeembrey/change-case) 库

当我们在 JS 中需要使用时可以引入该库，与模板语法处理保持统一

[相关案例地址](https://github.com/Nikol-cc)

## 完整案例

<https://github.com/Nikol-cc>
