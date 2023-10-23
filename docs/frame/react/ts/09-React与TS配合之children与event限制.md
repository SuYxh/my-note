# React 与 TS 配合之 children 与 event 限制

## children 的类型限制

父子通信时候的内容分发进行限制。

```tsx
import React from "react";
interface WelcomeProps {
  children?: React.ReactNode;
}
function Welcome(props: WelcomeProps) {
  return (
    <div>
      <h2>hello Welcome, {props.children}</h2>
    </div>
  );
}
export default function App() {
  return (
    <div>
      <h2>02_react-ts</h2>
      <Welcome />
      <Welcome>aaaaa</Welcome>
    </div>
  );
}
```

我们把 children 属性作为可选参数，这样当`<Welcome>`组件进行内容分发和不进行内容分发都是可以的。

## event 限制

event 在 React 中主要通过内置的 ev: React.MouseEvent`<HTMLButtonElement>`来进行限定。

```tsx
import React from "react";
interface WelcomeProps {
  children?: React.ReactNode;
  handleMsg?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
function Welcome(props: WelcomeProps) {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    console.log(ev.target.value);
  };
  return (
    <div>
      <h2>hello Welcome, {props.children}</h2>
      <button onClick={props.handleMsg}>点击</button>
      <input type="text" onChange={handleChange} />
    </div>
  );
}
export default function App() {
  return (
    <div>
      <h2>02_react-ts</h2>
      <Welcome />
      <Welcome handleMsg={(ev) => {}}>aaaaa</Welcome>
    </div>
  );
}
```
