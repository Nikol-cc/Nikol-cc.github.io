import type { NavData } from '../.vitepress/theme/types'

export const NAV_DATA: NavData[] = [
  {
    title: '常用工具',
    items: [
      {
        icon: 'https://sourceware.org/gdb/images/archer.svg',
        title: 'GNU GDB',
        desc: 'Linux、ARM 与嵌入式系统的源码级调试器',
        link: 'https://sourceware.org/gdb/',
      },
      {
        icon: 'https://openocd.org/wp-content/uploads/2023/04/openocd-logo.svg',
        title: 'OpenOCD',
        desc: '通过 JTAG/SWD 连接调试器和目标芯片',
        link: 'https://openocd.org/',
      },
      {
        icon: 'https://sigrok.org/favicon.ico',
        title: 'PulseView',
        desc: '逻辑分析仪与示波器数据查看工具',
        link: 'https://sigrok.org/wiki/PulseView',
      },
      {
        icon: 'https://www.wireshark.org/assets/icons/wireshark-fin.png',
        title: 'Wireshark',
        desc: '网络、串口网关和嵌入式通信抓包分析',
        link: 'https://www.wireshark.org/',
      },
      {
        icon: 'https://godbolt.org/favicon.ico',
        title: 'Compiler Explorer',
        desc: '查看 C/C++ 编译结果与 ARM 汇编代码',
        link: 'https://godbolt.org/',
      },
      {
        icon: 'https://qemu.org/favicon.ico',
        title: 'QEMU',
        desc: 'ARM Linux 系统和驱动开发中的虚拟化与仿真工具',
        link: 'https://www.qemu.org/',
      },
    ],
  },
  {
    title: 'ARM Linux',
    items: [
      {
        icon: 'https://developer.arm.com/favicon.ico',
        title: 'Arm Developer',
        desc: 'Arm 架构、工具链和软件生态官方资料',
        link: 'https://developer.arm.com/',
      },
      {
        icon: 'https://docs.kernel.org/favicon.ico',
        title: 'Linux Kernel Documentation',
        desc: 'Linux 内核、驱动和设备模型官方文档',
        link: 'https://docs.kernel.org/',
      },
      {
        icon: 'https://docs.u-boot.org/en/latest/_static/u-boot.svg',
        title: 'U-Boot Documentation',
        desc: '嵌入式启动流程、环境变量和板级移植文档',
        link: 'https://docs.u-boot.org/en/latest/',
      },
      {
        icon: 'https://buildroot.org/images/logo.png',
        title: 'Buildroot',
        desc: '快速构建嵌入式 Linux 根文件系统',
        link: 'https://buildroot.org/',
      },
      {
        icon: 'https://www.yoctoproject.org/wp-content/uploads/2023/09/cropped-cropped-yocto-icon-192x192.png',
        title: 'Yocto Project',
        desc: '面向产品级嵌入式 Linux 的发行版构建框架',
        link: 'https://www.yoctoproject.org/',
      },
      {
        icon: 'https://www.devicetree.org/wp-content/uploads/2017/02/favicon.png',
        title: 'Devicetree Specification',
        desc: '设备树语法、节点和硬件资源描述规范',
        link: 'https://www.devicetree.org/specifications/',
      },
      {
        icon: 'https://busybox.net/images/favicon.ico',
        title: 'BusyBox',
        desc: '嵌入式 Linux 常用命令和系统工具集合',
        link: 'https://busybox.net/',
      },
      {
        icon: 'https://openwrt.org/lib/tpl/openwrt/images/favicon.ico',
        title: 'OpenWrt',
        desc: '路由器和网络设备上的 Linux 发行版',
        link: 'https://openwrt.org/',
      },
    ],
  },
  {
    title: 'FPGA',
    items: [
      {
        icon: 'https://docs.amd.com/favicon.ico',
        title: 'AMD FPGA Documentation',
        desc: 'Vivado、Zynq 与 AMD FPGA 官方技术文档',
        link: 'https://docs.amd.com/',
      },
      {
        icon: 'https://www.intel.com/content/dam/www/public/favicon.ico',
        title: 'Intel FPGA',
        desc: 'Intel FPGA 器件、工具链和设计资源',
        link: 'https://www.intel.com/content/www/us/en/products/details/fpga.html',
      },
      {
        icon: 'https://yosyshq.net/images/yosys_logo.svg',
        title: 'YosysHQ',
        desc: '开源 Verilog 综合、实现和 FPGA 工具链',
        link: 'https://yosyshq.net/yosys/',
      },
      {
        icon: 'https://github.githubassets.com/favicons/favicon.svg',
        title: 'nextpnr',
        desc: '面向多种 FPGA 架构的开源布局布线工具',
        link: 'https://github.com/YosysHQ/nextpnr',
      },
      {
        icon: 'https://projectf.io/favicon.ico',
        title: 'Project F',
        desc: '从 Verilog 到 FPGA 图形、视频和数字逻辑的教程',
        link: 'https://projectf.io/',
      },
      {
        icon: 'https://github.githubassets.com/favicons/favicon.svg',
        title: 'LiteX',
        desc: '用于构建 FPGA SoC 和软硬件系统的开源框架',
        link: 'https://github.com/enjoy-digital/litex',
      },
    ],
  },
  {
    title: 'MCU / RTOS',
    items: [
      {
        icon: 'https://www.freertos.org/favicon.ico',
        title: 'FreeRTOS',
        desc: '面向微控制器和小型嵌入式系统的实时操作系统',
        link: 'https://www.freertos.org/',
      },
      {
        icon: 'https://www.zephyrproject.org/wp-content/uploads/2023/09/cropped-zephyr-icon-192x192.png',
        title: 'Zephyr Project',
        desc: '可扩展的开源实时操作系统和设备框架',
        link: 'https://www.zephyrproject.org/',
      },
      {
        icon: 'https://arm-software.github.io/CMSIS_5/General/html/favicon.ico',
        title: 'CMSIS',
        desc: 'Arm Cortex-M 微控制器软件接口和工具规范',
        link: 'https://arm-software.github.io/CMSIS_5/General/html/index.html',
      },
      {
        icon: 'https://www.segger.com/favicon.ico',
        title: 'SEGGER J-Link',
        desc: 'JTAG/SWD 调试、下载和 RTT 日志工具',
        link: 'https://www.segger.com/products/debug-probes/j-link/',
      },
      {
        icon: 'https://www.gigadevice.com/favicon.ico',
        title: 'GigaDevice',
        desc: 'GD32 系列 MCU 和嵌入式器件资料',
        link: 'https://www.gigadevice.com/',
      },
    ],
  },
  {
    title: '嵌入式学习资料',
    items: [
      {
        icon: 'https://kernelnewbies.org/favicon.ico',
        title: 'KernelNewbies',
        desc: 'Linux 内核入门、版本变化和开发资料',
        link: 'https://kernelnewbies.org/',
      },
      {
        icon: 'https://www.linaro.org/favicon.ico',
        title: 'Linaro',
        desc: 'Arm Linux、开源工具链和嵌入式软件协作组织',
        link: 'https://www.linaro.org/',
      },
      {
        icon: 'https://docs.docker.com/favicon.ico',
        title: 'Docker Documentation',
        desc: '构建 ARM 镜像和部署嵌入式开发环境',
        link: 'https://docs.docker.com/',
      },
      {
        icon: 'https://git-scm.com/favicon.ico',
        title: 'Git',
        desc: '管理驱动、系统镜像、FPGA 工程和硬件版本',
        link: 'https://git-scm.com/doc',
      },
    ],
  },
  {
    title: '高质量周刊与博客',
    items: [
      {
        icon: 'https://interrupt.memfault.com/favicon.ico',
        title: 'Memfault Interrupt',
        desc: '嵌入式软件、固件调试、可观测性与工程实践',
        link: 'https://interrupt.memfault.com/blog/',
      },
      {
        icon: 'https://bootlin.com/favicon.ico',
        title: 'Bootlin Blog',
        desc: '嵌入式 Linux、内核、驱动与工具链实践',
        link: 'https://bootlin.com/blog/',
      },
      {
        icon: 'https://www.zephyrproject.org/favicon.ico',
        title: 'Zephyr Project Blog',
        desc: 'RTOS、MCU 与物联网系统的工程动态',
        link: 'https://www.zephyrproject.org/blog/',
      },
      {
        icon: 'https://embeddedartistry.com/favicon.ico',
        title: 'Embedded Artistry',
        desc: '嵌入式软件架构、C/C++、测试与工程方法',
        link: 'https://embeddedartistry.com/blog/',
      },
      {
        icon: 'https://www.embedded.com/favicon.ico',
        title: 'Embedded.com',
        desc: '嵌入式系统设计、开发与行业技术文章',
        link: 'https://www.embedded.com/',
      },
      {
        icon: 'https://lwn.net/favicon.png',
        title: 'LWN.net',
        desc: 'Linux 内核、驱动和底层系统的高质量资讯',
        link: 'https://lwn.net/',
      },
    ],
  },
  {
    title: 'AI 导航',
    items: [
      {
        badge: '对话',
        icon: '/icons/chatgpt.png',
        title: 'ChatGPT',
        desc: '用于代码分析、日志整理和技术方案梳理',
        link: 'https://chatgpt.com/',
      },
      {
        badge: '对话',
        icon: 'https://claude.ai/favicon.ico',
        title: 'Claude',
        desc: '适合长文档理解、代码审阅和复杂问题分析',
        link: 'https://claude.ai/',
      },
      {
        badge: '对话',
        icon: 'https://www.doubao.com/favicon.ico',
        title: '豆包',
        desc: '中文问答、资料整理、写作和日常开发辅助',
        link: 'https://www.doubao.com/',
      },
      {
        badge: '对话',
        icon: 'https://www.kimi.com/favicon.ico',
        title: 'Kimi',
        desc: '长文本阅读、资料总结和技术信息整理',
        link: 'https://www.kimi.com/',
      },
      {
        badge: '对话',
        icon: 'https://chat.deepseek.com/favicon.ico',
        title: 'DeepSeek',
        desc: '代码生成、调试思路和技术问题分析',
        link: 'https://chat.deepseek.com/',
      },
    ],
  },
  {
    title: "Nikol's Lab",
    items: [
      {
        icon: '/logo.png',
        title: '嵌入式物语',
        desc: '记录 RK3568、ARM Linux、FPGA 和嵌入式调试实践',
        link: 'https://nikol.bbs0.cc/arm-linux-fpga/',
      },
      {
        icon: '/logo.png',
        title: "Nikol's Lab",
        desc: '个人工程知识库和项目记录',
        link: 'https://nikol.bbs0.cc/',
      },
    ],
  },
]
