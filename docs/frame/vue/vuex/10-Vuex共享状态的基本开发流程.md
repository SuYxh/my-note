# Vuex 共享状态的基本开发流程

在上一个小节中，我们介绍了什么是 Vuex，本小节我们一起来看一下 Vuex 共享状态的基本开发流程。首先我们来看一下 Vuex 的经典流程图。

![06-04-Vuex状态管理](https://qn.huat.xyz/mac/202310271721465.png)

我们可以看到，基本上就是先准备好一个共享数据 state，然后渲染我组件中，通过组件调用 dispatch -> actions -> commit -> mutations 的方式来进行 state 修改。

那么这里我们先不考虑 dispatch -> actions，因为这两个环节是处理异步程序的，那么我们直接组件去调用 commit 就可以触发 mutations 中定义的方法，这样在这个方法中进行 state 的修改。

首先在/src/store/index.js 创建一个状态管理的配置文件，然后在 main.js 中让 vuex 于 vue 进行结合，就像我们路由的使用一样。

```js
//  store/index.js
const store = createStore({
  state: {
    count: 0,
  },
  mutations: {
    change(state, payload) {
      state.count += payload;
    },
  },
});

//  main.js
import store from "./store";
app.use(store);
```

下面看一下如何在页面中显示 state 数据和如何通过 commit 修改我们的共享数据，代码如下：

```vue
<template>
  <div>
    <button @click="change(5)">点击</button>
    hello home, {{ $store.state.count }}
  </div>
</template>
<script>
export default {
  name: "HomeView",
  methods: {
    handleClick() {
      this.$store.commit("change", 5);
    },
  },
};
</script>
```
