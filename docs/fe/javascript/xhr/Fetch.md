Fetch API 能够执行 XMLHttpRequest 对象的所有任务，但更容易使用，接口也更现代化，能够在 Web 工作线程等现代 Web 工具中使用。XMLHttpRequest 可以选择异步，而 Fetch API 则必须是异步。Fetch API 是 WHATWG 的一个“活标准”（living standard），用规范原文说，就是“Fetch 标准定义请求、响应，以及绑定二者的流程：获取（fetch）”。

Fetch API 本身是使用 JavaScript 请求资源的优秀工具，同时这个 API 也能够应用在服务线程（service worker）中，提供拦截、重定向和修改通过 fetch()生成的请求接口。

### 基本用法

fetch()方法是暴露在全局作用域中的，包括主页面执行线程、模块和工作线程。调用这个方法，浏览器就会向给定 URL 发送请求。

#### 分派请求

fetch()只有一个必需的参数 。多数情况下，这个参数是要获取资源的 URL。这个方法返回一个 Promise：

```js
let r = fetch("/bar");
console.log(r); // Promise <pending>
```

#### 读取响应

读取响应内容的最简单方式是取得纯文本格式的内容，这要用到 text()方法。这个方法返回一个 Promise，会解决为取得资源的完整内容：

```js
fetch("bar.txt")
  .then((response) => response.text())
  // .then(response => response.json())
  .then((data) => console.log(data));
// bar.txt 的内容
```

#### 处理状态码和请求失败

Fetch API 支持通过 Response 的 status（状态码）和 statusText（状态文本）属性检查响应状态。

```js
fetch("/bar").then((response) => {
  console.log(response.status); // 200
  console.log(response.statusText); // OK
});
```

请求不存在的资源通常会产生值为 404 的状态码。

虽然请求可能失败（如状态码为 500），但都会执行了 Promise 的 then 处理函数

因为服务器没有响应而导致浏览器超时、违反 CORS、无网络连接、HTTPS 错配及其他浏览器/网络策略问题都会执行了 Promise 的 reject 处理函数。

#### 自定义选项

只使用 URL 时，fetch()会发送 GET 请求，只包含最低限度的请求头。要进一步配置如何发送请求，需要传入可选的第二个参数 init 对象。init 对象要按照下表中的键/值进行填充。

![image-20230915165615053](https://qn.huat.xyz/mac/202309151656286.png)

![image-20230915170145781](https://qn.huat.xyz/mac/202309151701813.png)

![image-20230915170208673](https://qn.huat.xyz/mac/202309151702699.png)

![image-20230915170329091](https://qn.huat.xyz/mac/202309151703120.png)

![image-20230915170348107](https://qn.huat.xyz/mac/202309151703139.png)

![image-20230915170413894](https://qn.huat.xyz/mac/202309151704926.png)

### 常见 Fetch 请求模式

XMLHttpRequest 一样，fetch()既可以发送数据也可以接收数据。使用 init 对象参数，可以配置 fetch()在请求体中发送各种序列化的数据。

#### 发送 JSON 数据

```js
let payload = JSON.stringify({
  foo: "bar",
});
let jsonHeaders = new Headers({
  "Content-Type": "application/json",
});
fetch("/send-me-json", {
  method: "POST", // 发送请求体时必须使用一种 HTTP 方法
  body: payload,
  headers: jsonHeaders,
});
```

#### 在请求体中发送参数

```js
let payload = "foo=bar&baz=qux";
let paramHeaders = new Headers({
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
});

fetch("/send-me-params", {
  method: "POST", // 发送请求体时必须使用一种 HTTP 方法
  body: payload,
  headers: paramHeaders,
});
```

#### 发送文件

因为请求体支持 FormData 实现，所以 fetch()也可以序列化并发送文件字段中的文件：

```js
let imageFormData = new FormData();
let imageInput = document.querySelector("input[type='file']");
imageFormData.append("image", imageInput.files[0]);
fetch("/img-upload", {
  method: "POST",
  body: imageFormData,
});
```

这个 fetch()实现可以支持多个文件：

```js
let imageFormData = new FormData();
let imageInput = document.querySelector("input[type='file'][multiple]");
for (let i = 0; i < imageInput.files.length; ++i) {
  imageFormData.append("image", imageInput.files[i]);
}
fetch("/img-upload", {
  method: "POST",
  body: imageFormData,
});
```

#### 加载 **Blob** 文件

Fetch API 也能提供 Blob 类型的响应，而 Blob 又可以兼容多种浏览器 API。一种常见的做法是明确将图片文件加载到内存，然后将其添加到 HTML 图片元素。为此，可以使用响应对象上暴露的 blob()方法。这个方法返回一个 Promise，解决为一个 Blob 的实例。然后，可以将这个实例传给 URL.createObjectUrl()以生成可以添加给图片元素 src 属性的值：

```js
const imageElement = document.querySelector("img");
fetch("my-image.png")
  .then((response) => response.blob())
  .then((blob) => {
    imageElement.src = URL.createObjectURL(blob);
  });
```

#### 发送跨源请求

从不同的源请求资源，响应要包含 CORS 头部才能保证浏览器收到响应。没有这些头部，跨源请求会失败并抛出错误。

```js
fetch("//cross-origin.com");
// TypeError: Failed to fetch
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

如果代码不需要访问响应，也可以发送 no-cors 请求。此时响应的 type 属性值为 opaque，因此无法读取响应内容。这种方式适合发送探测请求或者将响应缓存起来供以后使用。

```js
fetch("//cross-origin.com", { method: "no-cors" }).then((response) =>
  console.log(response.type)
);
// opaque
```

#### 中断请求

Fetch API 支持通过 AbortController/AbortSignal 对中断请求。调用 AbortController. abort()会中断所有网络传输，特别适合希望停止传输大型负载的情况。中断进行中的 fetch()请求会导致包含错误的拒绝。

```js
let abortController = new AbortController();
fetch('wikipedia.zip', { signal: abortController.signal })
  .catch(() => console.log('aborted!');
// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10);
// 已经中断
```
