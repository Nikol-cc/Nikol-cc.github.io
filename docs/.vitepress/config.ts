import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import { La51Plugin } from 'vitepress-plugin-51la'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar, algolia } from './configs'

const APP_BASE_PATH = basename(process.env.APP_BASE_PATH || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  title: "Nikol's Lab",
  description: 'Nikol 的工程知识库，记录嵌入式开发、Linux 系统、网络安全与调试实践',
  head,

  lastUpdated: true,
  cleanUrls: process.env.DEPLOY_TARGET !== 'github',
  ignoreDeadLinks: 'localhostLinks',

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/logo.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Nikol-cc' }],

    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: "Copyright © 2026 Nikol's Lab",
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    /* Algolia DocSearch 配置 */
    algolia,

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'Nikol-cc.notes',
    },
  },

  /* 生成站点地图 */
  sitemap: {
    hostname: process.env.SITE_URL || 'https://nikol.bbs0.cc/',
  },

  vite: {
    plugins: [MarkdownPreview(), La51Plugin({ id: '3LNfUkScYzEz6k4D', ck: '3LNfUkScYzEz6k4D' })],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
})
