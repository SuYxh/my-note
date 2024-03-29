vue

### 1.请描述下对vue生命周期的理解

- 创建前后
- 载入前后
- 更新前后
- 销毁前后
- Keep-alive
- 错误捕获

![image-20231103125237615](https://qn.huat.xyz/mac/202311031252642.png)



beforeCreate -> created

- 初始化 vue 实例，进行数据观测

created

- 完成数据观测，属性与方法的运算，watch、event 事件回调的配置
- 可调用 methods 中的方法，访问和修改data数据触发响应式渲染 dom，可通过 computed 和Owatch 完成数据计算
- 此时 vm.$el 并没有被创建

created -> beforeMount

- 判断是否存在 el 选项，若不存在则停止编译，直到调用 vm.$mount(el) 才会继续编译。
- 优先级: render > template > outerHTML
- vm.el 获取到的是挂载 DOM 的

beforeMount

- 在此阶段可获取到 vm.el
- 此阶段 vm.eL 虽已完成DOM初始化，但并未挂载在 el 选项上

beforeMount -> mounted

- 此阶段 vm.eL 完成挂载，vm.$el 生成的 DOM 替换了 el 选项所对应的 DOM

mounted

- vm.eL 已完成 DOM 的挂载与渲染，此刻打印 vm.$eL ，发现之前的挂载点及内容已被替换成新的DOM

beforeUpdate

- 更新的数据必须是被渲染在模板上的 (el、template 、render 之一)
- 此时 view 层还未更新
- 若在 beforeUpdate 中再次修改数据，不会再次触发更新方法

updated

- 完成 view 层的更新
- 若在 updated 中再次修改数据，会再次触发更新方法 ( beforeUpdate、updated )

beforeDestroy

- 实例被销毁前调用，此时实例属性与方法仍可访问0

destroyed

- 完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
- 并不能清除DOM，仅仅销毁实例



![image-20231103130104546](https://qn.huat.xyz/mac/202311031301577.png)

![image-20231103130137138](https://qn.huat.xyz/mac/202311031301162.png)

数据请求在created和mouted的区别

created 是在组件实例一旦创建完成的时候立刻调用，这时候页面 dom 节点并未生成;mounted 是在页面 dom 节点渲染完毕之后就立刻执行的。触发时机上 created 是比 mounted 要更早的，两者的相同点:都能拿到实例对象的属性和方法。讨论这个问题本质就是触发的时机，放在 mounted 中的请求有可能导致页面闪动 (因为此时页面 dom 结构已经构成，但如果在页面加载前完成请求，则不会出现此情况。建议对页面内容的改动放在 created 生命周期当中。



### 2.双向数据绑定是什么

我们先从单向绑定切入，单向绑定非常简单，就是把 Model 绑定到 View ，当我们用 JavaScript 代码更新 Model时， View 就会自动更新。双向绑定就很容易联想到了，在单向绑定的基础上，用户更新了 View ，Model 的数据也自动被更新了。



原理

我们都知道 Vue 是数据双向绑定的框架，双向绑定由三个重要部分构成：

- 数据层 (Model) : 应用的数据及业务逻辑
- 视图层 (View) :应用的展示效果，各类UI组件
- 业务逻辑层 (ViewModel) : 框架封装的核心，它负责将数据与视图关联起来

而上面的这个分层的架构方案，可以用一个专业术语进行称呼: MVVM 这里的控制层的核心功能便是数据双向绑定”。



理解ViewMode

它的主要职责就是:

- 数据变化后更新视图

- 视图变化后更新数据

当然，它还有两个主要部分组成

- 监听器 (Observer) : 对所有数据的属性进行监听

- 解析器 (Compiler): 对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数



实现双向绑定

我们还是以 Vue 为例，先来看看 Vue 中的双向绑定流程是什么的

1.new Vue() 首先执行初始化，对 data 执行响应化处理，这个过程发生 0bserve 中

2.同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中

3.同时定义一个更新函数和 Watcher ，将来对应数据变化时 Watcher 会调用更新函数

4.由于 data 的某个 key 在一个视图中可能出现多次，所以每个 key 都需要一个管家 Dep 来管理多个 Watcher

5.将来data中数据一旦发生变化，会首先找到对应的 Dep ，通知所有 watcher 执行更新函数

![image-20231103131005083](https://qn.huat.xyz/mac/202311031310126.png)



依赖收集

视图中会用到 data 中某 key ，这称为依赖。同一个 key 可能出现多次，每次都需要收集出来用个 Watcher 来维护它们，此过程称为依赖收集多个 watcher 需要一个 Dep 来管理，需要更新时由 Dep 统一通知

![image-20231103131105601](https://qn.huat.xyz/mac/202311031311628.png)

实现思路

1.defineReactive 时为每一个 key 创建一个 Dep 实例

2.初始化视图时读取某个 key ，例如 name1 ，创建一个 watcher1

3.由于触发 name1 的 getter 方法，便将 watcher1 添加到 name1 对应的Dep中

4.当 name1 更新，setter 触发时，便可通过对应 Dep 通知其管理所有 Watcher 更新



### 3.Vue组件之间的通信方式都有哪些?

组件间通信的分类可以分成以下

- 父子组件之间的通信

- 兄弟组件之间的通信
- 祖孙与后代组件之间的通信
- 非关系组件间之间的通信

![图片](https://qn.huat.xyz/mac/202402071646381.png)



整理 vue 中8种常规的通信方案

1.通过 props 传递

2.通过 $emit 触发自定义事件

3.使用 ref

4.EventBus

5、parent或 root

6、attrs 与 listeners

7、Provide 与 Inject

8、Vuex



父子关系的组件数据传递选择 props$emit 进行传递，也可选择 ref

与兄弟关系的组件数据传递可选择 $bus ，其次可以选择 $parent 进行传递

祖先与后代组件数据传递可选择 attrs 与 listeners 或者 Provide 与Inject

复杂关系的组件数据传递可以通过 vuex 存放共享的变量



### 4.为什么data属性是一个函数而不是一个对象?

- 根实例对象 data 可以是对象也可以是函数 (根实例是单例），不会产生数据污染情况
- 组件实例对象 data 必须为函数，目的是为了防止多个组件实例对象之间共用一个 data ，产生数据污染。采用函数的形式， initData 时会将其作为工厂函数都会返回全新 data 对象



### 5.动态给vue的data添加一个新的属性时会发生什么?怎样解决?

数据更新了但页面并没有更新。

原因是一开始 obj 的 foo 属性被设成了响应式数据，而 bar 是后面新增的属性，并没有通过 0bject.defineProperty 设置成响应式数据

Vue 不允许在已经创建的实例上动态添加新的响应式属性

若想实现数据与视图同步更新，可采取下面三种解决方案

- Vue.set()

- Object.assign()

  直接使用 0bject.assign() 添加到对象的新属性不会触发更新，应创建一个新的对象，合并原对象和混入对象的属性

  ![image-20231103132409912](https://qn.huat.xyz/mac/202311031324952.png)

- $forcecUpdated()



- 如果为对象添加少量的新属性，可以直接采用 Vue.set()
- 如果需要为新对象添加大量的新属性，则通过 0bject.assign()创建新对象
- 如果你实在不知道怎么操作时，可采取 $forceUpdate() 进行强制刷新 (不建议)

>  vue3 是用过 proxy 实现数据响应式的，直接动态添加新属性仍可以实现数据响应式



### 6.v-if和v-for的优先级是什么?

v-for 优先级是比v-if 高

<img src="https://qn.huat.xyz/mac/202311031326843.png" alt="image-20231103132627814" style="zoom:50%;" />



### 7.v-show和v-if有什么区别?使用场景分别是什么?

共同点

- 当表达式为 true 的时候，都会占据页面的位置
- 当表达式都为 false 时，都不会占据页面位置

区别：

- 控制手段不同

  控制手段: v-show 隐藏则是为该元素添加 css--display:none ，dom 元素依旧还在。 v-if 显示隐藏是将 dom 元素整个添加或删除

- 编译过程不同

  编译过程: v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件;v-show 只是简单的基于css切换

- 编译条件不同

  编译条件: v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染

- 性能消耗:v-if 有更高的切换消耗;v-show 有更高的初始渲染消耗:



注意

v-show 由 false 变为 true 的时候不会触发组件的生命周期

v-if 由 false 变为 true 的时候，触发组件的 beforeCreate 、create 、beforeMount 、mounted 钩子，由 true 变为 false 的时候触发组件的 beforeDestory 、destoryed 方法



### 8.你知道vue中key的原理吗?说说你对它的理解（38页）

key是给每一个vnode的唯一id，也是dif的一种优化策略，可以根据key，更准确，更快的找到对应的vnode节点



### 9.说说你对vue的mixin的理解，有什么应用场景?

当组件存在与 mixin 对象相同的选项的时候，进行递归合并的时候组件的选项会覆盖 mixin 的选项但是如果相同选项为生命周期钩子的时候，会合并成一个数组，先执行 mixin 的钩子，再执行组件的钩子



替换型策略有 propsmethods 、inject 、computed就是将新的同名参数替代旧的参数

合并型策略是 data，通过 set 方法进行合并和重新赋值

队列型策略有生命周期函数和 watch ，原理是将函数存入一个数组，然后正序遍历依次执行0filters ,通过原型链进行层层的叠加

叠加型有 component、directives



### 10.Vue常用的修饰符有哪些有什么应用场景

在程序世界里，修饰符是用于限定类型以及类型成员的声明的一种符号在 Vue 中，修饰符处理了许多 DOM 事件的细节，让我们不再需要花大量的时间去处理这些烦恼的事情，而能有更多的精力专注于程序的逻辑处理vue 中修饰

符分为以下五种:

- 表单修饰符
  - lazy
  - trim
  - number
- 事件修饰符
  - stop
  - Prevent
  - once
  - Self
- 鼠标按键修饰符
  - left
  - right
  - Middle
- 键值修饰符
- v-bind修饰符
  - Async



### 11.NextTick是什么

我们可以理解成， Vue 在更新DOM 时是异步执行的。当数据发生变化， Vue 将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新



为什么要有这个呢？

如果没有nextTick 更新机制，那么 num 每次更新值都会触发视图更新(上面这段代码也就是会更新10万次视图)，有了 nextTick 机制，只需要更新一次，所以 nextTick 本质是一种优化策略。





1.把回调函数放入callbacks等待执行

2.将执行函数放到微任务或者宏任务中

3.事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调



### 12.Vue实例挂载的过程

- new Vue 的时候调用会调用init 方法

  定义 $set、$get$delete 、$watch 等方法

  定义 $on、$off 、$emit 、$off 等事件

  定义_update $forceUpdate $destroy 生命周期

- 调用 $mount 进行页面的挂载
- 挂载的时候主要是通过 mountComponent 方法
- 定义 updateComponent 更新函数
- 执行 render 生成虚拟 DOM
- _update 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中



### 13.你了解vue的diff算法吗? 

82 页面



- 当数据发生改变时，订阅者 watcher 就会调用 patch 给真实的 DOM 打补丁

- 通过 isSameVnode 进行判断，相同则调用 patchVnode 方法
- patchVnode 做了以下操作:
  - 找到对应的真实 dom ，称为 el
  - 如果都有都有文本节点且不相等，将 el 文本节点设置为 Vnode 的文本节点
  - 如果 oldVnode 有子节点而 VNode 没有，则删除 el 子节点
  - 如果 oldVnode 没有子节点而 VNode 有，则将 VNode 的子节点真实化后添加到 el
  - 如果两者都有子节点，则执行 updateChildren 函数比较子节点

- updateChildren 主要做了以下操作:
    - 设置新旧 VNode 的头尾指针
    - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用 patchVnode 进行 patch 重复流程、调用 createElem 创建一个新节点，从哈希表寻找 key 一致的 VNode 节点再分情况操作



### 14.Vue中组件和插件有什么区别?

组件

组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念(组件)来实现开发的模式，在 Vue 中每一个vue 文件都可以视为一个组件



插件通常用来为Vue添加全局功能。插件的功能范围没有严格的限制一般有下面几种

- 添加全局方法或者属性。如: vue-custom-element
- 添加全局资源: 指令/过滤器/过渡等。如 vue-touch
- 通过全局混入来添加一些组件选项。如 vue-router
- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype上实现.
- 一个库，提供自己的API ，同时提供上面提到的一个或多个功能。如 vue-router



两者的区别主要表现在以下几个方面

- 编写形式
- 注册形式
- 使用场景



组件(Component)是用来构成你的 App 的业务模块，它的目标是 App.vue

插件(Plugin)是用来增强你的技术栈的功能模块，它的目标是 Vue 本身简单来说，插件就是指对 Vue 的功能的增强或补充



### 15.Vue项目中你是如何解决跨域的呢?



### 16.有写过自定义指令吗?自定义指令的应用场景有哪些?

<img src="https://qn.huat.xyz/mac/202311031739143.png" alt="image-20231103173939074" style="zoom:50%;" />

自定义指令也像组件那样存在钩子函数:

bind : 只调用一次，指令第一次绑定到元索时调用。在这里可以进行一次性的初始化设置

inserted : 被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)

update : 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新

componentUpdated : 指令所在组件的 VNode 及其子 VNode 全部更新后调用

unbind : 只调用一次，指令与元秦解绑时调用



权限、copy、懒加载



### 17.Vue中的过滤器了解吗?过滤器的应用场景有哪些?

过滤器 ( filter ) 是输送介质管道上不可缺少的一种装置大白话，就是把一些不必要的东西过滤掉过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解其为一个纯函数

- 在编译阶段通过 parseFilters 将过滤器编译成函数调用 (串联过滤器则是一个嵌套的函数调用，前一个过滤器执行的结果是后一个过滤器函数的参数)
- 编译后通过调用 resoLveFilter 函数找到对应过滤器并返回结果
- 执行结果作为参数传递给 toString 函数，而 toString 执行后，其结果会保存在 Vnode 的text 属性中，渲染到视图



### 18.说说你对slot的理解? slot使用场景有哪些?

Slot 艺名插槽，花名“占坑”，我们可以理解为 solt 在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑 (替换组件模板中 slot 位置) ，作为承载分发内容的出口

- 默认插槽

- 具名插槽

- 作用域插槽

  子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件 v-slot 接受的对象上
  父组件中在使用时通过 v-slot: (简写: #) 获取子组件的信息



- v-slot 属性只能在` <template>` 上使用，但在只有默认插槽时可以在组件标签上使用

- 默认插槽名为 default ，可以省略default直接写 v-slot
- 缩写为 # 时不能不写参数，写成 #default
- 可以通过解构获取 v-slot={user}，还可以重命名 v-slot="{user:newName}”和定义默认值 v-slot="{user ="默认值J"




slot 本质上是返回 VNode 的函数，一般情况下，Vue 中的组件要渲染到页面上需要经过 templa-> render function -> VNode -> DOM 过程，



### 19.什么是虚拟DOM? 如何实现一个虚拟DOM? 说说你的思路

虚拟 DOM ( virtual DOM )这个概念相信大家都不陌生，从React 到 Vue ，虚拟 DOM 为这两个框架都带来了跨平台的能力 ( React-Native 和 Weex)

实际上它只是一层对真实 DOM 的抽象，以 JavaScript 对象( VNode 节点)作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上

在 Javascript 对象中，虚拟 DOM 表现为一个 0bject 对象。并且最少包含标签名( tag )、属性( attrs )和子元素对象( children )三个属性，不同框架对这三个属性的名命可能会有差别创建虚拟 DOM 就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟 DOM 对象的节点与真实 DOM 的属性一一照应



创建 VNode 的过程，每个 VNode 有 children ，createElementchildren 每个元素也是一个 VNode ，这样就形成了一个虚拟树结构，用于描述真实的 DOM 树结构



### 20.Vue项目中有封装过axios吗?主要是封装哪方面的?

- 从浏览器中创建XMLHttpRequests从 node.js 创建 http 请求支持 PromiseAPI
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON数据
- 客户端支持防御 XSRF



### 21.是怎么处理vue项目中的错误的?

主要的错误来源包括:

- 后端接口错误
- 代码中本身逻辑错误



全局错误处理

![image-20231103200947525](https://qn.huat.xyz/mac/202311032009555.png)



生命周期钩子- errorCaptured

此钩子会收到三个参数: 错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播



使用`try...catch`捕获异步函数中的错误



```js
// **捕获全局同步错误**：可以使用`window.onerror`。
window.onerror = function (message, source, lineno, colno, error) {
  // 处理全局错误
  console.error(error);
  return true; // 阻止默认的错误处理
};

// **捕获未处理的Promise拒绝**：使用`window.addEventListener`监听`unhandledrejection`事件。
window.addEventListener('unhandledrejection', function (event) {
  // 处理Promise中未捕获的错误
  console.error(event.reason);
});
```







参考官网，错误传播规则如下:

- 默认情况下，如果全局的 config.errorHandler 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报
- 如果一个组件的继承或父级从属链路中存在多个 errorCaptured 钩子，则它们将会被相同的错误逐个唤起。
- 如果此 errorCaptured 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 config.errorHandler
- 一个 errorCaptured 钩子能够返回 false 以阻止错误继续向上传播，本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 errorCaptured 钩子和全局的 config.errorHandler





### 23.vue要做权限管理该怎么做?

- 接口权限
- 路由权限
- 按钮权限
- 菜单权限



### 24.说说你对keep-alive的理解是什么?

keep-alive 是 vue 中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM

keep alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

keep-alive 可以设置以下 props 属性:

- incLude - 字符串或正则表达式。只有名称匹配的组件会被缓存
- excLude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
- max - 数字。最多可以缓存多少组件实例

![image-20231103202342395](https://qn.huat.xyz/mac/202311032023425.png)



### 25.你对SPA单页面的理解，它的优缺点分别是什么?如何实现SPA应用呢

SPA (single-page application)，翻译过来就是单页应用 SPA 是一种网络应用程序或网站的模型，通过动态重写当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验在单页应用中，所有必要的代码 ( HTML 、 JavaScript 和 CSS )都通过单个页面的加载而检索，或者根据需要 (通常是为响应用户操作》动态装载适当的资源并添加到页面页面在任何时间点都不会重新加载，也不会将控制转移到其他页面举个例子来讲就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子

![image-20231103202541276](https://qn.huat.xyz/mac/202311032025308.png)

![image-20231103202552406](https://qn.huat.xyz/mac/202311032025437.png)



优点:

- 具有桌面应用的即时性、网站的可移植性和可访问性。
- 用户体验好、快，内容的改变不需要重新加载整个页
- 面良好的前后端分离，分工更明确

缺点:

- 不利于搜索引擎的抓取
- 首次渲染速度相对较慢





如何给SPA做SEO

1、SSR

2、静态化

3、使用 Phantomjs针对爬虫处理



### 26.SPA首屏加载速度慢的怎么解决?

首屏时间 (First Contentful Paint)，指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容

首屏加载可以说是用户体验中最重要的环节

![image-20231103203000485](https://qn.huat.xyz/mac/202311032030514.png)



加载慢的原因：

网络延时问题
资源文件体积是否过大
资源是否重复发送请求去加载了

加载脚本的时候，渲染内容堵塞了



常见的优化方案：

- 减小入口文件积

常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加。 在 vue-router 配置路由的时候，采用动态加载路由的形式。以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件

- 静态资源本地缓存

  - 后端返回资源问题:
    - 采用 HTTP 缓存，设置 Cache-Control ，Last-Modified ，Etag 等响应头
    - 采用 Service Worker 离线缓存

  - 前端合理利用 LocalStorage

- UI框架按需加载

- 图片资源的压缩

- 组件重复打包

  假设 A.js 文件是一个常用的库，现在有多个路由使用了 A.js 文件，这就造成了重复下载

  解决方案: 在 webpack 的 config 文件中，修改 CommonsChunkPlugin 的配置

  minChunks 为3表示会把使用3次及以上的包抽离出来，放进公共依赖文件，避免了重复加载组件

- 开启GZip压缩

  拆完包之后，我们再用 gzip 做一下压缩 安装 compression-webpack-plugin

  在 vue.congig.js 中引入并修改 webpack 配置

  ![image-20231103212750059](https://qn.huat.xyz/mac/202311032127091.png)


  在服务器我们也要做相应的配置 如果发送请求的浏览器支持 gzip ，就发送给它 gzip 格式的文件 我的服务器是用 express 框架搭建的 只要安装一下 compression 就能使用

- 使用SSR



减少首屏渲染时间的方法有很多，总的来讲可以分成两大部分 : 资源加载优化 和 页面渲染优化下图是更为全面的首屏优化的方案



### 27.vue项目本地开发完成后部署到服务器后报404是什么原因呢?



### 28.SSR解决了什么问题?有做过SSR吗? 你是怎么做的?

Server-Side Rendering我们称其为 SSR ，意为服务端渲染

指由服务侧完成页面的 HTML结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件成为完全可交互页面的过程

先来看看 Web 3个阶段的发展史:

- 传统服务端渲染SSR

  网页内容在服务端渲梁完成，一次性传输到浏览器
  打开页面查看源码，浏览器拿到的是全部的 dom 结构

- 单页面应用SPA

  单页应用优秀的用户体验，使其逐渐成为主流，页面内容由 JS 渲染出来，这种方式称为客户端渲打开页面查看源码，浏览器拿到的仅有宿主元索 #app ，并没有内容

- 服务端渲染SSR

  SSR 解决方案，后端渲染出完整的首屏的 dom 结构返回，前端拿到的内容包括首屏及完整 spa 结构，应用激活后依然按照 spa 方式运行



我们从上门解释得到以下结论:

- Vue SSR 是一个在 SPA 上进行改良的服务端渲染。
- 通过 Vue SSR 渲染的页面，需要在客户端激活才能实现交互
- Vue SSR 将包含两部分:服务端渲染的首屏，包含交互的 SPA



SSR主要解决了以下两种问题:

- seo: 搜索引擎优先爬取页面 HTML 结构，使用 ssr 时，服务端已经生成了和业务想关联的 HTML ，有利于 seo
- 首屏呈现渲染: 用户无需等待页面所有 js 加载完成就可以看到页面视图 (压力来到了服务器，所以需要权衡哪些用服务端渲染，哪些交给客户端)

但是使用 SSR 同样存在以下的缺点:

- 复杂度:整个项目的复杂度
- 库的支持性，代码兼容
- 性能问题
  - 每个请求都是 n 个实例的创建，不然会污染，消耗会变得很大
  - 缓存 node serve 、nginx 判断当前用户有没有过期，如果没过期的话就缓存，用刚刚的结果。
  - 降级: 监控 cpu 、内存占用过多，就 spa ，返回单个的壳服务器负载变大，相对于前后端分离服务器只需要提
- 供静态资源来说，服务器负载更大，所以要慎重使用

所以在我们选择是否使用 SSR 前，我们需要慎重问问自己这些问题:

1.需要 SEO 的页面是否只是少数几个，这些是否可以使用预渲染 (Prerender SPA Plugin) 实现

2.首屏的请求响应逻辑是否复杂，数据返回是否大量且缓慢



如何实现：

![image-20231103213857389](https://qn.huat.xyz/mac/202311032138423.png)



### 29.vue3有了解过吗? 能说说跟vue2的区别吗?

从上图中，我们可以概览 Vue3 的新特性，如下:

- 速度更快

  vue3 相比 vue2

  - 重写了虚拟 Dom 实现
  - 编译模板的优化
  - 更高效的组件初始化
  - undate 性能提高1.3~2倍
  - SSR 速度提高了2~3倍

- 体积减少

  通过 webpack 的 tree-shaking 功能，可以将无用模块“剪辑”，仅打包需要的能够 tree-shaking ，有两大好处:

  - 对开发人员，能够对 vue 实现更多其他的功能，而不必担忧整体体积过大
  - 对使用者，打包出来的包体积变小了
  vue 可以开发出更多其他的功能，而不必担忧 vue 打包出来的整体体积过多

- 更易维护

  conposition api

- 更接近原生

  可以自定义渲染API

- 更易使用

- 更好的 ts 支持



vue3的新特性

- framents
- Teleport
- composition Api
- createRenderer

![image-20231103214913636](https://qn.huat.xyz/mac/202311032149670.png)





非兼容性变更



Global API

全局 Vue API 己更改为使用应用程序实例
全局和内部API 已经被重构为可 tree-shakable



模板指令

- 组件上 v-modeL 用法已更改
- `<template v-for>` 和非` v-for` 节点上` key`用法已更改
- 在同一元素上使用的`v-if` 和`v-for` 优先级已更改
- `v-bind="object"`现在排序敏感
- `v-for` 中的 `ref` 不再注册` ref` 数组



组件

- 只能使用普通函数创建功能组件

- functional 属性在单文件组件(SFC)

- 异步组件现在需要defineAsyncComponent 方法来创建



其他改变

- destroyed 生命周期选项被重命名为 unmounted
- beforeDestroy 生命周期选项被重命名为 beforeUnmount
- [prop default 工厂函数不再有权访问 this 是上下文
- 自定义指令 API已更改为与组件生命周期一致
- data 应始终声明为函数
- 来自 mixin 的 data 选项现在可简单地合并
- attribute 强制策略已更改
- 一些过渡 class 被重命名
- 组建 watch 选项和实例方法 Swatch 不再支持以点分隔的字符串路径。请改用计算属性函数作为参数。
- `<template>` 没有特殊指令的标记( v-if/else-if/else 、v-for 或 v-slot )现在被视为普通元素，并将生成原生的`<template>` 元素，而不是渲染其内部内容.
- 在 Vue 2.x 中，应用根容器的 outerHTML 将替换为根组件模板(如果根组件没有模板/渲染选项，则最终编译为模板)。 Vue 3.x 现在使用应用容器的 innerHTML ，这意味着容器本身不再被视为模板的一部分。



移除API

- keyCode支持作为 v-on的修饰符实例方法
- $on ,$off 和 $once
- 过滤 filter
- 内联模板 attribute
- $destroy 实例方法。用户不应再手动管理单个 Vue 组件的生命周期





### 30、依赖收集

**依赖收集的过程**：

1. 当组件被渲染时，它的数据会被访问，这时 Vue 的响应式系统会将当前的 Watcher（视图的渲染函数或计算属性等）注册到被访问数据的 Dep 中。
2. 每个数据对象通过 getter/setter 转换为响应式对象。当这些数据的 getter 被调用时，当前的 Watcher 就会被添加到数据的 Dep 中。这就是“依赖收集”的过程。
3. 当数据变更时，它的 setter 会被调用，然后通知 Dep，Dep 再通知所有订阅它的 Watcher 对象，告诉它们数据已经改变。
4. Watcher 接收到变化的通知后，会执行更新函数，触发组件的重新渲染或执行相应的操作。

**Dep 和 Watcher 和组件的对应关系**：

- 每个组件实例通常都有一个或多个 Watcher 实例（视图渲染 Watcher、计算属性 Watcher 等）。
- 每个响应式数据（例如，组件的 data 中的属性）都关联一个 Dep 实例。
- 当组件渲染或计算属性被求值时，组件中用到的响应式数据的 Dep 就会收集当前的 Watcher。
- 如果数据变化，它的 Dep 会通知所有收集的 Watcher，然后 Watcher 会触发组件的更新。





### 31、v-model

在 Vue.js 中，`v-model` 指令是一个语法糖，用于在表单输入和应用状态之间创建双向绑定。它的工作原理和在 Vue 2 与 Vue 3 中的实现有一些区别。

#### Vue 2 中的 `v-model`

在 Vue 2 中，`v-model` 默认是一个结合了 `value` 属性和 `input` 事件的语法糖。当用在文本输入框（`<input>`、`<textarea>`）和单选按钮（`<input type="radio">`）时，`v-model` 会自动使用对应的 `value` 属性和 `input` 事件；而用在复选框（`<input type="checkbox">`）和选择列表（`<select>`）时，它会处理 `checked` 属性和 `change` 事件。

自定义组件使用 `v-model` 时，默认会使用 `value` 作为 prop 和 `input` 作为事件。如果要自定义这些名称，需要在组件中手动处理。

#### Vue 3 中的 `v-model`

Vue 3 重新设计了 `v-model`，以支持在一个组件上使用多个 `v-model` 绑定。现在，`v-model` 默认传递 `modelValue` 作为 prop 和 `update:modelValue` 作为事件。这使得在自定义组件上使用 `v-model` 时更加灵活，并允许绑定多个值。

在 Vue 3 中，你可以通过定义 prop 的 `modelValue` 和事件的 `update:modelValue` 来自定义 `v-model` 的行为。此外，你还可以使用 `v-model:propName` 来为不同的 prop 创建多个 `v-model` 绑定。

#### `v-model` 的原理

`v-model` 本质上是语法糖，它结合了用户输入事件监听和数据属性的更新。在内部，Vue 会根据使用 `v-model` 的上下文自动选择正确的方式来监听事件和更新数据。

例如，在使用 `<input>` 元素时：

```html
<input v-model="searchText">
```

这段代码实质上会被编译成：

```html
<input
  :value="searchText"
  @input="e => { searchText = e.target.value }">
```

这样，当用户在输入框中输入文本时，`searchText` 数据属性会被更新，同时如果 `searchText` 属性变化，输入框的显示内容也会更新。

在自定义组件中，使用 `v-model` 会要求组件接收一个 `modelValue` 的 prop，并在内部的某个事件触发时发出一个 `update:modelValue` 事件，携带新的值。

在面试中讲解 `v-model` 的这些区别和原理，可以展示你对 Vue 双向数据绑定机制的深入理解。



### 32、diff 算法

"Vue 的 diff 算法是其响应式系统的核心部分，主要用于高效地更新真实 DOM。这个算法通过对比新旧虚拟 DOM（VNode）树来实现，关注同一层级的节点变化，而不跨越不同层级，因为跨层级比较会带来巨大的性能负担。

算法的基础是双端比较策略，其中新旧 VNode 列表的头尾节点互相比较，识别可复用的节点。这种方法有效地减少了从列表头到尾的遍历次数。

关键点之一是 `key` 属性，它为每个 VNode 提供一个独特的标识符，使得 Vue 能够追踪和重用 DOM 元素，减少了不必要的元素创建和销毁，优化了性能。

在比较过程中，如果两个 VNode 类型不同，旧节点会被替换成新节点；如果类型相同，Vue 会递归对比它们的子节点，并应用必要的 DOM 更新。当节点位置变化时，Vue 会移动它们而不是销毁和重建，这也极大地节约了性能。

Vue 还对静态节点进行了优化处理，因为静态节点内容不会变化，Vue 在初次渲染后会跳过它们的 diff 过程。

总的来说，Vue 的 diff 算法通过智能的启发式策略和细粒度的更新，确保了应用的高效性能，同时也简化了开发者的工作。在面试中，你可以强调这个算法如何在不牺牲开发体验的同时，提供了优异的性能表现。" 



- 当数据发生改变时，订阅者 watcher 就会调用 patch 给真实的 DOM 打补丁

- 通过 isSameVnode 进行判断，相同则调用 patchVnode 方法
- patchVnode 做了以下操作:
  - 找到对应的真实 dom ，称为 el
  - 如果都有都有文本节点且不相等，将 el 文本节点设置为 Vnode 的文本节点
  - 如果 oldVnode 有子节点而 VNode 没有，则删除 el 子节点
  - 如果 oldVnode 没有子节点而 VNode 有，则将 VNode 的子节点真实化后添加到 el
  - 如果两者都有子节点，则执行 updateChildren 函数比较子节点

- updateChildren 主要做了以下操作:
  - 设置新旧 VNode 的头尾指针
  - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用 patchVnode 进行 patch 重复流程、调用 createElem 创建一个新节点，从哈希表寻找 key 一致的 VNode 节点再分情况操作









### Composition API 

在逻辑组织和逻辑复用方面，Composition API 是优于 Options API。因为 Composition API 几乎是函数，会有更好的类型推断。

Composition API 对 tree-shaking 友好，代码也更容易压缩

Composition API 中见不到 this 的使用，减少了 this 指向不明的情况

如果是小型组件，可以继续使用 0ptions API，也是十分友好的







### 实现 model 组件





### Vue3.0性能提升主要是通过哪几方面体现的?

#### 编译阶段

##### diff算法优化

vue3 在 diff 算法中相比 vue2 增加了静态标记关于这个静态标记，其作用是为了会发生变化的地方添加一个 flag 标记，下次发生变化的时候直接找该地方进行比较，下图这里，已经标记静态节点的 p 标签在 diff 过程中则不会比较，把性能进一步提高

![图片](https://qn.huat.xyz/mac/202402072214103.png)



##### 静态提升

Vue3 中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用。

模板：

```
<span> 你好！ </span>
<div>{{ message }}</div>
```

render 函数：

```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _createVNode("span", null, "你好"),
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
```

静态提升以后：

```js
const _hoisted_1 = /*#__PURE__*/_createVNode("span", null, "你好", -1 /* HOISTED */);

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _hoisted_1,
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
```

静态内容 `_hoisted_1` 被放置在 render 函数外，每次渲染的时候只要取`_hoisted_1` 即可同时`_hoisted_1` 被打上了 PatchFlag ，静态标记值为 -1，特殊标志是负整数表示永远不会用于 Diff



##### 事件监听缓存

默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化。

```
<div>
 <button @click = 'onClick'>点我</button>
</div>
```

没开启事件监听缓存

```js
export const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _ctx.onClick
    }, "点我", 8 /* PROPS */, ["onClick"])
    // PROPS = 1 << 3, // 8 动态属性，但不包含类名和样式
  ]))
})
```

开启事件监听缓存

```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))
    }, "点我")
  ]))
}
```

上述发现开启了缓存后，没有了静态标记。也就是说下次 diff 算法的时候直接使用。



##### SSR优化

当静态内容大到一定量级时候，会用 createStaticVNode 方法在客户端去生成一个static node，这些静态 node ，会被直接 innerHtmL，就不需要创建对象，然后根据对象渲染

```
<div>
  <div>
  	<span>你好</span>
  </div>
  ... // 很多静态属性
  <div>
  <span>{{ message }}</span>
  </div>
</div>
```

编译后

```js
import { mergeProps as _mergeProps } from "vue";
import { ssrRenderAttrs as _ssrRenderAttrs, ssrInterpolate as _ssrInterpolate } from "@vue/server-renderer";

export function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _cssVars = { style: { color: _ctx.color }};

  _push(`<div${_ssrRenderAttrs(_mergeProps(_attrs, _cssVars))}><div><span>你好</span>...</div><div><span>你好</span><div><span>${_ssrInterpolate(_ctx.message)}</span></div></div></div>`);
}
```

#### 源码体积

相比 Vue2，Vue3 整体体积变小了，除了移出一些不常用的API，再重要的是 Tree shanking任何一个函数，如 ref 、reavtived、computed 等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小



#### 响应式系统

vue2 中采用 defineProperty 来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加 getter 和 setter ，实现响应式。
vue3 采用 proxy 重写了响应式系统，因为 proxy 可以对整个对象进行监听，所以不需要深度遍历。可以监听动态属性的添加可以监听到数组的索引和数组 length 属性。可以监听删除属性



### Vue3 响应式

Object.defineProperty 存在的问题：

- 检测不到对象属性的添加和删除
- 数组 API 方法无法监听到
- 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题



Proxy 不兼容IE，也没有 polyfill，defineProperty 能支持到IE9
