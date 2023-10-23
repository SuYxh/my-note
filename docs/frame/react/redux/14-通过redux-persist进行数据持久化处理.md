# 通过 redux-persist 进行数据持久化处理

## redux-persist 模块

redux-persist 模块是对状态管理进行持久化处理的，默认数据是不会被保存下来的，需要长期存储改变的共享数据就需要使用持久化模块。

下面是在状态管理的入口模块中进行持久化的配置操作。

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";
import messageReducer from "./modules/message";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["count"],
};

const store = configureStore({
  reducer: {
    // state.counter.count
    counter: persistReducer(persistConfig, counterReducer),
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
persistStore(store);
export default store;
```

这样可以对 counterReducer 中的 count 数据进行持久化，基本配置参考 RTK 官网即可。
