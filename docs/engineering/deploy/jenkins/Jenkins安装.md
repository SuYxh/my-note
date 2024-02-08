# Jenkins 安装

> 环境： Ubuntu 22.04

### 安装 java 环境

检查系统上是否安装了 Java

```js
java --version
```

如果没有安装 Java，则会得到以下输出:

![image-20230917160027277](https://qn.huat.xyz/mac/202309171600306.png)

执行如下命令， 进行安装 Java

```js
sudo apt install -y openjdk-17-jre-headless
```

安装完成后，再次验证 Java 是否已安装

![image-20230917160141049](https://qn.huat.xyz/mac/202309171601077.png)

### 下载安装 jenkins

去官网查看安装方法：

> https://www.jenkins.io/download/

![image-20230917160322694](https://qn.huat.xyz/mac/202309171603712.png)

![image-20230917160350277](https://qn.huat.xyz/mac/202309171603294.png)

这里已经安装过 java 环境

依此执行：

```
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null
```

```
 echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
```

```
sudo apt-get update
sudo apt-get install jenkins
```

安装完成后，Jenkins 应该会自动启动，执行如下命令确认

```js
systemctl status jenkins
```

![image-20230917160611844](https://qn.huat.xyz/mac/202309171606864.png)

如果 Jenkins 没有运行，执行以下命令启动它

```
sudo systemctl start jenkins
```

### 配置防火墙规则

Jenkins 本机侦听端口 8080，如果您在启用了 UFW 的服务器上安装了 Jenkins，则需要打开该端口以允许通信。

先查看一下

```js
sudo ufw status
```

![image-20230917160834687](https://qn.huat.xyz/mac/202309171608712.png)

如果没有开启，就开启一下, 在防火墙上打开端口 8080

```js
sudo ufw allow 8080/tcp
```

重新加载防火墙

```
sudo ufw reload
```

Ubuntu 22.04 / 20.04 LTS 上启用防火墙， 应该是已经启用了

```
sudo ufw enable
```

### 使用 GUI 设置 Jenkins

访问服务器地址： http://server-IP:8080

复制密码并将其粘贴到所示的文本字段中，然后单击 继续 按钮。

![image-20230917102336467](https://qn.huat.xyz/mac/202309171023508.png)

下一步，为了简单起见，选择安装建议的插件。

![image-20230917102429610](https://qn.huat.xyz/mac/202309171024650.png)

之后，将开始安装 Jenkins 所需的必要插件。

![image-20230917102536648](https://qn.huat.xyz/mac/202309171025691.png)

安装完插件后，安装程序将带您到下一节，在那里您将需要创建一个 Admin 用户

![image-20230917102742673](https://qn.huat.xyz/mac/202309171027698.png)

username： yangxinhao

密码： yangxinhao

邮箱： y170088888@163.com

下一步将填充 Jenkin 实例的默认 URL，不需要任何操作，只需单击 Save and Finish

![image-20230917102832539](https://qn.huat.xyz/mac/202309171028564.png)

最后，单击 Start using Jenkins 按钮来访问 Jenkins

![image-20230917102924696](https://qn.huat.xyz/mac/202309171029729.png)

进入 Jenkin 的主面板，如图所示

![image-20230917102948002](https://qn.huat.xyz/mac/202309171029037.png)
