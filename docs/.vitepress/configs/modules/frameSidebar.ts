const sidebar = {
  "/frame/vue/": [
    {
      text: "vue",
      collapsed: false,
      items: [
        { text: "vue 基础", link: "/frame/vue/index" },
        { text: "vue 小技巧", link: "/frame/vue/skill" },
        { text: "Provide和Inject使用", link: "/frame/vue/Provide和Inject" },
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
  ],
};

export default sidebar;
