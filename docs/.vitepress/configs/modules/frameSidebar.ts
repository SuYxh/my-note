const sidebar = {
  "/frame/vue/": [
    {
      text: "vue",
      collapsed: false,
      items: [
        { text: "vue 基础", link: "/frame/vue/index" },
        { text: "vue 小技巧", link: "/frame/vue/skill" },
        { text: "Provide和Inject使用", link: "/frame/vue/Provide和Inject" },
        { text: "学习参考", link: "/frame/vue/资料" },
      ],
    },
  ],

  "/frame/react/": [
    {
      text: "基础",
      collapsed: true,
      items: [
        {
          text: "虚拟DOM与React18新的渲染写法",
          link: "/frame/react/base/02-虚拟DOM与React18新的渲染写法.md",
        },
        {
          text: "什么是JSX及JSX详细使用方式",
          link: "/frame/react/base/03-什么是JSX及JSX详细使用方式.md",
        },
        {
          text: "如何进行条件渲染与列表渲染",
          link: "/frame/react/base/05-如何进行条件渲染与列表渲染.md",
        },
        {
          text: "类组件基本使用及组件通信",
          link: "/frame/react/base/06-类组件基本使用及组件通信.md",
        },
        {
          text: "props细节详解及注意事项",
          link: "/frame/react/base/07-props细节详解及注意事项.md",
        },
        {
          text: "类组件中事件的使用详解",
          link: "/frame/react/base/08-类组件中事件的使用详解.md",
        },
        {
          text: "类组件响应式视图实现与原理",
          link: "/frame/react/base/09-类组件响应式视图实现与原理.md",
        },
        {
          text: "state细节详解及React18的自动批处理",
          link: "/frame/react/base/10-state细节详解及React18的自动批处理.md",
        },
        {
          text: "PureComponent与shouldComponentUpdate",
          link: "/frame/react/base/11-PureComponent与shouldComponentUpdate.md",
        },
        {
          text: "immutable.js不可变数据集合",
          link: "/frame/react/base/12-immutablejs不可变数据集合.md",
        },
        {
          text: "Refs操作DOM及操作类组件",
          link: "/frame/react/base/13-Refs操作DOM及操作类组件.md",
        },
        {
          text: "详解受控组件及各种表单中的使用",
          link: "/frame/react/base/14-详解受控组件及各种表单中的使用.md",
        },
        {
          text: "详解非受控组件的实现方案",
          link: "/frame/react/base/15-详解非受控组件的实现方案.md",
        },
        {
          text: "详解常见生命周期钩子函数",
          link: "/frame/react/base/16-详解常见生命周期钩子函数.md",
        },
        {
          text: "详解不常见生命周期钩子函数",
          link: "/frame/react/base/17-详解不常见生命周期钩子函数.md",
        },
        {
          text: "组件内容的组合模式",
          link: "/frame/react/base/18-组件内容的组合模式.md",
        },
        {
          text: "复用组件功能之Render Props模式",
          link: "/frame/react/base/19-复用组件功能之Render Props模式.md",
        },
        {
          text: "复用组件功能之HOC高阶组件模式",
          link: "/frame/react/base/20-复用组件功能之HOC高阶组件模式.md",
        },
        {
          text: "组件跨层级通信方案Context",
          link: "/frame/react/base/21-组件跨层级通信方案Context.md",
        },
      ],
    },

    {
      text: "hooks",
      collapsed: true,
      items: [
        {
          text: "函数组件基本使用及点标记组件写法",
          link: "/frame/react/hook/02-函数组件基本使用及点标记组件写法.md",
        },
        {
          text: "Hook概念及Hook之useState函数",
          link: "/frame/react/hook/03-Hook概念及Hook之useState函数.md",
        },
        {
          text: "如何进行条件渲染与列表渲染",
          link: "/frame/react/hook/04-详解Hook之useEffect函数.md",
        },
        {
          text: "详解Hook之useRef函数",
          link: "/frame/react/hook/05-详解Hook之useRef函数.md",
        },
        {
          text: "详解Hook之useContext函数",
          link: "/frame/react/hook/06-详解Hook之useContext函数.md",
        },
        {
          text: "函数组件性能优化之React.memo",
          link: "/frame/react/hook/07-函数组件性能优化之React memo.md",
        },
        {
          text: "详解Hook之useCallback与useMemo函数",
          link: "/frame/react/hook/08-详解Hook之useCallback与useMemo函数.md",
        },
        {
          text: "详解Hook之useReducer函数",
          link: "/frame/react/hook/09-详解Hook之useReducer函数.md",
        },
        {
          text: "React18之useTransition与useDeferredValue",
          link: "/frame/react/hook/11-React18之useTransition与useDeferredValue.md",
        },
        {
          text: "函数组件功能复用之自定义Hook",
          link: "/frame/react/hook/12-函数组件功能复用之自定义Hook.md",
        },
        {
          text: "简易购物车的Hook版本",
          link: "/frame/react/hook/13-简易购物车的Hook版本.md",
        },
      ],
    },

    {
      text: "路由",
      collapsed: true,
      items: [
        {
          text: "ReactRouterV6基础路由搭建",
          link: "/frame/react/ReactRouter/02-ReactRouterV6基础路由搭建.md",
        },
        {
          text: "动态路由模式与编程式路由模式",
          link: "/frame/react/ReactRouter/03-动态路由模式与编程式路由模式.md",
        },
        {
          text: "useSearchParams与useLocation函数",
          link: "/frame/react/ReactRouter/04-useSearchParams与useLocation函数.md",
        },
        {
          text: "默认路由展示与重定向路由与404处理",
          link: "/frame/react/ReactRouter/05-默认路由展示与重定向路由与404处理.md",
        },
        {
          text: "路由loader函数与redirect方法",
          link: "/frame/react/ReactRouter/06-路由loader函数与redirect方法.md",
        },
        {
          text: "自定义全局守卫与自定义元信息",
          link: "/frame/react/ReactRouter/07-自定义全局守卫与自定义元信息.md",
        },
      ],
    },

    {
      text: "状态管理",
      collapsed: true,
      items: [
        {
          text: "Redux状态管理的基本流程",
          link: "/frame/react/redux/08-Redux状态管理的基本流程.md",
        },
        {
          text: "react-redux简化对Redux的使用",
          link: "/frame/react/redux/09-react-redux简化对Redux的使用.md",
        },
        {
          text: "如何处理多个reducer函数及Redux模块化",
          link: "/frame/react/redux/10-如何处理多个reducer函数及Redux模块化.md",
        },
        {
          text: "redux-thunk中间件处理异步操作",
          link: "/frame/react/redux/11-redux-thunk中间件处理异步操作.md",
        },
        {
          text: "Redux-Toolkit(RTK)改善Redux使用体验",
          link: "/frame/react/redux/12-Redux-Toolkit(RTK)改善Redux使用体验.md",
        },
        {
          text: "Redux-Toolkit(RTK)如何处理异步任务",
          link: "/frame/react/redux/13-Redux-Toolkit(RTK)如何处理异步任务.md",
        },
        {
          text: "通过redux-persist进行数据持久化处理",
          link: "/frame/react/redux/14-通过redux-persist进行数据持久化处理.md",
        },
        {
          text: "路由加状态管理的登录拦截综合案例",
          link: "/frame/react/redux/15-路由加状态管理的登录拦截综合案例.md",
        },
        {
          text: "类组件中如何使用路由和状态管理",
          link: "/frame/react/redux/16-类组件中如何使用路由和状态管理.md",
        },
      ],
    },

    {
      text: "Typescript",
      collapsed: true,
      items: [
        {
          text: "props类型",
          link: "/frame/react/ts/08-React与TS配合之基础props限制.md",
        },
        {
          text: "children与event类型",
          link: "/frame/react/ts/09-React与TS配合之children与event限制.md",
        },
        {
          text: "style与component类型",
          link: "/frame/react/ts/10-React与TS配合之style与component限制.md",
        },
        {
          text: "use函数类型",
          link: "/frame/react/ts/11-React与TS配合之use函数限制.md",
        },
        {
          text: "类组件类型",
          link: "/frame/react/ts/12-React与TS配合之类组件类型限制.md",
        },
        {
          text: "Router路由类型",
          link: "/frame/react/ts/13-React Router路由如何使用TS进行开发.md",
        },
        {
          text: "Redux Toolkit状态管理类型",
          link: "/frame/react/ts/14-Redux Toolkit状态管理如何使用TS进行开发.md",
        },
      ],
    },

    {
      text: "Umi",
      collapsed: true,
      items: [
        {
          text: "Umi4框架介绍与基本使用",
          link: "/frame/react/umi/15-Umi4框架介绍与基本使用.md",
        },

        {
          text: "Umi4之mock数据_路由数据加载_路由包装组件",
          link: "/frame/react/umi/16-Umi4之mock数据_路由数据加载_路由包装组件.md",
        },

        {
          text: "Umi Max之antd组件库_发起请求_共享数据流",
          link: "/frame/react/umi/17-Umi Max之antd组件库_发起请求_共享数据流.md",
        },
      ],
    },
  ],

  "/frame/different/": [
    {
      text: "区别",
      collapsed: false,
      items: [
        {
          text: "编程风格与视图风格",
          link: "/frame/different/02-React18与Vue3对比之编程风格与视图风格.md",
        },
        {
          text: "组件_路由_状态管理等风格",
          link: "/frame/different/03-React18与Vue3对比之组件_路由_状态管理等风格.md",
        },
        {
          text: "模板_样式_事件_表单等功能",
          link: "/frame/different/04-React18与Vue3对比之模板_样式_事件_表单等功能.md",
        },
        {
          text: "diff算法的相同策略与不同策略",
          link: "/frame/different/06-React18与Vue3对比之diff算法的相同策略与不同策略.md",
        },
        {
          text: "响应式_生命周期_副作用等功能",
          link: "/frame/different/07-React18与Vue3对比之响应式_生命周期_副作用等功能.md",
        },
      ],
    },
  ],
};

export default sidebar;
