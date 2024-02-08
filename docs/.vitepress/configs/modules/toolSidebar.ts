const sidebar = {

  "/tools/": [
    {
      text: "Git",
      items: [
        { text: "Git 相关技巧", link: "/tools/git/" },
        { text: "Git 命令清单", link: "/tools/git/command" },
      ],
    },

    {
      text: "开发常用",
      collapsed: false,
      items: [
        { text: "whistle", link: "/tools/whistle" },
        { text: "第三方库", link: "/tools/library" },
        { text: "在线工具", link: "/tools/onlineTools" },
        { text: "常用正则", link: "/tools/regexp" },
        { text: "项目模板", link: "/tools/template/h5" },
      ],
    },

    {
      text: "命令行工具",
      collapsed: false,
      items: [
        { text: "zsh配置", link: "/tools/terminal/zsh" },
        { text: "命令行工具", link: "/tools/terminal/toolkit" },
        { text: "shell命令", link: "/tools/terminal/shell" },
      ],
    },

    {
      text: "常用软件",
      items: [
        { text: "多平台软件", link: "/tools/software/cross-platform" },
        { text: "Mac平台", link: "/tools/software/mac" },
        { text: "Windows平台", link: "/tools/software/windows" },
        { text: "浏览器设置与扩展", link: "/tools/software/browser" },
        { text: "Visual Studio Code 配置", link: "/tools/software/vscode" },
        { text: "WebStorm配置", link: "/tools/software/webstorm" },
      ],
    },

    {
      text: "文档搭建",
      collapsed: false,
      items: [
        { text: "vitepress", link: "/tools/doc/index" },
        { text: "配置Algolia", link: "/tools/doc/vitepress配置Algolia" },
      ],
    },
  ],
};

export default sidebar;
