![基本操作](https://qn.huat.xyz/mac/202404131850557.png)



仓库地址： https://github.com/SuYxh/docker-study



- [docker部署基础node项目](https://github.com/SuYxh/docker-study/blob/main/1.docker%E9%83%A8%E7%BD%B2%E5%9F%BA%E7%A1%80node%E9%A1%B9%E7%9B%AE/README.md)
- [docker部署基础node项目-env](https://github.com/SuYxh/docker-study/blob/main/2.docker%E9%83%A8%E7%BD%B2%E5%9F%BA%E7%A1%80node%E9%A1%B9%E7%9B%AE-env/README.md)
- [docker部署基础node项目-挂载](https://github.com/SuYxh/docker-study/blob/main/3.docker%E9%83%A8%E7%BD%B2%E5%9F%BA%E7%A1%80node%E9%A1%B9%E7%9B%AE-%E6%8C%82%E8%BD%BD/README.md)
- [docker部署express和MySQL](https://github.com/SuYxh/docker-study/blob/main/4.docker%E9%83%A8%E7%BD%B2express%E5%92%8CMySQL/README.md)
- [docker部署express和MySQL和Redis](https://github.com/SuYxh/docker-study/blob/main/5.docker%E9%83%A8%E7%BD%B2express%E5%92%8CMySQL%E5%92%8CRedis/README.md)
- [docker部署Vue项目](https://github.com/SuYxh/docker-study/blob/main/6.docker%E9%83%A8%E7%BD%B2Vue%E9%A1%B9%E7%9B%AE/README.md)



### **构建镜像**

语法：

```shell
docker build -t <your-dockerhub-username>/<your-image-name>:<tag> .
```

示例：

```shell
docker build -t jarvis0426/chatgpt-web-service-base:1.0.0 .
```

解析：

- `docker build`: 这是 Docker 的构建命令，用于从 Dockerfile 创建镜像。
- `-t` 参数用于为构建的镜像指定一个标签（tag）。这个标签通常包括仓库名、镜像名和版本号，格式为 `<repository>/<image-name>:<tag>`。在您的例子中，`jarvis0426` 是 Docker Hub 的用户名，`chatgpt-web-service-base` 是镜像的名称，`1.0.0` 是版本号。
- `.`: 这指定了 Dockerfile 的位置。在这个例子中，`.` 表示当前目录，意味着 Docker 将在当前目录下查找名为 `Dockerfile` 的文件，并使用它来构建镜像。



其他常见参数：

- `--file` 或 `-f`: 指定要使用的 Dockerfile 路径。默认情况下，Docker 会在当前目录下查找名为 `Dockerfile` 的文件。如果您的 Dockerfile 位于不同的位置或有不同的名称，您可以使用这个参数指定它。例如：`docker build -f path/to/your/Dockerfile .`
- `--build-arg`: 设置构建时的变量。这些变量可以在 Dockerfile 中使用，通常用于传递敏感信息或配置数据。例如：`docker build --build-arg API_KEY=your_api_key .`
- `--no-cache`: 构建镜像时不使用缓存。这确保了每一层都将重新构建，有助于获取最新的依赖和更新。例如：`docker build --no-cache -t my-image .`
- `--pull`: 总是尝试从远程仓库拉取更新的基础镜像，即使本地已经有了该镜像。这有助于确保基础镜像是最新的。例如：`docker build --pull -t my-image .`
- `--rm`: 构建完成后删除临时容器。这是默认行为，但如果您之前更改过此设置，可以使用此参数确保临时容器被清理。例如：`docker build --rm -t my-image .`





接下来，我将继续介绍更多关于 Docker 的常用操作和命令。

### **启动容器**

语法：

```shell
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

示例：

```shell
docker run -d -p 5000:5000 --name myapp jarvis0426/chatgpt-web-service-base:1.0.0
```

解析：

- `docker run`: 这是启动 Docker 容器的命令。
- `-d`: 后台运行容器，并返回容器 ID。
- `-p 5000:5000`: 将容器内部的 5000 端口映射到主机的 5000 端口。
- `--name myapp`: 为运行的容器指定一个名称 `myapp`。
- `jarvis0426/chatgpt-web-service-base:1.0.0`: 指定要运行的镜像。

其他常见参数：

- `--env` 或 `-e`: 设置环境变量。例如：`docker run -e MY_VAR=my_value my-image`
- `--volume` 或 `-v`: 挂载卷，用于数据持久化或目录共享。例如：`docker run -v /host/path:/container/path my-image`
- `--restart`: 设置重启策略。例如：`docker run --restart=always my-image`

### **查看容器信息**

语法：

```shell
docker ps [OPTIONS]
```

示例：

```shell
docker ps -a
```

解析：

- `docker ps`: 显示运行中的容器。
- `-a`: 显示所有容器，包括未运行的。

### **停止和删除容器**

语法：

```shell
docker stop CONTAINER
docker rm CONTAINER
```

示例：

```shell
docker stop myapp
docker rm myapp
```

解析：

- `docker stop`: 停止一个运行中的容器。
- `docker rm`: 删除一个容器。如果容器正在运行，需要先停止。



### 停止和删除所有容器

```
docker rm $(docker stop $(docker ps -a -q))
```



### **查看镜像和删除镜像**

语法：

```shell
docker images
docker rmi IMAGE
```

示例：

```shell
docker images
docker rmi jarvis0426/chatgpt-web-service-base:1.0.0
```

解析：

- `docker images`: 列出本地的所有镜像。
- `docker rmi`: 删除一个镜像。



强制删除

```
docker image rm -f c502452cef3c
```



清理未使用的镜像

如果您想清理所有悬空（未被任何容器引用）的镜像，可以使用 Docker 的垃圾收集命令：

```sh
docker image prune
```

这会删除所有未被标记和未被任何容器引用的镜像。要删除特定未使用的镜像，您可以结合过滤器使用：

```sh
docker image prune -a --filter "until=24h"
```

这个命令将删除所有创建时间超过24小时的未使用镜像。

在处理镜像删除时，请确保您不会意外删除正在使用或未来可能需要的镜像。如果不确定，最好先单独删除每个标签，以避免数据丢失。



### 删除所有镜像

```
docker rmi $(docker images -q)
```





### **容器日志**

语法：

```shell
docker logs CONTAINER
```

示例：

```shell
docker logs myapp
```

解析：

- `docker logs`: 获取容器的日志输出。

### **进入容器**

#### 方式一

要进入正在运行的 Docker 容器并与其交互，您可以使用 `docker exec` 命令配合 `-it` 参数，这将允许您开启一个交互式终端。如果您想要进入名为 `my-node-app-test` 的容器，通常使用的命令是：

```sh
docker exec -it my-node-app-test /bin/sh
```

这里的命令解释如下：

- `docker exec`: 运行一个命令在运行中的容器里。
- `-it`: 这个参数组合是 `-i` 和 `-t` 的缩写，`-i` 表示开启交互式模式，允许您与容器进行交互；`-t` 分配一个伪终端，这让您感觉就像在使用一个常规终端一样。
- `my-node-app-test`: 指定要进入的容器的名称。
- `/bin/sh`: 在容器中执行的命令，这里是启动一个 shell。根据容器内部的 Linux 发行版，您也可以尝试使用 `/bin/bash`，但在大多数基于 Alpine 的容器（如您的示例中所用的 `node:18-alpine`）中，默认的 shell 是 `sh`。

一旦执行这个命令，您将会进入容器的终端，可以浏览文件系统、运行命令、查看日志文件等等。当您完成操作并想退出容器时，可以简单地键入 `exit`。

这种方法是处理容器问题、进行故障诊断或容器内部探索的常用技巧。



#### 方式二

要查看在 Docker 容器中的文件内容，您可以使用 `docker exec` 命令来执行容器内部的命令，比如 `cat`，来查看文件内容。以下是步骤和命令示例：

##### 运行容器

假设您已经按照前面的指示构建并运行了容器，容器名为 `my-node-app-test`。如果还未运行，可以使用如下命令启动：

```sh
docker run -d -p 3002:3002 --name my-node-app-test jarvis0426/my-node-app:test1.0.0
```

##### 查看文件内容

运行下面的命令来查看容器内 `/usr/src/app/env` 文件的内容：

```sh
docker exec my-node-app-test cat /usr/src/app/env
```

这个命令的组成如下：

- `docker exec`: 这个命令用于在运行中的容器内执行命令。
- `my-node-app-test`: 指定要在其中执行命令的容器的名称。
- `cat /usr/src/app/env`: `cat` 是一个查看文件内容的命令，`/usr/src/app/env` 是要查看的文件的路径。



### 推送镜像

```
docker login
docker tag chatgpt-web-service:latest yourusername/chatgpt-web-service:latest
docker push yourusername/chatgpt-web-service:latest
```

如果您在构建镜像时已经使用了完整的名称（包括用户名和仓库名），那么在推送到 Docker Hub 之前，您不一定需要执行 `docker tag` 命令。
