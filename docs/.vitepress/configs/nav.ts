import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "我的项目", link: "/nav", activeMatch: "^/nav" },
  {
    text: "前端基础",
    items: [
      {
        text: "JavaScript",
        items: [
          { text: "JavaScript 基础知识", link: "/fe/javascript/types" },
          { text: "ES6 常用知识", link: "/fe/es6/" },
          { text: "TypeScript 基础知识", link: "/fe/typescript/base" },
          { text: "浏览器相关知识", link: "/fe/browser/" },
        ],
      },
      {
        text: "CSS",
        items: [
          { text: "CSS 语法", link: "/fe/css/spec" },
          { text: "CSS 奇淫技巧", link: "/fe/css/tricks" },
          { text: "Sass 常用技巧", link: "/fe/sass/index" },
        ],
      },
    ],
    activeMatch: "^/fe",
  },
  {
    text: "Vue",
    items: [
      { text: "vue 基础", link: "/vue/index" },
      { text: "vue 小技巧", link: "/vue/skill" },
    ],
    activeMatch: "^/vue",
  },
  {
    text: "React",
    items: [{ text: "React 基础", link: "/react/index" }],
    activeMatch: "^/react",
  },
  // { text: '源码阅读', link: '/analysis/utils/only-allow', activeMatch: '^/analysis' },
  {
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
  },
  {
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
  },
  {
    text: "计算机基础",
    items: [
      {
        text: "数据结构与算法",
        link: "/dataStructure/index",
      },
    ],
    activeMatch: "^/power",
  },
  { text: "踩坑记录", link: "/pit/npm", activeMatch: "^/pit" },
  {
    text: "ChatGPT",
    items: [
      {
        text: "openai",
        items: [
          { text: "官网", link: "https://platform.openai.com/" },
          { text: "文档", link: "/chatGPT/openai/index" },
        ],
      },
      {
        text: "使用",
        items: [
          { text: "chatGPT平台", link: "/chatGPT/use/使用资源" },
          { text: "Prompt编写", link: "/chatGPT/use/Prompt" },
          { text: "Prompt资源", link: "/chatGPT/use/Prompt资源" },
        ],
      },
      {
        text: "开发",
        items: [{ text: "开发指南", link: "/chatGPT/develop/index" }],
      },
      {
        text: "学习",
        items: [{ text: "AI 学习资源", link: "/chatGPT/study/AI 学习资源" }],
      },
    ],
    activeMatch: "^/chatGPT",
  },
  {
    text: "Me",
    items: [
      {
        text: "interview",
        link: "https://fe-interview-sigma.vercel.app/",
      },
      {
        text: "个人主页",
        link: "https://www.yuque.com/jarvis-zzzhw/frontend?# 《Front-End》",
      },
      {
        text: "日常笔记",
        link: "https://github.com/SuYxh/my-note",
      },
      { text: "掘金", link: "https://juejin.cn/user/2084329779636094/posts" },
    ],
  },
];
