import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/fe/": [
    {
      text: "JavaScript 基础知识",
      collapsed: false,
      items: [
        { text: "数据类型", link: "/fe/javascript/types" },
        { text: "引用类型的拷贝", link: "/fe/javascript/clone" },
        { text: "类型转换", link: "/fe/javascript/conversions" },
        { text: "原型和原型链", link: "/fe/javascript/prototype" },
        { text: "继承", link: "/fe/javascript/inherit" },
      ],
    },
    {
      text: "ES6 常用知识点",
      link: "/fe/es6/",
    },
    {
      text: "TypeScript",
      link: "/fe/typescript/base",
    },
    {
      text: "HTML / CSS",
      collapsed: false,
      items: [
        { text: "HTML 理论知识点", link: "/fe/html/" },
        { text: "CSS 理论知识点", link: "/fe/css/" },
      ],
    },
    {
      text: "浏览器与网络",
      collapsed: false,
      items: [
        { text: "浏览器相关知识点", link: "/fe/browser/" },
        { text: "TCP", link: "/fe/network/tcp" },
        { text: "HTTP", link: "/fe/network/http" },
      ],
    },
    {
      text: "概念知识点",
      collapsed: false,
      items: [
        { text: "模块化", link: "/fe/concept/module" },
        { text: "前端页面渲染方式", link: "/fe/concept/page-rendering" },
      ],
    },
    {
      text: "编程题",
      link: "/fe/coding/",
    },
  ],
  "/analysis/": [
    {
      text: "工具库",
      // collapsed: false,
      items: [
        { text: "only-allow", link: "/analysis/utils/only-allow" },
        { text: "clsx", link: "/analysis/utils/clsx" },
      ],
    },
  ],
  "/deploy/": [
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
      items: [{ text: "Docker 简介", link: "/deploy/docker/简介" }],
    },
    // {
    //   text: "常用工具/方法",
    //   collapsed: false,
    //   items: [
    //     { text: "工具库整理", link: "/workflow/utils/library" },
    //     { text: "常用正则整理", link: "/workflow/utils/regexp" },
    //     { text: "常用方法整理", link: "/workflow/utils/function" },
    //   ],
    // },
  ],
  "/workflow/terminal/": [
    {
      text: "命令行工具",
      collapsed: false,
      items: [
        { text: "Zsh 配置", link: "/workflow/terminal/zsh" },
        { text: "命令行工具", link: "/workflow/terminal/toolkit" },
        { text: "Shell 命令", link: "/workflow/terminal/shell" },
      ],
    },
  ],
  "/workflow/": [
    {
      text: "常用工具/方法",
      collapsed: false,
      items: [
        { text: "工具库整理", link: "/workflow/utils/library" },
        { text: "常用正则整理", link: "/workflow/utils/regexp" },
        { text: "常用方法整理", link: "/workflow/utils/function" },
      ],
    },
    {
      text: "Git 相关",
      collapsed: false,
      items: [
        { text: "Git 相关技巧", link: "/workflow/git/" },
        { text: "Git 命令清单", link: "/workflow/git/command" },
      ],
    },
  ],
  "/efficiency/": [
    {
      text: "软件推荐与配置",
      // collapsed: false,
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
    { text: "在线工具", link: "/efficiency/online-tools" },
    { text: "书签脚本", link: "/efficiency/bookmark-scripts" },
  ],
  "/pit/": [
    {
      text: "踩坑记录",
      // collapsed: false,
      items: [
        { text: "npm 踩坑记录", link: "/pit/npm" },
        { text: "PC 踩坑记录", link: "/pit/pc" },
        { text: "H5 踩坑记录", link: "/pit/h5" },
      ],
    },
  ],
  "/dataStructure/": [
    {
      text: "数组",
      collapsed: false,
      items: [
        { text: "概念", link: "/dataStructure/array/index" },
        { text: "题目", link: "/dataStructure/array/topic" },
      ],
    },
    {
      text: "栈",
      collapsed: false,
      items: [
        { text: "概念", link: "/dataStructure/stack/index" },
        { text: "题目", link: "/dataStructure/stack/topic" },
      ],
    },
    {
      text: "队列",
      collapsed: false,
      items: [
        { text: "普通队列", link: "/dataStructure/queue/index" },
        { text: "优先队列", link: "/dataStructure/queue/priorityQueue" },
        { text: "题目", link: "/dataStructure/queue/topic" },
      ],
    },
    {
      text: "链表",
      collapsed: false,
      items: [
        { text: "单向链表", link: "/dataStructure/LinkedList/index" },
        {
          text: "双向链表",
          link: "/dataStructure/LinkedList/doubleLinkedList",
        },
        { text: "题目", link: "/dataStructure/LinkedList/topic" },
      ],
    },

    {
      text: "集合",
      collapsed: false,
      items: [
        { text: "概念", link: "/dataStructure/set/index" },
        { text: "题目", link: "/dataStructure/set/topic" },
      ],
    },

    {
      text: "字典",
      collapsed: false,
      items: [
        { text: "概念", link: "/dataStructure/map/index" },
        { text: "题目", link: "/dataStructure/map/topic" },
      ],
    },

    {
      text: "哈希表",
      collapsed: false,
      items: [
        { text: "概念", link: "/dataStructure/hashTable/index" },
        { text: "题目", link: "/dataStructure/hashTable/topic" },
      ],
    },

    {
      text: "树",
      collapsed: false,
      items: [
        { text: "树", link: "/dataStructure/tree/index" },
        { text: "二叉树", link: "/dataStructure/tree/binaryTree" },
        { text: "二叉搜索树", link: "/dataStructure/tree/binarySearchTree" },
        { text: "遍历专题", link: "/dataStructure/tree/traverse" },
        { text: "题目", link: "/dataStructure/tree/topic" },
      ],
    },

    {
      text: "图",
      collapsed: false,
      items: [
        { text: "概念", link: "/dataStructure/graph/index" },
        { text: "题目", link: "/dataStructure/graph/topic" },
      ],
    },
  ],
};
