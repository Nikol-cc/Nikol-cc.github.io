---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: Nikol's Lab
  text: Nikol 的工程成长之路
  tagline: 记录嵌入式、Linux 与系统实践，争取每天都有新的理解
  image:
    src: /logo.png
    alt: Nikol's Lab
  actions:
    - text: 嵌入式物语
      link: /arm-linux-fpga/
    - text: 嵌入式导航
      link: /nav
      theme: alt
    - text: 日常笔记
      link: /daily-notes/
    - text: GitHub
      link: https://github.com/Nikol-cc
      theme: alt
features:
  - icon: 📖
    title: 嵌入式物语
    details: 分别记录 ARM 平台、Linux 系统与 FPGA 数据通路实践<br />把板级调试和软硬件协同问题沉淀下来
    link: /arm-linux-fpga/
    linkText: 进入嵌入式物语
  - icon: 📘
    title: 嵌入式源码
    details: 从启动链、设备树到驱动与 DMA<br />按调用路径理解软硬件如何协同工作
    link: /analysis/
    linkText: 进入嵌入式源码
  - icon: 💡
    title: Workflow
    details: 从开发板、交叉编译到系统调试<br />把每一次板级实践沉淀成可复用的方法
    link: /workflow/
    linkText: 进入 Workflow
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: /efficiency/online-tools
    linkText: 提效工具
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: /pit/
    linkText: 踩坑记录
  - icon: 💯
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">一个持续折腾系统的工程师</small>'
    link: /mao
---

<script setup>
import MFriends from './home/MFriends.vue'
</script>

<ClientOnly>
  <MFriends/>
</ClientOnly>

::: details 申请友链

**友链要求**:

- 网站应保持清洁，避免过多广告内容
- 网站需要有良好的稳定性和可靠性

**申请方式**:

1. 在本页面留言
2. 直接访问 [Nikol-cc GitHub 主页](https://github.com/Nikol-cc) 联系我

**本站信息**：

- 网站名称: **Nikol's Lab**
- 网站描述: **Nikol 的工程知识库，记录嵌入式开发、Linux 系统、网络安全与调试实践**
- 网站地址：**<https://nikol.bbs0.cc>**
- 网站图标：**<https://nikol.bbs0.cc/logo.png>**

```json
{
  "title": "Nikol's Lab",
  "desc": "Nikol 的工程知识库，记录嵌入式开发、Linux 系统、网络安全与调试实践",
  "link": "https://nikol.bbs0.cc",
  "icon": "https://nikol.bbs0.cc/logo.png"
}
```

:::

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .image-src {
  border-radius: 50%;
  object-fit: cover;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
