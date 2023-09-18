const read = require("../all/read");

/*
  Promise函数对象的race方法
  返回一个promise对象，状态由第一个完成的promise决定
  */
/* Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 遍历promises，获取每个promise的结果
    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        value => {
          // 只要有一个成功，返回的promise的状态九尾resolved
          resolve(value)

        },
        reason => { //只要有一个失败，return的promise状态就为reject
          reject(reason)
        }
      )
    })
  })
} */

Promise.race = function (array) {
  return new Promise((resolve, reject) => {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      // console.log(element)
      Promise.resolve(element).then((res) => {
        resolve(res);
      }, reject);
    }
  });
};

Promise.race([
  read("./age.txt"),
  read("./content.txt"),
  read("./name.txt"),
]).then((res) => {
  console.log("[res]", res);
});
