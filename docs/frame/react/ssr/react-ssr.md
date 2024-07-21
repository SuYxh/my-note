# SSR

ssr 全称 server-side render，意为服务端渲染

## SSR 方案的价值

SSR 方案最大的用途可以概括为** ****SEO**** 友好**、**极大提升网页访问速度（特别是首屏加载**）。其实这项技术非常古老，还记得我刚入门开发时，写过 Java，那会儿 Java 还用 **servlet**** + jsp** 编写页面 + 服务逻辑。现在前端通用 SSR  方案只是将 Java 换成了 nodejs。

## Nextjs 服务端开发指南

我们使用 nextjs 提供的脚手架初始化项目

```bash
npx create-next-app nextjs-blog
```

安装依赖

```bash
pnpm i
```

启动应用

```bash
pnpm dev
```

### 约定式路由

什么是约定式路由？就是项目中 pages 下的文件结构直接对应于路由系统，比如我们现在有一个路由 `/heyi`，那么在 `pages` 文件夹下，就有一个 `heyi.ts` 。

### Link、Head、Layout

Link 组件类似 react-router 的 Link，需要注意的是一般推荐跳转相关逻辑尽量使用 Link，为什么呢？因为语义以及用户可用性。

```typescript
<Link href="/">
  <a>Back to home</a>
</Link>
```

### getStaticProps

用于获取组件初始值

该方法在运行时自动处理参数，并将处理后返回值交给 React 组件进行渲染

```typescript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

前端 react 使用 `ReactDOM.hydrateRoot`，后端 react 使用 `ReactDOM.renderToString`

## 深入理解 hydrate 与 renderToString、renderToReadableStream

前面我们通过示例看到，react ssr 的方案可以大致总结为：

服务端将 react 组件代码转为 html 字符串，返回给客户端，客户端获取到内容后，需要进行注水及事件处理。

### renderToString

在服务端，调用 renderToString 方法后，会将 `React` 元素转化为初始 `HTML` 。 需要注意的是，此时只是进行简单的模板解析转换，数据请求等，时间的绑定与数据的消费均不发生在此刻。

我们提到的服务端数据请求并提供给客户端的过程，称之为：**注水**，客户端拿到数据进行消费，称之为：**脱水**

### renderToReadableStream

流式 SSR，其实这也不是什么新概念，相信大家以前做过文件下载吧？很多时候我们文件下载的形式就是基于流。通过二进制流替代字符串类型返回。

### hydrate

顾名思义，水合。

上面我们提到服务端将 react 内容转为 html string 并返回了，此时客户端需要请求组件数据并将数据渲染到页面，称为：**脱水**，另外，事件的绑定也发生在此刻，react 通过事件委托机制，实现组件的事件绑定，最终完成页面渲染。

![](https://qn.huat.xyz/mac/202407211653073.png)

具体实现见源码

```typescript
node api/index.js
```

```typescript
pnpm dev
```

### 注意点

1. `renderToString` 有什么作用？
2. 为什么服务端加载了一次，客户端还需要再次加载呢？
3. 服务端加载了 `React` 输出的代码片段，客户端又执行了一次，这样是不是会加载两次导致资源浪费呢？

### **ReactDOMServer.renderToString(element)**

将 `React` 元素渲染为初始 `HTML` 。 `React` 将返回一个 `HTML` 字符串。你可以使用此方法在服务端生成 `HTML` ，并在首次请求时将标记下发，以加快页面加载速度，并允许搜索引擎爬取你的页面以达到 `SEO` 优化的目的。

**为什么服务端加载了一次，客户端还需要再次加载呢？**

原因很简单，服务端使用 `renderToString` 渲染页面，而 `react-dom/server` 下的 `renderToString` 并没有做事件相关的处理，因此返回给浏览器的内容不会有事件绑定，渲染出来的页面只是一个静态的 `HTML` 页面。只有在客户端渲染 `React` 组件并初始化 `React` 实例后，才能更新组件的 `state` 和 `props` ，初始化 `React` 的事件系统，让 `React` 组件真正“ 动” 起来。

**是否会加载两次？**

如果你在已有服务端渲染标记的节点上调用 `ReactDOM.hydrate()` 方法， `React` 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。因此不必担心加载多次的问题。

# 手写同构应用

见源码
