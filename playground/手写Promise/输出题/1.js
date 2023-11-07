Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    setTimeout(() => {
      console.log("setTimeout 2");
    }, 0);
  })
  .then(() => {
    console.log("Promise 2");
  });

setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("Promise 3");
  });
}, 0);

// Promise.resolve() 立即解析，并且 .then(() => console.log('Promise 1')) 也会立即执行，输出 Promise 1。
// 在第一个 .then() 中，setTimeout() 被排入宏任务队列，将会在当前执行栈清空后执行。
// 因为Promise的 .then() 方法具有微任务的性质，所以 .then(() => console.log('Promise 2')) 将会在宏任务（setTimeout）之前执行，输出 Promise 2。
// 第一个 setTimeout() 被调用，输出 setTimeout 1，然后 Promise.resolve().then(() => console.log('Promise 3')) 将 Promise 3 加入微任务队列。
// 执行栈再次清空，此时队列中的微任务 Promise 3 执行，输出 Promise 3。
// 最后执行的是 setTimeout(() => console.log('setTimeout 2'))，输出 setTimeout 2。
