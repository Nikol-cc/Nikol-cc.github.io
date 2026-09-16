# Nikol's Lab 迁移与部署

源码来自 Sites 第 24 版（成功发布），提交 `68682a9d05cda605c487dd419d9f9b839ea640b6`。
目标仓库：<https://github.com/Nikol-cc/Nikol-cc.github.io>
迁移分支：`nikols-lab-migration`，基于原 main 提交 `453d690bf66febb58aa6d219ca5d969d33748fae`。
不要合并或覆盖 main；后续内容提交到迁移分支即可。

## 本地构建

- Node.js：20（`.node-version` / `.nvmrc`）
- pnpm：9.15.5（`package.json` 中已固定）
- 命令：`pnpm install --frozen-lockfile && pnpm run build:docs`
- 输出：仓库根目录 `dist`
- 预览：`pnpm run preview`

默认生成 Cloudflare Pages 使用的无扩展名链接。构建 GitHub Pages 时设置
`DEPLOY_TARGET=github`、`SITE_URL=https://nikol-cc.github.io`；工作流已自动设置。
用户主页仓库部署在域名根目录，因此 `APP_BASE_PATH` 保持为空。

## GitHub Pages

1. 将迁移分支推送到上述仓库：`git push -u origin nikols-lab-migration`。
2. 在 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 在 Settings → Environments → github-pages 中允许 `nikols-lab-migration` 部署。
   如果只允许默认分支，添加迁移分支；不要为此修改 main。
4. 推送将触发 `.github/workflows/deploy.yml`。如果在开启 Pages 前已失败，
   在 Actions 中重新运行失败任务。工作流只存在于非默认分支时，手动运行入口可能不显示；可再推送迁移分支触发。
5. 成功后访问 <https://nikol-cc.github.io/>。该仓库只有一个 Pages 站点，部署成功会替换旧主页的线上内容，但 main 源码保持原样。

工作流使用 GitHub 自动提供的 GITHUB_TOKEN，不需要 ACCESS_TOKEN。
GitHub Pages 不读取 Cloudflare 的 `_redirects`，因此旧路径重定向仅在 Cloudflare 生效。

## Cloudflare Pages

在 Workers & Pages → Create application → Pages 中连接 GitHub 仓库，设置：

| 项目 | 值 |
| --- | --- |
| 仓库 | Nikol-cc/Nikol-cc.github.io |
| Production branch | nikols-lab-migration |
| Framework preset | None（手动填写下列参数） |
| Root directory | 仓库根目录（留空） |
| Build command | `pnpm install --frozen-lockfile && pnpm run build:docs` |
| Build output directory | `dist` |
| NODE_VERSION | `20` |
| PNPM_VERSION | `9.15.5` |
| SKIP_DEPENDENCY_INSTALL | `1` |
| HUSKY | `0` |
| SITE_URL | `https://nikol.bbs0.cc` |
| DEPLOY_TARGET | `cloudflare` |

以上环境变量同时应用到 Production 和 Preview。`wrangler.jsonc` 声明输出目录；
Git 关联、生产分支、构建命令与构建环境变量仍需在控制台设置。

先验证 Cloudflare 分配的 `*.pages.dev` 地址，再到项目 Custom domains 添加
`nikol.bbs0.cc`，按控制台要求将该子域名 CNAME 指向实际分配的 `*.pages.dev`。
当前 DNS 对原 Sites 的配置正确，但迁移时仍需切换到新托管目标。
不要同时把此域名绑定给 GitHub Pages 和 Cloudflare Pages。

## 保留与修复

- 原 docs、图片、导航、工作流文章、每日笔记、主题和脚本全部保留。
- 取消原 `.gitignore` 对每日笔记和笔记索引的忽略，避免后续遗漏。
- 原 GitHub 工作流指向第三方仓库，原文件存入 `migration-backup/`，新工作流部署本仓库。
- 修正原 pnpm-workspace 配置缺少 packages 字段及锁文件缺少 patchedDependencies 的问题，原文件均有备份。
- 原 Sites 托管元数据保留在本机原始源码目录，不作为新托管的部署入口。
- dist 是可重新生成的产物，不提交；原站发布产物仍保留在本机原始源码目录。
- 修复原首页指向不存在的 `/pit/npm` 的链接，改为 `/pit/` 总览；原首页保留在备份目录。

参考：[VitePress 部署](https://vitepress.dev/guide/deploy)、
[Cloudflare VitePress](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/)、
[Cloudflare 构建环境](https://developers.cloudflare.com/pages/configuration/build-image/)。
