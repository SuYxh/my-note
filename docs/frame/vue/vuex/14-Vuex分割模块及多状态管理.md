# Vuex 分割模块及多状态管理

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

那么这个时候，所有共享状态的值都在一起，所有的方法也都放在了一起，维护起来非常的不方便。那么 Vuex 中可利用 modules 属性来配置模块化的共享状态，那么对于后期维护起来是非常方便的，也利于大型项目的架构。

在/store 下创建一个 modules 文件夹，然后编写一个 message.js，代码如下：

```js
const state = {
  msg: "hello",
};
const getters = {
  upperMsg(state) {
    return state.msg.toUpperCase();
  },
};
const actions = {};
const mutations = {
  change(state, payload) {
    state.msg = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
```

模块中的选项跟 index.js 中的选项是一样的，对外提供接口的时候，可以看到一个 namespaced 字段，这表示当前模块的一个命名空间，主要是为了防止跟其他模块之间产生冲突，在调用的时候需要携带对应的命名空间标识符才行。

再来看一下 index.js 如何去收集我们的模块，并如何去使用我们的模块。

```js
// store/index.js
import message from "@/store/modules/message";
const store = createStore({
  modules: {
    message,
  },
});
```

```vue
<!-- About.vue -->
<template>
  <div>
    <button @click="change('hi')">点击</button>
    hello about, {{ msg }}, {{ upperMsg }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "AboutView",
  methods: {
    // handleClick(){
    //   this.$store.commit('message/change', 'hi');
    // }
    ...mapMutations("message", ["change"]),
  },
  computed: {
    //  msg(){
    //   return this.$store.message.msg;
    //  },
    //  upperMsg(){
    //   return this.$store.getters['message/upperMsg']
    //  }
    ...mapState("message", ["msg"]),
    ...mapGetters("message", ["upperMsg"]),
  },
};
</script>
```

在辅助函数的情况下，也可以进行很好的调用，辅助函数的第一个参数就是命名空间的名字。
