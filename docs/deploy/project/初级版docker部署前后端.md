# umi-egg-docker-deploy-demo

使用 docker 进行前后端部署--初级班，后续会更新

## 环境准备

1、准备一台 centos

2、代码 [https://github.com/SuYxh/umi-egg-docker-deploy-demo](https://github.com/SuYxh/umi-egg-docker-deploy-demo)

## 安装软件

```
yum install yum-utils device-mapper-persistent-data lvm2
```

## 设置启动 docker

> [https://hub.daocloud.io/](https://hub.daocloud.io/)
>
> [https://hub.docker.com/](https://hub.docker.com/)

### 1、设置 docker 镜像源

```
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 2、启动 docker 服务

```
systemctl start docker
systemctl enable docker  [开机自启]
```

**注意：** 注意： 若报错 `Failed to start docker.service: Unit not found.` ,则执行： `yum install docker-ce docker-ce-cli containerd.io`   后再启动 `systemctl start docker` ，查看相关信息 `ps -ef|grep docker`

### 3、修改 docker 镜像源

```
vi /etc/docker/daemon.json
```

填写以下内容：

```
{
"registry-mirrors": ["https://register.docker-cn.com/"]
}
```

输入完成后， 按 esc 退出， 然后输入 wq!

### 4、重新启动服务和 docker

```
systemctl daemon-reload
systemctl restart docker
```

## 制作 mysql 容器

### 1、拉取 mysql 镜像

```
docker pull daocloud.io/library/mysql:8.0.20
```

![](https://qn.huat.xyz/mac/20230328131735.png#id=MDOUG&originHeight=626&originWidth=1130&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 2、查看镜像

```
docker images
```

![](https://qn.huat.xyz/mac/20230328131531.png#id=qBxoc&originHeight=138&originWidth=1106&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 3、启动 mysql 容器

```
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=yxh1998426 be0dbf01a0f3
```

![](https://qn.huat.xyz/mac/20230328131639.png#id=qfNDm&originHeight=144&originWidth=1128&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 4、查看容器是否正常运行

```
docker ps
```

![](https://qn.huat.xyz/mac/20230328131701.png#id=f5ukQ&originHeight=202&originWidth=1128&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 制作 redis 容器

### 1、拉取 redis 镜像

```
docker pull daocloud.io/library/redis:6.0.3-alpine3.11
```

![](https://qn.huat.xyz/mac/20230328131938.png#id=uA8GO&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 2、查看镜像

```
docker images
```

![](https://qn.huat.xyz/mac/20230328132106.png#id=iPIQT&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 3、启动 redis 容器

```
docker run -d -p 6379:6379 --name redis 29c713657d31 --requirepass yxh1998426
```

![](https://qn.huat.xyz/mac/20230328132209.png#id=DOdH3&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 4、查看容器是否正常运行

```
docker ps
```

![](https://qn.huat.xyz/mac/20230328132233.png#id=slN5h&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 5、测试 redis

```
// 进入redis容器
docker exec -it 52b7f797c564 sh

// 进入 redis
redis-cli -a yxh1998426
```

![](https://qn.huat.xyz/mac/20230328132633.png#id=bU11P&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 制作 nginx 容器

### 1、拉取 nginx 镜像

```
docker pull daocloud.io/library/nginx:1.13.0-alpine
```

![](https://qn.huat.xyz/mac/20230328185853.png#id=DaD4Q&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 2、配置 nginx

见代码的 `nginx` 文件夹

### 3、将 nginx 配置传到服务器

> 在和 nginx 配置同级别的目录执行

```
scp -rp nginx root@120.46.190.74:/root
```

### 4、启动 nginx 容器

> 注意 映射关系 不要写错

```
docker run --name nginx  -d -p 80:80  -v /root/nginx/log:/var/log/nginx -v /root/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /root/nginx/conf.d:/etc/nginx/conf.d -v /root/nginx/html:/usr/share/nginx/html f00ab1b3ac6d
```

### 5、验证 nginx

此时在浏览器输入服务器 IP，能看到 nginx 文件夹下的`index.html`页面

## 部署前端

1、在前端项目进行 `build`

2、将 biuld 出来的文件，复制到 nginx 文件夹下，然后重新上传到服务器

3、浏览器输入服务器 ip，可以看到前端页面。【会有问题，因为服务端还没有部署】

## 部署 server

### 1、在服务端项目中编写 Dockerfile

```
# 使用node镜像
FROM node:18.15.0
# 在容器中新建目录文件夹 egg
RUN mkdir -p /egg
# 将 /egg 设置为默认工作目录
WORKDIR /egg
# 将 package.json 复制默认工作目录
COPY package.json /egg/package.json
# 安装依赖
RUN yarn config set register https://registry.npm.taobao.org
RUN yarn --production
# 再copy代码至容器
COPY ./ /egg
#7001端口
EXPOSE 7001
#等容器启动之后执行脚本
CMD yarn prod
```

### 2、Eggjs 新增生产环境配置

新增 eggs 生产环境的 config, 注意更换 ip 和 数据库相关的账号密码

### 3、将后端代码上传到服务器

```
scp -rp eggjs.zip root@120.46.190.74:/root
```

### 4、在服务器解压

将 egg.zip 解压到 server 目录

```
unzip -u -d server egg.zip
```

### 5、配置 docker 容器中的 mysql 权限

```
// 进入mysql容器
docker exec -it 9e7c5fcb1720 sh

进入 mysql
mysql -u root -p

// 修改权限
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

// 刷新权限
FLUSH PRIVILEGES;

// 修改加密规则
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;

// 更新root用户密码
ALTER USER 'root'@'%'  IDENTIFIED WITH mysql_native_password BY 'yxh1998426';

// 刷新权限
FLUSH PRIVILEGES;


// mysql 8.0 以后直接使用nodejs链接会报错，所以需要进行以上操作
```

### 6、构建 eggjs 镜像

[实际上是创建 node 环境, 并执行 dockerfile 的内容]

```
docker build -t egg:v1.0 ./server
```

查看是否构建成功：

```
docker images
```

![](https://qn.huat.xyz/mac/20230328204915.png#id=HfY5W&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 7、运行 egg 容器

```
docker run -d -p 7001:7001 --name server 17fbded3aab6
```

![](https://qn.huat.xyz/mac/20230328205115.png#id=yVU14&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

查看日志：

```
docker logs -f 230498f25619
```
