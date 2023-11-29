function getMedian(arr1: number[], arr2: number[]) {
  let result: number = 0;
  const newArr: Array<number> = arr1.concat(arr2);
  const length: number = newArr.length;

  if (length / 2) {
    // 奇数
    result = newArr[length / 2 + 1];
  } else {
    // 偶数
    result = (newArr[length / 2] + newArr[length / 2 + 1]) / 2;
  }

  return result;
}

const mdianNum = getMedian([1, 3], [3, 4]);
console.log(mdianNum);
