import{_ as e,c as n,o as s,V as a}from"./chunks/framework.hxTji2_l.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"subject/dataStructure/queue/topic.md","filePath":"subject/dataStructure/queue/topic.md","lastUpdated":1707394470000}'),t={name:"subject/dataStructure/queue/topic.md"},p=a(`<h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><h3 id="_933-最近的请求次数" tabindex="-1"><a href="https://leetcode.cn/problems/number-of-recent-calls/" target="_blank" rel="noreferrer">933. 最近的请求次数</a> <a class="header-anchor" href="#_933-最近的请求次数" aria-label="Permalink to &quot;[933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/)&quot;">​</a></h3><p>写一个 <code>RecentCounter</code> 类来计算特定时间范围内最近的请求。</p><p>请你实现 <code>RecentCounter</code> 类：</p><ul><li><code>RecentCounter()</code> 初始化计数器，请求数为 0 。</li><li><code>int ping(int t)</code> 在时间 <code>t</code> 添加一个新请求，其中 <code>t</code> 表示以毫秒为单位的某个时间，并返回过去 <code>3000</code> 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 <code>[t-3000, t]</code> 内发生的请求数。</li></ul><p><strong>保证</strong> 每次对 <code>ping</code> 的调用都使用比之前更大的 <code>t</code> 值。</p><p><strong>示例 1：</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>输入：</span></span>
<span class="line"><span>[&quot;RecentCounter&quot;, &quot;ping&quot;, &quot;ping&quot;, &quot;ping&quot;, &quot;ping&quot;]</span></span>
<span class="line"><span>[[], [1], [100], [3001], [3002]]</span></span>
<span class="line"><span>输出：</span></span>
<span class="line"><span>[null, 1, 2, 3, 3]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解释：</span></span>
<span class="line"><span>RecentCounter recentCounter = new RecentCounter();</span></span>
<span class="line"><span>recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1</span></span>
<span class="line"><span>recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2</span></span>
<span class="line"><span>recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3</span></span>
<span class="line"><span>recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="答案" tabindex="-1">答案 <a class="header-anchor" href="#答案" aria-label="Permalink to &quot;答案&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,10),r=[p];function c(l,o,i,u,d,b){return s(),n("div",null,r)}const _=e(t,[["render",c]]);export{m as __pageData,_ as default};