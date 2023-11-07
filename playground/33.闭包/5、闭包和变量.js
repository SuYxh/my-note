function buildPrefixPrinter(prefix) {
  return function (message) {
    console.log(prefix + message);
  };
}

var printWithHello = buildPrefixPrinter("Hello, ");
printWithHello("World!"); // 应该打印什么？
printWithHello("JavaScript!"); // 应该打印什么？
