function insert(ary) {
  // 1.准备一个新数组，用来存储抓到手里的牌，开始先抓一张牌进来
  let handle = [];
  handle.push(ary[0]);

  // 2.从第二项开始依次抓牌，一直到把台面上的牌抓光
  for (let i = 1; i < ary.length; i++) {
    // A是新抓的牌
    let A = ary[i];
    // 和HANDDLE手里的牌依次比较（从后向前比）
    for (let j = handle.length - 1; j >= 0; j--) {
      // 每一次要比较的手里的牌
      let B = handle[j];
      // 如果当前新牌A比要比较的牌B大了，把A放到B的后面
      if (A > B) {
        handle.splice(j + 1, 0, A);
        break;
      }
      // 已经比到第一项，我们把新牌放到手中最前面即可
      if (j === 0) {
        handle.unshift(A);
      }
    }
  }
  return handle;
}
let ary = [12, 8, 24, 16, 1];
ary = insert(ary);
console.log(ary);

function insert2(array) {
  const container = [];
  container.push(array[0]);

  for (let i = 1; i < array.length; i++) {
    const origin = array[i];
    for (let index = container.length; index >= 0; index--) {
      const mine = container[index];
      if (origin > mine) {
        container.splice(index + 1, 0, origin);
        break;
      }
      if (index === 0) {
        container.unshift(origin);
      }
    }
  }

  return container;
}

let ary2 = [12, 8, 24, 16, 1];
ary2 = insert2(ary2);
console.log(ary2);
