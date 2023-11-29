import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.03641bbc.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"deploy/project/使用js脚本.md","lastUpdated":1701246730000}'),p={name:"deploy/project/使用js脚本.md"},e=l(`<h2 id="env" tabindex="-1">env <a class="header-anchor" href="#env" aria-label="Permalink to &quot;env&quot;">​</a></h2><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 配置服务器信息</span></span>
<span class="line"><span style="color:#A6ACCD;">serverHost=120.19.10.</span><span style="color:#89DDFF;">15</span></span>
<span class="line"><span style="color:#A6ACCD;">serverUser=</span><span style="color:#89DDFF;">root</span></span>
<span class="line"><span style="color:#A6ACCD;">serverPassword=</span><span style="color:#89DDFF;">yasgjdnabsdma</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 配置 GIT 仓库信息</span></span>
<span class="line"><span style="color:#A6ACCD;">gitRepoUrl=https://gitee.com/ironc/test-service</span></span>
<span class="line"><span style="color:#A6ACCD;">gitBranchName=master</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 服务器上的项目目录</span></span>
<span class="line"><span style="color:#A6ACCD;">gitLocalFolder=/var/www/test-service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 配置pm2</span></span>
<span class="line"><span style="color:#A6ACCD;">pm2AppName=test-service</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="deploy-js" tabindex="-1">deploy.js <a class="header-anchor" href="#deploy-js" aria-label="Permalink to &quot;deploy.js&quot;">​</a></h2><div class="language-nginx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> ssh2 = require(</span><span style="color:#C3E88D;">&#39;ssh2&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">require(&#39;dotenv&#39;).config()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// 配置服务器信息</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> serverHost = p<wbr>rocess.env.serverHost</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> serverUser = p<wbr>rocess.env.serverUser</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> serverPassword = p<wbr>rocess.env.serverPassword</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// 配置 </span><span style="color:#89DDFF;">GIT</span><span style="color:#A6ACCD;"> 仓库信息</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> gitRepoUrl = p<wbr>rocess.env.gitRepoUrl</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> gitBranchName = p<wbr>rocess.env.gitBranchName</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> gitLocalFolder = p<wbr>rocess.env.gitLocalFolder</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// 配置pm2</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> pm2AppName = p<wbr>rocess.env.pm2AppName</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// 创建 </span><span style="color:#89DDFF;">SSH</span><span style="color:#A6ACCD;"> 连接</span></span>
<span class="line"><span style="color:#89DDFF;">const</span><span style="color:#A6ACCD;"> ssh = new ssh2.Client()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">ssh.on(&#39;error&#39;, (err) =&gt; </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">  console.log(&#39;</span><span style="color:#89DDFF;">Error</span><span style="color:#F07178;"> connecting to SSH server:</span><span style="color:#C3E88D;">&#39;, err);</span></span>
<span class="line"><span style="color:#C3E88D;">});</span></span>
<span class="line"><span style="color:#C3E88D;">ssh.on(&#39;</span><span style="color:#F07178;">ready</span><span style="color:#C3E88D;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">  console.log(&#39;</span><span style="color:#F07178;">Connected to SSH server</span><span style="color:#C3E88D;">&#39;);</span></span>
<span class="line"><span style="color:#C3E88D;">  // 在服务器上执行拉取代码的命令</span></span>
<span class="line"><span style="color:#C3E88D;">  ssh.exec(\`cd </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">gitLocalFolder</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> &amp;&amp; git checkout </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">gitBranchName</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> &amp;&amp; git pull origin </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">gitBranchName</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">\`, (err, stream) =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">    if (err) {</span></span>
<span class="line"><span style="color:#C3E88D;">      console.log(&#39;</span><span style="color:#F07178;">Error pulling code from git repo:</span><span style="color:#C3E88D;">&#39;, err);</span></span>
<span class="line"><span style="color:#C3E88D;">      ssh.end();</span></span>
<span class="line"><span style="color:#C3E88D;">      return;</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span></span>
<span class="line"><span style="color:#C3E88D;">    // 输出拉取代码的命令执行的输出</span></span>
<span class="line"><span style="color:#C3E88D;">    stream.on(&#39;</span><span style="color:#F07178;">data</span><span style="color:#C3E88D;">&#39;, (data) =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">      console.log(&#39;</span><span style="color:#F07178;">Pulling code from git repo:</span><span style="color:#C3E88D;">&#39;, data.toString());</span></span>
<span class="line"><span style="color:#C3E88D;">    });</span></span>
<span class="line"><span style="color:#C3E88D;">    stream.on(&#39;</span><span style="color:#F07178;">end</span><span style="color:#C3E88D;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">      console.log(&#39;</span><span style="color:#F07178;">Code pulled from git repo successfully</span><span style="color:#C3E88D;">&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">      // 重新安装依赖</span></span>
<span class="line"><span style="color:#C3E88D;">      ssh.exec(&#39;</span><span style="color:#F07178;">npm install</span><span style="color:#C3E88D;">&#39;, (err, stream) =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">        if (err) {</span></span>
<span class="line"><span style="color:#C3E88D;">          console.log(&#39;</span><span style="color:#F07178;">Error install:</span><span style="color:#C3E88D;">&#39;, err);</span></span>
<span class="line"><span style="color:#C3E88D;">          ssh.end();</span></span>
<span class="line"><span style="color:#C3E88D;">          return;</span></span>
<span class="line"><span style="color:#C3E88D;">        }</span></span>
<span class="line"><span style="color:#C3E88D;">        // 安装依赖 进程的命令执行的输出</span></span>
<span class="line"><span style="color:#C3E88D;">        stream.on(&#39;</span><span style="color:#F07178;">data</span><span style="color:#C3E88D;">&#39;, (data) =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">          console.log(&#39;</span><span style="color:#F07178;">npm install:</span><span style="color:#C3E88D;">&#39;, data.toString());</span></span>
<span class="line"><span style="color:#C3E88D;">        });</span></span>
<span class="line"><span style="color:#C3E88D;">        stream.on(&#39;</span><span style="color:#F07178;">end</span><span style="color:#C3E88D;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">          console.log(&#39;</span><span style="color:#F07178;">npm install successfully</span><span style="color:#C3E88D;">&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">          // 在服务器上执行重新启动 pm2 进程的命令</span></span>
<span class="line"><span style="color:#C3E88D;">          ssh.exec(\`pm2 restart </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">pm2AppName</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">\`, (err, stream) =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">            if (err) {</span></span>
<span class="line"><span style="color:#C3E88D;">              console.log(&#39;</span><span style="color:#F07178;">Error restarting app with pm2:</span><span style="color:#C3E88D;">&#39;, err);</span></span>
<span class="line"><span style="color:#C3E88D;">              ssh.end();</span></span>
<span class="line"><span style="color:#C3E88D;">              return;</span></span>
<span class="line"><span style="color:#C3E88D;">            }</span></span>
<span class="line"><span style="color:#C3E88D;">            // 输出重新启动 pm2 进程的命令执行的输出</span></span>
<span class="line"><span style="color:#C3E88D;">            stream.on(&#39;</span><span style="color:#F07178;">data</span><span style="color:#C3E88D;">&#39;, (data) =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">              console.log(&#39;</span><span style="color:#F07178;">Restarting app with pm2:</span><span style="color:#C3E88D;">&#39;, data.toString());</span></span>
<span class="line"><span style="color:#C3E88D;">            });</span></span>
<span class="line"><span style="color:#C3E88D;">            stream.on(&#39;</span><span style="color:#F07178;">end</span><span style="color:#C3E88D;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#C3E88D;">              console.log(&#39;</span><span style="color:#F07178;">App restarted with pm2 successfully</span><span style="color:#C3E88D;">&#39;);</span></span>
<span class="line"><span style="color:#C3E88D;">              // 断开 SSH 连接</span></span>
<span class="line"><span style="color:#C3E88D;">              ssh.end();</span></span>
<span class="line"><span style="color:#C3E88D;">            });</span></span>
<span class="line"><span style="color:#C3E88D;">          });</span></span>
<span class="line"><span style="color:#C3E88D;">        });</span></span>
<span class="line"><span style="color:#C3E88D;">      });</span></span>
<span class="line"><span style="color:#C3E88D;">    });</span></span>
<span class="line"><span style="color:#C3E88D;">  });</span></span>
<span class="line"><span style="color:#C3E88D;">});</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">ssh.connect({</span></span>
<span class="line"><span style="color:#C3E88D;">  host: serverHost,</span></span>
<span class="line"><span style="color:#C3E88D;">  username: serverUser,</span></span>
<span class="line"><span style="color:#C3E88D;">  password: serverPassword,</span></span>
<span class="line"><span style="color:#C3E88D;">});</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br></div></div>`,4),r=[e];function o(c,t,i,b,y,D){return n(),a("div",null,r)}const u=s(p,[["render",o]]);export{C as __pageData,u as default};
