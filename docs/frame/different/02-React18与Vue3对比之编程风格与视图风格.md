# React18 与 Vue3 对比之编程风格与视图风格

## 编程风格对比

React 语法少，难度大

Vue 语法多，难度小

例如：在 react 中是没有指令的，所有的功能都要通过原生 JavaScript 来实现。所以说当使用 Vue 框架的时候，真的就是在操作 Vue，而使用 React 框架其实更贴近于原生 JS 操作。

举一个实例：比如表单操作的时候，在 Vue 中可以直接通过 v-model 指定进行操作。而 React 则比较麻烦，需要通过受控组件的方式给表单添加 value 和 onChange 配置来进行操作。

```html
<!-- vue -->
<input v-model="username" />
```

```html
<!-- react -->
<input value={username} onChange={(ev)=> setUsername(ev.target.value)} />
```

## 视图风格对比

Vue 采用`<template>`字符串模板。更贴近 HTML，学习成本低，但有时候不灵活。

React 采用 JSX 语法，限制比较多，但是可以跟模板语法很好的进行结合。

所以两个框架各有优缺点。

下面看一下 JSX 灵活的地方。

```html
<!-- vue -->
<template>
  <h1 v-if="leave === 1">标题1</h1>
  <h2 v-if="leave === 2">标题2</h2>
</template>
```

```jsx
<!-- react -->
let Welcome = () => {
    const leave = 1;
    const Tag = 'h' + leave;
    return (
    	<div>
        	{ <Tag>标题{leave}</Tag> }
        </div>
    );
}
```
