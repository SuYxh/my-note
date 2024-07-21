# React 状态

## 故事从一个变量开始

大家还记得 jQuery 一把梭的时代吗？

假如我们要完成一个计数器的需求（点击‘+’、‘-’按钮可以实现数字加减），我们会怎么做？

以上做法使得事件和数据深度耦合了，我们可以想办法把数据和数据操作行为解耦吗？

## React State

React 为我们提供了创建状态与更新状态的 API —— `useState`

```typescript
const [count, setCount] = useState(0)

{count}
```

这里的 count 就是一个状态变量，他的变更可以驱动视图更新，从而实现组件重新渲染。当你想要更新他的值时，可以这样：

```typescript
setCount(count + 1)

// 不好的做法
const handleChange = useCallback(() => {
    setCount(count + 1)
}, [count])

// 引用其他 callback，会造成不必要的更新
const handleOtherChange = useCallback(() => {
    handleChange()
}, [handleChange])
// useEvent


// 好的做法
// 就近取值
const handleChange = useCallback(() => {
    setCount(c => c + 1)
}, [])
```

或者，我们根据**就近原则**，改写为这样：

```typescript
setCount(c => c + 1);
```

## React Reducer

当我们内部状态趋于复杂时，我们的状态看起来会非常混乱，例如：

```typescript
const [name] = useState('heyi');
const [age] = useState(18);
const [hobby] = useState('讲课');
```

如果我们组件内部状态足够过，那么状态会逐渐趋于复杂，这时，我们需要更好的编程范式来解决状态存储与更新。相信之前有同学使用过 `redux`，react 单向数据流告诉了我们，状态的管理需要注意以下几点：

1. 使用一个对象存储变量 （**state**）
2. 订阅模式实现对于该对象的变更响应处理 （**reducer**）
3. 定义更改对象变更的动作 （**action**）
4. 订阅该对象的变更，完成状态到视图的映射（**ui**** = fx(state)**）

用一句话来概括：状态由 useReducer 借助 reducer 生发，状态的变更由 dispach 发起，最终状态变更驱动视图更新，show code：

1. 定义 reducer，注意它是一个函数

```typescript
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}
```

1. 使用 reducer 生发 state

```typescript
export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
}
```

1. 调用 dispatch，变更状态

```typescript
dispatch({ type: 'incremented_age' })
```

完整代码：

```typescript
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button onClick={() => {
        
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```

那么回到我们前面提到的问题，当我们的状态过多，需要统一组织，我们只需要将状态定义为一个对象，然后在 reducer 中定义变更指定对象属性值的方法（action），即可优雅实现状态的主观意识更新。

```typescript
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```

## React Context

组件内的状态是相对简单的，我们只需要在内部注意状态的初始化与更新即可，但如果一个状态定义后，需要在后代组件使用，我们可以怎么做？

我们通常会将状态逐级传递，这样其实极其不优雅，有没有一种办法，在 `Page` 定义后，所有后代元素都能消费他的数据呢？

React Context 闪亮登场！

在使用前，我们需要先明确两个核心的概念，这样能帮助大家使用

1. 提供者，Provider
2. 消费者，Consumer

首先定义 react context：

```typescript
import React from "react";

export const PageContext = React.createContext({
  title: "Page Title"
});
```

提供者将数据提供给后代元素，像这样：

```html
<PageContext.Provider value={{ title: "Page Title" }}>
  <PageTitle />
</PageContext.Provider>
```

在后代组件中，就可以消费其提供的数据啦：

```html
<PageContext.Consumer>{({ title }) => title}</PageContext.Consumer>
```

当然，通常我们很少使用 `Consumer` 进行数据消费，而是我们会借助 hook 来完成，我们改造一下 `PageTitle`

```typescript
import { useContext } from "react";
import { PageContext } from "./PageContext";

export const PageTitle = () => {
  const { title } = useContext(PageContext);
  return (
    <div>
      {/* <PageContext.Consumer>{({ title }) => title}</PageContext.Consumer> */}
      {title}
    </div>
  );
};
```

```typescript
export const FormProvider = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props: FormProviderProps<TFieldValues, TContext, TTransformedValues>,
) => {
  const { children, ...data } = props;
  return (
    <HookFormContext.Provider value={data as unknown as UseFormReturn}>
      {children}
    </HookFormContext.Provider>
  );
};
```

## Redux

