let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// 方法一： toString
// const arr1 = arr.toString().split(",").map(num => Number(num))
// console.log(arr1);

// 递归循环
const flat = function flat(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`${arr} must be an array`);
  }
  let result = [];
  const handle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (!Array.isArray(element)) {
        result.push(element);
        continue;
      }
      handle(element);
    }
  };
  handle(arr);
  return result;
};

// console.log(flat(arr));

// while循环
const flat2 = (array) => {
  while (array.some((item) => Array.isArray(item))) {
    // console.log(array)
    array = [].concat(...array);
  }
  return array;
};

// console.log(flat2(arr))
// console.log(arr)

// reduce
function flatten(array) {
  return array.reduce((arr, curr, index) => {
    return arr.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}

// console.log(flatten(arr))

const data = [
  {
    name: "a",
    children: [
      { name: "b", children: [{ name: "e" }] },
      { name: "c", children: [{ name: "f" }] },
      { name: "d", children: [{ name: "g" }] },
    ],
  },
  {
    name: "a2",
    children: [
      { name: "b2", children: [{ name: "e2" }] },
      { name: "c2", children: [{ name: "f2" }] },
      { name: "d2", children: [{ name: "g2" }] },
    ],
  },
];

function flatten2(array) {
  return array.reduce((arr, curr) => {
    if (Array.isArray(curr.children)) {
      arr.push({ name: curr.name });
      flatten2(curr.children);
    }
    return arr.concat(curr);
    // return arr.concat(Array.isArray(curr.children) ? flatten2(curr.children) : curr)
  }, []);
}

const a = flatten2(data);

console.log("a", a);
