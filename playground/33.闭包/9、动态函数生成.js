function buildFunctionList() {
  var list = [];

  for (var i = 0; i < 5; i++) {
    list[i] = new Function("return " + i + ";");
  }

  return list;
}

const functionList = buildFunctionList();
console.log(functionList[0]()); // 应该打印什么？

/**
 * 这段代码定义了一个 `buildFunctionList` 函数，它创建了一个数组 `list` 并填充了五个新的 `Function` 对象。这些函数是通过 `new Function` 构造函数创建的，它们各自返回一个不同的数字，从 0 到 4。

在JavaScript中，`new Function` 是一种构造函数，用于动态创建一个新的函数实例。在这个例子中，`new Function("return " + i + ";");` 将创建一个新的函数，这个函数的主体是 `return` 语句，返回当前循环迭代对应的 `i` 值。

由于 `var` 关键字在循环中是函数作用域级别的，这意味着循环内的 `i` 不会在每次迭代中创建一个新的绑定，而是所有的函数都会共享同一个 `i`。但在这种情况下，每次迭代都会立即将当前的 `i` 的值传递到新的 `Function` 构造函数中，作为生成函数的一部分，所以每个函数都会正确地返回它们各自的 `i` 值。

当 `buildFunctionList` 被调用时，它返回了一个函数数组 `functionList`。`functionList[0]()` 调用了数组中的第一个函数，该函数返回了它被创建时 `i` 的值，也就是 `0`。因此，`console.log(functionList[0]());` 将会打印 `0`。
 */
