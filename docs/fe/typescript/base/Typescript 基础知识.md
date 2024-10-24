## 1.Typescript 基础

> 目前大部分企业的中大型前端项目都采用了 Typescript，那么为什么我们需要它？

JavaScript 的核心特点就是灵活，但随着项目规模的增大，灵活反而增加开发者的心智负担。例如在代码中一个变量可以被赋予字符串、布尔、数字、甚至是函数，这样就充满了不确定性。而且这些不确定性可能需要在代码运行的时候才能被发现，**所以我们需要类型的约束**。

**当然不可否认的是有了类型的加持多少会影响开发效率，但是可以让大型项目更加健壮**

-   Typescript 更像后端 JAVA，让`JS`可以开发大型企业应用；
    
-   TS 提供的类型系统可以帮助我们在写代码时提供丰富的语法提示；
    
-   在编写代码时会对代码进行类型检查从而避免很多线上错误；
    

> 越来越多的项目开始拥抱 TS 了，典型的 Vue3、Pinia、第三方工具库、后端 NodeJS 等。我们也经常为了让编辑器拥有更好的支持去编写\*\*.d.ts 文件\*\*。

## 1\. 什么是 Typescript

TypeScript 是一门编程语言，`TypeScript`是`Javascript`的超集（任何的`JS`代码都可以看成`TS`代码），同时`Typescript`扩展了`Javascript`语法添加了静态类型支持以及其他一些新特性。

