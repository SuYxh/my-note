// 我有 2 个数组 A，B，我想在 B 数组中每隔3 位插入一个 A 数组中的元素，请你给出一个js方法

// 针对这个方法，在B数组末尾没有插入5 ,请你修正这个 bug

function insertWithInterval(a, b) {
  let newArray = [...b];
  let aIndex = 0;

  for (let i = 3; i < newArray.length; i += 4) {
    if (aIndex < a.length) {
      // 在每个第3个位置插入数组 A 的元素
      newArray.splice(i, 0, a[aIndex]);
      aIndex++;
    } else {
      break;
    }
  }

  if (aIndex < a.length) {
    newArray.push(a[aIndex]);
  }

  return newArray;
}

// let A = [1, 2, 3, 4, 5, 6, 7];
let A = [1, 2, 3, 4, 5];
// let A = [1, 2, 3];
let B = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
];

// let B = [
//   "a",
//   "b",
//   "c",
//   "d",
//   "e",
//   "f",
//   "g",
//   "h",
//   "i",
//   "j",
//   "k",
//   "l",
//   "m",
//   "n",
//   "o",
//   "p",
//   "q",
//   "r"
// ];

const result = insertWithInterval(A, B);
console.log(result);
