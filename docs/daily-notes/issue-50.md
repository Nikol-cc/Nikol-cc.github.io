# 从 VSCode 迁移到 Cursor

> 记录下最近从 VSCode 迁移到 Cursor 的配置过程

[Cursor](https://www.cursor.com/) 是一款专为 AI 编程而构建的代码编辑器，它将 AI 助手集成到编辑器中，提供智能的代码补全、建议和解释，帮助开发者提高编码效率和代码质量

## 修改活动栏布局

Cursor 的活动栏默认是水平的，用起来很别扭

1. 打开 VSCode，按 `Ctrl/⌘ + ,` 打开设置
2. 设置 `workbench.activityBar.orientation` 为 `vertical`

> `Ctrl` 为 Windows 下的快捷键，`⌘` 为 Mac 下的快捷键

## 迁移 VSCode 的扩展、主题、设置、和快捷键

> 以下操作均在 Cursor 中完成

根据官网文档 [Migrate from VS Code](https://docs.cursor.com/get-started/migrate-from-vscode) 的指引，操作步骤如下：

1. 按 `Ctrl/⌘ + Shift + J` 打开设置
2. 点击 `VS Code Import` 栏下的 `Import` 按钮

导入后发现如下问题

- `settings.json` 文件中丢失了注释
- 未导入代码片段
- 扩展导入不全
  - 很多扩展导入后无法正常使用（插件文件已导入，但扩展列表中没有）

经过一番折腾，发现还是手动导入好

### 手动导入 `settings.json` 和代码片段

#### 方案一：直接复制文件

**目录说明**
/Cursor/User/globalStorage/storage.json

- **Mac**
  - **VSCode 目录** `~/Library/Application Support/Code/User/`
  - **Cursor 目录** `~/Library/Application Support/Cursor/User/`
- **Windows**
  - **VSCode 目录** `C:\Users\电脑用户名\AppData\Roaming\Code\User`
  - **Cursor 目录** `C:\Users\电脑用户名\AppData\Roaming\Cursor\User`

**文件说明**

- `settings.json`：用户的设置文件
- `snippets`：用户的全局代码片段
- `keybindings.json`：用户的自定义快捷键配置

#### 方案二：在编辑器打开对应配置文件再复制

> 适合文件较少的配置

- 打开 `settings.json` 文件
  - 打开 VSCode，按 `Ctrl/⌘ + ,` 打开设置
  - 点击右上角的 `打开设置 / Open Settings (JSON)`
- 打开代码片段文件
  - 点击左下角的设置按钮
  -

1. 打开 VSCode，按 `Ctrl/⌘ + ,` 打开设置
2. 点击右上角的 `打开设置 / Open Settings (JSON)`
3. 复制 `settings.json` 文件中的内容
4. 打开 Cursor，按 `Ctrl/⌘ + ,` 打开设置
5. 点击右上角的 `打开设置 / Open Settings (JSON)`
6. 将复制的内容粘贴到打开的 `settings.json` 文件中

### 手动导入扩展

**1. 获取 VSCode 的扩展列表**

```sh
code --list-extensions > $HOME/vscode_extensions.txt
```

获取后可以编辑 `vscode_extensions.txt` 文件挑选需要的扩展

**2. 在 Cursor 中安装扩展**

使用 `while` 循环逐行读取扩展列表并安装

```sh
while read extension; do
  cursor --install-extension "$extension" --force
done < $HOME/vscode_extensions.txt
```

- `--force` 参数用于强制安装扩展
- 安装完成后，运行 `rm $HOME/vscode_extensions.txt` 删除扩展列表文件

**一键迁移命令**

```sh
code --list-extensions | while read extension; do
  cursor --install-extension "$extension" --force
done
```

#### 扩展安装失败

使用上述命令后，还是会有些扩展安装失败，需要手动安装

> 命令行提示找不到扩展

命令行提示找不到扩展

> 手动搜索是可以的

手动搜索是可以的

### 语言包

迁移插件时不会迁移语言包，需要手动安装

> 安装语言包

```sh
cursor --install-extension MS-CEINTL.vscode-language-pack-zh-hans
```

> 修改设置

1. 打开设置面板 `Ctrl/⌘ + Shift + P`
2. 输入 `Configure Display Language`
3. 选择 `zh-cn`

## Cursor 使用技巧

### AI 快捷键

- `Ctrl/⌘ + K` 在光标处插入 AI 生成的代码
- `Ctrl/⌘ + I` 对选中的代码进行快速智能编辑和补全，直接在编辑器中显示建议
- `Ctrl/⌘ + Shift + I` 打开独立的智能编辑面板，提供更详细的编辑建议和交互选项（功能和 `Ctrl/⌘ + I` 一样）
- `Ctrl/⌘ + L` 打开 AI 聊天面板,可以与 AI 进行对话交互

#### 聊天中的 `@` 符号

在 AI 对话框中可以使用 `@` 符合添加对应上下文

- `@Files` 引入文件，使用文件内容进行 AI 分析
- `@Folders` 引入文件夹，可以让 AI 了解整个项目结构
- `@Code` 当前选中的代码，将选中的代码片段发送给 AI 分析
- `@Docs` 引用内置的第三方文档内容进行 AI 分析
- `@Git` 引入 Git 相关信息，如提交历史、分支等
- `@Codebase` 引入整个代码库的上下文，让 AI 了解项目全貌
- `@Web` 允许 AI 访问网络资源获取信息
- `@Chat` 引用之前的对话内容
- `@Definitions` 引入代码中的定义，如函数、类等

### 提示词

[Cursor Directory](https://cursor.directory/) 收录了大量 Cursor 的提示词，可以参考使用

### `.cursorignore` 文件

Cursor 会根据 `.cursorignore` 文件中的内容忽略一些文件或文件夹，可以用来排除一些不希望被 AI 分析的文件

- 官网文档 [Ignore Files | Cursor](https://docs.cursor.com/context/ignore-files)
