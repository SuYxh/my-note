import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1c251e17.js";const u=JSON.parse('{"title":"枚举类型与 const 枚举","description":"","frontmatter":{},"headers":[],"relativePath":"fe/typescript/base/12-枚举类型与const枚举.md","lastUpdated":1699490805000}'),p={name:"fe/typescript/base/12-枚举类型与const枚举.md"},o=l(`<h1 id="枚举类型与-const-枚举" tabindex="-1">枚举类型与 const 枚举 <a class="header-anchor" href="#枚举类型与-const-枚举" aria-label="Permalink to &quot;枚举类型与 const 枚举&quot;">​</a></h1><h2 id="枚举类型" tabindex="-1">枚举类型 <a class="header-anchor" href="#枚举类型" aria-label="Permalink to &quot;枚举类型&quot;">​</a></h2><p>枚举是组织收集有关联集合的一种方式，使代码更加易于阅读。其实简单来说枚举就是定义一组常量。</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">enum</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Roles</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  SUPER_ADMIN</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  ADMIN </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  USER</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(Roles</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">SUPER_ADMIN)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 0</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(Roles</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">ADMIN)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 3</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(Roles</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">USER)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 4</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>枚举默认不给值的情况下，就是一个从 0 开始的数字，是可以自动进行累加的，当然也可以自己指定数值，后面的数值也是可以累加的。</p><p>枚举也支持反向枚举操作，通过数值来找到对应的 key 属性，这样操作起来会非常的灵活。</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">enum</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Roles</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  SUPER_ADMIN</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  ADMIN </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  USER</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(Roles[</span><span style="color:#F78C6C;">0</span><span style="color:#BABED8;">])</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// SUPER_ADMIN</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(Roles[</span><span style="color:#F78C6C;">3</span><span style="color:#BABED8;">])</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// ADMIN</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(Roles[</span><span style="color:#F78C6C;">4</span><span style="color:#BABED8;">])</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// USER</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>枚举给我们的编程带来的好处就是更容易阅读代码，举例如下：</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#BABED8;"> (role </span><span style="color:#89DDFF;">===</span><span style="color:#BABED8;"> Roles</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">SUPER_ADMIN) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 更容易阅读</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>下面来看一下，如果定义成字符串的话，需要注意一些什么？</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">enum</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Roles</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  SUPER_ADMIN </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">super_admin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  ADMIN </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">admin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  USER </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">user</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>字符串形式是没有默认值的，而且不能做反向映射的。</p><h2 id="const-枚举" tabindex="-1">const 枚举 <a class="header-anchor" href="#const-枚举" aria-label="Permalink to &quot;const 枚举&quot;">​</a></h2><p>在枚举的前面可以添加一个 const 关键字。</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">enum</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Roles</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  SUPER_ADMIN </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">super_admin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  ADMIN </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">admin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  USER </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">user</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>那么没有 const 关键字和有 const 关键字的区别是什么呢？主要区别在于编译的最终结果，const 方式最终编译出来的就是一个普通字符串，并不会产生一个对象，更有助于性能的体现。</p>`,16),e=[o];function t(c,r,D,i,y,F){return n(),a("div",null,e)}const A=s(p,[["render",t]]);export{u as __pageData,A as default};
