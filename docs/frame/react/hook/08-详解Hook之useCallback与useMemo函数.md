# 详解 Hook 之 useCallback 与 useMemo 函数

useCallback 返回一个可记忆的函数，useMemo 返回一个可记忆的值，useCallback 只是 useMemo 的一种特殊形式。

那么这到底是什么意思呢？实际上我们在父子通信的时候，有可能传递的值是一样的，但是传递的内存地址可能是不一样的，那么在 React 眼里是会对组件进行重新执行的。

一般对象类型的值都是具备内存地址的，所以值相同，但内存地址可能不同，举例如下：

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  const foo = () => {};
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      hello Welcome
      <Head bar={bar} />
    </div>
  );
};
```

当点击按钮的时候，`<Head>`组件会进行重新渲染，因为每次重新触发`<Welcome>`组件的时候，后会重新生成一个新的内存地址的 foo 函数。

那么如何不让 foo 函数重新生成，使用之前的函数地址呢？因为这样做可以减少子组件的渲染，从而提升性能。可以通过 useCallback 来实现。

```jsx
const foo = useCallback(() => {}, []);
```

而有时候这种需要不一定都是函数，比如数组的情况下，我们就需要用到 useMemo 这个钩子函数了，useMemo 更加强大，其实 useCallback 是 useMemo 的一种特殊形式而已。

```jsx
const foo = useMemo(() => () => {}, []); // 针对函数
const bar = useMemo(() => [1, 2, 3], []); // 针对数组
```

这里我们还要注意，第二个参数是一个数组，这个数组可以作为依赖项存在，也就是说当依赖项发生值的改变的时候，那么对应的对象就会重新创建。

```jsx
const foo = useMemo(() => () => {}, [count]); // 当count改变时，函数重新创建
```
