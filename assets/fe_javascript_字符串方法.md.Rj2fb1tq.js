import{_ as s,c as i,o as a,V as t}from"./chunks/framework.hxTji2_l.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fe/javascript/字符串方法.md","filePath":"fe/javascript/字符串方法.md","lastUpdated":1709469050000}'),e={name:"fe/javascript/字符串方法.md"},n=t('<h2 id="增" tabindex="-1">增 <a class="header-anchor" href="#增" aria-label="Permalink to &quot;增&quot;">​</a></h2><h3 id="concat" tabindex="-1"><code>concat()</code> <a class="header-anchor" href="#concat" aria-label="Permalink to &quot;`concat()`&quot;">​</a></h3><ul><li><strong>定义</strong>: <code>concat()</code> 方法用于将一个或多个字符串与原字符串连接合并，形成一个新的字符串。</li><li><strong>参数</strong>: <code>string2, string3, ..., stringN</code>。一个或多个要合并的字符串。</li><li><strong>返回值</strong>: 合并后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 可以接受多个参数，依次连接。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hello </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> world </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(hello.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">concat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(world)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;Hello, world!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li></ul><h2 id="删" tabindex="-1">删 <a class="header-anchor" href="#删" aria-label="Permalink to &quot;删&quot;">​</a></h2><h3 id="slice-start-end" tabindex="-1"><code>slice(start, end)</code> <a class="header-anchor" href="#slice-start-end" aria-label="Permalink to &quot;`slice(start, end)`&quot;">​</a></h3><ul><li><strong>定义</strong>: <code>slice()</code> 方法从一个字符串中提取一个子字符串，并返回这个新的子字符串。这个方法接受两个参数：<code>start</code>（开始索引，包含该索引处的字符）和 <code>end</code>（结束索引，但不包含该索引处的字符）。</li><li><strong>特点</strong>: 如果参数是负数，<code>slice()</code> 将它们视为字符串的倒数第几个字符。如果 <code>end</code> 参数被省略，提取会一直到字符串的末尾。</li></ul><h3 id="substring-start-end" tabindex="-1"><code>substring(start, end)</code> <a class="header-anchor" href="#substring-start-end" aria-label="Permalink to &quot;`substring(start, end)`&quot;">​</a></h3><ul><li><strong>定义</strong>: <code>substring()</code> 方法也是用来提取字符串中介于两个指定下标之间的字符。<code>start</code> 和 <code>end</code> 参数指定了开始和结束的下标。</li><li><strong>特点</strong>: 与 <code>slice()</code> 不同，<code>substring()</code> 不接受负数参数；如果传入负数，它会被自动转换为 <code>0</code>。如果 <code>end</code> 小于 <code>start</code>，<code>substring()</code> 会交换这两个参数，确保始终从较小的索引到较大的索引提取。</li></ul><h3 id="substr-start-length" tabindex="-1"><code>substr(start, length)</code> <a class="header-anchor" href="#substr-start-length" aria-label="Permalink to &quot;`substr(start, length)`&quot;">​</a></h3><ul><li><strong>定义</strong>: <code>substr()</code> 方法从字符串中提取长度为 <code>length</code> 的子字符串，起始索引由 <code>start</code> 参数指定。</li><li><strong>特点</strong>: 如果 <code>start</code> 是负数，<code>start</code> 被视为从字符串末尾开始的倒数第几个字符。<code>length</code> 是提取的字符数。如果 <code>length</code> 被省略，提取到字符串的末尾。</li></ul><h3 id="主要区别" tabindex="-1">主要区别 <a class="header-anchor" href="#主要区别" aria-label="Permalink to &quot;主要区别&quot;">​</a></h3><ul><li><strong>参数解释</strong>: <code>slice()</code> 和 <code>substring()</code> 的第二个参数是结束索引（不包含），而 <code>substr()</code> 的第二个参数是提取的长度。</li><li><strong>对负数的处理</strong>: <code>slice()</code> 可以接受负数参数，<code>substring()</code> 会将负数参数转换为 <code>0</code>，<code>substr()</code> 中的负数 <code>start</code> 参数意味着从字符串末尾开始计数。</li><li><strong>方法的选择</strong>: <code>substr()</code> 方法在某些JavaScript环境中已被弃用（如ECMAScript 2015及之后的版本），推荐使用 <code>slice()</code> 或 <code>substring()</code>。</li></ul><p>在实际编程中，根据需要提取字符串的特定部分，可以灵活选择这三个方法中的任何一个，但考虑到未来的兼容性和推荐做法，<code>slice()</code> 通常是更好的选择。</p><h2 id="改" tabindex="-1">改 <a class="header-anchor" href="#改" aria-label="Permalink to &quot;改&quot;">​</a></h2><h4 id="trim" tabindex="-1"><code>trim()</code> <a class="header-anchor" href="#trim" aria-label="Permalink to &quot;`trim()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>trim()</code> 方法用于去除字符串两端的空白字符。</li><li><strong>参数</strong>: 无。</li><li><strong>返回值</strong>: 去除两端空白字符后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 去除的空白字符包括空格、制表符、换行符等。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;  Hello, world!  &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;Hello, world!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="trimleft-trimstart" tabindex="-1"><code>trimLeft()</code> / <code>trimStart()</code> <a class="header-anchor" href="#trimleft-trimstart" aria-label="Permalink to &quot;`trimLeft()` / `trimStart()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>trimLeft()</code> 或 <code>trimStart()</code> 方法用于去除字符串左端的空白字符。</li><li><strong>参数</strong>: 无。</li><li><strong>返回值</strong>: 去除左端空白字符后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 类似 <code>trim()</code>，但仅作用于字符串的左侧。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;  Hello, world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trimLeft</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;Hello, world!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="trimright-trimend" tabindex="-1"><code>trimRight()</code> / <code>trimEnd()</code> <a class="header-anchor" href="#trimright-trimend" aria-label="Permalink to &quot;`trimRight()` / `trimEnd()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>trimRight()</code> 或 <code>trimEnd()</code> 方法用于去除字符串右端的空白字符。</li><li><strong>参数</strong>: 无。</li><li><strong>返回值</strong>: 去除右端空白字符后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 类似 <code>trim()</code>，但仅作用于字符串的右侧。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, world!  &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trimRight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;Hello, world!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="repeat" tabindex="-1"><code>repeat()</code> <a class="header-anchor" href="#repeat" aria-label="Permalink to &quot;`repeat()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>repeat()</code> 方法构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。</li><li><strong>参数</strong>: <code>count</code>。表示重复次数的整数。</li><li><strong>返回值</strong>: 重复指定次数后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 如果 <code>count</code> 为 <code>0</code>，返回空字符串。如果 <code>count</code> 不是整数，会被转换为整数。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;abc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;abcabcabc&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="padend" tabindex="-1"><code>padEnd()</code> <a class="header-anchor" href="#padend" aria-label="Permalink to &quot;`padEnd()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>padEnd()</code> 方法用另一个字符串填充当前字符串（如果需要的话则重复填充），以便产生的字符串达到给定的长度。填充从当前字符串的末尾（右侧）开始。</li><li><strong>参数</strong>: <code>targetLength</code>（目标长度），<code>padString</code>（用来填充的字符串，默认是空格）。</li><li><strong>返回值</strong>: 达到指定长度后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 如果原字符串的长度已经等于或超过目标长度，则返回原字符串。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">padEnd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;Hello.....&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="tolowercase-touppercase" tabindex="-1"><code>toLowerCase()</code>, <code>toUpperCase()</code> <a class="header-anchor" href="#tolowercase-touppercase" aria-label="Permalink to &quot;`toLowerCase()`, `toUpperCase()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>toLowerCase()</code> 方法返回字符串的小</li></ul><p>写形式。<code>toUpperCase()</code> 方法返回字符串的大写形式。</p><ul><li><strong>参数</strong>: 无。</li><li><strong>返回值</strong>: 转换后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: <code>toLowerCase()</code> 将所有大写字母转换为小写，<code>toUpperCase()</code> 将所有小写字母转换为大写。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, World!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toLowerCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;hello, world!&quot;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toUpperCase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;HELLO, WORLD!&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li></ul><h4 id="split" tabindex="-1"><code>split()</code> <a class="header-anchor" href="#split" aria-label="Permalink to &quot;`split()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>split()</code> 方法使用指定的分隔符字符串将一个<code>String</code>对象分割成字符串数组。</li><li><strong>参数</strong>: <code>separator</code>（分隔符），<code>limit</code>（限制结果数组的大小）。</li><li><strong>返回值</strong>: 分割后的字符串数组。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 如果没有指定分隔符，整个字符串会作为一个单一的数组元素返回。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">split</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;, &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [&quot;Hello&quot;, &quot;world!&quot;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h3 id="查" tabindex="-1">查 <a class="header-anchor" href="#查" aria-label="Permalink to &quot;查&quot;">​</a></h3><h4 id="charat" tabindex="-1"><code>charAt()</code> <a class="header-anchor" href="#charat" aria-label="Permalink to &quot;`charAt()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>charAt()</code> 方法从一个字符串中返回指定位置的字符。</li><li><strong>参数</strong>: <code>index</code>。字符的索引位置。</li><li><strong>返回值</strong>: 在指定索引处的字符。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 如果 <code>index</code> 超出了字符串的范围，<code>charAt()</code> 返回一个空字符串。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">charAt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;e&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="startswith" tabindex="-1"><code>startsWith()</code> <a class="header-anchor" href="#startswith" aria-label="Permalink to &quot;`startsWith()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>startsWith()</code> 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 <code>true</code> 或 <code>false</code>。</li><li><strong>参数</strong>: <code>searchString</code>（要搜索的子字符串），<code>position</code>（在字符串中搜索 <code>searchString</code> 的开始位置，可选，默认为 <code>0</code>）。</li><li><strong>返回值</strong>: 布尔值。如果字符串以指定的子字符串开始，则返回 <code>true</code>；否则返回 <code>false</code>。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 对大小写敏感。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">startsWith</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><p>在JavaScript中，<code>includes()</code> 和 <code>indexOf()</code> 是两个常用于字符串和数组对象的方法，用于检查一个字符串或数组中是否包含某个特定的子字符串或元素。尽管它们的目的相似，但在使用和返回值上存在一些差异。</p><h4 id="includes-valuetofind-fromindex" tabindex="-1"><code>includes(valueToFind, fromIndex)</code> <a class="header-anchor" href="#includes-valuetofind-fromindex" aria-label="Permalink to &quot;`includes(valueToFind, fromIndex)`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>includes()</code> 方法用来判断一个字符串是否包含另一个字符串，或一个数组是否包含某个元素。</li><li><strong>参数</strong>: <ul><li><code>valueToFind</code>: 要搜索的字符串或元素。</li><li><code>fromIndex</code> (可选): 开始搜索的位置，默认为 <code>0</code>。对于字符串，这是字符的索引；对于数组，这是元素的索引。</li></ul></li><li><strong>返回值</strong>: 布尔值（<code>true</code> 或 <code>false</code>）。如果找到指定的值，则返回 <code>true</code>；否则，返回 <code>false</code>。</li><li><strong>特点</strong>: <code>includes()</code> 是ES2016（ES7）引入的，对大小写敏感。</li></ul><h4 id="indexof-searchelement-fromindex" tabindex="-1"><code>indexOf(searchElement, fromIndex)</code> <a class="header-anchor" href="#indexof-searchelement-fromindex" aria-label="Permalink to &quot;`indexOf(searchElement, fromIndex)`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>indexOf()</code> 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。对于字符串，<code>indexOf()</code> 方法返回指定值（子字符串）首次出现的索引，如果未找到，则返回 <code>-1</code>。</li><li><strong>参数</strong>: <ul><li><code>searchElement</code>: 要搜索的元素或子字符串。</li><li><code>fromIndex</code> (可选): 开始查找的位置。如果该值为负数，则它将从数组的末尾开始计算起始点。对于字符串，如果 <code>fromIndex</code> 大于或等于字符串的长度，返回 <code>-1</code>，即不会进行搜索。</li></ul></li><li><strong>返回值</strong>: 第一个匹配元素的索引。如果没有找到匹配的元素，则返回 <code>-1</code>。</li><li><strong>特点</strong>: 对大小写敏感。</li></ul><p>主要区别</p><ul><li><strong>返回值</strong>: <code>includes()</code> 返回一个布尔值，表示是否找到了指定的值。而 <code>indexOf()</code> 返回第一个匹配项的索引位置；如果未找到匹配项，则返回 <code>-1</code>。</li><li><strong>用途</strong>: <ul><li>使用 <code>includes()</code> 更适合于仅需要知道是否存在某值的情况，不关心其位置。</li><li>使用 <code>indexOf()</code> 时，除了知道是否存在外，还可以知道该值的具体位置（如果存在）。</li></ul></li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Hello, world!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">includes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;world&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;world&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 7</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> arr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">includes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>总结来说，<code>includes()</code> 和 <code>indexOf()</code> 都是用于检测字符串或数组中是否包含某个特定值的方法，但它们在判断存在性和确定位置方面各有侧重。选择哪一个取决于你的具体需求。</p><h3 id="匹配方法" tabindex="-1">匹配方法 <a class="header-anchor" href="#匹配方法" aria-label="Permalink to &quot;匹配方法&quot;">​</a></h3><h4 id="match" tabindex="-1"><code>match()</code> <a class="header-anchor" href="#match" aria-label="Permalink to &quot;`match()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>match()</code> 方法在字符串内搜索指定的正则表达式的匹配。</li><li><strong>参数</strong>: <code>regexp</code>（正则表达式对象）。</li><li><strong>返回值</strong>: 如果找到匹配的文本，则返回一个包含该文本的数组；如果没有找到匹配，则返回 <code>null</code>。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 如果正则表达式包含 <code>g</code> 标志，返回所有匹配项。如果不包含，只返回第一个匹配项。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;The rain in SPAIN stays mainly in the plain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">ain</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [&quot;ain&quot;, &quot;ain&quot;, &quot;ain&quot;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="search" tabindex="-1"><code>search()</code> <a class="header-anchor" href="#search" aria-label="Permalink to &quot;`search()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>search()</code> 方法执行正则表达式和 <code>String</code> 对象之间的一个搜索匹配。</li><li><strong>参数</strong>: <code>regexp</code>（正则表达式对象）。</li><li><strong>返回值</strong>: 如果匹配成功，则返回正则表达式在字符串中的索引（即匹配到的位置）；否则返回 <code>-1</code>。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 无法全局搜索，只返回第一个匹配项的索引。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">search</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;world&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h4 id="replace" tabindex="-1"><code>replace()</code> <a class="header-anchor" href="#replace" aria-label="Permalink to &quot;`replace()`&quot;">​</a></h4><ul><li><strong>定义</strong>: <code>replace()</code> 方法返回一个新字符串，其中</li></ul><p>某个或某些匹配模式的子串被替换为提供的替换字符串。</p><ul><li><strong>参数</strong>: <code>searchValue</code>（一个字符串或正则表达式），<code>replaceValue</code>（一个字符串或一个函数）。</li><li><strong>返回值</strong>: 替换后的新字符串。</li><li><strong>是否改变原字符串</strong>: 不改变原字符串。</li><li><strong>特点</strong>: 如果使用字符串作为搜索值，则只会替换第一个匹配项。要替换所有匹配项，需要使用带有全局搜索标志（<code>g</code>）的正则表达式。</li><li><strong>案例</strong>:<div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Apples are round, and apples are juicy.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;apples&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;oranges&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &quot;Apples are round, and oranges are juicy.&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul>',53),l=[n];function r(h,o,p,d,k,c){return a(),i("div",null,l)}const u=s(e,[["render",r]]);export{E as __pageData,u as default};
