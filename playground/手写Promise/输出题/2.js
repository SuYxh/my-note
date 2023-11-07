async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// console.log('script start') 打印 script start。
// setTimeout(function() { console.log('setTimeout'); }, 0); 将 setTimeout 回调排入宏任务队列。
// async1() 被调用：
// 打印 async1 start。
// 调用 await async2()，该函数调用 async2()：
// async2() 执行并打印 async2。
// await 暂停了 async1() 中剩余代码的执行，并将它们（console.log('async1 end')）放入微任务队列。
// new Promise(function(resolve) { console.log('promise1'); resolve(); }) 执行并打印 promise1，同时 .then(function() { console.log('promise2'); }) 被加入微任务队列。
// console.log('script end') 打印 script end。
// 微任务开始执行，首先打印 async1 end，然后是 promise2。
// 宏任务队列现在执行 setTimeout 回调，打印 setTimeout。
