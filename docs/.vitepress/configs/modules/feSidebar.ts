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
        { text: "基础", link: "/fe/css/" },
        { text: "选择器", link: "/fe/css/selector" },
        { text: "flex", link: "/fe/css/flex" },
        { text: "布局", link: "/fe/css/layout" },
        { text: "定位", link: "/fe/css/position" },
        { text: "图文样式", link: "/fe/css/graphicTextStyles" },
        { text: "响应式", link: "/fe/css/responsive" },
        { text: "CSS3", link: "/fe/css/css3" },
        { text: "技巧", link: "/fe/css/tricks" },
      ],
    },
    {
      text: "less",
      collapsed: false,
      items: [{ text: "基础", link: "/fe/sass/index" }],
    },
    {
      text: "scss",
      collapsed: false,
      items: [{ text: "基础", link: "/fe/sass/index" }],
    },
    // {
    //   text: "常见效果",
    //   collapsed: false,
    //   items: [
    //     { text: "Scss 常用技巧", link: "/fe/sass/index" },
    //   ],
    // },
  ],
  "/fe/javascript/": [
    {
      text: "基础",
      collapsed: false,
      items: [
        { text: "简介", link: "/fe/javascript/base" },
        { text: "数据类型", link: "/fe/javascript/types" },
        { text: "引用类型的拷贝", link: "/fe/javascript/clone" },
        { text: "类型转换", link: "/fe/javascript/conversions" },
        { text: "原型和原型链", link: "/fe/javascript/prototype" },
        { text: "继承", link: "/fe/javascript/inherit" },
        { text: "作用域", link: "/fe/javascript/actionScope" },
        { text: "闭包", link: "/fe/javascript/closure" },
        { text: "this", link: "/fe/javascript/this" },
        { text: "event loop", link: "/fe/javascript/eventloop" },
        { text: "编程题", link: "/fe/coding/" },
      ],
    },
    {
      text: "事件",
      collapsed: false,
      items: [
        { text: "事件流", link: "/fe/javascript/event/事件流" },
        { text: "事件处理程序", link: "/fe/javascript/event/事件处理程序" },
        { text: "事件对象", link: "/fe/javascript/event/事件对象" },
        { text: "事件类型", link: "/fe/javascript/event/事件类型" },
      ],
    },
    {
      text: "Promise",
      collapsed: false,
      items: [
        {
          text: "Promise",
          link: "/fe/javascript/promise/index",
        },
        {
          text: "手写实现",
          link: "/fe/javascript/promise/手写实现",
        },
        {
          text: "并发控制",
          link: "/fe/javascript/promise/任务执行",
        },
        {
          text: "技巧",
          link: "/fe/javascript/promise/案例",
        },
        {
          text: "输出题",
          link: "/fe/javascript/promise/输出题",
        },
        {
          text: "迭代器",
          link: "/fe/javascript/promise/迭代器",
        },
        {
          text: "生成器",
          link: "/fe/javascript/promise/生成器",
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
  "/fe/promise/": [
    {
      text: "Promise",
      link: "/fe/promise/index",
    },
    {
      text: "手写实现",
      link: "/fe/promise/手写实现",
    },
    {
      text: "任务执行",
      link: "/fe/promise/任务执行",
    },
    {
      text: "案例",
      link: "/fe/promise/案例",
    },
    {
      text: "输出题",
      link: "/fe/promise/输出题",
    },
    {
      text: "迭代器",
      link: "/fe/promise/迭代器",
    },
    {
      text: "生成器",
      link: "/fe/promise/生成器",
    },
  ],
  "/fe/typescript/": [
    {
      text: "TypeScript",
      collapsed: false,
      items: [
        {
          text: "简介",
          link: "/fe/typescript/index",
        },
        {
          text: "typescript",
          link: "/fe/typescript/base",
        },
        {
          text: "ts-study",
          link: "/fe/typescript/ts-study",
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
