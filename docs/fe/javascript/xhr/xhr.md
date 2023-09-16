## **XMLHttpRequest** 对象

通过 XMLHttpRequest 构造函数原生支持 XHR 对象：

```js
let xhr = new XMLHttpRequest();
```

### 使用 XHR

使用 XHR 对象首先要调用 open()方法，这个方法接收 3 个参数：请求类型（"get"、"post"等）、请求 URL，以及表示请求是否异步的布尔值。下面是一个例子：

```js
xhr.open("get", "example.php", false);
```

这行代码就可以向 example.php 发送一个同步的 GET 请求。关于这行代码需要说明几点。首先，这里的 URL 是相对于代码所在页面的，当然也可以使用绝对 URL。其次，调用 open()不会实际发送请求，只是为发送请求做好准备。

> 只能访问同源 URL，也就是域名相同、端口相同、协议相同。如果请求的 URL 与发送请求的页面在任何方面有所不同，则会抛出安全错误。

要发送定义好的请求，必须像下面这样调用 send()方法：`

```js
xhr.open("get", "example.txt", false);
xhr.send(null);
```

send()方法接收一个参数，是作为请求体发送的数据。如果不需要发送请求体，则必须传 null，因为这个参数在某些浏览器中是必需的。调用 send()之后，请求就会发送到服务器。

因为这个请求是同步的，所以 JavaScript 代码会等待服务器响应之后再继续执行。收到响应后，XHR 对象的以下属性会被填充上数据。

 responseText：作为响应体返回的文本。

 responseXML：如果响应的内容类型是"text/xml"或"application/xml"，那就是包含响应数据的 XML DOM 文档。

 status：响应的 HTTP 状态。

 statusText：响应的 HTTP 状态描述

无论是什么响应内容类型，responseText 属性始终会保存响应体，而 responseXML 则对于非 XML 数据是 null。

XHR 对象有一个 readyState 属性，表示当前处在请求/响应过程的哪个阶段。这个属性有如下可能的值。

 0：未初始化（Uninitialized）。尚未调用 open()方法。

 1：已打开（Open）。已调用 open()方法，尚未调用 send()方法。

 2：已发送（Sent）。已调用 send()方法，尚未收到响应。

 3：接收中（Receiving）。已经收到部分响应。

 4：完成（Complete）。已经收到所有响应，可以使用了。

每次 readyState 从一个值变成另一个值，都会触发 readystatechange 事件。可以借此机会检查 readyState 的值。一般来说，我们唯一关心的 readyState 值是 4，表示数据已就绪。为保证跨浏览器兼容，onreadystatechange 事件处理程序应该在调用 open()之前赋值。来看下面的例子：

```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("get", "example.txt", true);
xhr.send(null);
```

在收到响应之前如果想取消异步请求，可以调用 abort()方法：

```js
xhr.abort();
```

调用这个方法后，XHR 对象会停止触发事件，并阻止访问这个对象上任何与响应相关的属性。中断请求后，应该取消对 XHR 对象的引用。由于内存问题，不推荐重用 XHR 对象。

### HTTP 头部

每个 HTTP 请求和响应都会携带一些头部字段，这些字段可能对开发者有用。XHR 对象会通过一些方法暴露与请求和响应相关的头部字段。默认情况下，XHR 请求会发送以下头部字段。

 Accept：浏览器可以处理的内容类型。

 Accept-Charset：浏览器可以显示的字符集。

 Accept-Encoding：浏览器可以处理的压缩编码类型。

 Accept-Language：浏览器使用的语言。

 Connection：浏览器与服务器的连接类型。

 Cookie：页面中设置的 Cookie。

 Host：发送请求的页面所在的域。

 Referer：发送请求的页面的 URI。注意，这个字段在 HTTP 规范中就拼错了，所以考虑到兼容性也必须将错就错。（正确的拼写应该是 Referrer。）

 User-Agent：浏览器的用户代理字符串。

虽然不同浏览器发送的确切头部字段可能各不相同，但这些通常都是会发送的。如果需要发送额外的请求头部，可以使用 setRequestHeader()方法。这个方法接收两个参数：头部字段的名称和值。

为保证请求头部被发送，必须在 open()之后、send()之前调用 setRequestHeader()，如下面的例子所示：

```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("get", "example.php", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
```

可以使用 getResponseHeader()方法从 XHR 对象获取响应头部，只要传入要获取头部的名称即可。如果想取得所有响应头部，可以使用 getAllResponseHeaders()方法，这个方法会返回包含所有响应头部的字符串。下面是调用这两个方法的例子：

```js
let myHeader = xhr.getResponseHeader("MyHeader");
let allHeaders xhr.getAllResponseHeaders();
```

服务器可以使用头部向浏览器传递额外的结构化数据。getAllResponseHeaders()方法通常返回类似如下的字符串：

```js
Date: Sun, 14 Nov 2004 18:04:03 GMT

Server: Apache/1.3.29 (Unix)

Vary: Accept

X-Powered-By: PHP/4.3.8

Connection: close

Content-Type: text/html; charset=iso-8859-1
```

通过解析以上头部字段的输出，就可以知道服务器发送的所有头部，而不需要单独去检查了。

### GET 请求

最常用的请求方法是 GET 请求，用于向服务器查询某些信息。必要时，需要在 GET 请求的 URL 后面添加查询字符串参数。对 XHR 而言，查询字符串必须正确编码后添加到 URL 后面，然后再传给 open()方法。

发送 GET 请求最常见的一个错误是查询字符串格式不对。查询字符串中的每个名和值都必须使用`encodeURIComponent()`编码，所有名/值对必须以和号（&）分隔，如下面的例子所示：

```js
xhr.open("get", "example.php?name1=value1&name2=value2", true);
```

可以使用以下函数将查询字符串参数添加到现有的 URL 末尾：

```js
function addURLParam(url, name, value) {
  url += url.indexOf("?") == -1 ? "?" : "&";
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}
```

### POST 请求

第二个最常用的请求是 POST 请求，用于向服务器发送应该保存的数据。每个 POST 请求都应该在请求体中携带提交的数据，而 GET 请求则不然。POST 请求的请求体可以包含非常多的数据，而且数据可以是任意格式。要初始化 POST 请求，open()方法的第一个参数要传"post"，比如：

```js
xhr.open("post", "example.php", true);
```

接下来就是要给 send()方法传入要发送的数据。因为 XHR 最初主要设计用于发送 XML，所以可以传入序列化之后的 XML DOM 文档作为请求体。当然，也可以传入任意字符串。

默认情况下，对服务器而言，POST 请求与提交表单是不一样的。服务器逻辑需要读取原始 POST 数据才能取得浏览器发送的数据。不过，可以使用 XHR 模拟表单提交。为此，第一步需要把` Content-type` 头部设置为`application/x-www-formurlencoded`，这是提交表单时使用的内容类型。第二步是创建对应格式的字符串。POST 数据此时使用与查询字符串相同的格式。如果网页中确实有一个表单需要序列化并通过 XHR 发送到服务器，则可以使用第 14 章的 serialize()函数来创建相应的字符串，如下所示：

```js
function serialize(obj) {
  if (typeof obj !== "object") {
    return obj; // 如果不是对象，则直接返回
  }

  let queryString = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (queryString !== "") {
        queryString += "&"; // 添加键值对之间的分隔符
      }
      queryString +=
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]); // 对键和值进行编码，并拼接成键值对
    }
  }

  return queryString;
}

