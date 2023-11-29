var longestValidParentheses = function (s) {
  var ans = 0;
  var len = s.length;
  var str = [];
  str.push(-1);
  for (var i = 0; i < s.length; ++i) {
    if (s[i] === "(") {
      str.push(i);
    } else {
      str.pop();
      if (str.length === 0) {
        str.push(i);
      } else {
        ans = Math.max(ans, i - str[str.length - 1]);
      }
    }
  }
  return ans;
};

function sssss(str) {
  let num = 0;
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        console.log("-->", i, str[i]);
        num = Math.max(num, i - stack[stack.length - 1]);
      }
    }
    console.log(stack, num);
  }
  return num;
}

// console.log(sssss("(()"));
// console.log(sssss(")()())"));
// console.log(sssss("(((()))"));

function sb(str) {
  let max = 0;
  const reg = /(\(\))+/gi;
  console.log(str.match(reg));
  const arr = str.match(reg);
  arr.forEach((str) => {
    max = Math.max(max, str.length);
  });
  console.log(max);
}

// sb(')()())')
// sb(')()(())))')
// sb("(()")
// sb('(((()))')
setTimeout(() => {
  console.log(1);
}, 0);

new Promise((resolve) => {
  console.log(2);
  for (let i = 0; i < 10000; i++) {
    i === 999 && resolve();
  }
  console.log(3);
}).then(() => {
  console.log(4);
});

console.log(5);