![](https://qn.huat.xyz/mac/202410241220917.jpg)

> TypeScript 代码最终会被编译成 JavaScript 代码，以在各种不同的运行环境中执行。

## 2.环境配置

### 2-1.全局编译 TS 文件

全局安装`typescript`对`TS`进行编译

```typescript
npm install typescript -g
tsc --init # 生成tsconfig.json
```

```typescript
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成js文件
```

### 2-2 ts-node 执行 TS 文件

```typescript
npm install ts-node -g
```

### 2-3.配置`rollup`开发环境

-   安装依赖
    
    ```typescript
    pnpm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
    ```
    
-   初始化`TS`配置文件
    
    ```typescript
    npx tsc --init
    ```
    
-   `rollup`配置操作`rollup.config.mjs`
    
    ```typescript
    import ts from "rollup-plugin-typescript2";
    import { nodeResolve } from "@rollup/plugin-node-resolve";
    import serve from "rollup-plugin-serve";
    import path from "path";
    import { fileURLToPath } from "url";
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    export default {
      input: "src/index.ts",
      output: {
        format: "iife",
        file: path.resolve(__dirname, "dist/bundle.js"),
        sourcemap: true,
      },
      plugins: [
        nodeResolve({
          extensions: [".js", ".ts"],
        }),
        ts({
          tsconfig: path.resolve(__dirname, "tsconfig.json"),
        }),
        serve({
          open: true,
          openPage: "/public/index.html",
          port: "3000",
        }),
      ],
    };
    
    ```
    
-   `package.json`配置
    
    ```typescript
    "scripts": {
        "start": "rollup -c -w"
    }
    ```
    



## 3.常用插件

-   [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) 提示错误插件
-   TypeScript 内置配置 （code->首选项->settings）根据需要打开设置即可。

## 4.基础类型

TS 中有很多类型：内置的类型 （DOM、Promise 等都在 typescript 模块中） 基础类型、高级类型、自定义类型。

**TS 中冒号后面的都为类型标识，等号后面的都是值。**

-   ts 类型要考虑安全性，一切从安全角度上触发。
-   ts 在使用的时候程序还没有运行
-   ts 中有类型推导， 会自动根据赋予的值来返回类型，只有无法推到或者把某个值赋予给某个变量的时候我们需要添加类型。

### 4-1.布尔、数字、字符串类型

```typescript
let name: string = "Jiang"; // 全局也有name属性，需要采用模块化解决冲突问题
let age: number = 30;
let handsome: boolean = true;
```

> 我们标识类型的时候 原始数据类型全部用小写的类型，如果描述实例类型则用大写类型（大写类型就是**装箱类型**，其中也包含**拆箱类型**）

```typescript
let s1: string = "abc";
let s2: string = new String("abc"); // 不支持
let s3: String = new String("abc");
let s4: String = "abc";
```

**什么是包装对象？**

我们在使用原始数据类型时，调用原始数据类型上的方法，默认会将原始数据类型包装成对象类型。

### 4-2.数组

**数组**用于储存多个相同类型数据的集合。 TypeScript 中有两种方式来声明一个数组类型

```typescript
let arr1: number[] = [1, 2, 3];
let arr2: string[] = ["1", "2", "3"];
let arr3: (number | string)[] = [1, "2", 3]; // 联合类型
let arr4: Array<number | string> = [1, "2", 3]; // 后面讲泛型的时候 详细说为什么可以这样写
```

### 4-3.元组类型

元组的特点就 固定长度 固定类型的一个数组

```typescript
let tuple1: [string, number, boolean] = ["jw", 30, true];
tuple[3]; // 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
let tuple2: [name: string, age: number, handsome?: boolean] = ["jw", 30, true]; // 具名元祖
```

```typescript
let tuple3: [string, number, boolean] = ["jw", 30, true];
tuple3.push("回龙观"); // ✅ 像元组中增加数据，只能增加元组中存放的类型，但是为了安全依然无法取到新增的属性
// tuple3.push({ address: "回龙观" }); // ❎

let tuple4: readonly [string, number, boolean] = ["jw", 30, true];
// 仅读元祖，不能修改，同时会禁用掉修改数组的相关方法
```



### 4-4.枚举类型

枚举可以看做是自带类型的对象，枚举的值为数字时会自动根据第一个的值来递增 ，枚举中里面是数字的时候可以反举。

```typescript
enum USER_ROLE {
  USER, // 默认从0开始
  ADMIN,
  MANAGER,
}
// {0: "USER", 1: "ADMIN", 2: "MANAGER", USER: 0, ADMIN: 1, MANAGER: 2}

```

**可以枚举，也可以反举**

```typescript
// 编译后的结果
(function (USER_ROLE) {
  USER_ROLE[(USER_ROLE["USER"] = 0)] = "USER";
  USER_ROLE[(USER_ROLE["ADMIN"] = 1)] = "ADMIN";
  USER_ROLE[(USER_ROLE["MANAGER"] = 2)] = "MANAGER";
})(USER_ROLE || (USER_ROLE = {}));

```

**异构枚举**

```typescript
enum USER_ROLE {
  USER = "user",
  ADMIN = 1,
  MANAGER, // 2
}
```

**常量枚举**

```typescript
const enum USER_ROLE {
  USER,
  ADMIN,
  MANAGER,
}
console.log(USER_ROLE.USER); // console.log(0 /* USER */);
```

### 4-5.null 和 undefined

任何类型的子类型，如果`TSconfig`配置中`strictNullChecks`的值为 true，则不能把 null 和 undefined 赋给其他类型。

```typescript
let u1: undefined = undefined;
let n1: null = null; // 默认情况下 只能null给null ， undefiend给undefiend
```

```typescript
let name1: number | boolean;
name1 = null;
name1 = undefined; // 非严格模式
```

### 4-6.void 类型

只能接受 null，undefined。void 表示的是空 (通常在函数的返回值中里来用)；undefiend 也是空，所以 undefiend 可以赋值给 void。严格模式下不能将 null 赋予给 void。

```typescript
function fn1() {}
function fn2() {
  return;
}
function fn3(): void {
  return undefined;
}
```

### 4-7.never 类型

任何类型的子类型，never 代表不会出现的值（这个类型不存在）。不能把其他类型赋值给 never。

```typescript
function fn(): never {
  //   throw new Error();
  while (true) {}
}
let a: never = fn(); // never只能赋予给never
let b: number = a; // never是任何类型的子类型，可以赋值给任何类型
```

**never 实现完整性保护**

```typescript
function validate(type: never) {} // 类型“boolean”的参数不能赋给类型“never”的参数。
function getResult(strOrNumOrBool: string | number | boolean) {
  if (typeof strOrNumOrBool === "string") {
    return strOrNumOrBool.split("");
  } else if (typeof strOrNumOrBool === "number") {
    return strOrNumOrBool.toFixed(2);
  }
  // 能将类型“boolean”分配给类型“never”。
  validate(strOrNumOrBool);
}
```

**联合类型自动去除 never**

```typescript
let noNever: string | number | boolean | never = 1; // never自动过滤
//  string | number | boolean
```

### 4-8.object 对象类型

`object`表示非原始类型

```typescript
let create = (obj: object) => {};
create({});
create([]);
create(function () {});
```

这里要注意不能使用大写的 Object 或 {} 作为类型，因为万物皆对象（涵盖了原始数据类型）。

**object、Object、{} 的区别**

-   `object`非原始类型；
-   `Object`所有值都可以赋予给这个包装类型；
-   `{}`字面量对象类型；

### 4-9.Symbol 类型

Symbol 表示独一无二

```typescript
const s1 = Symbol("key");
const s2 = Symbol("key");
console.log(s1 == s2); // 此条件将始终返回 "false"，因为类型 "typeof s11" 和 "typeof s12" 没有重叠
```

### 4-10.BigInt 类型

```typescript
const num1 = Number.MAX_SAFE_INTEGER + 1;
const num2 = Number.MAX_SAFE_INTEGER + 2;
console.log(num1 == num2); // true

let max: bigint = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max + BigInt(1) === max + BigInt(2));
```

> `number`类型和`bigInt`类型是不兼容的

### 4-11.any 类型

不进行类型检测，一旦写了 any 之后任何的校验都会失效。声明变量没有赋值时默认为 any 类型，写多了 any 就变成 AnyScript 了，当然有些场景下 any 是必要的。

```typescript
let arr: any = ["jw", true];
arr = "回龙观";
```



## 5.变量类型推断

TypeScript 的类型推断是根据变量的初始化值来进行推断的。如果声明变量没有赋予值时默认变量是`any`类型。

```typescript
let name; // 类型为any
name = "jiangwen";
name = 30;
```

**声明变量赋值时则以赋值类型为准**

```typescript
let name = "jiangwen"; // name被推导为字符串类型
name = 30;
```

## 6.联合类型

在使用联合类型时，没有赋值只能访问联合类型中共有的方法和属性。

```typescript
let name: string | number; // 联合类型
console.log(name.toString()); // 公共方法
name = 30;
console.log(name.toFixed(2)); // number方法
name = "jiangwen";
console.log(name.toLowerCase()); // 字符串方法
```

### 6-1.**字面量联合类型**

```typescript
// 通常字面量类型与联合类型一同使用
type Direction = "Up" | "Down" | "Left" | "Right";
let direction: Direction = "Down";
```

> 可以用字面量当做类型，同时也表明只能采用这几个值（限定值）。类似枚举。

### 6-2.**对象的联合类型**

```typescript
type women =
  | {
      wealthy: true;
      waste: string;
    }
  | {
      wealthy: false;
      morality: string;
    };

let richWoman: women = {
  wealthy: true,
  waste: "不停的购物",
  morality: "勤俭持家", // 对象类型的互斥
};
```

> 可以实现对象中的属性互斥。

## 7.类型断言

将变量的已有类型更改为新指定的类型，默认只能断言成包含的某个类型。

-   非空断言
    
    ```typescript
    let ele: HTMLElement | null = document.getElementById("#app");
    console.log(ele?.style.color); // JS中链判断运算符
    ele!.style.color = "red"; // TS中非空断言ele元素一定有值
    ```
    
    -   可选链操作符 `?.` 在访问对象的属性或方法时，先检查目标对象及其属性是否存在。
    -   空值合并操作符 `??` ，当左侧的表达式结果为 `null` 或 `undefined` 时，会返回右侧的值。
-   类型断言
    
    ```typescript
    let name: string | number;
    (name! as number).toFixed(2); // 强制
    (<number>name!).toFixed(2);
    
    name as boolean; // 错误 类型 "string | number" 到类型 "boolean" 的转换可能是错误的
    ```
    
    > 尽量使用第一种类型断言因为在 React 中第二种方式会被认为是`jsx`语法
    
-   双重断言
    
    ```typescript
    let name: string | boolean;
    name! as any as string;
    ```
    
    > 尽量不要使用双重断言，会破坏原有类型关系，断言为 any 是因为 any 类型可以被赋值给其他类型。
    

## 8.函数类型

函数的类型就是描述了**函数入参类型与函数返回值类型**

### 8-1.函数的两种声明方式

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
    

### 8-2.可选参数

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

### 8-3.剩余参数

```typescript
const sum = (...rest: string[]): string => {
  return rest.reduce((memo, current) => (memo += current), "");
};
sum("a", "b", "c", "d");
```

### 8-4.this 类型

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
-   keyof 获取类型对应的所有 key 类型

## 9.函数的重载

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

## 10.类

类由三部分组成：构造函数、属性（实例属性、原型属性）、方法（实例方法、原型方法、访问器）

### 10-1.TS 中定义类

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

### 10-2.类中的修饰符

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
      constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
      }
    }
    ```
    
-   `protected`修饰符 (自己和子类可以访问到)
    
    ```typescript
    class Animal {
      constructor(protected name: string, protected age: number) {
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
    console.log(p.name, p.age); // 属性“name”受保护，只能在类“Animal”及其子类中访问。
    ```
    
-   `private`修饰符 （除了自己都访问不到）
    
    ```typescript
    class Animal {
      constructor(private name: string, private age: number) {
        this.name = name;
        this.age = age;
      }
    }
    class Cat extends Animal {
      constructor(name: string, age: number) {
        super(name, age);
        console.log(this.name, this.age); // 无法访问
      }
    }
    let p = new Cat("Tom", 18);
    console.log(p.name, p.age); // 无法访问
    ```
    
-   `readonly`修饰符 （仅读修饰符）
    
    > reaonly 在构造函数中可以随意修改（初始化） 在其他的地方就不能再次修改了。
    
    ```typescript
    class Animal {
      constructor(public readonly name: string, public age: number) {
        this.name = "init";
        this.age = age;
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
    

### 10-3.静态属性和方法

```typescript
class Animal {
  static type = "哺乳动物"; // 静态属性
  static getName() {
    // 静态方法
    return "动物类";
  }
  private _name: string = "Tom";
  get name() {
    // 属性访问器
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}
let animal = new Animal();
console.log(animal.name);
```

> 静态属性和静态方法是可以被子类所继承的。

### 10-4.Super 属性

```typescript
class Animal {
  say(message: string) {
    console.log(message);
  }
  static getType() {
    return "动物";
  }
}
class Cat extends Animal {
  say() {
    // 原型方法中的super指代的是父类的原型
    super.say("猫猫叫");
  }
  static getType() {
    // 静态方法中的super指代的是父类
    return super.getType();
  }
}
let cat = new Cat();
console.log(Cat.getType());
```

> 这里要注意子类重写父类的方法，类型需要兼容。

```typescript
class Animal {
  say(message: string): void {
    // 这里的void表示不关心返回值
    console.log(message);
  }
}
class Cat extends Animal {
  say(message: string) {
    super.say(message);
  }
}
let cat = new Cat();
cat.say("我要吃鱼");
```

### 10-5.私有构造函数

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

### 10-6.抽象类

抽象类描述了一个类中应当有哪些成员（属性、方法等），如果在父类中定义了抽象方法，那么子类必须要实现。

-   抽象类中不能声明静态的抽象成员
    
-   抽象类中可以包含具体的实现
    
-   抽象类不能被_new_
    

```typescript
abstract class Animal {
  // abstract static type = '哺乳动物' // “static”修饰符不能与“abstract”修饰符一起使用。

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

### 10-7.重载

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