# Redux 状态管理的基本流程

## Redux 状态管理库

Redux 就像我们前面学习 Vue 中的 Vuex 或 Pinia 是一样的，专门处理状态管理的。只不过 Redux 比较独立，可以跟很多框架结合使用，不过主要还是跟 React 配合比较好，也是最常见的 React 状态管理的库。

官网网站：https://redux.js.org/

需要安装才能使用，即：`npm i redux`

要想很好的理解 Redux 的设计思想，就要看懂下面这张 Redux 基本流程图。

![17-02-redux基本流程图](https://qn.huat.xyz/mac/202310231007632.gif)

在图示当中，各部分的分工如下：

- State：用于存储共享数据
- Reducer：用于修改 state 数据的方法
- Middleware：用于扩展一些插件来完成异步的操作
- Dispatch：用于触发 Reducer 或 Middleware

下面就来演示一下 Redux 代码的基本使用，首先在/src 文件夹下创建/store 文件夹和/store/index.js 状态管理的配置文件。

```javascript
import { createStore } from "redux";
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
const store = createStore(counterReducer);
export default store;
```

这样 store 对象就可以在其他组件中进行使用了，例如在<Foo>组件中。

```jsx
import React from "react";
import "./Foo.scss";
import store from "../../store";
import { useState } from "react";

export default function Foo() {
  const [count, setCount] = useState(store.getState().count);
  const handleClick = () => {
    store.dispatch({
      type: "inc",
    });
  };
  store.subscribe(() => {
    setCount(store.getState().count);
  });
  return (
    <div>
      <button onClick={handleClick}>修改count</button>
      Foo, {count}
    </div>
  );
}
```

这段代码中的`store.getState().count`就是用于获取到 count 的值。那么如何进行 count 的修改呢？需要调用 dispatch 方法来触发对应的 counterReducer 函数。

虽然 count 值确实被修改了，但是页面并没有同步发生改变，这主要就是因为需要通过`subscribe`方法进行监听，在监听到 count 改变后，再去触发对应的重渲染。

这样页面就会跟着方法变化了，不过这种做法非常的不方便，所以下一个小节会使用一个第三方模块`react-redux`来简化对 Redux 的使用。
