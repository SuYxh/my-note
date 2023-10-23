# props 细节详解及注意事项

## 构造器中获取 props 数据

props 是我们 React 父子组件之间通信的对象，那么这个对象在构造器`constructor`中是获取不到的。

```jsx
class Welcome extends React.Component {
  constructor() {
    super();
    console.log(this.props.msg); // undefined
  }
  render() {
    return <div>hello world, {this.props.msg}</div>;
  }
}
let element = <Welcome msg="hi react" />;
```

可以通过给`super()`传递 props 参数是可以做到的，代码如下：

```jsx
constructor(props){
    super(props);
    console.log( this.props.msg )   // hi react
}
```

那么 React 类组件是如何设计的呢？就要对面向对象非常的熟悉，原理分析如下：

```jsx
class Foo {
  constructor(props) {
    this.props = props;
  }
}
class Bar extends Foo {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    console.log(this.props);
    return "";
  }
}
let props = {
  msg: "hello world",
};
let b = new Bar(props);
b.props = props;
b.render();
```

## 多属性的传递

当有非常多的属性要传递的时候，那么会比较麻烦，所以可通过扩展运算形式进行简写。

```jsx
class Welcome extends React.Component {
  render() {
    let { msg, username, age } = this.props;
    console.log(isChecked);
    return (
      <div>
        hello world, {msg}, {username}, {age}
      </div>
    );
  }
}
let info = {
  msg: "hi react",
  username: "xiaoming",
  age: 20,
};
let element = <Welcome {...info} />;
```

## 给属性添加默认值与类型

```jsx
import PropTypes from 'prop-types'
class Welcome extends React.Component {
    static defaultProps = {
        age: 0
    }
    static propTypes = {
        age: PropTypes.number
    }
    ...
}
```

这里的类型需要引入第三方模块才可以生效。

当父子通信的时候，如果只写属性，不写值的话，那么对应的值就是布尔值 true。
