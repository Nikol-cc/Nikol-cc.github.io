# 青龙定时任务管理面板

[青龙（qinglong）](https://github.com/whyour/qinglong)是一款支持 `python3`、`javaScript`、`typescript`、`shell` 的定时任务管理面板

## 安装和部署

### 安装 docker 或者 docker-compose

- [Docker 安装](https://www.runoob.com/docker/macos-docker-install.html)
- `docker-compose` 安装

```sh
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.14.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

[docker-compose](https://github.com/docker/compose)

### 部署青龙

#### docker 部署

```sh
docker run -dit \
  -v $PWD/ql/data:/ql/data \
  -p 5700:5700 \
  --name qinglong \
  --hostname qinglong \
  --restart unless-stopped \
  whyour/qinglong:latest
```

#### docker-compose 部署

```sh
mkdir qinglong

# 下载 docker-compose.yml
curl -O https://raw.githubusercontent.com/whyour/qinglong/develop/docker-compose.yml

# 启动
docker-compose up -d
# 停止
docker-compose down
```

最后浏览器访问 `http://127.0.0.1:5700` 或 `http://{ip}:5700` 即可使用

[qinglong —— 部署](https://github.com/whyour/qinglong#%E9%83%A8%E7%BD%B2)

### 青龙内置命令

```sh
# 更新并重启青龙
ql update

# 运行自定义脚本 extra.sh
ql extra

# 添加单个脚本文件
ql raw <file_url>

# 添加单个仓库的指定脚本
ql repo <repo_url> <whitelist> <blacklist> <dependence> <branch> <extensions>

# 删除旧日志
ql rmlog <days>

# 启动tg-bot
ql bot

# 检测青龙环境并修复
ql check

# 重置登录错误次数
ql resetlet

# 禁用两步登录
ql resettfa
```

## 常用的定时任务库

### 京东薅羊毛

> 集合库不用都拉取，拉一个就行，重复脚本太多容易黑号

#### faker2 faker3

> 京东集合库（推荐）

打开订阅管理 - 新建订阅

1. 名称：`ql repo https://git.metauniverse-cn.com/https://github.com/shufflewzc/faker3.git "jd_|jx_|gua_|jddj_|jdCookie" "activity|backUp" "^jd[^_]|USER|function|utils|sendNotify|ZooFaker_Necklace.js|JDJRValidator_|sign_graphics_validate|ql|JDSignValidator|magic|depend|h5sts" "main"`
2. 定时规则：`5 0 * * *`

- [faker3](https://github.com/shufflewzc/faker3) 纯净版
- [faker2](https://github.com/shufflewzc/faker2) 助力池版

> faker2 和 faker3 选一个拉就行

#### KR

> 京东集合库

打开订阅管理 - 新建订阅

1. 名称：`ql repo https://github.com/KingRan/KR.git "jd_|jx_|jdCookie" "activity|backUp" "^jd[^_]|USER|utils|function|sign|ql|JDJR"`
2. 定时规则：`30 * * * *`
3. 文件后缀：`js ts py`
4. 代理：`https://ghproxy.com/`（可选）

[KR](https://github.com/KingRan/KR)

#### 获取京东 cookie

1. 下载 [alook](https://www.alookweb.com) 浏览器
2. 打开京东触屏版 <https://home.m.jd.com>
3. 通过手机验证码登录
4. 点击 工具箱 — 开发者工具 — Cookies

#### QLScript2 通知库

> 上面的两个集合库均已内置，可以不用拉取

打开订阅管理 - 新建订阅

1. 名称：`ql repo https://github.com/ccwav/QLScript2.git "jd_" "NoUsed" "ql|sendNotify|utils|USER_AGENTS|jdCookie|JS_USER_AGENTS"`
2. 定时规则：`0`
3. 代理：`https://ghproxy.com/`（可选）

##### 使用教程

- [WxPusher 实现一对一推送](https://www.kejiwanjia.com/jiaocheng/27909.html)
- [ccwav: sendNotify.js 和 jd_bean_change.js 的一些答疑](https://www.kejiwanjia.com/jiaocheng/61708.html)

### 其他库

- [BiliBiliToolPro](https://github.com/RayWangQvQ/BiliBiliToolPro) B 站（bilibili）自动任务工具
- [checkinpanel](https://github.com/OreosLab/checkinpanel) 签到盒

## 其他说明

- **加密脚本可能存在安全隐患，使用需谨慎**
- **加密脚本可能存在安全隐患，使用需谨慎**
- **加密脚本可能存在安全隐患，使用需谨慎**
