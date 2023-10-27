# setup 方法与 script_setup 及 ref 响应式

## setup 方法与 script_setup

在 Vue3.1 版本的时候，提供了 setup 方法；而在 Vue3.2 版本的时候，提供了 script_setup 属性。那么 setup 属性比 setup 方法对于操作组合式 API 来说会更加的简易。

```vue
<template>
  <div>
    <h2>setup方法</h2>
    {{ count }}
  </div>
</template>

// Vue3.1
<script>
export default {
  setup() {
    let count = 0;
    return {
      count,
    };
  },
};
</script>

// Vue3.2
<script setup>
let count = 0;
</script>
```

setup 方法是需要把数据进行 return 后，才可以在 template 标签中进行使用，而 setup 属性方式定义好后就可以直接在 template 标签中进行使用。

## ref 响应式

下面来学习一下，如何在组合式 API 中来完成数据的响应式操作，通过的就是 ref()方法，需要从 vue 模块中引入这个方法后才可以使用。

```vue
<script setup>
import { ref } from 'vue';
let count = ref(0);   // count -> { value: 0 }
//count += 1;   //✖
count.value += 1;   // ✔
</scirpt>
```

count 数据的修改，需要通过 count.value 的方式，因为 vue 底层对响应式数据的监控必须是对象的形式，所以我们的 count 返回的并不是一个基本类型，而是一个对象类型，所以需要通过 count.value 进行后续的操作，那么这种使用方式可能会添加我们的心智负担，还好可以通过 Volar 插件可以自动完成.value 的生成，大大提升了使用方式。

那么现在 count 就具备了响应式变化，从而完成视图的更新操作。

那么 ref()方法还可以关联原生 DOM，通过标签的 ref 属性结合到一起，也可以关联到组件上。

```vue
<template>
  <div>
    <h2 ref="elem">setup属性方式</h2>
  </div>
</template>
<script setup>
import { ref } from "vue";
let elem = ref();
setTimeout(() => {
  console.log(elem.value); //拿到对应的原生DOM元素
}, 1000);
</script>
```

# 事件方法\_计算属性 reactive_toRefs

## 事件方法与计算属性

下面看一下在组合式 API 中是如何实现事件方法和计算属性的。

```vue
<template>
  <div>
    <button @click="handleChange">点击</button>
    {{ count }}, {{ doubleCount }}
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
let count = ref(0);
let doubleCount = computed(() => count.value * 2);
let handleChange = () => {
  count.value += 1;
};
</script>
```

事件方法直接就定义成一个函数，计算属性需要引入 computed 方法，使用起来是非常简单的。

## reactive 与 toRefs

reactive()方法是组合式 API 中另一种定义响应式数据的实现方式，它是对象的响应式副本。

```vue
<template>
  <div>
    <h2>reactive</h2>
    {{ state.count }}
  </div>
</template>

<script setup>
import { reactiv } from "vue";
let state = reactive({
  count: 0,
  message: "hi vue",
});
state.count += 1;
</script>
```

reactive()方法返回的本身就是一个 state 对象，那么在修改的时候就不需要.value 操作了，直接可以通过 state.count 的方式进行数据的改变，从而影响到视图的变化。

ref()和 reactive()这两种方式都是可以使用的，一般 ref()方法针对基本类型的响应式处理，而 reactive()针对对象类型的响应式处理，当然还可以通过 toRefs()方法把 reactive 的代码转换成 ref 形式。

```vue
<template>
  <div>
    <h2>reactive</h2>
    {{ state.count }}, {{ count }}
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";

let state = reactive({
  count: 0,
});
let { count } = toRefs(state); //  let count = ref(0)
setTimeout(() => {
  //state.count += 1;
  count.value += 1;
}, 1000);
</script>
```

# 生命周期\_watch_watchEffect

## 生命周期钩子函数

在学习选项式 API 的时候，我们学习了生命周期钩子函数，那么在组合式 API 中生命周期又是如何使用的呢？下面我们从图中先看一下对比的情况吧。

