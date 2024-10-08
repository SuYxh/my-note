## React

### 1、说说你对react的理解？ 有哪些特性

一个构建用户界面的js库



特性：

- jsx语法
- 单向数据流
- 虚拟dom
- hooks



优势

- 高效灵活
- 组件式开发



### 2、state 和 props 有什么区别？

state： 组件自己的状态数据

props： 外部传入组件内部状态数据

相同点：

- 都是js对象
- 都是用于保存信息
- 都能触发渲染更新

不同点：

- props 是外部传入， state 是自己的
- props 不能修改， state 可以修改



### 3、super() 和 super(props)有什么区别？

在 React 中，类组件基于 ES6 ，所以在 constructor 中必须使用 super。在调用 super 过程，无论是否传入props ，React 内部都会将 porps 赋值给组件实例 porps 属性中。如果只调用了 super()，那么 this.props 在super() 和构造函数结束之间仍是 undefined



### 4、说一说对react中类组件和函数组件的理解，有什么区别？

类组件：通过使用 ES6 类的编写形式去编写组件，该类必须继承 React.Compone
如果想要访问父组件传递过来的参数，可通过 this.props 的方式去访问在组件中必须实现 render 方法，在 return 中返回 React 对象

函数组件：通过函数的形式编写react组件

针对两种 React 组件，其区别主要分成以下几大方向

- 编写形式

- 状态管理

  在 hooks 出来之前，函数组件就是无状态组件，不能保管组件的状态，，不像类组件中调用 setState

- 生命周期

  在函数组件中，并不存在生命周期，这是因为这些生命周期钩子都来自于继承的 React.Component所以，如果用到生命周期，就只能使用类组件但是函数组件使用 useEffect 也能够完成替代生命周期的作用

- 调用方式

  如果是一个函数组件，调用则是执行函数即可。

  如果是一个类组件，则需要将组件进行实例化，然后调用实例对象的 render 方法
  
- 获取渲染的值



### 5、说说对受控组件和非受控组件的理解？应用场景？

受控组件，简单来讲，就是受我们控制的组件，组件的状态全程响应外部数据。受控组件我们一般需要初始状态和一个状态更新事件函数

非受控组件：

大部分时候推荐使用受控组件来实现表单，因为在受控组件中，表单数据由 React 组件负责处理如果选择非受控组件的话，控制能力较弱，表单数据就由 DOM 本身处理，但更加方便快捷

