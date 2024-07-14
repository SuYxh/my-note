## `SSR` 定义

页面的渲染流程：

1. 浏览器通过请求得到一个 HTML 文本；
2. 渲染进程解析 HTML 文本，构建 DOM 树；
3. 解析 HTML 的同时，如果遇到内联样式或者样式脚本，则下载并构建样式规则（stytle rules），若遇到 JavaScript 脚本，则会下载执行脚本；
4. DOM 树和样式规则构建完成之后，渲染进程将两者合并成渲染树（render tree）；
5. 渲染进程开始对渲染树进行布局，生成布局树（layout tree）；
6. 渲染进程对布局树进行绘制，生成绘制记录；
7. 渲染进程的对布局树进行分层，分别栅格化每一层，并得到合成帧；
8. 渲染进程将合成帧信息发送给 GPU 进程显示到页面中；

![](https://qn.huat.xyz/mac/202407051445341.png)

可以看到，页面的渲染其实就是浏览器将 HTML 文本转化为页面帧的过程。而如今我们大部分 WEB 应用都是使用 JavaScript 框架（Vue、React、Angular）进行页面渲染的，也就是说，在执行 JavaScript 脚本的时候，HTML 页面已经开始解析并且构建 DOM 树了，JavaScript 脚本只是动态的改变 DOM 树的结构，使得页面成为希望成为的样子，这种渲染方式叫动态渲染，也可以叫客户端渲染（client side rende）；

那么什么是服务端渲染（server side render）？顾名思义，服务端渲染就是在浏览器请求页面 URL 的时候，服务端将我们需要的 HTML 文本组装好，并返回给浏览器，这个 HTML 文本被浏览器解析之后，不需要经过 JavaScript 脚本的执行，即可直接构建出希望的 DOM 树并展示到页面中。这个服务端组装 HTML 的过程，叫做服务端渲染；

![](https://qn.huat.xyz/mac/202407051445870.png)

## SSR 的由来

### Web1.0

在没有 AJAX 的时候，也就是 web1.0 时代，几乎所有应用都是服务端渲染（此时服务器渲染非现在的服务器渲染），那个时候的页面渲染大概是这样的，浏览器请求页面 URL，然后服务器接收到请求之后，到数据库查询数据，将数据丢到后端的组件模板（php、asp、jsp 等）中，并渲染成 HTML 片段，接着服务器在组装这些 HTML 片段，组成一个完整的 HTML，最后返回给浏览器，这个时候，浏览器已经拿到了一个完整的被服务器动态组装出来的 HTML 文本，然后将 HTML 渲染到页面中，过程没有任何 JavaScript 代码的参与。

![](https://qn.huat.xyz/mac/202407051445240.png)

### 客户端渲染

在 WEB1.0 时代，服务端渲染看起来是一个当时的最好的渲染方式，但是随着业务的日益复杂和后续 AJAX 的出现，也渐渐开始暴露出了 WEB1.0 服务器渲染的缺点。

- 每次更新页面的一小的模块，都需要重新请求一次页面，重新查一次数据库，重新组装一次 HTML
- 前端 JavaScript 代码和后端（jsp、php、jsp）代码混杂在一起，使得日益复杂的 WEB 应用难以维护

而且那个时候，根本就没有前端工程师这一职位，前端 js 的活一般都由后端同学 jQuery 一把梭。但是随着前端页面渐渐地复杂了之后，后端开始发现 js 好麻烦，虽然很简单，但是坑太多了，于是让公司招聘了一些专门写 js 的人，也就是前端，这个时候，前后端的鄙视链就出现了，后端鄙视前端，因为后端觉得 js 太简单，无非就是写写页面的特效（JS），切切图（CSS），根本算不上是真正的程序员。

随之 nodejs 的出现，前端看到了翻身的契机，为了摆脱后端的指指点点，前端开启了一场前后端分离的运动，希望可以脱离后端独立发展。前后端分离，表面上看上去是代码分离，实际上是为了前后端人员分离，也就是前后端分家，前端不再归属于后端团队。

前后端分离之后，网页开始被当成了独立的应用程序（SPA，Single Page Application），前端团队接管了所有页面渲染的事，后端团队只负责提供所有数据查询与处理的 API，大体流程是这样的：首先浏览器请求 URL，前端服务器直接返回一个空的静态 HTML 文件（不需要任何查数据库和模板组装），这个 HTML 文件中加载了很多渲染页面需要的 JavaScript 脚本和 CSS 样式表，浏览器拿到 HTML 文件后开始加载脚本和样式表，并且执行脚本，这个时候脚本请求后端服务提供的 API，获取数据，获取完成后将数据通过 JavaScript 脚本动态的将数据渲染到页面中，完成页面显示。

![](https://qn.huat.xyz/mac/202407051445907.png)

这一个前后端分离的渲染模式，也就是客户端渲染（CSR）。

### 服务端渲染

随着单页应用（SPA）的发展，程序员们渐渐发现 SEO（Search Engine Optimazition，即搜索引擎优化）出了问题，而且随着应用的复杂化，JavaScript 脚本也不断的臃肿起来，使得首屏渲染相比于 Web1.0 时候的服务端渲染，也慢了不少。

自己选的路，跪着也要走下去。于是前端团队选择了使用 nodejs 在服务器进行页面的渲染，进而再次出现了服务端渲染。大体流程与客户端渲染有些相似，首先是浏览器请求 URL，前端服务器接收到 URL 请求之后，根据不同的 URL，前端服务器向后端服务器请求数据，请求完成后，前端服务器会组装一个携带了具体数据的 HTML 文本，并且返回给浏览器，浏览器得到 HTML 之后开始渲染页面，同时，浏览器加载并执行 JavaScript 脚本，给页面上的元素绑定事件，让页面变得可交互，当用户与浏览器页面进行交互，如跳转到下一个页面时，浏览器会执行 JavaScript 脚本，向后端服务器请求数据，获取完数据之后再次执行 JavaScript 代码动态渲染页面。

![](https://qn.huat.xyz/mac/202407051446579.png)

## 服务端渲染的利弊

相比于客户端渲染，服务端渲染有什么优势？

### 好处

- 利于 SEO

有利于 SEO，其实就是有利于爬虫来爬你的页面，然后在别人使用搜索引擎搜索相关的内容时，你的网页排行能靠得更前，这样你的流量就有越高。那为什么服务端渲染更利于爬虫爬你的页面呢？其实，爬虫也分低级爬虫和高级爬虫。

- 低级爬虫：只请求 URL，URL 返回的 HTML 是什么内容就爬什么内容。
- 高级爬虫：请求 URL，加载并执行 JavaScript 脚本渲染页面，爬 JavaScript 渲染后的内容。

也就是说，低级爬虫对客户端渲染的页面来说，简直无能为力，因为返回的 HTML 是一个空壳，它需要执行 JavaScript 脚本之后才会渲染真正的页面。而目前像百度、谷歌、微软等公司，有一部分年代老旧的爬虫还属于低级爬虫，使用服务端渲染，对这些低级爬虫更加友好一些。

- 白屏时间更短

相对于客户端渲染，服务端渲染在浏览器请求 URL 之后已经得到了一个带有数据的 HTML 文本，浏览器只需要解析 HTML，直接构建 DOM 树就可以。而客户端渲染，需要先得到一个空的 HTML 页面，这个时候页面已经进入白屏，之后还需要经过加载并执行 JavaScript、请求后端服务器获取数据、JavaScript 渲染页面几个过程才可以看到最后的页面。特别是在复杂应用中，由于需要加载 JavaScript 脚本，越是复杂的应用，需要加载的 JavaScript 脚本就越多、越大，这会导致应用的首屏加载时间非常长，进而降低了体验感。

![](https://qn.huat.xyz/mac/202407051446663.png)

### 缺点

并不是所有的 WEB 应用都必须使用 SSR，这需要开发者自己来权衡，因为服务端渲染会带来以下问题：

- 代码复杂度增加。为了实现服务端渲染，应用代码中需要兼容服务端和客户端两种运行情况，而一部分依赖的外部扩展库却只能在客户端运行，需要对其进行特殊处理，才能在服务器渲染应用程序中运行。
- 需要更多的服务器负载均衡。由于服务器增加了渲染 HTML 的需求，使得原本只需要输出静态资源文件的 nodejs 服务，新增了数据获取的 IO 和渲染 HTML 的 CPU 占用，如果流量突然暴增，有可能导致服务器 down 机，因此需要使用响应的缓存策略和准备相应的服务器负载。
- 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

## Vue SSR

### 实现一个基础的 SSR 应用

核心使用 `createSSRApp` 和 `express` 实现：

```javascript
import { createSSRApp } from 'vue';

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<div @click="count++">{{ count }}</div>`,
  });
}
```

```javascript
import express from 'express';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './app.js';

const server = express();

server.get('/', (req, res) => {
  const app = createApp();

  renderToString(app).then(html => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.use(express.static('.'));

server.listen(3000, () => {
  console.log('ready');
});
```

### 常见方案

Nuxt

[Nuxt](https://nuxt.com/) 是一个构建于 Vue 生态系统之上的全栈框架，它为编写 Vue SSR 应用提供了丝滑的开发体验。更棒的是，你还可以把它当作一个静态站点生成器来用！我们强烈建议你试一试。

Quasar

[Quasar](https://quasar.dev/) 是一个基于 Vue 的完整解决方案，它可以让你用同一套代码库构建不同目标的应用，如 SPA、SSR、PWA、移动端应用、桌面端应用以及浏览器插件。除此之外，它还提供了一整套 Material Design 风格的组件库。

Vite SSR

Vite 提供了内置的 [Vue 服务端渲染支持](https://cn.vitejs.dev/guide/ssr.html)，但它在设计上是偏底层的。如果你想要直接使用 Vite，可以看看 [vite-plugin-ssr](https://vite-plugin-ssr.com/)，一个帮你抽象掉许多复杂细节的社区插件。
