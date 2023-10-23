# React 与 TS 配合之 style 与 component 限制

## style 限制

当我们进行 style 样式通信的时候，也是可以指定类型，防止样式传递的时候不复合规范。

```tsx
import React from "react";
interface HeaderProps {
  username: string;
}
interface WelcomeProps {
  style: React.CSSProperties;
}
function Welcome(props: WelcomeProps) {
  return (
    <div>
      <h2>hello Welcome</h2>
    </div>
  );
}
export default function App() {
  return (
    <div>
      <h2>03_react-ts</h2>
      <Welcome style={{ border: "1px red solid", display: "none" }} />
    </div>
  );
}
```

主要通过 React.CSSProperties 来指定样式的类型，这样当传递的样式属性或者值不符合规范的时候，就不会产生 TS 的提示。

## component 限制

如果组件进行通信的时候，也可以进行类型的限制。

```tsx
import React from "react";
interface HeaderProps {
  username: string;
}
interface WelcomeProps {
  style: React.CSSProperties;
  component: React.ComponentType<HeaderProps>;
}
function Welcome(props: WelcomeProps) {
  return (
    <div>
      <h2>hello Welcome</h2>
      <props.component username="xiaoming"></props.component>
    </div>
  );
}
function Header(props: HeaderProps) {
  return <div>hello Header</div>;
}
export default function App() {
  return (
    <div>
      <h2>03_react-ts</h2>
      <Welcome
        style={{ border: "1px red solid", display: "none" }}
        component={Header}
      />
    </div>
  );
}
```

主要通过 React.ComponentType<>来指定组件的类型，那么一旦不符合指定的接口类型，就会报错。
