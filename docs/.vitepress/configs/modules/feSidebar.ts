const sidebar = {
  "/fe/basicknowledge/": [
    {
      text: "概念",
      collapsed: false,
      items: [
        { text: "前端开发的道、术、器", link: "/fe/basicknowledge/concept/前端开发的道、术、器.md" },
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
        { text: "选择器2", link: "/fe/css/选择器" },
        { text: "flex", link: "/fe/css/flex" },
        { text: "函数", link: "/fe/css/CSS函数" },
        { text: "变量", link: "/fe/css/CSS变量" },
        { text: "背景与遮罩", link: "/fe/css/背景与遮罩" },
        { text: "阴影与滤镜", link: "/fe/css/阴影与滤镜" },
        { text: "变换与动画", link: "/fe/css/变换与动画" },
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
        { text: "二进制", link: "/fe/javascript/谈谈JS二进制" },
        { text: "垃圾回收", link: "/fe/javascript/垃圾回收" },
        { text: "运行机制", link: "/fe/javascript/运行机制" },
        // { text: "严格模式", link: "/fe/javascript/js严格模式" },
        { text: "字符串方法", link: "/fe/javascript/字符串方法" },
        { text: "数组方法", link: "/fe/javascript/数组方法" },
        { text: "常用技巧", link: "/fe/javascript/JS技巧" },
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
        { text: "beforeunload", link: "/fe/javascript/event/beforeunload" },
      ],
    },
    {
      text: "网络",
      collapsed: false,
      items: [
        { text: "xhr", link: "/fe/javascript/xhr/xhr" },
        { text: "Fetch", link: "/fe/javascript/xhr/Fetch" },
        { text: "请求响应进度", link: "/fe/javascript/xhr/请求响应进度" },
        { text: "axios", link: "/fe/javascript/xhr/axios" },
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
          text: "基础",
          link: "/fe/es6/",
        },
        {
          text: "进阶",
          link: "/fe/es6/ES6",
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
          text: "Typescript 基础知识",
          link: "/fe/typescript/base/Typescript 基础知识.md",
        },
        {
          text: "TS 中类型的使用",
          link: "/fe/typescript/base/TS 中类型的使用.md",
        },
        {
          text: "条件类型与映射类型",
          link: "/fe/typescript/base/条件类型与映射类型.md",
        },
        {
          text: "模块及命名空间使用",
          link: "/fe/typescript/base/模块及命名空间使用.md",
        },
        {
          text: "类型体操",
          link: "/fe/typescript/base/类型体操.md",
        },
        {
          text: "模板字符串以及装饰器",
          link: "/fe/typescript/base/模板字符串以及装饰器.md",
        },
        {
          text: "TSConfig 详解",
          link: "/fe/typescript/base/TSConfig 详解.md",
        },
      ],
    },
    {
      text: "进阶",
      collapsed: false,
      items: [
        {
          text: "泛型约束",
          link: "/fe/typescript/advance/泛型约束.md",
        },
        {
          text: "函数的逆变与协变",
          link: "/fe/typescript/advance/函数的逆变与协变.md",
        },
        {
          text: "函数重载",
          link: "/fe/typescript/advance/函数重载.md",
        },
        {
          text: "类型映射",
          link: "/fe/typescript/advance/类型映射.md",
        },
        {
          text: "内置类型",
          link: "/fe/typescript/advance/内置类型.md",
        },
        {
          text: "条件类型-分发",
          link: "/fe/typescript/advance/条件类型-分发.md",
        },
        {
          text: "declare",
          link: "/fe/typescript/advance/declare.md",
        },
        {
          text: "infer",
          link: "/fe/typescript/advance/infer.md",
        },
      ],
    },
    {
      text: "其他文章",
      collapsed: false,
      items: [
        {
          text: "一篇搞懂 TS",
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
