# React 简介

![](https://qn.huat.xyz/mac/202407211643075.png)

React 是一个**声明式**，高效且灵活的用于构建用户界面的 **JavaScript**** 库**。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作**“组件”**。

ui = render (data) -> 单向数据流

- MVC

![](https://qn.huat.xyz/mac/202407211643029.png)

```javascript
// model
var myapp = {}; // 创建这个应用对象

myapp.Model = function() {
  var val = 0;

  this.add = function(v) {
    if (val < 100) val += v;
  };

  this.sub = function(v) {
    if (val > 0) val -= v;
  };

  this.getVal = function() {
    return val;
  };

  ／* 观察者模式 ／
  var self = this, 
      views = [];

  this.register = function(view) {
    views.push(view);
  };

  this.notify = function() {
    for(var i = 0; i < views.length; i++) {
        views[i].render(self);
    }
  };
};

// view
myapp.View = function(controller) {
  var $num = $('#num'),
      $incBtn = $('#increase'),
      $decBtn = $('#decrease');

  this.render = function(model) {
      $num.text(model.getVal() + 'rmb');
  };

  //   绑定事件  /
  $incBtn.click(controller.increase);
  $decBtn.click(controller.decrease);
};

// controller
myapp.Controller = function() {
  var model = null,
      view = null;

  this.init = function() {
    //  初始化Model和View /
    model = new myapp.Model();
    view = new myapp.View(this);

    //  View向Model注册，当Model更新就会去通知View啦 /
    model.register(view);
    model.notify();
  };

  //  让Model更新数值并通知View更新视图 */
  this.increase = function() {
    model.add(1);
    model.notify();
  };

  this.decrease = function() {
    model.sub(1);
    model.notify();
  };
};

// init
(function() {
  var controller = new myapp.Controller();
  controller.init();
})();
```

- MVVM

![](https://qn.huat.xyz/mac/202407211644381.png)

```javascript
// model
var data = {
    val: 0
};

// view
<div id="myapp">
    <div>
        <span>{{ val }}rmb</span>
    </div>
    <div>
        <button v-on:click="sub(1)">-</button>
        <button v-on:click="add(1)">+</button>
    </div>
</div>

// controller
new Vue({
  el: '#myapp',
  data: data,
  methods: {
    add(v) {
        if(this.val < 100) {
            this.val += v;
        }
    },
    sub(v) {
        if(this.val > 0) {
            this.val -= v;
        }
    }
  }
});

// Vue是不是MVVM？React呢？
// 严格来讲都不是
// React：ui = render (data) 单向数据流
// Vue:   ref 直接操作DOM，跳过了ViewModel
```

# JSX 模板语法

JSX 称为 JS 的语法扩展，将 UI 与逻辑层耦合在组件里，用{}标识

因为 JSX 语法上更接近 JS 而不是 HTML，所以使用 camelCase（小驼峰命名）来定义属性的名称；

JSX 里的 class 变成了 [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 tabindex 则变为 [tabIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。

## JSX 支持表达式

支持 JS 表达式，变量，方法名

```javascript
// 变量
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

// 方法
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## JSX 指定属性

```javascript
const element = <img src={user.avatarUrl}></img>;

注意：JSX支持防注入(防止XSS攻击)
const title = response.potentiallyMaliciousInput;  // 此时只是字符串
// 直接使用是安全的： const element = <h1>{title}</h1>;

React 如何预防XSS

// 反射型 XSS

https://xxx.com/search?query=userInput

// 服务器在对此 URL 的响应中回显提供的搜索词：query=123
<p>您搜索的是: 123</p>

// https://xxx.com/search?query=<img src="empty.png" onerror ="alert('xss')">
<p>您搜索的是: <img src="empty.png" onerror ="alert('xss')"></p>
// 如果有用户请求攻击者的 URL ，则攻击者提供的脚本将在用户的浏览器中执行。

  
// 存储型 XSS，存储到目标数据库
// 评论输入，所有访问用户都能看到了
<textarea>
  <img src="empty.png" onerror ="alert('xss')">
</textarea>
  
// 部分源码
for (index = match.index; index < str.length; index++) {
  switch (str.charCodeAt(index)) {
    case 34: // "
      escape = '&quot;';
      break;
    case 38: // &
      escape = '&amp;';
      break;
    case 39: // '
      escape = '&#x27;';
      break;
    case 60: // <
      escape = '&lt;';
      break;
    case 62: // >
      escape = '&gt;';
      break;
    default:
      continue;
  }
}

// 一段恶意代码
<img src="empty.png" onerror ="alert('xss')"> 
//  React 在渲染到浏览器前进行的转义，可以看到对浏览器有特殊含义的字符都被转义了，恶意代码在渲染到 HTML 前都被转成了字符串
&lt;img src=&quot;empty.png&quot; onerror =&quot;alert(&#x27;xss&#x27;)&quot;&gt; 
  
// JSX
const element = (
  <h1 className="greeting">
      Hello, world!
  </h1>
);
  
// 通过 babel 编译后的代码
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
  
// React.createElement() 方法返回的 ReactElement
const element = {
  $$typeof: Symbol('react.element'),
  type: 'h1',
  key: null,
  props: {
    children: 'Hello, world!',
        className: 'greeting'   
  }
  ...
}
 
// 如何模拟一个Children会如何？
const storedData = {
    "ref":null,
    "type":"body",
    "props":{
        "dangerouslySetInnerHTML":{
            "__html":"<img src=\"empty.png\" onerror =\"alert('xss')\"/>"
        }
    }
};
// 转成 JSON
const parsedData = JSON.parse(storedData);
// 将数据渲染到页面
render () {
    return <span> {parsedData} </span>; 
}
  
// $$typeof 是用来标记一个ReactElement的，JSON化后Symbol会丢失，React会报错
```

## JSX 表示对象

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// 等同于React.createElement
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

## 将 JSX 渲染为 DOM

```javascript
// 使用ReactDOM.render
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));

// render只能代表当前时刻的状态
// 更新元素 只能再次 ReactDOM.render
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root')); 
}

setInterval(tick, 1000); // 不建议多次render
```

## JSX 转 JS

JSX 可以当做语法糖，可以在 babel 官网中尝试，[https://babeljs.io/repl](https://babeljs.io/repl)

可以使用官网提供的 create-react-app npm run eject 来看 babelrc 中的配置，主要使用

[https://www.babeljs.cn/docs/babel-preset-react](https://www.babeljs.cn/docs/babel-preset-react)

```javascript
// 安装babel 及react 的依赖
npm install core-js @babel/core @babel/preset-env @babel/preset-react @babel/register babel-loader @babel/plugin-transform-runtime --save-dev

.babelrc
{
    "presets" : [ 
        "@babel/preset-env" ,
        "@babel/preset-es2015",
        "@babel/preset-react"
    ],
    "plugins" : [
        "@babel/plugin-transform-runtime"
    ]
}
```

# props 及 state

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

## 组件

- 函数式组件
- Class 类组件

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 渲染组件

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);

// 自定义组件使用大写字母开头
import React from 'react';

// 正确！组件需要以大写字母开头：
function Hello(props) {
  // 正确！ 这种 <div> 的使用是合法的，因为 div 是一个有效的 HTML 标签：
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // 正确！React 知道 <Hello /> 是一个组件，因为它是大写字母开头的：
  return <Hello toWhat="World" />;
}
```

### 组件的组合与拆分

```javascript
// 页面内多次引用
<div>
  <Welcome name="Sara" />
  <Welcome name="Cahal" />
  <Welcome name="Edite" />
</div>

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

// 拆分后为
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

### 受控组件 与 非受控组件

- 受控组件：对某个组件状态的掌控，它的值是否只能由用户设置，而不能通过代码控制；

在 HTML 的表单元素中，它们通常自己维护一套 state，并随着用户的输入自己进行 UI 上的更新，这种行为是不被我们程序所管控的。而如果将 React 里的 state 属性和表单元素的值建立依赖关系，再通过 onChange 事件与 setState()结合更新 state 属性，就能达到控制用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做受控组件。

```javascript
// input自身维护的状态，外界无法获取数据
class TestComponent extends React.Component {
  render () {
    return <input name="username" />
  }
}

// 可以设置初始值
class TestComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = { username: 'test' };
  }
  render () {
    return <input name="username" value={this.state.username} />
  }
}

// 可以读取并设置初始值
class TestComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "test"
    }
  }
  onChange (e) {
    console.log(e.target.value);
    this.setState({
      username: e.target.value
    })
  }
  render () {
    return <input name="username" value={this.state.username} onChange={(e) => this.onChange(e)} />
  }
