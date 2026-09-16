import type { DefaultTheme } from 'vitepress'
import fs from 'fs-extra'

const sidebarDailyNotes: DefaultTheme.SidebarItem[] =
  fs.readJSONSync('./scripts/daily-notes.json', { throws: false }) || []

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/arm-linux-fpga/': [
    {
      text: 'ARM',
      collapsed: false,
      items: [
        { text: '方向总览', link: '/arm-linux-fpga/' },
        { text: 'ARM 平台与开发板', link: '/arm-linux-fpga/arm-linux' },
      ],
    },
    {
      text: 'Linux',
      collapsed: false,
      items: [
        { text: 'Linux 系统实践', link: '/arm-linux-fpga/linux' },
        { text: '嵌入式调试与 DMA', link: '/arm-linux-fpga/embedded-debug' },
      ],
    },
    {
      text: 'FPGA',
      collapsed: false,
      items: [{ text: 'FPGA 工程方向', link: '/arm-linux-fpga/fpga' }],
    },
  ],
  '/fe/': [
    {
      text: 'JavaScript 基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types' },
        { text: '引用类型的拷贝', link: '/fe/javascript/clone' },
        { text: '类型转换', link: '/fe/javascript/conversions' },
        { text: '原型和原型链', link: '/fe/javascript/prototype' },
        { text: '继承', link: '/fe/javascript/inherit' },
      ],
    },
    {
      text: 'ES6 常用知识点',
      link: '/fe/es6/',
    },
    {
      text: 'TypeScript',
      collapsed: false,
      items: [
        { text: '基础知识', link: '/fe/typescript/base' },
        { text: '编译配置', link: '/fe/typescript/tsconfig' },
        { text: '类型体操', link: '/fe/typescript/challenges' },
      ],
      link: '/fe/typescript/base',
    },
    {
      text: 'HTML / CSS',
      collapsed: false,
      items: [
        { text: 'HTML 理论知识点', link: '/fe/html/' },
        { text: 'CSS 理论知识点', link: '/fe/css/' },
      ],
    },
    { text: ' Webpack', link: '/fe/webpack/' },
    {
      text: '浏览器与网络',
      collapsed: false,
      items: [
        { text: '浏览器相关知识点', link: '/fe/browser/' },
        { text: 'TCP', link: '/fe/network/tcp' },
        { text: 'HTTP', link: '/fe/network/http' },
      ],
    },
    {
      text: 'Node',
      collapsed: false,
      items: [{ text: 'package.json', link: '/fe/node/pkg' }],
    },
    {
      text: '概念知识点',
      collapsed: false,
      items: [
        { text: '模块化', link: '/fe/concept/module' },
        { text: '前端页面渲染方式', link: '/fe/concept/page-rendering' },
      ],
    },
    {
      text: '编程题',
      link: '/fe/coding/',
    },
  ],
  '/analysis/': [
    {
      text: '嵌入式源码阅读',
      items: [
        { text: '源码阅读方法总览', link: '/analysis/' },
        { text: 'ARM 启动链源码', link: '/analysis/arm-boot' },
        { text: 'Linux 内核源码阅读', link: '/analysis/linux-kernel' },
        { text: '设备树与驱动源码', link: '/analysis/device-driver' },
        { text: 'DMA 与中断源码', link: '/analysis/dma-interrupt' },
        { text: 'FPGA / RTL 源码阅读', link: '/analysis/fpga-rtl' },
      ],
    },
  ],
  '/workflow/': [
    {
      text: 'Workflow',
      link: '/workflow/',
    },
    {
      text: '语言与方法',
      collapsed: false,
      items: [
        { text: 'C / C++ 编程规范', link: '/workflow/c-cpp-style' },
        { text: 'C / C++ 语法', link: '/workflow/c-cpp-syntax' },
        { text: 'Python 语法', link: '/workflow/python' },
        { text: '嵌入式开发技巧', link: '/workflow/embedded-tips' },
      ],
    },
    {
      text: '系统原理与底层代码',
      collapsed: false,
      items: [
        { text: '设备树基础知识', link: '/workflow/device-tree-basics' },
        { text: '内核启动流程', link: '/workflow/kernel-boot' },
        { text: '常用驱动代码', link: '/workflow/driver-snippets' },
      ],
    },
    {
      text: 'GD32 芯片资源',
      collapsed: false,
      items: [
        { text: 'GD32F103', link: '/workflow/gd32f103' },
        { text: 'GD32F407', link: '/workflow/gd32f407' },
        { text: 'GD32H759', link: '/workflow/gd32h759' },
      ],
    },
    {
      text: '工具与命令行',
      collapsed: false,
      items: [
        { text: '常用工具整理', link: '/workflow/tools' },
        { text: 'zsh 配置', link: '/workflow/zsh' },
        { text: '命令行工具', link: '/workflow/cli-tools' },
      ],
    },
  ],
  '/efficiency/': [
    {
      text: '软件推荐与配置',
      // collapsed: false,
      items: [
        { text: '多平台软件', link: '/efficiency/software/cross-platform' },
        { text: 'Mac 平台', link: '/efficiency/software/mac' },
        { text: 'Windows 平台', link: '/efficiency/software/windows' },
        { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
        { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
        { text: 'PyCharm 配置', link: '/efficiency/software/pycharm' },
        { text: 'EIDE 配置', link: '/efficiency/software/eide' },
      ],
    },
    { text: '在线工具', link: '/efficiency/online-tools' },
    { text: '书签脚本', link: '/efficiency/bookmark-scripts' },
  ],
  '/pit/': [
    {
      text: '踩坑记录',
      collapsed: false,
      items: [
        { text: '根文件系统同步', link: '/pit/rootfs' },
        { text: 'OpenSSH / OpenSSL 升级', link: '/pit/openssh' },
        { text: 'SSH 白名单防火墙', link: '/pit/firewall' },
        { text: 'DMA 乒乓缓冲', link: '/pit/dma' },
        { text: 'μC/OS 任务栈', link: '/pit/ucos' },
        { text: '系统误操作恢复', link: '/pit/recovery' },
      ],
    },
  ],
  '/daily-notes': sidebarDailyNotes,
}
