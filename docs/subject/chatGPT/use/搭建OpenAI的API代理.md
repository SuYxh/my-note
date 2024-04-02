# 用Cloudflare Workers搭建OpenAI的API代理

本文介绍如何使用 Cloudflare Workers 作为代理来访问 OpenAI 的 API，这种方法适用于需要在国内环境下访问 OpenAI 的场景。借助 Cloudflare 的免费服务，您几乎可以实现零成本的代理解决方案。

### 背景知识

Cloudflare Workers 提供了一个轻量级的服务器环境，允许您在 Cloudflare 的全球网络上运行 JavaScript 代码。每天有 10 万次的免费请求额度，这对于个人或小型项目来说是足够的。此外，您还可以免费注册域名，并将其用于代理服务。

### 实现思路

主要思路是使用 Cloudflare Workers 来代理 OpenAI 的 API 地址，然后配合自己的域名，从而在国内实现对 OpenAI API 的访问。理论上，这种方法支持所有被认证的网站，而不仅限于 OpenAI。

如果您之前没有使用过 Cloudflare，可以访问官网 [www.cloudflare-cn.com](https://www.cloudflare-cn.com/) 进行了解。本文将重点介绍如何使用 Cloudflare 的 Workers 实现 OpenAI API 的代理。



### 提前准备内容

1. 一个域名（建议直接[阿里云](https://link.juejin.cn/?target=https%3A%2F%2Fwanwang.aliyun.com%2F)或者[新网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.xinnet.com%2F)买一个好了，很多域名一年只需要10块）；

   > 域名买了以后不用备案也可以用

2. 一个 [Cloudflare](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cloudflare.com%2Fzh-cn%2F) 账号，具体注册细节就不多说了，网址： https://dash.cloudflare.com/sign-up 

   



### 实现步骤

#### 添加站点

> 因为后续我们在创建 worker 后绑定自定义域名的时候，这个域名需要在 cloudflare 处于激活状态，才可以绑定，当然你也可以直接在 cloudflare 购买域名，就可以直接跳过这一步

![image-20240401133544748](https://qn.huat.xyz/mac/202404011335770.png)





![image-20240401133641870](https://qn.huat.xyz/mac/202404011336895.png)



您操作完成后，看到的应该是这样： 

![image-20240401133756678](https://qn.huat.xyz/mac/202404011337703.png)



#### 修改域名 DNS【重要】

以我在阿里云买的域名为例【假设你已经购买了域名，域名选购地址： https://wanwang.aliyun.com/domain】

找到域名列表  https://dc.console.aliyun.com/next/index

![image-20240401134035224](https://qn.huat.xyz/mac/202404011340259.png)



 点击购买的的域名

![image-20240401134226511](https://qn.huat.xyz/mac/202404011342561.png)



点击 修改 DNS

![image-20240401134310250](https://qn.huat.xyz/mac/202404011343296.png)

将 DNS 修改为 cloudflare 提供的 DNS， 然后需要等等，大概一两小时吧，成功后 cloudflare 会给你发邮件。

![image-20240401134745355](https://qn.huat.xyz/mac/202404011347391.png)



#### 创建 worker

![image-20240401134907866](https://qn.huat.xyz/mac/202404011349913.png)

> 我这边是已经创建了 2 个



![image-20240401135026029](https://qn.huat.xyz/mac/202404011350082.png)



![image-20240401135113496](https://qn.huat.xyz/mac/202404011351554.png)



直接点部署，worker.js 的代码一会在修改。



#### 编辑 `worker.js`

上传创建完成后可以看到这个按钮：

![image-20240401135237210](https://qn.huat.xyz/mac/202404011352267.png)

或者 点击这里

![image-20240401135401802](https://qn.huat.xyz/mac/202404011354861.png)



![image-20240401135450481](https://qn.huat.xyz/mac/202404011354545.png)

```js
async function handleRequest(request) {
  const url = new URL(request.url);
  url.host = "api.openai.com";
  return fetch(url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });
}
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
```

#### 配置自定义域名



![image-20240401135621297](https://qn.huat.xyz/mac/202404011356352.png)





![image-20240401135706590](https://qn.huat.xyz/mac/202404011357640.png)



这个域名是你刚刚建立网站的域名，你写了 `proxy.xxx.com` 后，cloudflare 会自动去帮你添加一个解析。

⚠️注意：这个域名需要等待cloudflare确认激活成功后，才可以进行绑定。



### 总结

至此便大功告成。等待片刻，应该就可以通过你自己的域名来代替 OpenAI 的 API 地址了，比如在本文的例子中，想要请求 ChatGPT 的 API ，即是把官方 API 地址 `https://api.openai.com/v1/chat/completions` 换为你自己的域名 `https://xxxx.com/v1/chat/completions` ，其他参数均参照官方示例即可。由于 Cloudflare 有每天免费 10 万次的请求额度，所以轻度使用基本是零成本的，当然如果公司使用为了增加并发请求，也可以为此付费。





