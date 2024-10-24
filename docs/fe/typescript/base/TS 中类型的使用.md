

## 1.函数类型

函数的类型就是描述了**函数入参类型与函数返回值类型**

**函数的两种声明方式**

-   通过 function 关键字来进行声明
    
    ```typescript
    function sum(a: string, b: string): string {
      return a + b;
    }
    sum("a", "b");
    
    ```
    

> 可以用来限制函数的参数和返回值类型

-   通过表达式方式声明
    
    ```typescript
    type Sum = (a1: string, b1: string) => string;
    let sum: Sum = (a: string, b: string) => {
      return a + b;
    };
    ```
    

## 2.类型推断

TypeScript 拥有类型推导能力，根据用户的输入自动推导其类型。

### 1-1.赋值推断

赋值时推断，类型从右像左流动,会根据赋值推断出变量类型

```typescript
let name = "dahuang"; // string
let age = 30; // number
let handsome = true; // boolean
```

### 1-2.返回值推断

自动推断函数返回值类型

```typescript
function sum(a: string, b: string) {
  return a + b;
}
sum("a", "b"); // string
```

### 1-3.上下文类型

基于位置的类型推导，反方向的类型推导

> 函数从左到右进行推断

```typescript
type ICallback = (a: string, b: number, c: boolean) => void;
function fn(callback: ICallback) {
  let result = callback("1", 1, true); // result -> void
}

// d类型无法正确推断，因为上下文类型是基于位置推断的
// 这里的void表示不关心具体类型
fn((a, b, c, d) => 100);

```

## 3.函数的其他使用

### 3-1.可选参数

```typescript
let sum = (a: string, b?: string): string => {
  return a + b || "";
};
let sum = (a: string, b: string = "b"): string => {
  return a + b;
};
sum("a");
```

> 可选参数必须在其他参数的最后面。

### 3-2.剩余参数

```typescript
const sum = (...rest: string[]): string => {
  return rest.reduce((memo, current) => (memo += current), "");
};
sum("a", "b", "c", "d");
```

### 3-3.this 类型

this 类型要进行声明

```typescript
type IThis = typeof obj;
function getName(this: IThis, key: keyof IThis) {
  return this[key];
}
const obj = { name: "jw" };
getName.call(obj, "name");
```

-   typeof 获取对应的类型
-   keyof 获取类型对应的所有 key 类型 **(索引类型查询)**

## 4.函数的重载

_重载_，指我们可以定义一些名称相同的方法，通过定义不同的输入参数来区分这些方法。TypeScript 中的重载是伪重载，只有一个具体实现。

```typescript
function toArray(value: number): number[];
function toArray(value: string): string[];
function toArray(value: number | string) {
  if (typeof value == "string") {
    return value.split("");
  } else {
    return value
      .toString()
      .split("")
      .map((item) => Number(item));
  }
}
toArray(123); // 根据传入不同类型的数据 返回不同的结果
toArray("123");
```

> 重载适合于已知有限数量类型的情况，可以对不同类型的参数做出不同的处理。

## 5.类

类由三部分组成：构造函数、属性（实例属性、原型属性）、方法（实例方法、原型方法、访问器）

### 5-1.TS 中定义类

```typescript
class Circle {
  x!: number; // 实例上的属性必须先声明
  y!: number;
  constructor(x: number, y: number = 0, ...args: number[]) {
    this.x = x;
    this.y = y;
  }
}
let p = new Circle(100);
```

> 实例上的属性需要先声明在使用，构造函数中的参数可以使用可选参数和剩余参数。

### 5-2.类中的修饰符

-   `public`修饰符（谁都可以访问到）
    
    ```typescript
    class Animal {
      public name!: string; // 不写public默认也是公开的
      public age!: number;
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }
    class Cat extends Animal {
      constructor(name: string, age: number) {
        super(name, age);
        console.log(this.name, this.age);
      }
    }
    let p = new Cat("Tom", 18);
    console.log(p.name, p.age); // 外层访问
    ```
    
    > 我们可以通过参数属性来简化父类中的代码。
    
    ```typescript
    class Animal {
      constructor(public name: string, public age: number) {}
    }
    
    ```
    
