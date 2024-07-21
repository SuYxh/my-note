# 高阶组件用法及封装

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

简单点说，就是组件作为参数，返回值也是组件的函数，它是纯函数，不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

## 使用 HOC 的原因

1. 抽取重复代码，实现组件复用：相同功能组件复用
2. 条件渲染，控制组件的渲染逻辑（渲染劫持）：权限控制。
3. 捕获/劫持被处理组件的生命周期，常见场景：组件渲染性能追踪、日志打点。

## HOC 实现方式

### 属性代理

使用组合的方式，将组件包装在容器上，依赖父子组件的生命周期关系来；

1. 返回 stateless 的函数组件
2. 返回 class 组件

- 操作 props

```javascript
// 可以通过属性代理，拦截父组件传递过来的porps并进行处理。

// 返回一个无状态的函数组件
function HOC(WrappedComponent) {
  const newProps = { type: 'HOC' };
  return props => <WrappedComponent {...props} {...newProps}/>;
}

// 返回一个有状态的 class 组件
function HOC(WrappedComponent) {
  return class extends React.Component {
    render() {
      const newProps = { type: 'HOC' };
      return <WrappedComponent {...this.props} {...newProps}/>;
    }
  };
}
```

- 抽象 state

```javascript
// 通过属性代理无法直接操作原组件的state，可以通过props和cb抽象state
function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
      this.onChange = this.onChange.bind(this);
    }
    
    onChange = (event) => {
      this.setState({
        name: event.target.value,
      })
    }
    
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onChange,
        },
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

// 使用
@HOC
class Example extends Component {
  render() {
    return <input name="name" {...this.props.name} />;
  }
}
```

- 通过 props 实现条件渲染

```javascript
// 通过props来控制是否渲染及传入数据
import * as React from 'react';

function HOC (WrappedComponent) {
  return (props) => (
  <div>
    {
      props.isShow ? (
        <WrappedComponent
          {...props}
        />
      ) : <div>暂无数据</div>
    }
  </div>
  );
}

export default HOC;
```

- 其他元素 wrapper 传入的组件

```javascript
function withBackgroundColor(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <div style={{ backgroundColor: '#ccc' }}>
            <WrappedComponent {...this.props} {...newProps} />
        </div>
      );
    }
  };
}
```

### 反向继承

使用一个函数接受一个组件作为参数传入，并返回一个继承了该传入组件的类组件，且在返回组件的 render() 方法中返回 super.render() 方法

```javascript
const HOC = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
}
```

1. 允许 HOC 通过 this 访问到原组件，可以直接读取和操作原组件的 state/ref 等；
2. 可以通过 super.render()获取传入组件的 render，可以有选择的渲染劫持；
3. 劫持原组件生命周期方法

```javascript
function HOC(WrappedComponent){
  const didMount = WrappedComponent.prototype.componentDidMount;
  
  // 继承了传入组件
  return class HOC extends WrappedComponent {
    async componentDidMount(){
      // 劫持 WrappedComponent 组件的生命周期
      if (didMount) {
        await didMount.apply(this);
      }
      ...
    }

    render(){
      //使用 super 调用传入组件的 render 方法
      return super.render();
    }
  }
}
```

- 读取/操作原组件的 state

```javascript
function HOC(WrappedComponent){
  const didMount = WrappedComponent.prototype.componentDidMount;
  // 继承了传入组件
  return class HOC extends WrappedComponent {
    async componentDidMount(){
      if (didMount) {
        await didMount.apply(this);
      }
      // 将 state 中的 number 值修改成 2
      this.setState({ number: 2 });
    }

    render(){
      //使用 super 调用传入组件的 render 方法
      return super.render();
    }
  }
}
```

- 条件渲染

```javascript
const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      if (this.props.isRender) {
        return super.render();
      } else {
        return <div>暂无数据</div>;
      }
    }
  }
```

- 修改 react 树

```javascript
// 修改返回render结果
function HigherOrderComponent(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      const tree = super.render();
      const newProps = {};
      if (tree && tree.type === 'input') {
        newProps.value = 'something here';
      }
      const props = {
        ...tree.props,
        ...newProps,
      };
      const newTree = React.cloneElement(tree, props, tree.props.children);
      return newTree;
    }
  };
}
```

