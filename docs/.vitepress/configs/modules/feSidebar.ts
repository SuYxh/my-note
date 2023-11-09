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
      text: "网络",
      collapsed: false,
      items: [
        { text: "xhr", link: "/fe/javascript/xhr/xhr" },
        { text: "Fetch", link: "/fe/javascript/xhr/Fetch" },
        { text: "跨域", link: "/fe/javascript/xhr/跨域" },
        { text: "CORS", link: "/fe/javascript/xhr/CORS" },
        { text: "缓存", link: "/fe/javascript/xhr/缓存" },
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
        // {
        //   text: "并发控制",
        //   link: "/fe/javascript/promise/任务执行",
        // },
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
    {
      text: "webStorage",
      collapsed: false,
      items: [
        { text: "cookie", link: "/fe/javascript/webStorage/cookie" },
        { text: "webStorage", link: "/fe/javascript/webStorage/webStorage" },
        { text: "jwt", link: "/fe/javascript/webStorage/jwt" },
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
      text: "基础",
      collapsed: false,
      items: [
        {
          text: "为什么使用TS和TS运行环境搭建",
          link: "/fe/typescript/base/02-为什么使用TS和TS运行环境搭建.md",
        },
        {
          text: "类型声明空间与变量声明空间",
          link: "/fe/typescript/base/03-类型声明空间与变量声明空间.md",
        },
        {
          text: "类型注解与类型推断",
          link: "/fe/typescript/base/04-类型注解与类型推断.md",
        },
        {
          text: "类型分类与联合类型与交叉类型",
          link: "/fe/typescript/base/05-类型分类与联合类型与交叉类型.md",
        },
        {
          text: "never类型与any类型与unknown类型",
          link: "/fe/typescript/base/06-never类型与any类型与unknown类型.md",
        },
        {
          text: "类型断言与非空断言",
          link: "/fe/typescript/base/07-类型断言与非空断言.md",
        },
        {
          text: "数组类型与元组类型",
          link: "/fe/typescript/base/08-数组类型与元组类型.md",
        },
        {
          text: "对象类型与索引签名",
          link: "/fe/typescript/base/09-对象类型与索引签名.md",
        },
        {
          text: "函数类型与void类型",
          link: "/fe/typescript/base/10-函数类型与void类型.md",
        },
        {
          text: "函数重载与可调用注解",
          link: "/fe/typescript/base/11-函数重载与可调用注解.md",
        },
        {
          text: "枚举类型与const枚举",
          link: "/fe/typescript/base/12-枚举类型与const枚举.md",
        },
      ],
    },
    {
      text: "进阶",
      collapsed: true,
      items: [
        {
          text: "详解接口与类型别名之间区别",
          link: "/fe/typescript/advance/02-详解接口与类型别名之间区别.md",
        },
        {
          text: "字面量类型和keyof关键字",
          link: "/fe/typescript/advance/03-字面量类型和keyof关键字.md",
        },
        {
          text: "类型保护与自定义类型保护",
          link: "/fe/typescript/advance/04-类型保护与自定义类型保护.md",
        },
        {
          text: "定义泛型和泛型常见操作",
          link: "/fe/typescript/advance/05-定义泛型和泛型常见操作.md",
        },
        {
          text: "类型兼容性详解",
          link: "/fe/typescript/advance/06-类型兼容性详解.md",
        },
        {
          text: "映射类型与内置工具类型",
          link: "/fe/typescript/advance/07-映射类型与内置工具类型.md",
        },
        {
          text: "条件类型和infer关键字",
          link: "/fe/typescript/advance/08-条件类型和infer关键字.md",
        },
        {
          text: "类中如何使用类型",
          link: "/fe/typescript/advance/09-类中如何使用类型.md",
        },

        {
          text: "d.ts声明文件和declare关键字",
          link: "/fe/typescript/advance/d点ts声明文件和declare关键字.md",
        },
        {
          text: "@types和DefinitelyTyped仓库",
          link: "/fe/typescript/advance/@types和DefinitelyTyped仓库.md",
        },
        {
          text: "lib.d.ts和global.d.ts",
          link: "/fe/typescript/advance/lib_d_ts和global_d_ts.md",
        },
        {
          text: "详解tsconfigjson配置文件",
          link: "/fe/typescript/advance/详解tsconfigjson配置文件.md",
        },
      ],
    },
    {
      text: "其他",
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
