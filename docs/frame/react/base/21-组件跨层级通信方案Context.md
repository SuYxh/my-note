# 组件跨层级通信方案 Context

## Context 通信

前面我们学习了父子组件之间的通信，有时候我们需要多层组件之间的嵌套，那么如果从最外层一层一层的把数据传递到最内层的话势必会非常的麻烦。

所以 context 的作用就是解决这个问题，可以把数据直接从最外层传递给最内层的组件。

```jsx
let MyContext = React.createContext();
class Welcome extends React.Component {
  state = {
    msg: "welcome组件的数据",
  };
  render() {
    return (
      <div>
        Hello Welcome
        <MyContext.Provider value={this.state.msg}>
          <Head />
        </MyContext.Provider>
      </div>
    );
  }
}
class Head extends React.Component {
  render() {
    return (
      <div>
        Hello Head
        <Title />
      </div>
    );
  }
}
class Title extends React.Component {
  static contextType = MyContext;
  componentDidMount = () => {
    console.log(this.context);
  };
  render() {
    return (
      <div>
        Hello Title <MyContext.Consumer>{(value) => value}</MyContext.Consumer>
      </div>
    );
  }
}
let element = <Welcome />;
```

这里传递的语法，是通过`<MyContext.Provider>`组件携带`value`属性进行向下传递的，那么接收的语法是通过`<MyContext.Consumer>`组件。

也可以定义一个静态方法`static contextType = MyContext`，这样就可以在逻辑中通过`this.context`来拿到同样的值。
