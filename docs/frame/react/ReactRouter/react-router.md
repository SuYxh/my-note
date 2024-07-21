# react-router 详解

## 基础使用

首先初始化 react 项目

```bash
npx create-react-app react-router-demo --template typescript
```

首先安装 react-router-dom

```typescript
{
    "react-router-dom": "6.15.0"
}
```

首先我们记住一点，其实在 react-router 底层，实现了不同宿主的路由，react-router-dom 是针对浏览器的，还有 react-router-native 是针对 react-native 的，这个思路非常值得我们学习，**上层抽象，具体宿主环境实现**

其他可选择：@tanstack/router

React-router 提供给我们两种定义路由的方式（组件式、函数创建式），我们只关注一种，**函数创建式**。

我们推荐使用函数创建式，定义路由，原因有以下几点：

1. 动态路由与路由权限的处理更直观
2. ts 类型推导与类型安全更健全

### 定义 router

```typescript
import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);
```

### RouterProvider

通过 router provider 使用路由

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

这样一个简单带路由的应用就创建成功啦。

## 常见的几种 router

- createBrowserRouter：浏览器提供的历史管理
- createHashRouter：基于 hash 的路由管理，#hello，但是呢通常 # 又可以作为锚链接
- createMemoryRouter：内存型路由，路由的管理存储在**内存**中
- createStaticRouter：SSR 服务端的

### createBrowserRouter

通过浏览器原生路由进行路由态管理，页面跳转通过 pushState、popState 方法实现

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

Nginx try_files

```typescript
location / {
  try_files $uri /index.html;
}
```

### createHashRouter

请注意，这个方法非常不推荐，所以我们不会重点讲，简单过一下。

他的用武之地就在于，我们没有 Nginx 作为静态资源代理，我们可能就无法使用浏览器历史作为我们路由状态的存储，这时可以选择 hash router 方案，但是注意，真的**非常不推荐**，除非是你自己的个人项目。

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

### createMemoryRouter

用于创建一个内存型路由，路由表与历史记录栈存储在内存中，当页面刷新时，路由信息丢失。

大家还记得我们在 Vue3 项目实战的那个例子吗？页面中有一个浏览器模拟器，他的路由我们则可以选择内存路由来处理。

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";

import CalendarEvent from "./routes/calendarEvent";

const routes = [
    {
      path: "/events/:id",
      element: <CalendarEvent />,
      loader: () => FAKE_EVENT,
    },
];

const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/events/123"],
    initialIndex: 1,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

### createStaticRouter

如果我们需要实现服务端渲染，那么在服务端的路由处理则需要使用该 api，因为我们知道客户端的路由是基于浏览器的 history，而服务端是没有浏览器环境的。

```typescript
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import Root, {
  loader as rootLoader,
  ErrorBoundary as RootBoundary,
} from "./root";

const routes = [
  {
    path: "/",
    loader: rootLoader,
    Component: Root,
    ErrorBoundary: RootBoundary,
  },
];

export async function renderHtml(req) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let fetchRequest = createFetchRequest(req);
  let context = await query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server  // handle that directly  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider        router={router}        context={context}      />
    </React.StrictMode>
  );
}
```

## 常用的 Hook

- useNavigate
- useLocation
- useMatch

### useNavigate

该 hook 让你可以在组件中进行跳转

```typescript
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

还有一个 `redirect` 方法，可以在组件外部需要重定向时（ `loaders` 和 `actions` 中），使用

```typescript
import { redirect } from "react-router-dom";

