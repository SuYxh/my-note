function createFunction() {
  var localVariable = "我是一个局部变量";

  return function () {
    console.log(localVariable);
  };
}

var myFunction = createFunction();
myFunction(); // 应该打印什么？
