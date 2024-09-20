## React

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

合成事件是 React 模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器。根据W3C 规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口。

React 事件机制总结如下:

- React 上注册的事件最终会绑定在document这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
- React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。
- React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
- React 有一套自己的合成事件 SyntheticEvent



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



应用场景：权限控制、日志记录、数据校验、异常处理、统计上报等



### 14.说说你在React项目是如何捕获错误的?

```js
import React, { useState, useEffect, useRef } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const errorMessage = useRef(null);

  useEffect(() => {
    const componentDidCatch = (error, errorInfo) => {
      setHasError(true);
      errorMessage.current = { error, errorInfo };
      // 你可以在这里记录错误日志，例如发送到服务器
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    };

    window.addEventListener('error', componentDidCatch);
    window.addEventListener('unhandledrejection', componentDidCatch);

    return () => {
      window.removeEventListener('error', componentDidCatch);
      window.removeEventListener('unhandledrejection', componentDidCatch);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {errorMessage.current && errorMessage.current.error && (
            <summary>{errorMessage.current.error.toString()}</summary>
          )}
          <br />
          {errorMessage.current && errorMessage.current.errorInfo && (
            <div>{errorMessage.current.errorInfo.componentStack}</div>
          )}
        </details>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
```



### 16.说说 React中的setState执行机制

在组件生命周期或React合成事件中，setState是异步

在setTimeout或者原生dom事件中，setState是同步



### 17.说说React render方法的原理? 在什么时候会被触发?

原理：

在 render 中，我们会编写 jsx，jsx 通过 babeL 编译后就会转化成我们熟悉的 js 格式，如下:

<img src="https://qn.huat.xyz/mac/202311030842357.png" alt="image-20231103084247308" style="zoom:50%;" />



在 render 过程中，React 将新调用的 render 函数返回的树与旧版本的树进行比较，这一步是
决定如何更新 DOM 的必要步骤，然后进行 diff 比较，更新 DOM 树





### 19.说说React Jsx转换成真实DOM过程?

其渲染流程如下所示:

- 使用React.createElement或JSX编写React组件，实际上所有的 JSX 代码最后都会转换成React.createElement(...)，Babel帮助我们完成了这个转换的过程。
- createElement函数对key和ref等特殊的props进行处理，并获取defaultProps对默认props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个虚拟DOM对象
- ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM



### 20.说说对Fiber架构的理解?解决了什么问题?

Fiber 把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务;如果没有，挂起当前任务，将时间控制权交给主线程，等主线程不忙的时候在继续执行即可以中断与恢复，恢复后也可以复用之前的中间状态，并给不同的任务赋予不同的优先级，其中每个任务更新单元为React ELement 对应的 Fiber 节点





JavaScript 引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待
如果 JavaScript 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，会导致页面响应度变差，用户可能会感觉到卡顿。

当 React 在渲染组件时，从开始到渲染完成整个过程是一气呵成的，无法中断如果组件较大，那么 js 线程会一直执行，然后等到整棵 VDOM 树计算完成后，才会交给渲染的线程这就会导致一些用户交互、动画等任务无法立即得到处理，导致卡顿的情况。







### 



### 23.说说对React Hooks的理解?解决了什么问题?

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

- shouldComponentUpdate

  通过 shouldComponentUpdate 生命周期函数来比对 state 和 props，确定是否要重新渲染默认情况下返回 true 表示重新渲染，如果不希望组件重新渲染，返回 false 即可

- PureComponent

  跟 shouldComponentUpdate 原理基本一致，通过对 props 和 state 的浅比较结果来实现houldComponentUpdate 

- React.memo

  React,memo 用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似。但不同的是， React.memo 只能用于函数组件


