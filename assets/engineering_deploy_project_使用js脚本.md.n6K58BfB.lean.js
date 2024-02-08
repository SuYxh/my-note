import{_ as s,c as n,o as a,V as i}from"./chunks/framework.hxTji2_l.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/deploy/project/使用js脚本.md","filePath":"engineering/deploy/project/使用js脚本.md","lastUpdated":1707394470000}'),l={name:"engineering/deploy/project/使用js脚本.md"},p=i(`<h2 id="env" tabindex="-1">env <a class="header-anchor" href="#env" aria-label="Permalink to &quot;env&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置服务器信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">serverHost=120.19.10.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">15</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">serverUser=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">root</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">serverPassword=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">yasgjdnabsdma</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置 GIT 仓库信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gitRepoUrl=https://gitee.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">com/ironc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/test-service</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gitBranchName=master</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 服务器上的项目目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gitLocalFolder=/var/www/test-service</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置pm2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pm2AppName=test-service</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="deploy-js" tabindex="-1">deploy.js <a class="header-anchor" href="#deploy-js" aria-label="Permalink to &quot;deploy.js&quot;">​</a></h2><div class="language-nginx vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ssh2 = require(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ssh2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">require(&#39;dotenv&#39;).config()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 配置服务器信息</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> serverHost = process.env.serverHost;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> serverUser = process.env.serverUser;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> serverPassword = process.env.serverPassword;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 配置 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GIT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 仓库信息</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gitRepoUrl = process.env.gitRepoUrl;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gitBranchName = process.env.gitBranchName;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gitLocalFolder = process.env.gitLocalFolder;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 配置pm2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pm2AppName = process.env.pm2AppName;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 创建 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SSH</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 连接</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ssh = new ssh2.Client();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ssh.on(&#39;error&#39;, (err) =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> connecting to SSH server:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, err);</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">});</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ssh.on(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ready</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Connected to SSH server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;);</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  // 在服务器上执行拉取代码的命令</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ssh.exec(\`cd \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gitLocalFolder</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} &amp;&amp; git checkout \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gitBranchName</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">} &amp;&amp; git pull origin \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gitBranchName</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`, (err, stream) =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    if (err) {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Error pulling code from git repo:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, err);</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ssh.end();</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      return;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    // 输出拉取代码的命令执行的输出</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    stream.on(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, (data) =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Pulling code from git repo:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, data.toString());</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    stream.on(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">end</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Code pulled from git repo successfully</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      // 重新安装依赖</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      ssh.exec(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, (err, stream) =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        if (err) {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Error install:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, err);</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          ssh.end();</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          return;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        // 安装依赖 进程的命令执行的输出</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        stream.on(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, (data) =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm install:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, data.toString());</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        stream.on(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">end</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm install successfully</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          // 在服务器上执行重新启动 pm2 进程的命令</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          ssh.exec(\`pm2 restart \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pm2AppName</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`, (err, stream) =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            if (err) {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Error restarting app with pm2:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, err);</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              ssh.end();</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              return;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            // 输出重新启动 pm2 进程的命令执行的输出</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            stream.on(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, (data) =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Restarting app with pm2:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, data.toString());</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            stream.on(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">end</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, () =&gt; {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              console.log(&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">App restarted with pm2 successfully</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;);</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              // 断开 SSH 连接</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              ssh.end();</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  });</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">});</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ssh.connect({</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  host: serverHost,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  username: serverUser,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  password: serverPassword,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br></div></div>`,4),e=[p];function r(h,t,k,c,E,F){return a(),n("div",null,e)}const b=s(l,[["render",r]]);export{g as __pageData,b as default};