function submitData() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText);
      } else {
        alert("Request was unsuccessful: " + xhr.status);
      }
    }
  };
  xhr.open("post", "postexample.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let form = document.getElementById("user-info");
  xhr.send(serialize(form));
}
```

### XMLHttpRequest Level 2

XHR 对象作为事实标准的迅速流行，也促使 W3C 为规范这一行为而制定了正式标准。XMLHttpRequest Level 1 只是把已经存在的 XHR 对象的实现细节明确了一下。XMLHttpRequest Level 2 又进一步发展了 XHR 对象。并非所有浏览器都实现了 XMLHttpRequest Level 2 的所有部分，但所有浏览器都实现了其中部分功能。

#### **FormData** 类型

现代 Web 应用程序中经常需要对表单数据进行序列化，因此 XMLHttpRequest Level 2 新增了 FormData 类型。FormData 类型便于表单序列化，也便于创建与表单类似格式的数据然后通过 XHR 发送。下面的代码创建了一个 FormData 对象，并填充了一些数据：

```js
let data = new FormData();
data.append("name", "Nicholas");
```

append()方法接收两个参数：键和值，相当于表单字段名称和该字段的值。可以像这样添加任意多个键/值对数据。此外，通过直接给 FormData 构造函数传入一个表单元素，也可以将表单中的数据作为键/值对填充进去：

```js
let data = new FormData(document.forms[0]);
```

有了 FormData 实例，可以像下面这样直接传给 XHR 对象的 send()方法：

```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("post", "postexample.php", true);
let form = document.getElementById("user-info");
xhr.send(new FormData(form));
```

使用 FormData 的另一个方便之处是不再需要给 XHR 对象显式设置任何请求头部了。XHR 对象能够识别作为 FormData 实例传入的数据类型并自动配置相应的头部。

#### 超时

IE8 给 XHR 对象增加了一个 timeout 属性，用于表示发送请求后等待多少毫秒，如果响应不成功就中断请求。之后所有浏览器都在自己的 XHR 实现中增加了这个属性。在给 timeout 属性设置了一个时间且在该时间过后没有收到响应时，XHR 对象就会触发 timeout 事件，调用 ontimeout 事件处理程序。这个特性后来也被添加到了 XMLHttpRequest Level 2 规范。下面看一个例子：

```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText);
      } else {
        alert("Request was unsuccessful: " + xhr.status);
      }
    } catch (ex) {
      // 假设由 ontimeout 处理
    }
  }
};
xhr.open("get", "timeout.php", true);
xhr.timeout = 1000; // 设置 1 秒超时
xhr.ontimeout = function () {
  alert("Request did not return in a second.");
};
xhr.send(null);
```

给 timeout 设置 1000 毫秒意味着，如果请求没有在 1 秒钟内返回则会中断。此时则会触发 ontimeout 事件处理程序，readyState 仍然会变成 4，因此也会调用 onreadystatechange 事件处理程序。不过，如果在超时之后访问 status 属性则会发生错误。为做好防护，可以把检查 status 属性的代码封装在 try/catch 语句中。

#### overrideMimeType()方法

Firefox 首先引入了 `overrideMimeType()`方法用于重写 XHR 响应的 MIME 类型。这个特性后来也被添加到了 XMLHttpRequest Level 2。因为响应返回的 MIME 类型决定了 XHR 对象如何处理响应，所以如果有办法覆盖服务器返回的类型，那么是有帮助的。

假设服务器实际发送了 XML 数据，但响应头设置的 MIME 类型是 text/plain。结果就会导致虽然数据是 XML，但 responseXML 属性值是 null。此时调用 overrideMimeType()可以保证将响应当成 XML 而不是纯文本来处理：

```js
let xhr = new XMLHttpRequest();
xhr.open("get", "text.php", true);
xhr.overrideMimeType("text/xml");
xhr.send(null);
```

这个例子强制让 XHR 把响应当成 XML 而不是纯文本来处理。为了正确覆盖响应的 MIME 类型，必须在调用 send()之前调用 overrideMimeType()。

## 进度事件

Progress Events 是 W3C 的工作草案，定义了客户端  服务器端通信。这些事件最初只针对 XHR，现在也推广到了其他类似的 API。有以下 6 个进度相关的事件。

 loadstart：在接收到响应的第一个字节时触发。

 progress：在接收响应期间反复触发。

 error：在请求出错时触发。

 abort：在调用 abort()终止连接时触发。

 load：在成功接收完响应时触发。

 loadend：在通信完成时，且在 error、abort 或 load 之后触发。

每次请求都会首先触发 loadstart 事件，之后是一个或多个 progress 事件，接着是 error、abort 或 load 中的一个，最后以 loadend 事件结束。这些事件大部分都很好理解，但其中有两个需要说明一下。

### **load** 事件

Firefox 最初在实现 XHR 的时候，曾致力于简化交互模式。最终，增加了一个 load 事件用于替代 readystatechange 事件。load 事件在响应接收完成后立即触发，这样就不用检查 readyState 属性了。onload 事件处理程序会收到一个 event 对象，其 target 属性设置为 XHR 实例，在这个实例上可以访问所有 XHR 对象属性和方法。不过，并不是所有浏览器都实现了这个事件的 event 对象。考虑到跨浏览器兼容，还是需要像下面这样使用 XHR 对象变量：

```js
let xhr = new XMLHttpRequest();
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText);
  } else {
    alert("Request was unsuccessful: " + xhr.status);
  }
};
xhr.open("get", "altevents.php", true);
xhr.send(null);
```

只要是从服务器收到响应，无论状态码是什么，都会触发 load 事件。这意味着还需要检查 status 属性才能确定数据是否有效。Firefox、Opera、Chrome 和 Safari 都支持 load 事件。

### **progress** 事件

Mozilla 在 XHR 对象上另一个创新是 progress 事件，在浏览器接收数据期间，这个事件会反复触发。每次触发时，onprogress 事件处理程序都会收到 event 对象，其 target 属性是 XHR 对象，且包含 3 个额外属性：lengthComputable、position 和 totalSize。其中，lengthComputable 是一个布尔值，表示进度信息是否可用；position 是接收到的字节数；totalSize 是响应的 Content-Length 头部定义的总字节数。有了这些信息，就可以给用户提供进度条了。以下代码演示了如何向用户展示进度：

```js
let xhr = new XMLHttpRequest();
xhr.onload = function (event) {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText);
  } else {
    alert("Request was unsuccessful: " + xhr.status);
  }
};
xhr.onprogress = function (event) {
  let divStatus = document.getElementById("status");
  if (event.lengthComputable) {
    divStatus.innerHTML =
      "Received " + event.position + " of " + event.totalSize + " bytes";
  }
};
xhr.open("get", "altevents.php", true);
xhr.send(null);
```

为了保证正确执行，必须在调用 open()之前添加 onprogress 事件处理程序。在前面的例子中，每次触发 progress 事件都会更新 HTML 元素中的信息。假设响应有 Content-Length 头部，就可以利用这些信息计算出已经收到响应的百分比。

## 封装

```js
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status === 404 || xhr.status === 500) {
          reject(new Error("404 not found"));
        }
      }
    };
    xhr.send(null);
  });
  return p;
}

const url = "/data/test.json";
ajax(url)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```
