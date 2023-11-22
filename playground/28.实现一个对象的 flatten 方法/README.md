## 使用 js 实现一个对象的 flatten 方法

## 描述

```
const obj = {
 a: {
        b: 1,
        c: 2,
        d: {e: 5}
    },
 b: [1, 3, {a: 2, b: 3}],
 c: 3
}

flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
```

## 代码

```js
function isObject(val) {
  return typeof val === "object" && val !== null;
}

function flatten(obj) {
  const result = [];

  const recurse = (obj, prefix) => {
    if (isObject(obj)) {
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          const element = obj[i];
          console.log(element);
          recurse(
            element,
            `${prefix ? prefix + "[" + i + "]" : "[" + i + "]"}`
          );
        }
      } else {
        for (const key in obj) {
          if (Object.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            recurse(val, `${prefix ? prefix + "." + key : key}`);
          }
        }
      }
    } else {
      result[prefix] = obj;
    }
  };

  recurse(obj, "");

  return result;
}
```
