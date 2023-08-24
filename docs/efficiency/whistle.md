# whistle

官网： http://wproxy.org/whistle/

## 一、基础教程

1. Whistle 是什么及本地安装

https://juejin.cn/post/6844904167396343815

2. Whistle 之简单使用

https://juejin.cn/post/6844904167408943111

3. Whistle 项目配置文件

https://juejin.cn/post/6844904167400554510

4. Whistle 移动端调试

https://juejin.cn/post/6844904167857717262

## 二、进阶教程

### 常用功能

1. 设置请求 host 代理
2. 设置 http 转 https
3. 抓取 HTTP、HTTPS 请求响应内容
4. 过滤不需要的 url
5. 支持替换本地文件
6. 支持修改接口返回数据
7. 内置调试移动端页面的 weinre 和 log 及扩展 eruda 和 vConsole
8. 修改请求 url、方法、头部、内容及响应状态码、头部、内容等

### 安装启动

#### 安装

```
npm install -g whistle
```

#### 启动

```
# 启动
w2 start
# 重启
w2 restart
# 停止
w2 stop
# 调试运行，插件开发调试时使用
w2 run
```

### 界面介绍

启动后，进入配置页面

```
http://127.0.0.1:8899/
```

界面介绍： http://wproxy.org/whistle/webui/

### 代理安装

#### Chrome 代理设置

安装 Chrome 代理插件：推荐安装[SwitchyOmega]()

备用下载地址：https://github.com/FelisCatus/SwitchyOmega/releases

