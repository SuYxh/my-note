# React 与 TS 配合之基础 props 限制

## 对父子通信进行类型限定

首先让脚手架支持 TypeScript，可以在安装脚手架的时候进行配置即可，命令如下。

```shell
npx create-react-app react-ts-study --template typescript
```

然后就是创建两个组件，并且完成 props 通信。

```tsx
import React from "react";
interface WelcomeProps {
  msg?: string;
  count?: number;
  list: string[];
  info: { username: string; age: number };
  status?: "loading" | "success" | "error";
}

function Welcome(props: WelcomeProps) {
  const { count = 0 } = props;
  return (
    <div>
      <h2>hello Welcome, {count}</h2>
    </div>
  );
}
export default function App() {
  return (
    <div>
      <h2>01_react-ts</h2>
      <Welcome
        msg="hello"
        count={123}
        list={["a", "b", "c"]}
        info={{ username: "xiaoming", age: 20 }}
      />
      <Welcome
        list={["a", "b", "c"]}
        info={{ username: "xiaoming", age: 20 }}
      />
      <Welcome
        status="loading"
        list={["a", "b", "c"]}
        info={{ username: "xiaoming", age: 20 }}
      />
    </div>
  );
}
```

下面来看一下函数表达式写法的情况下，如何指定 props 的类型，可通过内置的 FC 类型来进行实现。

```tsx
const Welcome: React.FC<WelcomeProps> = (props) => {
  return (
    <div>
      <h2>hello Welcome</h2>
    </div>
  );
};
```