![05-03-生命周期对比](https://qn.huat.xyz/mac/202310271658246.png)

那么具体的区别如下：

- 组合式中是没有 beforeCreate 和 created 这两个生命周期，因为本身在组合式中默认就在 created 当中，直接定义完响应式数据后就可以直接拿到响应式数据，所以不需要再有 beforeCreate 和 created 这两个钩子
- 组合式的钩子前面会有一个 on，类似于事件的特性，那就是可以多次重复调用

```vue
<script>
import { onMounted, ref } from "vue";
let count = ref(0);
onMounted(() => {
  console.log(count.value);
});
onMounted(() => {
  console.log(count.value);
});
onMounted(() => {
  console.log(count.value);
});
</script>
```

## watch 与 watchEffect

这里先说一下 watchEffect 的用法，为了根据响应式状态自动应用和重新应用副作用，我们可以使用 watchEffect 函数。它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

watchEffect 常见特性：

- 一开始会初始触发一次，然后所依赖的数据发生改变的时候，才会再次触发
- 触发的时机是数据响应后，DOM 更新前，通过 flush: 'post' 修改成 DOM 更新后进行触发
- 返回结果是一个 stop 方法，可以停止 watchEffect 的监听
- 提供一个形参，形参主要就是用于清除上一次的行为

```vue
<template>
  <div>
    <h2>watchEffect</h2>
    <div>{{ count }}</div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
let count = ref(0);
// const stop = watchEffect(()=>{
//   console.log(count.value);
// }, {
//   flush: 'post'
// })

// setTimeout(()=>{
//   stop();
// }, 1000)

// setTimeout(()=>{
//   count.value += 1;
// }, 2000)

watchEffect((cb) => {
  console.log(count.value);
  cb(() => {
    //更新前触发和卸载前触发，目的：清除上一次的行为(停止上一次的ajax，清除上一次的定时器)
    console.log("before update");
  });
});

setTimeout(() => {
  count.value += 1;
}, 2000);
</script>
```

再来看一下 watch 侦听器的使用方式，如下：

```vue
<script setup>
import { ref, watch } from "vue";
let count = ref(0);
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
setTimeout(() => {
  count.value = 1;
}, 2000);
</script>
```

那么 watch 与 watchEffect 的区别是什么呢？

- 懒执行副作用
- 更具体地说明什么状态应该触发侦听器重新运行
- 访问侦听状态变化前后的值

# 跨组件通信方案 provide_inject

## 依赖注入

在 Vue 中把跨组件通信方案 provide_inject 也叫做依赖注入的方式，前面我们在选项式中也学习了它的基本概念，下面看一下在组合式 API 中改如何使用。

```vue
// provide.vue
<template>
  <div>
    <my-inject></my-inject>
  </div>
</template>
<script setup>
import MyInject from "@/inject.vue";
import { provide, ref, readonly } from "vue";
//传递响应式数据
let count = ref(0);
let changeCount = () => {
  count.value = 1;
};
provide("count", readonly(count));
provide("changeCount", changeCount);

setTimeout(() => {
  count.value = 1;
}, 2000);
</script>

//inject.vue
<template>
  <div>
    <div>{{ count }}</div>
  </div>
</template>

<script setup>
import { inject } from "vue";
let count = inject("count");
let changeCount = inject("changeCount");
setTimeout(() => {
  changeCount();
}, 2000);
</script>
```

依赖注入使用的时候，需要注意的点：

- 不要在 inject 中修改响应式数据，可利用回调函数修改
- 为了防止可设置成 readonly

# 复用组件功能之 use 函数

为了更好的组合代码，可以创建统一规范的 use 函数，从而抽象可复用的代码逻辑。利用 use 函数可以达到跟 mixin 混入一样的需求，并且比 mixin 更加强大。

```js
// useCounter.js
import { computed, ref } from "vue";
function useCounter(num) {
  let count = ref(num);
  let doubleCount = computed(() => count.value * 2);
  return {
    count,
    doubleCount,
  };
}

export default useCounter;
```

```vue
<template>
  <div>
    <h2>use函数</h2>
    <div>{{ count }}, {{ doubleCount }}</div>
  </div>
</template>
<script setup>
import useCounter from "@/compotables/useCounter.js";
let { count, doubleCount } = useCounter(123);
setTimeout(() => {
  count.value += 1;
}, 2000);
</script>
```

通过 useCounter 函数的调用，就可以得到内部 return 出来的对象，这样就可以在.vue 文件中进行功能的使用，从而实现功能的复用逻辑。

# 利用 defineProps 与 defineEmits 进行组件通信

在组合式 API 中，是通过 defineProps 与 defineEmits 来完成组件之间的通信。

## defineProps

defineProps 是用来完成父子通信的，基本使用跟选项式中的 props 非常的像，代码如下：

```vue
// parent.vue
<template>
  <div>
    <h2>父子通信</h2>
    <my-child :count="0" message="hello world"></my-child>
  </div>
</template>
<script setup>
import MyChild from "@/child.vue";
</script>

// child.vue
<template>
  <div>
    <h2>hi child, {{ count }}, {{ message }}</h2>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const state = defineProps({
  // defineProps -> 底层 -> reactive响应式处理的
  count: {
    type: Number,
  },
  message: {
    type: String,
  },
});
console.log(state.count, state.message);
</script>
```

## defineEmits

defineEmits 是用来完成子父通信的，基本使用跟选项式中的 emits 非常的像，代码如下：

```vue
// parent.vue
<template>
  <div>
    <h2>子父通信</h2>
    <my-child @custom-click="handleClick"></my-child>
  </div>
</template>
<script setup>
import MyChild from "@/child.vue";
let handleClick = (data) => {
  console.log(data);
};
</script>

// child.vue
<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["custom-click"]);
setTimeout(() => {
  emit("custom-click", "子组件的数据");
}, 2000);
</script>
```

# 利用组合式 API 开发复杂的搜索功能

从本小节我们要完成章节介绍中出现的搜索页面，利用组合式 API 去实现。先进行开发前的准备工作。

## 数据接口

后端地址：https://github.com/Binaryify/NeteaseCloudMusicApi

后端接口：

​ 搜索建议：/search/suggest?keywords=海阔天空

​ 搜索结果：/search?keywords=海阔天空

## 反向代理

由于我们的前端是 localhost:8080，而后端是 localhost:3000，这样会存在跨域问题，所以可以通过脚手架下的 vue.config.js 进行反向代理的配置。

```javascript
// vue.config.js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
```

## 布局与样式

我们提前把布局和样式做好了，直接在上面进行逻辑的开发，可直接查看 13_search.vue 这个文件，到此我们已经准备好了开发前的准备工作。

# 利用组合式 API 开发搜索提示列表

本小节完成搜索页面的提示列表功能。

```vue
<template>
  <div class="search-input">
    <i class="iconfont iconsearch"></i>
    <input
      type="text"
      placeholder="搜索歌曲"
      v-model="searchWord"
      @input="handleToSuggest"
    />
    <i v-if="searchWord" @click="handleToClose" class="iconfont iconguanbi"></i>
  </div>
  <template v-if="searchType == 1"> ... </template>
  <template v-else-if="searchType == 2"> ... </template>
  <template v-else-if="searchType == 3">
    <div class="search-suggest">
      <div class="search-suggest-head">搜索“ {{ searchWord }} ”</div>
      <div
        class="search-suggest-item"
        v-for="item in suggestList"
        :key="item.id"
        @click="handleItemResult(item.name), handleAddHistory(item.name)"
      >
        <i class="iconfont iconsearch"></i>{{ item.name }}
      </div>
    </div>
  </template>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import "@/assets/iconfont/iconfont.css";

function useSearch() {
  let searchType = ref(1);
  let searchWord = ref("");
  let handleToClose = () => {
    searchWord.value = "";
    searchType.value = 1;
  };
  return {
    searchType,
    searchWord,
    handleToClose,
  };
}

function useSuggest() {
  let suggestList = ref([]);
  let handleToSuggest = () => {
    if (searchWord.value) {
      searchType.value = 3;
      axios
        .get(`/api/search/suggest?keywords=${searchWord.value}`)
        .then((res) => {
          let result = res.data.result;
          if (!result.order) {
            return;
          }
          let tmp = [];
          for (let i = 0; i < result.order.length; i++) {
            tmp.push(...result[result.order[i]]);
          }
          suggestList.value = tmp;
        });
    } else {
      searchType.value = 1;
    }
  };
  return {
    suggestList,
    handleToSuggest,
  };
}

let { searchType, searchWord, handleToClose } = useSearch();
let { suggestList, handleToSuggest } = useSuggest();
</script>
```

# 利用组合式 API 开发搜索结果列表

本小节完成搜索页面的结果列表功能。

```vue
<template>
  <div class="search-input">
    <i class="iconfont iconsearch"></i>
    <input
      type="text"
      placeholder="搜索歌曲"
      v-model="searchWord"
      @input="handleToSuggest"
      @keydown.enter="handleToResult($event)"
    />
    <i v-if="searchWord" @click="handleToClose" class="iconfont iconguanbi"></i>
  </div>
  <template v-if="searchType == 1"> ... </template>
  <template v-else-if="searchType == 2">
    <div class="search-result">
      <div class="search-result-item" v-for="item in resultList" :key="item.id">
        <div class="search-result-word">
          <div>{{ item.name }}</div>
        </div>
        <i class="iconfont iconbofang"></i>
      </div>
    </div>
  </template>
  <template v-else-if="searchType == 3"> ... </template>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import '@/assets/iconfont/iconfont.css';

function useSearch(){
  ...
}
function useSuggest(){
  ...
}
function useResult(){
  let resultList = ref([]);
  let handleToResult = () => {
    if(!searchWord.value){
      return;
    }
    axios.get(`/api/search?keywords=${searchWord.value}`).then((res)=>{
      let result = res.data.result;
      if(!result.songs){
        return;
      }
      searchType.value = 2;
      resultList.value = result.songs;
    })
  };
  let handleItemResult = (name) => {
    searchWord.value = name;
    handleToResult();
  };
  return {
    resultList,
    handleToResult,
    handleItemResult
  }
}

let { searchType, searchWord, handleToClose } = useSearch();
let { suggestList, handleToSuggest } = useSuggest();
let { resultList, handleToResult, handleItemResult } = useResult();
</script>
```

# 利用组合式 API 开发搜索历史列表

本小节完成搜索页面的历史列表功能。

```vue
<template>
  <div class="search-input">
    <i class="iconfont iconsearch"></i>
    <input
      type="text"
      placeholder="搜索歌曲"
      v-model="searchWord"
      @input="handleToSuggest"
      @keydown.enter="handleToResult($event), handleAddHistory($event)"
    />
    <i v-if="searchWord" @click="handleToClose" class="iconfont iconguanbi"></i>
  </div>
  <template v-if="searchType == 1">
    <div class="search-history">
      <div class="search-history-head">
        <span>历史记录</span>
        <i class="iconfont iconlajitong" @click="handleToClear"></i>
      </div>
      <div class="search-history-list">
        <div
          v-for="item in historyList"
          :key="item"
          @click="handleItemResult(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="searchType == 2"> ... </template>
  <template v-else-if="searchType == 3"> ... </template>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import '@/assets/iconfont/iconfont.css';

function useSearch(){
  ...
}
function useSuggest(){
  ...
}
function useResult(){
  ...
}
function useHistory(){
  let key = 'searchHistory';
  let getSearchHistory = () => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  };
  let setSearchHistory = (list) => {
    localStorage.setItem(key, JSON.stringify(list));
  };
  let clearSearchHistory = () => {
    localStorage.removeItem(key);
  };
  let historyList = ref(getSearchHistory());
  let handleAddHistory = (arg) => {
    if(!searchWord.value){
      return;
    }
    if(typeof arg === 'string'){
      searchWord.value = arg;
    }
    historyList.value.unshift(searchWord.value);
    historyList.value = [...new Set(historyList.value)];
    setSearchHistory(historyList.value);
  };
  let handleToClear = () => {
    clearSearchHistory();
    historyList.value = [];
  };
  return {
    historyList,
    handleAddHistory,
    handleToClear
  };
}

let { searchType, searchWord, handleToClose } = useSearch();
let { suggestList, handleToSuggest } = useSuggest();
let { resultList, handleToResult, handleItemResult } = useResult();
let { historyList, handleAddHistory, handleToClear } = useHistory();
</script>
```
