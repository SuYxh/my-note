function insertSort(arr: number[]): number[] {
  // 1、准备一个新数组，用来存储抓到手里的牌
  const handle: number[] = [];
  // 2、开始先抓一张牌进来
  handle.push(arr[0]);

  // 3、从第二项依次抓牌，一直到把牌抓光
  for (let i = 1; i < arr.length; i++) {
    // A 是新抓的牌
    const A = arr[i];

    // 和手中的牌进行对比（从后向前）
    for (let j = handle.length - 1; j >= 0; j--) {
      const B = handle[j];
      // 如果 A 要比 B 大，则把 A 放在 B 的后面
      if (A > B) {
        handle.splice(j + 1, 0, A);
        break;
      }
      // 已经比较到第一项，把新牌插入到第一项
      if (j === 0) {
        handle.unshift(A);
      }
    }
  }

  return handle;
}

export function funcTest() {
  const arr = [12, 8, 24, 16, 1];
  const result = insertSort(arr);
  console.time("insertSort");
  console.log(result);
  console.timeEnd("insertSort");
}
