beforeunload和sendBeacon


`beforeunload` 事件和 `navigator.sendBeacon` 方法虽然都可以在用户离开网页时使用，但它们的目的和工作方式有明显的不同。

### beforeunload 事件

- **目的**：`beforeunload` 事件的主要目的是在页面卸载前执行代码，它允许开发者拦截页面关闭或导航，询问用户是否真的要离开。这通常用于警告用户有未保存的更改，或者执行一些清理任务。
- **行为**：当此事件触发时，可以通过返回一个字符串来向用户显示一个确认对话框，询问用户是否确定要离开页面。不过，现代浏览器对这一行为有所限制，通常会忽略自定义消息，只显示一个标准的警告。

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <title>BeforeUnload 示例</title>
</head>

<body>
  <h1>表单示例</h1>
  <form id="myForm">
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name">
    <br>
    <label for="email">电子邮件：</label>
    <input type="email" id="email" name="email">
    <br>
    <button type="submit">提交</button>
  </form>
  <script>
    var formModified = false;
    var form = document.getElementById('myForm');
    form.addEventListener('input', function () {
      formModified = true;
    });

    window.addEventListener('beforeunload', function (event) {
      if (formModified) {
        // 这个写了没有什么用，但是要写
        var confirmationMessage = '你有未保存的更改，确定要离开吗？';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    });
  </script>
</body>

</html>
```



### navigator.sendBeacon 方法

`navigator.sendBeacon` 方法主要用于在浏览器会话结束时安全地向服务器发送数据。它是为了解决在页面卸载时使用传统的异步请求（如 AJAX）可能导致的问题而设计的。`sendBeacon` 方法的主要优势在于，它可以在不阻塞页面卸载的情况下，确保数据被发送。

异步发送数据

`sendBeacon` 方法会将数据放入到浏览器的发送队列中，然后浏览器会在合适的时机异步地发送这些数据。这意味着它不会阻止或延迟页面的卸载过程，也不会影响用户接下来的浏览体验。

数据格式和请求类型

`sendBeacon` 可以发送任何类型的数据，常见的包括字符串、表单数据或者二进制数据（如 `Blob` 或 `ArrayBuffer`）。发送的请求总是使用 HTTP POST 方法。

返回值

当你调用 `sendBeacon` 方法时，它会返回一个布尔值，指示数据是否已成功排入队列。如果返回 `true`，则表示请求已被队列接受，如果返回 `false`，则表示请求因某些原因（如请求队列已满）被拒绝。

用途

这个方法特别适合用于发送统计数据、日志信息或者在用户完成某些操作后，需要向服务器报告的其他情况。例如，可以在用户完成视频观看、完成游戏关卡、或者浏览完一篇文章后使用。



- **目的**：`navigator.sendBeacon` 方法用于在用户离开页面时安全地发送少量数据到服务器。这常用于日志记录、统计发送等场景，特别是在不影响页面卸载的情况下发送数据。
- **行为**：`sendBeacon` 方法会向服务器发送数据，并且请求由浏览器在后台异步处理，即使页面已经卸载。这意味着它不会阻止页面的卸载过程，也不会延迟用户导航到下一个页面的时间。



```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <title>SendBeacon 示例</title>
</head>

<body>
  <h1>页面停留时间统计</h1>
  <p>浏览本页面的时间将被记录并在您离开时发送。</p>
  <script>
    window.addEventListener('load', function () {
      window.pageLoadTime = Date.now();
    });

    window.addEventListener('unload', function () {
      var stayTime = Date.now() - window.pageLoadTime;
      var data = JSON.stringify({ stayTime: stayTime, eventType: 'pageUnload' });
      var blob = new Blob([data], { type: 'application/json' });
      navigator.sendBeacon('https://yourserver.com/analytics', blob);
    });
  </script>
</body>

</html>
```





`navigator.sendBeacon` 方法在底层实现上与 XMLHttpRequest (XML) 和 Fetch API 都有所不同。它是通过浏览器的一种特定机制实现的，这种机制专门设计用于在页面卸载时发送少量数据而不阻塞页面卸载过程。具体来说，`sendBeacon` 方法并不使用 XMLHttpRequest 或 Fetch API，而是使用一种特殊的浏览器队列系统来处理这些请求。

#### sendBeacon的工作原理如下

1. **异步发送**：`sendBeacon` 方法将请求数据添加到浏览器的 HTTP 请求队列中。这样做的优点是即使页面已经卸载，浏览器仍然可以继续处理这些排队的请求。

2. **不影响页面卸载**：与 XMLHttpRequest 或 Fetch API 的同步或异步请求相比，使用 `sendBeacon` 不会延迟页面的卸载过程。这是因为 `sendBeacon` 请求是在浏览器后台处理的，完全独立于页面主线程。

3. **请求类型和方法**：`sendBeacon` 请求总是使用 HTTP POST 方法发送数据，这一点与其他类型的 API 请求有所不同。

4. **队列机制**：如果请求成功排队（即 `sendBeacon` 返回 `true`），浏览器会保证在合适的时机发送这些数据，即使页面已经被卸载。

#### 对比 XMLHttpRequest 和 Fetch API

- **XMLHttpRequest**：早期的 AJAX 请求方式，可以进行同步或异步的 HTTP 请求，但它通常会影响页面的卸载流程，特别是在同步模式下。

- **Fetch API**：现代的网络请求 API，提供了一个更加强大和灵活的网络请求能力。Fetch 默认是异步的，不会阻塞页面，但在页面卸载时发起的 Fetch 请求可能会被浏览器终止。

由于这些原因，当你需要在页面关闭时安全地传输数据，并确保数据即使在用户离开页面后也能被发送时，使用 `navigator.sendBeacon` 是一个更可靠的选择。这使得 `sendBeacon` 特别适合用于统计和日志数据的收集，不会阻塞用户的正常浏览行为，也不依赖于传统的 HTTP 请求模式。





### 使用场景对比

- **使用 `beforeunload`**：如果你需要在用户离开页面时进行干预，比如提示用户保存数据，或者需要在页面完全关闭前进行某些操作，就应该使用 `beforeunload` 事件。
- **使用 `sendBeacon`**：如果你需要在页面卸载时向服务器发送数据，而且不想阻止或延迟页面卸载，那么应该使用 `sendBeacon` 方法。例如，在用户完成一系列操作后，你可能需要发送性能度量或结束会话的数据到服务器。

总的来说，`beforeunload` 用于在页面即将卸载时可能阻止该过程，而 `sendBeacon` 用于在不中断用户体验的情况下安全地传输数据。





`unload` 和 `pagehide` 事件都是用于在用户离开当前网页时触发的，但它们有一些关键的区别和使用场景。

### unload 事件
`unload` 事件在文档被完全卸载时触发，通常用于执行清理任务，例如清除内存中的对象、关闭数据库连接等。这个事件确保在页面关闭前完成这些操作。

```javascript
window.addEventListener('unload', function(event) {
    // 执行清理代码
    console.log('页面正在卸载...');
});
```
尽管 `unload` 事件可以用于执行清理任务，但现代浏览器通常建议限制在这个事件中进行的操作，因为它可能会延迟页面的卸载过程。此外，很多现代浏览器（特别是移动端浏览器）可能不会在所有情况下都可靠地触发 `unload` 事件，例如用户打开了新的标签页。

### pagehide 事件
`pagehide` 事件类似于 `unload`，但它在页面即将被卸载或放入浏览器的 bfcache（后退缓存）时触发。`pagehide` 事件比 `unload` 更可靠，尤其是在处理移动浏览器或支持页面缓存的情况下。

```javascript
window.addEventListener('pagehide', function(event) {
    if (event.persisted) {
        console.log('页面可能被存储在 bfcache 中');
    } else {
        console.log('页面正在卸载...');
    }
});
```
在 `pagehide` 事件处理器中，你可以检查 `event.persisted` 属性。如果这个属性为 `true`，说明页面被保存到了 bfcache 中，当用户返回到这个页面时，页面可以非常快速地重新展现，而不需要重新加载。

### 推荐的使用方式
由于 `unload` 事件的限制和不一致性，推荐使用 `pagehide` 事件来处理可能需要在页面卸载时运行的清理或保存操作。尤其是在构建响应快速的现代Web应用时，`pagehide` 提供了更好的用户体验和更高的可靠性。同时，如果需要发送少量数据到服务器，考虑使用 `navigator.sendBeacon` 方法，它在 `unload` 或 `pagehide` 事件中特别有用，因为它不会阻塞用户的操作。











