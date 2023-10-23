# useSearchParams 与 useLocation 函数

## useLocation 函数

用于获取路由 URL 的信息的，返回一个 location 对象。

```jsx
import { useLocation } from "react-router-dom";
export default function Bar() {
  const location = useLocation();
  console.log(location);
  return <div>Bar</div>;
}
```

location 对象相关属性如下：

- hash：哈希值
- key：唯一标识
- pathname：路径
- search：query 值
- state：隐式数据

一般传递的数据就是需要拿到 query 值，不过要通过 search 去解析对应的 query 值是比较麻烦的，需要把字符串解析成对象。

所以可以利用 useSearchParams 函数来获取 query 数据。

## useSearchParams 函数

用于处理 URL 中的携带数据。

```jsx
import { useSearchParams } from "react-router-dom";

export default function Bar() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("age"));
  const handleClick = () => {
    setSearchParams({ age: 22 });
  };
  return <div onClick={handleClick}>Bar</div>;
}
```

可以进行数据的获取，也可以对 URL 的 query 进行设置操作，非常的方便。
