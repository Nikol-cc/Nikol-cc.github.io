import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  {
    text: '嵌入式物语',
    items: [
      {
        text: 'ARM',
        items: [{ text: 'ARM 平台与开发板', link: '/arm-linux-fpga/arm-linux' }],
      },
      {
        text: 'Linux',
        items: [
          { text: 'Linux 系统实践', link: '/arm-linux-fpga/linux' },
          { text: '嵌入式调试与 DMA', link: '/arm-linux-fpga/embedded-debug' },
        ],
      },
      {
        text: 'FPGA',
        items: [{ text: 'FPGA 工程方向', link: '/arm-linux-fpga/fpga' }],
      },
    ],
    activeMatch: '^/arm-linux-fpga',
  },
  { text: '嵌入式源码', link: '/analysis/', activeMatch: '^/analysis' },
  {
    text: 'Workflow',
    items: [
      { text: '工作流总览', link: '/workflow/' },
      {
        text: '语言与方法',
        items: [
          { text: 'C / C++ 编程规范', link: '/workflow/c-cpp-style' },
          { text: 'C / C++ 语法', link: '/workflow/c-cpp-syntax' },
          { text: 'Python 语法', link: '/workflow/python' },
          { text: '嵌入式开发技巧', link: '/workflow/embedded-tips' },
        ],
      },
      { text: '设备树基础知识', link: '/workflow/device-tree-basics' },
      { text: '内核启动流程', link: '/workflow/kernel-boot' },
      { text: '常用驱动代码', link: '/workflow/driver-snippets' },
      {
        text: 'GD32 芯片资源',
        items: [
          { text: 'GD32F103', link: '/workflow/gd32f103' },
          { text: 'GD32F407', link: '/workflow/gd32f407' },
          { text: 'GD32H759', link: '/workflow/gd32h759' },
        ],
      },
      { text: '常用工具整理', link: '/workflow/tools' },
      { text: 'zsh 配置', link: '/workflow/zsh' },
      { text: '命令行工具', link: '/workflow/cli-tools' },
    ],
    activeMatch: '^/workflow',
  },
  {
    text: '笔记',
    items: [
      { text: '日常笔记', link: '/daily-notes/', activeMatch: '^/daily-notes' },
      {
        text: '踩坑记录',
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
    activeMatch: '^/daily-notes|pit',
  },
  {
    text: '提效工具',
    items: [
      {
        text: '软件推荐与配置',
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
    activeMatch: '^/efficiency',
  },
  {
    text: "Nikol's Lab",
    link: '/mao',
  },
]
