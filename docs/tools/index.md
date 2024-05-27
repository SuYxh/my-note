# 工具

### 常用 Hook

![1df4b9c6d84649b4f9629b456d1369a1](https://qn.huat.xyz/mac/202405271718474.png)





### nest 生命周期



![image-20240527153400686](https://qn.huat.xyz/mac/202405271534753.png)







### diff算法

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



### vue3和vue2的区别

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



### Vue3.0性能提升主要是通过哪几方面体现的?

#### 编译阶段

##### diff算法优化

vue3 在 diff 算法中相比 vue2 增加了静态标记关于这个静态标记，其作用是为了会发生变化的地方添加一个 flag 标记，下次发生变化的时候直接找该地方进行比较，下图这里，已经标记静态节点的 p 标签在 diff 过程中则不会比较，把性能进一步提高



#### 源码体积

相比 Vue2，Vue3 整体体积变小了，除了移出一些不常用的API，再重要的是 Tree shanking任何一个函数，如 ref 、reavtived、computed 等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小



#### 响应式系统

vue2 中采用 defineProperty 来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加 getter 和 setter ，实现响应式。
vue3 采用 proxy 重写了响应式系统，因为 proxy 可以对整个对象进行监听，所以不需要深度遍历。可以监听动态属性的添加可以监听到数组的索引和数组 length 属性。可以监听删除属性







### 说一说对react中类组件和函数组件的理解，有什么区别？

类组件：通过使用 ES6 类的编写形式去编写组件，该类必须继承 React.Compone
如果想要访问父组件传递过来的参数，可通过 this.props 的方式去访问在组件中必须实现 render 方法，在 return 中返回 React 对象

函数组件：通过函数的形式编写react组件

针对两种 React 组件，其区别主要分成以下几大方向

- 编写形式

- 状态管理

  在 hooks 出来之前，函数组件就是无状态组件，不能保管组件的状态，，不像类组件中调用 setState

- 生命周期

  在函数组件中，并不存在生命周期，这是因为这些生命周期钩子都来自于继承的 React.Component所以，如果用到生命周期，就只能使用类组件但是函数组件使用 useEffect 也能够完成替代生命周期的作用

- 调用方式

  如果是一个函数组件，调用则是执行函数即可。

  如果是一个类组件，则需要将组件进行实例化，然后调用实例对象的 render 方法



### 说说react的事件机制

React 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等
在 React 中这套事件机制被称之为合成事件。合成事件是 React 模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器。根据W3C 规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口。

- React 所有事件都挂载在 document 对象上
- 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件
- 所以会先执行原生事件，然后处理 React 事件
- 最后真正执行 document 上挂载的事件



所以想要阻止不同时间段的冒泡行为，对应使用不同的方法，对应如下

阻止合成事件间的冒泡，用e.stopPropagation()

阻止合成事件与最外层 document 上的事件间的冒泡，用e.nativeEvent.stoplmmediatePropagation()

阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免

```js
document.body.addEventListener('click', e => { 
 if (e.target && e.target.matches('div.code')) { 
 	return; 
 } 
 this.setState({ active: false, }); });
}
```



### 为什么需要 Fiber？

传统的 React reconciliation 过程是同步的，并且一旦开始就不能中断。这意味着一旦开始更新组件，React 必须完成这个过程，即便这会导致主线程长时间被占用，从而影响到应用的响应性和性能。对于复杂的应用来说，这可能导致用户感知到的卡顿。

#### Fiber 的工作原理

Fiber 的核心思想是将渲染工作分割成小块。每一个 React 元素都对应一个 Fiber 节点，这个节点包含了组件的类型、属性等信息。这些节点构成了一个工作单元，React 在处理这些工作单元时可以根据需要暂停、中断、恢复或者丢弃。

Fiber 架构引入了几个关键概念：

1. **Fiber Node**：每个 React 组件都有一个对应的 Fiber 节点，它描述了组件的结构和状态。
2. **Work in Progress Tree**：React 在内存中维护了一个当前页面的副本，称为 work-in-progress tree。这使得 React 可以在内存中执行更新操作，而不直影响 DOM，直到操作完成。
3. **Reconciliation**：Fiber 重新实现了 reconciliation 算法，允许任务分割成小块并且可以优先处理高优先级的更新。
4. **Scheduling**：Fiber 架构可以对更新任务进行调度，决定什么时候执行哪个任务，以及如何利用空闲时间。

#### 怎样理解 Fiber？

可以将 Fiber 理解为一个执行单元，每个 Fiber 节点代表 React 渲染中的一个工作单元。React 使用这些单元来跟踪和调度每个组件的渲染工作。通过这种方式，React 可以更智能地管理资源，优化响应速度和渲染性能。这也使得 React 能够执行如时间切片（time slicing）和懒加载（lazy loading）这样的高级功能。







### 反转链表

```js
function reversal(list) {
  let prev = null;
  let curr = list;

  while (curr) {
    const tmp = curr.next;

    curr.next = prev;

    prev = curr;

    curr = tmp;
  }

  return prev;
}
```



### 反转数组

```js
function handler(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let tmp = arr[start];
    arr[start] = arr[end];
    arr[end] = tmp;

    start++;
    end--;
  }

  return arr;
}
```



### 环形链表

```js
// 检测链表是否有环的函数
var hasCycle = function (head) {
  if (head === null) return false;

  let slow = head; // 慢指针
  let fast = head; // 快指针

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next; // 慢指针移动一步
    fast = fast.next.next; // 快指针移动两步

    if (slow === fast) {
      // 如果快慢指针相遇，则表示有环
      return true;
    }
  }

  // 如果快指针到达链表尾部，则表示没有环
  return false;
};
```



### 合并有序链表

```js
function mergeTwoLists(l1, l2) {
  let l3 = new SingleListNode(0);

  let p1 = l1;
  let p2 = l2;
  let p3 = l3;

  while (p1 || p2) {
    const val1 = p1.value ? p1.value : 0;
    const val2 = p2.value ? p2.value : 0;

    p3.next = new SingleListNode(val1 > val2 ? val2 : val1);
    p3.next.next = new SingleListNode(val1 > val2 ? val1 : val2);

    if (p1) {
      p1 = p1.next;
    }
    if (p2) {
      p2 = p2.next;
    }
    p3 = p3.next.next;
  }

  return l3.next;
}
```







### 快排

```js
function quick(ary) {
  // 4.结束递归（当ARY中小于等于一项，则不用处理）
  if (ary.length <= 1) {
    return ary;
  }
  // 1.找到数组的中间项，在原有的数组中把它移除
  let middleIndex = Math.floor(ary.length / 2);
  let middleValue = ary.splice(middleIndex, 1)[0];
  // 2.准备左右两个数组，循环剩下数组中的每一项，比当前项小的放到左边数组中，反之放到右边数组中
  let aryLeft = [],
    aryRight = [];
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    item < middleValue ? aryLeft.push(item) : aryRight.push(item);
  }
  // 3.递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止（最后让左边+中间+右边拼接成为最后的结果）
  return quick(aryLeft).concat(middleValue, quick(aryRight));
}
```





### 爬楼梯

```js

function climbStairs(n) {
  if (n < 2) {
    return 1;
  }

  const dp = [1, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```





### 反转二叉树

```js
function invertTree(root) {
  if (root === null) {
    return null;
  }

  // 交换左右子树
  [root.left, root.right] = [root.right, root.left];

  // 递归地反转子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
}
```