## 属性代理和反向继承对比

1. 属性代理：从“组合”角度出发，有利于从外部操作 wrappedComp，可以操作 props，或者在 wrappedComp 外加一些拦截器（如条件渲染等）；
2. 反向继承：从“继承”角度出发，从内部操作 wrappedComp，可以操作组件内部的 state，生命周期和 render 等，功能能加强大；

## 举个栗子

- 页面复用（属性代理）

```javascript
// views/PageA.js
import React from 'react';
import fetchMovieListByType from '../lib/utils';
import MovieList from '../components/MovieList';

class PageA extends React.Component {
  state = {
    movieList: [],
  }
  /* ... */
  async componentDidMount() {
    const movieList = await fetchMovieListByType('comedy');
    this.setState({
      movieList,
    });
  }
  
  render() {
    return <MovieList data={this.state.movieList} emptyTips="暂无喜剧"/>
  }
}
export default PageA;


// views/PageB.js
import React from 'react';
import fetchMovieListByType from '../lib/utils';
import MovieList from '../components/MovieList';

class PageB extends React.Component {
  state = {
    movieList: [],
  }
  // ...
  async componentDidMount() {
    const movieList = await fetchMovieListByType('action');
    this.setState({
      movieList,
    });
  }
  render() {
    return <MovieList data={this.state.movieList} emptyTips="暂无动作片"/>
  }
}
export default PageB;


// 冗余代码过多
// HOC
import React from 'react';

const withFetchingHOC = (WrappedComponent, fetchingMethod, defaultProps) => {
  return class extends React.Component {
    async componentDidMount() {
      const data = await fetchingMethod();
      this.setState({
        data,
      });
    }
    
    render() {
      return (
        <WrappedComponent 
          data={this.state.data} 
          {...defaultProps} 
          {...this.props} 
        />
      );
    }
  }
}

// 使用：
// views/PageA.js
import React from 'react';
import withFetchingHOC from '../hoc/withFetchingHOC';
import fetchMovieListByType from '../lib/utils';
import MovieList from '../components/MovieList';

const defaultProps = {emptyTips: '暂无喜剧'}

export default withFetchingHOC(MovieList, fetchMovieListByType('comedy'), defaultProps);

// views/PageB.js
import React from 'react';
import withFetchingHOC from '../hoc/withFetchingHOC';
import fetchMovieListByType from '../lib/utils';
import MovieList from '../components/MovieList';

const defaultProps = {emptyTips: '暂无动作片'}

export default withFetchingHOC(MovieList, fetchMovieListByType('action'), defaultProps);;

// views/PageOthers.js
import React from 'react';
import withFetchingHOC from '../hoc/withFetchingHOC';
import fetchMovieListByType from '../lib/utils';
import MovieList from '../components/MovieList';
const defaultProps = {...}
export default withFetchingHOC(MovieList, fetchMovieListByType('some-other-type'), defaultProps);
```

更符合 里氏代换原则(Liskov Substitution Principle LSP)，任何基类可以出现的地方，子类一定可以出现。LSP 是继承复用的基石，只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为

- 权限控制（属性代理）

```javascript
import React from 'react';
import { whiteListAuth } from '../lib/utils'; // 鉴权方法

function AuthWrapper(WrappedComponent) {
  return class AuthWrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        permissionDenied: -1,
      };
    }
    
    async componentDidMount() {
      try {
        await whiteListAuth(); // 请求鉴权接口
        this.setState({
          permissionDenied: 0,
        });
      } catch (err) {
        this.setState({
          permissionDenied: 1,
        });
      }
    }
    
    render() {
      if (this.state.permissionDenied === -1) {
        return null; // 鉴权接口请求未完成
      }
      if (this.state.permissionDenied) {
        return <div>功能即将上线，敬请期待~</div>;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default AuthWrapper;
```

- 组件渲染性能(反向继承)

如何计算一个组件 render 期间的渲染耗时？

