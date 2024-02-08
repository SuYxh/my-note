## 简介

Ubuntu 是基于 Linux 的操作系统，其目录结构遵循 Filesystem Hierarchy Standard (FHS)标准，以下是 Ubuntu 常见目录的说明：

- /：根目录，包含整个文件系统。
- /bin：二进制可执行文件目录，包含常用的命令和工具。
- /boot：启动目录，包含启动系统所需的文件。
- /dev：设备目录，包含所有硬件设备和外部存储设备的文件。
- /etc：配置目录，包含系统和应用程序的配置文件。
- /home：用户主目录，每个用户都有一个独立的子目录。
- /lib：库目录，包含系统和应用程序所需的共享库。
- /media：移动设备挂载目录，当插入设备时，会在此目录下创建一个子目录来挂载设备文件系统。
- /opt：可选软件包目录，包含第三方软件包和其他软件安装的目录。
- /proc：虚拟文件系统目录，包含关于当前运行进程和系统状态的信息。
- /root：root 用户家目录。
- /run：临时文件系统目录，存储当前系统运行时所需的临时文件。
- /sbin：系统二进制可执行文件目录，包含系统管理员专用的命令和工具。
- /srv：服务数据目录，包含某些服务（如 Web 服务器）提供的数据和文件。
- /sys：虚拟文件系统目录，包含与系统硬件和内核相关的信息。
- /tmp：临时文件目录，用于存储临时文件和缓存。
- /usr：用户程序目录，包含系统大部分可共享的程序和文件。
- /var：可变文件目录，包含系统和应用程序运行时产生的可变数据文件。

## 更新包管理器

```javascript
sudo apt-get update
```

## 安装 nginx

1.安装 nginx，输入以下命令
`sudo apt-get install nginx`

查看 nginx 是否安装 http_ssl_module 模块

```nginx
./nginx -V
```

2.验证 nginx 是否安装成功，在浏览器地址栏输入 localhost 或服务器 IP 地址，如果出现“Welcome to nginx”的页面，则说明 nginx 已经安装成功

3.在终端中输入以下命令，启动 nginx 服务
`sudo service nginx start`

4.如果需要停止或重启 nginx，可以使用以下命令
`sudo service nginx stop`  
`sudo service nginx restart`

5.配置 nginx 服务器
默认情况下，nginx 的配置文件位于/etc/nginx/nginx.conf，可以使用 nano 或 vi 编辑器来修改它。可以在这里添加服务器名称，访问日志，错误日志等配置信息。

6.配置虚拟主机
虚拟主机是一种配置单个 Web 服务器来托管多个独立的网站或域名的方法。在 nginx 中，可以定义多个虚拟主机，每个虚拟主机都有自己的配置信息。可以在/etc/nginx/sites-available/目录中创建一个新的配置文件。

7.使用 vi 或 nano 编辑这个新文件。在其中添加以下内容：

```javascript
server {
	listen 80; # 监听端口80
	server_name example.com; # 主机名
	root /var/www/example; # 根目录
	index index.html; # 索引文件
}
```

8.配置不同的域名对应不同的目录
(1) 编辑 Nginx 的配置文件，在 server 块内添加 server_name 指令，指定对应的域名。
(2) 在 server 块内，设置 root 指令，指定该域名对应的根目录。
举例来说，假设有两个域名 [www.example.com](https://www.example.com) 和 blog.example.com，需要它们分别对应不同的目录，则可以按照以下方式进行配置：

```javascript
server {
    listen       80;
    server_name  www.example.com;

    location / {
        root   /var/www/www.example.com;
        index  index.html index.htm;
    }
}

server {
    listen       80;
    server_name  blog.example.com;

    location / {
        root   /var/www/blog.example.com;
        index  index.html index.htm;
    }
}
```

在这个示例中，Nginx 会根据请求的域名，选择对应的 server 块，并使用指定的 root 指令指定根目录。例如，当请求 [www.example.com](https://www.example.com) 时，Nginx 会使用第一个 server 块，并指定根目录为 `/var/www/[www.example.com](https://www.example.com)` 。

9.重新启动 nginx 服务器进行配置文件的更新
`sudo service nginx restart`

## 安装 nodejs

1、安装 Node.js 的 PPA( Personal Package Archives)

```javascript
sudo curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

2、安装 Node.js 和 npm

```javascript
sudo apt-get install -y nodejs
```

3、验证 Node.js 和 npm 是否安装成功

```javascript
node - v;
npm - v;
```

如果输出版本号，则说明安装成功。

## 安装 pm2

```javascript
npm install -g pm2
```

## 安装 git

```nginx
apt install git
```

## 安装 docker

您可以按照以下步骤在 Ubuntu 20.04 上安装 Docker：

1.  首先，使用以下命令更新 Ubuntu 软件包列表：

```
sudo apt update
```

2.  然后，安装 Docker 的依赖项：

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

3.  接下来，添加 Docker 官方 GPG 密钥：

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

4.  然后，添加 Docker 的 APT 仓库：

```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

5.  最后，安装 Docker：

```
sudo apt update
sudo apt install docker-ce
```

安装完成后，您可以运行以下命令检查 Docker 是否已成功安装：

```
sudo docker run hello-world
```

如果一切正常，您将看到一条消息，表示 Docker 已成功安装并正在运行。
