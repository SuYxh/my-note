# Vuex 处理异步状态及应用场景

本小节中将讲解一下 Vuex 中如何处理异步程序，因为在上一个小节中提到过，mutations 中只能处理同步，不能处理异步，所以异步的工作就交给了 actions 来完成。

那么如何触发 actions 中定义的方法呢，就需要通过 dispatch 进行触发，具体代码如下：

```js
const store = createStore({
  state: {
    count: 0,
  },
  actions: {
    change(context, payload) {
      setTimeout(() => {
        context.commit("change", payload);
      }, 1000);
    },
  },
  mutations: {
    change(state, payload) {
      state.count += payload;
    },
  },
});
```

```vue
<script>
export default {
  name: "HomeView",
  methods: {
    handleClick() {
      this.$store.dispatch("change", 5);
    },
  },
};
</script>
```

这样在 vue devtools 插件中就可以更好的观察到异步数据的变化。那么异步处理的应用场景有哪些呢？异步的获取后端的数据，这样可以利用状态管理来充当 MVC 架构中的 C 层，不仅衔接前后端，还能对数据进行共享，可以在切换路由的时候做到减少请求次数，而且状态管理配合本地存储进行数据持久化也是非常的方便。
