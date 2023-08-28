const data = {
  text: "构建部署",
  items: [
    {
      text: "包管理工具",
      items: [{ text: "npm", link: "/package/npm" }],
    },
    {
      text: "构建",
      items: [
        { text: "webpack", link: "/build/webpack/" },
        { text: "vite", link: "/build/vite/" },
      ],
    },
    {
      text: "部署",
      items: [
        { text: "Github Action", link: "/deploy/GithubAction/" },
        { text: "Docker", link: "/deploy/docker/" },
      ],
    },
  ],
  activeMatch: "^/build",
};

export default data;
