const arr = [1, 2, 2, 2, 4, 5, 6, 8, 6, 7];

function uniqueArr(arr) {
  return [...new Set(arr)];
}

function uniqueArr2(arr) {
  const result = [];
  const map = new Map();

  arr.forEach((item) => {
    if (!map.get(item)) {
      result.push(item);
      map.set(item, item);
    }
  });

  return result;
}

console.log(uniqueArr2(arr));
