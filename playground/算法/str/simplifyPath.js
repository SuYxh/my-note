/**
 * 简化路径函数：
实现一个函数 simplifyPath，该函数接收一个表示文件路径的字符串作为输入，返回一个简化的路径。例如，输入 "/home//foo/" 应该返回简化后的路径 "/home/foo"。该函数应该能正确处理不规则的路径，如多个连续的斜杠、当前目录(.)和上级目录(..)的符号。
 
以下是一些测试用例：

普通路径：
输入："/home/user/docs/Letters"
预期输出："/home/user/docs/Letters"

带有多余斜杠的路径：
输入："/home//user//docs//"
预期输出："/home/user/docs"

带有当前目录符号的路径：
输入："./home/user/./docs/"
预期输出："home/user/docs"

带有上级目录符号的路径：
输入："/home/user/docs/../Letters"
预期输出："/home/user/Letters"

混合特殊符号和多余斜杠的路径：
输入："/home/./user//.//docs/../docs///./../Letters/./"
预期输出："/home/user/Letters"

只有特殊符号的路径：
输入："/../"
预期输出："/"

根目录下的简单路径：
输入："/a/b/c/"
预期输出："/a/b/c"



*/

function simplifyPath(path) {
  let res = "";
  let result = [];
  const arr = path.split("/");
  // console.log('arr', arr);

  arr.forEach((item, index) => {
    if (item && item !== ".") {
      result.push(item);
    }
  });

  // console.log('result', result);

  let location = [];

  result.forEach((item, index) => {
    if (item === "..") {
      location.push(index - 1);
      location.push(index);
    }
  });

  location.forEach((num) => {
    result.splice(num, 1, null);
  });

  result = result.filter((item) => item);

  if (path[0] === "/") {
    res = "/" + result.join("/");
  } else {
    res = result.join("/");
  }

  return res;
}

console.log(simplifyPath("/home//user//docs//"));
console.log(simplifyPath("./home/user/./docs/"));
console.log(simplifyPath("/home/./user//.//docs/../docs///./../Letters/./"));
