# Docker 使用

拉取镜像

```
docker pull nginx
```

查看镜像

```
docker images
```

删除镜像

```
docker rmi nginx
```

运行镜像

```
docker run -d -p 80:80 nginx
```

进入镜像

```
docker exec -it 3385487e348c bash
```

3385487e348c: 为镜像 id，可以通过 `docker ps` 查看

查看运行的镜像

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