-   `protected`修饰符 (自己和子类可以访问到)
    
    ```typescript
    class Animal {
      constructor(protected name: string, protected age: number) {}
    }
    class Cat extends Animal {
      constructor(name: string, age: number) {
        super(name, age);
        console.log(this.name, this.age);
      }
    }
    let p = new Cat("Tom", 18);
    console.log(p.name, p.age); // 属性“name”受保护，只能在类“Animal”及其子类中访问。
    ```
    
-   `private`修饰符 （除了自己都访问不到）
    
    ```typescript
    class Animal {
      constructor(private name: string, private age: number) {}
    }
    class Cat extends Animal {
      constructor(name: string, age: number) {
        super(name, age);
        console.log(this.name, this.age); // 无法访问
      }
    }
    let p = new Cat("Tom", 18);
    console.log(p.name, p.age); // 无法访问，但是可以通过p['name']的方式绕过ts检查
    ```
    
    > 可以采用`js`的私有属性来定义私有变量。
    
-   `readonly`修饰符 （仅读修饰符）
    
    > reaonly 在构造函数中可以随意修改（初始化） 在其他的地方就不能再次修改了。
    
    ```typescript
    class Animal {
      constructor(public readonly name: string, public age: number) {
        this.name = "init";
      }
      changeName(name: string) {
        this.name = name; // 仅读属性只能在constructor中被赋值
      }
    }
    class Cat extends Animal {
      constructor(name: string, age: number) {
        super(name, age);
      }
    }
    let p = new Cat("Tom", 18);
    p.changeName("Jerry");
    ```
    

### 5-3.静态属性、方法

```typescript
class Animal {
  static habitat = "地球"; //  静态属性
  static getHabitat() {
    console.log(this.habitat);
  }
  constructor(public name: string, public age: number) {}
}
```

> 静态属性和静态方法是可以被子类所继承的。

### 5-4 属性访问器

```typescript
class Animal {
  private _sound!: string; // 私有属性
  // 属性访问器
  set sound(sound: string) {
    this._sound = sound;
  }
  get sound() {
    return this._sound;
  }
}
```

### 5-5.Super 属性

```typescript
class Animal {
  private _sound!: string; // 私有属性
  set sound(sound: string) {
    // 属性访问器
    this._sound = sound;
  }
  get sound() {
    return this._sound;
  }
  eat(food: string): void {
    console.log(`正在吃${food}`);
  }
}
class Cat extends Animal {
  eat() {
    // 原型方法中的super指代的是父类的原型
    super.eat("鱼");
  }
  static getHabitat() {
    // 静态方法中的super指代的是父类
    super.getHabitat();
    console.log("在家中~~~");
  }
}
let cat = new Cat("Tom", 18);
Cat.getHabitat();
cat.eat();
```

> 这里要注意子类重写父类的方法，类型需要兼容。

```typescript
// 这里的void表示不关心返回值
let eat: (food: string) => void = () => "食物";
```

### 5-6.私有构造函数

```typescript
class Singleton {
  private static instance = new Singleton();
  private constructor() {
    /* 此类不能直接例化 */
  }
  public static getInstance() {
    return Singleton.instance;
  }
}
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 == instance2);
```

### 5-7.抽象类

抽象类描述了一个类中应当有哪些成员（属性、方法等），如果在父类中定义了抽象方法，那么子类必须要实现。

-   抽象类中不能声明静态的抽象成员
    
-   抽象类中可以包含具体的实现
    
-   抽象类不能被_new_
    

```typescript
abstract class Animal {
  // abstract static habitat = '地球' // “static”修饰符不能与“abstract”修饰符一起使用。

  // 可以在父类中定义抽象方法，子类必须要实现
  abstract eat: () => void; // 实例方法eat
  abstract play(): void; // 原型方法play
  // 提供的真实存在的方法
  drink() {
    return "喝水";
  }
}
class Tom extends Animal {
  eat!: () => void;
  play() {}
}
```

### 5-8.重载

```typescript
class ToArrayConverter {
  convert(value: number): number[];
  convert(value: string): string[];
  convert(value: number | string): number[] | string[] {
    if (typeof value === "string") {
      return value.split("");
    } else {
      return value
        .toString()
        .split("")
        .map((item) => Number(item));
    }
  }
}
const converter = new ToArrayConverter();
const result1: number[] = converter.convert(123);
const result2: string[] = converter.convert("123");
```

## 6.接口

