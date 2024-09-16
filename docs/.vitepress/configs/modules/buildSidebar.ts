const sidebar = {
  "/engineering/package/": [
    {
      text: "包管理工具",
      collapsed: false,
      items: [
        { text: "npm", link: "/engineering/package/npm" },
        { text: "npm link", link: "/engineering/package/npm link" },
        { text: "常用字段", link: "/engineering/package/packagesjson常用的配置字段" },
        { text: "符号", link: "/engineering/package/符号" },
        { text: "npm转pnpm", link: "/engineering/package/npm转pnpm" },
      ],
    },
  ],

  "/engineering/standard/": [
    {
      text: "项目规范",
      collapsed: false,
      items: [
        { text: "简介", link: "/engineering/standard/index" },
        { text: "ESlint配置以及插件开发", link: "/engineering/standard/1-ESlint配置以及插件开发" },
        { text: "Prettier配置", link: "/engineering/standard/2-Prettier配置" },
        { text: "Stylelint配置", link: "/engineering/standard/3-Stylelint配置" },
        { text: "Git提交配置", link: "/engineering/standard/4-git提交配置" },
        { text: "发布配置", link: "/engineering/standard/5-release-it" },
        // { text: "代码规范", link: "/engineering/standard/代码规范" },
        // { text: "Vue3项目代码规范", link: "/engineering/standard/Vue3项目代码规范" }
      ],
    },
  ],

  "/engineering/buildTools/": [
    {
      text: "esbuild",
      collapsed: false,
      items: [
        { text: "使用", link: "/engineering/buildTools/esbuild/Esbuild功能使用" },
        { text: "插件开发", link: "/engineering/buildTools/esbuild/Esbuild插件开发" }
      ],
    },
    {
      text: "rollup",
      collapsed: false,
      items: [
        { text: "使用", link: "/engineering/buildTools/rollup/Rollup使用" },
        { text: "插件机制", link: "/engineering/buildTools/rollup/Rollup插件机制" },
      ],
    },
    {
      text: "vite",
      collapsed: false,
      items: [
        { text: "简介", link: "/engineering/buildTools/vite/index" },
        { text: "模块化知识", link: "/engineering/buildTools/vite/模块化" },
        { text: "如何处理css", link: "/engineering/buildTools/vite/如何处理css" },
        { text: "如何处理静态资源", link: "/engineering/buildTools/vite/如何处理静态资源" },
        { text: "依赖预构建", link: "/engineering/buildTools/vite/依赖预构建" },
        { text: "双引擎架构", link: "/engineering/buildTools/vite/双引擎架构" },
        { text: "插件开发", link: "/engineering/buildTools/vite/vite插件开发" },
        { text: "HMR原理", link: "/engineering/buildTools/vite/HMR原理" },
        { text: "代码分割", link: "/engineering/buildTools/vite/代码分割" },
        { text: "语法降级与Polyfill", link: "/engineering/buildTools/vite/语法降级与Polyfill" },
        { text: "性能优化", link: "/engineering/buildTools/vite/性能优化" },
        { text: "迁移vite", link: "/engineering/buildTools/vite/迁移vite" },
        { text: "首次启动慢", link: "/engineering/buildTools/vite/vite首次启动慢" },
        { text: "常见配置", link: "/engineering/buildTools/vite/常见配置" },
        { text: "配置多页应用", link: "/engineering/buildTools/vite/vite配置多页应用" },
      ],
    },
    {
      text: "webpack",
      collapsed: false,
      items: [
        { text: "webpack", link: "/engineering/buildTools/webpack/" },
        { text: "构建流程", link: "/engineering/buildTools/webpack/构建流程" },
        { text: "热更新", link: "/engineering/buildTools/webpack/热更新" },
        { text: "vue-热更新", link: "/engineering/buildTools/webpack/vue-热更新" },
        { text: "打包优化案例", link: "/engineering/buildTools/webpack/打包优化案例" },
        { text: "性能优化", link: "/engineering/buildTools/webpack/性能优化" },
        { text: "配置多页应用", link: "/engineering/buildTools/webpack/webpack配置多页应用" },
      ],
    },
  ],

  "/engineering/deploy/": [
    {
      text: "基础知识",
      collapsed: false,
      items: [
        { text: "免费证书使用指南", link: "/engineering/deploy/base/免费证书使用指南" },
        { text: "服务器配置SSH", link: "/engineering/deploy/base/服务器配置SSH" },
        { text: "服务器拉取仓库代码", link: "/engineering/deploy/base/服务器拉取仓库代码" },
        { text: "centos安装nginx", link: "/engineering/deploy/base/centos安装nginx" },
        { text: "Ubuntu安装环境", link: "/engineering/deploy/base/Ubuntu20.4" },
      ],
    },
    {
      text: "Nginx",
      collapsed: false,
      items: [{ text: "配置https", link: "/engineering/deploy/nginx/nginx配置https" }],
    },
    {
      text: "Github Action",
      collapsed: false,
      items: [
        { text: "Github Action 简介", link: "/engineering/deploy/GithubAction/简介" },
        {
          text: "自动部署 Github Page",
          link: "/engineering/deploy/GithubAction/githubpage",
        },
        { text: "自动部署 Gitee Page", link: "/engineering/deploy/GithubAction/giteepage" },
        { text: "部署阿里云", link: "/engineering/deploy/GithubAction/部署阿里云" },
      ],
    },
    {
      text: "Docker",
      collapsed: false,
      items: [
        { text: "简介", link: "/engineering/deploy/docker/简介" },
        { text: "安装", link: "/engineering/deploy/docker/docker安装" },
        { text: "使用", link: "/engineering/deploy/docker/docker使用" },
        { text: "部署Vue项目", link: "/engineering/deploy/docker/Docker部署Vue项目" },
        { text: "部署node-基础版", link: "/engineering/deploy/docker/Docker部署node-基础版" },
        { text: "部署node-环境变量", link: "/engineering/deploy/docker/Docker部署node-env" },
        { text: "部署node-挂载", link: "/engineering/deploy/docker/Docker部署node-volume" },
        { text: "部署express和MySQL", link: "/engineering/deploy/docker/Docker部署express和MySQL" },
        { text: "部署express和MySQL和Redis", link: "/engineering/deploy/docker/Docker部署express和MySQL和Redis" },
      ],
    },
    {
      text: "Jenkins",
      collapsed: false,
      items: [
        { text: "安装", link: "/engineering/deploy/jenkins/Jenkins安装" },
        { text: "配置", link: "/engineering/deploy/jenkins/Jenkins配置" },
        { text: "前端项目配置", link: "/engineering/deploy/jenkins/前端项目配置" },
      ],
    },
    {
      text: "部署项目",
      collapsed: false,
      items: [
        {
          text: "Github Action部署项目",
          link: "/engineering/deploy/project/github-action",
        },
        {
          text: "jenkins部署前端项目",
          link: "/engineering/deploy/project/jenkins部署前端项目",
        },
        {
          text: "初级版docker部署前后端",
          link: "/engineering/deploy/project/初级版docker部署前后端",
        },
        {
          text: "pm2部署前后端项目",
          link: "/engineering/deploy/project/pm2部署前后端项目",
        },
        { text: "使用js脚本", link: "/engineering/deploy/project/使用js脚本" },
        {
          text: "使用shell部署前端静态资源",
          link: "/engineering/deploy/project/使用shell部署前端静态资源",
        },
      ],
    },
  ],
};

export default sidebar;
