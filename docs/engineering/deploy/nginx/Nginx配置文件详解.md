# 一、Nginx的功能概述

Nginx主要功能包括高性能的HTTP和反向代理服务、负载均衡、动静分离处理、邮件代理服务等。以下详细探讨Nginx的主要功能：

## 1、静态内容服务

**传输速度快**：Nginx设计为一个高性能的HTTP服务器，能够快速传输静态文件，如HTML、图片和视频等。

**简单高效**：占用系统资源少，使其在处理高并发请求时表现出色。

## 2、反向代理与负载均衡

**反向代理功能**：Nginx可以将客户端请求转发到后端服务器，并将响应结果返回给客户端，从而对客户端隐藏后端服务器的详细信息。

**负载均衡策略**：支持多种负载均衡算法如轮询、权重、IP哈希等，能有效分散请求压力，提升网站服务的可用性和性能。

## 3、动静分离处理

**动态内容处理**：Nginx可以与PHP、Python等后端应用服务器集成，通过FastCGI等方式处理动态内容。

**静态内容优化**：对于静态文件，Nginx可以直接从其缓存中高效率地服务，减少后端应用服务器的压力。

## 4、邮件代理服务

邮件代理功能：除了Web服务外，Nginx还提供邮件代理服务，能够代理IMAP、POP3及SMTP协议的请求。

## 5、SSL/TLS支持

**安全性增强**：支持SSL/TLS协议，可为网站提供HTTPS服务，保障数据传输过程的安全性。URL重写与虚拟主机配置

**URL重写能力**：可以根据规则对URL进行修改、重定向，有助于网站优化和美化。

**虚拟主机支持**：允许在同一服务器上部署多个网站，并根据域名分发请求，节省资源且便于管理。

## 6、配置文件简洁明了

**易于配置**：Nginx的配置文件结构清晰，注释详细，便于理解和维护。热部署与灵活性

**无缝升级**：Nginx支持热部署，可以在不中断服务的情况下进行软件版本的升级。

**扩展性高**：模块化设计和开放的插件系统使得Nginx拥有很高的自定义和扩展能力。

# 二、配置文件详解

Nginx的配置文件是nginx.conf，不过可以在conf.d目录下添加多个不同名称的配置文件，同时生效。生产环境有多个域名需要代理出去时，常常在conf.d目录下配置各自域名的发布或代理信息。

**nginx配置文件一般包括全局块，events块，http块等组成** **，一个http块可包含一个或多个server块，一个server块可以包含一个或多个location块**

下面是nginx配置文件的结构图：

