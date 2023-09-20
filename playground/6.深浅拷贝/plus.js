import data from "./data.js";

function deepClone(obj, cache = new Set()) {
  // 需要放在开始，否则 obj.constructor 会报错
  if (obj == null) return obj;

  const Ctor = obj.constructor;
  const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

  if (/^(Symbol|bigint)$/i.test(type)) return Object(obj);
  if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);
  if (/^(error)$/i.test(type)) return new Ctor(obj.message);
  if (/^function$/i.test(type)) {
    return function () {
      return obj.call(this, ...arguments);
    };
  }

  if (/^(object|array)$/i.test(type)) {
    if (cache.has(obj)) {
      console.log("存在循环引用");
      return obj;
    }
    cache.add(obj);

    const result = new Ctor();

    const keys = Reflect.ownKeys(obj);
    keys.forEach((key) => {
      result[key] = deepClone(obj[key], cache);
    });

    return result;
  }

  return obj;
}

function test() {
  const newObj = deepClone(data);
  console.log("obj", data);
  console.log("newObj", newObj);
}

export default {
  deepClone,
  test,
};

/**
 * Reflect.ownKeys返回对象的所有属性（包括可枚举和不可枚举属性），包括字符串类型和符号类型的属性。
 * Object.keys返回对象的可枚举属性的数组，仅包括字符串类型的属性。
 * for-in循环可以遍历对象的可枚举属性，包括自身和继承的属性。但需要注意使用hasOwnProperty方法来判断是否是对象自身的属性。
 */
