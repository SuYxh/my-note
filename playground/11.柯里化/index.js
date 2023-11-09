function curry(func) {
  debugger;
  console.log("func.length", func.length);
  return function curried(...args) {
    console.log("curried", args);
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function curry(func) {
  let length = func.length;

  return function curried(...agrs) {
    if (agrs.length >= length) {
      return func.apply(this, agrs);
    } else {
      return function (...params) {
        return curried.apply(this, agrs.concat(params));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const add = curry(sum);

console.log(add);

// console.log(sum(1,2,3));

console.log(add(1)(2)(3));

// 匹配 一个大于0小于1的小数，最多有3位小数 0.004 0.005
// const reg = /^0\.(?!0+$)\d{1,3}$/gi
// console.log(reg.test('0.004'))

// 只允许最多3位数的数字
// const reg = /^[1-9][0-9]{0,2}$/gi
// console.log(reg.test('223'))

// 只允许最多3位数的数字 或者 0
// const reg = /0|^[1-9][0-9][0-9]$/gi

const reg = /0|^[1-9][0-9]{0,2}$/gi;
console.log(reg.test("1244"));
