在 TypeScript 中，`declare` 关键字用于声明全局变量、函数、类、模块、命名空间等，而不需要提供具体的实现。`declare` 主要用于以下几种场景：

### 声明全局变量

当你需要在 TypeScript 中使用全局变量，但这些变量是由外部 JavaScript 代码或第三方库提供的，你可以使用 `declare` 来声明这些变量。

```typescript
declare var globalVar: string;

console.log(globalVar); // 使用全局变量
```

- **解释**：
  - `declare var globalVar: string;` 声明了一个全局变量 `globalVar`，类型为 `string`。
  - 这样，TypeScript 编译器就知道 `globalVar` 的存在，并允许你在代码中使用它。



或者

```typescript
// global.d.ts

declare global {
  var _: {
    version: string;
    greet: (name: string) => void;
  };
}

export {}; // 确保文件被视为模块
```

使用

```typescript
// main.ts

_ = {
  version: "1.0.0",
  greet: (name: string) => {
    console.log(`Hello, ${name}!`);
  },
};

_.greet("Alice"); // 输出: Hello, Alice!
```







### 声明全局函数

当你需要在 TypeScript 中使用全局函数，但这些函数是由外部 JavaScript 代码或第三方库提供的，你可以使用 `declare` 来声明这些函数。

```typescript
declare function greet(name: string): void;

greet("TypeScript"); // 调用全局函数
```

- **解释**：
  - `declare function greet(name: string): void;` 声明了一个全局函数 `greet`，接受一个 `string` 类型的参数，返回 `void`。
  - 这样，TypeScript 编译器就知道 `greet` 的存在，并允许你在代码中调用它。



### 声明全局类

当你需要在 TypeScript 中使用全局类，但这些类是由外部 JavaScript 代码或第三方库提供的，你可以使用 `declare` 来声明这些类。

```typescript
declare class Person {
  constructor(public name: string);
  greet(): void;
}

const person = new Person("TypeScript"); // 创建全局类的实例
person.greet(); // 调用全局类的方法
```

- **解释**：
  - `declare class Person { ... }` 声明了一个全局类 `Person`，包含一个构造函数和一个方法 `greet`。
  - 这样，TypeScript 编译器就知道 `Person` 的存在，并允许你在代码中创建它的实例并调用它的方法。



### 声明模块

当你需要在 TypeScript 中使用外部模块，但这些模块是由外部 JavaScript 代码或第三方库提供的，你可以使用 `declare` 来声明这些模块。

```typescript
declare module "my-module" {
  export function myFunction(): void;
}

import { myFunction } from "my-module";

myFunction(); // 调用模块中的函数
```

- **解释**：
  - `declare module "my-module" { ... }` 声明了一个模块 `my-module`，包含一个导出函数 `myFunction`。
  - 这样，TypeScript 编译器就知道 `my-module` 的存在，并允许你在代码中导入并使用它的导出函数。



### 声明命名空间

当你需要在 TypeScript 中使用命名空间，但这些命名空间是由外部 JavaScript 代码或第三方库提供的，你可以使用 `declare` 来声明这些命名空间。

```typescript
declare namespace MyNamespace {
  export function myFunction(): void;
}

MyNamespace.myFunction(); // 调用命名空间中的函数
```

- **解释**：
  - `declare namespace MyNamespace { ... }` 声明了一个命名空间 `MyNamespace`，包含一个导出函数 `myFunction`。
  - 这样，TypeScript 编译器就知道 `MyNamespace` 的存在，并允许你在代码中调用它的导出函数。



### 声明全局类型

当你需要在 TypeScript 中使用全局类型，但这些类型是由外部 JavaScript 代码或第三方库提供的，你可以使用 `declare` 来声明这些类型。

```typescript
declare type MyType = {
  name: string;
  age: number;
};

const obj: MyType = { name: "TypeScript", age: 10 }; // 使用全局类型
```

- **解释**：
  - `declare type MyType = { ... };` 声明了一个全局类型 `MyType`，包含两个属性 `name` 和 `age`。
  - 这样，TypeScript 编译器就知道 `MyType` 的存在，并允许你在代码中使用它。









### 声明 jpg 模块

```typescript
declare module "*.jpg" {
  const str: string;
  export default str;
}

import image from "./path/to/image.jpg";

console.log(image); // 输出图片路径字符串
```

**解释**：

- `declare module "*.jpg"` 声明了一个模块，模块名是一个通配符模式 `*.jpg`，表示所有以 `.jpg` 结尾的文件。
- `const str: string;` 声明了一个常量 `str`，类型为 `string`。
- `export default str;` 导出 `str` 作为模块的默认导出。
- `import image from "./path/to/image.jpg";` 动态导入图片文件，`image` 的类型为 `string`。
- `console.log(image);` 输出图片路径字符串。





### 声明 css 模块

```typescript
declare module "*.css" {
  const styles: { [key: string]: string };
  export default styles;
}

import styles from "./path/to/styles.css";

console.log(styles); // 输出样式对象
```

- **解释**：
  - `declare module "*.css"` 声明了一个模块，模块名是一个通配符模式 `*.css`，表示所有以 `.css` 结尾的文件。
  - `const styles: { [key: string]: string };` 声明了一个常量 `styles`，类型为对象，键为字符串，值为字符串。
  - `export default styles;` 导出 `styles` 作为模块的默认导出。
  - `import styles from "./path/to/styles.css";` 动态导入样式文件，`styles` 的类型为 `{ [key: string]: string }`。
  - `console.log(styles);` 输出样式对象。



