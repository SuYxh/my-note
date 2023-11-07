var name = "全局环境";
var obj1 = {
  name: "对象1",
  func: function () {
    console.log(this.name);
  },
};
var obj2 = { name: "对象2" };
obj2.func = obj1.func;
var nameFunc = obj1.func;
obj1.func(); // 调用1
obj2.func(); // 调用2
nameFunc(); // 调用3

/**
 * 解析: 这个问题考察函数作为对象方法被调用时this的指向。

obj1.func()调用时，this指向obj1，因此输出对象1。
obj2.func()调用时，this指向obj2，因此输出对象2。
nameFunc()是直接调用，没有明确的调用对象，所以在非严格模式下this指向全局对象，输出全局环境。
 */
