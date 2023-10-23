# 函数组件功能复用之自定义 Hook

在前面讲类组件的时候，介绍了两种进行组件功能复用的操作：1. Render Props 2. HOC。

在本小节中讲介绍如何使用函数组件的自定义 Hook 来完成组件功能的复用操作。

还是完成页面获取鼠标坐标的小案例，代码如下：

```jsx
let { useState, useEffect } = React;
let useMouseXY = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    function move(ev) {
      setX(ev.pageX);
      setY(ev.pageY);
    }
    document.addEventListener("mousemove", move);
    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);
  return {
    x,
    y,
  };
};
let Welcome = () => {
  const { x, y } = useMouseXY();
  return (
    <div>
      hello Welcome, {x}, {y}
    </div>
  );
};
```

自定义 Hook 函数跟 React 自带的 Hook 函数用法类似，其实现原理也是类似的。
