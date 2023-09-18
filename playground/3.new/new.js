function Animal(type) {
  this.type = type;
}

Animal.prototype.say = function (params) {
  console.log(`我是一只${this.type}`);
};

function mockNew() {
  // console.log("mockNew函数的参数：", arguments)
  // console.log("类数组转换：", Array.from(arguments))
  // 拿到第一个参数，这里是 Animal
  const Constructor = [].shift.call(arguments);
  // console.log("first params", Constructor)
  let obj = {};
  obj.__proto__ = Constructor.prototype;
  let r = Constructor.apply(obj, arguments);
  // console.log("r", r)
  return r instanceof Object ? r : obj;
}

// mockNew(Animal, "dog")

let mypig = mockNew(Animal, "mock pig");
mypig.say();
console.log(mypig);

let pig = new Animal("pig");
pig.say();
console.log(pig);

// let pig2 = Animal("pig2")
// pig2.say()
// console.log(pig2)
function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
  leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (leftVaule === null) {
      return false;
    }
    if (leftVaule === rightProto) {
      return true;
    }
    leftVaule = leftVaule.__proto__;
  }
}
