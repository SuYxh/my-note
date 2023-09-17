## 生成密钥

```javascript
ssh-keygen -t ed25519 -C "y170088888@163.com"
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1798151/1683038608005-28ca137e-8326-44ef-8f94-ccb335552943.png#averageHue=%23080808&clientId=u8557771b-2603-4&from=paste&height=356&id=u78e79b9e&originHeight=712&originWidth=1104&originalType=binary&ratio=2&rotation=0&showTitle=false&size=109441&status=done&style=none&taskId=u358190f7-9b3f-47bc-96c9-81aac2c6dfc&title=&width=552)

本地执行生成密钥对指令，生成的密钥位于~/.ssh 目录中，此处生成的公钥为 id_ed25519.pub，密钥为 id_ed25519

## 修改本地 SSH 配置

`vim ~/.ssh/config`
没有就新建一个

```javascript
Host huaweiyun # 登录的服务器别名
  HostName 233.233.233.233  # 要登录的服务器ip
  User root   # 登录名
  IdentityFile ~/.ssh/id_rsa # 你的私钥路径
  ServerAliveInterval 30
  TCPKeepAlive yes
```

## 修改服务器配置

`cat ~/.ssh/id_ed25519.pub` 复制本地生成的公钥内容，粘贴到云服务器的 `~/.ssh/authorized_keys` 文件中

## 链接服务器

`ssh huaweiyun`
本地终端可以免密登录
