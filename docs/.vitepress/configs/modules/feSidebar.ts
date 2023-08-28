const sidebar = {
  "/fe/concept/": [
    {
      text: "概念知识点",
      collapsed: false,
      items: [
        { text: "模块化", link: "/fe/concept/module" },
        { text: "前端页面渲染方式", link: "/fe/concept/page-rendering" },
      ],
    },
  ],
  "/fe/html/": [
    {
      text: "html",
      collapsed: false,
      items: [
        {
          text: "html",
          link: "/fe/html/",
        },
      ],
    },
  ],
  "/fe/css/": [
    {
      text: "css",
      collapsed: false,
      items: [
        {
          text: "css",
          link: "/fe/css/",
        },
        { text: "CSS 语法", link: "/fe/css/spec" },
        { text: "CSS 奇淫技巧", link: "/fe/css/tricks" },
        { text: "Sass 常用技巧", link: "/fe/sass/index" },
      ],
    },
  ],
  "/fe/javascript/": [
    {
      text: "JavaScript 基础知识",
      collapsed: false,
      items: [
        { text: "数据类型", link: "/fe/javascript/types" },
        { text: "引用类型的拷贝", link: "/fe/javascript/clone" },
        { text: "类型转换", link: "/fe/javascript/conversions" },
        { text: "原型和原型链", link: "/fe/javascript/prototype" },
        { text: "继承", link: "/fe/javascript/inherit" },
        {
          text: "编程题",
          link: "/fe/coding/",
        },
      ],
    },
  ],
  "/fe/es6/": [
    {
      text: "ECMAScript 6",
      collapsed: false,
      items: [
        {
          text: "ECMAScript 6",
          link: "/fe/es6/",
        },
      ],
    },
  ],
  "/fe/typescript/": [
    {
      text: "TypeScript",
      collapsed: false,
      items: [
        {
          text: "typescript",
          link: "/fe/typescript/base",
        },
      ],
    },
  ],
  "/fe/network/": [
    {
      text: "浏览器与网络",
      collapsed: false,
      items: [
        { text: "TCP", link: "/fe/network/tcp" },
        { text: "HTTP", link: "/fe/network/http" },
      ],
    },
  ],
};

export default sidebar;
