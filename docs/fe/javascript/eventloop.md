### event loop

- JS 是单线程运行的
- 异步要基于回调来实现
- event loop 就是异步回调的实现原理

![eventloop.drawio](https://qn.huat.xyz/mac/202309102155140.png)

### 微任务和宏任务

> 微任务执行比宏任务要早

宏任务(macroTask): setTimeout , setInterval , Ajax , DOM 事件

微任务(microTask): Promise async/await

区别：

宏任务：DOM 渲染后触发，如 setTimeout

微任务：DOM 渲染前触发 ，如 Promise

### Event loop 和 DOM 渲染

- 每次 Call Stack 清空（即每次轮询结束），即同步任务执行完
- 都是 DOM 重新渲染的机会，DOM 结构如有改变则重新渲染
- 然后再去触发下一次 Event Loop

### 示例代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Event loop</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  </head>
  <body>
    <div id="container"></div>
    <script>
      const $p1 = $("<p>一段文案</p>");
      const $p2 = $("<p>一段文案</p>");
      const $p3 = $("<p>一段文案</p>");

      $("#container").append($p1).append($p2).append($p3);
      console.log("DOM 添加完毕!", $("#container").children().length);

      // 微任务 DOM 渲染前触发
      Promise.resolve().then(() => {
        console.log("Promise-length", $("#container").children().length);
        alert("Promise then");
      });

      // 宏任务 DOM 渲染后触发
      setTimeout(() => {
        console.log("setTimeout-length", $("#container").children().length);
        alert("setTimeout");
      });
    </script>
  </body>
</html>
```