![图片](https://qn.huat.xyz/mac/202409281739846.png)

以下是初始化安装的配置文件内容，将对配置文件各个模块进行详细解析

```nginx
#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
    server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location / {
            root   html;
            index  index.html index.htm;
        }
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```

## 1、全局块

全局块是配置影响Nginx全局的参数。

```nginx
user nginx;
worker_processes  auto;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;
```

主要参数说明：

**user** ：指定nginx运行的用户和用户组，默认是nobody，一般会使用nginx

**workker\_processes** ：指定Nginx启动的工作进程数，建议设置为CPU核心数的两倍或设置为auto，由Nginx自行选择 。

**error\_log和pid一般使用默认就行**，会自动将信息放置在安装时指定的位置

## 2、events块

设定Nginx的工作模式及连接上限

```nginx
events {
    # 定义每个工作进程可以处理的最大连接数
    worker_connections  65535;
}
```

workker\_connections ：定义每个工作进程可以处理的最大连接数，根据服务器性能和并发需求进行适当调整。

## 3、http块

http块是整个配置文件的核心部分，大部分配置都在此处操作。http块可以嵌套多个server块，

包含HTTP相关的指令，如文件引入、MIME-Type定义、日志自定义、连接超时时间等。

可以嵌套多个server块，用于配置不同的虚拟主机。而server块也可以嵌套多个location块，用于配置不同的URL。

```nginx
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile on;   # 开启高效传输模式
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
}
```

## 4、server块

一个server块代表一个虚拟主机，可以配置多个，用于支持多个域名或IP地址，端口。

一个server块可以包含多个location块。

```nginx
server {
        listen       9080;
        server_name  www.liyb.com;

        location / {
            root   /opt/nginx/html;
            index  index.html index.htm;
        }

        error_page  404              /404.html;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
```

**主要参数说明**：

**listen**：指定Nginx监听端口，可以指定任意端口，但不可以端口冲突。

**server\_name**：指定虚拟主机的域名或IP 域名匹配的四种写法：

```
# 精确匹配
server_name http://www.liyb.com;
# 左侧匹配
server_name *.liyb.com;
#右侧通配
server_name www.liyb.*;
# 正则匹配
server_name ~^www\.liyb\.*$;
```

**root : 指定静态资源目录位置**，当用户访问www.liyb.com:9080时，实际访问的是/opt/nginx/html/index.html

error\_page 404：指定 404 错误页面的位置

error\_page 500 502 503 504 ：指定50开头的错误页面的位置

## location块

配置URL路径的指令，可以定义URL路径的匹配规则和处理方式，如反向代理、重定向等

```nginx
location / {
    root   html;
    index  index.html index.htm;
}
location = /50x.html {
    root   html;
}
```

location配置有多种匹配规则

```
= 精确匹配
~ 正则匹配，区分大小写
~* 正则匹配，不区分大小写
^~  匹配到就停止搜索
```

location配置实例

```nginx
server {
        listen       80;
        server_name  www.liyb.com;
# 当访问www.liyb.com/web02时，会匹配上/usr/local/nginx/html/index.html
        location = /web02 {
            root   /usr/local/nginx/html;
            index  index.html index.htm;
        }
# 只有当访问www.liyb.com/web01时才会匹配到/usr/local/nignx/html/web01
        location = /web01 {
            root   /usr/local/nginx/html;
        }
# 当访问www.liyb.com/dog.jpg等路径时会匹配到/usr/local/nginx/html/dog.jpg 
        location ~ \.(jpeg|jpg|png)$ {
            root   /usr/local/nginx/html;
        }


}
```

# 三、常用功能配置示例

## 1、反向代理

反向代理配置主要通过proxy\_pass指令实现，将请求转发到后端服务器

```nginx
server {
    listen 8090;
    server_name www.liyb.com;

    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
# 配置后端服务器组
upstream app {
    server 10.10.10.100:8090;
    server 10.10.10.101:8090;
}
```

## 2、负载均衡

负载均衡是将单个服务器负载均衡到多个服务器上，使得大量并发访问或数据流量分担到多个服务器上，从而减少用户的等待响应时间。

负载均衡通过配置upstream指令定义一组后端服务器，并通过反向代理将请求分发到这些服务器，一般会给服务器添加权重，加权轮询

```nginx
upstream web {
    server 10.10.10.100 weight=1;
    server 10.10.10.101 weight=2;
    server 10.10.10.102 down;
}

server {
    listen 80;

    location / {
        proxy_pass http://web;
    }
}
```

## 3、配置https

一般公司都注册自己的域名，获取到相应的SSL证书和私钥即可快速配置

```nginx
server {
    listen 443 ssl;
    server_name www.liyb.com;
 
    ssl_certificate /path/to/your_certificate.pem; # 证书文件路径
    ssl_certificate_key /path/to/your_private.key; # 私钥文件路径
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on; 
    location / {
        root html;
        index index.html index.htm;
    }
}
```

# 五、Nginx常用命令

```nginx
# 重新加载，热重启
nginx -s reload  
# 关闭nginx
nginx -s stop 
# 优雅关闭，等待进程处理完后再关闭
nginx -s quit 
# 检查nginx配置
nginx -t 

# 如果做成了systemd服务，可以使用以下命令来操作nginx

# 重启
systemctl restart nginx

# 停止nginx
systemctl stop nginx

# 启动nginx
systemctl start nginx

# 重新加载nginx
systemctl reload nginx
```

其实nginx是个功能非常丰富的软件，后面文章再对nginx进一步详细讲解。
