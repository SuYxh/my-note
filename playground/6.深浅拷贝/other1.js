/*
 * @Author: 时光@
 * @Date: 2022-07-04 23:14:09
 * @LastEditTime: 2022-07-04 23:14:09
 * @Description: 其他版本的深浅拷贝
 */

function isObject(val) {
  return typeof val === "object" && val !== null;
}

function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj;
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let target = Array.isArray(obj) ? [] : {};
  hash.set(obj, target);
  Reflect.ownKeys(obj).forEach((item) => {
    if (isObject(obj[item])) {
      target[item] = deepClone(obj[item], hash);
    } else {
      target[item] = obj[item];
    }
  });

  return target;
}