```javascript
import React from 'react';
// Home 组件
class Home extends React.Component {
  render () {
    return (<h1>Hello World.</h1>);
  }
}

// HOC
function withTiming (WrappedComponent) {
  let start, end;

  return class extends WrappedComponent {
    constructor (props) {
      super(props);
      start = 0;
      end = 0;
    }
    componentWillMount () {
      if (super.componentWillMount) {
        super.componentWillMount();
      }
      start = +Date.now();
    }
    componentDidMount () {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
      end = +Date.now();
      console.error(`${WrappedComponent.name} 组件渲染时间为 ${end - start} ms`);
    }
    render () {
      return super.render();
    }
  };
}

export default withTiming(Home);
```

# Hooks 详解

Hooks 是 react16.8 以后新增的钩子 API；

目的：增加代码的可复用性，逻辑性，弥补无状态组件没有生命周期，没有数据管理状态 state 的缺陷。

为什么要使用 Hooks？

1. 开发友好，可扩展性强，抽离公共的方法或组件，Hook 使你在无需修改组件结构的情况下复用状态逻辑；
2. 函数式编程，将组件中相互关联的部分根据业务逻辑拆分成更小的函数；
3. class 更多作为语法糖，没有稳定的提案，且在开发过程中会出现不必要的优化点，Hooks 无需学习复杂的函数式或响应式编程技术；

