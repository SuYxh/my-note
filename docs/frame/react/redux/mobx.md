## mobx

MobX 是一个基于观察者模式的状态管理库，它强调响应式编程。以下是一个使用 MobX 的最佳实践案例，展示如何在一个简单的 React 应用中使用 MobX 来管理状态。

### 1. 安装依赖

首先，确保你已经安装了 `mobx` 和 `mobx-react-lite`（用于 React 的绑定）。

```bash
npm install mobx mobx-react
```

### 2. 创建 MobX Store

我们将创建一个 MobX store 来管理 `count` 和 `user` 的状态。

```javascript
// src/stores/counterStore.js
import { makeAutoObservable } from 'mobx';

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

export default new CounterStore();
```

```javascript
// src/stores/userStore.js
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class UserStore {
  userData = null;
  status = 'idle'; // 'idle' | 'loading' | 'succeeded' | 'failed'
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser() {
    this.status = 'loading';
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      runInAction(() => {
        this.userData = response.data;
        this.status = 'succeeded';
      });
    } catch (error) {
      runInAction(() => {
        this.status = 'failed';
        this.error = error.message;
      });
    }
  }
}

export default new UserStore();
```

### 3. 创建 Root Store

为了方便管理多个 store，我们可以创建一个根 store。

```javascript
// src/stores/rootStore.js
import counterStore from './counterStore';
import userStore from './userStore';

const rootStore = {
  counterStore,
  userStore,
};

export default rootStore;
```

### 4. 在组件中使用 MobX

现在我们可以在组件中使用这些状态和操作。

```javascript
// src/App.js
import React from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import rootStore from './stores/rootStore';

const App = observer(() => {
  const { counterStore, userStore } = useLocalObservable(() => rootStore);

  const handleIncrement = () => {
    counterStore.increment();
  };

  const handleDecrement = () => {
    counterStore.decrement();
  };

  const handleFetchUser = () => {
    userStore.fetchUser();
  };

  return (
    <div>
      <h1>Counter: {counterStore.count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <h1>User</h1>
      <button onClick={handleFetchUser} disabled={userStore.status === 'loading'}>
        {userStore.status === 'loading' ? 'Loading...' : 'Fetch User'}
      </button>
      {userStore.status === 'succeeded' && (
        <div>
          <p>Name: {userStore.userData.name}</p>
          <p>Email: {userStore.userData.email}</p>
        </div>
      )}
      {userStore.status === 'failed' && <p>Error: {userStore.error}</p>}
    </div>
  );
});

export default App;
```

### 5. 提供 Root Store

在应用的入口文件中提供根 store。

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import rootStore from './stores/rootStore';
import App from './App';

ReactDOM.render(
  <Provider {...rootStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### 6. 运行应用

现在你可以运行你的应用，并看到 `counter` 和 `user` 的状态管理是如何工作的。

```bash
npm start
```





## `mobx-react-lite` 和 `mobx-react` 的区别

`mobx-react-lite` 是 `mobx-react` 的轻量级版本，主要用于 React 函数组件。`mobx-react` 则同时支持类组件和函数组件。

1. **支持的组件类型**：
   - `mobx-react-lite`：仅支持 React 函数组件。
   - `mobx-react`：支持 React 函数组件和类组件。
2. **包的大小**：
   - `mobx-react-lite`：更轻量级，适合只需要函数组件的项目。
   - `mobx-react`：包含了更多的功能，适合需要同时支持类组件和函数组件的项目。
3. **API 差异**：
   - `mobx-react-lite`：提供了 `observer` 和 `useLocalObservable` 等 hooks。
   - `mobx-react`：除了 `observer` 和 `useLocalObservable`，还提供了 `inject` 和 `Provider` 等高阶组件（HOC）。



## `mobx-react-lite`

### 1. 创建 Context

首先，创建一个 Context 来存储根 store。

```javascript
// src/stores/RootStoreContext.js
import React from 'react';
import rootStore from './rootStore';

const RootStoreContext = React.createContext(rootStore);

export default RootStoreContext;
```

### 2. 在组件中使用 Context

然后，在组件中使用 Context 来访问根 store。

```javascript
// src/App.js
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import RootStoreContext from './stores/RootStoreContext';

const App = observer(() => {
  const { counterStore, userStore } = useContext(RootStoreContext);

  const handleIncrement = () => {
    counterStore.increment();
  };

  const handleDecrement = () => {
    counterStore.decrement();
  };

  const handleFetchUser = () => {
    userStore.fetchUser();
  };

  return (
    <div>
      <h1>Counter: {counterStore.count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <h1>User</h1>
      <button onClick={handleFetchUser} disabled={userStore.status === 'loading'}>
        {userStore.status === 'loading' ? 'Loading...' : 'Fetch User'}
      </button>
      {userStore.status === 'succeeded' && (
        <div>
          <p>Name: {userStore.userData.name}</p>
          <p>Email: {userStore.userData.email}</p>
        </div>
      )}
      {userStore.status === 'failed' && <p>Error: {userStore.error}</p>}
    </div>
  );
});

export default App;
```

### 3. 提供 Root Store

在应用的入口文件中提供根 store。

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import RootStoreContext from './stores/RootStoreContext';
import rootStore from './stores/rootStore';
import App from './App';

ReactDOM.render(
  <RootStoreContext.Provider value={rootStore}>
    <App />
  </RootStoreContext.Provider>,
  document.getElementById('root')
);
```

### 4. 运行应用

现在你可以运行你的应用，并看到 `counter` 和 `user` 的状态管理是如何工作的。

```bash
npm start
```
