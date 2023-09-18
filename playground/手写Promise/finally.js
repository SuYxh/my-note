let p = new Promise((resolve, reject) => {
  resolve("ok");
});

/* 
Promise.prototype.finally = function (cb) {
  return p.then(res => {
    cb()
    return res
  }, err => {
    console.log(err);
    cb()
    throw err
  })
}
 */

/* 

Promise.prototype.finally = function (callback) {
  return this.then((data) => {
    // 如果 callback 返回的是 promise ，Promise.resolve可以等待promise执行完成
    return Promise.resolve(callback()).then(() => data);
    // return new Promise((resolve,reject)=>{
    //     resolve(callback()); // 如果callback是一个函数返回promise 就等待这个promise执行完毕
    // }).then(()=>data);
    // callback();
    // return data;
  }, (err) => {
    return Promise.resolve(callback()).then(() => { throw err }); // koa 原理
    // throw err;
  });
};
*/

/* Promise.prototype.finally = function (cb) {
  return this.then(res => {
    // cb()
    return Promise.resolve(cb()).then(() => res)
  }, err => {
    return Promise.resolve(cb()).then(() => {
      throw err
    })
    // console.log(err);
    // cb()
    // throw err
  })
} */

Promise.prototype.finally = function (cb) {
  return this.then(
    (res) => {
      return Promise.resolve(cb()).then(() => res);
    },
    (err) => {
      return Promise.resolve(cb()).then(() => {
        throw err;
      });
    }
  );
};

p.then((res) => console.log("res", res))
  .catch((err) => console.log("err", err))
  .finally(() => {
    // console.log('爱XS，爱生活')
    new Promise((resolve, reject) => {
      resolve("cb");
    }).then((res) => console.log("cb-res", res));
  });