Redux 是一个非常棒的状态管理库，他提出了单向数据流，中间件等概念，能很好地进行状态结构设计。前面存储变量的对象，我们给他一个确切的定义——状态仓库（store），不同于对象操作的是：任何时候你都不能直接去更改状态仓库（store）中的值，而是需要使用**纯函数**进行状态修改。

比如定义一个 sum 函数。这一特性定义为 **immutable**。

用更专业一些的术语总结以上特性，便是：

1. 单一数据源
2. state 只读
3. 使用纯函数执行状态修改

![](https://qn.huat.xyz/mac/202407211651516.png)

说到这了，我们不妨先一起看一看 redux 最简单用法

```typescript
import { createStore } from 'redux';

const initialState = {
  count: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 };
    case 'DECREASE':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

// 订阅 state 变化
store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: 'ADD' });
```

### 源码解析

#### 定义用于创建 store 的方法

从上例我们可以看出，redux 最核心的方法便是：`createStore` ，我们重点关注一下这个方法的入参和返回值，不难发现，他需要接收 reducer，然后经过处理，返回 subscribe、getState、dispatch 等。

那么我们先定义出这个函数：

```typescript
function createStore(reducer) {

  function subscribe() {}
  function getState() {}
  function dispatch() {}

  return {
    subscribe
    getState
    dispatch
  }
}
```

进一步完善它

```typescript
export default function createStore(reducer) {
  let state;
  const nextListeners = [];

  function subscribe() {
    nextListeners.push(listener);

    /**
     * return unsubscribe function
     */
  }

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0, len = nextListeners.length; i < len; i++) {
      nextListeners[i]();
    }
  }

  return {
    subscribe,
    getState,
    dispatch,
  };
}
```

到这里，一个简单的状态管理功能就封装完成了，有了这个利器，我们就能大胆重构刚才案例的代码了。

#### combineReducer 和 applyMiddleware

这两个方法用于增强 redux 能力，比如我们一个状态仓库可能存储了多个模块的状态，这些模块的 reducer 相对分散，这时我们想有一个方法合并这些分散 reducer，实现比较简单，运用函数柯里化，定义一个 stateMap，然后依次调用对应 reducer 并将得到的值写入 stateMap 中，完成更新。

```typescript
export default function combineReducer(reducers) {
  /**
   * Get all reducer keys
   * 获取到所有 reducer key
   * */
  const reducerKeys = Object.keys(reducers);

  /**
   * Return the new reducer function
   * 返回新的 reducer 函数
   * */
  return function combination(
    state, action,
  ) {
    /**
     * Define a new state, which is used to store the state of all modules after the merge
     * 定义新的 state，该 state 用来存储合并之后的所有模块 state
     * */
    const nextState = {};

    /**
     * Traverse all reducers
     * 遍历所有 reducer
     * */
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      /**
       * First get the value of the previous state, this is the value stored in createStore,
       * this value is a state tree, including all module states
       * 先获取到之前 state 的值，这个是 createStore 中存储的值，该值是一个 state tree，包括了所有模块 state
       * */
      const previousStateForKey = state[key];
      /**
       * The reducer is executed, and the state parameter of the incoming and outgoing state is officially
       * the state stored last time, and the new state after the calculation will be obtained after the call
       * 执行 reducer，出入的 state 参数正式上次存储的 state，调用后会获得计算后新的 state
       * */
      const nextStateForKey = reducer(previousStateForKey, action);
      /**
       * Attach the corresponding module state to the nextState object, and use key as the key
       * 将对应模块 state 挂到 nextState 对象上，且以 key 为键
       * */
      nextState[key] = nextStateForKey;
    }

    /**
     * Return the merged state
     * 返回合并后的 state
     * */
    return nextState;
  };
}
```

完成后，定义两个 reducer 并将他们合并。

**applyMiddleware** 的实现需要用到一个很实用的函数 **compose**，划重点，这个面试可能常会问哦。

compose 通过数组 reduce 方法，将传入的多函数参数，进行函数柯里化处理，然后逐个执行函数。

在 createStore 函数新增一个参数，该参数命名为：enhancer，译为：增强器，顾名思义，是对 reducer 的增强，因此 enhancer 通过调用 createStore 初始化 store，进而增强 store 及其 **dispatch** 的能力。

#### 实现 Redux 对接到 react

在之前的版本我们通常会这样做（了解即可，不推荐）：

```typescript
export const useSelector = (selector, deps) => {
        const currSelector = useCallback(selector, deps)
        const selectorRef = useRef(selector)
        const stateRef = useRef()
        const forceUpdate = useReducer(() => ({}), {})[1]
        
        useLayoutEffect(() => {
            selectorRef.current = currSelector
        })
        
        if (stateRef.current === undefined || currSelector !== selectorRef.current) {
            stateRef.current = currSelector(this.#state)
        }
        
        useLayoutEffect(() => {
            const checkUpdate = () => {
                const nextState = selectorRef.current(store)
                if (!shallowEqual(stateRef.current, (stateRef.current = nextState))) {
                    forceUpdate()
                }
            }
            checkUpdate()
            return this.subscribe(checkUpdate)
        }, [forceUpdate])
        
        return stateRef.current
}
```

后来，react 提供了以下方法用于实现选择，新的实现可以像这样：

**useSyncExternalStore**

```typescript
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

在项目中使用

```typescript
const snapshot = useSyncExternalStore(store.subscribe, store.getState);
```

这样一来，redux 外部状态就与 react 状态对接上了。

完整代码：

```typescript
import React, { useSyncExternalStore } from "react";
import logo from "./logo.svg";
import "./App.css";
import { combineReducer, createStore } from "./lib/redux";

const initialState = {
  count: 0,
};

const countReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

const ageReducer = (state = { age: 18 }, action: any) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        age: state.age + 1,
      };
    default:
      return state;
  }
};

