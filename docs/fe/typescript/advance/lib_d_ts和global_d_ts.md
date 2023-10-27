# lib.d.ts 和 global.d.ts

## lib.d.ts

当你安装 TypeScript 时，会顺带安装一个 lib.d.ts 声明文件。这个文件包含 JavaScript 运行时以及 DOM 中存在各种常见的环境声明。

当我们使用一些原生 JS 操作的时候，也会拥有类型，代码如下：

```typescript
let body: HTMLBodyElement | null = document.querySelector("body");
let date: Date = new Date();
```

这里的`HTMLBodyElement`和`Date`都是 TypeScript 下自带的一些内置类型，这些类型都存放在 lib 这个文件夹下。

<div align=center>
    <img src="./img/09-01-lib.d.ts.png" />
    <div>lib.d.ts</div>
</div>

## global.d.ts

有时候我们也想扩展像 lib.d.ts 这样的声明类型，可以在全局下进行使用，所以 TS 给我们提供了 global.d.ts 文件使用方式，这个文件中定义的类型都是可以直接在全局下进行使用的，不需要模块导入。

```typescript
// global.d.ts
type A = string;
```

```typescript
// 1_demo.ts
let a: A = "hello"; // ✔
let b: A = 123; // ✖
```
