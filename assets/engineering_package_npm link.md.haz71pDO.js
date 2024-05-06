import{_ as n,c as e,o as a,V as p}from"./chunks/framework.hxTji2_l.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/package/npm link.md","filePath":"engineering/package/npm link.md","lastUpdated":1714972726000}'),s={name:"engineering/package/npm link.md"},i=p('<h3 id="npm-link-是什么-如何使用" tabindex="-1">npm link 是什么？ 如何使用？ <a class="header-anchor" href="#npm-link-是什么-如何使用" aria-label="Permalink to &quot;npm link 是什么？ 如何使用？&quot;">​</a></h3><p><code>npm link</code> 是一个 npm 命令，用于在本地文件系统中链接一个正在开发的 npm 包到另一个正在开发的本地项目中。这对于在本地进行 npm 包的开发和测试非常有用。</p><p>要使用 <code>npm link</code>，首先需要进入你想要链接到的 npm 包的目录，然后运行 <code>npm link</code> 命令。这将会在全局 npm 包安装目录中创建一个符号链接，将该包链接到全局安装的 npm 包中。</p><p>然后，进入到你想要链接该包的项目目录中，运行 <code>npm link &lt;package-name&gt;</code> 命令，其中 <code>&lt;package-name&gt;</code> 是你要链接的 npm 包的名称。这将会在项目的 <code>node_modules</code> 目录中创建一个指向你正在开发的 npm 包的符号链接，从而允许你在项目中使用正在开发的 npm 包。</p><p>当你修改了正在开发的 npm 包后，只需重新构建该包，并重新运行项目即可看到修改的效果，而不需要重新发布该包到 npm 仓库中。</p><h3 id="那如何解除这些-link-呢" tabindex="-1">那如何解除这些 link 呢？ <a class="header-anchor" href="#那如何解除这些-link-呢" aria-label="Permalink to &quot;那如何解除这些 link 呢？&quot;">​</a></h3><p>如果你想要取消 <code>npm link</code> 所创建的链接，可以按照以下步骤操作：</p><ol><li><p><strong>取消链接 npm 包</strong>： 进入你的 npm 包的目录，运行以下命令：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm unlink</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><strong>取消链接项目中的 npm 包</strong>： 进入你的项目目录，运行以下命令：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm unlink &lt;package-name&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中 <code>&lt;package-name&gt;</code> 是你想要取消链接的 npm 包的名称。</p></li></ol><p>这些命令将会移除符号链接，并且恢复 npm 包和项目之间的正常依赖关系。</p><h3 id="我如何查看我是否-link-成功呢" tabindex="-1">我如何查看我是否 link 成功呢？ <a class="header-anchor" href="#我如何查看我是否-link-成功呢" aria-label="Permalink to &quot;我如何查看我是否 link 成功呢？&quot;">​</a></h3><p>要验证你是否成功进行了 npm 包的链接，可以执行以下步骤：</p><ol><li><p><strong>查看全局链接的 npm 包</strong>： 运行以下命令查看全局 npm 包链接列表：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm ls -g --depth=0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果你成功地使用 <code>npm link</code> 链接了某个 npm 包，你应该能在列表中看到该包。</p></li><li><p><strong>检查项目中的 npm 包链接</strong>： 进入你的项目目录，然后检查 <code>node_modules</code> 目录下是否有你链接的 npm 包的符号链接。如果成功链接，你应该能在 <code>node_modules</code> 目录下看到该链接。</p></li><li><p><strong>验证链接的有效性</strong>： 在项目中尝试引入你链接的 npm 包的代码，或者运行该包中的可执行命令（如果有的话）。如果你能成功使用该 npm 包，那么你的链接应该是有效的。</p></li></ol><p>通过执行以上步骤，你应该能够确认你是否成功地进行了 npm 包的链接。</p>',13),l=[i];function t(o,d,c,r,m,g){return a(),e("div",null,l)}const u=n(s,[["render",t]]);export{k as __pageData,u as default};
