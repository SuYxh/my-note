## 下载 nginx

1、下载后的文件，放到以下目录下
`cd /usr/local`

2、联网的情况下，通过命令下载：
`curl -O http://nginx.org/download/nginx-1.22.1.tar.gz`
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680423323730-d095b67a-e08d-4b48-8d8e-d2e1586a6106.png#averageHue=%23090909&clientId=u0889aa50-12db-4&from=paste&height=443&id=u48b7ba11&originHeight=443&originWidth=957&originalType=binary&ratio=1&rotation=0&showTitle=false&size=92026&status=done&style=none&taskId=ud9439b47-caad-4b84-ad7e-32ef55918f0&title=&width=957)

> 未联网的情况下：http://nginx.org/en/download.html

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680423305210-9aa04a0f-7bb3-4bc5-a599-68e5d96e9628.png#averageHue=%23f6f3f3&clientId=u0889aa50-12db-4&from=paste&height=319&id=u293a375f&originHeight=319&originWidth=597&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25305&status=done&style=none&taskId=uc86788b3-535e-48c3-ad9d-6290b08f54f&title=&width=597)

3、解压
`tar -zxvf nginx-1.22.1.tar.gz`
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680423984325-d143db4c-0936-4cb6-b914-91946ecea98e.png#averageHue=%230d0c0c&clientId=u0889aa50-12db-4&from=paste&height=290&id=u6cac7efa&originHeight=290&originWidth=688&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56808&status=done&style=none&taskId=u84b3c719-9f07-49f3-bebe-63aa09b74b2&title=&width=688)

## 安装所需环境

### 安装 gcc

> 官网下载的 nginx 源码进行编译，编译依赖 gcc 环境

```bash
yum install gcc-c++
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680424469781-13302176-45a0-4507-9d43-8c22d6f4015e.png#averageHue=%23060606&clientId=u0889aa50-12db-4&from=paste&height=611&id=u412005ac&originHeight=611&originWidth=1338&originalType=binary&ratio=1&rotation=0&showTitle=false&size=101660&status=done&style=none&taskId=u26e18c63-1b86-472a-a6b7-65430494bb1&title=&width=1338)

### 安装 pcre pcre-devel

> PCRE(Perl Compatible Regular Expressions) 是一个 Perl 库，包括 perl 兼容的正则表达式库。nginx 依赖 PCRE 库。

```bash
yum install -y pcre pcre-devel
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680424550180-65c068d3-b948-44a0-9191-7028f3fb63e3.png#averageHue=%23060606&clientId=u0889aa50-12db-4&from=paste&height=592&id=u93044f38&originHeight=592&originWidth=1347&originalType=binary&ratio=1&rotation=0&showTitle=false&size=88423&status=done&style=none&taskId=u38012310-ce8e-47b8-bba7-54e7a8a2049&title=&width=1347)

### 安装 zlib

> zlib 适用于数据压缩的函式库，由 Jean-loup Gailly （负责 compression）和 Mark Adler （负责 decompression）开发。 nginx 依赖 zlib 库。

```bash
yum install -y zlib zlib-devel
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680424616472-04c7f8ff-1c54-40d4-9a45-1d9bc7c0cba4.png#averageHue=%23050505&clientId=u0889aa50-12db-4&from=paste&height=869&id=uc7c1afad&originHeight=869&originWidth=1336&originalType=binary&ratio=1&rotation=0&showTitle=false&size=119263&status=done&style=none&taskId=u586f992e-ab6a-4926-84c9-d364f079c63&title=&width=1336)

### 安装 OpenSSL

> OpenSSL 是一个开放源代码的软件库包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连接者的身份。这个包广泛被应用在互联网的网页服务器上。Nginx 也依赖 OpenSSL，需要在 Centos 安装此库。

```bash
yum install -y openssl openssl-devel
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680424693715-16ca6d0b-bcb3-4064-b7d1-846062c1ef81.png#averageHue=%230a0a0a&clientId=u0889aa50-12db-4&from=paste&height=827&id=ua980532a&originHeight=827&originWidth=1338&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219357&status=done&style=none&taskId=u5626f0ce-f867-4e70-ae38-d12da9ee4d6&title=&width=1338)

##

配置 Nginx

```bash
cd /usr/local/nginx-1.22.1
./configure
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680424807316-4c075a2a-cfe8-454d-ae63-2a242301e477.png#averageHue=%23080808&clientId=u0889aa50-12db-4&from=paste&height=805&id=ue1cd6eac&originHeight=805&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&size=135994&status=done&style=none&taskId=ufce58985-bd3a-48b7-939b-d1fbf62eb94&title=&width=937)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680424817628-e0778751-869b-4548-8c65-69451f97a9a4.png#averageHue=%230b0b0b&clientId=u0889aa50-12db-4&from=paste&height=358&id=u4ed05c07&originHeight=358&originWidth=784&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56171&status=done&style=none&taskId=u79bf9c21-11d2-4547-b0bd-a9627ffa5ba&title=&width=784)

## 编译、安装

```bash
make
make install
```

**查找安装路径**
`whereis nginx`
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680424906259-d7c368d5-ec8a-4c39-acfc-7b891017cda2.png#averageHue=%23121212&clientId=u0889aa50-12db-4&from=paste&height=54&id=u85a45fff&originHeight=54&originWidth=443&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7780&status=done&style=none&taskId=u47d9c5a6-867e-4f37-b498-12c529cad31&title=&width=443)

## 查看配置文件

```bash
vi /usr/local/nginx/conf/nginx.conf
```

```bash