![img](https://qn.huat.xyz/mac/202308231658098.png)

当访问需要代理页面时，具体操作如下图

![img](https://qn.huat.xyz/mac/202308231658005.gif)

具体操作：

点击 SwitchyOmega → 点击 zhuanzhuan.com → whistle

刷新页面

找到其他红色被安全设置拦截的连接 → 继续访问

注意：所有通过 SwitchyOmega 代理的域名都会出现这个，继续访问就好

[更多配置代理方法](http://wproxy.org/whistle/install.html)

#### Safari 代理设置

Safari 使用的是系统代理，直接在系统代理中配置指向 `127.0.0.1:8899` 即可

#### Https 设置

![img](https://qn.huat.xyz/mac/202308231659765.png)

**注意**：Capture HTTPS CONNECTs 一定要勾上，否则抓不到 https 的包

[更多 Https 配置](http://wproxy.org/whistle/webui/https.html)

### 常用匹配规则

#### 类 host 配置形式

```
# 一、Host
# 1.1 host
#127.0.0.1:8081 m.zhuanzhuan.com

# 1.2 组合模式
#192.168.187.2 m.zhuanzhuan.58.com m.zhuanzhuan.com s1.zhuanstatic.com img1.zhuanstatic.com

# 二、 匹配模式 - 域名、路径、正则、精确匹配、通配符匹配 - 注意：如果operatorURI不为请求路径，pattern和operatorURI位置可以调换

# 2.1 域名匹配 - http、https、ws、wss，tunnel
#127.0.0.1:3000 app.zhuanzhuan.com

# 2.2 http→https
#127.0.0.1:8081 https://m.zhuanzhuan.com

# 2.3 路径匹配
#192.168.187.2 m.zhuanzhuan.com/Mzhuanzhuan/
#192.168.171.123 m.zhuanzhuan.com/platform

# 2.4 正则匹配
#/Mzhuanzhuan/ 192.168.187.2

# 2.5 通配符
# http://*.com/abc/efg file:///User/xxx/test

# 三、请求转发
#m.zhuanzhuan.58.com m.zhuanzhuan.com

# 四、本地替换
#https://m.zhuanzhuan.com file://E:\test-whistle.html

# 五、Key-Value
#https://m.zhuanzhuan.com file://{index.html}

# 六、注入-插入到body底部
#https://m.zhuanzhuan.com html://E:\xx\test\test.html
#https://m.zhuanzhuan.com js://E:\xx\test\test.js
#https://m.zhuanzhuan.com css://E:\xx\test\test.css
#www.baidu.com html://{vConsole.html}
#www.baidu.com js://{test.js}

# 七、远程注入Log-插入到head顶部
#www.baidu.com log://{log.js}

# 八、调式Winer+自定义vConsole和eruda  注意：winer和vConsole不能同时开启
#m.zhuanzhuan.com weinre://test
#www.baidu.com log://{vConsole.js}
#www.baidu.com log://{eruda.js}

# 九、修改数据

# 9.1 修改请求头
#https://m.zhuanzhuan.com reqHeaders://{req-headers}

# 9.2 修改响应头
#https://m.zhuanzhuan.com resHeaders://{res-cors}

# 9.3 设置CORS
# 方法一
#/unionarticledetail/ resCors://{resCors}
# 方法二
#/unionarticledetail/ resHeaders://{res-cors}

# 9.4 模拟jsonp数据
#https://m.zhuanzhuan.com xtpl://{res-jsonp}

# 9.5 模拟json数据
#/getverificationcode/ resCors://{resCORS}  # // 开启跨域允许get，post请求
#/getverificationcode/ xtpl://{jsonp.json}

# 9.6 修改json数据-merge方法
#/getverificationcode/ resHeaders://{res-cors}
#/getverificationcode/ resMerge://{jsonp.json}

# 9.7 修改json数据-replace方法
#/getverificationcode/ resReplace://{res-replace.json}

# 9.8 通过插件whistle.vase模拟数据 - 支持模拟html(ejs等多模板)及json数据
# 9.8.1 模拟随机对象
# vase://random-data /getverificationcode/

# 其中random-data是插件规则文件名
# 规则内容写法
# out(random(
#    {"test": '000'},
#    {"test": '111'},
#    {"test": '222'},
#    {"test": '333'}
# ), 1000);
# 或者直接使用js
# var rand = Math.random();
# out({"test": rand},1000);
# 延时一秒后随机输出一个对象  更多使用方法移步https://github.com/whistle-plugins/whistle.vase
```

#### 过滤

可以同时匹配 url、请求响应头、请求方法、响应状态码、ClientIP 及 ServerIP、请求响应内容

**位置：**

图形界面 → Network → Settings → Filter

```
zhuanzhuan.com
zhuanstatic.com
58cdn.com.cn
58.com
127.0.0.1
```

[详细过滤规则](http://wproxy.org/whistle/webui/settings.html)

#### 配置导入

1、下载规则及其他配置文件

[配置文件.zip](https://gitee.com/ironc/whistle)

2、导入方法

导入规则

![img](https://qn.huat.xyz/mac/202308231706777.png)

导入 value

![img](https://qn.huat.xyz/mac/202308231706984.png)

导入 vase 规则

![img](https://qn.huat.xyz/mac/202308231707261.png)

### 补充

#### 关闭 Chrome 不安全提示

chrome → 设置 → 高级 → 管理证书 → 受信任的根证书颁发机构 → 导入

![img](https://qn.huat.xyz/mac/202308231701004.png)

![img](https://qn.huat.xyz/mac/202308231701688.png)

相关文件： https://gitee.com/ironc/whistle

## 三、技巧汇总

| 方案                                                                                                                                                               | 效果                                                                                                                                        | 提供人 |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :----- |
| 安装插件[inspect](https://github.com/whistle-plugins/whistle.inspect)，配置规则[m.zhuanzhuan.com](http://m.zhuanzhuan.com/) whistle.inspect://e 就能自动注入 eruda | 自动注入 eruda 或者 vConsole 方便调试页面                                                                                                   | 黄家兴 |
| 部分路径配置 host，配置规则 127.0.0.1:8000 [p.zhuanspirit.com](http://performance.zhuanspirit.com/) excludeFilter://\*/api                                         | 指定了该地址访问的 ip 与端口，但是剔除了类似 p.zhuanspirit.com/api/xxx 等路径。适合前后端都部署在一个域名但是需要访问不同的 ip 和端口的情况 | 黄家兴 |

## 四、whistle 功能一览

![whistle](https://qn.huat.xyz/mac/202308231648982.png)
