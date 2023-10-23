# 详解 Hook 之 useReducer 函数

useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。

下面是没有使用 useReducer 实现的一个小的案例，代码如下：

```jsx
let Welcome = (props) => {
  const [isLogin, setLogin] = useState(true);
  const [isLogout, setLogout] = useState(false);
  const handleLogin = () => {
    setLogin(true);
    setLogout(false);
  };
  const handleLogout = () => {
    setLogin(false);
    setLogout(true);
  };
  return (
    <div>
      {isLogin ? (
        <button onClick={handleLogout}>退出</button>
      ) : (
        <button onClick={handleLogin}>登录</button>
      )}
    </div>
  );
};
```

这里分成了两个 useState 函数去完成的，并没有体现整体关联性与统一性。下面是利用 useRducer 函数的改进写法。

```jsx
let { useReducer } = React;
let loginState = {
  isLogin: true,
  isLogout: false,
};
let loginReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { isLogin: true, isLogout: false };
    case "logout":
      return { isLogin: false, isLogout: true };
    default:
      throw new Error();
  }
};
let Welcome = (props) => {
  const [state, loginDispatch] = useReducer(loginReducer, loginState);
  const handleLogin = () => {
    loginDispatch({ type: "login" });
  };
  const handleLogout = () => {
    loginDispatch({ type: "logout" });
  };
  return (
    <div>
      {state.isLogin ? (
        <button onClick={handleLogout}>退出</button>
      ) : (
        <button onClick={handleLogin}>登录</button>
      )}
    </div>
  );
};
```
