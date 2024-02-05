import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.fb3766a7.js";const B=JSON.parse('{"title":"自动部署 Github Page","description":"","frontmatter":{},"headers":[],"relativePath":"deploy/GithubAction/githubpage.md","lastUpdated":1707145584000}'),p={name:"deploy/GithubAction/githubpage.md"},e=l(`<h1 id="自动部署-github-page" tabindex="-1">自动部署 Github Page <a class="header-anchor" href="#自动部署-github-page" aria-label="Permalink to &quot;自动部署 Github Page&quot;">​</a></h1><p>在你需要部署到 Github Page 的项目下，建立一个 yml 文件，放在 <code>.github/workflow</code> 目录下。你可以命名为 <code>ci.yml</code>，它类似于 Jenkins 的 <code>Jenkinsfile</code> 文件，里面包含的是要自动执行的脚本代码。</p><h3 id="yml" tabindex="-1">yml <a class="header-anchor" href="#yml" aria-label="Permalink to &quot;yml&quot;">​</a></h3><p>这个 yml 文件的内容如下：</p><div class="language-yml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Build and Deploy</span></span>
<span class="line"><span style="color:#FF9CAC;">on</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 监听 main 分支上的 push 事件</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">branches</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"><span style="color:#F07178;">jobs</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">build-and-deploy</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">runs-on</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ubuntu-latest</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 构建环境使用 ubuntu</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">steps</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Checkout</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">actions/checkout@v2.3.1</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">persist-credentials</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Install and Build</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 下载依赖 打包项目</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          npm install</span></span>
<span class="line"><span style="color:#C3E88D;">          npm run build</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Deploy</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 将打包内容发布到 github page</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">JamesIves/github-pages-deploy-action@4.1.7</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 使用别人写好的 actions</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 自定义环境变量</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">ACCESS_TOKEN</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">\${{ secrets.ACTION_DEMO_TOKEN }}</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">BRANCH</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">gh-pages</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">FOLDER</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dist</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">REPOSITORY_NAME</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">SuYxh/SuYxh.github.io</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 这是我的 github page 地址</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">TARGET_FOLDER</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">github_action_demo</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># 打包的文件将放到静态服务器 github_action_demo 目录下</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>或者</p><div class="language-yml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">GitHub Actions Build and Deploy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 触发条件: push 到 master 分支后</span></span>
<span class="line"><span style="color:#FF9CAC;">on</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">workflow_dispatch</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">branches</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 设置上海时区</span></span>
<span class="line"><span style="color:#F07178;">env</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">TZ</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Asia/Shanghai</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 任务</span></span>
<span class="line"><span style="color:#F07178;">jobs</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">build-and-deploy</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 服务器环境：最新版 ubuntu</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">runs-on</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ubuntu-latest</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">steps</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;"># 拉取代码</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Checkout</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">actions/checkout@v2</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">persist-credentials</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;"># 安装 pnpm</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Install pnpm</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">pnpm/action-setup@v2</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;"># 设置 node 版本</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Set node version to 18</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">actions/setup-node@v3</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">node-version</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">18</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">cache</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pnpm</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;"># 打包静态文件</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Build</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">pnpm install &amp;&amp; pnpm run build:github</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Copy files</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">cp README.md ./dist/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;"># 部署</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Deploy</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">JamesIves/github-pages-deploy-action@releases/v3</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;font-style:italic;"># GitHub 密钥</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">ACCESS_TOKEN</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">\${{ secrets.ACCESS_TOKEN }}</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;font-style:italic;"># 指定仓库</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">REPOSITORY_NAME</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">SuYxh/my-note</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;font-style:italic;"># GitHub Pages 读取的分支</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">BRANCH</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">gh-pages</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;font-style:italic;"># 静态文件所在目录</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">FOLDER</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dist</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><p>并且在<code>package.json</code>在文件中添加命令： <code>build:github</code> ， 对应的内容</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">&quot;build:github&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cross-env APP_BASE_PATH=/my-note/ npm run build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="变量配置" tabindex="-1">变量配置 <a class="header-anchor" href="#变量配置" aria-label="Permalink to &quot;变量配置&quot;">​</a></h3><p><code>ACTION_DEMO_TOKEN</code> 配置方式</p><ol><li><p>打开 Github 网站，点击你右上角的头像，选择 <code>settings</code>。</p><img src="https://qn.huat.xyz/mac/20220212155204.png" alt="image-20220212155158921" style="zoom:50%;"></li><li><p>点击左下角的 <code>developer settings</code>。</p><p><img src="https://qn.huat.xyz/mac/20220212160122.png" alt="image-20220212160122604"></p></li><li><p>在左侧边栏中，单击 <code>Personal access tokens（个人访问令牌）</code>，单击 <code>Generate new token（生成新令牌）</code>。</p><p><img src="https://qn.huat.xyz/mac/20220212160700.png" alt="image-20220212160700914"></p></li><li><p>输入名称并勾选 <code>repo</code>，拉到最下面，点击 <code>Generate token</code>，并将生成的 token 保存起来。</p><p><img src="https://qn.huat.xyz/mac/20220212161059.png" alt="image-20220212161059771"></p><p><img src="https://qn.huat.xyz/mac/20220212161124.png" alt="image-20220212161124457"></p></li><li><p>打开 Github 项目，点击 <code>settings</code>。点击 <code>secrets</code>-&gt;<code>Action</code>。</p><p><img src="https://qn.huat.xyz/mac/20220212161921.png" alt="image-20220212161921381"></p></li><li><p>创建一个密钥，名称随便填（中间用下划线隔开），内容填入刚才创建的 token。</p><p><img src="https://qn.huat.xyz/mac/20220212162004.png" alt="image-20220212162004788"></p></li></ol><p>将上文代码中的 <code>ACTION_DEMO_TOKEN</code> 替换成刚才创建的 secret，保存后，提交到 Github。</p><p>以后你的项目只要执行 <code>git push</code>，Github Actions 就会自动构建项目并发布到你的 Github Page 上。</p><p>Github Actions 的执行详情点击仓库中的 <code>Actions</code> 选项查看。</p><p><img src="https://qn.huat.xyz/mac/20220212162209.png" alt="image-20220212162209803"></p><p>演示地址 <a href="https://suyxh.github.io/github_action_demo/#/" target="_blank" rel="noreferrer">https://suyxh.github.io/github_action_demo/#/</a></p><p>具体详情可以参考一下我的 demo 项目 <strong><a href="https://github.com/SuYxh/github_action_demo" target="_blank" rel="noreferrer">github_action_demo</a></strong>。</p>`,18),o=[e];function c(t,r,i,y,D,b){return n(),a("div",null,o)}const u=s(p,[["render",c]]);export{B as __pageData,u as default};