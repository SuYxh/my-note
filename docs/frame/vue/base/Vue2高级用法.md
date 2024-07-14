## vue.js 动画特效＆ 常见组件库介绍

### 进入/离开 & 列表过渡

Vue 提供了 `transition` 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

#### 基础使用示例

```typescript
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```typescript
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

```typescript
export default {
  data() {
    show: true
  }
}
```

![](https://qn.huat.xyz/mac/202407041638275.png)

#### 自定义过渡类名

```typescript
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
```

```typescript
<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```

#### 动画钩子

```typescript
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

#### 多组件过渡与列表过渡

```typescript
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

```typescript
{
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
}
```

```typescript
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
```

### 状态过渡

这个概念其实很好理解，就是通过状态去驱动视图更新从而实现动画过渡。

在这里我们首先要了解**计算属性与数据监听（computed、watch）**。

```typescript
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>

<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20">
  <p>{{ animatedNumber }}</p>
</div>
```

```typescript
{
  data: {
    number: 0,
    tweenedNumber: 0
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    number: function(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    }
  }
}
```

![](https://qn.huat.xyz/mac/202407041638322.png)

### 常用动画相关库

大家可以在工作中选用以下动画相关库实现动效。

**gsap**

animated.css

tween.js

等

### 小练习

案例：创建一个简单的待办事项列表，点击添加按钮时，新的待办事项会以淡入的动画效果出现；当点击删除按钮时，待办事项会以淡出的动画效果消失。

1. 创建一个基本的待办事项列表组件 `TodoList`，包含以下内容：

   - 一个输入框和一个添加按钮，用于输入待办事项并添加到列表中；
   - 一个待办事项列表，用于展示已添加的待办事项；
   - 每个待办事项具有删除按钮，点击时可以删除该事项。
2. 使用 Vue2 的 transition 组件实现动画效果：

   - 在待办事项列表组件的模板中，使用 `<transition>` 包裹待办事项列表；
   - 在待办事项列表的每个待办事项项中，使用 `<transition-group>` 包裹，并设置 `name` 属性为 'fade'；
   - 在 CSS 样式中定义 'fade' 动画效果，包括进入和离开的过渡效果。
3. 完成添加和删除待办事项的功能：

   - 在 `TodoList` 组件的 data 中定义一个 `todoList` 数组，用于存储待办事项；
   - 在添加按钮的点击事件中，将输入框的值添加到 `todoList` 数组中，并清空输入框；
   - 在每个待办事项项的删除按钮的点击事件中，根据索引从 `todoList` 数组中移除对应的待办事项。
4. 在 CSS 样式中定义 'fade' 动画效果：

   - 使用 Vue2 默认的过渡类名：`v-enter`、`v-enter-active`、`v-leave`、`v-leave-active`；
   - 定义进入的过渡效果为淡入：`opacity: 0;`;
   - 定义离开的过渡效果为淡出：`opacity: 0;`;

这样，当你输入待办事项并点击添加按钮时，新的待办事项会以淡入的动画效果出现；当点击删除按钮时，待办事项会以淡出的动画效果消失。

![](https://qn.huat.xyz/mac/202407041638727.png)

### 应用场景

1. 组件中的动效
2. 路由动画

如果实在 react 中，我们可以选用 react-spring，思路类似

## 插槽

### 插槽基本使用

插槽的概念可以与 react 中 renderProps 对比。

假设我们现在有这样的需求

```typescript
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

我们在编写代码时，组件内部并不清楚这块内容的具体实现，我就需要将这个坑位留出，需要开发者传进来。

我们为每个插槽取个名字

```typescript
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

### 插槽中使用数据

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 `<current-user>` 组件：

```typescript
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```

我们可能想换掉备用内容，用名而非姓来显示。如下：

```typescript
<current-user>
  {{ user.firstName }}
</current-user>
```

然而上述代码不会正常工作，因为只有 `<current-user>` 组件可以访问到 `user`，而我们提供的内容是在父级渲染的。

为了让 `user` 在父级的插槽内容中可用，我们可以将 `user` 作为 `<slot>` 元素的一个 attribute 绑定上去：

```typescript
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

---

多个插槽与数据，我们可以这样实现

```typescript
<template>
  <div class="slot-demo">
    <slot name="demo">this is demo slot.</slot>
    <slot text="this is a slot demo , " :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  name: 'SlotDemo',
  data () {
    return {
      msg: 'this is scoped slot content.'
    }
  }
}
</script>
```

```typescript
<template>
  <slot-demo>
    <template v-slot:demo>this is custom slot.</template>
    <template v-slot="scope">
      <p>{{ scope.text }}{{ scope.msg }}</p>
    </template>
  </slot-demo>
</template>
```

### 插槽的原理【这个好好了解一下】

[https://github.com/vuejs/vue](https://github.com/vuejs/vue)

vm.$slots

挑几个重点方法：

- $slots & $scopedSlots
- renderSlot
- processSlot、processSlotContent
- generate

插槽的本质就是函数！

[https://github.com/vuejs/vue/blob/49b6bd4264c25ea41408f066a1835f38bf6fe9f1/src/core/instance/render-helpers/render-slot.ts#L7](https://github.com/vuejs/vue/blob/49b6bd4264c25ea41408f066a1835f38bf6fe9f1/src/core/instance/render-helpers/render-slot.ts#L7)

## 插件

插件可以是对象，或者是一个函数。如果是对象，那么对象中需要提供 **install** 函数，如果是函数，形态需要跟前面提到的 **install** 函数保持一致。

install 是组件安装的一个方法，跟 npm install 完全不一样，npm install 是一个命令

### 定义插件

```typescript
const MyPlugin = {
    install(Vue, options) {
      // 1. 添加全局方法或 property
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }
    
      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })
    
      // 3. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })
    
      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
    }
};
```

### 使用插件

```typescript
Vue.use(MyPlugin);