![图片](https://qn.huat.xyz/mac/202402080802478.png)









### 6、说说react的事件机制

React 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等
在 React 中这套事件机制被称之为合成事件。



合成事件是 React 模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器。根据W3C 规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口。

从上面可以看到 React 事件和原生事件也非常的相似，但也有一定的区别:

- 事件名称命名方式不同

  ```
  //原生事件绑定方式
  <button onclick="handleClick()">按钮命名</button>
  // React 合成事件绑定方式
  const button = <button onClick=fhandleClick}>按钮命名</button>
  ```
  
- 事件处理函数书写不同

  ```
  //原生事件 事件处理函数写法
  <button onclick="handleCTick()">按钮命名</button>
  
  // React 合成事件 事件处理函数写法
  const button = <button onClick={handleClick}>按钮命名</button>
  ```

虽然 onclick 看似绑定到 DOM 元素上，但实际并不会把事件代理函数直接绑定到真实的节点上，而是把所有的事件绑定到结构的最外层，使用一个统一的事件去监听。这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时只是在这个统一的事件监听器上插入或删除一些对象。当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。



- React 所有事件都挂载在 document 对象上
- 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件
- 所以会先执行原生事件，然后处理 React 事件
- 最后真正执行 document 上挂载的事件



所以想要阻止不同时间段的冒泡行为，对应使用不同的方法，对应如下

阻止合成事件间的冒泡，用e.stopPropagation()

阻止合成事件与最外层 document 上的事件间的冒泡，用e.nativeEvent.stoplmmediatePropagation()

阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免

```js
document.body.addEventListener('click', e => { 
 if (e.target && e.target.matches('div.code')) { 
 	return; 
 } 
 this.setState({ active: false, }); });
}
```





React 事件机制总结如下:

- React 上注册的事件最终会绑定在document这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
- React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。
- React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
- React 有一套自己的合成事件 SyntheticEvent













### 9.说说react中引入css的方式有哪几种? 区别?


通常会遵循以下规则:

- 可以编写局部css，不会随意污染其他组件内的原生;
- 可以编写动态的css，可以获取当前组件的一些状态，根据状态的变化生成不同的css样式
- 支持所有的css特性: 伪类、动画、媒体查询等;
- 编写起来简洁方便、最好符合一贯的css风格特点



在组件内直接使用

```js
import React, { Component } from "react";

const div1 = {
  width: "300px",
  margin: "30px auto",
  backgroundColor: "#44014C",
  minHeight: "200px",
  boxSizing: "border-box"
};

class Test extends Component {
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div style={div1}>123</div>
        <div style={{ backgroundColor: "red" }}></div>
      </div>
    );
  }
}

export default Test;
```



组件中引入 .css 文件

组件中引入 .module.css 文件

CSS in Js



通过上面四种样式的引入，可以看到:

- 在组件内直接使用 css 该方式编写方便，容易能够根据状态修改样式属性，但是大量的演示编写容易导致代码混乱

- 组件中引入 .CSs 文件符合我们日常的编写习惯，但是作用域是全局的，样式之间会层叠

- 引入.module.css 文件能够解决局部作用域问题，但是不方便动态修改样式，需要使用内联的方式进行样式的编写

- 通过css in is 这种方法，可以满足大部分场景的应用，可以类似于预处理器一样样式嵌套、定义修改状态等

  



### 10.说说 React 生命周期有哪些不同阶段? 每个阶段对应的方法是什么

![react生命周期(新).png](https://qn.huat.xyz/mac/202402080823833.awebp)

https://juejin.cn/post/7285540804734468150



### 11.React中组件之间如何通信?

组件传递的方式有很多种，根据传送者和接收者可以分为如下
父组件向子组件传递
子组件向父组件传递
兄弟组件之间的通信
父组件向后代组件传递

React.createContext

非关系组件传递



在 React 中一共有五种通信方式，分别是：**props 和 callback、context（跨层级）、Event 事件、ref传递、状态管理（如：mobx 等）** 方式。



### 12、说说你对高阶组件的理解和应用场景

高阶函数 (Higher-order function)至少满足下列一个条件的函数

- 接受一个或多个函数作为输入

- 输出一个函数

在 React 中，高阶组件即接受一个或多个组件作为参数并且返回一个组件，本质也就是一个函数，并不是一个组件

```
const EnhancedComponent = highOrderComponent(WrappedComponent);
```

上述代码中，该函数接受一个组件 WrappedComponent 作为参数，返回加工过的新组件 EnhancedComponent高阶组件的这种实现方式，本质上是一个装饰者设计模式。

编写模板：

```
import React,{ Component } from'react';

export default (WrappedComponent) => {
  return class EnhancedComponent extends Component {
    render() {
      return <WrappedComponent />;
  }
}
```

通过对传入的原始组件 WrappedComponent 做一些你想要的操作(比如操作 props，提取 state,给原始组件包裹其他元素等)，从而加工出想要的组件 EnhancedComponent

把通用的逻辑放在高阶组件中，对组件实现一致的处理，从而实现代码的复用所以，高阶组件的主要功能是封装并分离组件的通用逻辑，让通用逻辑在组件间更好地被复用但在使用高阶组件的同时，一般遵循一些约定，如下:

- props 保持一致
- 你不能在函数式 (无状态)组件上使用 ref 属性，因为它没有实例
- 不要以任何方式改变原始组件 WrappedComponent
- 透传不相关 props 属性给被包裹的组件 WrappedComponent
- 不要再 render() 方法中使用高阶组件
- 使用 compose 组合高阶组件
- 包装显示名字以便于调试

应用场景
通过上面的了解，高阶组件能够提高代码的复用性和灵活性，在实际应用中，常常用于与核心业务无关但又在多个模块使用的功能，如权限控制、日志记录、数据校验、异常处理、统计上报等



### 13.在react中组件间过渡动画如何实现?

在 react 中，react-transition-group 是一种很好的解决方案，其为元素添加 enter，entexit ,exit-active 这一系列勾子
er-active ,可以帮助我们方便的实现组件的入场和离场动画，其主要提供了三个主要的组件:

CSSTransition: 在前端开发中，结合 CSS 来完成过渡动画效果

SwitchTransition:两个组件显示和隐藏切换时，使用该组件

TransitionGroup:将多个动画组件包裹在其中，，一般用于列表中元素的动画



### 14.说说你在React项目是如何捕获错误的?

为了解决出现的错误导致整个应用崩溃的问题，react16 引用了错误边界新的概念错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级UI ，而并不会渲染那些发生崩溃的子组件树错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误形成错误边界组件的两个条件:
使用了 static getDerivedStateFromError()
使用了 componentDidCatch(
抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI，使用 componentDidCatch() 打印错误信息

<img src="https://qn.huat.xyz/mac/202311030816117.png" alt="image-20231103081643060" style="zoom:50%;" />

```
<ErrorBoundary>
	<MyWidget/>
</ErrorBoundary>
```

下面这些情况无法捕获到异常:
事件处理
异步代码
服务端渲染
自身抛出来的错误

使用 try catch 和  

```
window.addEventListener('error', function () {
  
})
```



### 15.说说对React refs 的理解? 应用场景?

Refs 在计算机中称为弹性文件系统 (英语: Resilient File System，简称ReFS)React 中的 Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
本质为 ReactDOM.render() 返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染 dom 则返回的是具体的 dom 节点



创建 ref 的形式有三种:

- 传入字符串，使用时通过 this.refs.传入的字符串的格式获取对应的元素

  ```js
  import React from "react";
  
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
  
    render() {
      return <div ref={this.myRef} />;
    }
  }
  
  export default MyComponent;
  ```

  

- 传入对象，对象是通过 React.createRef() 方式创建出来，使用时获取到创建的对象中存在current 属性就是对应的元素

  ```js
  import React from "react";
  
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
  
    render() {
      return <div ref={this.myRef} />;
    }
  }
  
  export default MyComponent;
  ```

  

- 传入函数，该函数会在 DOM 被挂载时进行回调，这个函数会传入一个 元素对象，可以自己保存使用时，直接拿到之前保存的元素对象即可

  ```js
  import React from "react";
  
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
  
    render() {
      return <div ref={element => (this.myRef = element)} />;
    }
  }
  
  export default MyComponent;
  ```

  

- 传入hook，hook是通过 useRef()方式创建，使用时通过生成hook对象的 current 属性就是对应的
  元素
  
  ```js
  import React, { useRef } from "react";
  
  function App(props) {
    const myRef = useRef();
    return (
      <>
        <div ref={myRef}></div>
      </>
    );
  }
  
  export default App;
  ```
  
  



在某些情况下，我们会通过使用 refs 来更新组件，但这种方式并不推荐，更多情况我们是通过 props与 state 的方式进行去重新渲染子元素过多使用 refs ，会使组件的实例或者是 DOM 结构暴露，违反组件封装的原则例如，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性但下面的场景使用 refs 非常有用:

- 对Dom元素的焦点控制、内容选择、控制
- 对Dom元素的内容设置及媒体播放
- 对Dom元素的操作和对组件实例的操作
- 集成第三方 DOM 库



### 16.说说 React中的setState执行机制

setState 第一个参数可以是一个对象，或者是一个函数，而第二个参数是一个回调函数，用于可以实时的获取到更新之后的数据

在使用 setState 更新数据的时候，setState 的更新类型分成

异步更新

```
changeText() {
  this.setSate({
    message:"你好啊"
  })
  console.log(this.state.message); // Hello World
}
```

从上面可以看到，最终打印结果为 Hello world ，并不能在执行完 setState 之后立马拿到最新的 state 的结果
如果想要立刻获取更新后的值，在第二个参数的回调中更新后会执行

```
changeText() {
  this.setSate({
    message:"你好啊"
  }, () => {
    console.log(this.state.message); // 你好啊
  })
}
```



同步更新

<img src="https://qn.huat.xyz/mac/202311030831433.png" alt="image-20231103083120390" style="zoom:50%;" />

<img src="https://qn.huat.xyz/mac/202311030831693.png" alt="image-20231103083138664" style="zoom:50%;" />



在组件生命周期或React合成事件中，setState是异步

在setTimeout或者原生dom事件中，setState是同步



批量更新

<img src="https://qn.huat.xyz/mac/202311030834778.png" alt="image-20231103083422734" style="zoom:50%;" />

点击按钮触发事件，打印的都是 1，页面显示 count 的值为 2对同一个值进行多次 setState ，setState的批量更新策略会对其进行覆盖，取最后一次的执行
结果
上述的例子，实际等价于如下:

![image-20231103083523448](https://qn.huat.xyz/mac/202311030835492.png)



由于后面的数据会覆盖前面的更改，所以最终只加了一次如果是下一个 state 依赖前一个 state 的话，推荐给 setState 一个参数传入-个 function ，如下:

<img src="https://qn.huat.xyz/mac/202311030835398.png" alt="image-20231103083550360" style="zoom:50%;" />

而在 setTimeout 或者原生 dom 事件中，由于是同步的操作，所以并不会进行覆盖现象



### 17.说说React render方法的原理? 在什么时候会被触发?

原理：

首先,render 函数在 react 中有两种形式

在类组件中，指的是 render 方法：

```
class Foo extends React.Component {
  render () {
    return <h1>foo</h1>
  }
}
```

在函数组件中，指的是函数组件本身

```
function Foo() {
  return <h1>Foo</h1>
}
```



在 render 中，我们会编写 jsx，jsx 通过 babeL 编译后就会转化成我们熟悉的 js 格式，如下:

<img src="https://qn.huat.xyz/mac/202311030842357.png" alt="image-20231103084247308" style="zoom:50%;" />



在 render 过程中，React 将新调用的 render 函数返回的树与旧版本的树进行比较，这一步是
决定如何更新 DOM 的必要步骤，然后进行 diff 比较，更新 DOM 树



触发时机

render 的执行时机主要分成了两部分

- 类组件调用 setState 修改状态

  <img src="https://qn.huat.xyz/mac/202311030843906.png" alt="image-20231103084356863" style="zoom:50%;" />

点击按钮则调用 setState 方法，无论 count 发生变化辩护，控制台都会输出 Foo render ，证
明 render 执行了

- 函数组件通过 useState hook 修改状态

<img src="https://qn.huat.xyz/mac/202311030845164.png" alt="image-20231103084537123" style="zoom:50%;" />

函数组件通过 useState 这种形式更新数据，当数组的值不发生改变了，就不会触发 render

- 类组件重新渲染

<img src="https://qn.huat.xyz/mac/202311030846385.png" alt="image-20231103084645346" style="zoom:50%;" />

只要点击了 App 组件内的 Change name 按钮，不管 Foo 具体实现是什么，都会被重新 render 渲染

- 函数组件重新渲染

<img src="https://qn.huat.xyz/mac/202311030847120.png" alt="image-20231103084727082" style="zoom:50%;" />

可以发现，使用 useState 来更新状态的时候，只有首次会触发 Foo render ，后面并不会导致 Foo render

render 函数里面可以编写 JSX，转化成 createElement 这种形式，用于生成虚拟 DOM ，最终转化成真实 DOM

在 React 中，类组件只要执行了 setState 方法，就一定会触发render 函数执行，函数组件使用 useState 更改状态不一定导致重新 render

组件的 props 改变了，不一定触发 render 函数的执行，但是如果 props 的值来自于父组件或者祖先组件的 state
在这种情况下，父组件或者祖先组件的 state 发生了改变，就会导致子组件的重新渲染

所以，一旦执行了 setState 就会执行 render 方法， useState 会判断当前值有无发生改变确定是否执行 render 方法，一旦父组件发生渲染，子组件也会渲染



### 18.说说 Real DOM 和 Virtual DOM 的区别? 优缺点?

Real DOM，真实DOM ，意思为文档对象模型，是一个结构化文本的抽象，在页面渲染出的每一个结点都是一个真实DOM 结构

Virtual Dom ，本质上是以 JavaScript 对象形式存在的对DOM 的描述创建虚拟DOM 目的就是为了更好将虚拟的节点渲染到页面视图中，虚拟 DOM 对象的节点与真实 D0M 的属性一一照应

JSX 通过 babel 的方式转化成 React.createElement 执行，返回值是一个
对象，也就是虚拟 DOM



两者的区别如下:

- 虚拟 DOM 不会进行排版与重绘操作，而真实 DOM 会频繁重排与重绘

- 虚拟 DOM 的总损耗是“虚拟 DOM 增删改+真实 DOM 差异增删改+排版与重绘”，真实 DOM 的总损耗是“真实 DOM 完全增删改+排版与重绘”

传统的原生 api 或 jQuery 去操作DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程

当你在一次操作时，需要更新 10 个DOM 节点，浏览器没这么智能，收到第一个更新 DOM 请求后并不知道后续还有 9 次更新操作，因此会马上执行流程，最终执行 10 次流程

而通过 VNode ，同样更新 10 个 DOM 节点，虚拟 DOM 不会立即操作DOM ，而是将这 10 次更新的 diff 内容保存到本地的一个 is 对象中，最终将这个 is 对象一次性attach 到DOM树上，避免大量的无谓计算



优缺点

真实 DOM 的

优势:

- 易用

缺点:

- 效率低，解析速度慢，内存占用量过高
- 性能差: 频繁操作真实 DOM，易于导致重绘与回流



使用虚拟 DOM 的优势如下:

- 简单方便:如果使用手动操作真实DOM 来完成页面，繁琐又容易出错，在大规模应用下维护起来也很困难
- 性能方面:使用 Virtual DOM，能够有效避免真实 DOM 数频繁更新，减少多次引起重绘与回流提高性能
- 跨平台: React 借助虚拟 DOM，带来了跨平台的能力，一套代码多端运行

缺点:

- 在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化
- 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，速度比正常稍慢



### 19.说说React Jsx转换成真实DOM过程?

react 通过将组件编写的 JSX 映射到屏幕，以及组件中的状态发生了变化之后 React 会将这些T变化，更新到屏幕上
在前面文章了解中，JSX 通过 babel 最终转化成 React.createElement 这种形式，形如:

<img src="https://qn.huat.xyz/mac/202311030859410.png" alt="image-20231103085923355" style="zoom:50%;" />

在转化过程中， babeL 在编译时会判断 JSX 中组件的首字母:

- 当首字母为小写时，其被认定为原生 DOM 标签， createElement 的第一个变量被编译为字符串
- 当首字母为大写时，其被认定为自定义组件，createElement 的第一个变量被编译为对象

最终都会通过 RenderDOM.render(..)方法进行挂载，如下:

![image-20231103090040303](https://qn.huat.xyz/mac/202311030900352.png)



其渲染流程如下所示:

- 使用React.createElement或JSX编写React组件，实际上所有的 JSX 代码最后都会转换成React.createElement(...)，Babel帮助我们完成了这个转换的过程。
- createElement函数对key和ref等特殊的props进行处理，并获取defaultProps对默认props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个虚拟DOM对象
- ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM



### 20.说说对Fiber架构的理解?解决了什么问题?



问题

JavaScript 引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待
如果 JavaScript 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，会导致页面响应度变差，用户可能会感觉到卡顿而这也正是 React 15 的 Stack Reconciler 所面临的问题，当 React 在渲染组件时，从开始到渲染完成整个过程是一气呵成的，无法中断如果组件较大，那么 js 线程会一直执行，然后等到整棵 VDOM 树计算完成后，才会交给渲染的线程这就会导致一些用户交互、动画等任务无法立即得到处理，导致卡顿的情况



React Fiber 是 Facebook 花费两年余时间对 React 做出的一个重大改变与优化，是对 React 核心算法的一次重新实现。从Facebook在 React Conf 2017 会议上确认，React Fiber 在React 16 版本发布

在 react 中，主要做了以下的操作:

- 为每个增加了优先级，优先级高的任务可以中断低优先级的任务。然后再重新，注意是重新执行优先级低的任务
- 增加了异步任务，调用requestldleCallback api，浏览器空闲的时候执行
- dom diff树变成了链表，一个dom对应两个fiber (一个链表)》，对应两个队列，这都是为找到被中断的任务，重新执行

从架构角度来看，Fiber 是对 React 核心算法 (即调和过程) 的重写

从编码角度来看，Fiber 是 React 内部所定义的一种数据结构，它是 Fiber 树结构的节点单位，也就是 React 16 新架构下的虚拟 DOM

一个 fiber 就是一个 JavaScript 对象，包含了元素的信息、该元素的更新操作队列、类型。



Fiber 把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务;如果没有，挂起当前任务，将时间控制权交给主线程，等主线程不忙的时候在继续执行即可以中断与恢复，恢复后也可以复用之前的中间状态，并给不同的任务赋予不同的优先级，其中每个任务更新单元为React ELement 对应的 Fiber 节点

实现的上述方式的是 requestIdleCallback 方法

window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应

首先 React 中任务切割为多个步骤，分批完成。在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间再进行页面的渲染。等浏览器忙完之后有剩余时间，再继续之前 React 未完成的任务，是种合作式调度。

该实现过程是基于Fiber 节点实现，作为静态的数据结构来说，每个 Fiber 节点对应一个 React element ，保存了该组件的类型(函数组件/类组件/原生组件等等) 、对应的 DOM 节点等信息作为动态的工作单元来说，每个 Fiber 节点保存了本次更新中该组件改变的状态、要执行的工作每个 Fiber 节点有个对应的 React element ，多个 Fiber 节点根据如下三个属性构建一颗树:

<img src="https://qn.huat.xyz/mac/202311030906328.png" alt="image-20231103090638278" style="zoom:50%;" />

通过这些属性就能找到下一个执行目标



### 21.React中的key有什么作用?

跟 Vue 一样， React 也存在 Diff 算法，而元素 key 属性的作用是用于判断元素是新创建的还是被移动的元素，从而减少不必要的元素渲染

因此 key 的值需要为每一个元素赋予一个确定的标识

如果列表数据渲染中，在数据后面插入一条数据，key 作用并不大。

当插入数据时，拥有 key 的时候， react 根据 key 属性匹配原有树上的子元素以及最新树上的子元素，像上述情况只需要将000元素插入到最前面位置
当没有 key 的时候，所有的 li 标签都需要进行修改

同样，并不是拥有 key 值代表性能越高，如果说只是文本内容改变了，不写 key 反而性能和效率更高

主要是因为不写 key 是将所有的文本内容替换一下，节点不会发生变化

而写 key 则涉及到了节点的增和删，发现旧 key 不存在了，则将其删除，新 key 在之前没有，则插入，这就增加性能的开销



良好使用 key 属性是性能优化的非常关键的一步，注意事项为

- key 应该是唯一的
- key不要使用随机值 (随机数在下一次 render 时，会重新生成一个数字)
- 使用 index作为 key值，对性能没有优化



### 22.说说React diff的原理是什么?



### 23.说说对React Hooks的理解?解决了什么问题?

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

至于为什么引入 hook ，官方给出的动机是解决长时间使用和维护 react 过程中常遇到的问题，例如:

- 难以重用和共享组件中的与状态相关的逻辑
- 逻辑复杂的组件难以开发与维护，当我们的组件需要处理多个互不相关的 local state 时，每个生命周期函数中可能会包含着各种互不相关的逻辑在里面
- 类组件中的this增加学习成本，类组件在基于现有工具的优化上存在些许问题
- 由于业务变动，函数组件不得不改为类组件等等

在以前，函数组件也被称为无状态的组件，只负责渲染的一些工作因此，现在的函数组件也可以是有状态的组件，内部也可以维护自身的状态以及做一些逻辑方面的处理

上面讲到， Hooks 让我们的函数组件拥有了类组件的特性，例如组件内的状态、生命周期
最常见的 hooks 有如下:

- useState

- useEffect

  useEffect 第一个参数接受一个回调函数，默认情况下， useEffect 会在第一次渲染和更新之后都会执行，相当于在 componentDidMount 和 componentDidUpdate 两个生命周期函数中执行回

  所以，useEffect 相当于 componentDidMount，componentDidUpdate 和 componentWiLLUnmount 这三个生命周期函数的组合

- 其他



通过对上面的初步认识，可以看到 hooks 能够更容易解决状态相关的重用的问题

- 每调用useHook一次都会生成一份独立的状态
- 通过自定义hook能够更好的封装我们的功能编写 hooks 为函数式编程，每个功能都包裹在函数中，整体风

更清爽，更优雅hooks 的出现，使函数组件的功能得到了扩充，拥有了类组件相似的功能，在我们日常使用中，使用hooks 能够解决大多数问题，并且还拥有代码复用机制，因此优先考虑 hooks



### 24.说说你是如何提高组件的渲染效率的?在React中如何避免不必要render？

react 基于虚拟DOM 和高效 Diff 算法的完美配合，实现了对 DOM 最小粒度的更新，大多数情况下， React 对 DOM 的渲染效率足以我们的业务日常

复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，避免不必要的渲染则是业务中常见的优化手段之一



在之前文章中，我们了解到 render 的触发时机，简单来讲就是类组件通过调用 setState 方法,就会导致 render ，父组件一旦发生 render 渲染，子组件一定也会执行 render 渲染

从上面可以看到，父组件渲染导致子组件渲染，子组件并没有发生任何改变，这时候就可以从避免无谓的渲染，具体实现的方式有如下:

- shouldComponentUpdate

  通过 shouldComponentUpdate 生命周期函数来比对 state 和 props，确定是否要重新渲染默认情况下返回 true 表示重新渲染，如果不希望组件重新渲染，返回 false 即可

- PureComponent

  跟 shouldComponentUpdate 原理基本一致，通过对 props 和 state 的浅比较结果来实现houldComponentUpdate 

- React.memo

  React,memo 用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似。但不同的是， React.memo 只能用于函数组件



### 25.说说 React 性能优化的手段有哪些?

在React中如何避免不必要的render中，我们了解到如何避免不必要的 render 来应付上面的问题，主要手段是通过shouldComponentUpdatePureComponent、React.memo，这三种形式这里就不再复述，除此之外，常见性能优化常见的手段有如下

- 避免使用内联函数

  如果我们使用内联函数，则每次调用 render 函数时都会创建一个新的函数实例，如下:

  ```js
  import React from "react";
  
  export default class InlineFunctionComponent extends React.Component {
    render() {
      return (
        <div>
          <h1>Welcome Guest</h1>
          <input
            type="button"
            onClick={(e) => {
              this.setState({ inputValue: e.target.value });
            }}
            value="Click For Inline Function"
          />
        </div>
      );
    }
  }
  ```

  

  我们应该在组件内部创建一个函数，并将事件绑定到该函数本身。这样每次调用 render 时就不会创建单独的函数实例，如下:

  ```js
  import React from "react";
  
  export default class InlineFunctionComponent extends React.Component {
    setNewStateData = (event) => {
      this.setState({
        inputValue: event.target.value
      });
    };
  
    render() {
      return (
        <div>
          <h1>Welcome Guest</h1>
          <input
            type="button"
            onClick={this.setNewStateData}
            value="Click For Inline Function"
          />
        </div>
      );
    }
  }
  ```

  

  

- 使用 React Fragments 避免额外标记

- 事件绑定方式

  在事件绑定方式中，我们了解到四种事假绑定的方式

  从性能方面考虑，在 render 方法中使用 bind 和 render 方法中使用箭头函数这两种形式在每次组件 render 的时候都会生成新的方法实例，性能欠缺

  而 constructor 中 bind 事件与定义阶段使用箭头函数绑定这两种形式只会生成一个方法实例，性能方面会有所改善

- 使用 Immutable

  我们了解到使用 Immutable 可以给 React 应用带来性能的优化，主要体现在减少渲染的次数在做 react 性能优化的时候，为了避免重复渲染，我们会在 shouldComponentUpdate()中做对比，当返回 true 执行 render 方法
  Immutable 通过 is 方法则可以完成对比，而无需像一样通过深度比较的方式比较

- 懒加载组件

  从工程方面考虑，webpack 存在代码拆分能力，可以为应用创建多个包，并在运行时动态加载，减少初始包的大小
  而在 react 中使用到了 Suspense 和 lazy 组件实现代码拆分功能，基本使用如下:

  <img src="https://qn.huat.xyz/mac/202311030926670.png" alt="image-20231103092617621" style="zoom:50%;" />

- 服务端渲染



通过上面初步学习，我们了解到 react 常见的性能优化可以分成三个层面:

- 代码层面
- 工程层面
- 框架机制层面

通过这三个层面的优化结合，能够使基于 react 项目的性能更上一层楼



### 26.说说你对React Router的理解?常用的Router组件有哪些?

react-router 等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面路由的本质就是页面的 URL 发生改变时，页面的显示结果可以根据 URL 的变化而变化，但是页面不会刷新，因此，可以通过前端路由可以实现单页(SPA)应用。

react-router 主要分成了几个不同的包:

- react-router: 实现了路由的核心功能
- react-router-dom:  基于 react-router，加入了在浏览器运行环境下的一些功能
- react-router-native: 基于 react-router，加入了 react-native 运行环境下的一些功能
- react-router-config: 用于配置静态路由的工具库



这里主要讲述的是 react-router-dom 的常用 API ，主要是提供了一些组件

- BrowserRouter、HashRouter

  Router 中包含了对路径改变的监听，并且会将相应的路径传递给子组件BrowserRouter 是 history 模式， HashRouter 模式使用两者作为最顶层组件包裹其他组件

- Route

  Route 用于路径的匹配，然后进行组件的渲染，对应的属性如下

  - path 属性: 用于设置匹配到的路径
  - component 属性: 设置匹配到路径后，渲染的组件
  - render 属性: 设置匹配到路径后，渲染的内容
  - exact 属性: 开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件

- Link、NavLink

  通常路径的跳转是使用 Link 组件，最终会被渲染成 a 元素，其中属性 to 代替 a 标题的 href 属签
  NavLink 是在 Link 基础之上增加了一些样式属性，例如组件被选中时，发生样式变化，则可以设置 NavLink 的一下属性:

  - activeStyle:活跃时 (匹配时)的样式
  - activeClassName:活跃时添加的class

如果需要实现 js 实现页面的跳转，那么可以通过下面的形式通过 Route 作为顶层组件包裹其他组件后,页面组件就可以接收到一些路由相关的东西，比如 props.history

![image-20231103104251894](https://qn.huat.xyz/mac/202311031042974.png)

props 中接收到的 history 对象具有一些方便的方法，如 goBack ,goForward , push


- switch

  Swich 组件的作用适用于当匹配到第一个组件的时候，后面的组件就不应该继续匹配

- redirect

  <img src="https://qn.huat.xyz/mac/202311031043333.png" alt="image-20231103104350276" style="zoom:50%;" />

- useHistory 

  useHistory 可以让组件内部直接访问 history ，无须通过 props 获取

- useParams

- useLocation



### 27.说说React Router有几种模式? 实现原理?

在单页应用中，一个 web 项目只有一个 html 页面,一旦页面加载完成之后，就不用因为用户的操作而进行页面的重新加载或者跳转，其特性如下:

- 改变 url 且不让浏览器像服务器发送请求

- 在不刷新页面的前提下动态改变浏览器地址栏中的URL


其中主要分成了两种模式:

- hash 模式:在url后面加上#，如http://127.0.0.1:5500/home/#/page1
- history 模式: 允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录



原理

路由描述了 URL 与UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新 (无需刷新页面)

下面以 hash 模式为例子，改变 hash 值并不会导致浏览器向服务器发送请求，浏览器不发出请求也就不会刷新页面
hash 值改变，触发全局 window 对象上的 hashchange 事件。所以 hash模式路由就是利用 hashchange 事件监听 URL 的变化，从而进行 DOM 操作来模拟页面跳转

react-router 也是基于这个特性实现路由的跳转



### 28.你在React项目中是如何使用Redux的?项目结构是如何划分的?



### 29.说说对Redux中间件的理解?常用的中间件有哪些?实现原理?

中间件 (Middleware)是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务(功能)，衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的

那么如果需要支持异步操作，或者支持错误处理、日志监控，这个过程就可以用上中间件

Redux 中，中间件就是放在就是在 dispatch 过程，在分发 action 进行拦截处理，如下图:

<img src="https://qn.huat.xyz/mac/202311031054981.png" alt="image-20231103105403934" style="zoom:50%;" />


其本质上一个函数，对 store.dispatch 方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能



### 30.说说你对immutable的理解?如何应用在react项目中?

Immutable，不可改变的，在计算机中，即指一旦创建，就不能再被更改的数据对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象

Immutable 实现的原理是 Persistent Data Structure(持久化数据结构) :

- 用一种数据结构来保存数据
- 当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造
  成浪费

也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变，同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗， Immutable 使用了 Structural Sharing (结构共享)

如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享如下图所示:

<img src="https://qn.huat.xyz/mac/202311031055151.png" alt="image-20231103105557097" style="zoom:50%;" />
