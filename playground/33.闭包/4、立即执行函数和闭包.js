var functions = [];
for (var i = 0; i < 3; i++) {
  functions[i] = (function (x) {
    return function () {
      console.log(x);
    };
  })(i);
}

functions[0](); // 应该打印什么？
functions[1](); // 应该打印什么？
functions[2](); // 应该打印什么？
