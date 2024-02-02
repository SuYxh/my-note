/**
 * 
 * 字符串统计函数：
创建一个函数 countVowels，它接收一个字符串并返回一个对象，对象中包含每个元音字母（a, e, i, o, u）在该字符串中出现的次数。例如，输入 "hello world" 应该返回类似 {a: 0, e: 1, i: 0, o: 2, u: 0} 的对象。
 */

function countVowels(str) {
  const obj = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  const keys = Object.keys(obj);

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (keys.includes(char)) {
      obj[char] = obj[char] + 1;
    }
  }

  return obj;
}

// console.log(countVowels('hello world'));
