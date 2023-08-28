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

  "/deploy/GithubAction/": [
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
  ],
  "/deploy/docker/": [
    {
      text: "Docker",
      collapsed: false,
      items: [{ text: "Docker 简介", link: "/deploy/docker/简介" }],
    },
  ],
};

export default sidebar;
