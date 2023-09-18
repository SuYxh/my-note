const str = 15;

// parseInt(string, radix)
// 解析一个字符串并返回指定基数的十进制整数， radix 是2-36之间的整数，表示被解析字符串的基数。
// parseInt('123', 5) // 将'123'看作5进制数，返回十进制数38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
console.log(parseInt("11", 2));
// console.log(parseInt(11, 2))
// console.log(str.toString(2))

// 把m进制的数字num转为n进制怎么做？
function sysConvert(num, m, n) {
  let s = num + "";
  let result = parseInt(s, m).toString(n);
  return result;
}

const sysConvertPro = (num, m, n) =>
  parseInt(parseInt(num + "", m).toString(10));
const x = sysConvertPro(1111, 2, 10);
console.log("X", x, typeof x);

console.log(parseInt("0xF", 16));
console.log(parseInt("F", 16));
console.log(parseInt("FXX123", 16));
console.log(parseInt("17", 8));
console.log(parseInt(021, 8));
console.log(parseInt("015", 10));
console.log(parseInt(15.99, 10));
console.log(parseInt("15,123", 10));
console.log(parseInt("15 * 3", 10));
console.log(parseInt("12", 13));
console.log(parseInt("Hello", 8)); // ==> NaN
console.log(parseInt("546", 2)); // ==> NaN
