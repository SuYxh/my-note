# Redux

## 理解 Redux

### 学习文档

1. 英文文档: [https://redux.js.org/](https://redux.js.org/)
2. 中文文档: [http://www.redux.org.cn/](http://www.redux.org.cn/)
3. Github: [https://github.com/reactjs/redux](https://github.com/reactjs/redux)

### Redux 是什么

1. Redux 是一个专门用于状态管理的 JS 库（不是 React 插件库）。
2. 它可以用在 React, Angular, Vue 等项目中，但基本与 React 配合使用。
3. 作用: 集中式管理 React 应用中多个组件共享的状态。

### 什么情况下需要使用 Redux

1. 某个组件的状态，需要让其他组件可以随时拿到（共享）。
2. 一个组件需要改变另一个组件的状态（通信）。
3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

### Redux 工作流程

![redux原理图](https://qn.huat.xyz/mac/202410192213193.png)

## Redux 的三个核心概念

### Action

1. 动作的对象
2. 包含 2 个属性
   - `type`：标识属性, 值为字符串, 唯一, 必要属性
   - `data`：数据属性, 值类型任意, 可选属性
3. 例子：`{ type: 'ADD_STUDENT', data: { name: 'tom', age: 18 } }`

### Reducer

1. 用于初始化状态、加工状态。
2. 加工时，根据旧的 state 和 action，产生新的 state 的纯函数。

### Store

1. 将 state、action、reducer 联系在一起的对象
2. 如何得到此对象?
   ```javascript
   import { createStore } from 'redux';
   import reducer from './reducers';
   const store = createStore(reducer);
   ```
3. 此对象的功能?
   - `getState()`: 得到 state
   - `dispatch(action)`: 分发 action, 触发 reducer 调用, 产生新的 state
   - `subscribe(listener)`: 注册监听, 当产生了新的 state 时, 自动调用

## Redux 的核心 API

### `createStore()`

作用：创建包含指定 reducer 的 store 对象。

### Store 对象

1. 作用: Redux 库最核心的管理对象。
2. 它内部维护着:
   - state
   - reducer
3. 核心方法:
   - `getState()`
   - `dispatch(action)`
   - `subscribe(listener)`

### applyMiddleware()

作用：应用上基于 Redux 的中间件（插件库）。

### combineReducers()

作用：合并多个 reducer 函数。

## 使用 Redux 编写应用

### 创建 store

```js
//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//暴露store
export default createStore(countReducer)
```



### 创建countReducer

```js
/* 
	1.创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/

const initState = 0 //初始化状态
export default function countReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
		case 'increment': //如果是加
			return preState + data
		case 'decrement': //若果是减
			return preState - data
		default:
			return preState
	}
}
```



### 创建 Count 组件

```jsx
import React, { Component } from 'react'
//引入store，用于获取redux中保存状态
import store from '../../redux/store'

export default class Count extends Component {

	state = {carName:'奔驰c63'}

	/* componentDidMount(){
		//检测redux中状态的变化，只要变化，就调用render
		store.subscribe(()=>{
			this.setState({})
		})
	} */

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		store.dispatch({type:'increment',data:value*1})
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		store.dispatch({type:'decrement',data:value*1})
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		const count = store.getState()
		if(count % 2 !== 0){
			store.dispatch({type:'increment',data:value*1})
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		setTimeout(()=>{
			store.dispatch({type:'increment',data:value*1})
		},500)
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{store.getState()}</h1>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}
```



### App 组件

```jsx
import React, { Component } from 'react'
import Count from './components/Count'

export default class App extends Component {
	render() {
		return (
			<div>
				<Count/>
			</div>
		)
	}
}
```



### main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'

ReactDOM.render(<App/>,document.getElementById('root'))

store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
```



## Redux 异步编程

### 理解

1. Redux 默认是不能进行异步处理的。
2. 某些时候应用中需要在 Redux 中执行异步任务（ajax, 定时器）。

### 使用异步中间件

```bash
npm install --save redux-thunk
```



store.js

```js
//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//暴露store
export default createStore(countReducer,applyMiddleware(thunk))
```



action.js

```js
/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from './constant'

//同步action，就是指action的值为Object类型的一般对象
export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const createIncrementAsyncAction = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(createIncrementAction(data))
		},time)
	}
}
```





## React-Redux

### 理解

1. 一个 React 插件库。
2. 专门用来简化 React 应用中使用 Redux。



### 原理

![react-redux模型图](https://qn.huat.xyz/mac/202410192227063.png)





### React-Redux 将所有组件分成两大类

1. UI 组件
   - 只负责 UI 的呈现，不带有任何业务逻辑。
   - 通过 props 接收数据（一般数据和函数）。
   - 不使用任何 Redux 的 API。
   - 一般保存在 `components` 文件夹下。
2. 容器组件
   - 负责管理数据和业务逻辑，不负责 UI 的呈现。
   - 使用 Redux 的 API。
   - 一般保存在 `containers` 文件夹下。

### 相关 API

1. **Provider**：让所有组件都可以得到 state 数据。
   
   ![img](https://qn.huat.xyz/mac/202410192212633.png)
   
2. **connect**：用于包装 UI 组件生成容器组件。
   
   ![img](https://qn.huat.xyz/mac/202410192212799.png)
   
3. **mapStateToProps**：将外部的数据（即 state 对象）转换为 UI 组件的标签属性。
   
   ![img](https://qn.huat.xyz/mac/202410192212949.png)
   
4. **mapDispatchToProps**：将分发 action 的函数转换为 UI 组件的标签属性。



### 案例



#### count 组件

```js
import React, { Component } from 'react'
//引入action
import {
	createIncrementAction,
	createDecrementAction,
	createIncrementAsyncAction
} from '../../redux/count_action'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

