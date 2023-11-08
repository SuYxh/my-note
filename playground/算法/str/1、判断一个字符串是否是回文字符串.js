function _isPalindrome(str) {
  // 先反转字符串
  const reversedStr = str.split("").reverse().join("");
  // 判断反转前后是否相等
  return reversedStr === str;
}

function isPalindrome(s) {
  if (s.length % 2) {
    return false;
  }

  const num = s.length / 2;

  for (let i = 0; i < num; i++) {
    const char = s[i];
    // console.log(char, s[s.length - i - 1]);
    if (char !== s[s.length - i - 1]) {
      return false;
    }
  }

  return true;
}

console.log("isPalindrome", isPalindrome("yessey"));
