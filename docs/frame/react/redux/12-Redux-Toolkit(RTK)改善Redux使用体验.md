# Redux-Toolkit(RTK)改善 Redux 使用体验

## Redux-Toolkit(RTK)库

Redux 在使用上还是有很多不方便的地方，所以提供了 Redux-Toolkit(RTK)这个模块，通过这么模块可以更方便的处理 Redux 的操作，下面列举一些 RTK 的好处：

- 可以自动跟 redux devtools 结合，不需要再下载模块进行生效
- 数据不需要再通过返回值进行修改，像 Vue 一样可以直接修改
- 内置了 redux-thunk 这个异步插件
- 代码风格更好，采用选项式编写程序

下面就采用 RTK 的方式来编写状态管理模块 counter.js 和 message.js。

```jsx
// /store/modules/counter.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  count: 0,
};
const counterSlice = createSlice({
  // dispatch('counter/inc')
  name: "counter",
  initialState: {
    ...initialState,
    doubleCount: initialState.count * 2,
  },
  reducers: {
    inc(state, action) {
      state.count += action.payload;
      state.doubleCount = state.count * 2;
    },
  },
});
export default counterSlice.reducer;
```

```javascript
// /store/modules/message.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  msg: "hello",
};
const messageSlice = createSlice({
  // dispatch('message/change')
  name: "message",
  initialState: {
    ...initialState,
    upperMsg: initialState.msg.toUpperCase(),
  },
  reducers: {
    change(state, action) {
      state.msg = action.payload;
      state.upperMsg = state.msg.toUpperCase();
    },
  },
});
export default messageSlice.reducer;
```

可以发现 RTK 采用配置写法，更加清晰并且一目了然。而且 RTK 下可以直接进行数据的修改，不再需要通过返回值来进行修改，底层类似于 Vuex 的方式就是利用 new Proxy 直接监控数据的改变。

下面是在主模块中进行配置 RTK 模块的具体步骤。

```javascript
// /store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";
import messageReducer from "./modules/message";
const store = configureStore({
  reducer: {
    // state.counter.count
    counter: counterReducer,
    message: messageReducer,
  },
});
export default store;
```

配置好后，在使用上是没有任何变化的，依然采用 react-redux 来进行操作。
