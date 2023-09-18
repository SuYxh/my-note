/*
 * @Author: 时光@
 * @Date: 2022-07-04 23:20:29
 * @LastEditTime: 2022-07-04 23:20:30
 * @Description: 判断对象是否存在循环引用
 */

function isHasCircle(obj) {
  let hasCircle = false;
  const map = new Map();

  function loop(obj) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      const value = obj[key];
      if (typeof value == "object" && value !== null) {
        if (map.has(value)) {
          hasCircle = true;
          return;
        } else {
          map.set(value);
          loop(value);
        }
      }
    });
  }

  loop(obj);

  return hasCircle;
}

const obj = {
  a: 1,
  b: 2,
};

obj.c = obj;

// isHasCircle函数， 存在环输出true，不存在的话输出false

// console.log(isHasCircle(obj))

function isCircle(obj) {
  let flag = false;
  const set = new Set();
  const loop = (obj) => {
    const keys = Reflect.ownKeys(obj);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = obj[key];
      if (typeof value === "object" && value != null) {
        if (set.has(value)) {
          flag = true;
          return;
        } else {
          set.add(value);
          loop(value);
        }
      }
    }
  };
  loop(obj);
  return flag;
}
console.log(isCircle(obj));