接口可以在面向对象编程中表示行为的抽象，也可以描述对象的形状。 _接口_的作用就是为这些类型命名和为你的代码或第三方代码定义契约。 (接口中不能含有具体的实现逻辑)

-   用来描述数据形状的 （对象、类、函数、混合类型）
-   接口中的内容都是抽象的 （不能有具体的实现）

### 6-1.函数接口参数

> 我们可以约束函数中的参数，但是类型无法复用。

```typescript
const fullName = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): string => {
  return firstName + lastName;
};
```

> 我们可以通过接口进行描述

```typescript
interface IFullName {
  firstName: string;
  lastName: string;
}
const fullName = ({ firstName, lastName }: IFullName): string => {
  return firstName + lastName;
};
```

### 6-2.函数类型接口

```typescript
interface IFullName {
  firstName: string;
  lastName: string;
}
interface IFn {
  (obj: IFullName): string;
}
const fullName: IFn = ({ firstName, lastName }) => {
  return firstName + lastName;
};
```

> 通过接口限制函数的参数类型和返回值类型。

### 6-3.type 与 interface 区别

一般场景下我们使用 interface 用来描述对象、类的结构。使用类型别名来描述函数签名、联合类型、工具类型、 映射类型。

-   type 可以用联合类型 `type xx = string | number`， interface 不能用联合类型
    
-   type 别名不能被扩展（继承），interface 可以被继承和实现
    
-   type 不能重名， interface 可以重名（会合并）
    
-   type 可以做循环和条件，interface 不行
    

> 其它场景下，两者可以替换使用，无伤大雅。

### 6-4.函数混合类型

```typescript
interface ICounter {
  (): number; // 限制函数类型
  count: 0; // 限制函数上的属性
}
const fn: ICounter = () => {
  // 这里需要使用const进行声明，可能是因为：防止fn被重新赋值，因为用let修改了值，可能属性就不存在了
  return fn.count++;
};
fn.count = 0;
let counter: ICounter = fn;
console.log(counter());
console.log(counter());
```

### 6-5.对象接口

对象接口可以用来描述对象的形状结构

```typescript
interface IVegetables {
  // 类型
  color: string;
  taste: string;
  size: number;
}
let veg1: IVegetables = {
  // 定义
  color: "red",
  taste: "sweet",
  size: 10,
  a: 1, // 如何增添这个a属性呢？
};
```

-   方案 1：直接采用断言的方式指定为当前赋值的类型
-   方案 2：在类型中通过`?`增添 a 属性为可选属性
-   方案 3：利用同名接口合并的特点
-   方案 4：通过接口继承的方式扩展属性
-   方案 5：通过任意接口来扩展
-   类型兼容性、交叉类型等

> ？标识的属性为可选属性, `readOnly`标识的属性则不能修改。多个同名的接口会自动合并

```typescript
interface IVegetables {
  readonly color: string;
  size: string;
  taste: "sour" | "sweet";
}
interface IVegetables {
  a?: number;
}
const tomato: IVegetables = {
  color: "red",
  size: "10",
  taste: "sour",
};
tomato.color = "green"; // 仅读属性不能进行修改
```

### 6-6.任意属性、可索引接口

```typescript
interface Person {
  name: string;
  [key: string]: any; // 索引签名类型
}
let p: Person = {
  name: "dahuang",
  age: 30,
  [Symbol()]: "回龙观",
};

```

> 任意属性可以对某一部分必填属性做限制，其余的可以随意增减。

```typescript
interface IArr {
  [key: number]: any;
}
let p: IArr = {
  0: "1",
  1: "2",
  3: "3",
};
let arr: IArr = [1, "d", "c"];
```

> 可索引接口可以用于标识数组。

### 6-7.索引访问操作符

```typescript
interface IPerson1 {
  name: string;
  age: number;
  [key: string]: any;
}
// 访问接口中的类型需要使用[], 不能使用.
type PropType1 = IPerson1["name"];
type PropType2 = IPerson1[string];

interface IPerson2 {
  name: string;
  age: number;
}
type PropTypeUnion = keyof IPerson2; // name | age
type PropTypeValueUnion = IPerson2[PropTypeUnion]; // string | number
```

### 6-8.类接口

这里先来强调一下抽象类和接口的区别,抽象类中可以包含具体方法实现，接口中不能包含实现。

