# React18 与 Vue3 对比之组件通信-逻辑复用-内容分发-DOM 操作等功能

## 组件通信对比

Vue 父子 props，子父 emits

React 父子 props，子父回调函数

emits 自定义事件和回调函数，但实际上是一样的思想。

跨组件的通信方案也很类似，都是一种依赖注入的方式来实现的。

## 功能复用处理

Vue 选项式采用：mixins 混入；组合式采用：use 函数

React 类组件采用：Render Props、HOC；函数组件：use 函数

可以发现组合式 API 和函数组件都是采用 use 函数，所以基本复用是差不多的思想，这也是两个框架推荐的用法。

## 内容分发处理

Vue 通过`<slot>`插槽，进行接收

React 通过 props.children，进行接收

## 原生 DOM 处理

Vue 通过 ref 属性

React 也通过 ref 属性处理

思路都是差不多的，就是给元素添加 ref 属性，在跟对象或字符串绑定在一起，这样就可以直接获取到 DOM 元素。
