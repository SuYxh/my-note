# 如何处理多个 reducer 函数及 Redux 模块化

## 模块化 Redux

对于多个共享状态数据的时候，最好进行分离操作，独立成一个一个的模块，这样后期维护起来会非常的方便。

需要使用一个`combineReducers`方法来处理多个 reducer 函数，还需要添加命名空间。

具体操作为，给/store 文件夹下添加/modules 文件夹，并创建 counter.js 文件。

```javascript
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "counter/inc":
      const count = state.count + action.payload;
      return { count, doubleCount: count * 2 };
    default:
      state.doubleCount = state.count * 2;
      return state;
  }
}
export default counterReducer;
```

现在可以再抽离一个模块出来，message.js 模块。

```javascript
function messageReducer(state = { msg: "hello" }, action) {
  switch (action.type) {
    case "message/change":
      const msg = action.payload;
      return { msg, upperMsg: msg.toUpperCase() };
    default:
      state.upperMsg = state.msg.toUpperCase();
      return state;
  }
}
export default messageReducer;
```

在状态管理的 index.js 文件中，完成模块的初始化操作。

```javascript
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import counterReducer from "./modules/counter";
import messageReducer from "./modules/message";
const store = createStore(
  combineReducers({
    counter: counterReducer,
    message: messageReducer,
  }),
  composeWithDevTools
);
export default store;
```

使用上需要带上 counter 或 message 的命名空间。

```jsx
import React from "react";
import "./Foo.scss";
import { useSelector, useDispatch } from "react-redux";
import { counterTestAction } from "../../store/modules/counter";
export default function Foo() {
  const count = useSelector((state) => state.counter.count);
  const doubleCount = useSelector((state) => state.counter.doubleCount);
  const msg = useSelector((state) => state.message.msg);
  const upperMsg = useSelector((state) => state.message.upperMsg);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: "counter/inc",
      payload: 5,
    });
    dispatch({
      type: "message/change",
      payload: "hi",
    });
  };
  return (
    <div>
      <button onClick={handleClick}>修改count</button>
      Foo, {count}, {doubleCount}, {msg}, {upperMsg}
    </div>
  );
}
```

这里也模拟了类似于 Vue 中的计算属性，doubleCount 和 upperMsg。
