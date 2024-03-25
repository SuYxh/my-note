

### 懒加载图片

### 懒加载组件

### 异步组件

### 扁平化 Store 数据结构



### KeepAlive

在非优化场景下，我们每次点击按钮切换路由视图，都会重新渲染一次组件，渲染组件就会经过组件初始化，`render`、`patch` 等过程，如果组件比较复杂，或者嵌套较深，那么整个渲染耗时就会很长。

而在使用 `KeepAlive` 后，被 `KeepAlive` 包裹的组件在经过第一次渲染后，的 `vnode` 以及 DOM 都会被缓存起来，然后再下一次再次渲染该组件的时候，直接从缓存中拿到对应的 `vnode` 和 DOM，然后渲染，并不需要再走一次组件初始化，`render` 和 `patch` 等一系列流程，减少了 `script` 的执行时间，性能更好。

但是使用 `KeepAlive` 组件并非没有成本，因为它会占用更多的内存去做缓存，这是一种典型的空间换时间优化思想的应用。





### v-if 和 v-show 区分使用场景

**v-if** 是 **真正** 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

**v-show** 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

### computed 和 watch 区分使用场景

**computed：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

**运用场景：**

-   当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
    
-   当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
    

### v-for 遍历必须为 item 添加 key，且避免同时使用 v-if

**（1）v-for 遍历必须为 item 添加 key**

在列表数据进行遍历渲染时，需要为每一项 item 设置唯一 key 值，方便 Vue.js 内部机制精准找到该条列表数据。当 state 更新时，新的状态值和旧的状态值对比，较快地定位到 diff 。

**（2）v-for 遍历避免同时使用 v-if**

v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候，必要情况下应该替换成 computed 属性。

**推荐：**

```
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id">
    {{ user.name }}
  </li>
</ul>
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
	 return user.isActive
    })
  }
}
```

**不推荐：**

```
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

### 长列表性能优化

Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 Object.freeze 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

```
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
```

### 事件的销毁

Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。 如果在 js 内使用 addEventListene 等方式是不会自动销毁的，我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露，如：

```
created() {
  addEventListener('click', this.click, false)
},
beforeDestroy() {
  removeEventListener('click', this.click, false)
}
```

### 图片资源懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 Vue 的 vue-lazyload 插件：

（1）安装插件

```
npm install vue-lazyload --save-dev
```

（2）在入口文件 man.js 中引入并使用

```
import VueLazyload from 'vue-lazyload'
```

然后再 vue 中直接使用

```
Vue.use(VueLazyload)
```

或者添加自定义选项

```
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
```

（3）在 vue 文件中将 img 标签的 src 属性直接改为 v-lazy ，从而将图片显示方式更改为懒加载显示：

```
<img v-lazy="/static/img/1.png">
```

以上为 vue-lazyload 插件的简单使用，如果要看插件的更多参数选项，可以查看 vue-lazyload 的 [github 地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fhilongjw%2Fvue-lazyload "https://github.com/hilongjw/vue-lazyload")。

### 路由懒加载

Vue 是单页面应用，可能会有很多的路由引入 ，这样使用 webpcak 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。这样会大大提高首屏显示的速度，但是可能其他的页面的速度就会降下来。

**路由懒加载：**

```
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

### 第三方插件的按需引入

我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 `babel-plugin-component` ，然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 element-ui 组件库为例：

（1）首先，安装 `babel-plugin-component` ：

```
npm install babel-plugin-component -D
```

（2）然后，将 .babelrc 修改为：

```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

（3）在 main.js 中引入部分组件：

```
import Vue from 'vue';
import { Button, Select } from 'element-ui';

 Vue.use(Button)
 Vue.use(Select)