```typescript
interface Speakable {
  name: string;
  speak(): void;
}
// 这里不区分是实例的方法还是原型的方法
interface ChineseSpeakable {
  // speakChinese:()=>void
  speakChinese(): void; // 一般采用这种方式，这种方式不进行逆变检测
}
class Speak implements Speakable, ChineseSpeakable {
  name!: string;
  speak() {}
  speakChinese() {}
}
```

> 一个类可以实现多个接口，在类中必须实现接口中的方法和属性。

### 6-9.接口继承

```typescript
interface Speakable {
  speak(): void;
}
interface SpeakChinese extends Speakable {
  speakChinese(): void;
}
class Speak implements SpeakChinese {
  speakChinese(): void {
    throw new Error("Method not implemented.");
  }
  speak(): void {
    throw new Error("Method not implemented.");
  }
}
```

### 6-10.构造函数类型

```typescript
interface Clazz {
  new (name: string): any;
}
// type IClazz = new ()=> any
function createClass(target: Clazz, name: string) {
  return new target(name); // 传入的是一个构造函数
}
class Animal {
  constructor(public name: string) {
    this.name = name;
  }
}
let r = createClass(Animal, "Tom");
```

> 这里无法标识返回值类型。

```typescript
interface Clazz<T> {
  new (name: string): T;
}
function createClass<T>(target: Clazz<T>, name: string): T {
  return new target(name);
}
class Animal {
  constructor(public name: string) {
    this.name = name;
  }
}
let r = createClass(Animal, "Tom");
```

> new() 表示当前是一个构造函数类型,这里捎带使用了下泛型。 在使用`createClass`时动态传入类型。

## 7.泛型

泛型就是在使用的时候确定类型，泛型类似于函数的参数。泛型参数的名称通常我们使用大写的 T / K / U / V / M / O ...这种形式。

### 7-1.指定函数参数类型

-   单个泛型

```typescript
const getArray = <T>(times: number, val: T): T[] => {
  let result: T[] = [];
  for (let i = 0; i < times; i++) {
    result.push(val);
  }
  return result;
};
getArray(3, 3); // 3 => T => number
```

-   多个泛型

```typescript
function swap<T, K>(tuple: [T, K]): [K, T] {
  return [tuple[1], tuple[0]];
}
console.log(swap(["jiangwen", 30]));

```

### 7-2.函数标注的方式

-   类型别名

```typescript
type TArray = <T, K>(tuple: [T, K]) => [K, T];
const swap: TArray = <T, K>(tuple: [T, K]): [K, T] => {
  return [tuple[1], tuple[0]];
};
```

-   接口

```typescript
interface IArray {
  <T, K>(typle: [T, K]): [K, T];
}
const swap: IArray = <T, K>(tuple: [T, K]): [K, T] => {
  return [tuple[1], tuple[0]];
};

```

> 两种标注方式均可，但是对于函数而言我们通常采用类型别名的方式。

### 7-3.泛型使用的位置

实现一个数组循环函数

```typescript
// type ICallback = <T>(item: T, index: number) => void; ❎错误写法，这样写意味着调用函数的时候确定泛型
type ICallback<T> = (item: T, index: number) => void;
type IForEach = <T>(arr: T[], callback: ICallback<T>) => void;

const forEach: IForEach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i); // ts 类型检测 此时不会执行代码。
  }
};
forEach([1, 2, "a", "b"], function (item) {
  console.log(item);
});
```

### 7-4.默认泛型

```typescript
type Union<T = string> = number | T;
const u1: Union = "abc";
const u2: Union<boolean> = true;
```

> 可以指定泛型的默认类型，让使用更方便。

### 7-5.泛型约束

使用 `extends` 关键字来约束传入的泛型参数必须符合要求。`A extends B` 意味着 **A 是 B 的子类型**

-   `'abc' extends string`
-   `'a' extends 'a' | 'b'`
-   ...

**案例 1**:

```typescript
function handle<T extends string | number>(input: T): T {
  return input;
}

```

**案例 2**:

```typescript
interface IWithLength {
  length: number;
}
function getLen<T extends IWithLength>(val: T) {
  return val.length;
}
getLen("hello");

```

**案例 3**:

```typescript
const getVal = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};
getVal({ name: "jw" }, "name");

```

> 泛型约束经常也配合着条件类型来使用，后面讲到条件类型时在详细说明。

