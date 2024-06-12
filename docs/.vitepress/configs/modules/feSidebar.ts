const sidebar = {
  "/fe/basicknowledge/": [
    {
      text: "概念",
      collapsed: false,
      items: [
        { text: "编程范式", link: "/fe/basicknowledge/concept/编程范式" },
      ],
    },
    {
      text: "浏览器相关",
      collapsed: false,
      items: [
        { text: "进程线程", link: "/fe/basicknowledge/browser/进程线程" },
        { text: "浏览器内核", link: "/fe/basicknowledge/browser/浏览器内核" },
        { text: "缓存", link: "/fe/basicknowledge/browser/缓存" },
        { text: "跨域", link: "/fe/basicknowledge/browser/跨域" },
        { text: "存储", link: "/fe/basicknowledge/browser/存储" },
        { text: "页面渲染", link: "/fe/basicknowledge/browser/页面渲染" },
        { text: "页面渲染方式", link: "/fe/basicknowledge/browser/页面渲染方式" },
      ],
    },
    {
      text: "网络知识",
      collapsed: false,
      items: [
        { text: "简介", link: "/fe/basicknowledge/network/index.md" },
        { text: "tcp", link: "/fe/basicknowledge/network/tcp.md" },
        { text: "http", link: "/fe/basicknowledge/network/http.md" },
      ],
    },

    {
      text: "图片相关",
      collapsed: false,
      items: [
        { text: "简介", link: "/fe/basicknowledge/image/index" },
      ],
    },
    {
      text: "音频相关",
      collapsed: false,
      items: [
        { text: "简介", link: "/fe/basicknowledge/audio/index" },
      ],
    },
    {
      text: "视频相关",
      collapsed: false,
      items: [
        { text: "简介", link: "/fe/basicknowledge/video/index" },
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
        { text: "简介", link: "/fe/css/index" },
        { text: "属性书写顺序", link: "/fe/css/CSS属性书写排序" },
        { text: "盒模型", link: "/fe/css/盒模型" },
        { text: "格式化上下文", link: "/fe/css/格式化上下文" },
        { text: "文档流", link: "/fe/css/文档流" },
        { text: "优先级", link: "/fe/css/优先级" },
        { text: "选择器", link: "/fe/css/selector" },
        { text: "flex", link: "/fe/css/flex" },
        { text: "图文样式", link: "/fe/css/graphicTextStyles" },
        { text: "响应式", link: "/fe/css/responsive" },
        { text: "CSS3", link: "/fe/css/css3" },
        { text: "web文本范围高亮", link: "/fe/css/web文本范围高亮" },
        { text: "CSS显式默认值", link: "/fe/css/CSS显式默认值-inherit&initial&unset&revert" },
      ],
    },
    {
      text: "案例",
      collapsed: false,
      items: [
        { text: "技巧", link: "/fe/css/case/tricks" },
        { text: "居中", link: "/fe/css/case/居中" },
        { text: "常见布局", link: "/fe/css/case/常见布局" },
      ],
    },
    {
      text: "常见题目",
      collapsed: false,
      items: [
        { text: "题目集合 1", link: "/fe/css/question/常见题目" },
        { text: "布局", link: "/fe/css/question/布局" },
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
        // { text: "数据类型", link: "/fe/javascript/types" },
        { text: "数据类型", link: "/fe/javascript/数据类型" },
        { text: "数据类型检测原理", link: "/fe/javascript/数据类型检测原理" },
        { text: "引用类型的拷贝", link: "/fe/javascript/clone" },
        { text: "类型转换", link: "/fe/javascript/conversions" },
        { text: "原型和原型链", link: "/fe/javascript/prototype" },
        { text: "继承", link: "/fe/javascript/inherit" },
        { text: "变量提升", link: "/fe/javascript/变量提升" },
        { text: "调用栈", link: "/fe/javascript/调用栈" },
        { text: "块级作用域", link: "/fe/javascript/块级作用域" },
        { text: "作用域链和闭包", link: "/fe/javascript/作用域链和闭包" },
        { text: "this", link: "/fe/javascript/this" },
        { text: "event loop", link: "/fe/javascript/eventloop" },
        { text: "模块化", link: "/fe/javascript/module" },
        { text: "编程题", link: "/fe/coding/" },
        { text: "字符串方法", link: "/fe/javascript/字符串方法" },
        { text: "数组方法", link: "/fe/javascript/数组方法" },
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
        { text: "beforeunload", link: "/fe/javascript/event/beforeunload" },
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
    {
      text: "web API",
      collapsed: false,
      items: [
        { text: "WebWorker", link: "/fe/javascript/webapi/WebWorker" },
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
          text: "模板字符串类型",
          link: "/fe/typescript/advance/10-模板字符串类型.md",
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
        {
          text: "配置你的TypeScript",
          link: "/fe/typescript/advance/配置你的TypeScript.md",
        },
      ],
    },
    {
      text: "内置工具类型",
      collapsed: false,
      items: [
        {
          text: "内置工具类型-1",
          link: "/fe/typescript/tool/内置工具类型-1",
        },
        {
          text: "内置工具类型-2",
          link: "/fe/typescript/tool/内置工具类型-2",
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
