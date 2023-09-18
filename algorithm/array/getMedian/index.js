function getMedian(nums1, nums2) {
  let result = 0;
  let newArr = nums1.concat(nums2);
  newArr = newArr.sort((a, b) => a - b);

  const length = newArr.length;
  const midIndex = Math.floor(length / 2);

  if (!length) {
    return 0;
  }

  if (length === 1) {
    return newArr[0];
  }

  if (length % 2) {
    // 奇数
    result = newArr[midIndex];
  } else {
    // 偶数
    result = (newArr[midIndex - 1] + newArr[midIndex]) / 2;
  }

  return result;
}

// const mdianNum = getMedian([1, 2], [3, 4])
const mdianNum = getMedian([1, 3], [2]);
console.log(mdianNum);
