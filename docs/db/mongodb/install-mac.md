文章内容参考自菜鸟教程：[相关链接](https://www.runoob.com/mongodb/mongodb-osx-install.html)。只是本人在安装时，对一些必要步骤进行了截图，以便更加明了清晰。同时，也指出了可能会踩到的一些坑。

## 第一步：安装方法

### MongoDB 官网下载安装包

1.  点击官网[下载地址](https://www.mongodb.com/try/download/community)

![截屏2022-01-13 11.12.53.png](https://qn.huat.xyz/mac/202310242107655.awebp)

如图，点击**Download**下载按钮即可，其配置选项会根据用户笔记本系统自行选择，默认就行。

2.  将下载好的 MongoDB 安装包解压缩，并将文件夹名改为 mongodb（可改成自己想要的任何名字）。

![截屏2022-01-13 11.19.47.png](https://qn.huat.xyz/mac/202310242107422.awebp)

![截屏2022-01-13 11.34.58.png](https://qn.huat.xyz/mac/202310242107294.awebp)

3.  按快捷键 _Command + Shift + G_ 打开*前往文件夹*弹窗，然后输入路径： /usr/local，并点击前往按钮。

![截屏2022-01-13 11.45.18.png](https://qn.huat.xyz/mac/202310242107016.awebp)

4.  将 mongodb 文件夹拖入 local 文件夹中，自此安装完成。

![截屏2022-01-13 11.52.45.png](https://qn.huat.xyz/mac/202310242107035.awebp)

### 在终端使用 curl 命令来下载安装

1.  进入 /usr/local

```
cd /usr/local
```

2.  下载

```
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.5.tgz
```

3.  解压

```
sudo tar -zxvf mongodb-macos-x86_64-5.0.5.tgz
```

4.  重命名为 mongodb 目录

```
sudo mv mongodb-macos-x86_64-5.0.5/ mongodb
```

当然，大家若是安装了**HomeBrew**，也可以通过 brew 命令来安装 mongodb，这里就不细说了，感兴趣的小伙伴可以自行百度了解。

## 第二步： 配置 moogodb 环境变量

1.  打开终端，输入命令：`cd ~` 到当前用户的家目录。
2.  打开 .zshrc 文件：`open ~/.zshrc`，若没有此文件，就创建一个：`touch .zshrc`。

    注意你当前使用的 mac 终端是 bash 还是 zsh。

    - bash 使用 .bash_profile 文件
    - zsh 使用 .zshrc 文件

3.  把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中。

变量如下：

```
export PATH=/usr/local/mongodb/bin:$PATH
```

将变量添加到文件中：

![截屏2022-01-13 14.12.12.png](https://qn.huat.xyz/mac/202310242107232.awebp)

4.  使用命令 `source ~/.zshrc` 使配置生效。

## 第三步：创建日志及数据存放的目录

- 数据存放路径

```
sudo mkdir -p /usr/local/var/mongodb
```

- 日志文件路径

```
sudo mkdir -p /usr/local/var/log/mongodb
```

- 确保当前用户对以上两个目录有读写的权限

```
sudo chown xxx /usr/local/var/mongodb
sudo chown xxx /usr/local/var/log/mongodb
```

xxx 表示你电脑上的当前用户。

## 第五步：在后台启动 mongodb

- *\--dbpath*  表示设置数据存放目录
- *\--logpath*  表示设置日志存放目录
- _\--fork_ 表示在后台运行

1.  命令启动（每次开机都要输入下面这一长串的命令启动 mongodb，一点也不方便）

```
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
```

2.  配置文件启动（谁不喜欢这种简便的方式呢）

```
mongod --config /usr/local/etc/mongod.conf
```

通过设置配置文件启动 mongodb，需要你先创建一个文件 mongod.conf，然后在文件中写入配置。具体步骤如下：

1.  打开终端，切换到 /usr/local/etc 在文件夹下

```
cd /usr/local/etc
```

2.  创建 mongod.conf 文件

```
touch mongod.conf
```

3.  编辑配置文件 mongod.conf

```
vim /usr/local/etc/mongod.conf
```

写入如下配置：

![截屏2022-01-17 14.43.12.png](https://qn.huat.xyz/mac/202310242107826.awebp)

配置完成，以后再也不用输入一大串命令了。

## 第六步：连接 mongodb

在终端输入命令：`mongo`，出现如下图字样，即说明连接服务成功。

![截屏2022-01-13 14.35.03.png](https://qn.huat.xyz/mac/202310242107465.awebp)

或者直接使用代码链接

```js
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/app", (err) => {
  if (err) {
    console.log("数据库启动失败");
  } else {
    console.log("数据库启动成功");
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  }
});
```

## 补充

我们在操作 **MongoDB** 数据库时，若需要对数据进行备份(mongodump)或恢复(mongorestore)，则需要去官网下载 [MongoDB 数据库工具](https://www.mongodb.com/try/download/relational-migrator)。安装过程也很简单，就是将下载好的工具包解压缩，然后将里面的文件复制到你所安装的 mongodb 的 bin 目录下即可。
