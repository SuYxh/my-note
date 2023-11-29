//  for循环里两个 if 判断还可以优化

function fn1() {
  let maxLength = 0;
  let maxStr = "";
  let count = 1;
  let stringList = "adsafsfgadsdaasssssaasssdfssss";

  //  首先对字符串进行排列，方便比较
  stringList = stringList.split("").sort();

  // 比较字符串相邻位置是否相同
  for (let i = 0; i < stringList.length; i++) {
    // 如果相同，说明字符串相同，让count +1
    if (stringList[i] == stringList[i + 1]) {
      ++count;
      // maxLength是最大的出现个数，如果相邻个数大于maxLength则说明字符串个数比定义的最大个数大，则最大个数设置为它，最大值为单前的值
      if (count > maxLength) {
        console.log(count);

        maxLength = count;
        maxStr = stringList[i];
      }
    } else {
      count = 1;
    }
  }
  console.log("出现次数最多" + maxStr, "出现次数最多个数" + maxLength);
}

// 利用对象的key值不能重复这一特性实现
function fn2() {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    let key = str[i]; //key中存储的是每一个字符串
    if (obj[key]) {
      //判断这个键值对中有没有这个键
      obj[key]++;
    } else {
      obj[key] = 1;
    }
  }

  let maxCount = 0; //假设是出现次数最多的次数
  let maxString = ""; //假设这个字符串是次数出现最多的字符串
  for (let key in obj) {
    if (maxCount < obj[key]) {
      maxCount = obj[key]; //保存最大的次数
      maxString = key;
    }
  }
  return "出现次数最多的字母:" + maxString + "出现了" + maxCount + "次";
}
