## Promise

### 理解

Promise 是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

（1）Promise 的实例有三个状态:

- Pending（进行中）
- Resolved（已完成）
- Rejected（已拒绝）

当把一件事情交给 promise 时，它的状态就是 Pending，任务完成了状态就变成了 Resolved、没有完成失败了就变成了 Rejected。

（2）Promise 的实例有两个过程：

- pending -> fulfilled : Resolved（已完成）
- pending -> rejected：Rejected（已拒绝）

注意：一旦从进行状态变成为其他状态就永远不能更改状态了。

### 特点

对象的状态不受外界影响。promise 对象代表一个异步操作，有三种状态，pending（进行中）、fulfilled（已成功）、rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是 promise 这个名字的由来——“承诺”；一旦状态改变就不会再变，任何时候都可以得到这个结果。promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled，从 pending 变为 rejected。这时就称为 resolved（已定型）。如果改
变已经发生了，你再对 promise 对象添加回调函数，也会立即得到这个结果。这与事件（event）完全不同，事件的特点是：如果你错过了它，再去监听是得不到结果的。

### 缺点

无法取消 Promise，一旦新建它就会立即执行，无法中途取消。如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 解决的问题

回调地狱

### 总结

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。

> 注意：在构造 Promise 的时候，构造函数内部的代码是立即执行的

## async/await

### 理解

async/await 其实是 Generator 的语法糖，它能实现的效果都能用 then 链来实现，它是为优化 then 链而开发出来的。从字面上来看，async 是“异步”的简写，await 则为等待，所以很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。当然语法上强制规定 await 只能出现在 asnyc 函数中，先来看看 async 函数返回了什么：

```js
async function testAsync() {
  return "hello";
}
const result = testAsync();
console.log(result);
```

![image-20230830114130680](https://qn.huat.xyz/mac/202308301141708.png)

所以，async 函数返回的是一个 Promise 对象。async 函数（包含函数语句、函数表达式、Lambda 表达式）会返回一个 Promise 对象，如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。

async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，当然应该用原来的方式：then() 链来处理这个 Promise 对象，就像这样：

```js
async function testAsync() {
  return "hello";
}
const result = testAsync();
console.log(result);
result.then((res) => {
  console.log(res);
});
```

那如果 async 函数没有返回值，又该如何？很容易想到，它会返回 Promise.resolve(undefined)。

联想一下 Promise 的特点——无等待，所以在没有 await 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。

注意：Promise.resolve(x) 可以看作是 new Promise(resolve =>resolve(x)) 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 Promise 实例。

### 优势

单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。仍然用 setTimeout 来模拟异步操作：

```js
function sleep(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n + 200);
    }, n);
  });
}

function step1(n) {
  console.log(`step1 with ${n}`);
  return sleep(n);
}

function step2(n) {
  console.log(`step2 with ${n}`);
  return sleep(n);
}

function step3(n) {
  console.log(`step3 with ${n}`);
  return sleep(n);
}
```

现在用 Promise 方式来实现这三个步骤的处理：

```js
function handleStep() {
  console.time("handleStep");
  const time1 = 300;
  step1(time1)
    .then((time2) => step2(time2))
    .then((time3) => step3(time3))
    .then((res) => {
      console.log(`res is ${res}`);
      console.timeEnd("handleStep");
    });
}

handleStep();

// step1 with 300
// step2 with 500
// step3 with 700
// res is 900
// handleStep: 1669.44091796875 ms
```

输出结果 result 是 step3() 的参数 700 + 200 = 900。doIt() 顺序执行了三个步骤，一共用了 300 + 500 + 700 = 1500 毫秒，和 console.time()/console.timeEnd() 计算的结果一致。

如果用 async/await 来实现呢，会是这样：

```js
async function handleStep() {
  console.time("handleStep");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step1(time2);
  const res = await step1(time3);
  console.log(`res is ${res}`);
  console.timeEnd("handleStep");
}

handleStep();

// step1 with 300
// step2 with 500
// step3 with 700
// res is 900
// handleStep: 1669.44091796875 ms
```

结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样

## async/await 对比 Promise 的优势

代码读起来更加同步，Promise 虽然摆脱了回调地狱，但是 then 的链式调用也会带来额外的阅读负担

Promise 传递中间值非常麻烦，而 async/await 几乎是同步的写法，非常优雅

错误处理友好，async/await 可以用成熟的 try/catch，Promise 的错误捕获非常冗余

调试友好，Promise 的调试很差，由于没有代码块，你不能在一个返回表达式的箭头函数中设置断点，如果你在一个.then 代码块中使用调试器的步进(step-over)功能，调试器并不会进入后续的.then 代码块，因为调试器只能跟踪同步代码的每一步。
