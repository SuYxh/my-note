# 复用组件功能之 Render Props 模式

## Render Props 模式

术语 “render props” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。利用这种方式可以实现组件之间的功能复用操作。

```jsx
class MouseXY extends React.Component {
  state = {
    x: 0,
    y: 0,
  };
  componentDidMount = () => {
    document.addEventListener("mousemove", this.move);
  };
  componentWillUnmount = () => {
    document.removeEventListener("mousemove", this.move);
  };
  move = (ev) => {
    this.setState({
      x: ev.pageX,
      y: ev.pageY,
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.render(this.state.x, this.state.y)}
      </React.Fragment>
    );
  }
}
class Welcome extends React.Component {
  render() {
    return (
      <MouseXY
        render={(x, y) => (
          <div>
            hello world, {x}, {y}
          </div>
        )}
      />
    );
  }
}
let element = <Welcome />;
```

主要就是 render 属性后面的值是一个回调函数，通过这个函数的形参可以得到组件中的数据，从而实现功能的复用。