#user  nobody;
worker_processes  auto;

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
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
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

## 开放访问端口

> 如果 nginx 配置中使用到的端口未打开，则需要先开启端口

```bash
# 查看防火墙状态
systemctl status firewalld
#--permanent永久生效，没有此参数重启后失效
firewall-cmd --zone=public --add-port=9000/tcp --permanent
#重新载入配置
firewall-cmd --reload
#查看已经开启的端口
firewall-cmd --zone=public --list-ports
```

## 设置开机自启

```bash
vi /lib/systemd/system/nginx.service

```

nginx.service 内添加以下内容：

```bash
Description=nginx - high performance web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
[Install]
WantedBy=multi-user.target
```

使配置生效

```bash
systemctl daemon-reload
```

设置开机启动

```bash
systemctl enable nginx.service
```

**启动、停止 Nginx**

### 启动

```bash
/usr/local/nginx/sbin/nginx
```

### 查询 nginx 进程

```bash
ps -ef | grep nginx
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680425415836-b6d0763f-4869-4622-baa0-418c5884b58a.png#averageHue=%23131111&clientId=u0889aa50-12db-4&from=paste&height=101&id=u416ffe48&originHeight=101&originWidth=771&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24816&status=done&style=none&taskId=ub71ce205-ea1e-4463-b9e0-4ccad5d27bc&title=&width=771)

### 停止 nginx

```bash
/usr/local/nginx/sbin/nginx -s quit
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680425486014-43d021c7-cd80-4575-a6ca-9bf1cfc2a6e1.png#averageHue=%23181717&clientId=u0889aa50-12db-4&from=paste&height=63&id=ucfef6521&originHeight=63&originWidth=578&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14698&status=done&style=none&taskId=u39ecb5ba-e38b-414e-98d3-3cb317c5912&title=&width=578)

### 强制停止 nginx

```bash
/usr/local/nginx/sbin/nginx -s stop
```

### 重新加载配置文件

```bash
/usr/local/nginx/sbin/nginx -s reload
```

### 重启 Nginx

```bash
/usr/local/nginx/sbin/nginx -s quit
/usr/local/nginx/sbin/nginx
```

## 访问 Nginx

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680425595101-9c5a588d-8041-4f18-80ff-6de227f1e320.png#averageHue=%23f8f8f8&clientId=u0889aa50-12db-4&from=paste&height=356&id=u08cae6a9&originHeight=356&originWidth=1019&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37489&status=done&style=none&taskId=ubb27dcf1-f8f9-4589-8e0d-975047fe311&title=&width=1019)

## 配置 nginx

```bash

worker_processes  auto;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

     server {
        listen       80;
        server_name  120.46.190.74;

        charset utf-8;

        location / {
            root   html;
            index  index.html index.htm;
        }

        location /admin {
            root   html/admin;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

server {
        listen       80;
        server_name  test1.ironc.cn;

        charset utf-8;

        location / {
            root   html/test1;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


server {
        listen       80;
        server_name  test2.ironc.cn;

        charset utf-8;

        location / {
            root   html/test2;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


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

效果如下：
1、输入 IP
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680428233143-7d0d69aa-32e3-4db8-ba0a-6620f2f78894.png#averageHue=%23f4f4f4&clientId=u64695e54-3cf1-4&from=paste&height=328&id=u0328ce8d&originHeight=328&originWidth=713&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33832&status=done&style=none&taskId=u3a3debb2-d345-4495-94a3-5e9dc8a8ca1&title=&width=713)

2、输入 IP/admin

3、[http://test1.ironc.cn/](http://test1.ironc.cn/)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680429009138-a102edf2-173a-4c27-bb99-324603ad187e.png#averageHue=%23f9f9f9&clientId=u64695e54-3cf1-4&from=paste&height=244&id=u24dd7796&originHeight=244&originWidth=754&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13507&status=done&style=none&taskId=uf5428f51-fa37-4b58-9d6c-525adfe117f&title=&width=754)

4、[http://test2.ironc.cn/](http://test2.ironc.cn/)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1680429028018-95c8261a-8fed-48e4-9993-bdc3f215ede4.png#averageHue=%23f8f8f8&clientId=u64695e54-3cf1-4&from=paste&height=234&id=uc57bd277&originHeight=234&originWidth=709&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13050&status=done&style=none&taskId=u9eb94617-9086-43c8-8a81-3e68b05c20b&title=&width=709)

## 参考

1、centos 安装 nginx
[https://www.cnblogs.com/lushichao/p/16889862.html](https://www.cnblogs.com/lushichao/p/16889862.html)

手把手教你 Nginx 配置 HTTPS 完整过程
[https://blog.csdn.net/u012486840/article/details/120940761](https://blog.csdn.net/u012486840/article/details/120940761)
