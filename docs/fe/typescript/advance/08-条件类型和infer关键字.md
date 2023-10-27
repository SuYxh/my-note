# 条件类型和 infer 关键字

在上一个小节中，学习了 Exclude 这个工具类型，那么它的底层实现原理是怎样的呢？

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

这里可以看到 Exclude 利用了 ? : 的写法来实现的，这种写法在 TS 类型中表示条件类型，让我们一起来了解下吧。

## 条件类型

条件类型就是在初始状态并不直接确定具体类型，而是通过一定的类型运算得到最终的变量类型。

```typescript
type A = string;
type B = number | string;
type C = A extends B ? {} : [];
```

条件类型需要使用`extends`关键字，如果 A 类型继承 B 类型，那么 C 类型得到问号后面的类型，如果 A 类型没有继承 B 类型，那么 C 类型得到冒号后面的类型，当无法确定 A 是否继承 B 的时候，则返回两个类型的联合类型。

那么大多数情况下，条件类型还是在内置工具类型中用的比较多，就像上面的 Exclude 方法，下面就让我们一起看一下其他内置工具类型该如何去用吧。

Extract 跟 Exclude 正好相反，得到需要筛选的类型。

```typescript
// type Extract<T, U> = T extends U ? T : never  -> 实现原理
// type A = string
type A = Extract<string | number | boolean, string>;
```

NonNullable 用于排除 null 和 undefined 这些类型。

```typescript
//type NonNullable<T> = T extends null | undefined ? never : T;  -> 实现原理
//type A = string
type A = NonNullable<string | null | undefined>;
```

Parameters 可以把函数的参数转成对应的元组类型。

```typescript
type Foo = (n: number, m: string) => string;
//type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;   -> 实现原理
// type A = [n: number, m: string]
type A = Parameters<Foo>;
```

在 Parameters 方法的实现原理中，出现了一个`infer`关键字，它主要是用于在程序中对类型进行定义，通过得到定义的 p 类型来决定最终要的结果。

ReturnType 可以把函数的返回值提取出类型。

```typescript
type Foo = (n: number, m: string) => string;
//type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;   -> 实现原理
//type A = string
type A = ReturnType<Foo>;
```

这里也通过`infer`关键字定义了一个 R 类型，对应的就是函数返回值的类型。通过`infer`关键字可以在泛型之外也可以定义类型出来。

下面再利用`infer`来实现一个小功能，定义一个类型方法，当传递一个数组的时候返回子项的类型，当传递一个基本类型的时候就返回这个基本类型。

```typescript
type A<T> = T extends Array<infer U> ? U : T;
// type B = number
type B = A<Array<number>>;
// type C = string
type C = A<string>;
```

这里的 U 就是自动推断出的数组里的子元素类型，那么就可以完成我们的需求。