```

### 优化无限列表性能

如果你的应用存在非常长或者无限滚动的列表，那么需要采用 窗口化 的技术来优化性能，只需要渲染少部分区域的内容，减少重新渲染组件和创建 dom 节点的时间。 你可以参考以下开源项目 [vue-virtual-scroll-list](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftangbc%2Fvue-virtual-scroll-list "https://github.com/tangbc/vue-virtual-scroll-list") 和 [vue-virtual-scroller](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FAkryum%2Fvue-virtual-scroller "https://github.com/Akryum/vue-virtual-scroller") 来优化这种无限列表的场景的。

### 服务端渲染 SSR

服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。

**（1）服务端渲染的优点：**

-   更好的 SEO： 因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；
    
-   更快的内容到达时间（首屏加载更快）： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；
    

**（2）服务端渲染的缺点：**

-   更多的开发条件限制： 例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
    
-   更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。
    

如果你的项目的 SEO 和 首屏渲染是评价项目的关键指标，那么你的项目就需要服务端渲染来帮助你实现最佳的初始加载性能和 SEO，具体的 Vue SSR 如何实现，可以参考作者的另一篇文章《[Vue SSR 踩坑之旅](https://juejin.cn/post/6844903824956588040 "https://juejin.cn/post/6844903824956588040")》。如果你的 Vue 项目只需改善少数营销页面（例如  `/， /about， /contac`t 等）的 SEO，那么你可能需要**预渲染**，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点，具体你可以使用 [prerender-spa-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fchrisvfritz%2Fprerender-spa-plugin "https://github.com/chrisvfritz/prerender-spa-plugin") 就可以轻松地添加预渲染 。





### 预渲染

其实把上面的优化做完，优化到5秒以内没问题了，但是如果像我司前端页面100多个，比较大的项目，可能还是会有点慢。

上面我们做了那么多，都是基于js执行完以后进行的渲染，如果想要更快一点，还有两种方案，一种是ssr也就是服务端渲染，一种就是预渲染。

预渲染是在js加载前，就生成了一个首页的静态页面，用于加载，不会让你等着了，静态页面的性能不用说了吧，嗖嗖的。

预渲染依赖的是prerender-spa-plugin插件，使用起来也非常的简单,但是坑非常多，一个地方尊重不到就会报错：

#### 安装

```
cnpm install prerender-spa-plugin --save-dev
```

建议使用淘宝镜像的cnpm，因为npm安装经常失败，血泪教训，倒腾了一上午

#### vue.config.js

```javascript
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

在plugins下面，找到plugins对象，直接加到上面就行
// 预渲染配置
new PrerenderSPAPlugin({
    //要求-给的WebPack-输出应用程序的路径预渲染。
    staticDir: path.join(__dirname, 'dist'),
    //必需，要渲染的路线。
    routes: ['/login'],
    //必须，要使用的实际渲染器，没有则不能预编译
    renderer: new Renderer({
        inject: {
            foo: 'bar'
        },
        headless: false, //渲染时显示浏览器窗口。对调试很有用。  
        //等待渲染，直到检测到指定元素。
        //例如，在项目入口使用`document.dispatchEvent(new Event('custom-render-trigger'))` 
        renderAfterDocumentEvent: 'render-event'
    })
})
```

#### router.js

需要把vue的router模式设置成history模式

#### main.js

在创建vue实例的mounted里面加一个事件，跟PrerenderSPAPlugin实例里面的renderAfterDocumentEvent对应上。

```javascript
mounted () {
    document.dispatchEvent(new Event('render-event'))
 }, 
```

这是预渲染的基本配置，npm run build 一下，如果dist文件夹多了你想预渲染的文件夹，那么恭喜你，成功了！如果项目是用nginx做的代理，nginx还需要做一些配置，具体是：

```bash
location = / {
  try_files /home/index.html /index.html;
}

location / {
  try_files $uri $uri/ /index.html;
}
```

具体的根据自己需要欲渲染的路由自己配。虽然花了一天的时间，实现了预渲染，但是因为项目之前用的是hash路由，预渲染需要改成history模式，需要修改登录地址，我司用几千个终端商户，计划被迫流产。但是确实很快，适用于自己用的后台、新项目。



### 参考

https://juejin.cn/post/6857856269488193549



https://juejin.cn/post/6844903677262561293



https://juejin.cn/post/6922641008106668045

