# docker 安装

> 环境： Ubuntu 22.04

更新包管理器

```
sudo apt update
```

安装依赖包，以允许 `apt` 包管理器使用 HTTPS

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

添加 Docker 的官方 GPG 密钥

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

添加 Docker APT 仓库

```
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

更新包管理器

```
sudo apt update
```

安装 Docker 引擎

```
sudo apt install docker-ce docker-ce-cli containerd.io
```

验证 Docker 是否安装成功

```
sudo docker run hello-world
```

如果一切正常，将会下载并运行一个简单的容器，并显示 "Hello from Docker!" 的输出。

![image-20230917165939761](https://qn.huat.xyz/mac/202309171659813.png)

将当前用户添加到 `docker` 用户组中，以避免每次运行 Docker 命令时都需要使用 `sudo`：

```
sudo usermod -aG docker $USER
```