const store = createStore(
  combineReducer({ count: countReducer, age: ageReducer })
);

store.dispatch({ type: "ADD" });

function App() {
  const snapshot = useSyncExternalStore(store.subscribe, store.getState);
  return (
    <div className="App">
      <header
        className="App-header"
        onClick={() => store.dispatch({ type: "ADD" })}
      >
        {snapshot.count.count}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

## 状态选型依据

详细状态库能力对照表：

## 回头看看 useState、useReducer 与 redux

先说 useReducer，为什么呢？因为看名字你可能就会感觉到我们前面讲的 reducer 和 useReducer 可能有一定联系。没错，你可以在 useReducer 中看到 reducer 的影子，可以这样说，useReducer 替换了 redux 的 createStore，该方法返回的数组，第一个参数正是 store，而第二个参数正是 dispatch。

另外一个原因是，useReducer 是 useState 的基础，useState 只是在 useReducer 的基础上进行了一定封装。

关于 react 源码，本节我们只点到 useReducer 及 useState 强相关的内容。另外大家可以多看看 `react` 、`react-reconciler` 、`scheduler` 以及 `react-dom` 。

我们看到 **react-reconciler** 包中的 `ReactFiberHooks.js` 文件。

处理 reducer 需要分为两个阶段，mount 和 update，分别为：`mountReducer` 和 `updateReducer` 。

与此同时指明当前所在阶段 Hook 对象——dispacher

```typescript
// react
ReactCurrentDispatcher
```

useState 在 useReducer 基础上进行了封装。`lastRenderedReducer: basicStateReducer` ，updateState 则直接调用 updateReducer。

# CRA

![](https://qn.huat.xyz/mac/202407211651049.png)

## 基本使用

我们前面学习 `Vue`，了解了 Vue 脚手架，React 也为我们提供了脚手架以此来降低项目初始化成本。CRA 使用非常简单。

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

这样一个 React 项目就初始化成功了。

初始化好的 React 项目，目录结构像这样：

```bash
redux-learn
  ├─README.md
  ├─package-lock.json
  ├─package.json
  ├─public
  │    ├─favicon.ico
  │    ├─index.html
  │    ├─logo192.png
  │    ├─logo512.png
  │    ├─manifest.json
  │    └─robots.txt
  ├─src
  │    ├─App.css
  │    ├─App.test.tsx
  │    ├─App.tsx
  │    ├─index.css
  │    ├─index.tsx
  │    ├─logo.svg
  │    ├─react-app-env.d.ts
  │    ├─reportWebVitals.ts
  │    └─setupTests.ts
  └─tsconfig.json
```

## 谈谈 react-scripts

相信同学们已经看到，`package.json` 中的 script 定义均指向了一个命令 `react-scripts`，他是何方神圣？

React 将项目构建与启动相关逻辑封装在了 `react-scripts` 包中，以此来为开发者屏蔽项目构建的细节。

如果我们项目使用了 cra，但又希望修改其配置，推荐使用 `[https://github.com/arackaf/customize-cra](https://github.com/arackaf/customize-cra)

## CRA 中其他包简要说明

![](https://qn.huat.xyz/mac/202407211651309.png)
