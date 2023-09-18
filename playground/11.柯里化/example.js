// add(1)(2)(3)

function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
// 上述函数改写
const add2 = (a) => (b) => (c) => a + b + c;

let x1 = add(1)(2)(3);
let x2 = add2(1)(2)(3);

// console.log(x1, x2);

// 封装 柯里化函数

function sum(a, b, c) {
  return a + b + c;
}

let createCurry = (fn, ...args) => {
  // console.log(this);
  let arr = args || [];
  // console.log('arr', arr);
  let length = fn.length;
  // console.log('length', length);
  return (...res) => {
    // console.log('res', res)
    let newArr = arr.slice(0);
    newArr.push(...res);
    if (res.length > 0 || newArr.length < length) {
      console.log("-->", this);
      return createCurry.call(this, fn, ...newArr);
    } else {
      console.log("2-->", this);
      return fn.apply(this, newArr);
    }
  };
};

function createCurry2(fn, ...args) {
  let arr = args || [];
  const length = fn.length;
  return (...params) => {
    let newArr = arr.slice();
    newArr.push(...params);
    if (params.length > 0 || newArr.length < length) {
      console.log("this-1", this);
      return createCurry2.call(this, fn, ...newArr);
    } else {
      console.log("this-2", this);
      return fn.apply(this, newArr);
    }
  };
}

let xCurry = createCurry2(sum);

let ff = xCurry(1)(2)(9);

console.log(ff());

// let sumCurry = createCurry(sum)

// let f = sumCurry(1)(2)(3)

// console.log(f())

// console.log(sumCurry(1)(2)(3));

// 柯里化特点1 -- 参数复用

/* function reg(reg, txt) {
  return reg.test(txt)
}

console.log(reg(/\d+/g, "test"));
console.log(reg(/\[a-z]+/g, "test"));


function curryReg(reg) {
  return function (txt) {
    return reg.test(txt)
  }
}

let hasNumber = curryReg(/\d+/g)
let hasStr = curryReg(/\[a-z]+/g)
console.log(hasNumber("test"))
console.log(hasNumber("test1"))
console.log(hasStr("test1")) */

// 柯里化特点
// ![](http://qn.huat.xyz/content/20210522232844.png)

/**
 * @description: 写法二 柯里化
 * @param {*} fn
 * @param {array} args
 * @return {*}
 */
function currying(fn, ...args) {
  const length = fn.length;
  let allArgs = [...args];
  const res = (...newArgs) => {
    allArgs = [...allArgs, ...newArgs];
    if (allArgs.length === length) {
      return fn(...allArgs);
    } else {
      return res;
    }
  };
  return res;
}

// 用法如下：
// const add = (a, b, c) => a + b + c;
// const a = currying(add, 1);
// console.log(a(2,3))