{{ $myMethod }}
```

### 插件化机制原理

```typescript
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 获取已经安装的插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 看看插件是否已经安装，如果安装了直接返回
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // toArray(arguments, 1)实现的功能就是，获取Vue.use(plugin,xx,xx)中的其他参数。
    // 比如 Vue.use(plugin,{size:'mini', theme:'black'})，就会回去到plugin意外的参数
    const args = toArray(arguments, 1)
    // 在参数中第一位插入Vue，从而保证第一个参数是Vue实例
    args.unshift(this)
    // 插件要么是一个函数，要么是一个对象(对象包含install方法)
    if (typeof plugin.install === 'function') {
      // 调用插件的install方法，并传入Vue实例
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 在已经安装的插件数组中，放进去
    installedPlugins.push(plugin)
    return this
  }
}
```

### 具体实践

Vue-Router

```typescript
install(app: App) {
      const router = this
      app.component('RouterLink', RouterLink)
      app.component('RouterView', RouterView)

      app.config.globalProperties.$router = router
      Object.defineProperty(app.config.globalProperties, '$route', {
        enumerable: true,
        get: () => unref(currentRoute),
      })

      // this initial navigation is only necessary on client, on server it doesn't
      // make sense because it will create an extra unnecessary navigation and could
      // lead to problems
      if (
        isBrowser &&
        // used for the initial navigation client side to avoid pushing
        // multiple times when the router is used in multiple apps
        !started &&
        currentRoute.value === START_LOCATION_NORMALIZED
      ) {
        // see above
        started = true
        push(routerHistory.location).catch(err => {
          if (__DEV__) warn('Unexpected error when starting the router:', err)
        })
      }

      const reactiveRoute = {} as {
        [k in keyof RouteLocationNormalizedLoaded]: ComputedRef<
          RouteLocationNormalizedLoaded[k]
        >
      }
      for (const key in START_LOCATION_NORMALIZED) {
        // @ts-expect-error: the key matches
        reactiveRoute[key] = computed(() => currentRoute.value[key])
      }

      app.provide(routerKey, router)
      app.provide(routeLocationKey, reactive(reactiveRoute))
      app.provide(routerViewLocationKey, currentRoute)

      const unmountApp = app.unmount
      installedApps.add(app)
      app.unmount = function () {
        installedApps.delete(app)
        // the router is not attached to an app anymore
        if (installedApps.size < 1) {
          // invalidate the current navigation
          pendingLocation = START_LOCATION_NORMALIZED
          removeHistoryListener && removeHistoryListener()
          removeHistoryListener = null
          currentRoute.value = START_LOCATION_NORMALIZED
          started = false
          ready = false
        }
        unmountApp()
      }

      // TODO: this probably needs to be updated so it can be used by vue-termui
      if ((__DEV__ || __FEATURE_PROD_DEVTOOLS__) && isBrowser) {
        addDevtools(app, router, matcher)
      }
    },
  }
```
