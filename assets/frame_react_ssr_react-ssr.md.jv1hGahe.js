import{_ as s,c as a,o as e,V as i}from"./chunks/framework.hxTji2_l.js";const b=JSON.parse('{"title":"SSR","description":"","frontmatter":{},"headers":[],"relativePath":"frame/react/ssr/react-ssr.md","filePath":"frame/react/ssr/react-ssr.md","lastUpdated":1721552467000}'),n={name:"frame/react/ssr/react-ssr.md"},t=i(`<h1 id="ssr" tabindex="-1">SSR <a class="header-anchor" href="#ssr" aria-label="Permalink to &quot;SSR&quot;">​</a></h1><p>ssr 全称 server-side render，意为服务端渲染</p><h2 id="ssr-方案的价值" tabindex="-1">SSR 方案的价值 <a class="header-anchor" href="#ssr-方案的价值" aria-label="Permalink to &quot;SSR 方案的价值&quot;">​</a></h2><p>SSR 方案最大的用途可以概括为** <strong><strong>SEO</strong></strong> 友好**、<strong>极大提升网页访问速度（特别是首屏加载</strong>）。其实这项技术非常古老，还记得我刚入门开发时，写过 Java，那会儿 Java 还用 <strong>servlet</strong>** + jsp** 编写页面 + 服务逻辑。现在前端通用 SSR 方案只是将 Java 换成了 nodejs。</p><h2 id="nextjs-服务端开发指南" tabindex="-1">Nextjs 服务端开发指南 <a class="header-anchor" href="#nextjs-服务端开发指南" aria-label="Permalink to &quot;Nextjs 服务端开发指南&quot;">​</a></h2><p>我们使用 nextjs 提供的脚手架初始化项目</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create-next-app nextjs-blog</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>安装依赖</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>启动应用</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="约定式路由" tabindex="-1">约定式路由 <a class="header-anchor" href="#约定式路由" aria-label="Permalink to &quot;约定式路由&quot;">​</a></h3><p>什么是约定式路由？就是项目中 pages 下的文件结构直接对应于路由系统，比如我们现在有一个路由 <code>/heyi</code>，那么在 <code>pages</code> 文件夹下，就有一个 <code>heyi.ts</code> 。</p><h3 id="link、head、layout" tabindex="-1">Link、Head、Layout <a class="header-anchor" href="#link、head、layout" aria-label="Permalink to &quot;Link、Head、Layout&quot;">​</a></h3><p>Link 组件类似 react-router 的 Link，需要注意的是一般推荐跳转相关逻辑尽量使用 Link，为什么呢？因为语义以及用户可用性。</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Link href</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Back to home</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Link</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="getstaticprops" tabindex="-1">getStaticProps <a class="header-anchor" href="#getstaticprops" aria-label="Permalink to &quot;getStaticProps&quot;">​</a></h3><p>用于获取组件初始值</p><p>该方法在运行时自动处理参数，并将处理后返回值交给 React 组件进行渲染</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Home</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getStaticProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Get external data from the file system, API, DB, etc.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // The value of the \`props\` key will be</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //  passed to the \`Home\` component</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    props: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>前端 react 使用 <code>ReactDOM.hydrateRoot</code>，后端 react 使用 <code>ReactDOM.renderToString</code></p><h2 id="深入理解-hydrate-与-rendertostring、rendertoreadablestream" tabindex="-1">深入理解 hydrate 与 renderToString、renderToReadableStream <a class="header-anchor" href="#深入理解-hydrate-与-rendertostring、rendertoreadablestream" aria-label="Permalink to &quot;深入理解 hydrate 与 renderToString、renderToReadableStream&quot;">​</a></h2><p>前面我们通过示例看到，react ssr 的方案可以大致总结为：</p><p>服务端将 react 组件代码转为 html 字符串，返回给客户端，客户端获取到内容后，需要进行注水及事件处理。</p><h3 id="rendertostring" tabindex="-1">renderToString <a class="header-anchor" href="#rendertostring" aria-label="Permalink to &quot;renderToString&quot;">​</a></h3><p>在服务端，调用 renderToString 方法后，会将 <code>React</code> 元素转化为初始 <code>HTML</code> 。 需要注意的是，此时只是进行简单的模板解析转换，数据请求等，时间的绑定与数据的消费均不发生在此刻。</p><p>我们提到的服务端数据请求并提供给客户端的过程，称之为：<strong>注水</strong>，客户端拿到数据进行消费，称之为：<strong>脱水</strong></p><h3 id="rendertoreadablestream" tabindex="-1">renderToReadableStream <a class="header-anchor" href="#rendertoreadablestream" aria-label="Permalink to &quot;renderToReadableStream&quot;">​</a></h3><p>流式 SSR，其实这也不是什么新概念，相信大家以前做过文件下载吧？很多时候我们文件下载的形式就是基于流。通过二进制流替代字符串类型返回。</p><h3 id="hydrate" tabindex="-1">hydrate <a class="header-anchor" href="#hydrate" aria-label="Permalink to &quot;hydrate&quot;">​</a></h3><p>顾名思义，水合。</p><p>上面我们提到服务端将 react 内容转为 html string 并返回了，此时客户端需要请求组件数据并将数据渲染到页面，称为：<strong>脱水</strong>，另外，事件的绑定也发生在此刻，react 通过事件委托机制，实现组件的事件绑定，最终完成页面渲染。</p><p><img src="https://qn.huat.xyz/mac/202407211653073.png" alt=""></p><p>具体实现见源码</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">node api</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.js</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pnpm dev</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="注意点" tabindex="-1">注意点 <a class="header-anchor" href="#注意点" aria-label="Permalink to &quot;注意点&quot;">​</a></h3><ol><li><code>renderToString</code> 有什么作用？</li><li>为什么服务端加载了一次，客户端还需要再次加载呢？</li><li>服务端加载了 <code>React</code> 输出的代码片段，客户端又执行了一次，这样是不是会加载两次导致资源浪费呢？</li></ol><h3 id="reactdomserver-rendertostring-element" tabindex="-1"><strong>ReactDOMServer.renderToString(element)</strong> <a class="header-anchor" href="#reactdomserver-rendertostring-element" aria-label="Permalink to &quot;**ReactDOMServer.renderToString(element)**&quot;">​</a></h3><p>将 <code>React</code> 元素渲染为初始 <code>HTML</code> 。 <code>React</code> 将返回一个 <code>HTML</code> 字符串。你可以使用此方法在服务端生成 <code>HTML</code> ，并在首次请求时将标记下发，以加快页面加载速度，并允许搜索引擎爬取你的页面以达到 <code>SEO</code> 优化的目的。</p><p><strong>为什么服务端加载了一次，客户端还需要再次加载呢？</strong></p><p>原因很简单，服务端使用 <code>renderToString</code> 渲染页面，而 <code>react-dom/server</code> 下的 <code>renderToString</code> 并没有做事件相关的处理，因此返回给浏览器的内容不会有事件绑定，渲染出来的页面只是一个静态的 <code>HTML</code> 页面。只有在客户端渲染 <code>React</code> 组件并初始化 <code>React</code> 实例后，才能更新组件的 <code>state</code> 和 <code>props</code> ，初始化 <code>React</code> 的事件系统，让 <code>React</code> 组件真正“ 动” 起来。</p><p><strong>是否会加载两次？</strong></p><p>如果你在已有服务端渲染标记的节点上调用 <code>ReactDOM.hydrate()</code> 方法， <code>React</code> 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。因此不必担心加载多次的问题。</p><h1 id="手写同构应用" tabindex="-1">手写同构应用 <a class="header-anchor" href="#手写同构应用" aria-label="Permalink to &quot;手写同构应用&quot;">​</a></h1><p>见源码</p>`,46),r=[t];function p(l,d,h,o,c,k){return e(),a("div",null,r)}const u=s(n,[["render",p]]);export{b as __pageData,u as default};