### **创建异步对象**

```JavaScript
let xmlHttp;
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlHttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
}
```

通过`XMLHttpRequest`构造函数创建一个异步对象`xmlhttp`, IE6, IE5 使用ActiveXObject创建，创建的这个异步对象上有很多属性和方法，常用的有：

#### onreadystatechange

`onreadystatechange`：监听异步对象请求状态码`readyState`的改变，每当`readyState`改变时，就会触发`onreadystatechange`事件；

#### readyState

`readyState`：请求状态码

`readyState`表示异步对象目前的状态，状态码从0到4：

0: 表示请求未初始化，还没有调用 `open()`；

1: 服务器连接已建立，但是还没有调用 `send()`；

2: 请求已接收，正在处理中（通常现在可以从响应中获取内容头）；

3: 请求处理中，通常响应中已有部分数据可用了，没有全部完成；

4: 当`readyState`状态码为4时，表示请求已完成；此阶段确认全部数据都已经解析完毕，可以通过异步对象的属性获取对应数据；

#### status

status：http状态码

http状态码表示成功的http状态码有

```js
xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status == 304
```

#### responseText

responseText：后台返回的字符串形式的响应数据；

#### responseXML

responseXML：后台返回的XML形式的响应数据；





### 进度事件

Progress Events 是 W3C 的工作草案，定义了客户端  服务器端通信。这些事件最初只针对 XHR，现在也推广到了其他类似的 API。有以下 6 个进度相关的事件。

 loadstart：在接收到响应的第一个字节时触发。

 progress：在接收响应期间反复触发。

 error：在请求出错时触发。

 abort：在调用 abort()终止连接时触发。

 load：在成功接收完响应时触发。

 loadend：在通信完成时，且在 error、abort 或 load 之后触发。

每次请求都会首先触发 loadstart 事件，之后是一个或多个 progress 事件，接着是 error、abort 或 load 中的一个，最后以 loadend 事件结束。这些事件大部分都很好理解，但其中有两个需要说明一下。

#### **load** 事件

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

#### **progress** 事件

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



### **设置请求方式和请求地址**

创建异步对象之后，通过`open()`方法设置ajax请求方式和请求地址 格式：

```js
xmlHttp.open("GET/POST","https://v2.jinrishici.com/one.json",true)
```

第一个参数：请求的类型；GET 还是 POST；

第二个参数：表示请求的文件的地址url；

第三个参数：设置请求方法是不是异步async，true为异步， false为同步。AJAX存在的意义就是发异步请求，所以第三个参数永远传true；

### **发送请求**

直接通过异步对象的send()发送请求

```JavaScript
xmlHttp.send();
```

特别注意的是： 如果发送POST请求，使用`setRequestHeader()`来添加 HTTP请求头，并在send()方法中传递要发送的数据：

```JavaScript
xmlHttp.open("POST","ajax_test.html",true); 
xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
xmlHttp.send("fname=Henry&lname=Ford");
```

### **通过onreadystatechange监听状态变化**

当异步对象的readyState发生改变，会触发`onreadystatechange`函数，当readyState变成为4时，表示当前状态是请求完毕的状态，同时当http的响应码status为200到300之间（包括200和300）或为304时，表示ajax请求成功;当http状态码不是200到300之间的数也不是304时，表示请求不成功

```JavaScript
//4.监听状态变化
xmlHttp.onreadystatechange = () => {
 // 判断当前状态改变是请求完毕的状态吗
 if (xmlHttp.readyState === 4) {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status == 304) {
        console.log("成功的接收到服务器返回的数据");
    }else{
        console.log("不成功！");
    }   
 }
}  
```

### **封装**

如果成功，可通过异步对象的`responseText`属性来获取服务器返回的字符串

接下来，我们来封装一个方法ajax()用于发送请求

封装的时候，需要注意：

1. URL当中只能出现字母 数字 下划线和ASCII码，不能出现中文，可以使用encodeURIComponent()转码；
2. 当我们利用我们的ajax放的发送一个请求到远处服务器时，我们需要等待远程服务器去响应我们的请求，等待远程服务器将响应的结果返回给我们，但是这个响应的速度是不确定的，因为响应的速度是由本地网络和远程服务器的网速等共同决定的，所以我们不可能一直等待服务器的响应。这里需要设置超时时间；



使用方式：

```JavaScript
ajax({
  type: 'GET',
  url: 'http://localhost:3000/posts',
  timeout: 1000,
  success: data => {
    console.log('success', data);
  },
  error: err => {
    console.log('error', err);
  },
});
```



封装：

```JavaScript
const ajax = option => {
  //type, url, data, timeout, success, error将所有参数换成一个对象{}

  //  0.将对象转换成字符串

  //处理obj
  const objToString = data => {
    data.t = new Date().getTime();
    let res = [];
    for (let key in data) {
      //需要将key和value转成非中文的形式，因为url不能有中文。使用encodeURIComponent();
      res.push(encodeURIComponent(key) + ' = ' + encodeURIComponent(data[key]));
    }
    return res.join('&');
  };

  let str = objToString(option.data || {});

  //  1.创建一个异步对象xmlHttp；
  var xmlHttp, timer;
  if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else if (xmlHttp) {
    // code for IE6, IE5
    xmlHttp = new ActiveXObject('Microsoft.xmlHttp');
  }

  //  2.设置请求方式和请求地址；
  // 判断请求的类型是POST还是GET
  if (option.type.toLowerCase() === 'get') {
    xmlHttp.open(option.type, option.url + '?t=' + str, true);
    //  3.发送请求；
    xmlHttp.send();
  } else {
    xmlHttp.open(option.type, option.url, true);
    // 注意：在post请求中，必须在open和send之间添加HTTP请求头：setRequestHeader(header,value);
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //  3.发送请求；
    xmlHttp.send(str);
  }

  //  4.监听状态的变化；
  xmlHttp.onreadystatechange = function () {
    clearInterval(timer);
    debugger;
    if (xmlHttp.readyState === 4) {
      if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 304) {
        //  5.处理返回的结果；
        option.success(xmlHttp.responseText); //成功后回调；
      } else {
        option.error(xmlHttp.responseText); //失败后回调；
      }
    }
  };

  //判断外界是否传入了超时时间
  if (option.timeout) {
    timer = setInterval(function () {
      xmlHttp.abort(); //中断请求
      clearInterval(timer);
    }, option.timeout);
  }
};
```

