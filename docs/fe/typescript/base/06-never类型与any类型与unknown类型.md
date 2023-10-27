# never 类型与 any 类型与 unknown 类型

在本小节中将学习一些 TS 中提供的新的类型，比如：never 类型，any 类型，unknown 类型。

## never 类型

never 类型表示永不存在的值的类型，当一个值不存在的时候就会被自动类型推断成 never 类型。

```typescript
// let a: never ->  不能将类型“number”分配给类型“never”
let a: number & string = 123;
```

在这段代码中 a 变量要求类型既是数字又是字符串，而值是一个 123 无法满足类型的需求，所以 a 会被自动推断成 never 类型。所以 never 类型并不常用，只是在出现问题的时候会被自动转成 never。

有时候也可以利用 never 类型的特点，实现一些小技巧应用，例如可以实现判断参数是否都已被使用，代码如下：

```typescript
function foo(n: 1 | 2 | 3) {
  switch (n) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    default:
      let m: never = n; // 检测n是否可以走到这里，看所有值是否全部被使用到
      break;
  }
}
```

## any 类型和 unknown 类型

any 类型表示任意类型，而 unknown 类型表示为未知类型，是 any 类型对应的安全类型。

既然 any 表示任意类型，那么定义的变量可以随意修改其类型，这样带来的问题就是 TS 不再进行类型强制，整个使用方式根 JS 没有任何区别。

```typescript
let a: any = "hello";
a = 123;
a = true;
a.map(() => {}); // success
```

所以说 any 类型是 TS 中的后门，不到万不得已的时候尽量要少用，如果真的有这种需求的话，可以采用 any 对应的安全类型 unknown 来进行定义。

```typescript
let a: unknown = "hello";
a = 123;
// any不进行检测了，unknown使用的时候，TS默认会进行检测
a.map(() => {}); // error
```

unknown 类型让程序使用的时候更加严谨，我们必须主动告诉 TS，这里是一个什么类型，防止我们产生误操作。那么怎样让 unknown 类型不产生错误呢？就需要配合类型断言去使用，下一个小节我们一起来学习吧。
