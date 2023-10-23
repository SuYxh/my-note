# PureComponent 与 shouldComponentUpdate

PureComponent 与 shouldComponentUpdate 这两个方法都是为了减少没必要的渲染，React 给开发者提供了改善渲染的优化方法。

## shouldComponentUpdate

当我们在调用`setState()`方法的时候，如果数据没有改变，实际上也会重新触发`render()`方法。

```jsx
class Welcome extends React.PureComponent {
  state = {
    msg: "hello",
    count: 0,
  };
  handleClick = () => {
    this.setState({
      msg: "hello",
    });
  };
  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        {this.state.msg}, {this.state.count}
      </div>
    );
  }
}
let element = <Welcome />;
```

上面的`render()`方法还是会不断的触发，但是实际上这些 render 触发是没有意义的，所以可以通过`shouldComponentUpdate`钩子函数进行性能优化处理。

```jsx
class Welcome extends React.Component {
  state = {
    msg: "hello",
    count: 0,
  };
  handleClick = () => {
    this.setState({
      msg: "hi",
    });
  };
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.msg === nextState.msg) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        {this.state.msg}, {this.state.count}
      </div>
    );
  }
}
let element = <Welcome />;
```

shouldComponentUpdate()方法的返回值，如果返回 false 就不进行界面的更新，如果返回 true 就会进行界面的更新。这样就可以根据传递的值有没有改变来决定是否进行重新的渲染。

## PureComponent

PureComponent 表示纯组件，当监控的值比较多的时候，自己去完成判断实在是太麻烦了，所以可以通过 PureComponent 这个内置的纯组件来自动完成选择性的渲染，即数据改变了重新渲染，数据没改变就不重新渲染。

```jsx
class Welcome extends React.PureComponent {
  state = {
    msg: "hello",
    count: 0,
  };
  handleClick = () => {
    this.setState({
      msg: "hi",
    });
  };
  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        {this.state.msg}, {this.state.count}
      </div>
    );
  }
}
let element = <Welcome />;
```

改成了纯组件后，记得不要直接对数据进行修改，必须通过`setState()`来完成数据的改变，不然纯组件的特性就会失效。

```jsx
class Welcome extends React.PureComponent {
  state = {
    msg: "hello",
    count: 0,
    list: ["a", "b", "c"],
  };
  handleClick = () => {
    /* this.setState({
          list: [...this.state.list, 'd']
        }); */
    //错误✖
    /* this.state.list.push('d');
        this.setState({
          list: this.state.list
        }) */
  };
  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        <ul>
          {this.state.list.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    );
  }
}
let element = <Welcome />;
```
