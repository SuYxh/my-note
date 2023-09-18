/* Function.prototype.before = function before(callback) {
  if (typeof callback !== "function") throw new TypeError('callback must be function');
  // this->func
  let _self = this;
  return function proxy(...params) {
    // this !== func 调用时候才知道
    //控制callback和func本身的先后执行顺序
    // console.log(this)
    callback.call(this, ...params);
    return _self.call(this, ...params);
  };
};
Function.prototype.after = function after(callback) {
  if (typeof callback !== "function") throw new TypeError('callback must be function');
  let _self = this;
  return function proxy(...params) {
    let res = _self.call(this, ...params);
    callback.call(this, ...params);
    return res;
  };
}; */

/* let func = () => {
  // 主要的业务逻辑
  console.log('func');
};
func.before(() => {
  console.log('===before===');
})();
 */

// func.before(() => {
//     console.log('===before===');
// }).after(() => {
//     console.log('===after===');
// })();

/* function handle(func, before, after) {
    before();
    func();
    after();
} */

Function.prototype.before = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be function");
  }
  const self = this;
  return function proxy(...params) {
    callback.call(this, ...params);
    return self.call(this, ...params);
  };
};

Function.prototype.before2 = function (callback) {
  const self = this;
  return function proxy(...params) {
    callback.call(this, ...params);
    return self.call(this, ...params);
  };
};

Function.prototype.after = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be function");
  }
  const self = this;
  return function proxy(...params) {
    const result = self.call(this, ...params);
    callback.call(this, ...params);
    return result;
  };
};

let func = () => {
  console.log("主要的业务逻辑");
};

// func.before(() => {
//   console.log('日志记录');
// }).after(() => {
//   console.log("记录ip")
// })()

class AopPro {
  preform(cb, wrap) {
    wrap.forEach((item) => item.init());
    cb();
    wrap.forEach((item) => item.close());
  }
}

const aop = new AopPro();

aop.preform(func, [
  {
    init() {
      console.log("start1");
    },
    close() {
      console.log("close1");
    },
  },
  {
    init() {
      console.log("start2");
    },
    close() {
      console.log("close2");
    },
  },
]);

Function.prototype.before3 = function (cb) {
  const self = this;
  return function proxy(...params) {
    cb.call(this, ...params);
    return self.call(this, ...params);
  };
};

func.before3(() => {
  console.log("---------->");
})();
