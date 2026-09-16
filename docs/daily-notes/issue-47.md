# 在 GitHub Actions 中触发其他仓库的 Actions

为了偷懒，在发布日常笔记时能够自动触发博客的构建和部署

> 以茂茂的两个笔记仓库举 🌰

- **源仓库**: 日常笔记仓库 <https://github.com/Nikol-cc>
- **目标仓库**: 博客仓库 <https://github.com/Nikol-cc>

## 生成并添加 GitHub 个人访问令牌

1. 请参考 GitHub 官方文档：[创建 personal access token](https://docs.github.com/zh/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#%E5%88%9B%E5%BB%BA-personal-access-token)（**确保选中了 `workflows` 权限**）
2. 将生成的 GitHub 个人访问令牌添加到源仓库的 Secrets 中

详细教程请查看 [配置 Secrets | Nikol's Lab](https://yangs-lab.nikola-942.chatgpt.site/)

## 在源仓库中创建工作流

在源仓库中创建或修改已有的 GitHub Actions 工作流文件，例如 `.github/workflows/trigger-notes-workflow.yml`，内容如下：

```yaml
name: Trigger Notes Actions

on:
  workflow_dispatch: # 手动触发
  issues:
    types: [opened] # 创建 issue 时触发

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Repository Dispatch
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.ACCESS_TOKEN }}
          repository: Nikol-cc/nikols-lab
          event-type: build-and-deploy
```

这里使用 [repository-dispatch](https://github.com/peter-evans/repository-dispatch) 直接触发目标仓库的 Actions

## 在目标仓库配置响应的工作流

在目标仓库中创建或修改已有的 GitHub Actions 工作流文件，内容如下：

```yaml
name: GitHub Actions Build and Deploy

on:
  workflow_dispatch:
  repository_dispatch:
    types: [build-and-deploy]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      # 添加其他步骤，如安装依赖、构建等
```

- `on: repository_dispatch: types: [build-and-deploy]`：监听来自 `repository_dispatch` 的自定义事件 `build-and-deploy`

---

按照以上步骤配置后，每当源仓库满足触发条件时，目标仓库的构建和部署流程将自动启动