```

- 非受控组件：对应的，组件内的状态不由用户控制；

```javascript
// 如果不想关心表单元素的值是如何变化的，只想取值，可以使用ref
import React, { Component } from 'react';

export class UnControll extends Component {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit = (e) => {
    console.log('我们可以获得input内的值为', this.inputRef.current.value);
    e.preventDefault();
  }
  render () {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input defaultValue="lindaidai" ref={this.inputRef} />
        <input type="submit" value="提交" />
      </form>
    )
  }
}
```

## props

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

```javascript
// 错误，要像纯函数一样幂等
function withdraw(account, amount) {
  account.total -= amount;
}
```

## state

```javascript
// 使用props形式
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);

// 如何避免多次React.DOM render？

// 引用生命周期，根组件保留一个
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
1. setState 
构造函数是唯一可以给state赋值的地方
this.setState({comment: 'Hello'});

2. state更新可能是异步的
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});

3. state更新会合并
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

componentDidMount() {
  fetchPosts().then(response => {
    // 相当于{post: response.posts, ...otherState}
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

4. 单向数据流
   state 只在当前的组件里生效，属于组件内的属性，重复实例化相同的组件，内部的内存地址也是不一样的；
   例如 Clock 中计时器都是独立的

// setState 异步
// 异步目的：batch 处理，性能优化

1. 合成事件

```javascript
class App extends Component {
        
        state = { val: 0 }
        
        increment = () => {
                this.setState({ val: this.state.val + 1 })
                console.log(this.state.val) // 输出的是更新前的val --> 0
        }
        
        render() {
                return (
                        <div onClick={this.increment}>
                                {Counter is: ${this.state.val}}
                        </div>
                )
        }
}
```

2. 生命周期

```javascript
class App extends Component {
        
        state = { val: 0 }
        
        componentDidMount() {
                this.setState({ val: this.state.val + 1 })
                console.log(this.state.val) // 输出的还是更新前的值 --> 0
        }
        render() {
                return (
                        <div>
                                {Counter is: ${this.state.val}}
                        </div>
                )
        }
}
```

3. 原生事件

```javascript
class App extends Component {
        
        state = { val: 0 }
        
        changeValue = () => {
                this.setState({ val: this.state.val + 1 })
                console.log(this.state.val) // 输出的是更新后的值 --> 1
        }
        
        componentDidMount() {
                document.body.addEventListener('click', this.changeValue, false)
        }
        
        render() {
                return (
                        <div>
                                {Counter is: ${this.state.val}}
                        </div>
                )
        }
}
```

4. setTimeout (react v16.8.0 版本之前的版本)

```javascript
class App extends Component {
        
        state = { val: 0 }
        
        componentDidMount() {
                setTimeout(_ => {
                        this.setState({ val: this.state.val + 1 })
                        console.log(this.state.val) // 输出更新后的值 --> 1
                }, 0)
        }
        
        render() {
                return (
                        <div>
                                {Counter is: ${this.state.val}}
                        </div>
                )
        }
}
```

5. 批处理

```javascript
class App extends Component {
        
        state = { val: 0 }
        
        batchUpdates = () => {
                this.setState({ val: this.state.val + 1 })
                this.setState({ val: this.state.val + 1 })
                this.setState({ val: this.state.val + 1 })
        }
        
        render() {
                return (
                        <div onClick={this.batchUpdates}>
                                {Counter is ${this.state.val}} // 1
                        </div>
                )
        }
}
```

1. setState 只在合成事件和生命周期中是“异步”的，在原生事件和 setTimeout 中都是同步的;
2. setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的， 只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”， 当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
3. setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

# 生命周期

![](https://qn.huat.xyz/mac/202407211645154.png)

## render

是 class 组件必需的方法

获取最新的 props 和 state

在不修改组件 state 的情况下，每次调用时都返回相同的结果

## constructor

如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。

- 通过给 this.state 赋值对象来初始化内部 state。
- 为事件处理函数绑定实例

```javascript
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

1. 不要调用 setState()
2. 避免将 props 的值复制给 state

```javascript
this.state = { color: props.color }; // wrong
```

## componentDidMount

会在组件挂载后（插入 DOM 树中）立即调用

依赖于 DOM 节点的初始化应该放在这里，如需通过网络请求获取数据；

可以在此生命周期里加 setState，但发生在浏览器更新屏幕之前，会导致性能问题；

有更新在 render 阶段的 constructor 中 init State，但有更新可以在此方法时 setState

## componentDidUpdate

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
会在更新后会被立即调用。首次渲染不会执行此方法。
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：加条件判断，不然死循环
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

如果组件实现了 getSnapshotBeforeUpdate() 生命周期，
则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。

## componentWillUnmount

componentWillUnmount() 会在组件卸载及销毁之前直接调用。例如，清除 timer，取消网络请求；

componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染；

## shouldComponentUpdate

（不常用）

shouldComponentUpdate(nextProps, nextState)

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。

作为性能优化使用，返回 false 可以跳过 re-render

shouldComponentUpdate() 返回 false，不会调用 UNSAFE_componentWillUpdate()，render() 和 componentDidUpdate()。

## getDerivedStateFromProps

（不常用）

是为了取代 componentWillReceiveProps 和 componentWillUpdate 设置的

根据 props 的变化改变 state，它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

- 在使用此生命周期时，要注意把传入的 prop 值和之前传入的 prop 进行比较；
- 因为这个生命周期是静态方法，同时要保持它是纯函数，不要产生副作用；

```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}

Class ColorPicker extends React.Component {
    state = {
        color: '#000000'
    }
    static getDerivedStateFromProps (props, state) {
        if (props.color !== state.color) {
            return {
                color: props.color
            }
        }
        return null
    }
    ... // 选择颜色方法
    render () {
        .... // 显示颜色和选择颜色操作，setState({color: XXX})
    }
}

Class ColorPicker extends React.Component {
    state = {
        color: '#000000',
        prevPropColor: '' // setState 和 forceUpdate也会触发此生命周期，会覆盖
    }
    static getDerivedStateFromProps (props, state) {
        if (props.color !== state.prevPropColor) {
            return {
                color: props.color,
                prevPropColor: props.color
            }
        }
        return null
    }
    ... // 选择颜色方法
    render () {
        .... // 显示颜色和选择颜色操作
    }
}
```

## getSnapshotBeforeUpdate

（不常用）

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用；
此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

## static getDerivedStateFromError

（不常用）

配合 Error boundaries 使用

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state；

## componentDidCatch

（不常用）

componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况；

componentDidCatch(error, info)

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // "组件堆栈" 例子:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## UNSAFE_componentWillMount

（不建议使用）

UNSAFE_componentWillMount() 在挂载之前被调用；

它在 render() 之前调用，因此在此方法中同步调用 setState() 不会生效；

需要的话用 componentDidMount 替代。

## UNSAFE_componentWillReceiveProps

（不建议使用）
UNSAFE_componentWillReceiveProps() 会在已挂载的组件接收新的 props 之前被调用；

如果你需要更新状态以响应 prop 更改（例如，重置它），你可以比较 this.props 和 nextProps 并在此方法中使用 this.setState() 执行 state 转换。

## UNSAFE_componentWillUpdate

（不建议使用）

- 当组件收到新的 props 或 state 时，会在渲染之前调用 UNSAFE_componentWillUpdate()；
- 使用此作为在更新发生之前执行准备更新的机会；
- 初始渲染不会调用此方法；

如果 shouldComponentUpdate() 返回 false，则不会调用 UNSAFE_componentWillUpdate()；

# 事件处理

## 语法格式

1. 在 JSX 元素上添加事件,通过 on*EventType 这种内联方式添加,命名采用小驼峰式(camelCase)的形式,而不是纯小写(原生 HTML 中对 DOM 元素绑定事件,事件类型是小写的)；
2. 无需调用 addEventListener 进行事件监听，也无需考虑兼容性，React 已经封装好了一些的事件类型属性；
3. 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串；
4. 不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault；

```javascript
// DOM
<button onclick="activateLasers()">
  Activate Lasers
</button>

// React
<button onClick={activateLasers}>
  Activate Lasers
</button>

// JS
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

```javascript
// React
一般不需要使用 addEventListener 为已创建的 DOM 元素添加监听器；
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 this，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      // class 的方法默认不会绑定 this。如果没有绑定 this.handleClick 并把它传入了 onClick，
      // this 的值为 undefined。
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

// 为什么要绑定this
function createElement(dom, params) {
  var domObj = document.createElement(dom);
  domObj.onclick = params.onclick;
  domObj.innerHTML = params.conent;
  return domObj
}
```

// createElement 的 onClick 函数是绑定到 domObj 上的，如果 this 不显式绑定，不会绑定到 Toggle 上

// 不显式使用 bind

1. public class fields 语法

```javascript
class LoggingButton extends React.Component {
  // 此语法确保 handleClick 内的 this 已被绑定。
  // 注意: 这是 _实验性_ 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

2. 箭头函数，问题： 每次render都会创建不同的回调函数，如果该回调函数作为props传入子组件，每次子组件都要re-render
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 handleClick 内的 this 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
                        //  <button onClick={this.handleClick().bind(this)}>
        Click me
      </button>
    );
  }
}

3. createReactClass代替
```

## 接收参数

1. 事件对象 e 会被作为第二个参数传递；
2. 通过箭头函数的方式，事件对象必须显式的进行传递；
3. 通过 Function.prototype.bind 的方式，事件对象以及更多的参数将会被隐式的进行传递；

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

# 条件渲染

## if else 渲染

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

## 与运算符 &&

```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);

// 返回false的表达式，会跳过元素，但会返回该表达式
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

## 三元运算符

```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

## 如何阻止组件渲染

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

# 列表

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
// 若没有key，会warning a key should be provided for list items
// key可以帮助react diff，最好不用index作为key，会导致性能变差；
// 如果不指定显式的 key 值，默认使用索引用作为列表项目的 key 值；
```

## key 注意点

key 要保留在 map 的遍历元素上

```javascript
// demo1
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

// demo2
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);

// demo3
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

# create-react-app

官方地址：[https://create-react-app.dev/](https://create-react-app.dev/)

github：[https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)

create-react-app 是一个官方支持的创建 React 单页应用程序的脚手架。它提供了一个零配置的现代化配置设置。

![](https://qn.huat.xyz/mac/202407211646864.webp)

# immutable 及 immer

## immutable

官方地址：[https://immutable-js.com/](https://immutable-js.com/)

解决的问题：

JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。如 `foo={a: 1}; bar=foo; bar.a=2` 你会发现此时 foo.a 也被改成了 2。虽然这样做可以节约内存，但当应用复杂后，这就造成了非常大的隐患，Mutable 带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。

### 什么是 immutable data

- Immutable Data 就是一旦创建，就不能再被更改的数据；
- 对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象；
- Immutable 实现的原理是 Persistent Data Structure（持久化数据结构）：也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

### immutable.js

Facebook 工程师 Lee Byron 花费 3 年时间打造，与 React 同期出现，但没有被默认放到 React 工具集里（React 提供了简化的 Helper）。它内部实现了一套完整的 Persistent Data Structure，还有很多易用的数据类型。像 Collection、List、Map、Set、Record、Seq。有非常全面的 map、filter、groupBy、reduce``find 函数式操作方法。同时 API 也尽量与 Object 或 Array 类似。

```javascript
// 原来的写法
let foo = {a: {b: 1}};
let bar = foo;
bar.a.b = 2;
console.log(foo.a.b);  // 打印 2
console.log(foo === bar);  //  打印 true

// 使用 immutable.js 后
import Immutable from 'immutable';
foo = Immutable.fromJS({a: {b: 1}});
bar = foo.setIn(['a', 'b'], 2);   // 使用 setIn 赋值
console.log(foo.getIn(['a', 'b']));  // 使用 getIn 取值，打印 1
console.log(foo === bar);  //  打印 false
```

### immmutable.js 优点

1. 降低了 mutable 带来的复杂性

```javascript
function touchAndLog(touchFn) {
  let data = { key: 'value' };
  touchFn(data);
  console.log(data.key);
  // 因为不知道touchFn进行了什么操作，所以无法预料，但使用immutable，肯定是value
}
```

1. 节省内存

会尽量复用内存，甚至以前使用的对象也可以再次被复用。没有被引用的对象会被垃圾回收。

```javascript
import { Map} from 'immutable';
let a = Map({
  select: 'users',
  filter: Map({ name: 'Cam' })
})
let b = a.set('select', 'people');

a === b; // false
a.get('filter') === b.get('filter'); // true
```

1. Undo/Redo，Copy/Paste

因为每次数据都是不一样的，所有可以存储在数组里，想回退到哪里就拿出对应数据即可

### immutable.js 缺点

1. 需要学习新的 API
2. 容易与原生对象混淆

虽然 Immutable.js 尽量尝试把 API 设计的原生对象类似，有的时候还是很难区别到底是 Immutable 对象还是原生对象，容易混淆操作。

1. Immutable 中的 Map 和 List 虽对应原生 Object 和 Array，但操作非常不同，比如你要用 map.get('key') 而不是 map.key，array.get(0) 而不是 array[0]。另外 Immutable 每次修改都会返回新对象，也很容易忘记赋值；
2. 当使用外部库的时候，一般需要使用原生对象，也很容易忘记转换。

下面给出一些办法来避免类似问题发生：

1. 使用 TypeScript 这类有静态类型检查的工具；
2. 约定变量命名规则：如所有 Immutable 类型对象以 $$ 开头；
3. 使用 Immutable.fromJS 而不是 Immutable.Map 或 Immutable.List 来创建对象，这样可以避免 Immutable 和原生对象间的混用；

### immutable.is & cursor

- immutable.is

// 两个 immutable 对象可以使用 === 来比较，这样是直接比较内存地址，性能最好。
// 但即使两个对象的值是一样的，也会返回 false：

```javascript
let map1 = Immutable.Map({a:1, b:1, c:1});
let map2 = Immutable.Map({a:1, b:1, c:1});
map1 === map2;             // false

// 为了直接比较对象的值，immutable.js 提供了 Immutable.is 来做『值比较』，结果如下：

Immutable.is(map1, map2);  // true
Immutable.is 
// 比较的是两个对象的 hashCode 或 valueOf（对于 JavaScript 对象）。
// 由于 immutable 内部使用了 Trie 数据结构来存储，只要两个对象的 hashCode 相等，值就是一样的。
// 这样的算法避免了深度遍历比较，性能非常好。
```

- cursor

由于 Immutable 数据一般嵌套非常深，为了便于访问深层数据，Cursor 提供了可以直接访问这个深层数据的引用。

```javascript
import Immutable from 'immutable';
import Cursor from 'immutable/contrib/cursor';

let data = Immutable.fromJS({ a: { b: { c: 1 } } });
// 让 cursor 指向 { c: 1 }
let cursor = Cursor.from(data, ['a', 'b'], newData => {
  // 当 cursor 或其子 cursor 执行 update 时调用
  console.log(newData);
});

cursor.get('c'); // 1
cursor = cursor.update('c', x => x + 1);
cursor.get('c'); // 2
```

### 使用 immutable.js 优化 react

1. React 可以使用 shouldComponentUpdate()进行性能优化，但它默认返回 true，即始终会执行 render() 方法，然后做 Virtual DOM 比较，并得出是否需要做真实 DOM 更新；
2. 可以在 shouldComponentUpdate 周期里执行 deepCopy 和 deepCompare 避免无意义的 render，但 deepFn 也很耗时；

```javascript
import { is } from 'immutable';

shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  const thisProps = this.props || {}, thisState = this.state || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
    if (!is(thisProps[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] && !is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}
```

## immer

官方地址：[https://immerjs.github.io/immer/zh-CN/](https://immerjs.github.io/immer/zh-CN/)

先来看一个问题

```javascript
let currentState = {
  p: {
    x: [2],
  },
}

// 下列哪些currentState被修改了
// Q1
let o1 = currentState;
o1.p = 1;
o1.p.x = 1;

// Q2
fn(currentState);
function fn(o) {
  o.p1 = 1;
  return o;
};

// Q3
let o3 = {
  ...currentState
};
o3.p.x = 1;

// Q4
let o4 = currentState;
o4.p.x.push(1);

// 结果：都被修改了
```

如何解决引用类型对象被修改？

1. 深度拷贝，但是深拷贝的成本较高，会影响性能；
2. [ImmutableJS](https://github.com/facebook/immutable-js)，非常棒的一个不可变数据结构的库，可以解决上面的问题，但跟 Immer 比起来，ImmutableJS 有两个较大的不足：

   1. 需要使用者学习它的数据结构操作方式，没有 Immer 提供的使用原生对象的操作方式简单、易用；
   2. 它的操作结果需要通过 toJS 方法才能得到原生对象，这使得在操作一个对象的时候，时刻要主要操作的是原生对象还是 ImmutableJS 的返回结果，稍不注意，就会产生问题；

// 如何使用 immer 解决上述问题

```javascript
// Q1 Q3
import produce from 'immer';
let o1 = produce(currentState, draft => {
  draft.p.x = 1;
})

// Q2
import produce from 'immer';
fn(currentState);
function fn(o) {
  return produce(o, draft => {
    draft.p1 = 1;
  })
};

// Q4
import produce from 'immer';
let o4 = produce(currentState, draft => {
  draft.p.x.push(1);
})
```

### 概念说明

- currentState：被操作对象的最初状态
- draftState：根据 currentState 生成的草稿状态，它是 currentState 的代理，对 draftState 所做的任何修改都将被记录并用于生成 nextState 。在此过程中，currentState 将不受影响
- nextState：根据 draftState 生成的最终状态
- produce：用来生成 nextState 或 producer 的函数
- producer：通过 produce 生成，用来生产 nextState ，每次执行相同的操作
- recipe：用来操作 draftState 的函数

### produce 的使用

1. produce(currentState, recipe: (draftState) => void | draftState, ?PatchListener): nextState

```javascript
// Q1
let nextState = produce(currentState, (draft) => {

})

currentState === nextState; // true

// Q2
let currentState = {
  a: [],
  p: {
    x: 1
  }
}

let nextState = produce(currentState, (draft) => {
  draft.a.push(2);
})

currentState.a === nextState.a; // false
currentState.p === nextState.p; // true
```

1. 对 draftState 的修改都会反应到 nextState;
2. Immer 使用的结构是共享的，nextState 在结构上又与 currentState 共享未修改的部分；

immer 支持自动冻结：通过 produce 生产的 nextState 是被 Object.freeze 的

```javascript
const currentState = {
  p: {
    x: [2],
  },
};
const nextState = produce(currentState, draftState => {
    draftState.p.x.push(3);
});
console.log(nextState.p.x); // [2, 3]
nextState.p.x = 4;
console.log(nextState.p.x); // [2, 3]
nextState.p.x.push(5); // 报错
```

1. produce(recipe: (draftState) => void | draftState, ?PatchListener)(currentState): nextState

利用高阶函数的特点，提前生成一个 producer

```javascript
let producer = produce((draft) => {
  draft.x = 2
});
let nextState = producer(currentState);
```

### 使用 immer 优化 react

```javascript
// 定义state
state = {
  members: [
    {
      name: 'ronffy',
      age: 30
    }
  ]
}

// 如何给member中第一个元素的age+1

// error
this.state.members[0].age++;

// setState
const { members } = this.state;
this.setState({
  members: [
    {
      ...members[0],
      age: members[0].age + 1,
    },
    ...members.slice(1),
  ]
})

// 使用reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_AGE':
      const { members } = state;
      return {
        ...state,
        members: [
          {
            ...members[0],
            age: members[0].age + 1,
          },
          ...members.slice(1),
        ]
      }
    default:
      return state
  }
}


// 使用immer
this.setState(produce(draft => {
  draft.members[0].age++;
}))

// 使用immer结合reduce
// 注意： produce 内的 recipe 回调函数的第2个参数与obj对象是指向同一块内存
let obj = {};

let producer = produce((draft, arg) => {
  obj === arg; // true
});
let nextState = producer(currentState, obj);

const reducer = (state, action) => produce(state, draft => {
  switch (action.type) {
    case 'ADD_AGE':
      draft.members[0].age++;
  }
})
```
