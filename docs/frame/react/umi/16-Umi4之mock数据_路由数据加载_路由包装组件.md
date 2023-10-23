# Umi4 之 mock 数据-路由数据加载-路由包装组件

## mock 数据

Umi 提供了开箱即用的 Mock 功能，能够用方便简单的方式来完成 Mock 数据的设置。

Umi 约定 `/mock` 目录下的所有文件为 [Mock 文件](https://umijs.org/docs/guides/mock#mock-文件)，例如这样的目录结构：

```shell
.
├── mock
    ├── todos.ts
    ├── items.ts
    └── users.ts
└── src
    └── pages
        └── index.tsx
```

下面在根目录下创建`/mock/user.ts`，代码如下：

```typescript
import { defineMock } from "umi";
export default defineMock({
  // 返回值可以是数组形式
  "GET /api/users": [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
  ],
  "POST /api/users": {
    errcode: 0,
  },
  "POST /api/login": (req, res) => {
    if (req.body.username === "xiaoming" && req.body.password === "123456") {
      res.send({ errcode: 0 });
    } else {
      res.send({ errcode: -1 });
    }
  },
});
```

`defineMock`方法用于 mock 数据的类型推断。

除了基本的 GET、POST 类型以外，还可以进行模拟数据的接收以及逻辑的处理。

这样就可以直接通过`localhost:8000/api/users`进行访问了。

## 路由数据加载

Umi 提供了开箱即用的数据预加载方案，能够解决在多层嵌套路由下，页面组件和数据依赖的瀑布流请求。Umi 会自动根据当前路由或准备跳转的路由，并行地发起他们的数据请求，因此当路由组件加载完成后，已经有马上可以使用的数据了。

```tsx
import React from "react";
import { useClientLoaderData } from "umi";
export default function user() {
  const { data } = useClientLoaderData();
  return (
    <div>
      {data.map((v: any) => (
        <div key={v.id}>{v.name}</div>
      ))}
    </div>
  );
}
export async function clientLoader() {
  const data = await fetch("/api/users").then((res) => res.json());
  return data;
}
```

可以通过 mock 获取数据，并且在 user 组件加载前获取到 data 数据，等页面展示出来的时候，就可以利用`useClientLoaderData`方法来获取到 data 数据。

## 路由包装组件

在配置路由的时候，可以让程序先执行一个守卫组件，然后根据情况再决定是否可以进入该路由。

```typescript
export default {
  npmClient: "pnpm",
  clientLoader: {},
  routes: [
    { path: "/user", component: "user" },
    {
      path: "/login",
      component: "@/pages/login",
      routes: [
        {
          path: "foo",
          component: "@/pages/foo",
          wrappers: ["@/wrappers/auth"],
        },
      ],
    },
  ],
};
```

在`/wrappers/auth.tsx`下完成守卫相关的代码。

```tsx
// @/wrappers/auth
import React from "react";
import { Outlet, Navigate } from "umi";
export default function auth() {
  if (Math.random() > 0.5) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        <Navigate to="/user" />
      </div>
    );
  }
}
```
