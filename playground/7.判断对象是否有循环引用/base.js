/*
 * @Author: 时光@
 * @Date: 2022-07-04 23:20:29
 * @LastEditTime: 2023-09-20 17:37:00
 * @Description: 判断对象是否存在循环引用
 */

import data from "./data.js";

// isHasCircle函数， 存在环输出true，不存在的话输出false
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

function test() {
  console.log("是否存在循环引用", isHasCircle(data));
}

export default {
  isHasCircle,
  test,
};
