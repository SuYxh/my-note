/* // 原型链继承
function Animal(name) {
  this.name = name
  this.hobby = ["吃饭", "睡觉"]
}
Animal.prototype.say = function () {
  console.log(`我是一只${this.name}`);
}
function Dog() {

}
// 缺点：不能像父类构造函数传参
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

// 缺点：不能像父类构造函数传参
const dog1 = new Dog("dog1")
const dog2 = new Dog("dog2")
dog1.hobby.push("吃肉")
// 缺点：私有属性会被共享
console.log(dog1.hobby);
console.log(dog2.hobby); */

/* // 借用构造函数继承（经典继承）-- 在子类构造函数种调用父类的构造函数
function Animal(name) {
  this.name = name
  this.hobby = ["吃饭", "睡觉"]
}
Animal.prototype.say = function () {
  console.log(`我是一只${this.name}`);
}
function Dog(name) {
  Animal.call(this, name)
}
const dog1 = new Dog("dog1")
const dog2 = new Dog("dog2")
dog1.hobby.push("吃肉")
// 保护的私有属性，但是无法继承公共方法，因为 Dog 的原型是不是 Animal , dog1 instanceof Animal ==> false
console.log(dog1);
console.log(dog2);
// console.log(dog1 instanceof Animal)
// console.log(Dog.prototype); */

// 组合继承 -- 调用2次构造函数
/* function Animal(name) {
  this.name = name
  this.hobby = ["吃饭", "睡觉"]
}
Animal.prototype.say = function () {
  console.log(`我是一只${this.name}`);
}
function Dog(...args) {
  // 继承私有属性
  Animal.call(this, ...args)    // 第一次
}

// 继承公共方法
Dog.prototype = new Animal()    // 第二次
Dog.prototype.constructor = Dog

const dog1 = new Dog("dog1")
const dog2 = new Dog("dog2")
dog1.hobby.push("吃肉")
console.log(dog1);
console.log(dog2);
console.log(dog1 instanceof Animal)
dog1.say()
dog2.say() */

/* // 寄生组合继承
function Animal(name) {
  this.name = name
  this.hobby = ["吃饭", "睡觉"]
}
Animal.prototype.say = function () {
  console.log(`我是一只${this.name}`);
}
function Dog(...args) {
  // 继承私有属性
  Animal.call(this, ...args)
}

// 继承公共方法
Dog.prototype = Object.create(Animal.prototype)   // 使用 Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

const dog1 = new Dog("dog1")
const dog2 = new Dog("dog2")
dog1.hobby.push("吃肉")
console.log(dog1);
console.log(dog2);
console.log(dog1 instanceof Animal)
dog1.say()
dog2.say() */

// 多重继承
function Biology() {
  this.type = "我是生物";
}

Biology.prototype.getValue = function () {
  console.log(this.type);
  return this.type;
};

function Animal(name) {
  this.name = name;
  this.hobby = ["吃饭", "睡觉"];
}
Animal.prototype.say = function () {
  console.log(`我是一只${this.name}`);
};
function Dog(...args) {
  // 继承 生物
  Biology.call(this, ...args);
  // 继承
  Animal.call(this, ...args);
}

// 继承公共方法
Dog.prototype = Object.create(Animal.prototype); // 使用 Object.create(Animal.prototype)
Object.assign(Dog.prototype, Biology.prototype);
Dog.prototype.constructor = Dog;

const dog1 = new Dog("dog1");
const dog2 = new Dog("dog2");
dog1.hobby.push("吃肉");
console.log(dog1);
console.log(dog2);
console.log(dog1 instanceof Animal);
dog1.say();
dog1.getValue();
dog2.say();
