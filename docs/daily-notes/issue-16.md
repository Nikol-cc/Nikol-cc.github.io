# 修改 DNS 解决 Github 图片资源加载失败

## 获取 IP 地址

1. 打开 [ipaddress](https://www.ipaddress.com)
2. 搜索 `raw.githubusercontent.com` (控制台资源报错的域名)

[快捷搜索 raw.githubusercontent.com IP 地址](https://githubusercontent.com.ipaddress.com/raw.githubusercontent.com)

## 修改本地 Hosts 文件

各系统 `hosts` 文件路径如下

- Windows 系统：`C:\Windows\System32\drivers\etc\hosts`
- Mac 系统：`/etc/hosts`
- Linux 系统：`/etc/hosts`
- Android 系统：`/system/etc/hosts`
- iOS 系统：`/etc/hosts`

```sh
199.232.96.133    assets-cdn.github.com
199.232.96.133    raw.githubusercontent.com
199.232.96.133    gist.githubusercontent.com
199.232.96.133    camo.githubusercontent.com
199.232.96.133    cloud.githubusercontent.com
199.232.96.133    user-images.githubusercontent.com
199.232.96.133    avatars.githubusercontent.com
199.232.96.133    avatars0.githubusercontent.com
199.232.96.133    avatars1.githubusercontent.com
199.232.96.133    avatars2.githubusercontent.com
199.232.96.133    avatars3.githubusercontent.com
199.232.96.133    avatars4.githubusercontent.com
```

`199.232.96.133` 为之前获取到的 IP 地址

推荐使用 Hosts 管理工具（SwitchHosts）修改

## SwitchHosts

1. Hosts 文件语法高亮
2. 快速切换 Hosts
3. 在线 Hosts 方案
4. 系统托盘图标快速切换
5. 支持 windows macOS linux

[SwitchHosts | GitHub](https://github.com/oldj/SwitchHosts)

## 在 SwitchHosts 中使用远程配置文件

1. 打开 SwitchHosts
2. 添加 hosts
3. 选择类型为「远程」
4. URL 为以下链接
   1. `https://gitlab.com/ineo6/hosts/-/raw/master/hosts`
   2. `https://raw.hellogithub.com/hosts`

- [hosts | GitHub](https://github.com/ineo6/hosts) 解决 GitHub 图片无法显示，加速 GitHub 网页浏览
- [GitHub520 | GitHub](https://github.com/521xueweihan/GitHub520) 让你“爱”上 GitHub，解决访问时图裂、加载慢的问题。（无需安装）

## 刷新本地 DNS 缓存

macOS

```sh
sudo killall -HUP mDNSResponder
```

Windows

```sh
ipconfig /flushdns
```
