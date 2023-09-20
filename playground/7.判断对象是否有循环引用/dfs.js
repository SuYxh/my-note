import data from "./data.js";

function hasCircularReference(obj, visited = new Set()) {
  // 如果是基本类型或 null，则不存在循环引用
  if (typeof obj !== "object" || obj == null) {
    return false;
  }

  // 检查是否已经访问过该对象，存在循环引用
  if (visited.has(obj)) {
    return true;
  }

  // 将该对象添加到已访问集合中
  visited.add(obj);

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (hasCircularReference(obj[key], visited)) {
        return true;
      }
    }
  }

  // 不存在循环引用
  return false;
}

function aaa(obj, cache = new Set()) {
  if (typeof obj !== "object" || obj == null) {
    return false;
  }

  if (cache.has(obj)) {
    return true;
  }

  cache.add(obj);

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (aaa(obj[key], cache)) {
        return true;
      }
    }
  }

  return false;
}

function test() {
  console.log("是否存在循环引用", hasCircularReference(data));
  console.log("是否存在循环引用->", aaa(data));
}

export default {
  hasCircularReference,
  test,
};
