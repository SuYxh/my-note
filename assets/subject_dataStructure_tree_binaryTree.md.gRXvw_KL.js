import{_ as t,c as e,o as a,V as l}from"./chunks/framework.hxTji2_l.js";const x=JSON.parse('{"title":"二叉树","description":"","frontmatter":{},"headers":[],"relativePath":"subject/dataStructure/tree/binaryTree.md","filePath":"subject/dataStructure/tree/binaryTree.md","lastUpdated":1707394470000}'),n={name:"subject/dataStructure/tree/binaryTree.md"},r=l('<h1 id="二叉树" tabindex="-1">二叉树 <a class="header-anchor" href="#二叉树" aria-label="Permalink to &quot;二叉树&quot;">​</a></h1><h2 id="二叉树-1" tabindex="-1">二叉树 <a class="header-anchor" href="#二叉树-1" aria-label="Permalink to &quot;二叉树&quot;">​</a></h2><h3 id="二叉树的概念" tabindex="-1">二叉树的概念 <a class="header-anchor" href="#二叉树的概念" aria-label="Permalink to &quot;二叉树的概念&quot;">​</a></h3><p>如果树中的每一个节点最多只能由两个子节点，这样的树就称为二叉树；</p><h3 id="二叉树的组成" tabindex="-1">二叉树的组成 <a class="header-anchor" href="#二叉树的组成" aria-label="Permalink to &quot;二叉树的组成&quot;">​</a></h3><ul><li>二叉树可以为空，也就是没有节点；</li><li>若二叉树不为空，则它由根节点和称为其左子树 TL 和右子树 TR 的两个不相交的二叉树组成；</li></ul><h3 id="二叉树的五种形态" tabindex="-1">二叉树的五种形态 <a class="header-anchor" href="#二叉树的五种形态" aria-label="Permalink to &quot;二叉树的五种形态&quot;">​</a></h3><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.15ycsg4fqoio.png" alt="image"></p><p>上图分别表示：空的二叉树、只有一个节点的二叉树、只有左子树 TL 的二叉树、只有右子树 TR 的二叉树和有左右两个子树的二叉树。</p><h3 id="二叉树的特性" tabindex="-1">二叉树的特性 <a class="header-anchor" href="#二叉树的特性" aria-label="Permalink to &quot;二叉树的特性&quot;">​</a></h3><ul><li>一个二叉树的第 i 层的最大节点树为：2^(i-1)^，i &gt;= 1；</li><li>深度为 k 的二叉树的最大节点总数为：2^k^ - 1 ，k &gt;= 1；</li><li>对任何非空二叉树，若 n~0~ 表示叶子节点的个数，n~2~表示度为 2 的非叶子节点个数，那么两者满足关系：n~0~ = n~2~ + 1；如下图所示：H，E，I，J，G 为叶子节点，总数为 5；A，B，C，F 为度为 2 的非叶子节点，总数为 4；满足 n~0~ = n~2~ + 1 的规律。</li></ul><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.syjwffjltmo.png" alt="image"></p><h3 id="特殊的二叉树" tabindex="-1">特殊的二叉树 <a class="header-anchor" href="#特殊的二叉树" aria-label="Permalink to &quot;特殊的二叉树&quot;">​</a></h3><h4 id="完美二叉树" tabindex="-1">完美二叉树 <a class="header-anchor" href="#完美二叉树" aria-label="Permalink to &quot;完美二叉树&quot;">​</a></h4><p>完美二叉树（Perfect Binary Tree）也成为满二叉树（Full Binary Tree），在二叉树中，除了最下一层的叶子节点外，每层节点都有 2 个子节点，这就构成了完美二叉树。</p><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.223b2axrocf4.png" alt="image"></p><h4 id="完全二叉树" tabindex="-1">完全二叉树 <a class="header-anchor" href="#完全二叉树" aria-label="Permalink to &quot;完全二叉树&quot;">​</a></h4><p>完全二叉树（Complete Binary Tree）:</p><ul><li>除了二叉树最后一层外，其他各层的节点数都达到了最大值；</li><li>并且，最后一层的叶子节点从左向右是连续存在，只缺失右侧若干叶子节点；</li><li>完美二叉树是特殊的完全二叉树；</li></ul><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.5y4rglrp8qk0.png" alt="image"></p><p>在上图中，由于 H 缺失了右子节点，所以它不是完全二叉树。</p><h3 id="二叉树的数据存储" tabindex="-1">二叉树的数据存储 <a class="header-anchor" href="#二叉树的数据存储" aria-label="Permalink to &quot;二叉树的数据存储&quot;">​</a></h3><p>常见的二叉树存储方式为数组和链表：</p><h4 id="使用数组" tabindex="-1">使用数组 <a class="header-anchor" href="#使用数组" aria-label="Permalink to &quot;使用数组&quot;">​</a></h4><ul><li>完全二叉树：按从上到下，从左到右的方式存储数据。</li></ul><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.29w4k62b51og.png" alt="image"></p><table><thead><tr><th style="text-align:center;">节点</th><th style="text-align:center;">A</th><th style="text-align:center;">B</th><th style="text-align:center;">C</th><th style="text-align:center;">D</th><th style="text-align:center;">E</th><th style="text-align:center;">F</th><th style="text-align:center;">G</th><th style="text-align:center;">H</th><th style="text-align:center;">I</th></tr></thead><tbody><tr><td style="text-align:center;">序号</td><td style="text-align:center;">1</td><td style="text-align:center;">2</td><td style="text-align:center;">3</td><td style="text-align:center;">4</td><td style="text-align:center;">5</td><td style="text-align:center;">6</td><td style="text-align:center;">7</td><td style="text-align:center;">8</td><td style="text-align:center;">9</td></tr></tbody></table><p>使用数组存储时，取数据的时候也十分方便：左子节点的序号等于父节点序号 _ 2，右子节点的序号等于父节点序号 _ 2 + 1 。</p><ul><li>非完全二叉树：非完全二叉树需要转换成完全二叉树才能按照上面的方案存储，这样会浪费很大的存储空间。</li></ul><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.4jgiq6r2xee0.png" alt="image"></p><table><thead><tr><th style="text-align:center;">节点</th><th style="text-align:center;">A</th><th style="text-align:center;">B</th><th style="text-align:center;">C</th><th style="text-align:center;">^</th><th style="text-align:center;">^</th><th style="text-align:center;">F</th><th style="text-align:center;">^</th><th style="text-align:center;">^</th><th style="text-align:center;">^</th><th style="text-align:center;">^</th><th style="text-align:center;">^</th><th style="text-align:center;">^</th><th style="text-align:center;">M</th></tr></thead><tbody><tr><td style="text-align:center;">序号</td><td style="text-align:center;">1</td><td style="text-align:center;">2</td><td style="text-align:center;">3</td><td style="text-align:center;">4</td><td style="text-align:center;">5</td><td style="text-align:center;">6</td><td style="text-align:center;">7</td><td style="text-align:center;">8</td><td style="text-align:center;">9</td><td style="text-align:center;">10</td><td style="text-align:center;">11</td><td style="text-align:center;">12</td><td style="text-align:center;">13</td></tr></tbody></table><h4 id="使用链表" tabindex="-1">使用链表 <a class="header-anchor" href="#使用链表" aria-label="Permalink to &quot;使用链表&quot;">​</a></h4><p>二叉树最常见的存储方式为链表：每一个节点封装成一个 Node，Node 中包含存储的数据、左节点的引用和右节点的引用。</p><p><img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/image.2mlscfad5420.png" alt="image"></p>',34),i=[r];function h(s,d,c,g,o,E){return a(),e("div",null,i)}const y=t(n,[["render",h]]);export{x as __pageData,y as default};
