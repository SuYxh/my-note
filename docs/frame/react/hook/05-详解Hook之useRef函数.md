# 详解 Hook 之 useRef 函数

useRef 函数的作用就是原生 DOM 操作，跟类组件中的 ref 操作是类似的，也是可以通过回调函数和 useRef()两种方式来操作原生 DOM。

## 回调函数形式

```jsx
let Welcome = (props) => {
  const handleClick = () => {};
  const elementFn = (elem) => {
    console.log(elem);
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      <input ref={elementFn} type="text" />
    </div>
  );
};
```

## useRef()形式

```jsx
let { useRef } = React;
let Welcome = (props) => {
  const myRef = useRef();
  const handleClick = () => {
    myRef.current.focus();
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      <input ref={myRef} type="text" />
    </div>
  );
};
```

## 函数转发

可以把 ref 添加到函数组件上，那么就可以把 ref 对应的对象转发到子组件的内部元素身上。

```jsx
let Head = React.forwardRef((props, ref) => {
  return (
    <div>
      hello Head
      <input type="text" ref={ref} />
    </div>
  );
});
let Welcome = (props) => {
  const myRef = useRef();
  const handleClick = () => {
    myRef.current.focus();
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      <Head ref={myRef} />
    </div>
  );
};
```

## useRef 的记忆能力

useRef 可以做到跟 useState 类似的功能，就是可以对值进行记忆操作。

```jsx
let Welcome = (props) => {
  const [num, setNum] = useState(0);
  //let count = 0;  //不具备记忆功能的
  let count = useRef(0); // 可以给普通值进行记忆操作
  const handleClick = () => {
    count.current++;
    console.log(count.current);
    setNum(num + 1);
    //console.log(num);
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
    </div>
  );
};
```

我们就可以利用这一点，来实现一些应用，例如利用 useRef 来对 useEffect 进行只做更新的操作。

```jsx
let Welcome = (props) => {
  const [num, setNum] = useState(0);
  let isUpdate = useRef(false);
  useEffect(() => {
    if (isUpdate.current) {
      console.log(123);
    }
  });
  const handleClick = () => {
    setNum(num + 1);
    isUpdate.current = true;
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
    </div>
  );
};
```
