function quickSort(arr: number[]): number[] {
  // 4、结束 递归
  if (arr.length <= 1) {
    return arr;
  }

  // 1、找到数组的中间项，在原有的数组中把它移出
  const middleIndex = Math.floor(arr.length / 2);
  const middleValue = arr.splice(middleIndex, 1)[0];

  // 2、准备左右两个数组，循环剩下的每一项，比当前项小的放在左边，反之放在右边
  let arrLeft = [],
    arrRight = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    item < middleValue ? arrLeft.push(item) : arrRight.push(item);
  }

  // 3、递归方式让左右两边的数组同样这样处理，直到数组排好序，最后让 左边+中间+右边 拼接为 结果返回
  return quickSort(arrLeft).concat(middleValue, quickSort(arrRight));
}

export function funcTest() {
  const arr = [12, 8, 24, 16, 1];
  const result = quickSort(arr);
  console.time("quickSort");
  console.log(result);
  console.timeEnd("quickSort");
}
