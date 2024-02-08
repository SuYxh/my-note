# Jenkins 配置

### 安装插件

![image-20230917161319031](https://qn.huat.xyz/mac/202309171613057.png)

![image-20230917161544105](https://qn.huat.xyz/mac/202309171615126.png)

安装： [Publish Over SSH](https://plugins.jenkins.io/publish-over-ssh)

### 系统配置

#### 环境变量

![image-20230917161807201](https://qn.huat.xyz/mac/202309171618220.png)

在服务器上使用 `echo $PATH` 命运打印出环境变量信息，然后复制到这里

#### Github

![image-20230917162024153](https://qn.huat.xyz/mac/202309171620178.png)

Secret Text 来源： 点击 添加 按钮

Secret Text 内容就是 Github 的 `Personal access token`, 地址： https://github.com/settings/tokens

![image-20230917162203923](https://qn.huat.xyz/mac/202309171622951.png)

![image-20230917162110769](https://qn.huat.xyz/mac/202309171621799.png)

#### Publish over SSH

这个就是安装的插件，如果插件(publish over ssh)安装成功后，就会有。

![image-20230917162423396](https://qn.huat.xyz/mac/202309171624424.png)

![image-20230917162732499](https://qn.huat.xyz/mac/202309171627526.png)
