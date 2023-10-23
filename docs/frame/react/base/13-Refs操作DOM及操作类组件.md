# Refs 操作 DOM 及操作类组件

React 操作原生 DOM 跟 Vue 框架是类似的，都是通过 ref 属性来完成的，主要使用`React.createRef()`这个方法和`callbackRef()`这个回调函数写法。

## React.createRef()

这个方法可以创建一个 ref 对象，然后把这个 ref 对象添加到对应的 JSX 元素的 ref 属性中，就可以控制原生 DOM 了。

```jsx
class Welcome extends React.Component {
  myRef = React.createRef();
  handleClick = () => {
    //console.log(this.myRef.current);  // 原生DOM
    this.myRef.current.focus();
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        <input type="text" ref={this.myRef} />
      </div>
    );
  }
}
```

## 回调函数写法

还可以编写一个回调函数来完成，原生 DOM 的操作。

```jsx
class Welcome extends React.Component {
  callbackRef = (element) => {
    element.focus();
  };
  handleClick = () => {
    this.myRef.focus();
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        <input type="text" ref={this.callbackRef} />
      </div>
    );
  }
}
```

## Ref 操作类组件

除了可以把 ref 属性添加到 JSX 元素上，还可以把 ref 属性添加到类组件上，那么这样可以拿到类组件的实例对象。

```jsx
class Head extends React.Component {
  username = "xiaoming";
  render() {
    return <div>head component</div>;
  }
}

class Welcome extends React.Component {
  myRef = React.createRef();
  handleClick = () => {
    console.log(this.myRef.current); //组件的实例对象
    console.log(this.myRef.current.username);
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        <Head ref={this.myRef} />
      </div>
    );
  }
}
```

这样可以间接的实现父子组件之间的数据通信。

ref 属性还可以进行转发操作，可以把 ref 传递到组件内，获取到子组件的 DOM 元素。

```jsx
class Head extends React.Component {
  render() {
    return <div ref={this.props.myRef}>head component</div>;
  }
}
class Welcome extends React.Component {
  myRef = React.createRef();
  handleClick = () => {
    console.log(this.myRef.current);
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
        <Head myRef={this.myRef} />
      </div>
    );
  }
}
```
