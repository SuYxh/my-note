# React 与 TS 配合之类组件类型限制

## 类组件类型限定

类组件在 React 中并不是重点，但是也要了解怎么对类组件进行类型的限制。

```tsx
import React, { Component } from "react";
interface WelcomeProps {
  msg: string;
  count: number;
}
interface WelcomeState {
  username: string;
}
class Welcome extends Component<WelcomeProps, WelcomeState> {
  state = {
    username: "xiaoming",
  };
  render() {
    return <div>hello Welcome {this.state.username}</div>;
  }
}
export default function App() {
  return (
    <div>
      <h2>05_react-ts</h2>
      <Welcome msg="hello" count={123} />
    </div>
  );
}
```

主要就是给继承的类 Component 传递泛型，Props 和 State，这样可以实现父子通信的数据进行类型限制，又可以对内部的 state 进行类型限制。
