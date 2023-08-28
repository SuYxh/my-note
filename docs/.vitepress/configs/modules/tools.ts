const data = {
  text: "工具",
  items: [
    {
      text: "开发常用",
      items: [
        { text: "第三方库", link: "/workflow/utils/library" },
        { text: "在线工具", link: "/efficiency/online-tools" },
        { text: "常用正则", link: "/workflow/utils/regexp" },
      ],
    },
    {
      text: "命令行工具",
      items: [
        { text: "Zsh 配置", link: "/workflow/terminal/zsh" },
        { text: "命令行工具", link: "/workflow/terminal/toolkit" },
        { text: "Shell 命令", link: "/workflow/terminal/shell" },
        { text: "xh-cli", link: "/workflow/terminal/xhcli" },
      ],
    },
    {
      text: "Git",
      items: [
        { text: "Git 相关技巧", link: "/workflow/git/" },
        { text: "Git 命令清单", link: "/workflow/git/command" },
      ],
    },
    {
      text: "抓包工具",
      items: [{ text: "Whistle", link: "/efficiency/whistle" }],
    },
    {
      text: "常用软件",
      items: [
        { text: "多平台软件", link: "/efficiency/software/cross-platform" },
        { text: "Mac 平台", link: "/efficiency/software/mac" },
        { text: "Windows 平台", link: "/efficiency/software/windows" },
        { text: "浏览器设置与扩展", link: "/efficiency/software/browser" },
        {
          text: "Visual Studio Code 配置",
          link: "/efficiency/software/vscode",
        },
        { text: "WebStorm 配置", link: "/efficiency/software/webstorm" },
      ],
    },
  ],
  activeMatch: "^/workflow",
};

export default data;
