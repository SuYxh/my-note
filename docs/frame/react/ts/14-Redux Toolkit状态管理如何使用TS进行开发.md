# Redux Toolkit 状态管理如何使用 TS 进行开发

## Redux Toolkit 限制类型

Redux 状态管理与 TS 配合常见的使用为以下这些操作：

- 得到全局 state 类型： `ReturnType<typeof store.getState>`
- 限定 payload 类型： `PayloadAction`

```typescript
// /store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
```

```typescript
// /store/modules/user.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export const loginAction = createAsyncThunk(
  "users/loginAction",
  async (userId: number) => {
    const response = await new Promise((resolve) => {
      resolve("response data");
    });
    return response;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "xiaoming",
  },
  reducers: {
    change(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});
export const { change } = userSlice.actions;
export default userSlice.reducer;
```
