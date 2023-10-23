# 详解 Hook 之 useEffect 函数

## 什么是 useEffect Hook

Effect Hook 可以让你在函数组件中执行副作用操作，副作用即：DOM 操作、获取数据、记录日志等，uEffect Hook 可以用来代替类组件中的生命周期钩子函数。

首先来看一下 useEffect 钩子的基本使用，代码如下：

```jsx
let { useState, useEffect } = React;
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // 初始 和 更新 数据的时候会触发回调函数
    console.log("didMount or didUpdate");
  });
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

当有一些副作用需要进行清理操作的时候，在 useEffect 中可通过 return 返回回调函数来实现。

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  //异步函数，在浏览器渲染DOM后触发的
  useEffect(() => {
    console.log("didMount or didUpdate");
    return () => {
      // 这里回调函数可以用来清理副作用
      console.log("beforeUpdate or willUnmount");
    };
  });
  const handleClick = () => {
    //setCount(count + 1);
    root.unmount();
  };
  return (
    <div>
      <button onClick={handleClick}>点击</button>
      <div>hello world, {count}</div>
    </div>
  );
};
```

在更新前触发或在卸载时候触发`beforeUpdate or willUnmount`，这样可以对某些副作用进行清理操作。

useEffect 有很多需要注意的事项，总结如下：

- 使用多个 Effect 实现关注点分离
- 通过跳过 Effect 进行性能优化
- Effect 中使用了某个响应式数据，一定要进行数组的依赖处理
- 频繁的修改某个响应式数据，可通过回调函数进行改写
- useEffect()是在渲染被绘制到屏幕之后执行的，是异步的；useLayoutEffect()是在渲染之后但在屏幕更新之前，是同步的

## 使用多个 Effect 实现关注点分离

因为 useEffect 可以调用多次，每一次都是独立的，互相不影响，所以可以进行逻辑关注点的分离操作。

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  });
  const [msg, setMsg] = useState("hello");
  useEffect(() => {
    console.log(msg);
  });
  const handleClick = () => {
    setCount(count + 1);
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

## 通过跳过 Effect 进行性能优化

当关注点分离后，改变一个数据后，例如 count，那么 msg 相关的 useEffect 也会触发，那么对于性能这块还是有一些影响的，能不能做到哪一个数据改变了，只重新触发自己的 useEffect 回调函数呢？

可以通过给 useEffect 设置第二个参数来做到。

```jsx
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);
}, [count]);
const [msg, setMsg] = useState("hello");
useEffect(() => {
  console.log(msg);
}, [msg]);
```

## Effect 中使用了某个响应式数据，一定要进行数组的依赖处理

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, []); // ✖ 当useEffect中有响应式数据，那么在依赖数组中一定要指定这个响应式数据

  useEffect(() => {
    console.log(123);
  }, []); // ✔ 只有初始化的时候触发，模拟 初始的生命周期钩子

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

当 useEffect 中使用了响应式的数据 count 时候，需要在[]中进行依赖处理，`[count]`这样才是符合规范的。

## 频繁的修改某个响应式数据，可通过回调函数进行改写

```jsx
let Welcome = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]); // ✔ 会造成定时器的累加，所以需要清理，非常麻烦的

  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []); // ✔

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

第一种写法，会频繁的触发 useEffect 重新执行，那么就需要不断的清除定时，非常的不方便，所以可以写成像第二种写法那样，通过回调函数去修改 count 数据，这样就不会对定时器进行累加，也不会影响到 useEffect 的规范使用。

## useEffect 异步与 useLayoutEffect 同步

在 React 中提供了一个跟 useEffect 类似的钩子，useLayoutEffect 这个钩子。

useEffect()是在渲染被绘制到屏幕之后执行的，是异步的；useLayoutEffect()是在渲染之后但在屏幕更新之前，是同步的。

具体看下面这个例子：

```jsx
let { useState, useEffect, useLayoutEffect } = React;
let Welcome = (props) => {
  const [msg, setMsg] = useState("hello world");
  useEffect(() => {
    let i = 0;
    while (i < 100000000) {
      i++;
    }
    setMsg("hi react");
  });
  /* useLayoutEffect(()=>{
        let i = 0;
        while(i<100000000){
          i++;
        }
        setMsg('hi react');
      }) */
  return (
    <div>
      <div>{msg}</div>
    </div>
  );
};
```

使用 useEffect，页面会看到闪烁的变化，而采用 useLayoutEffect 就不会看到数据闪烁的问题，因为 useLayoutEffect 可以同步显示 UI，大部分情况下我们采用 useEffect()，性能更好。但当你的 useEffect 里面的操作需要处理 DOM，并且会改变页面的样式，就需要用 useLayoutEffect，否则可能会出现闪屏问题。
