Fetch API 能够执行 XMLHttpRequest 对象的所有任务，但更容易使用，接口也更现代化，能够在 Web 工作线程等现代 Web 工具中使用。XMLHttpRequest 可以选择异步，而 Fetch API 则必须是异步。Fetch API 是 WHATWG 的一个“活标准”（living standard），用规范原文说，就是“Fetch 标准定义请求、响应，以及绑定二者的流程：获取（fetch）”。

Fetch API 本身是使用 JavaScript 请求资源的优秀工具，同时这个 API 也能够应用在服务线程（service worker）中，提供拦截、重定向和修改通过 fetch()生成的请求接口。



### 区别

fetch()的功能与 XMLHttpRequest 基本相同，但有三个差异：

1. fetch使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁；
2. fetch采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，`XMLHttpRequest` 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码；
3. fetch通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。`XMLHTTPRequest` 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来；



### 基本用法

fetch()方法是暴露在全局作用域中的，包括主页面执行线程、模块和工作线程。调用这个方法，浏览器就会向给定 URL 发送请求。

#### 发送请求

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



### **Response**

Response 对象的同步属性

fetch()请求成功以后，得到的是一个 [Response 对象](https://developer.mozilla.org/en-US/docs/Web/API/Response)。它对应服务器的 HTTP 回应。

```JavaScript
const response = await fetch(url);
```

Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。

```JavaScript
async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status); 
  console.log(response.statusText);
}
```

`response.status`和`response.statusText`就是 Response 的同步属性，可以立即读取。

#### **标头信息**

`Response.ok`

`Response.ok`属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码；

`Response.status`

`Response.status`属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）；

`Response.statusText`

`Response.statusText`属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）；

`Response.url`

`Response.url`属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL;

`Response.type`

`Response.type`属性返回请求的类型。可能的值如下：

- basic：普通请求，即同源请求；
- cors：跨域请求；
- error：网络错误，主要用于 Service Worker；
- opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值。表示发出的是简单的跨域请求，类似`<form>`表单的那种跨域请求；
- opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值；

`Response.redirected`

`Response.redirected`属性返回一个布尔值，表示请求是否发生过跳转。

#### **判断请求是否成功**

fetch()发出请求以后，有一个很重要的注意点：**只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功**。

这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。

##### Response.status

`Response.status`属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。

```JavaScript
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```

`response.status`属性只有等于 2xx （200~299），才能认定请求成功。这里不用考虑网址跳转（状态码为 3xx），因为fetch()会将跳转的状态码自动转为 200。

##### response.ok是否为true

```JavaScript
if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}
```

##### **Response.headers**

Response 对象还有一个Response.headers属性，指向一个 [Headers 对象](https://developer.mozilla.org/en-US/docs/Web/API/Headers)，对应 HTTP 回应的所有标头。

Headers 对象可以使用for...of循环进行遍历。

```JavaScript
const response = await fetch(url);

for (let [key, value] of response.headers) { 
  console.log(`${key} : ${value}`);  
}

// 或者
for (let [key, value] of response.headers.entries()) { 
  console.log(`${key} : ${value}`);  
}
```

Headers 对象提供了以下方法，用来操作标头。

```JavaScript
Headers.get()：根据指定的键名，返回键值。
Headers.has()： 返回一个布尔值，表示是否包含某个标头。
Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。
Headers.append()：添加标头。
Headers.delete()：删除标头。
Headers.keys()：返回一个遍历器，可以依次遍历所有键名。
Headers.values()：返回一个遍历器，可以依次遍历所有键值。
Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。
Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。
```

这些方法中，最常用的是`response.headers.get()`，用于读取某个标头的值。

```JavaScript
let response =  await  fetch(url);  
response.headers.get('Content-Type')
// application/json; charset=utf-8
```

`Headers.keys()`和`Headers.values()`方法用来分别遍历标头的键名和键值。

```JavaScript
// 键名
for(let key of myHeaders.keys()) {
  console.log(key);
}

// 键值
for(let value of myHeaders.values()) {
  console.log(value);
}
```

Headers.forEach()方法也可以遍历所有的键值和键名。

```JavaScript
let response = await fetch(url);
response.headers.forEach(
  (value, key) => console.log(key, ':', value)
);
```

#### **读取内容的方法**

Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

- response.text()：得到文本字符串；
- response.json()：得到 JSON 对象；
- response.blob()：得到二进制 Blob 对象；
- response.formData()：得到 FormData 表单对象；
- response.arrayBuffer()：得到二进制 ArrayBuffer 对象；

这5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。

##### response.text()

`response.text()`可以用于获取文本数据，比如 HTML 文件。

```JavaScript
const response = await fetch('/users.html');
const body = await response.text();
document.body.innerHTML = body
```

##### response.json()

`response.json()`主要用于获取服务器返回的 JSON 数据。

##### response.formData()

`response.formData()`主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。

##### response.blob()

`response.blob()`用于获取二进制文件。

```JavaScript
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```

上面示例读取图片文件flower.jpg，显示在网页上。

##### response.arrayBuffer()

`response.arrayBuffer()`主要用于获取流媒体文件。

```JavaScript
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = decodeData;
source.connect(audioCtx.destination);
source.loop = true;
source.start(0);
```

上面示例是response.arrayBuffer()获取音频文件song.ogg，然后在线播放的例子。

#### **Response.clone**

Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。

```JavaScript
let text =  await response.text();
let json =  await response.json();  // 报错
```

上面示例先使用了`response.text()`，就把 Stream 读完了。后面再调用`response.json()`，就没有内容可读了，所以报错。

Response 对象提供`Response.clone()`方法，创建Response对象的副本，实现多次读取。

```JavaScript
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```

上面示例中，`response.clone()`复制了一份 Response 对象，然后将同一张图片读取了两次。

#### **Response.body**

`Response.body`属性是 Response 对象暴露出的底层接口，返回一个 `ReadableStream` 对象，供用户操作。

它可以用来分块读取内容，应用之一就是显示下载的进度。

```JavaScript
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

`response.body.getReader()`方法返回一个遍历器。这个遍历器的read()方法每次返回一个对象，表示本次读取的内容块。

这个对象的done属性是一个布尔值，用来判断有没有读完；value属性是一个 arrayBuffer 数组，表示内容块的内容，而value.length属性是当前块的大小。

### **定制 HTTP 请求**

fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求

```JavaScript
fetch(url, optionObj)
```

HTTP 请求的方法、标头、数据体都在这个对象里面设置。

#### **POST 请求**

```JavaScript
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```

配置对象用到了三个属性。

```JavaScript
method：HTTP 请求的方法，POST、DELETE、PUT都在这个属性设置。
headers：一个对象，用来定制 HTTP 请求的标头。
body：POST 请求的数据体。
```

注意，有些标头不能通过headers属性设置，比如`Content-Length`、Cookie、Host等等。它们是由浏览器自动生成，无法修改。



#### **提交** **JSON** **数据**

```JavaScript
const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});
```

标头`Content-Type`要设成`'application/json;charset=utf-8'`。因为默认发送的是纯文本，`Content-Type`的默认值是`'text/plain;charset=UTF-8'`。



#### **提交表单**

```JavaScript
const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```



#### **文件上传**

如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。

另一种方法是用脚本添加文件，构造出一个表单，进行上传，请看下面的例子。

```JavaScript
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```



#### **直接上传二进制数据**

fetch()也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在body属性里面。

```JavaScript
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```



### **option** **API**

fetch()第二个参数的完整 API 如下：

```JavaScript
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```

fetch()请求的底层用的是 [Request() 对象](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)的接口，参数完全一样，因此上面的 API 也是Request()的 API。

#### **cache**

cache属性指定如何处理缓存。可能的取值如下：

- default：默认值，先在缓存里面寻找匹配的请求；
- no-store：直接请求远程服务器，并且不更新缓存；
- reload：直接请求远程服务器，并且更新缓存；
- no-cache：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存；
- force-cache：缓存优先，只有不存在缓存的情况下，才请求远程服务器；
- only-if-cached：只检查缓存，如果缓存里面不存在，将返回504错误；

#### **mode**

mode属性指定请求的模式。可能的取值如下：

- cors：默认值，允许跨域请求；
- same-origin：只允许同源请求；
- no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求；

#### **credentials**

credentials属性指定是否发送 Cookie。可能的取值如下：

- same-origin：默认值，同源请求时发送 Cookie，跨域请求时不发送；
- include：不管同源请求，还是跨域请求，一律发送 Cookie；
- omit：一律不发送；

跨域请求发送 Cookie，需要将credentials属性设为include。

```JavaScript
fetch('http://another.com', {
  credentials: "include"
});
```

#### **signal**

signal属性指定一个 `AbortSignal` 实例，用于取消fetch()请求。

#### **keepalive**

keepalive属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。

一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。这时，如果不用keepalive属性，数据可能无法发送，因为浏览器已经把页面卸载了。

```JavaScript
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
    keepalive: true
  });
};
```

#### **redirect**

redirect属性指定 HTTP 跳转的处理方法。可能的取值如下：

- follow：默认值，fetch()跟随 HTTP 跳转；
- error：如果发生跳转，fetch()就报错；
- manual：fetch()不跟随 HTTP 跳转，但是response.url属性会指向新的 URL，response.redirected属性会变为true，由开发者自己决定后续如何处理跳转；

#### **integrity**

integrity属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。

比如，下载文件时，检查文件的 SHA-256 哈希值是否相符，确保没有被篡改。

```JavaScript
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

