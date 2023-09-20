/*
 * @Author: 时光@
 * @Date: 2022-07-04 23:24:35
 * @LastEditTime: 2023-09-20 19:39:25
 * @Description: 合并对象
 */

function each(obj, callback) {
  callback = callback || Function.prototype;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      let item = obj[i],
        result = callback.call(item, item, i);
      if (result === false) break;
    }
    return obj;
  }

  for (let key in obj) {
    if (!Object.hasOwnProperty.call(obj, key)) break;
    let item = obj[key],
      result = callback.call(item, item, key);
    if (result === false) break;
  }
  return obj;
}

function toType(obj) {
  let class2type = {},
    toString = class2type.toString,
    dataType = [
      "Boolean",
      "Number",
      "String",
      "Function",
      "Array",
      "Date",
      "RegExp",
      "Object",
      "Error",
      "Symbol",
      "BigInt",
    ];
  dataType.forEach((name) => {
    class2type[`[object ${name}]`] = name.toLowerCase();
  });
  if (obj == null) return obj + "";
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[toString.call(obj)] || "object"
    : typeof obj;
}

function isObj(value) {
  // 是否为普通对象
  return toType(value) === "object";
}

const options = {
  url: "",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  data: null,
  arr: [10, 20, 30],
  config: {
    xhr: {
      async: true,
      cache: false,
    },
  },
};

const params = {
  url: "http://www.zhufengpeixun.cn/api/",
  headers: {
    "X-Token": "EF00F987DCFA6D31",
  },
  data: {
    lx: 1,
    from: "weixin",
  },
  arr: [30, 40],
  config: {
    xhr: {
      cache: true,
    },
  },
};

/*
 * 几种情况的分析
 *   A->options中的key值  B->params中的key值
 *   1.A&B都是原始值类型:B替换A即可
 *   2.A是对象&B是原始值:抛出异常信息
 *   3.A是原始值&B是对象:B替换A即可
 *   4.A&B都是对象:依次遍历B中的每一项,替换A中的内容
 */
function merge(options, params = {}) {
  each(params, (_, key) => {
    let isA = isObj(options[key]),
      isB = isObj(params[key]);
    if (isA && !isB) throw new TypeError(`${key} in params must be object`);
    if (isA && isB) {
      options[key] = merge(options[key], params[key]);
      return;
    }
    options[key] = params[key];
  });
  return options;
}

console.log(merge(options, params));
