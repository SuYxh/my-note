/**
 * @description: 冒泡排序：让数组中的当前项和后一项进行比较，如果当前项比后一项大，则两项交换位置，让大的靠后即可
 * @param {number} arr
 * @return {*}
 */
function bubble(arr: number[]) {
  let length = arr.length;
  if (!length) {
    return [];
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    console.log(`第${i + 1}次循环`, arr);
  }
  return arr;
}
