# React18 与 Vue3 对比之模板-样式-事件-表单等功能

## 模板对比

Vue 的视图变化，主要通过：指令 + 模板的方式

React 的视图变化，主要通过：原生 JS + 模板的方式

React 的模板比较强大，因为可以编写 JSX 结构，所以可以做出更加灵活的结构处理。

## 样式对比

Vue 的 class 和 style 都有三种写法：字符串、数组、对象

React 的 style 只能写对象，class 只能字符串，可借助 classnames 这个库

两个框架基本上都可以满足常见的样式需求。

## 事件对比

Vue 事件功能丰富

React 事件传参需要高阶处理

```vue
<!-- Vue -->
<template>
  <ul>
    <li v-for="(item, index) in list" @click="handleClick(index)"></li>
  </ul>
</template>
<script>
methods: {
	handleClick(index){

    }
}
</script>
```

```jsx
<!-- React -->
<ul>
{
    list.map((v, i)=> <li onClick={handleClick(i)}></li>)
}
</ul>
const handleClick = (index) => {
    return () => {
        console.log(index)
    }
}
```

## 表单对比

Vue 表单双向绑定 v-model

React 表单受控与非受控

针对表单操作这一块来说，Vue 的表单指令 v-model 还是非常灵活的，总体对比要比 React 使用方便且灵活。
