import{_ as s,c as i,o as a,V as n}from"./chunks/framework.hxTji2_l.js";const u=JSON.parse('{"title":"详解 tsconfig.json 配置文件","description":"","frontmatter":{},"headers":[],"relativePath":"fe/typescript/advance/详解tsconfigjson配置文件.md","filePath":"fe/typescript/advance/详解tsconfigjson配置文件.md","lastUpdated":1707394470000}'),e={name:"fe/typescript/advance/详解tsconfigjson配置文件.md"},t=n(`<h1 id="详解-tsconfig-json-配置文件" tabindex="-1">详解 tsconfig.json 配置文件 <a class="header-anchor" href="#详解-tsconfig-json-配置文件" aria-label="Permalink to &quot;详解 tsconfig.json 配置文件&quot;">​</a></h1><h2 id="tsconfig-json" tabindex="-1">tsconfig.json <a class="header-anchor" href="#tsconfig-json" aria-label="Permalink to &quot;tsconfig.json&quot;">​</a></h2><p>前面我们已经对 tsconfig.json 文件有了一些大致的了解，本小节我们来详解一下这个配置文件。</p><p>这个配置文件主要使用<code>compilerOptions: {}</code>进行 TS 的编译与转化。当然还有一些其他外层可配置的字段，如下：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 编译选项</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;files&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 包含在程序中的文件的允许列表</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;extends&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 继承的另一个配置文件</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;include&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 指定的进行编译解析</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;exclude&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 指定的不进行编译解析</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;references&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 项目引用，提升性能</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>其中 files 和 include 都是指定哪些文件是可以进行编译的，只不过 files 指定的是比较少的文件，多文件的话可以用 include 来进行指定，当然如果要跳过哪些文件不进行编译，就可以利用 exclude 字段。</p><p>extends 可以通过继承的方式去加载另一个配置文件，使用的情况并不是很多。references 可以把编译分成一个一个独立的模块，这样是有助于性能的提升。这些选项都是顶层的，用的最多的还是 compilerOptions 字段。</p><h2 id="compileroptions" tabindex="-1">compilerOptions <a class="header-anchor" href="#compileroptions" aria-label="Permalink to &quot;compilerOptions&quot;">​</a></h2><p>通过<code>tsc --init</code>会自动生成<code>tsconfig.json</code>文件，这个文件会默认带有 6 个选项配置，如下：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;target&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;es2016&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 指定编译成的是哪个版本的js</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;module&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;commonjs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 指定要使用的模块化的规范</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;strict&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 所有严格检查的总开关</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;esModuleInterop&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 兼容JS模块无default的导入</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;skipLibCheck&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 跳过所有.d.ts文件的类型检查</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;forceConsistentCasingInFileNames&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 引入时强制区分大小写</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>除了初始的这些配置外，其他的配置都用注释给注释起来了，同时<code>tsconfig.json</code>把配置选项做了一些分类。</p><ul><li>Projects -&gt; 项目</li><li>Language and Environment -&gt; 语言和环境</li><li>Modules -&gt; 模块</li><li>JavaScript Support -&gt; JS 的支持</li><li>Emit -&gt; 发射</li><li>Interop Constraints -&gt; 操作约束</li><li>Type Checking -&gt; 类型检测</li><li>Completeness -&gt; 完整性</li></ul><p>在<code>Projects</code>分类中，<code>incremental</code>表示增量配置，可以对编译进行缓存，下一次编译会在上一次编译的基础上完成，这样有助于性能；<code>tsBuildInfoFile</code>是增量编译的目录，生成一个缓存文件。</p><p>在<code>Language and Environment</code>分类中表示最终文件会编译成什么样子，<code>target</code>就是转化成 JS 的版本；<code>jsx</code>配置是可以指定<code>tsx</code>转换成<code>jsx</code>还是<code>js</code>。</p><p>在<code>Modules </code>分类是用于控制模块的，<code>module</code>表示模块化转换后的风格，是 ESM 还是 AMD 还是 CJS 等；<code>moduleResolution</code>表示查找模块的方式，如果设置值为<code>node</code>表示查找模块的时候会找<code>node_modules</code>这个文件夹，如果选择其他的方式会导致查找模块的方式发生改变。</p><p>在<code>JavaScript Support</code>分类中主要是对 JS 进行一些配置的，<code>allowJs</code>表示是否允许对 JS 文件进行编译，默认是 false，当开启为 true 的时候，可以把 JS 文件进行编译输出；<code>checkJs</code>表示可以对 JS 文件进行类型检测，如果类型发生改变就会有报错警告。</p><p>在<code>Emit </code>分类中表示编译输出的情况，<code>declaration</code>表示是否生成 d.ts 文件；<code>sourceMap</code>表示是否生成.map 文件。</p><p>在<code>Interop Constraints</code>分类中会对使用进行操作约束，<code>esModuleInterop</code>表示当模块不具备 export default 形式的时候也可以默认导入的方式来使用；<code>forceConsistentCasingInFileNames</code>表示模块引入的时候是否区分大小写。</p><p>在<code>Type Checking</code>分类表示对类型进行检测，<code>strict</code>表示是否开启严格模式，对类型检测会非常的严格，一般建议开启。在严格模式下限制是非常多的，例如：当一个变量是 any 类型的时候也要去指定一下类型；null 不能成为其他类型的子类型，所以 null 不能随便赋值给其他类型等等。</p><p>在<code>Completeness </code>分类表示是否具备完整性检测，<code>skipLibCheck</code>表示是否跳过对 d.ts 的类型检测，默认都是跳过的。</p><p><img src="https://qn.huat.xyz/mac/202310272220247.png" alt="image-20231027222052221"></p><p><img src="https://qn.huat.xyz/mac/202310272219073.png" alt="image-20231027221918022"></p><p><img src="https://qn.huat.xyz/mac/202310272219257.png" alt="image-20231027221932231"></p>`,23),p=[t];function l(o,h,c,d,r,k){return a(),i("div",null,p)}const E=s(e,[["render",l]]);export{u as __pageData,E as default};
