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

function flat2(arr) {
  const result = [];

  function loop(arr) {
    if (arr.length < 1) {
      return;
    }
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        loop(item);
      } else {
        result.push(item);
      }
    });
  }

  loop(arr);

  return result;
}

function paiping2(arr) {
  arr = arr.reduce((initVal, item, index) => {
    return initVal.concat(Array.isArray(item) ? paiping2(item) : item);
  }, []);

  return arr;
}

const arr1 = flat(arr);
console.log(arr.flat(Infinity));
// console.log(arr);
console.log(arr1);
console.log(flat2(arr));
