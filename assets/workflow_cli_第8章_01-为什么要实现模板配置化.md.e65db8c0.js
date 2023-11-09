import{_ as a,o as e,c as l,Q as t}from"./chunks/framework.1c251e17.js";const f=JSON.parse('{"title":"如何实现模板配置化？","description":"","frontmatter":{},"headers":[],"relativePath":"workflow/cli/第8章/01-为什么要实现模板配置化.md","lastUpdated":1699490805000}'),o={name:"workflow/cli/第8章/01-为什么要实现模板配置化.md"},_=t('<h1 id="如何实现模板配置化" tabindex="-1">如何实现模板配置化？ <a class="header-anchor" href="#如何实现模板配置化" aria-label="Permalink to &quot;如何实现模板配置化？&quot;">​</a></h1><h2 id="_1-为什么要实现模板配置化" tabindex="-1">1.为什么要实现模板配置化？ <a class="header-anchor" href="#_1-为什么要实现模板配置化" aria-label="Permalink to &quot;1.为什么要实现模板配置化？&quot;">​</a></h2><ul><li>上一章中我们实现通过自定义模板创建项目的功能，采用 npm 管理项目模板，这里面有一个较大的限制即项目模板是写死在脚手架中的，无法进行任何扩展</li><li>在真实工作中这样的扩展性是无法适应公司业务需求和变化的</li><li>本章我们会通过脚手架+Egg 服务+MongoDB 实现一套可灵活配置和扩展的项目模板管理机制，彻底解决项目模板无法扩展的问题</li><li>我们只需要通过编辑 MongoDB 中的模板数据，即可灵活、快速的实现项目模板的增删改，并根据团队不同，区分不同的模板</li></ul><h2 id="_2-如何实现项目模板配置化" tabindex="-1">2.如何实现项目模板配置化？ <a class="header-anchor" href="#_2-如何实现项目模板配置化" aria-label="Permalink to &quot;2.如何实现项目模板配置化？&quot;">​</a></h2><ul><li>项目模板制作：我们将会通过 vue-element-admin 的案例，演示如何将一个真实项目改编成项目模板</li><li>创建后端服务：我们将通过企业级框架 Egg.js 实现后端服务搭建，并通过 Restful API 实现接口开发</li><li>创建数据库：我们将搭建 MongoDB 数据库，并导入项目模板数据</li><li>脚手架改造：待后端服务、数据库、项目模板准备完毕后，我们将进行脚手架获取模板逻辑改造，使其具备动态读取项目模板的能力</li></ul>',5),i=[_];function r(n,s,c,d,h,u){return e(),l("div",null,i)}const p=a(o,[["render",r]]);export{f as __pageData,p as default};
