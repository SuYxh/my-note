import data from "./data.js";

function toType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function each(obj, cb) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const item = obj[i],
        result = cb.call(item, item, i);
      if (result === false) break;
    }
    return obj;
  }

  const keys = Reflect.ownKeys(obj);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index],
      item = obj[key],
      result = cb.call(item, item, key);
    if (result === false) break;
  }
  return obj;
}

// 浅克隆
function shallowClone(obj) {
  // if (obj == null) return Object(obj)
  if (obj == null) return obj;
  let type = toType(obj),
    Ctor = obj.constructor;
  if (/^(symbol|bigint)$/i.test(type)) return Object(obj);
  if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);
  if (/^error$/i.test(type)) return new Ctor(obj.message);
  if (/^function$/i.test(type)) {
    // console.log("wai", this)
    return function () {
      // console.log("nei", this)
      return obj.call(this, ...arguments);
    };
  }
  if (/^(object|array)$/i.test(type)) {
    // let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)],
    let result = new Ctor();
    each(obj, (_, key) => {
      result[key] = obj[key];
    });
    return result;
  }
  return obj;
}

// 深克隆
function deepClone(obj, cache = new Set()) {
  if (obj == null) return obj;
  let type = toType(obj);
  let Ctor = obj.constructor;
  if (!/^(object|array)$/i.test(type)) return shallowClone(obj);
  // 解决循环引用
  if (cache.has(obj)) return obj;
  cache.add(obj);
  let result = new Ctor();
  each(obj, (_, key) => {
    // console.log(key, '-->', obj[key]);
    result[key] = deepClone(obj[key], cache);
  });
  return result;
}

function test() {
  const newObj = deepClone(data);
  console.log("obj", data);
  console.log("newObj", newObj);
}

export default {
  shallowClone,
  deepClone,
  test,
};

/**
 * 针对 map 和 set 结构的拷贝
 * 
  // Map
  if (obj instanceof Map) {
    target = new Map();
    obj.forEach((v, k) => {
      const v1 = cloneDeep(v, map);
      const k1 = cloneDeep(k, map);
      target.set(k1, v1);
    });
  }

  // Set
  if (obj instanceof Set) {
    target = new Set();
    obj.forEach((v) => {
      const v1 = cloneDeep(v, map);
      target.add(v1);
    });
  }
 */