### 7-6.对象中的泛型

通过接口定义一个特定的响应类型结构

```typescript
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message?: string;
}
```

调用接口时传入返回数据的结构类型

```typescript
interface LoginRes {
  // 登录接口的返回值
  token: string;
  roles: number[];
}

function toLogin(): ApiResponse<LoginRes> {
  return {
    code: 0,
    data: {
      token: "Bear token",
      roles: [1, 2],
    },
  };
}
```

### 7-7.类中的泛型

创建实例时提供类型

```typescript
class MyArray<T> {
  // T => number
  arr: T[] = [];
  add(num: T) {
    this.arr.push(num);
  }
  getMaxNum(): T {
    let arr = this.arr;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      current > max ? (max = current) : null;
    }
    return max;
  }
}
let myArr = new MyArray<number>(); // 没有传递类型，默认类型为unknown
myArr.add(3);
myArr.add(1);
myArr.add(2);
console.log(myArr.getMaxNum());
```

## 8.交叉类型

交叉类型(Intersection Types)是将多个类型合并为一个类型

-   联合类型的符号是|，类似按位或。只需要符合联合类型中的一个类型即可。 （并集）
-   交叉类型的符号是&，类似按位与。需同时满足类型。 （交集）

```typescript
interface Person1 {
  handsome: string;
}
interface Person2 {
  high: string;
}
type P1P2 = Person1 & Person2;
let p: P1P2 = { handsome: "帅", high: "高" };
```

> 举例：我们提供两拨人，一拨人都很帅、另一拨人很高。我们希望找到他们的交叉部分 => 又高又帅的人。

```typescript
interface Person1 {
  handsome: string;
  address: {
    pos: string;
  };
}
interface Person2 {
  high: string;
  address: {
    pos: number;
  };
}
type P1P2 = Person1 & Person2; // address 内部也会进行交叉类型
type POS = P1P2["address"]["pos"]; // never = string & number
```

-   交叉类型

```typescript
function mixin<T, K>(a: T, b: K) {
  return { ...a, ...b };
}
const x = mixin({ name: "jiang", age: 30 }, { age: "20" });
```

> 这里返回值默认会被识别成交叉类型，但是如果两个对象中有相同属性类型不同，则默认推导会出现问题，后续我们再来解决这个问题。

## 9.unknown

`unknown`类型，任何类型都可以赋值为`unknown`类型。 它是 any 类型对应的安全类型。any 叫做不检测了， unknown 要进行类型检测

> 不能访问 unknown 类型上的属性，不能作为函数、类来使用

```typescript
// 类型检查后使用
function processInput(input: unknown) {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else if (typeof input === "number") {
    console.log(input.toFixed(2));
  } else {
    console.log(input); // unknown
  }
}
// 类型断言后使用
let name: unknown = "dahuang";
(name as string).toUpperCase();
```

> 使用 unknown 类型需要进行类型检查或类型断言后再进行使用。

**unknown 特性**

-   联合类型中的`unknown`
    
    ```typescript
    type UnionUnknown = unknown | null | string | number;
    ```
    
    > 联合类型与`unknown`都是`unknown`类型
    
-   交叉类型中的`unknown`
    
    `unknown` 表示类型未知， `null` 是一种具体的值，结果会受到 `null` 的限制，最终结果会变成 `null` 类型，而不是保持 `unknown` 类型。
    
    ```typescript
    type inter = unknown & null; // null
    type inter = any & null; // any
    ```
    
    > 交叉类型与`unknown`都是其他类型
    
-   keyof unknown 是 never
    
    ```typescript
    type key = keyof unknown; // never
    // type key = keyof any; // string | number | symbol
    ```
    

## 10.条件类型

条件类型的语法类似于三元表达式

### 10-1.条件类型基本使用

可以使用`extends`关键字和三元表达式，实现条件判断。条件类型大部分场景是和泛型一起使用的

```typescript
type ResStatusMessage<S extends number> = S extends 200 | 201 | 204
  ? "success"
  : "fail";
type Message = ResStatusMessage<300>; // 传入要判断的类型

```

```typescript
type Conditional<T, C> = T extends C ? true : false;
type R1 = Conditional<"jiangwen", string>; // true
type R2 = Conditional<"jiangwen", number>; // false 条件也可以通过泛型传入
```

