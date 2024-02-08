# 前端项目配置

### 新建项目

![image-20230917162850969](https://qn.huat.xyz/mac/202309171628998.png)

![image-20230917162947667](https://qn.huat.xyz/mac/202309171629687.png)

### 配置代码仓库

![image-20230917163057318](https://qn.huat.xyz/mac/202309171630342.png)

### 配置源码管理

![image-20230917163309511](https://qn.huat.xyz/mac/202309171633543.png)

![image-20230917163410983](https://qn.huat.xyz/mac/202309171634012.png)

### 构建触发器

![image-20230917163504329](https://qn.huat.xyz/mac/202309171635357.png)

### Build Steps

#### 执行 shell

![image-20230917163604985](https://qn.huat.xyz/mac/202309171636011.png)

echo $PATH： 服务器的环境变量
echo $WORKSPACE： 当前项目在使用 jenkins 部署时在服务上的地址，可以使用 `cd`命令切换去看看

#### Send files or execute commands over SSH

![image-20230917163750076](https://qn.huat.xyz/mac/202309171637097.png)

`Source files：dist/**` 项目源码，一般都是打包在放在 dist 文件夹下

`Remote directory: /page/github-aaa-tmp`: 服务器上的文件夹，这里一般是 nginx 的静态资源文件夹， 【为什么是 github-aaa-tmp ？ 】

`Exec command` ： 执行的命令

```shell
# 先删除原来的
rm -rf /root/page/github-aaa
# 前面的配置将源码上传到了 github-aaa-tmp 这里将源码拷贝到  github-aaa
mv /root/page/github-aaa-tmp/dist /root/page/github-aaa
# 最后删除 github-aaa-tmp
rm -rf /root/page/github-aaa-tmp
```

### webhook

经过上面的配置后 ， 这里会自动添加 webhook

![image-20230917164424131](https://qn.huat.xyz/mac/202309171644171.png)

![image-20230917164530007](https://qn.huat.xyz/mac/202309171645040.png)

### docker

1、安装 docker

2、拉取 nginx 镜像

```
docker pull nginx
```

3、启动镜像

```
docker run -d -p 80:80 -v /var/lib/jenkins/workspace/github-aaa/dist:/usr/share/nginx/html/github-aaa nginx
```

/var/lib/jenkins/workspace/github-aaa/dist: 表示源码的位置， 该路径可以使用在部署的时候添加命令 `echo $WORKSPACE` 进行打印出来

/usr/share/nginx/html/github-aaa： 表示 docker 镜像 nginx 的 github-aaa 文件夹的文件使用 /var/lib/jenkins/workspace/github-aaa/dist 里面的文件。nginx 镜像里面的路径可以使用命令`docker exec -it 3385487e348c bash  ` 进入到这个镜像中进行查看

查看镜像

```
docker ps
```

停止镜像

```
docker stop <容器ID或容器名称>

# 停止多个容器
docker stop $(docker ps -q)
```

启动镜像

```
docker start <容器ID或容器名称>

# 重新启动所有已停止的容器, 这将使用 docker ps -aq --filter "status=exited" 命令获取所有已停止的容器的ID，并将其传递给 docker start 命令。
docker start $(docker ps -aq --filter "status=exited")
```

重启镜像

```
docker restart <容器ID或容器名称>
```

### 效果展示

当我们配置结束后，项目在 git push 的时候就会触发构建，效果图如下：

> 此时不要在使用 github action, 可能出现一些问题

![image-20230917165056537](https://qn.huat.xyz/mac/202309171650572.png)

![image-20230917165120156](https://qn.huat.xyz/mac/202309171651187.png)

当我们去刷新页面的时候就能够看到 http://8.131.87.46/github-aaa/， 页面进行了更新

> 这里需要将静态资源文件放在 nginx 下
