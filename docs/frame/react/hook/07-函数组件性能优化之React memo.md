# 函数组件性能优化之 React.memo

在本小节中将对函数组件的性能进行一个简单的了解，首先函数组件中的数据没有发生改变的时候，是不会重新渲染视图的。

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(0);
  };
  console.log(123);
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      hello Welcome {Math.random()}
    </div>
  );
};
```

在上面的程序中，当点击了按钮，123 是不会被打印的。这里我们还需要了解一种特殊的现象，代码如下：

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(1);
  };
  console.log(123);
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      hello Welcome {Math.random()}
    </div>
  );
};
```

上面的代码，当点击按钮后，应该触发一次 123 后就不会再触发了，但是实际上确触发了两次，那么这是为什么呢？实际上 React 官网上有对这一现象做过说明。

链接地址如下：https://zh-hans.reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update。引用内容如下：

如果你更新 State Hook 后的 state 与当前的 state 相同时，React 将跳过子组件的渲染并且不会触发 effect 的执行。（React 使用 [`Object.is` 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 来比较 state。）

需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 `useMemo` 来进行优化。

内部只是为了进行检测，并不会影响我们的效果。这里还说到了如果不想让组件在没有数据依赖的情况下，可通过`React.memo`来避免没有必要的重新渲染，实际上`React.memo`的功能类似于类组件中的纯函数概念。

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(1);
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      hello Welcome
      <Head count={count} />
    </div>
  );
};
let Head = React.memo(() => {
  return <div>hello Head, {Math.random()}</div>;
});
```

当 count 没有发生改变的时候，那么`<Head>`组件不会重新触发。