```typescript
interface Fish {
  name: "鱼";
}
interface Water {
  type: "水";
}
interface Bird {
  name: "鸟";
}
interface Sky {
  type: "天空";
}
type Condition<T> = T extends Fish ? Water : Sky; // 类型相同也可以使用extends
let con1: Condition<Fish> = { type: "水" };
```

### 10-2.多条件类型

```typescript
type FormatReturnType<T> = T extends string // 可以编写多条件类型
  ? string
  : T extends number
  ? number
  : never;

function sum<T extends string | number>(x: T, y: T): FormatReturnType<T> {
  return x + (y as any);
}
sum("abc", "abc"); // string
sum(123, 123); // number
```

## 11.类型兼容性问题

`extends` 本质上是判断类型的兼容性，只需要兼容则条件即可成立

### 11-1.基本数据类型的兼容性

```
type R1 = "abc" extends string ? true : false; // true
type R2 = 123 extends number ? true : false; // true
type R3 = true extends boolean ? true : false; // true

// so~~~
let r1: string = "abc";
let r2: number = 123;
let r3: boolean = true;
```

> 字面量类型可以赋予给原始数据类型。

### 11-2.联合类型的兼容性

在联合类型中，只需要符合其中一个类型即是兼容，从安全角度来看，就是你赋值的类型我这里支持。

```
type R4 = "a" extends "a" | "b" | "c" ? true : false; // true
type R5 = 123 extends 123 | 456 | 789 ? true : false; // true
type R6 = string extends boolean | string | number ? true : false;

// so~~~
let r4: "a" | "b" | "c" = "a";
let r5: 123 | 456 | 789 = 123;
let temp = "hello";
let r6: boolean | string | number = temp;
```

> 联合类型中所有成员在另一个联合类型中都能找到就是兼容

### 11-3.原始类型与装箱类型兼容性

```typescript
type R7 = string extends String ? true : false; // true
type R8 = number extends Number ? true : false; // true
type R9 = object extends Object ? true : false; // true
type R10 = String extends Object ? true : false; // true

// so~~~
let r7: String = "abc";
let r8: Number = 123;
let r9: Object = {};
let r10: Object = new String("abc");
```

> 原始类型可以赋予给装箱类型最终可以赋予给 Object 类型。

### 11-4.any 及 unknown

```typescript
type R11 = Object extends any ? true : false; // true
type R12 = Object extends unknown ? true : false; // true

// so~~~
let tempObj: Object = {};
let r11: any = tempObj;
let r12: unknown = tempObj;
```

> any 和 unkown 即为顶级类型。

### 11-5.其它类型的兼容性

-   never 是任何类型的子类型，也就是最底端的类型
-   null 和 undefiend 在严格模式下不能赋予给其他类型。undefined 可以赋予给 void 类型

```typescript
type R13 = never extends "abc" ? true : false; // true
type R14 = undefined extends undefined ? true : false; // true
type R15 = null extends null ? true : false; // true
type R16 = undefined extends void ? true : false; // true
```

> never 为最底端类型。

## 12.类型层级

> 根据类型兼容性我们可以得出以下结论：

-   **never < 字面量类型**
    
-   **字面量类型 < 字面量类型的联合类型**
    
-   **原始类型 < 原始类型的联合类型**
    
-   **原始类型 < 装箱类型 < Object 类型**
    
-   **Object < any | unknown**
    

### 12-1.unknown & any 特殊情况

```typescript
type R17 = unknown extends 1 ? true : false; // 不能赋予给除unknown之外的类型
type R18 = any extends 1 ? true : false; // boolean
type R19 = any extends any ? true : false; // 条件是 any，依然会进行判断
```

> **any**可以分解成条件满足、和不满足两部分，则**返回条件类型结果组成的联合类型**。但是与`any` 进行判断时依然会进行正常判断。

### 12-2.{} | object | Object 特殊情况

```typescript
type R20 = {} extends object ? true : false; // true
type R21 = {} extends Object ? true : false; // true

// 鸭子类型检测，可以看出对象是基于{}扩展出来的
type R22 = Object extends {} ? true : false; // true
type R23 = object extends {} ? true : false; // true

// 以下两种情况均默认成立
type R24 = Object extends object ? true : false; // true
type R25 = object extends Object ? true : false; // true
```