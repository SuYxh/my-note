HTTP cookie 通常也叫作 cookie，最初用于在客户端存储会话信息。

### cookie 的构成

 名称(key)：唯一标识 cookie 的名称。cookie 名不区分大小写，因此 myCookie 和 MyCookie 是同一个名称。不过，实践中最好将 cookie 名当成区分大小写来对待，因为一些服务器软件可能这样对待它们。cookie 名必须经过 URL 编码。

 值(value)：存储在 cookie 里的字符串值。这个值必须经过 URL 编码。

 域：cookie 有效的域。发送到这个域的所有请求都会包含对应的 cookie。这个值可能包含子域（如`www.wrox.com`），也可以不包含（如`.wrox.com` 表示对 `wrox.com` 的所有子域都有效）。如果不明确设置，则默认为设置 cookie 的域。

 路径(path)：请求 URL 中包含这个路径才会把 cookie 发送到服务器。例如，可以指定 cookie 只能由`http://www.wrox.com/books/`访问，因此访问 `http://www.wrox.com/`下的页面就不会发送 cookie，即使请求的是同一个域。

 过期时间(expire)：表示何时删除 cookie 的时间戳（即什么时间之后就不发送到服务器了）。默认情况下，浏览器会话结束后会删除所有 cookie。不过，也可以设置删除 cookie 的时间。这个值是 GMT 格式（Wdy, DD-Mon-YYYY HH:MM:SS GMT），用于指定删除 cookie 的具体时间。这样即使关闭浏览器 cookie 也会保留在用户机器上。把过期时间设置为过去的时间会立即删除 cookie。

 安全标志(secure)：设置之后，只在使用 SSL 安全连接的情况下才会把 cookie 发送到服务器。例如，请求 `https://www.wrox.com` 会发送 cookie，而请求 `http://www.wrox.com `则不会。

### 请求携带

如果一个 cookie**同时满足**以下条件，则这个 cookie 会被附带到请求中

- cookie 没有过期
- cookie 中的域和这次请求的域是匹配的
  - 比如 cookie 中的域是`ironc.cn`，则可以匹配的请求域是`ironc.cn`、`www.ironc.cn`、`blogs.ironc.cn`等等
  - 比如 cookie 中的域是`www.ironc.cn`，则只能匹配`www.ironc.cn`这样的请求域
  - cookie 是不在乎端口的，只要域匹配即可
- cookie 中的 path 和这次请求的 path 是匹配的
  - 比如 cookie 中的 path 是`/news`，则可以匹配的请求路径可以是`/news`、`/news/detail`、`/news/a/b/c`等等，但不能匹配`/blogs`
  - 如果 cookie 的 path 是`/`，可以想象，能够匹配所有的路径
- 验证 cookie 的安全传输
  - 如果 cookie 的 secure 属性是 true，则请求协议必须是`https`，否则不会发送该 cookie
  - 如果 cookie 的 secure 属性是 false，则请求协议可以是`http`，也可以是`https`

如果一个 cookie 满足了上述的所有条件，则浏览器会把它自动加入到这次请求中，**浏览器会将符合条件的 cookie，自动放置到请求头中**

### 设置 cookie

cookie 的设置有两种模式：

- 服务器响应：这种模式是非常普遍的，当服务器决定给客户端颁发一个证件时，它会在响应的消息中包含 cookie，浏览器会自动的把 cookie 保存到卡包中
- 客户端自行设置：这种模式少见一些，不过也有可能会发生，比如用户关闭了某个广告，并选择了「以后不要再弹出」，此时就可以把这种小信息直接通过浏览器的 JS 代码保存到 cookie 中。后续请求服务器时，服务器会看到客户端不想要再次弹出广告的 cookie，于是就不会再发送广告过来了。
