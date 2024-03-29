## 什么是SSE

sse基于**http协议**，是一种**服务端主动向客户端**推送消息得技术, 通过 SSE, 服务器可以向客户端发送**事件流（event stream）**，而客户端则能够实时接收这些事件，并对其进行处理。这种单向通信的方式使得服务器可以实时向客户端推送数据，而**无需客户端发起请求**。

## 与websocket相比

-   SSE:单向通信，文本格式传输，自动重连，延迟重试，基于HTTP
-   websocket: 双向通信，传输格式广泛，不会重新连接需额外部署, 基于TCP

## 实现一个生成随机诗歌，打字机效果输出demo

-   前端

```js
import React, { useState } from "react";
const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [qusetion, setquestion] = useState("");

  const formateMessage = (data) => {
    const result = data.split("");
    result.forEach((charaacter, index) => {
      setTimeout(() => {
        setMessages((preMesage) => [...preMesage, charaacter]);
      }, 100 * index);
    });
  };

  const handSubmit = () => {
    const eventSource = new EventSource(
      `http://localhost:3000/users/chat-room?qusetion=${encodeURIComponent(
        qusetion
      )}`
    );
    eventSource.onmessage = (event) => {
      const newMessage = event.data;
      formateMessage(newMessage);
      eventSource.close();
    };
    eventSource.onerror = (e) => {
      formateMessage(e.data);
      eventSource.close();
    };
  };

  return (
    <div>
      <div>消息</div>
      <input
        type="text"
        value={qusetion}
        onChange={(e) => setquestion(e.target.value)}
        />
      <button onClick={handSubmit}>提交</button>
      <div
        style={{
          display: "flex",
          width: "400px",
          backgroundColor: "yellow",
          whiteSpace: "pre-wrap",
        }}
        >
        {messages.map((message, index) => (
          <>{message}</>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;

```

-   后端

```js
var express = require("express");
var router = express.Router();

const sentences = [
  "生活不止眼前的苟且，还有诗和远方。在漫长的人生旅途中，我们不断追寻着内心的向往与梦想。",
  "心若没有栖息的地方，到哪里都是在流浪。但当我们懂得珍惜内心的宁静与满足，内心就是最美丽的栖息之所。",
  "人生没有彩排，每天都是现场直播。每个人都在这个世界上扮演着自己独特的角色，无论是平凡还是辉煌。",
  "世上没有绝对的幸福，只有相对的幸福与比较的幸福。在追求幸福的过程中，我们或许会感到迷茫，但请相信，幸福就在身边。",
  "生活中总有许多不如意，但总有一些美好值得我们珍惜。当我们学会感恩，生活中的每一个细节都会因感恩而变得幸福与美好。",
];


function generateRandomSentence() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

/* GET users listing. */
router.get("/chat-room", function (req, res) {
  const qusetion = req.query.qusetion;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  if (!qusetion) {
    return res.status(400).send("miss qusetion");
  }
  const data = generateRandomSentence();

  res.write("data:" + data + "\n\n");
});

module.exports = router;
```

## 参数信息

1.  Content-Type: 指定发送到客户端得数据得类型 ，通常设置为 "text/event-stream"
2.  Cache-Control：指定客户端如何处理接收到的数据，通常为no-cache, 客户端不保存数
3.  Connection: 表示连接的类型，通常为keep-alive，保持持久连接
4.  Access-Control-Allow-Origin: 该参数用于指定允许访问SSE资源的域。可以设置为特定的域或使用通配符"\*"表示接受所有源的请求。
5.  Last-Event-ID: 该参数用于指定客户端上次接收到的事件的ID，以便服务器可以发送上次断开连接后的事件。这对于客户端重新连接时继续接收事件很有用。

-   前端身份鉴权

1.  使用 Cookie：可以在客户端请求 SSE 数据时，通过设置 Cookie 来携带身份验证信息。服务器在收到请求时可以解析 Cookie 中的信息来验证用户身份
2.  使用 Query 参数：客户端可以在 SSE 请求的 URL 中通过 Query 参数（如 token=xxx）来传递身份信息。服务器在接收到请求时可以解析 Query 参数中的信息来验证
3.  使用自定义头部：客户端可以在发送 SSE 请求时，在 HTTP 头部中添加自定义的身份鉴权信息，服务器需要能够解析这些自定义头部来验证用户身份。