官网 react hooks 介绍：[https://zh-hans.reactjs.org/docs/hooks-intro.html](https://zh-hans.reactjs.org/docs/hooks-intro.html)

## 常见 Hooks

### useState

```javascript
const [number, setNumber] = useState(0);
```

1. setState 支持 stateless 组件有自己的 state；
2. 入参：具体值或一个函数；
3. 返回值：数组，第一项是 state 值，第二项负责派发数据更新，组件渲染；

注意：setState 会让组件重新执行，所以一般需要配合 useMemo 或 useCallback；

```javascript
const DemoState = (props) => {
   /* number为此时state读取值 ，setNumber为派发更新的函数 /
   const [number, setNumber] = useState(0) / 0为初始值 /
   return (
     <div>
       <span>{ number }</span>
       <button onClick={ ()=> {
         setNumber(number + 1)
         console.log(number) / 这里的number是不能够即使改变的，返回0  /
         }}
        />
     </div>
    )
}
// 当更新函数之后，state的值是不能即时改变的，只有当下一次上下文执行的时候，state值才随之改变

——————————————————————————————————————————

const a =1 
const DemoState = (props) => {
   /  useState 第一个参数如果是函数 则处理复杂的逻辑，返回值为初始值 /
   let [number, setNumber] = useState(()=>{
      // number
      return a === 1 ? 1 : 2
   }) / 1为初始值 */
   return (<div>
       <span>{ number }</span>
       <button onClick={ ()=>setNumber(number+1) } ></button>
   </div>)
}
```

### useEffect

1. 使用条件：当组件 init、dom render 完成、操纵 dom、请求数据（如 componentDidMount）等；
2. 不限制条件，组件每次更新都会触发 useEffect --> componentDidUpdate 与 componentwillreceiveprops；
3. useEffect 第一个参数为处理事件，第二个参数接收数组，为限定条件，当数组变化时触发事件，为[]只在组件初始化时触发；
4. useEffect 第一个参数有返回时，一般用来消除副作用（如去除定时器、事件绑定等）；

```javascript
/* 模拟数据交互 */
function getUserInfo(a)
  return new Promise((resolve)=>{
    setTimeout(()=>{ 
       resolve({
           name:a,
           age:16,
       }) 
    },500)
  })
}

const Demo = ({ a }) => {
  const [ userMessage , setUserMessage ] = useState({})
  const [number, setNumber] = useState(0)
  
  const div= useRef()
  
  const handleResize =()=>{}

  useEffect(()=>{
     getUserInfo(a).then(res=>{
         setUserMessage(res)
     })
     console.log(div.current) / div /
      window.addEventListener('resize', handleResize)
  / 
     只有当props->a和state->number改变的时候 ,useEffect副作用函数重新执行 ，
     如果此时数组为空[]，证明函数只有在初始化的时候执行一次相当于componentDidMount
  /
  },[ a ,number ])

  return (<div ref={div} >
      <span>{ userMessage.name }</span>
      <span>{ userMessage.age }</span>
      <div onClick={ ()=> setNumber(1) } >{ number }</div>
  </div>)
}


————————————————————————————————————————————————
const Demo = ({ a }) => {
    const handleResize =()=>{}
    useEffect(()=>{
       const timer = setInterval(()=>console.log(666),1000)
       window.addEventListener('resize', handleResize)
      
       / 此函数用于清除副作用 */
       return function(){
           clearInterval(timer) 
           window.removeEventListener('resize', handleResize)
       }
    },[ a ])
    return (<div></div>)
}
```

注意：useEffect 无法直接使用 async await，

```javascript
// Bad
useEffect(async ()=>{
  /* 请求数据 */
  const res = await getUserInfo(payload)
},[ a ,number ])
————————————————————————————————————————————————

useEffect(() => {
  // declare the async data fetching function
  const fetchData = async () => {
    const data = await fetch('https://xxx.com');
    const json = await data.json();
    return json;
  }

  // call the function
  const result = fetchData()
    .catch(console.error);

  // ❌ 无效
  setData(result);
}, [])

// 改进版
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch('https://xxx.com');
    const json = await response.json();

    setData(json);
  }

  // call the function
  fetchData()
    // make sure to catch any error
    .catch(console.error);;
}, [])
```

### useLayoutEffect

渲染更新之前的 useEffect

useEffect： 组件更新挂载完成 -> 浏览器 dom 绘制完成 -> 执行 useEffect 回调 ；

useLayoutEffect ： 组件更新挂载完成 -> 执行 useLayoutEffect 回调-> 浏览器 dom 绘制完成；

渲染组件

1. useEffect：闪动；
2. useLayoutEffect：卡顿；

```javascript
const DemoUseLayoutEffect = () => {
  const target = useRef()
  useLayoutEffect(() => {
      /*我们需要在dom绘制之前，移动dom到制定位置*/
      const { x ,y } = getPositon() /* 获取要移动的 x,y坐标 */
      animate(target.current,{ x,y })
  }, []);
  return (
    <div >
      <span ref={ target } className="animate"></span>
    </div>
  )
}
```

### useRef

用来获取元素、缓存数据；

入参可以作为初始值

```javascript
// 获取元素
const DemoUseRef = ()=>{
  const dom= useRef(null)
  const handerSubmit = ()=>{
    /*  <div >表单组件</div>  dom 节点 */
    console.log(dom.current)
  }
  return <div>
    <div ref={dom} >表单组件</div>
    <button onClick={()=>handerSubmit()} >提交</button> 
  </div>
}

// 缓存数据，小技巧
// 不同于useState，useRef改变值不会使comp re-render
const currenRef = useRef(InitialData)
currenRef.current = newValue
```

### useContext

用来获取父级组件传递过来的 context 值，这个当前值就是最近的父级组件 Provider 的 value；

从 parent comp 获取 ctx 方式；

1. useContext(Context)；
2. Context.Consumer；

```javascript
/* 用useContext方式 /
const DemoContext = ()=> {
  const value = useContext(Context);
  / my name is aaa /
  return <div> my name is { value.name }</div>
}

/ 用Context.Consumer 方式 /
const DemoContext1 = ()=>{
  return <Context.Consumer>
    {/  my name is aaa  */}
    { (value)=> <div> my name is { value.name }</div> }
  </Context.Consumer>
}

export default ()=>{
  return <div>
    <Context.Provider value={{ name:'aaa' }} >
      <DemoContext />
      <DemoContext1 />
    </Context.Provider>
  </div>
}
```

### useReducer

入参：

1. 第一个为函数，可以视为 reducer，包括 state 和 action，返回值为根据 action 的不同而改变后的 state；
2. 第二个为 state 的初始值；

出参：

1. 第一个更新后的 state 值；
2. 第二个是派发更新的 dispatch 函数；执行 dispatch 会导致组件 re-render；（另一个是 useState）

```javascript
const DemoUseReducer = ()=>{
  /* number为更新后的state值,  dispatchNumbner 为当前的派发函数 /
  const [ number , dispatchNumbner ] = useReducer((state, action) => {
    const { payload , name  } = action
    / return的值为新的state /
    switch(name) {
     case 'a':
         return state + 1
     case 'b':
         return state - 1 
     case 'c':
       return payload       
    }
    return state
   }, 0)
   return <div>
      当前值：{ number }
      { / 派发更新 / }
      <button onClick={()=>dispatchNumbner({ name: 'a' })} >增加</button>
      <button onClick={()=>dispatchNumbner({ name: 'b' })} >减少</button>
      <button onClick={()=>dispatchNumbner({ name: 'c' , payload:666 })} >赋值</button>
      { / 把dispatch 和 state 传递给子组件  */ }
      <MyChildren  dispatch={ dispatchNumbner } State={{ number }} />
   </div>
}
```

业务中经常将 useReducer+useContext 代替 Redux

### useMemo

用来根据 useMemo 的第二个参数 deps（数组）判定是否满足当前的限定条件来决定是否执行第一个 cb；

```javascript
// selectList 不更新时，不会重新渲染，减少不必要的循环渲染
useMemo(() => (
  <div>{
    selectList.map((i, v) => (
      <span
        className={style.listSpan}
        key={v} >
        {i.patentName} 
      </span>
    ))}
  </div>
), [selectList])

————————————————————————————————————————————————————
// listshow, cacheSelectList 不更新时，不会重新渲染子组件
useMemo(() => (
  <Modal
    width={'70%'}
    visible={listshow}
    footer={[
      <Button key="back" >取消</Button>,
      <Button
          key="submit"
          type="primary"
       >
          确定
      </Button>
    ]}
  > 
    { /* 减少了PatentTable组件的渲染 / }
    <PatentTable
      getList={getList}
      selectList={selectList}
      cacheSelectList={cacheSelectList}
      setCacheSelectList={setCacheSelectList}
    />
  </Modal>
 ), [listshow, cacheSelectList])
 ————————————————————————————————————————————————————
 
 // 减少组件更新导致函数重新声明
 const DemoUseMemo = () => {
  / 用useMemo 包裹之后的log函数可以避免了每次组件更新再重新声明 ，可以限制上下文的执行 /
  const newLog = useMemo(() => {
    const log = () => {
      console.log(123)
    }
    return log
  }, [])
  return <div onClick={()=> newLog() } ></div>
}

————————————————————————————————————————————————————
// 如果没有加相关的更新条件，是获取不到更新之后的state的值的
const DemoUseMemo = () => {
  const [ number ,setNumber ] = useState(0)
  const newLog = useMemo(() => {
    const log = () => {
      / 点击span之后 打印出来的number 不是实时更新的number值 /
      console.log(number)
    }
    return log
    / [] 没有 number */  
  }, [])
  return <div>
    <div onClick={() => newLog()} >打印</div>
    <span onClick={ () => setNumber( number + 1 )  } >增加</span>
  </div>
}
```

### useCallback

useMemo 返回 cb 的运行结果；

useCallback 返回 cb 的函数；

```javascript
import React, { useState, useCallback } from 'react'

function Button(props) {
  const { handleClick, children } = props;
  console.log('Button -> render');
  return (
      <button onClick={handleClick}>{children}</button>
  )
}

const MemoizedButton = React.memo(Button);

export default function Index() {
  const [clickCount, increaseCount] = useState(0);

  const handleClick = () => {
      console.log('handleClick');
      increaseCount(clickCount + 1);
  }
  return (
      <div>
          <p>{clickCount}</p>
          <MemoizedButton handleClick={handleClick}>Click</MemoizedButton>
      </div>
  )
}

// MemoizedButton还是重新渲染了
// Index组件state发生变化，导致组件重新渲染；
// 每次渲染导致重新创建内部函数handleClick ，
// 进而导致子组件Button也重新渲染。

import React, { useState, useCallback } from 'react'

function Button(props) {
  const { handleClick, children } = props;
  console.log('Button -> render');
  return (
      <button onClick={handleClick}>{children}</button>
  )
}

const MemoizedButton = React.memo(Button);

export default function Index() {
  const [clickCount, increaseCount] = useState(0);
  // 这里使用了`useCallback`
  const handleClick = useCallback(() => {
      console.log('handleClick');
      increaseCount(clickCount + 1);
  }, [])

  return (
      <div>
          <p>{clickCount}</p>
          <MemoizedButton handleClick={handleClick}>Click</MemoizedButton>
      </div>
  )
}
```

## Hooks 实战

### 所有依赖都必须放在依赖数组中么？

useEffect 中，默认有个共识： useEffect 中使用到外部变量，都应该放到第二个数组参数中。

```javascript
// 当props.count 和 count 变化时，上报数据
function Demo(props) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [a, setA] = useState('');
  
  useEffect(() => {
    monitor(props.count, count, text, a);
  }, [props.count, count]);
  
  return (
    <div>
      <button
        onClick={() => setCount(count => count + 1)}
      >
        click
      </button>
      <input value={text} onChange={e => setText(e.target.value)} />
      <input value={a} onChange={e => setA(e.target.value)} />
    </div>
  )
}
```

此时，text 和 a 变量没有放在 dps 数组中

![](https://qn.huat.xyz/mac/202407211649661.png)

如果把 text 和 a 也引入 deps 中，当 text 和 a 改变时，也触发了函数执行

Solution：

1. 不要使用 eslint-plugin-react-hooks 插件，或者可以选择性忽略该插件的警告；
2. 只有一种情况，需要把变量放到 deps 数组中，那就是当该变量变化时，需要触发 useEffect 函数执行。而不是因为 useEffect 中用到了这个变量！

### 尽量不要用 useCallback

1. useCallback 大部分场景没有提升性能
2. useCallback 让代码可读性变差

```javascript
Example 1
const someFunc = useCallback(()=> {
   doSomething();
}, []);
return <ExpensiveComponent func={someFunc} />

const ExpensiveComponent = ({ func }) => {
  return (
    <div onClick={func}>
     hello
    </div>
  )
}

// 必须用React.memo wrapper 住子组件，才能避免在参数不变的情况下，不重复渲染
// 所以一般项目中不建议使用useCallback
const ExpensiveComponent = React.memo(({ func }) => {
  return (
    <div onClick={func}>
     hello
    </div>
  )
}

// Example 2
const someFuncA = useCallback((d, g, x, y)=> {
   doSomething(a, b, c, d, g, x, y);
}, [a, b, c]);

const someFuncB = useCallback(()=> {
   someFuncA(d, g, x, y);
}, [someFuncA, d, g, x, y]);

useEffect(()=>{
  someFuncB();
}, [someFuncB]);

// 依赖层层传递，最终要找到哪些出发了useEffect执行，所以直接引用就好
const someFuncA = (d, g, x, y)=> {
   doSomething(a, b, c, d, g, x, y);
};

const someFuncB = ()=> {
   someFuncA(d, g, x, y);
};

useEffect(()=>{
  someFuncB();
}, [...]);
```

### useMemo 建议适当使用

在 deps 不变，且非简单的基础类型运算的情况下建议使用

```javascript
// 没有使用 useMemo
const memoizedValue = computeExpensiveValue(a, b);
// 使用 useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// 如果没有使用 useMemo，computeExpensiveValue 会在每一次渲染的时候执行;
// 如果使用了 useMemo，只有在 a 和 b 变化时，才会执行一次 computeExpensiveValue。

const a = 1;
const b = 2;
const c = useMemo(()=> a + b, [a, b]);
const c = a + b; // 内存消耗少
```

### useState 的正确使用姿势

1. 能用其他状态计算出来就不用单独声明状态。一个 state 必须不能通过其它 state/props 直接计算出来，否则就不用定义 state
2. 保证数据源唯一，在项目中同一个数据，保证只存储在一个地方
3. useState 适当合并

```javascript
// Example 1
const SomeComponent = (props) => {
  const [source, setSource] = useState([
      {type: 'done', value: 1},
      {type: 'doing', value: 2},
  ])
  const [doneSource, setDoneSource] = useState([])
  const [doingSource, setDoingSource] = useState([])
  useEffect(() => {
    setDoingSource(source.filter(item => item.type === 'doing'))
    setDoneSource(source.filter(item => item.type === 'done'))
  }, [source])
  return (
    <div>
       .....
    </div>
  )
}

const SomeComponent = (props) => {
  const [source, setSource] = useState([
      {type: 'done', value: 1},
      {type: 'doing', value: 2},
    ])
  const doneSource = useMemo(()=> source.filter(item => item.type === 'done'), [source]);
  const doingSource = useMemo(()=> source.filter(item => item.type === 'doing'), [source]);
  return (
    <div>
       .....
    </div>
  )
}

// 避免props层层传递，在CR中很难看清楚

// Example 2
function SearchBox({ data }) {
  const [searchKey, setSearchKey] = useState(getQuery('key'));
  
  const handleSearchChange = e => {
    const key = e.target.value;
    setSearchKey(key);
    history.push(`/movie-list?key=${key}`);
  }
  
  return (
    <input
      value={searchKey}
      placeholder="Search..."
      onChange={handleSearchChange}
    />
  );
}

function SearchBox({ data }) {
  const searchKey = parse(localtion.search)?.key;
  
  const handleSearchChange = e => {
    const key = e.target.value;
    history.push(`/movie-list?key=${key}`);
  }
  
  return (
    <input
      value={searchKey}
      placeholder="Search..."
      onChange={handleSearchChange}
    />
  );
}

// url params 和 state重复了

// Example 3
const [firstName, setFirstName] = useState();
const [lastName, setLastName] = useState();
const [school, setSchool] = useState();
const [age, setAge] = useState();
const [address, setAddress] = useState();
const [weather, setWeather] = useState();
const [room, setRoom] = useState();

const [userInfo, setUserInfo] = useState({
  firstName,
  lastName,
  school,
  age,
  address
});
const [weather, setWeather] = useState();
const [room, setRoom] = useState();

// 更新一个时
setUserInfo(s=> ({
  ...s,
  fristName,
}))
```

## 自定义 Hooks

注意：自定义 Hooks 本质上还是实现一个函数，关键在于实现逻辑

一般实现效果如：

```javascript
const [ a[, b, c...] ] = useXXX(arg1[, arg2, ...])
```

### setTitle hook

```javascript
import { useEffect } from 'react'

const useTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [])

  return
}

export default useTitle

const App = () => {
  useTitle('new title')
  return <div>home</div>
}
```

### update hook

```javascript
import { useState } from 'react'

const useUpdate = () => {
  const [, setFlag] = useState()
  const update = () => {
    setFlag(Date.now())
  }
  return update
}

export default useUpdate

// 实际使用
const App = (props) => {
  // ...
  const update = useUpdate()
  return <div>
    {Date.now()}
    <div><button onClick={update}>update</button></div>
  </div>
}
```

### useScroll hooks

```javascript
import { useState, useEffect } from 'react'

const useScroll = (scrollRef) => {
  const [pos, setPos] = useState([0,0])

  useEffect(() => {
    function handleScroll(e){
      setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
    }
    scrollRef.current.addEventListener('scroll', handleScroll)
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return pos
}

export default useScroll

// 用法
import React, { useRef } from 'react'
import { useScroll } from 'hooks'

const Home = (props) => {
  const scrollRef = useRef(null)
  const [x, y] = useScroll(scrollRef)

  return <div>
      <div ref={scrollRef}>
        <div className="innerBox"></div>
      </div>
      <div>{ x }, { y }</div>
    </div>
}
```

## Hooks VS HOC

1. Hook 最典型的就是取代掉生命周期中大多数的功能，可以把更相关的逻辑放在一起，而非零散在各个生命周期方法中；
2. 高阶组件可以将外部的属性功能到一个基础 Component 中，更多作为扩展能力的插件（如 react-swipeable-views 中的 autoPlay 高阶组件，通过注入状态化的 props 的方式对组件进行功能扩展，而不是直接将代码写在主库中）；
3. Hook 的写法可以让代码更加紧凑，更适合做 Controller 或者需要内聚的相关逻辑，一般与目标组件内强依赖，HOC 更强调对原先组件能力的扩展；
4. 目前 Hook 还处于相对早期阶段（React 16.8.0 才正式发布 Hook 稳定版本），一些第三方的库可能还暂时无法兼容 Hook；

# 异步组件

随着项目的增长，代码包也会随之增长，尤其是在引入第三方的库的情况下，要避免因体积过大导致加载时间过长。

React16.6 中，引入了 React.lazy 和 React.Suspense 两个 API，再配合动态 import() 语法就可以实现组件代码打包分割和异步加载。

传统模式：渲染组件-> 请求数据 -> 再渲染组件

异步模式：请求数据-> 渲染组件；

```javascript
// demo
import React, { lazy, Suspense } from 'react';
// lazy 和 Suspense 配套使用，react原生支持代码分割
const About = lazy(() => import(/* webpackChunkName: "about" */'./About'));
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Suspense fallback={<div>loading</div>}>
          <About />
        </Suspense>
      </div>
    );
  }
}
export default App;
```

## 前置基础

1. 动态 import

相对于静态 import 的 `import XX from XXX`，动态 import 指在运行时加载

```javascript
import('./test.js').then(test => {
    // ...
});
// 可见，是实现了Promsie规范的，回调函数为返回的模块
```

1. 错误边界

React V 16 中引入，部分 UI 的 JS 错误不会导致整个应用崩溃；

错误边界是一种 React 组件，错误边界在 渲染期间、生命周期方法和整个组件树的构造函数 中捕获错误，且会渲染出备用 UI 而不是崩溃的组件。

```javascript
// comp ErrorBoundary 
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary

// comp App
import React, from 'react';
import ErrorBoundary from './ErrorBoundary'
class App extends React.Component {
  state = {
      count: 1
  }
  render() {
    const { count } = this.state
    if (count === 3) {
        throw new Error('I crashed!');
    }
    return (
      <ErrorBoundary>
        <h1>App</h1>
        <p>{count}</p>
        <button onClick={() => this.setState({ count: count + 1 })}>add</button>
      </ErrorBoundary>
    )
  }
}
export default App;
```

## 手写异步组件

Suspense 组件需要等待异步组件加载完成再渲染异步组件的内容。

1. lazy wrapper 住异步组件，React 第一次加载组件的时候，异步组件会发起请求，并且抛出异常，终止渲染；
2. Suspense 里有 componentDidCatch 生命周期函数，异步组件抛出异常会触发这个函数，然后改变状态使其渲染 fallback 参数传入的组件；
3. 异步组件的请求成功返回之后，Suspense 组件再次改变状态使其渲染正常子组件（即异步组件）；

```javascript
// comp About
const About = lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      default: <div>component content</div>
    })
  }, 1000)
}))

// comp Suspense
import React from 'react'
class Suspense extends React.PureComponent {
  /**
   * isRender 异步组件是否就绪，可以渲染
   /
  state = {
    isRender: true
  }
  componentDidCatch(e) {
    this.setState({ isRender: false })
    e.promise.then(() => {
      / 数据请求后，渲染真实组件 */
      this.setState({ isRender: true })
    })
  }
  render() {
    const { fallback, children } = this.props
    const { isRender } = this.state
    return isRender ? children : fallback
  }
}

export default Suspense

// comp lazy
import React, { useEffect } from 'react'
export function lazy(fn) {
  const fetcher = {
    status: 'pending',
    result: null,
    promise: null,
  }
  return function MyComponent() {
    const getDataPromise = fn()
    fetcher.promise = getDataPromise
    getDataPromise.then(res => {
      fetcher.status = 'resolved'
      fetcher.result = res.default
    })
    useEffect(() => {
      if (fetcher.status === 'pending') {
          throw fetcher
      }
    }, [])
    if (fetcher.status === 'resolved') {
      return fetcher.result
    }
    return null
  }
}

// 实现的效果与React支持内容保持一致
import React, {Suspese, lazy} from 'react'

const About= lazy(() => { import('../About') });

class App extends React.Component {
  render() {
    /**
     * 1. 使用 React.Lazy 和 import() 来引入组件
     * 2. 使用<React.Suspense></React.Suspense>来做异步组件的父组件，并使用 fallback 来实现组件未加载完成时展示信息
     * 3. fallback 可以传入html，也可以自行封装一个统一的提示组件
     */
    return (
      <div>
        <Suspense
          fallback={
            <Loading />
          }
        >
          <About />
        </Suspense>
      </div>
    )
  }
}
export default ReactComp;
```
