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

function shadowClone2(obj) {
  let type = toType(obj),
    Ctor = obj.constructor;

  if (/^(symbol|bigint)$/i.test(type)) return Object(obj);
  if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);
  if (/^error$/i.test(type)) return new Ctor(obj.message);
  if (/^function$/i.test(type)) {
    return function () {
      return obj.call(this, ...arguments);
    };
  }
  if (/^(object|array)$/i.test(type)) {
    let result = new Ctor();
    each(obj, (_, key) => {
      result[key] = obj[key];
    });
    return result;
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

function deepClone2(obj, cache = new Set()) {
  let type = toType(obj),
    Ctor = obj.constructor;
  if (!/^(object|array)$/i.test(type)) return shadowClone2(obj);
  if (cache.has(obj)) return obj;
  cache.add(obj);
  let result = new Ctor();
  each(obj, (_, key) => {
    result[key] = deepClone(obj[key], cache);
  });
  return result;
}

// 深克隆
function deepClone(obj, cache = new Set()) {
  // if (obj == null) return Object(obj)
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

let obj = {
  0: "math",
  1: "chinese",
  2: "elglish",
  sex: undefined,
  score: {
    math: 98,
    chinese: 100,
    elglish: 19,
  },
  reg: /\d+/gim,
  time: new Date(),
  friends: ["tom", "jerry"],
  say: function () {
    console.log("good good study!");
  },
  tag: Symbol("TAG"),
  [Symbol.toStringTag]: "object",
  name: "yxh",
};

obj.xxx = {
  0: obj,
};

// let newObj = deepClone(obj)

let newObj = deepClone2(obj);

// console.log(newObj)

newObj.score.math = 999;
newObj.friends.push("yxh");

console.log(newObj);

console.log(obj);

console.log(newObj === obj);

console.log(newObj.sex === obj.sex);
console.log(newObj.name === obj.name);

// let newObj2 = shallowClone(obj)
// newObj2.score.math = 999

// console.log(newObj2)
// console.log(obj)

// console.log(newObj2 === obj)
// console.log(newObj2 === obj)

function say(params) {
  console.log("hello");
}

// const fn = shallowClone(say)

// console.log(fn === say)
