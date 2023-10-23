# Redux-Toolkit(RTK)如何处理异步任务

## createAsyncThunk 方法

在 RTK 中是通过 createAsyncThunk 方法来进行异步处理的，并且还提供了一个配置选项 extraReducers 来处理额外的 reducer。

```javascript
// /store/modules/message.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  msg: "hello",
};
export const messageTestAction = createAsyncThunk(
  "message/testAction",
  async () => {
    const ret = await new Promise((resolve) => {
      setTimeout(() => {
        resolve("response data");
      }, 2000);
    });
    return ret;
  }
);
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
  extraReducers: {
    [messageTestAction.fulfilled](state, action) {
      state.msg = action.payload;
      state.upperMsg = state.msg.toUpperCase();
    },
  },
});
export default messageSlice.reducer;
```

extraReducers 会得到三种状态，fulfilled，rejected，pending，这样可以对应异步操作的三种情况，成功，失败，等待。在成功后就可以触发额外的代码，这样就可以进行后续的同步 reducer 的调用或处理一些异步后的数据等。

在 RTK 中内置了 redux-thunk 这个模块，所以我们并不需要下载额外的模块，只需要把异步方法提供处理，并且让 dispatch 方法进行调用就好。

```jsx
import { useSelector, useDispatch } from "react-redux";
import { messageTestAction } from "../../store/modules/message";
export default function Foo() {
  const count = useSelector((state) => state.counter.count);
  const doubleCount = useSelector((state) => state.counter.doubleCount);
  const msg = useSelector((state) => state.message.msg);
  const upperMsg = useSelector((state) => state.message.upperMsg);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(messageTestAction()).then((res) => {
      dispatch({
        type: "message/change",
        payload: res.payload,
      });
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
