const shop = [
  { price: 100, count: 10 },
  { price: 500, count: 20 },
  { price: 99, count: 19 },
];

const total = shop.reduce((total, current) => {
  return total + current.price * current.count;
}, 0);

// console.log('total', total);

const keys = ["name", "age"];
const values = ["yxh", 18];

const obj = keys.reduce((obj, current, index) => {
  obj[current] = values[index];
  return obj;
}, {});

// console.log(obj)

function sum(a, b) {
  return a + b;
}

function toUpper(str) {
  return str.toLocaleUpperCase();
}

function add(str) {
  return "***" + str + "***";
}

// 需求 ： 给定2个字符串，先拼接，在转大写，在求字符串的长度
// 一般写法
add(toUpper(sum("yxh", "fe")));
console.log(add(toUpper(sum("yxh", "fe"))));

// const compose = (...fns) => {
//   return (...args) => {
//     const lastFn = fns.pop()
//     return fns.reduceRight((a, b) => {
//       return b(a)
//     }, lastFn(...args))
//   }
// }

// 简化上述代码
const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((a, b) => b(a), fns.pop()(...args));

// const compose2 = function (...fns) {
//   return fns.reduce((a, b) => {
//     return (...args) => {
//       return a(b(...args))
//     }
//   })
// }
const compose2 = (...fns) =>
  fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );

const r = compose(add, toUpper, sum)("yxh", "fe");
const r2 = compose2(add, toUpper, sum)("yxh", "fe");

console.log(r, r2);

// 去重
let arr = [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3];

// const newArr = arr.reduce((a, b) => {
//   return a.includes(b) ? a : a.concat(b)
// }, [])

const newArr = arr.reduce((a, b) => (a.includes(b) ? a : a.concat(b)), []);

// 模拟

Array.prototype.x_reduce = function (callback, prev) {
  for (let i = 0; i < array.length; i++) {
    if (prev == undefined) {
      prev = callback(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }

  return prev;
};
