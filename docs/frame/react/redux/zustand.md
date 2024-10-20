## zustand

### 1. 安装依赖

首先，确保你已经安装了 `zustand` 和 `axios`。

```bash
npm install zustand axios
```

### 2. 创建 Zustand Store

我们将创建一个 Zustand store 来管理 `count` 和 `user` 的状态。我们将使用 TypeScript 来定义类型。

```typescript
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounterStore;

```

```typescript
// src/stores/userStore.ts
import { create } from "zustand";
import axios from "axios";

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  userData: UserData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fetchUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  userData: null,
  status: "idle",
  error: null,
  fetchUser: async () => {
    set({ status: "loading" });
    try {
      const response = await axios.get<UserData>(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      set({ userData: response.data, status: "succeeded" });
    } catch (error: any) {
      set({ status: "failed", error: error.message });
    }
  },
}));

export default useUserStore;

```

### 3. 在组件中使用 Zustand Store

现在我们可以在组件中使用这些状态和操作。

```typescript
import useCounterStore from "./stores/counterStore";
import useUserStore from "./stores/userStore";

const App = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  const userData = useUserStore((state) => state.userData);
  const status = useUserStore((state) => state.status);
  const error = useUserStore((state) => state.error);
  const fetchUser = useUserStore((state) => state.fetchUser);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <h1>User</h1>
      <button onClick={fetchUser} disabled={status === "loading"}>
        {status === "loading" ? "Loading..." : "Fetch User"}
      </button>
      {status === "succeeded" && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
      {status === "failed" && <p>Error: {error}</p>}
    </div>
  );
};

export default App;

```

### 4. 运行应用

现在你可以运行你的应用，并看到 `counter` 和 `user` 的状态管理是如何工作的。

```bash
npm start
```

### 总结

这个案例展示了如何使用 Zustand 和 TypeScript 来管理 `count` 和 `user` 的状态，包括同步和异步操作。Zustand 通过 `create` 函数简化了状态的创建和管理，使得状态管理更加直观和高效。TypeScript 的类型定义使得代码更加健壮和易于维护。Zustand 的轻量级和简洁的 API 使得它非常适合小型到中型的 React 应用。