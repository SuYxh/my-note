# React18 与 Vue3 对比之响应式-生命周期-副作用等功能

## 响应式数据对比

Vue 采用响应式数据，底层通过 new Proxy()进行监控，灵活性更高

React 采用 state 状态，通过 setState()方法进行内部 re-render，可控性更强

## 生命周期对比

Vue 生命周期钩子(常见)

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted

React 生命周期钩子(常见)

- constructor
- componentDidMount
- componentDidUpdate
- componentWillUnmount
- render

整体对比来看，Vue 的生命周期会更丰富一些，React 生命周期会更简约一些。

## 副作用处理对比

vue 使用，watchEffect()

react 使用，useEffect()

都是处理副作用的方法，用法上还是有很大区别的。

watchEffect 会自动根据所依赖的值进行重渲染，而 useEffect 要明确指定对应的值才能进行重渲染，React 团队已经给出在未来的版本中可能会改成根据所依赖的值自动进行重渲染的操作，但暂时还不行。

watchEffect 在更新前和卸载前触发的方式是通过回调函数的参数被调用来实现的，而 useEffect 是通过 return 的返回值来指定的。

```javascript
// Vue
watchEffect((cb) => {
  cb(() => {
    //更新前的触发
  });
});
```

```javascript
// React
useEffect(() => {
  return () => {
    //更新前的触发
  };
});
```
