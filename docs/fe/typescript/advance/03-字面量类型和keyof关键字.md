# 字面量类型和 keyof 关键字

## 字面量类型

在 TS 中可以把字面量作为具体的类型来使用，当使用字面量作为具体类型时, 该类型的取值就必须是该字面量的值。

```typescript
type A = 1;
let a: A = 1;
```

这里的 A 对应一个 1 这样的值，所以 A 类型就是字面量类型，那么 a 变量就只能选择 1 作为可选的值，除了 1 作为值以外，那么其他值都不能赋值给 a 变量。

那么字面量类型到底有什么作用呢？实际上字面量类型可以把类型进行缩小，只在指定的范围内生效，这样可以保证值不易写错。

```typescript
type A = "linear" | "swing";
let a: A = "ease"; // error
```

比如 a 变量，只有两个选择，要么是 linear 要么是 swing，不能是其他的第三个值作为选项存在。

## keyof 关键字

在一个定义好的接口中，想把接口中的每一个属性提取出来，形成一个联合的字面量类型，那么就可以利用 keyof 关键字来实现。

```typescript
interface A {
  username: string;
  age: number;
}
//keyof A -> 'username'|'age'
let a: keyof A = "username";
```

如果我们利用 typeof 语法去引用一个变量，可以得到这个变量所对应的类型，如下：

```typescript
let a = "hello";
type A = typeof a; // string
```

那么利用这样一个特性，可以通过一个对象得到对应的字面量类型，把 typeof 和 keyof 两个关键字结合使用。

```typescript
let obj: {
  username: "xiaoming";
  age: 20;
};
let a: keyof typeof obj = "username";
```
