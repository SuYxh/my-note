import{_ as a,o as e,c as t,Q as f}from"./chunks/framework.1c251e17.js";const l=JSON.parse('{"title":"React18 与 Vue3 对比之 diff 算法的相同策略与不同策略","description":"","frontmatter":{},"headers":[],"relativePath":"frame/different/06-React18与Vue3对比之diff算法的相同策略与不同策略.md","lastUpdated":1699490805000}'),i={name:"frame/different/06-React18与Vue3对比之diff算法的相同策略与不同策略.md"},d=f('<h1 id="react18-与-vue3-对比之-diff-算法的相同策略与不同策略" tabindex="-1">React18 与 Vue3 对比之 diff 算法的相同策略与不同策略 <a class="header-anchor" href="#react18-与-vue3-对比之-diff-算法的相同策略与不同策略" aria-label="Permalink to &quot;React18 与 Vue3 对比之 diff 算法的相同策略与不同策略&quot;">​</a></h1><h2 id="diff-算法的相同策略" tabindex="-1">diff 算法的相同策略 <a class="header-anchor" href="#diff-算法的相同策略" aria-label="Permalink to &quot;diff 算法的相同策略&quot;">​</a></h2><p>首先两个框架都是采用了同层级对比的方式，这样可以大大减少对比的次数。</p><p><img src="https://qn.huat.xyz/mac/202310231353747.png" alt="18-01-diff算法同层级对比"></p><p>当两个节点进行对比的时候，要分不同的情况进行处理。</p><div align="center"><img src="https://qn.huat.xyz/mac/202310231352323.png"><div>diff算法对比情况</div></div><p>大部分的策略都是一样的，只有当两个字节都存在子节点的时候，对比方案才有所区别。</p><h2 id="diff-算法的不同策略" tabindex="-1">diff 算法的不同策略 <a class="header-anchor" href="#diff-算法的不同策略" aria-label="Permalink to &quot;diff 算法的不同策略&quot;">​</a></h2><p>下面是一个具体的案例，来分别看一下 Vue 和 React 是如何进行处理的。</p><p><img src="https://qn.huat.xyz/mac/202310231354843.png" alt="18-03-子节点不同的案例"></p><p>下面先看一下 Vue 的策略，即数组格式，首尾对比，最长递增子序列。</p><p><img src="https://qn.huat.xyz/mac/202310231354848.png" alt="18-04-Vue的diff策略"></p><p>再看一下 React 的策略，即 r 链表格式，从左到右，索引比较。</p><p><img src="https://qn.huat.xyz/mac/202310231354792.png" alt="18-05-React的diff策略"></p>',14),c=[d];function r(_,p,n,s,o,h){return e(),t("div",null,c)}const m=a(i,[["render",r]]);export{l as __pageData,m as default};
