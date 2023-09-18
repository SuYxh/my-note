function quick(ary) {
  // 4.结束递归（当ARY中小于等于一项，则不用处理）
  if (ary.length <= 1) {
    return ary;
  }
  // 1.找到数组的中间项，在原有的数组中把它移除
  let middleIndex = Math.floor(ary.length / 2);
  let middleValue = ary.splice(middleIndex, 1)[0];
  // 2.准备左右两个数组，循环剩下数组中的每一项，比当前项小的放到左边数组中，反之放到右边数组中
  let aryLeft = [],
    aryRight = [];
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    item < middleValue ? aryLeft.push(item) : aryRight.push(item);
  }
  // 3.递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止（最后让左边+中间+右边拼接成为最后的结果）
  return quick(aryLeft).concat(middleValue, quick(aryRight));
}
let ary = [12, 8, 15, 16, 1, 24];
ary = quick(ary);
console.log(ary);

function quick2(array) {
  if (array.length <= 1) {
    return array;
  }
  const middleIndex = Math.floor(array.length / 2);
  const middleValue = array.splice(middleIndex, 1)[0];
  const arrayLeft = [],
    arrayRight = [];
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    item > middleValue ? arrayRight.push(item) : arrayLeft.push(item);
  }
  return quick2(arrayLeft).concat(middleValue, quick2(arrayRight));
}

let ary2 = [12, 8, 15, 16, 1, 24];
ary2 = quick(ary2);
console.log(ary2);
