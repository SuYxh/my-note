import{_ as e,o as a,c as s,Q as l}from"./chunks/framework.1c251e17.js";const b=JSON.parse('{"title":"脚手架的实现原理","description":"","frontmatter":{},"headers":[],"relativePath":"workflow/cli/第1章/05-脚手架的实现原理.md","lastUpdated":1699490805000}'),n={name:"workflow/cli/第1章/05-脚手架的实现原理.md"},o=l(`<h1 id="脚手架的实现原理" tabindex="-1">脚手架的实现原理 <a class="header-anchor" href="#脚手架的实现原理" aria-label="Permalink to &quot;脚手架的实现原理&quot;">​</a></h1><h2 id="脚手架实现原理" tabindex="-1">脚手架实现原理 <a class="header-anchor" href="#脚手架实现原理" aria-label="Permalink to &quot;脚手架实现原理&quot;">​</a></h2><p>如果你能回答以下 <strong>3</strong> 个问题，就掌握了脚手架的实现原理：</p><ul><li>为什么全局安装 <code>@vue/cli</code> 后会添加的命令为 <code>vue</code>？</li></ul><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">@vue/cli</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li><p>全局安装 <code>@vue/cli</code> 时发生了什么？</p></li><li><p>执行 <code>vue</code> 命令时发生了什么？为什么 <code>vue</code> 指向一个 <code>js</code> 文件，我们却可以直接通过 <code>vue</code> 命令去执行它？</p></li></ul><h2 id="脚手架原理进阶" tabindex="-1">脚手架原理进阶 <a class="header-anchor" href="#脚手架原理进阶" aria-label="Permalink to &quot;脚手架原理进阶&quot;">​</a></h2><p>掌握上节内容后，我们可以继续尝试回答以下 <strong>2</strong> 个问题：</p><ul><li>为什么说脚手架本质是操作系统的客户端？它和我们在 PC 上安装的应用/软件有什么区别？</li><li>如何为 <code>node</code> 脚手架命令创建别名？</li><li>描述脚手架命令执行的全过程。</li></ul><p><img src="https://qn.huat.xyz/mac/202309011123181.png" alt="cli_process"></p><p>扩展一下，有的同学可能会问下面两种写法的区别？</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/usr/bin/env node</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#!/usr/bin/node</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>第一种是在环境变量中查找 <code>node</code></li><li>第二种是直接执行 <code>/usr/bin/</code> 目录下的 <code>node</code></li></ul>`,13),c=[o];function i(t,p,r,d,u,_){return a(),s("div",null,c)}const m=e(n,[["render",i]]);export{b as __pageData,m as default};
