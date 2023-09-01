const sidebar = {
  "/workflow/doc/": [
    {
      text: "文档搭建",
      collapsed: false,
      items: [
        { text: "文档搭建", link: "/workflow/doc/index" },
        { text: "配置Algolia", link: "/workflow/doc/vitepress配置Algolia" },
      ],
    },
  ],
  "/workflow/cli/": [
    { text: "CLI 学习", link: "/workflow/cli/index" },
    {
      text: "第1章",
      collapsed: false,
      items: [
        {
          text: "为什么要学习脚手架开发",
          link: "/workflow/cli/第1章/01-为什么要学习脚手架开发",
        },
        {
          text: "如何快速学会脚手架开发",
          link: "/workflow/cli/第1章/02-如何快速学会脚手架开发",
        },
        {
          text: "什么是Bash和CLI",
          link: "/workflow/cli/第1章/03-什么是Bash和CLI",
        },
        {
          text: "从使用角度理解什么是脚手架",
          link: "/workflow/cli/第1章/04-从使用角度理解什么是脚手架",
        },
        {
          text: "脚手架的实现原理",
          link: "/workflow/cli/第1章/05-脚手架的实现原理",
        },
      ],
    },
    {
      text: "第2章",
      collapsed: false,
      items: [
        {
          text: "如何开发脚手架",
          link: "/workflow/cli/第2章/01-如何开发脚手架",
        },
        {
          text: "脚手架的开发流程",
          link: "/workflow/cli/第2章/02-脚手架的开发流程",
        },
      ],
    },
    {
      text: "第3章",
      collapsed: false,
      items: [
        {
          text: "如何实现命令行文本显示",
          link: "/workflow/cli/第3章/01-如何实现命令行文本显示",
        },
        {
          text: "chalk和ora源码重点知识",
          link: "/workflow/cli/第3章/02-chalk和ora源码重点知识",
        },
        {
          text: "源码阅读心得分享",
          link: "/workflow/cli/第3章/03-源码阅读心得分享",
        },
      ],
    },
    {
      text: "第4章",
      collapsed: false,
      items: [
        {
          text: "如何实现命令行交互",
          link: "/workflow/cli/第4章/01-如何实现命令行交互",
        },
        {
          text: "命令行交互原理",
          link: "/workflow/cli/第4章/02-命令行交互原理",
        },
        {
          text: "readline和inquirer源码重点知识",
          link: "/workflow/cli/第4章/03-readline和inquirer源码重点知识",
        },
      ],
    },
  ],
};

export default sidebar;