#### **referrer**

referrer属性用于设定fetch()请求的referer标头。

这个属性可以为任意字符串，也可以设为空字符串（即不发送referer标头）。

```JavaScript
fetch('/page', {
  referrer: ''
});
```

#### **referrerPolicy**

referrerPolicy属性用于设定Referer标头的规则。可能的取值如下：

- `no-referrer-when-downgrade`：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送；
- `no-referrer`：不发送Referer标头；
- `origin`：Referer标头只包含域名，不包含完整的路径；
- `origin-when-cross-origin`：同源请求Referer标头包含完整的路径，跨域请求只包含域名；
- `same-origin`：跨域请求不发送Referer，同源请求发送；
- `strict-origin`：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头；
- `strict-origin-when-cross-origin`：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头；
- `unsafe-url`：不管什么情况，总是发送Referer标头；

### 取消请求

fetch()请求发送以后，如果中途想要取消，需要使用`AbortController`对象。

```JavaScript
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```

上面示例中，首先新建 AbortController 实例，然后发送fetch()请求，配置对象的signal属性必须指定接收 `AbortController` 实例发送的信号`controller.signal`。

`controller.abort()`方法用于发出取消信号。这时会触发abort事件，这个事件可以监听，也可以通过`controller.signal.aborted`属性判断取消信号是否已经发出。

