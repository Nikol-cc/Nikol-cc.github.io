# 解决 Github Support for password

## 方案一配置 SSH Key

### 生成密钥

```sh
ssh-keygen -t rsa -C "邮箱地址"

# 指定文件名
ssh-keygen -t rsa -C "邮箱地址" -f ~/.ssh/id_rsa_github
```

### 查看并复制公钥

```sh
# 进入 .ssh 目录
cd ~/.ssh
# 查看文件
ls
# 查看公钥（复制下来）
cat id_rsa.pub
```

### 配置密钥

1. 打开 <https://github.com/settings/ssh/new>

2. 输入 `title` 和 `key` 配置即可

```sh
# 测试是否成功
ssh -T git@github.com
```

### 注意点

如果项目使用的是 `https` 源，则需要修改为 `SSH` 源

```sh
# 查看项目源
git remote get-url origin
# 修改项目源
git remote set-url origin SSH源地址
```

嫌修改项目源麻烦可以使用方案二

### 其他

[Git 配置多个 SSH-Key](https://gitee.com/help/articles/4229)

## 方案二配置 Personal Access Token

1. 打开 <https://github.com/settings/tokens/new>
2. 输入表单内容然后点击 `Generate token` 按钮生成

   1. `Note`: 备注说明
   2. `Expiration`: `token` 有效期，怕麻烦直接选永久
   3. `Select scopes`: 一般选 `repo` 权限

3. 复制生成好的 `token`
4. 打开钥匙串搜索 `github.com`

编辑钥匙串