const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  return null;
};
```

### useLocation

用于获取当前 location 相关信息

### useMatch

返回动态路由匹配到的值，例如现在路由定义：/person/:id

而此时地址栏路由为：/person/88

那么 useMatch 返回的值便是 88

## 常见组件

`Link`

因为**语义**以及用户可用性

比如跳转用 onClick 实现，那么你就必须通过鼠标点击才能跳转，如果要在新的 tab 打开，如果是 Link ，按住 Ctrl+ 左键即可，navigate 的话，就不行

## 原理浅析

分析源码我们需要重点关注：`react-router`、`react-router-dom` 和 `history`。

路由历史记录栈

**竞争式路由**

# 手写一个 react-router

我们前面提到，react 给我们提供了四种不同的路由系统，分别为：

1. Browser
2. Hash
3. Memory
4. Static

通常工作中，大家使用 browserRouter 居多，面试也常问，我们就以 BrowserRouter 为例梳理其实现原理，理解后，大家可以融合贯通，这四种系统是怎样通过 **createxxxRouter** 抹平端差异的。

## BrowserRouter

浏览器路由实现，最主要的两个概念是变更路由与监听路由变更。

首先我们要明确几个概念：

1. 历史操作，history.pushState、history.replaceState。**不会触发 pop****s****tate**
2. 监听变更，window.addEventListener("popstate", () => {})
3. 操作，history.back()，history.forward()，history.go()，会触发 **pop****s****tate**

创建 router

```typescript
export function createBrowserRouter(
  routes: RouteObject[],
  opts?: DOMRouterOpts
): RemixRouter {
  return createRouter({
    basename: opts?.basename,
    future: {
      ...opts?.future,
      v7_prependBasename: true,
    },
    history: createBrowserHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    mapRouteProperties,
  }).initialize();
}
```

router 下承载 history

```typescript
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */
export function createBrowserHistory(
  options: BrowserHistoryOptions = {}
): BrowserHistory {
  function createBrowserLocation(
    window: Window,
    globalHistory: Window["history"]
  ) {
    let { pathname, search, hash } = window.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      (globalHistory.state && globalHistory.state.usr) || null,
      (globalHistory.state && globalHistory.state.key) || "default"
    );
  }

  function createBrowserHref(window: Window, to: To) {
    return typeof to === "string" ? to : createPath(to);
  }

  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
```

history 需要 location 定位资源

```typescript
function getUrlBasedHistory(
  getLocation: (window: Window, globalHistory: Window["history"]) => Location,
  createHref: (window: Window, to: To) => string,
  validateLocation: ((location: Location, to: To) => void) | null,
  options: UrlHistoryOptions = {}
): UrlHistory {
  let { window = document.defaultView!, v5Compat = false } = options;
  let globalHistory = window.history;
  let action = Action.Pop;
  let listener: Listener | null = null;

  let index = getIndex()!;
  // Index should only be null when we initialize. If not, it's because the
  // user called history.pushState or history.replaceState directly, in which
  // case we should log a warning as it will result in bugs.
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }

  function getIndex(): number {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }

  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }

  function push(to: To, state?: any) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);

    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);

    // try...catch because iOS limits us to 100 pushState calls :/
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // If the exception is because `state` can't be serialized, let that throw
      // outwards just like a replace call would so the dev knows the cause
      // https://html.spec.whatwg.org/multipage/nav-history-apis.html#shared-history-push/replace-state-steps
      // https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }

    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }

  function replace(to: To, state?: any) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);

    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);

    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }

  function createURL(to: To): URL {
    // window.location.origin is "null" (the literal string value) in Firefox
    // under certain conditions, notably when serving from a local HTML file
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
    let base =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href;

    let href = typeof to === "string" ? to : createPath(to);
    invariant(
      base,
      `No window.location.(origin|href) available to create URL for href: ${href}`
    );
    return new URL(href, base);
  }

  let history: History = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window, globalHistory);
    },
    listen(fn: Listener) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;

      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window, to);
    },
    createURL,
    encodeLocation(to) {
      // Encode a Location the same way window.location would
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    },
  };

  return history;
}
```

事件处理解决后，接下来就是解决监听，我们上面提到监听 popState 以此来处理路由变更

```typescript
listen(fn: Listener) {
  if (listener) {
    throw new Error("A history only accepts one active listener");
  }
  window.addEventListener(PopStateEventType, handlePop);
  listener = fn;

  return () => {
    window.removeEventListener(PopStateEventType, handlePop);
    listener = null;
  };
},
```

处理 popstate 逻辑

```typescript
function handlePop() {
    action = Action.Pop
    let nextIndex = getIndex()
    let delta = nextIndex == null ? null : nextIndex - index
    index = nextIndex
    if (listener) {
        listener({ action, location: history.location, delta })
    }
}
```

