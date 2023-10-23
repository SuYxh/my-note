# React Router 路由如何使用 TS 进行开发

## react-router-dom 类型限制

React 路由与 TS 配合常见的使用为以下这些操作：

- RouteObject 内置类型，限制路由表
- React.createElement() 进行组件编写
- 扩展 meta 元信息

```typescript
// /router/index.ts
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";
import Index from "../views/Index/Index";
import User from "../views/User/User";
import Login from "../views/Login/Login";
import React from "react";
declare module "react-router" {
  interface NonIndexRouteObject {
    meta?: { title: string };
  }
  interface IndexRouteObject {
    meta?: { title: string };
  }
}
export const routes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(App),
    meta: { title: "/" },
    children: [
      {
        path: "index",
        element: React.createElement(Index),
        meta: { title: "index" },
      },
      {
        path: "user",
        element: React.createElement(User),
        meta: { title: "user" },
      },
      {
        path: "login",
        element: React.createElement(Login),
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
```
