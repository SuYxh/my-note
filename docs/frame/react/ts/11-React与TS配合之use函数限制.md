# React 与 TS 配合之 use 函数限制

## use 函数限制

在 React 函数组件中，主要就是对 use 函数进行类型的注解。常见的注解 use 函数如下：

- useState -> 联合类型、对象字面量类型
- useEffect -> 自动类型推断
- useRef -> 泛型标签类型

```tsx
import React, { useEffect, useState, useRef } from "react";
interface WelcomeProps {}
function Welcome(props: WelcomeProps) {
  return (
    <div>
      <h2>hello Welcome</h2>
    </div>
  );
}
type Info = { username: string; age: number };
export default function App() {
  //const [count, setCount] = useState(0)
  const [count, setCount] = useState<number | string>(0);
  const [list, setList] = useState<string[]>([]);
  //const [info, setInfo] = useState<{username: string; age: number}|null>(null)
  const [info, setInfo] = useState<Info>({} as Info);
  const myRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    console.log(myRef.current?.innerHTML); // 可选链(类型保护)
    //console.log( myRef.current!.innerHTML )  // 非空断言(慎用)
    return () => {};
  }, []);
  const handleClick = () => {
    setCount(1);
    setList(["a", "b"]);
  };
  return (
    <div>
      <h2>04_react-ts</h2>
      <button onClick={handleClick} ref={myRef}>
        点击
      </button>
      {info.username}, {info.age}
      <Welcome />
    </div>
  );
}
```

useState 和 useRef 都是通过泛型的方式进行类型注解，useEffect 主要利用自动类型推断来完成。
