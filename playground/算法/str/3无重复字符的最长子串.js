function lengthOfLongestSubstring(s) {
  let windowCharsSet = new Set();
  let left = 0;
  let right = 0;
  let maxLength = 0;

  while (right < s.length) {
    if (!windowCharsSet.has(s[right])) {
      windowCharsSet.add(s[right]);
      maxLength = Math.max(maxLength, windowCharsSet.size);
      right++;
    } else {
      windowCharsSet.delete(s[left]);
      left++;
    }
  }

  return maxLength;
}

const res1 = lengthOfLongestSubstring("abcabcbb");
console.log(res1);

const res2 = lengthOfLongestSubstring("bbbbbb");
console.log(res2);

const res3 = lengthOfLongestSubstring("pwwkew");
console.log(res3);
