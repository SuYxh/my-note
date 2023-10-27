# 枚举类型与 const 枚举

## 枚举类型

枚举是组织收集有关联集合的一种方式，使代码更加易于阅读。其实简单来说枚举就是定义一组常量。

```typescript
enum Roles {
  SUPER_ADMIN,
  ADMIN = 3,
  USER,
}
console.log(Roles.SUPER_ADMIN); // 0
console.log(Roles.ADMIN); // 3
console.log(Roles.USER); // 4
```

枚举默认不给值的情况下，就是一个从 0 开始的数字，是可以自动进行累加的，当然也可以自己指定数值，后面的数值也是可以累加的。

枚举也支持反向枚举操作，通过数值来找到对应的 key 属性，这样操作起来会非常的灵活。

```typescript
enum Roles {
  SUPER_ADMIN,
  ADMIN = 3,
  USER,
}
console.log(Roles[0]); // SUPER_ADMIN
console.log(Roles[3]); // ADMIN
console.log(Roles[4]); // USER
```

枚举给我们的编程带来的好处就是更容易阅读代码，举例如下：

```typescript
if (role === Roles.SUPER_ADMIN) {
  // 更容易阅读
}
```

下面来看一下，如果定义成字符串的话，需要注意一些什么？

```typescript
enum Roles {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}
```

字符串形式是没有默认值的，而且不能做反向映射的。

## const 枚举

在枚举的前面可以添加一个 const 关键字。

```typescript
const enum Roles {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}
```

那么没有 const 关键字和有 const 关键字的区别是什么呢？主要区别在于编译的最终结果，const 方式最终编译出来的就是一个普通字符串，并不会产生一个对象，更有助于性能的体现。
