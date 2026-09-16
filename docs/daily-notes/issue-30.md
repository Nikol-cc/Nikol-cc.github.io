# 修复谷歌翻译失效

> 之前找的[知乎帖](https://zhuanlan.zhihu.com/p/570811957)不知道为啥被删除，这里做下记录

谷歌关闭了中国大陆的谷歌翻译服务，导致 chrome 内置翻译和扩展均不可用，但可以通过修改 `hosts` 继续使用

## 获取 IP 地址

### 方案一：通过 IP 查询工具

1. 打开 <https://ping.chinaz.com/translate.google.cn>
2. 选择物理距离最近（即通过 IP 归属地来选择响应最快的）

### 方案二：使用命令行获取 IP

```sh
# 打开终端输入 ping 命令
ping google.cn
```

## 修改 hosts

各系统 `hosts` 文件路径如下

- Windows 系统：`C:\Windows\System32\drivers\etc\hosts`
- Mac 系统：`/etc/hosts`
- Linux 系统：`/etc/hosts`
- Android 系统：`/system/etc/hosts`
- iOS 系统：`/etc/hosts`

```sh
220.181.174.162 translate.googleapis.com
```

注意点：

- **`translate.googleapis.com` 才是谷歌翻译的 API 地址**
- `220.181.174.162` 为之前获取到的 IP 地址

推荐使用 Hosts 管理工具（[SwitchHosts](https://github.com/oldj/SwitchHosts)）修改

### 当前可用的 IP 库

```sh
108.177.122.90 translate.googleapis.com
142.250.0.90 translate.googleapis.com
142.250.10.90 translate.googleapis.com
142.250.100.90 translate.googleapis.com
142.250.101.90 translate.googleapis.com
142.250.105.90 translate.googleapis.com
142.250.107.90 translate.googleapis.com
142.250.11.90 translate.googleapis.com
142.250.110.90 translate.googleapis.com
142.250.111.90 translate.googleapis.com
142.250.112.90 translate.googleapis.com
142.250.12.90 translate.googleapis.com
142.250.125.90 translate.googleapis.com
142.250.126.90 translate.googleapis.com
142.250.128.90 translate.googleapis.com
142.250.136.90 translate.googleapis.com
142.250.185.174 translate.googleapis.com
142.250.185.238 translate.googleapis.com
142.250.189.206 translate.googleapis.com
142.250.203.142 translate.googleapis.com
142.250.218.14 translate.googleapis.com
142.250.27.90 translate.googleapis.com
142.250.28.90 translate.googleapis.com
142.250.30.90 translate.googleapis.com
142.250.31.90 translate.googleapis.com
142.250.4.90 translate.googleapis.com
142.250.8.90 translate.googleapis.com
142.250.9.90 translate.googleapis.com
142.250.96.90 translate.googleapis.com
142.250.97.90 translate.googleapis.com
142.250.98.90 translate.googleapis.com
142.251.10.138 translate.googleapis.com
142.251.116.101 translate.googleapis.com
142.251.40.174 translate.googleapis.com
142.251.5.90 translate.googleapis.com
142.251.9.90 translate.googleapis.com
172.217.0.46 translate.googleapis.com
172.217.13.142 translate.googleapis.com
172.217.16.46 translate.googleapis.com
172.217.192.90 translate.googleapis.com
172.217.195.90 translate.googleapis.com
172.217.203.90 translate.googleapis.com
172.217.204.90 translate.googleapis.com
172.217.214.90 translate.googleapis.com
172.217.215.90 translate.googleapis.com
172.217.222.90 translate.googleapis.com
172.217.31.142 translate.googleapis.com
172.253.112.90 translate.googleapis.com
172.253.113.90 translate.googleapis.com
172.253.114.90 translate.googleapis.com
172.253.115.90 translate.googleapis.com
172.253.116.90 translate.googleapis.com
172.253.122.90 translate.googleapis.com
172.253.123.90 translate.googleapis.com
172.253.124.90 translate.googleapis.com
172.253.126.90 translate.googleapis.com
172.253.62.90 translate.googleapis.com
216.58.209.174 translate.googleapis.com
216.58.214.14 translate.googleapis.com
216.58.220.142 translate.googleapis.com
```

[谷歌翻译不能用的解决方案 | 划词翻译](https://hcfy.app/blog/2022/09/28/ggg)
