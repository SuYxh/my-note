## 题目

# 栈

### [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

**示例 1：**

```
输入：s = "()"
输出：true
```

**示例 2：**

```
输入：s = "()[]{}"
输出：true
```

**示例 3：**

```
输入：s = "(]"
输出：false
```

#### 答案

```js
var isValid = function (s) {
  const stack = [];
  const leftSymbol = ["(", "[", "{"];

  for (let i = 0; i < s.length; i++) {
    const curStr = s[i];
    if (leftSymbol.includes(curStr)) {
      stack.push(curStr);
    } else {
      const lastStr = stack[stack.length - 1];
      if (
        (lastStr === "(" && curStr === ")") ||
        (lastStr === "[" && curStr === "]") ||
        (lastStr === "{" && curStr === "}")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return !stack.length;
};
```

优化版

```js
var isValid = function (s) {
  const stack = [];
  const map = new Map();

  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");

  for (let i = 0; i < s.length; i++) {
    const curStr = s[i];
    if (map.has(curStr)) {
      stack.push(curStr);
    } else {
      const lastStr = stack[stack.length - 1];
      if (map.get(lastStr) === curStr) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return !stack.length;
};
```