下面是一个1秒后自动取消请求的例子。

```JavaScript
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```





### Fetch常见用法

XMLHttpRequest 一样，fetch()既可以发送数据也可以接收数据。使用 init 对象参数，可以配置 fetch()在请求体中发送各种序列化的数据。

#### 进度

参考 小满 zs  https://www.bilibili.com/video/BV1rL411a7UN?p=8&vd_source=5d2251d2e7e1f6a6d8f3e704a6e0ea65



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



#### 播放音频文件

```js
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = decodeData;
source.connect(audioCtx.destination);
source.loop = true;
source.start(0);
```

> 这段代码不是边下载边播放（流媒体）。它首先完整下载音频文件，然后在本地解码和播放。这种方法适用于较小的文件，但对于较大的音频文件或视频，较好的做法是使用媒体流。
>
> **与`<audio>`标签的区别**：
>
> - `<audio>` HTML 元素提供了一种简单的方式来嵌入音频内容，并提供了内置的控件（如播放、暂停按钮等），非常适合基本用途。
> - Web Audio API 提供更复杂的音频处理能力，例如音频效果、音量控制、音频分析等，允许开发者构建更复杂的音频应用。





#### 边下载边播放

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stream Audio Example</title>
</head>
<body>
    <audio controls></audio>
    <script src="stream-audio.js"></script>
</body>
</html>
```



```js
// stream-audio.js
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('audio');
    if (!window.MediaSource) {
        console.error("MediaSource API is not supported in your browser");
        return;
    }

    const mediaSource = new MediaSource();
    audio.src = URL.createObjectURL(mediaSource);
    
    mediaSource.addEventListener('sourceopen', sourceOpen);

    async function sourceOpen() {
        const sourceBuffer = mediaSource.addSourceBuffer('audio/webm; codecs="opus"');
        const response = await fetch('https://example.com/path/to/audio.webm');
        const reader = response.body.getReader();

        const stream = new ReadableStream({
            async start(controller) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        controller.close();
                        break;
                    }
                    sourceBuffer.appendBuffer(value);
                    await new Promise(resolve => sourceBuffer.onupdateend = resolve);
                }

                mediaSource.endOfStream();
            }
        });

        await new Response(stream).arrayBuffer(); // Ensure that the stream is fully read
    }
});

```



