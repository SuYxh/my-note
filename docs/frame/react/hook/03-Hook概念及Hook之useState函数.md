# Hook 概念及 Hook 之 useState 函数

## 什么是 Hook

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。例如，useState 是允许你在 React 函数组件中添加 state 的 Hook。

下面就可以学习我们 Hook 中的第一个钩子函数，即：useState 函数。这个钩子函数主要实现的功能就是类似于类组件中 setState()方法所实现的功能，当数据发生改变的时候可以重新执行组件的重渲染操作。

```jsx
let { useState } = React;
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      <div>hello world, {count}</div>
    </div>
  );
};
```

当点击按钮的时候，通过调用`setCount`来修改 count 值，从而使得 Welcome 组件重新执行，而 useState 函数具备记忆功能，所以再次得到的 count 值就是修改之后的值，那么视图重新渲染就会显示新的效果。

在使用 Hook 钩子函数的时候，要一些规范要求，那么就是只能在最顶层使用 Hook，只能在函数组件中使用 Hook。也就是 useState 一定要放到组件的最前面进行调用，不要在函数或语句中进行调用。

那么 setCount 函数是用来修改 count 数据的，所以他跟前面讲的类组件的 state 是很像的，也是具备自动批处理能力的，如果不想使用这种自动批处理能力的话，还是可以使用`flushSync`这个方法。

```jsx
let { useState } = React;
let { flushSync } = ReactDOM;
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("hello");
  const handleClick = () => {
    flushSync(() => {
      setCount(count + 1);
    });
    flushSync(() => {
      setMsg("hi");
    });
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      <div>
        hello world, {count}, {msg}
      </div>
    </div>
  );
};
```

以上对 Welcome 组件重新渲染了两次。setCount 函数具备回调函数的写法，可以把相同的操作进行都触发的行为。

```jsx
setCount((count)=> count+1)
setCount((count)=> count+1)
setCount((count)=> count+1)

<div>{ count }</div>   // 渲染 3
```

useState 中的值在修改的时候，并不会进行原值的合并处理，所以使用的时候要注意。可利用扩展运算符的形式来解决合并的问题。

```jsx
const [info, setInfo] = useState({
  username: "xiaoming",
  age: 20,
});
setInfo({
  ...info,
  username: "xiaoqiang",
});
```

如果遇到初始值需要大量运算才能获取的话，可采用惰性初始 state，useState()添加回调函数的形式来实现。

```jsx
const initCount = () => {
  console.log("initCount");
  return 2 * 2 * 2;
};
const [count, setCount] = useState(() => {
  return initCount();
});
```

这样初始只会计算一次，并不会每次都重新进行计算。
