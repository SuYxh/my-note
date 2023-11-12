function formatMoney(amount) {
  // 将数字转换为字符串，并使用正则表达式添加千位分隔符
  /\d?=(\d{3})+\./gi;
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

/**
 *

\d：匹配任意单个数字，等同于 [0-9]。

(?= ... )：这是一个正向预查（lookahead），表示“接下来的字符需要满足某个条件，但不包括在匹配中”。换句话说，它会检查一个条件，但不会消耗任何字符——不会移动匹配的“光标”位置。

(\d{3})+：这是正则表达式的核心部分，\d{3} 匹配三个数字，而 + 表示这个模式可以连续重复一次或多次。这确保了数字是以每三位分隔的。

\.：这是对实际的点号 . 的转义，因为在正则表达式中，未转义的点号 . 是一个特殊字符，表示匹配除换行符之外的任何单个字符。在这里，我们需要匹配实际的点号，因为它表示小数点。

/g：全局搜索的标志，表示查找所有匹配的实例，而不是在找到第一个匹配项后就停止。
 */

function formatMoney(amount) {
  // 将数值转换为固定小数点的表示形式
  let numStr = amount.toFixed(2);

  // 拆分整数部分和小数部分
  let parts = numStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1];

  // 处理整数部分的千位分隔符
  let formattedInteger = "";
  let counter = 0;
  for (let i = integerPart.length - 1; i >= 0; i--) {
    formattedInteger = integerPart.charAt(i) + formattedInteger;
    counter++;
    if (counter === 3 && i !== 0) {
      formattedInteger = "," + formattedInteger;
      counter = 0;
    }
  }

  // 将处理后的整数部分和小数部分重新组合
  return formattedInteger + "." + decimalPart;
}