//定义UI组件
class Count extends Component {

	state = {carName:'奔驰c63'}

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		this.props.jia(value*1)
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		this.props.jian(value*1)
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		if(this.props.count % 2 !== 0){
			this.props.jia(value*1)
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		this.props.jiaAsync(value*1,500)
	}

	render() {
		//console.log('UI组件接收到的props是',this.props);
		return (
			<div>
				<h1>当前求和为：{this.props.count}</h1>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
	state => ({count:state}),

	//mapDispatchToProps的一般写法
	/* dispatch => ({
		jia:number => dispatch(createIncrementAction(number)),
		jian:number => dispatch(createDecrementAction(number)),
		jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
	}) */

	//mapDispatchToProps的简写
	{
		jia:createIncrementAction,
		jian:createDecrementAction,
		jiaAsync:createIncrementAsyncAction,
	}
)(Count)
```





#### action.js

```js
import {INCREMENT,DECREMENT} from './constant'

//同步action，就是指action的值为Object类型的一般对象
export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const createIncrementAsyncAction = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(createIncrementAction(data))
		},time)
	}
}
```



#### count_reducer.js

```js
/* 
	1.创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {INCREMENT,DECREMENT} from './constant'

const initState = 0 //初始化状态
export default function countReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
		case INCREMENT: //如果是加
			return preState + data
		case DECREMENT: //若果是减
			return preState - data
		default:
			return preState
	}
}
```



#### store.js

```js
//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//暴露store
export default createStore(countReducer,applyMiddleware(thunk))
```





#### constant.js

```js
/* 
	该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```



## 使用 Redux 调试工具

### 安装 Chrome 浏览器插件

![image-20241019222332450](https://qn.huat.xyz/mac/202410192223502.png)



### 下载工具依赖包

```bash
npm install --save-dev redux-devtools-extension
```



使用

```js

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware,combineReducers} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './reducers/count'
//引入为Count组件服务的reducer
import personReducer from './reducers/person'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

//汇总所有的reducer变为一个总的reducer
const allReducer = combineReducers({
	he:countReducer,
	rens:personReducer
})

//暴露store 
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```





## 纯函数和高阶函数

### 纯函数

1. 一类特别的函数: 只要是同样的输入（实参），必定得到同样的输出（返回）。
2. 必须遵守以下一些约束：
   - 不得改写参数数据。
   - 不会产生任何副作用，例如网络请求，输入和输出设备。
   - 不能调用 `Date.now()` 或者 `Math.random()` 等不纯的方法。
3. Redux 的 reducer 函数必须是一个纯函数。

### 高阶函数

1. 理解: 一类特别的函数：
   - 情况 1: 参数是函数。
   - 情况 2: 返回是函数。
2. 常见的高阶函数:
   - 定时器设置函数。
   - 数组的 `forEach()`, `map()`, `filter()`, `reduce()`, `find()`, `bind()`。
   - promise。
   - React-Redux 中的 `connect` 函数。
3. 作用: 能实现更加动态, 更加可扩展的功能。





## 参考文档

1、一文让你彻底弄懂Redux的基本原理以及其如何在React中使用！

https://blog.csdn.net/m0_73850058/article/details/138979759



2、深度理解Redux原理并实现一个redux

https://cloud.tencent.com/developer/article/2137277



3、Redux介绍及源码解析

https://cloud.tencent.com/developer/article/2176933

