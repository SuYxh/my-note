// 输入 [['a.b', 1], ['a.c', 2], ['d', 3]] 应该返回 {a: {b: 1, c: 2}, d: 3}。
function listToNestedObject(arr) {
  debugger;
  const result = {};

  arr.forEach((item) => {
    const path = item[0];
    const value = item[1];

    const pathArr = path.split(".");
    let p = result;

    pathArr.forEach((key, index) => {
      if (index === pathArr.length - 1) {
        p[key] = value;
      } else {
        p[key] = p[key] || {};
        p = p[key];
      }
    });
  });

  return result;
}

console.log(
  listToNestedObject([
    ["a.b", 1],
    ["a.c", 2],
    ["d", 3],
  ])
);

// ["a.b.c", "a.b.d", "e"], [1, 2, 3]，返回 {a: {b: {c: 1, d: 2}}, e: 3}。
function pathStringToObject(pathArr, valArr) {
  const result = {};

  pathArr.forEach((path, i) => {
    const _pathArr = path.split(".");
    let p = result;

    _pathArr.forEach((key, j) => {
      if (j === _pathArr.length - 1) {
        p[key] = valArr[i];
      } else {
        p[key] = p[key] || {};
        p = p[key];
      }
    });
  });

  return result;
}
console.log(pathStringToObject(["a.b.c", "a.b.d", "e"], [1, 2, 3]));

// 输入 [1, [2, [3, 4], 5], 6] 应该返回 {1: {2: {3: null, 4: null}, 5: null}, 6: null}。

function nestedArrayToObject2(arr) {
  let result = {};

  function buildObject(obj, array) {
    for (let i = 0; i < array.length; i++) {
      // 如果当前元素是数组
      if (Array.isArray(array[i])) {
        // 递归构建对象
        obj[array[i - 1]] = buildObject({}, array[i]);
      } else if (i === array.length - 1 || !Array.isArray(array[i + 1])) {
        // 如果是最后一个元素或下一个元素不是数组
        obj[array[i]] = null;
      }
    }
    return obj;
  }

  result = buildObject(result, arr);
  return result;
}

console.log(nestedArrayToObject2([1, [2, [3, 4], 5], 6]));

// 输入 "a.b,1\na.c,2\nd,3"（其中 \n 是换行符）应该返回 {a: {b: 1, c: 2}, d: 3}。
function csvToNestedObject(str) {
  const result = {};
  const res = [];
  const strArr = str.split("\n");
  console.log(strArr);

  strArr.forEach((item) => {
    const arr = item.split(",");
    res.push(arr);
  });
  console.log(res);

  res.forEach((item) => {
    const pathArr = item[0].split(".");
    const val = item[1];

    let p = result;

    pathArr.forEach((key, i) => {
      if (i === pathArr.length - 1) {
        p[key] = val;
      } else {
        p[key] = p[key] || {};
        p = p[key];
      }
    });
  });

  return result;
}

console.log(csvToNestedObject("a.b,1\na.c,2\nd,3"));
