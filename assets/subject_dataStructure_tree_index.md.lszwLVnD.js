import{_ as s,c as a,o as i,V as n}from"./chunks/framework.hxTji2_l.js";const o=JSON.parse('{"title":"树","description":"","frontmatter":{},"headers":[],"relativePath":"subject/dataStructure/tree/index.md","filePath":"subject/dataStructure/tree/index.md","lastUpdated":1707394470000}'),l={name:"subject/dataStructure/tree/index.md"},e=n(`<h1 id="树" tabindex="-1">树 <a class="header-anchor" href="#树" aria-label="Permalink to &quot;树&quot;">​</a></h1><h2 id="树结构" tabindex="-1">树结构 <a class="header-anchor" href="#树结构" aria-label="Permalink to &quot;树结构&quot;">​</a></h2><h3 id="什么是树" tabindex="-1">什么是树？ <a class="header-anchor" href="#什么是树" aria-label="Permalink to &quot;什么是树？&quot;">​</a></h3><h4 id="真实的树" tabindex="-1">真实的树： <a class="header-anchor" href="#真实的树" aria-label="Permalink to &quot;真实的树：&quot;">​</a></h4><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.6pnzzxbinjs0.png" alt="image"></p><h4 id="树的特点" tabindex="-1">树的特点： <a class="header-anchor" href="#树的特点" aria-label="Permalink to &quot;树的特点：&quot;">​</a></h4><ul><li>树一般都有一个根，连接着根的是树干；</li><li>树干会发生分叉，形成许多树枝，树枝会继续分化成更小的树枝；</li><li>树枝的最后是叶子；</li></ul><p>现实生活中很多结构都是树的抽象，模拟的树结构相当于旋转 <code>180°</code> 的树。</p><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.4mrygbtnd6w0.png" alt="image"></p><h4 id="树结构对比于数组-链表-哈希表有哪些优势呢" tabindex="-1">树结构对比于数组/链表/哈希表有哪些优势呢？ <a class="header-anchor" href="#树结构对比于数组-链表-哈希表有哪些优势呢" aria-label="Permalink to &quot;树结构对比于数组/链表/哈希表有哪些优势呢？&quot;">​</a></h4><p>数组：</p><ul><li>优点：可以通过下标值访问，效率高；</li><li>缺点：查找数据时需要先对数据进行排序，生成有序数组，才能提高查找效率；并且在插入和删除元素时，需要大量的位移操作；</li></ul><p>链表：</p><ul><li>优点：数据的插入和删除操作效率都很高；</li><li>缺点：查找效率低，需要从头开始依次查找，直到找到目标数据为止；当需要在链表中间位置插入或删除数据时，插入或删除的效率都不高。</li></ul><p>哈希表：</p><ul><li>优点：哈希表的插入/查询/删除效率都非常高；</li><li>缺点：空间利用率不高，底层使用的数组中很多单元没有被利用；并且哈希表中的元素是无序的，不能按照固定顺序遍历哈希表中的元素；而且不能快速找出哈希表中最大值或最小值这些特殊值。</li></ul><p>树结构：</p><ul><li>优点：树结构综合了上述三种结构的优点，同时也弥补了它们存在的缺点（虽然效率不一定都比它们高），比如树结构中数据都是有序的，查找效率高；空间利用率高；并且可以快速获取最大值和最小值等。</li></ul><p>总的来说：每种数据结构都有自己特定的应用场景。</p><p>树结构：</p><ul><li><p>树（Tree）：由 n（n ≥ 0）个节点构成的有限集合。当 n = 0 时，称为空树。</p></li><li><p>对于任意一棵非空树（n &gt; 0），它具备以下性质：</p><ul><li>数中有一个称为根（Root）的特殊节点，用 <strong>r</strong> 表示；</li><li>其余节点可分为 m（m &gt; 0）个互不相交的有限集合 T1，T2，...，Tm，其中每个集合本身又是一棵树，称为原来树的子树（SubTree）。</li></ul></li></ul><h4 id="树的常用术语" tabindex="-1">树的常用术语： <a class="header-anchor" href="#树的常用术语" aria-label="Permalink to &quot;树的常用术语：&quot;">​</a></h4><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.3t0ypfn5leo0.png" alt="image"></p><ul><li>节点的度（Degree）：节点的子树个数，比如节点 B 的度为 2；</li><li>树的度：树的所有节点中最大的度数，如上图树的度为 2；</li><li>叶节点（Leaf）：度为 0 的节点（也称为叶子节点），如上图的 H，I 等；</li><li>父节点（Parent）：度不为 0 的节点称为父节点，如上图节点 B 是节点 D 和 E 的父节点；</li><li>子节点（Child）：若 B 是 D 的父节点，那么 D 就是 B 的子节点；</li><li>兄弟节点（Sibling）：具有同一父节点的各节点彼此是兄弟节点，比如上图的 B 和 C，D 和 E 互为兄弟节点；</li><li>路径和路径长度：路径指的是一个节点到另一节点的通道，路径所包含边的个数称为路径长度，比如 A-&gt;H 的路径长度为 3；</li><li>节点的层次（Level）：规定根节点在 1 层，其他任一节点的层数是其父节点的层数加 1。如 B 和 C 节点的层次为 2；</li><li>树的深度（Depth）：树种所有节点中的最大层次是这棵树的深度，如上图树的深度为 4；</li></ul><h4 id="树结构的表示方式" tabindex="-1">树结构的表示方式 <a class="header-anchor" href="#树结构的表示方式" aria-label="Permalink to &quot;树结构的表示方式&quot;">​</a></h4><h5 id="最普通的表示方法" tabindex="-1">最普通的表示方法： <a class="header-anchor" href="#最普通的表示方法" aria-label="Permalink to &quot;最普通的表示方法：&quot;">​</a></h5><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.4v9sayu9zu60.png" alt="image"></p><p>如图，树结构的组成方式类似于链表，都是由一个个节点连接构成。不过，根据每个父节点子节点数量的不同，每一个父节点需要的引用数量也不同。比如节点 A 需要 3 个引用，分别指向子节点 B，C，D；B 节点需要 2 个引用，分别指向子节点 E 和 F；K 节点由于没有子节点，所以不需要引用。</p><p>这种方法缺点在于我们无法确定某一结点的引用数。</p><h5 id="儿子-兄弟表示法" tabindex="-1">儿子-兄弟表示法： <a class="header-anchor" href="#儿子-兄弟表示法" aria-label="Permalink to &quot;儿子-兄弟表示法：&quot;">​</a></h5><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.3o34yy6h0420.png" alt="image"></p><p>这种表示方法可以完整地记录每个节点的数据，比如：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//节点A</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Node{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //存储数据</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> data</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //统一只记录左边的子节点</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.leftChild </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> B</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //统一只记录右边的第一个兄弟节点</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.rightSibling </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//节点B</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Node{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> data</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.leftChild </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> E</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.rightSibling </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> C</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//节点F</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Node{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> data</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.leftChild </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.rightSibling </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>这种表示法的优点在于每一个节点中引用的数量都是确定的。</p><h5 id="儿子-兄弟表示法旋转" tabindex="-1">儿子-兄弟表示法旋转 <a class="header-anchor" href="#儿子-兄弟表示法旋转" aria-label="Permalink to &quot;儿子-兄弟表示法旋转&quot;">​</a></h5><p>以下为儿子-兄弟表示法组成的树结构：</p><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.6tucreh71ok0.png" alt="image"></p><p>将其顺时针旋转 45° 之后：</p><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.4blmsiyhevg0.png" alt="image"></p><p>这样就成为了一棵二叉树，由此我们可以得出结论：任何树都可以通过二叉树进行模拟。但是这样父节点不是变了吗？其实，父节点的设置只是为了方便指向子节点，在代码实现中谁是父节点并没有关系，只要能正确找到对应节点即可。</p>`,40),t=[e];function p(h,r,k,E,d,c){return i(),a("div",null,t)}const u=s(l,[["render",p]]);export{o as __pageData,u as default};
