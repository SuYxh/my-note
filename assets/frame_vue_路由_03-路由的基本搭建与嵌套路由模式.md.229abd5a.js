import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1c251e17.js";const B=JSON.parse('{"title":"路由的基本搭建与嵌套路由模式","description":"","frontmatter":{},"headers":[],"relativePath":"frame/vue/路由/03-路由的基本搭建与嵌套路由模式.md","lastUpdated":1699490805000}'),p={name:"frame/vue/路由/03-路由的基本搭建与嵌套路由模式.md"},o=l(`<h1 id="路由的基本搭建与嵌套路由模式" tabindex="-1">路由的基本搭建与嵌套路由模式 <a class="header-anchor" href="#路由的基本搭建与嵌套路由模式" aria-label="Permalink to &quot;路由的基本搭建与嵌套路由模式&quot;">​</a></h1><p>在前面的小节中，已经介绍了什么是前端路由以及前端路由所具备的特点。本小节就来对路由进行实际搭建吧。</p><h2 id="vue-路由的搭建" tabindex="-1">vue 路由的搭建 <a class="header-anchor" href="#vue-路由的搭建" aria-label="Permalink to &quot;vue 路由的搭建&quot;">​</a></h2><p>路由在 vue 中属于第三方插件，需要下载安装后进行使用。版本说明一下，Vue3 搭配的是 Vue Router4，目前正常安装的话，就是路由 4 的版本。如下：</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">vue-router</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>安装好后，需要对路由进行配置，并且与 Vue 进行结合，让路由插件生效。在<code>/src/router/index.js</code>创建配置文件。</p><p><img src="https://qn.huat.xyz/mac/202310271720728.png" alt="06-01-配置路由信息"></p><p>可以通过 createWebHistory()来创建 history 模式的路由，也可以通过 createWebHashHistory()来创建 hash 模式的路由。那么在浏览器中输入的 URL 该如何展示对应的组件呢？可以通过<code>&lt;router-view&gt;</code>这个组件来实现。</p><p>除了<code>&lt;router-view&gt;</code>进行展示外，还可以通过<code>&lt;router-link&gt;</code>方式进行声明式的路由跳转，代码如下：</p><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">首页</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">router-link</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> |</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/about</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">关于</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">router-link</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="嵌套路由模式" tabindex="-1">嵌套路由模式 <a class="header-anchor" href="#嵌套路由模式" aria-label="Permalink to &quot;嵌套路由模式&quot;">​</a></h2><p>往往我们的路由是比较复杂的，需要的层级也比较多，那么就会产生嵌套路由的模式，比如：<code>localhost:8080/about/foo</code>和<code>localhost:8080/about/bar</code></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> Foo </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/views/Foo.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> Bar </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/views/Bar.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> routes </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/about</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">component</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> About</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">component</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> Foo</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">component</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> Bar</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">    ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>可以看到嵌套路由是通过 children 属性来完成的，那么对于这种嵌套路由写法，我们对应的<code>&lt;router-view&gt;</code>也要在一级路由对应页面中添加一个，这样才能切换显示二级路由所对应的页面。</p>`,14),e=[o];function t(r,c,D,F,i,y){return n(),a("div",null,e)}const b=s(p,[["render",t]]);export{B as __pageData,b as default};
