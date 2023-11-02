function bubble(ary) {
  // 外层循环I控制比较的轮数
  for (let i = 0; i < ary.length - 1; i++) {
    // 里层循环控制每一轮比较的次数J
    for (let j = 0; j < ary.length - 1 - i; j++) {
      if (ary[j] > ary[j + 1]) {
        // 当前项大于后一项
        [ary[j], ary[j + 1]] = [ary[j + 1], ary[j]];
      }
    }
  }
  return ary;
}
let ary = [12, 8, 24, 16, 1];

// ary = bubble(ary);
// console.log(ary);
