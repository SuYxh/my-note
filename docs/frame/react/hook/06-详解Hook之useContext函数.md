# 详解 Hook 之 useContext 函数

## useContext 函数

这个函数用来创建 context 对象，而 context 对象的用法跟类组件中的 context 对象是一样的，也是完成跨组件通信的。

涉及到的语法有：

- let MyContext = React.createContext()
- <MyContext.Provider value={}>
- let value = useContext(MyContext)

let MyContext = React.createContext()用于得到一个可以进行传递数据的组件，<MyContext.Provider value={}>用于实现数据的传递。let value = useContext(MyContext)用于获取传递进组件内的值。

```jsx
let { useContext } = React;
let MyContext = React.createContext("默认值");
let Welcome = (props) => {
  return (
    <div>
      hello Welcome
      <MyContext.Provider value="welcome的问候~~~">
        <Head />
      </MyContext.Provider>
    </div>
  );
};
let Head = () => {
  return (
    <div>
      hello Head
      <Title />
    </div>
  );
};
let Title = () => {
  let value = useContext(MyContext);
  return <div>hello Title, {value}</div>;
};
```
