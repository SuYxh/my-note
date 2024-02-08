const sidebar = {
  "/package/": [
    {
      text: "包管理工具",
      collapsed: false,
      items: [{ text: "npm", link: "/package/npm" }],
    },
  ],

  "/buildTools/": [
    {
      text: "esbuild",
      collapsed: false,
      items: [
        { text: "使用", link: "/buildTools/esbuild/Esbuild功能使用" },
        { text: "插件开发", link: "/buildTools/esbuild/Esbuild插件开发" }
      ],
    },
    {
      text: "rollup",
      collapsed: false,
      items: [
        { text: "使用", link: "/buildTools/rollup/Rollup使用" },
        { text: "插件机制", link: "/buildTools/rollup/Rollup插件机制" },
      ],
    },
    {
      text: "vite",
      collapsed: false,
      items: [
        { text: "简介", link: "/buildTools/vite/index" },
        { text: "模块化知识", link: "/buildTools/vite/模块化" },
        { text: "如何处理css", link: "/buildTools/vite/如何处理css" },
        { text: "如何处理静态资源", link: "/buildTools/vite/如何处理静态资源" },
        { text: "依赖预构建", link: "/buildTools/vite/依赖预构建" },
        { text: "双引擎架构", link: "/buildTools/vite/双引擎架构" },
        { text: "插件开发", link: "/buildTools/vite/vite插件开发" },
        { text: "HMR原理", link: "/buildTools/vite/HMR原理" },
        { text: "代码分割", link: "/buildTools/vite/代码分割" },
        { text: "语法降级与Polyfill", link: "/buildTools/vite/语法降级与Polyfill" },
        { text: "性能优化", link: "/buildTools/vite/性能优化" },
        { text: "迁移vite", link: "/buildTools/vite/迁移vite" },
        { text: "首次启动慢", link: "/buildTools/vite/vite首次启动慢" },
      ],
    },
    {
      text: "webpack",
      collapsed: false,
      items: [{ text: "webpack", link: "/buildTools/webpack/" }],
    },
  ],

  "/deploy/": [
    {
      text: "基础知识",
      collapsed: false,
      items: [
        { text: "服务器配置SSH", link: "/deploy/base/服务器配置SSH" },
        { text: "服务器拉取仓库代码", link: "/deploy/base/服务器拉取仓库代码" },
        { text: "centos安装nginx", link: "/deploy/base/centos安装nginx" },
        { text: "Ubuntu安装环境", link: "/deploy/base/Ubuntu20.4" },
      ],
    },
    {
      text: "Nginx",
      collapsed: false,
      items: [{ text: "配置https", link: "/deploy/nginx/nginx配置https" }],
    },
    {
      text: "Github Action",
      collapsed: false,
      items: [
        { text: "Github Action 简介", link: "/deploy/GithubAction/简介" },
        {
          text: "自动部署 Github Page",
          link: "/deploy/GithubAction/githubpage",
        },
        { text: "自动部署 Gitee Page", link: "/deploy/GithubAction/giteepage" },
        { text: "部署阿里云", link: "/deploy/GithubAction/部署阿里云" },
      ],
    },
    {
      text: "Docker",
      collapsed: false,
      items: [
        { text: "简介", link: "/deploy/docker/简介" },
        { text: "安装", link: "/deploy/docker/docker安装" },
        { text: "使用", link: "/deploy/docker/docker使用" },
      ],
    },
    {
      text: "Jenkins",
      collapsed: false,
      items: [
        { text: "安装", link: "/deploy/jenkins/Jenkins安装" },
        { text: "配置", link: "/deploy/jenkins/Jenkins配置" },
        { text: "前端项目配置", link: "/deploy/jenkins/前端项目配置" },
      ],
    },
    {
      text: "部署项目",
      collapsed: false,
      items: [
        {
          text: "Github Action部署项目",
          link: "/deploy/project/github-action",
        },
        {
          text: "jenkins部署前端项目",
          link: "/deploy/project/jenkins部署前端项目",
        },
        {
          text: "初级版docker部署前后端",
          link: "/deploy/project/初级版docker部署前后端",
        },
        {
          text: "pm2部署前后端项目",
          link: "/deploy/project/pm2部署前后端项目",
        },
        { text: "使用js脚本", link: "/deploy/project/使用js脚本" },
        {
          text: "使用shell部署前端静态资源",
          link: "/deploy/project/使用shell部署前端静态资源",
        },
      ],
    },
  ],
};

export default sidebar;
