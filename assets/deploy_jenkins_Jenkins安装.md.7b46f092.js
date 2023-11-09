import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.1c251e17.js";const h=JSON.parse('{"title":"Jenkins 安装","description":"","frontmatter":{},"headers":[],"relativePath":"deploy/jenkins/Jenkins安装.md","lastUpdated":1699490805000}'),p={name:"deploy/jenkins/Jenkins安装.md"},l=e(`<h1 id="jenkins-安装" tabindex="-1">Jenkins 安装 <a class="header-anchor" href="#jenkins-安装" aria-label="Permalink to &quot;Jenkins 安装&quot;">​</a></h1><blockquote><p>环境： Ubuntu 22.04</p></blockquote><h3 id="安装-java-环境" tabindex="-1">安装 java 环境 <a class="header-anchor" href="#安装-java-环境" aria-label="Permalink to &quot;安装 java 环境&quot;">​</a></h3><p>检查系统上是否安装了 Java</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">java </span><span style="color:#89DDFF;">--</span><span style="color:#BABED8;">version</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果没有安装 Java，则会得到以下输出:</p><p><img src="https://qn.huat.xyz/mac/202309171600306.png" alt="image-20230917160027277"></p><p>执行如下命令， 进行安装 Java</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">sudo apt install </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;">y openjdk</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">17</span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;">jre</span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;">headless</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>安装完成后，再次验证 Java 是否已安装</p><p><img src="https://qn.huat.xyz/mac/202309171601077.png" alt="image-20230917160141049"></p><h3 id="下载安装-jenkins" tabindex="-1">下载安装 jenkins <a class="header-anchor" href="#下载安装-jenkins" aria-label="Permalink to &quot;下载安装 jenkins&quot;">​</a></h3><p>去官网查看安装方法：</p><blockquote><p><a href="https://www.jenkins.io/download/" target="_blank" rel="noreferrer">https://www.jenkins.io/download/</a></p></blockquote><p><img src="https://qn.huat.xyz/mac/202309171603712.png" alt="image-20230917160322694"></p><p><img src="https://qn.huat.xyz/mac/202309171603294.png" alt="image-20230917160350277"></p><p>这里已经安装过 java 环境</p><p>依此执行：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \\</span></span>
<span class="line"><span style="color:#babed8;">    /usr/share/keyrings/jenkins-keyring.asc &gt; /dev/null</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;"> echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\</span></span>
<span class="line"><span style="color:#babed8;">    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \\</span></span>
<span class="line"><span style="color:#babed8;">    /etc/apt/sources.list.d/jenkins.list &gt; /dev/null</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">sudo apt-get update</span></span>
<span class="line"><span style="color:#babed8;">sudo apt-get install jenkins</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>安装完成后，Jenkins 应该会自动启动，执行如下命令确认</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">systemctl status jenkins</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://qn.huat.xyz/mac/202309171606864.png" alt="image-20230917160611844"></p><p>如果 Jenkins 没有运行，执行以下命令启动它</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">sudo systemctl start jenkins</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="配置防火墙规则" tabindex="-1">配置防火墙规则 <a class="header-anchor" href="#配置防火墙规则" aria-label="Permalink to &quot;配置防火墙规则&quot;">​</a></h3><p>Jenkins 本机侦听端口 8080，如果您在启用了 UFW 的服务器上安装了 Jenkins，则需要打开该端口以允许通信。</p><p>先查看一下</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">sudo ufw status</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://qn.huat.xyz/mac/202309171608712.png" alt="image-20230917160834687"></p><p>如果没有开启，就开启一下, 在防火墙上打开端口 8080</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">sudo ufw allow </span><span style="color:#F78C6C;">8080</span><span style="color:#89DDFF;">/</span><span style="color:#BABED8;">tcp</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>重新加载防火墙</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">sudo ufw reload</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Ubuntu 22.04 / 20.04 LTS 上启用防火墙， 应该是已经启用了</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">sudo ufw enable</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="使用-gui-设置-jenkins" tabindex="-1">使用 GUI 设置 Jenkins <a class="header-anchor" href="#使用-gui-设置-jenkins" aria-label="Permalink to &quot;使用 GUI 设置 Jenkins&quot;">​</a></h3><p>访问服务器地址： <a href="http://server-IP:8080" target="_blank" rel="noreferrer">http://server-IP:8080</a></p><p>复制密码并将其粘贴到所示的文本字段中，然后单击 继续 按钮。</p><p><img src="https://qn.huat.xyz/mac/202309171023508.png" alt="image-20230917102336467"></p><p>下一步，为了简单起见，选择安装建议的插件。</p><p><img src="https://qn.huat.xyz/mac/202309171024650.png" alt="image-20230917102429610"></p><p>之后，将开始安装 Jenkins 所需的必要插件。</p><p><img src="https://qn.huat.xyz/mac/202309171025691.png" alt="image-20230917102536648"></p><p>安装完插件后，安装程序将带您到下一节，在那里您将需要创建一个 Admin 用户</p><p><img src="https://qn.huat.xyz/mac/202309171027698.png" alt="image-20230917102742673"></p><p>username： yangxinhao</p><p>密码： yangxinhao</p><p>邮箱： <a href="mailto:y170088888@163.com" target="_blank" rel="noreferrer">y170088888@163.com</a></p><p>下一步将填充 Jenkin 实例的默认 URL，不需要任何操作，只需单击 Save and Finish</p><p><img src="https://qn.huat.xyz/mac/202309171028564.png" alt="image-20230917102832539"></p><p>最后，单击 Start using Jenkins 按钮来访问 Jenkins</p><p><img src="https://qn.huat.xyz/mac/202309171029729.png" alt="image-20230917102924696"></p><p>进入 Jenkin 的主面板，如图所示</p><p><img src="https://qn.huat.xyz/mac/202309171029037.png" alt="image-20230917102948002"></p>`,56),i=[l];function t(r,o,c,d,u,b){return a(),n("div",null,i)}const g=s(p,[["render",t]]);export{h as __pageData,g as default};
