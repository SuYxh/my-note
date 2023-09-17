## pm2 简介

PM2 是常用的 node 进程管理工具，它可以提供 node.js 应用管理，如自动重载、性能监控、负载均衡等。同类工具有 Supervisor、Forever 等。

pm2 是一个进程管理工具,可以用它来管理你的 node 进程，并查看 node 进程的状态，当然也支持性能监控，进程守护，负载均衡等功能。pm2 基本是 Nodejs 应用程序不二的守护进程选择，事实上它并不仅仅可以启动 Nodejs 的程序，只要是一般的脚本的程序它同样可以胜任。

## 准备工作

### 配置 SSH 链接服务器

目的： 在执行 pm2 部署命令的时候不需要频繁的输入服务器的密码

#### 生成密钥

本地执行生成密钥对命令，生成的密钥位于`~/.ssh`目录中，此处生成的公钥为`id_ed25519.pub`，私钥为`id_ed25519`

```
ssh-keygen -t ed25519 -C "xxx@163.com"
```

![](https://qn.huat.xyz/mac/20230503095440.png#id=AQ8cQ&originHeight=712&originWidth=1104&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 修改本地 SSH 配置

`vim ~/.ssh/config` ，如果没有就新建一个。

```
Host huaweiyun # 登录的服务器别名
  HostName 233.233.233.233  # 要登录的服务器ip
  User root   # 登录名
  IdentityFile ~/.ssh/id_ed25519 # 你的私钥路径
  ServerAliveInterval 30
  TCPKeepAlive yes
```

#### 修改服务器配置

`cat ~/.ssh/id_ed25519.pub` 复制本地生成的公钥内容，粘贴到云服务器的 `~/.ssh/authorized_keys` 文件中

#### 链接服务器

```
ssh huaweiyun
```

配置完成后，就可以通过 ssh 登陆了

### 保证服务器可拉取仓库代码

> 以码云私有仓库为例

1、在云服务器上通过以下命令生成一份密钥对

```
ssh-keygen -t ed25519 -C "xxx@163.com"

// 其他
ssh-keygen -t rsa -C "xxx@xx.com"
// 验证
ssh -T git@gitlab.example.com
```

2、然后将公钥放入仓库的部署公钥中

![](https://qn.huat.xyz/mac/20230503100503.png#id=GmwvX&originHeight=1232&originWidth=2578&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

3、在服务器上先创建个文件夹，测试一下拉取

## 部署项目

在项目根目录下新建一个 deploy.yaml 文件

```yaml
# deploy.yaml
apps:
  - script: ./app.js # 入口文件
    name: "app" # 程序名称
    env: # 环境变量
      COMMON_VARIABLE: true
    env_production:
      NODE_ENV: production

deploy: # 部署脚本
  production: # 生产环境
    user: root # 服务器的用户名
    host: 10.1.124.96 # 服务器的ip地址
    port: 22 # ssh端口
    ref: origin/master # 要拉取的git分支
    ssh_options: StrictHostKeyChecking=yes # SSH 公钥检查
    repo: git@gitee.com:dahuang/deploy_test.git # 远程仓库地址
    path: /www/demo/deploy_test # 拉取到服务器某个目录下
    pre-deploy: git pull # 部署前执行
    post-deploy: npm install && pm2 restart app # 部署后执行
    env:
      NODE_ENV: production
```

> 如果是 eggjs 项目，部署完成后，在服务器上的 config 文件夹中新建 env 文件，写入 prod

### 首次部署

```
pm2 deploy deploy.yaml production setup
```

部署完成后，可登陆服务器查看配置的目录下是否从 git 上拉取了项目

### 后续部署

```
pm2 deploy deploy.yaml production
```

### 前端项目

如 vue-cli 的项目，自动部署到服务器，自动执行 npm run build 命令，生成的 dist 目录，指定到 nginx 的静态文件目录下

或者直接使用命令，将打包后的 dist 文件夹，上传到服务器的静态文件夹

```
scp -r ./dist root@120.46.190.74:/www/wwwroot/admin1.ironc.cn/
```

## 可能会遇到的坑

1、在 window 系统下 vscode 的命令行程序，以及 powershell 执行部署的命令时，出现部署失败

![](https://qn.huat.xyz/mac/20230503101235.png#id=kpant&originHeight=101&originWidth=447&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

解决方案：使用 git 命令行来执行

2、 pm2 command not found post-deploy hook failed Deploy failed 1

> 如果使用 宝塔搭的环境可能存在这个问题

**原因**

这个提示是找不到 npm 跟 pm2 命令， 但是我们在服务器上使用 npm -v  pm2 -v 是可以查看到版本好的， 也就是安装好的。这个时候提示  command not found 是因为在自动部署的时候 使用的全局下的 npm pm2 命令，在全局环境下 找不到这两个命令， 自然就报错了，为了验证， 可以执行 `sudo npm -v`  `sudo pm2 -v`   也会提示 `command not found`

**解决方案**

为了解决这个问题需要让 npm pm2 建立软连接，相当于放在环境变量中。首先查看 npm 的安装位置，可以使用 `whereis npm` 查看 npm 的安装路径， 如果 `whereis npm`   显示路径为空，则使用 `which npm` 比如 这里显示的路径是 `/usr/local/src/node-v10.16.3-linux-x64/bin/npm` ，然后执行

```
sudo ln -s  /usr/local/src/node-v10.16.3-linux-x64/bin/npm  /usr/bin/npm
```

这就相当于把 npm 链接到了 全局环境变量中，这时候在执行 sudo npm -v   就不报错了。

注意：

需要先将 node 和 npm 链接到全局环境变量中，在将 pm2 链接到全局环境变量中，再去使用 `sudo npm -v` 测试

如果配置软连接后还不行，那么就单独安装 nodejs，然后再用 npm 全局安装 pm2， 具体方法：

1.  首先更新本地安装的软件包列表：

```
sudo apt-get update
```

2.  安装 Node.js 16：

```
sudo apt-get install nodejs=16.*
```

这将安装 Node.js 16 版本以及 npm 包管理器，并且使用"=16.\*"来安装 Node.js 16.x.x 的最新版。
注意：如果你要安装最新的 Node.js 16，可以将上面的命令替换为：
`-y`选项将自动确认所有安装过程中提示的问题。

3.  验证安装是否成功：

```
node -v
```

这将显示 Node.js 的版本号，如果成功安装，则应该显示 16.x.x 版本号。

## 测试部署代码

[https://wwa.lanzous.com/iFlDomye3ud](https://wwa.lanzous.com/iFlDomye3ud)

## 参考

[https://www.cnblogs.com/yalong/p/13935503.html](https://www.cnblogs.com/yalong/p/13935503.html)
[https://www.cnblogs.com/kunmomo/p/14990703.html](https://www.cnblogs.com/kunmomo/p/14990703.html)

[https://www.cnblogs.com/yalong/p/13935503.html](https://www.cnblogs.com/yalong/p/13935503.html)
[https://www.cnblogs.com/lentoo/p/9539137.html](https://www.cnblogs.com/lentoo/p/9539137.html)
GitHub action 部署 vue 项目：[https://www.bilibili.com/video/BV1vX4y1K7bQ?p=15](https://www.bilibili.com/video/BV1vX4y1K7bQ?p=15)

若有收获，就点个赞吧
