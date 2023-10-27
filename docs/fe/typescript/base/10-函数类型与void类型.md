# 函数类型与 void 类型

## 函数类型

在 TS 中对于函数的类型使用方式有很多种限定，先来看一下函数的参数：

```typescript
function foo(n: number, m?: string): number {
  return 123;
}
foo(123, "hello");
foo(123); // success
```

TS 中要求，实参的个数跟形参的个数必须相同，所以可以添加可选链`?`来实现参数可选操作。

函数还可以通过在函数中定义返回值的类型`:number`，可以参考上面代码。

下面看一下函数表达式的写法，及类型注解的方式。

```typescript
let foo: (n: number, m: string) => number = function (n, m) {
  return 123;
};
```

如果在前面进行了类型注解，那么就不用在函数体内进行类型的添加了。

## void 类型

表示函数没有任何返回值的时候得到的类型。

```typescript
let foo = function () {
  // void
};
```

当函数没有 return 的时候返回 void 类型，当 return undefined 的时候也可以返回 void 类型。那么函数定义 void 类型跟 undefined 类型也是有区别的，因为 undefined 类型是不能不写 return 的。

```typescript
let foo = function (): undefined {
  // undefined 不能不写return的
}; // error
```
