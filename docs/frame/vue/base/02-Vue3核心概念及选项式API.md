# MVC 设计模式与 MVVM 设计模式

使用 Vue 框架开发前端项目，最大的优势就是再也不用进行复杂的 DOM 操作了，我们只要关心数据的变化即可，Vue 框架会帮我们把复杂的 DOM 进行渲染，这背后都要归功于他的设计思想，即 MVVM 设计模式。

了解 MVVM 设计模式之前，有必要先了解一下 MVC 设计模式，MVVM 模式是在 MVC 模式基础上演变而来的。

最早的 MVC 设计模式是出现在后端开发中，主要目的就是让视图层与数据层分离，职责更加清晰，方便开发等等，例如：Spring MVC、ASP.NET MVC 等等。

![02-01-后端经典MVC](https://qn.huat.xyz/mac/202310271431424.png)

随着 Ajax 技术的流行，前后端分离开发越来越流行，前端需要处理复杂的视图与数据，迫使前端也急需一种设计模式来进行分层处理，所以 MVC 设计模式开始进入前端领域。

早期比较经典的前端 MVC 框架就是 backbone.js，但是前后端还是有很大差异的，所以对传统 MVC 做了一些改良。

![02-02-backboneMVC](https://qn.huat.xyz/mac/202310271431439.png)

backbone.js 存在的问题：

- 数据流混乱，尤其是多视图多数据场景下
- 控制层单薄，可有可无

于是 2009 年 Angular.js 横空出世，带来了全新的 MVVM 设计模式，让开发者眼前一亮，除了 M 和 V 层以外，就是这个 VM 层啦，即：viewModel 层。MVVM 设计模式的核心思想就是不让 Model 和 View 这两层直接通信，而是通过 VM 层来连接。

![02-03-MVVM](https://qn.huat.xyz/mac/202310271431459.png)

![02-04-Vue-MVVM](https://qn.huat.xyz/mac/202310271431487.png)

MVVM 设计模式比 MVP 模式的优势：

- ViewModel 能够观察到数据的变化，并对视图对应的内容进行自动更新
- ViewModel 能够监听到视图的变化，并能够通知数据发生变化

虽然最早提出 MVVM 模式的是 Angular.js，但是 Vue 把 MVVM 设计模式发扬光大了，Vue 也成为了当下最主流的前端框架之一。

Vue 官网上的一段话：虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示组件实例。

MVVM 模型中 M 和 V 不能直接操作，需要 VM 层加持。但 Vue 比较灵活，可以直接去操作原生 DOM，也就是直接去操作 V 层。

# 选项式 API 的编程风格与优势

选项式 API，即：options API

```javascript
let vm = createApp({
  methods: {},
  computed: {},
  watch: {},
  data() {},
  mounted() {},
});
```

这种写法的优势：

- 只有一个参数，不会出现参数顺序的问题，随意调整配置的位置
- 非常清晰，语法化特别强
- 非常适合添加默认值的

# 声明式渲染及响应式数据实现原理

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

```html
<div id="counter">Counter: {{ counter }}</div>
```

```javascript
const Counter = {
  data() {
    return {
      counter: 0,
    };
  },
};
Vue.createApp(Counter).mount("#counter");
```

声明式编程：不需要编写具体是如何实现的，直接调用声明就可以实现功能。SQL 就是比较经典的声明式语言：

```sql
SELECT * from user WHERE username = xiaoming
```

```sql
for(var i=0;i<user.length;i++)
{
    if(user[i].username == "xiaoming")
    {
     print("find");
     break;
    }
}
```

注意：数据是通过 {{  }} 模板语法来完成的，模板语法支持编写 JS 表达式

响应式数据实现的原理：利用 JS 的 Proxy 对象。Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，其实就是直接监控值的修改，当值发生改变的时候，可以监控到。

```html
<div id="app"></div>
<script>
  let data = new Proxy(
    {
      message: "hello",
    },
    {
      get(target) {
        console.log("get");
        return target.message;
      },
      set(target, key, value) {
        console.log("set");
        app.innerHTML = value;
      },
    }
  );
  app.innerHTML = data.message;
  setTimeout(() => {
    data.message = "hi";
  }, 2000);
</script>
```

# 指令系统与事件方法及传参处理

指令系统就是通过自定义属性实现的一套功能，也是声明式编程的体现。

通常在标签上添加 v-\* 字样，常见的指令有：

- v-bind -> 操作标签属性，可通过 : 简写
- v-on -> 操作事件，可通过 @ 简写

```html
<div id="app">
  <p :title="message">这是一个段落</p>
  <button @click=" message = 'hi' ">点击</button>
</div>
{{ message }}
<script>
  let vm = Vue.createApp({
    data() {
      return {
        message: "hello",
      };
    },
  }).mount("#app");
</script>
```

如何添加事件方法，通过 methods 选项 API 实现，并且 Vue 框架已经帮我们帮事件传参机制处理好了。

```html
<div id="app">
  <button @click="toClick($event, 123)">点击</button>
</div>
<script>
  let vm = Vue.createApp({
    methods: {
      toClick(ev, num) {},
    },
  }).mount("#app");
</script>
```

# 计算属性与侦听器区别与原理

## 计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护，所以过于复杂的逻辑可以移植到计算属性中进行处理。

```html
<div id="app">{{ reverseMessage }}</div>
<script>
  let vm = Vue.createApp({
    data() {
      return {
        message: "hello",
      };
    },
    computed: {
      reverseMessage() {
        return this.message.split("").reverse().join("");
      },
    },
  }).mount("#app");
</script>
```

计算属性与方法比较像，如下所示：

```javascript
<div id="app">
{{ reverseMessageMethod() }}<br>
{{ reverseMessageMethod() }}<br>
{{ reverseMessage }}<br>
{{ reverseMessage }}<br>
</div>
<script>
    let vm = Vue.createApp({
        data(){
            return {
                message: 'hello world'
            }
        },
        methods: {
            reverseMessageMethod(){
                console.log(1);
                return this.message.split(' ').reverse().join(' ');
            }
        },
        computed: {
            reverseMessage(){
                console.log(2);
                return this.message.split(' ').reverse().join(' ');
            }
        }
    }).mount('#app');
</script>
```

计算属性跟方法相比，具备缓存的能力，而方法不具备缓存，所以上面代码执行完，会弹出两次 1 和一次 2。

注意：默认是只读的，一般不会直接更改计算属性，如果想更改也是可以做到的，通过 Setter 写法实现，[官方地址](https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%9A%84-setter)。

既然计算属性编写的是一个函数，而调用的时候以函数名的形式进行使用，其实实现起来也不是特别难的事情：

```javascript
let computed = {
  num() {
    return 123;
  },
};
let vm = {};
for (let attr in computed) {
  Object.defineProperty(vm, attr, {
    value: computed[attr](),
  });
}
```

## 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。侦听器的目的：侦听器用来观察和响应 Vue 实例上的数据变动,类似于临听机制+事件机制。当有一些数据需要随着其它数据变化而变化时,就可以使用侦听器。

```html
<div id="app">{{ message }}</div>
<script>
  let vm = Vue.createApp({
    data() {
      return {
        message: "hello",
      };
    },
    watch: {
      message(newVal, oldVal) {},
    },
  }).mount("#app");
</script>
```

有时候，计算属性 和 侦听器 往往能实现同样的需求，那么他们有何区别呢？

- 计算属性适合：多个值去影响一个值的应用；而侦听器适合：一个值去影响多个值的应用
- 侦听器支持异步的程序，而计算属性不支持异步的程序

# 条件渲染与列表渲染及注意点

## 条件渲染

v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

在 JavaScript 中，truthy（真值）指的是在[布尔值](https://so.csdn.net/so/search?q=布尔值&spm=1001.2101.3001.7020)上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 falsy 假值（即除 false、0、-0、0n、“”、null、undefined 和 NaN 以外皆为真值）。

```vue
<div id="app">
    <div v-if="isShow">aaaaa</div>
    <div v-else>bbbbb</div>
</div>
<script>
    let vm = Vue.createApp({
        data(){
            return {
                isShow: 0
            }
        }
    }).mount('#app');
</script>
```

## 列表渲染

v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 item in items 形式的特殊语法，其中 items 是源数据数组，而 item 则是被迭代的数组元素的别名。

```vue
<div id="app">
	<div v-for="item, index in list">{{ item }}, {{ index }}</div>
    <div v-for="value, key, index in info">{{ value }}, {{ key }}, {{ index }}</div>
    <div v-for="item in num">{{ item }}</div>
    <div v-for="item in text">{{ item }}</div>
</div>
<script>
    let vm = Vue.createApp({
        data(){
            return {
                list: ['a', 'b', 'c'],
                info: { username: 'xiaoming', age: 20 },
                num: 10,
                text: 'hello'
            }
        }
    }).mount('#app');
</script>
```

## 条件渲染与列表渲染需要注意的点

- 列表渲染需要添加 key 属性，用来跟踪列表的身份
- v-if 和 v-for 尽量不要一起使用，可利用计算属性来完成筛选这类功能（因为 v-if 优先级高于 v-for，这样 v-if 拿不到 v-for 中的 item 属性）
- template 标签起到的作用，形成一个整体容器

# class 样式与 style 样式的三种形态

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 `class` 和 `style` 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

- 字符串
- 数组
- 对象

```javascript
let vm = Vue.createApp({
  data() {
    return {
      myClass1: "box box2",
      myClass2: ["box", "box2"],
      myClass3: { box: true, box2: true },
      myStyle1: "background: red; color: white;",
      myStyle2: ["background: red", "color: white"],
      myStyle3: { background: "red", color: "white" },
    };
  },
}).mount("#app");
```

数组和对象的形式要比字符串形式更加的灵活，也更容易控制变化。

# 表单处理与双向数据绑定原理

表单是开发过程中经常要进行操作的，一般需要收集表单数据，发送给后端，或者把后端的数据进行回显等。在 Vue 中是通过 v-model 指令来操作表单的，可以非常灵活的实现响应式数据的处理。

```html
<div id="app"><input type="text" v-model="message" /> {{ message }}</div>
<script>
  let vm = Vue.createApp({
    data() {
      return {
        message: "hello",
      };
    },
  }).mount("#app");
</script>
```

尽管有些神奇，但 `v-model` 本质上不过是语法糖。可通过 value 属性 + input 事件来实现同样的效果。

```html
<div id="app">
  <input type="text" :value="message" @input="message = $event.target.value" />
  {{ message }}
</div>
<script>
  let vm = Vue.createApp({
    data() {
      return {
        message: "hello",
      };
    },
  }).mount("#app");
</script>
```

v-model 除了可以处理输入框以外，也可以用在单选框、复选框、以及下拉菜单中。

```vue
<div id="app">
    <input type="checkbox" v-model="fruits" value="苹果">苹果<br>
    <input type="checkbox" v-model="fruits" value="西瓜">西瓜<br>
    <input type="checkbox" v-model="fruits" value="哈密瓜">哈密瓜<br>
    {{ fruits }
    <input type="radio" v-model="gender" value="女">女<br>
    <input type="radio" v-model="gender" value="男">男<br>
    {{ gender }}
    <select v-model="city">
      <option value="北京">北京</option>
      <option value="上海">上海</option>
      <option value="杭州">杭州</option>
    </select>
    {{ city }}
</div>
<script>
let vm = Vue.createApp({
  data() {
    return {
      fruits: ["西瓜", "哈密瓜"],
      gender: "男",
      city: "杭州",
    };
  },
}).mount("#app");
</script>
```

# 生命周期钩子函数及原理分析

每个组件在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

就是工厂的流水线，每个工人站在各自的岗位，当任务流转到工人身边的时候，工人就开始工作。

简单来说生命周期钩子函数就是回调函数，在 Vue 的某个时机去调用对应的回调函数。就像定时器一样，谁调用的定时器的回调函数呢？其实就是定时器内部在调用的。

```javascript
setTimeout(() => {
  console.log("2秒后被执行了");
}, 2000);
```

官方提供的**[生命周期图示](https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)**

生命周期可划分为三个部分：

1. 初始阶段：beforeCreate、created、beforeMount、mounted
2. 更新阶段：beforeUpdate、updated
3. 销毁阶段：beforeUnmout、unmounted

注：一般在，created，mounted 中都可以发送数据请求，但是，大部分时候，会在 created 发送请求。因为这样可以更短的时间去响应数据。

# 搜索关键词加筛选条件的综合案例

## 案例图示如下

![02-05-搜索关键词+筛选条件的综合案例](https://qn.huat.xyz/mac/202310271435753.png)

## 准备好案例的 JSON 数据

```JSON
[
  {
    "id": 1,
    "name": "小明",
    "gender": "女",
    "age": 20
  },
  {
    "id": 2,
    "name": "小强",
    "gender": "男",
    "age": 18
  },
  {
    "id": 3,
    "name": "大白",
    "gender": "女",
    "age": 25
  },
  {
    "id": 4,
    "name": "大红",
    "gender": "男",
    "age": 22
  }
]
```

## 参考代码

```vue
<style>
.active-gender {
  background: red;
}
</style>
<div id="app">
    <input type="text" v-model="message">
    <button :class="activeGender('全部')" @click="handleGender('全部')">全部</button>
    <button :class="activeGender('男')" @click="handleGender('男')">男</button>
    <button :class="activeGender('女')" @click="handleGender('女')">女</button>
    <ul>
      <li v-for="item in filterList" :key="item.id">{{ item.name }}, {{ item.gender }}, {{ item.age }}</li>
    </ul>
</div>
<script>
let vm = Vue.createApp({
  data() {
    return {
      list: [],
      message: "",
      gender: "全部",
    };
  },
  created() {
    fetch("./02-data.json")
      .then((res) => res.json())
      .then((res) => {
        this.list = res;
      });
  },
  computed: {
    filterList() {
      return this.list
        .filter((v) => v.name.includes(this.message))
        .filter((v) => v.gender === this.gender || "全部" === this.gender);
    },
  },
  methods: {
    activeGender(gender) {
      return { "active-gender": this.gender === gender };
    },
    handleGender(gender) {
      this.gender = gender;
    },
  },
}).mount("#app");
</script>
```
