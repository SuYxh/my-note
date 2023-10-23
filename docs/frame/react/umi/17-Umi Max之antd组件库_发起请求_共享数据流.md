# Umi Max 之 antd 组件库-发起请求-共享数据流

## Umi Max 简介

Umi 作为一个可扩展的企业级前端应用框架，在蚂蚁集团内部已经已直接或间接地服务了 10000+ 应用。在工程实践的过程中，解决大量前端开发中开发中遇到的常见问题，这些经验累积成 Umi 各个插件。为了方便开发者更加方便的使用这些插件，在我们这些插件开源的基础上，直接将他们集成到一起，打造了 `@umijs/max`。 让开发者直接可以通过脚手架马上获得和蚂蚁集团开发 Umi 应用一样的开发体检。

在使用 `create-umi` 选择 `Ant Design Pro` 模板，就能使用 `@umijs/max` 来创建项目了。

```bash
$ npx create-umi@latest
? Pick Umi App Template › - Use arrow-keys. Return to submit.
    Simple App
❯   Ant Design Pro
    Vue Simple App
```

![18-07-Umi Max初始界面](https://qn.huat.xyz/mac/202310231403686.png)

## antd 组件库

要想在 Umi Max 中对 antd 库进行支持，需要在`.umirc.ts`中进行配置。

```typescript
import { defineConfig } from '@umijs/max';
export default defineConfig({
  antd: {},
  ...
});
```

```tsx
import Guide from "@/components/Guide";
import { trim } from "@/utils/format";
import { PageContainer } from "@ant-design/pro-components";
import { useModel, request } from "@umijs/max";
import styles from "./index.less";
import { Button, Rate } from "antd";
const HomePage: React.FC = () => {
  const { name, setName } = useModel("global");
  const { users, setUsers } = useModel("userList");
  const handleClick = () => {
    setName("new Name");
    setUsers([...users, { id: 3, name: "dabai" }]);
    request("/api/v1/user/", { method: "PUT" }).then((res) => {
      console.log(res);
    });
  };
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Button onClick={handleClick} type="primary">
          {name}
        </Button>
        <Rate></Rate>
        {users.map((v) => (
          <div key={v.id}>{v.name}</div>
        ))}
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};
export default HomePage;
```

直接引入 antd 模块，就可以使用提供的组件了。

## 发起请求

上面给出的代码中，可以看到`request` 这个方法，用于发起 Ajax 请求。基本上就是对 Axios 进行了二次的封装处理。

## 共享数据流

Umi Max 中采用了一种简单的方式来实现数据共享的操作，利用`useModel`这个方法。

这个方法可以调用全局数据或指定的共享数据。

```tsx
const { name, setName } = useModel("global");
const { users, setUsers } = useModel("userList");
```

`global`就是全局的，而`userList`就是指定的。这些共享数据会自动查找`/src/models`下对应的文件。

```typescript
// 全局共享数据示例  /src/models/global.ts
import { DEFAULT_NAME } from "@/constants";
import { useState } from "react";
const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
};
export default useUser;
```

```typescript
// /src/models/userList.ts
import React, { useState } from "react";
export default function userList() {
  const [users, setUsers] = useState([
    { id: 1, name: "xiaoming" },
    { id: 2, name: "xiaoqiang" },
  ]);
  return {
    users,
    setUsers,
  };
}
```
