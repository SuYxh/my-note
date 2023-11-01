const arr = [1, 2, 3, [4, 5, [6, 7, [8, 9]]], 10, 12, [13, 14, [15]], 16];

function flat(arr) {
  const result = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const res = flat(item);
      res.forEach((n) => result.push(n));
    } else {
      result.push(item);
    }
  });

  return result;
}

const arr1 = flat(arr);
console.log(arr.flat(Infinity));
// console.log(arr);
console.log(arr1);
