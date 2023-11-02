function binarySearch(array, target) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = array[mid];

    if (guess === target) {
      return mid; // 返回目标值的索引
    }
    if (guess > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1; // 当目标值不存在时，返回-1
}

// 测试二分查找
let sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(binarySearch(sortedArray, 5)); // 输出：4
console.log(binarySearch(sortedArray, 10)); // 输出：-1
