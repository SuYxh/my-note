const sidebar = {
  "/package/": [
    {
      text: "包管理工具",
      collapsed: false,
      items: [{ text: "npm", link: "/package/npm" }],
    },
  ],

  "/build/vite/": [
    {
      text: "vite",
      collapsed: false,
      items: [{ text: "vite", link: "/build/vite/" }],
    },
  ],

  "/build/webpack/": [
    {
      text: "webpack",
      collapsed: false,
      items: [{ text: "webpack", link: "/build/webpack/" }],
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
