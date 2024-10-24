在 TypeScript 中，`infer` 是一个关键字，用于在条件类型（Conditional Types）中推断类型。`infer` 允许你在类型推断的过程中引入一个类型变量，并在条件类型的分支中使用这个类型变量。

### 理解 `infer`

`infer` 通常用于条件类型中，帮助 TypeScript 推断出某个类型。它的基本语法如下：

```typescript
T extends U ? X : Y
```

**解释**

- `T` 是一个类型。
- `U` 是一个类型。
- `X` 是一个类型。
- `Y` 是一个类型。
- `infer` 可以在 `U` 中引入一个类型变量，并在 `X` 或 `Y` 中使用这个类型变量。

### 示例

#### 推断函数的返回类型

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;

function getUser(a: number, b: number) {
  return { name: "jiangwen", age: 30 };
}

type MyReturn = ReturnType<typeof getUser>;
// 结果是 { name: string; age: number; }
```

- **解释**：
  - `ReturnType` 是一个条件类型，用于推断函数的返回类型。
  - `T extends (...args: any) => infer R ? R : never` 表示如果 `T` 是一个函数类型，则推断出函数的返回类型 `R`，否则结果类型是 `never`。
  - `infer R` 引入了一个类型变量 `R`，用于推断函数的返回类型。
  - `MyReturn` 的类型是 `{ name: string; age: number; }`，因为 `getUser` 函数的返回类型是 `{ name: string; age: number; }`。

#### 推断函数的参数类型

```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer R) => any ? R : any;

function getUser(a: number, b: number) {
  return { name: "jiangwen", age: 30 };
}

type MyParams = Parameters<typeof getUser>;
// 结果是 [number, number]
```

- **解释**：
  - `Parameters` 是一个条件类型，用于推断函数的参数类型。
  - `T extends (...args: infer R) => any ? R : any` 表示如果 `T` 是一个函数类型，则推断出函数的参数类型 `R`，否则结果类型是 `any`。
  - `infer R` 引入了一个类型变量 `R`，用于推断函数的参数类型。
  - `MyParams` 的类型是 `[number, number]`，因为 `getUser` 函数的参数类型是 `[number, number]`。



#### 推断数组的元素类型

```typescript
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

type MyArray = ArrayElementType<number[]>;
// 结果是 number
```

- **解释**：
  - `ArrayElementType` 是一个条件类型，用于推断数组的元素类型。
  - `T extends (infer U)[] ? U : never` 表示如果 `T` 是一个数组类型，则推断出数组的元素类型 `U`，否则结果类型是 `never`。
  - `infer U` 引入了一个类型变量 `U`，用于推断数组的元素类型。
  - `MyArray` 的类型是 `number`，因为 `number[]` 的元素类型是 `number`。

#### 推断元组的元素类型

```typescript
type TupleElementType<T> = T extends [infer U, ...any[]] ? U : never;

type MyTuple = TupleElementType<[number, string]>;
// 结果是 number
```

- **解释**：
  - `TupleElementType` 是一个条件类型，用于推断元组的第一个元素类型。
  - `T extends [infer U, ...any[]] ? U : never` 表示如果 `T` 是一个元组类型，则推断出元组的第一个元素类型 `U`，否则结果类型是 `never`。
  - `infer U` 引入了一个类型变量 `U`，用于推断元组的第一个元素类型。
  - `MyTuple` 的类型是 `number`，因为 `[number, string]` 的第一个元素类型是 `number`。





#### **类型交换**

```typescript
type Swap<T> = T extends [infer A, infer B] ? [B, A] : T;
type SwapS1 = Swap<["jw", 30]>; // [30, "jw"]
type SwapS2 = Swap<[1, 2, 3]>; // [1, 2, 3]
```



```typescript
type TailToHead<T> = T extends [infer A, ...infer Args, infer B]
  ? [B, A, ...Args]
  : T;
type R100 = TailToHead<["jw", 30, "回龙观"]>; // ["回龙观", "jw", 30]
```



#### **递归推断**

```typescript
type PromiseVal<T> = T extends Promise<infer V> ? PromiseVal<V> : T;
type PromiseResult = PromiseVal<Promise<Promise<number>>>; // number
```



- `PromiseVal` 是一个泛型类型，接受一个类型参数 `T`。
- `T extends Promise<infer V> ? PromiseVal<V> : T` 是一个条件类型：
  - 如果 `T` 是一个 `Promise` 类型，则推断出 `Promise` 的值类型 `V`，并递归调用 `PromiseVal<V>`。
  - 如果 `T` 不是一个 `Promise` 类型，则直接返回 `T`。



- `PromiseVal` 递归地提取出嵌套 `Promise` 的最终值类型：
  - `PromiseVal<Promise<Promise<number>>>`：
    - `Promise<Promise<number>>` 是一个 `Promise` 类型，推断出 `V` 为 `Promise<number>`。
    - `PromiseVal<Promise<number>>`：
      - `Promise<number>` 是一个 `Promise` 类型，推断出 `V` 为 `number`。
      - `PromiseVal<number>`：
        - `number` 不是一个 `Promise` 类型，直接返回 `number`。
- 因此，`PromiseResult` 的类型是 `number`。





#### **将数组类型转化为联合类型**

```typescript
// 实现方式 1：使用 ElementOf 类型
type ElementOf<T> = T extends Array<infer E> ? E : never;
type TupleToUnion = ElementOf<[string, number, boolean]>;

type ArrayElement = ElementOf<number[]>;
// 结果是 number

// 实现方式 2：使用索引访问类型
type TupleToUnion = [string, number, boolean][number];
```



`type ElementOf<T> = T extends Array<infer E> ? E : never;` : 是一个条件类型：

- 如果 `T` 是一个数组类型，则推断出数组的元素类型 `E`，并返回 `E`。
- 如果 `T` 不是一个数组类型，则返回 `never`。



`type TupleToUnion = ElementOf<[string, number, boolean]>;`  

- `[string, number, boolean]` 是一个元组类型，包含三个元素类型 `string`、`number` 和 `boolean`。

- `ElementOf<[string, number, boolean]>` 会提取出元组的元素类型，并返回一个联合类型 `string | number | boolean`。



`type TupleToUnion = [string, number, boolean][number];` 

- `[string, number, boolean]` 是一个元组类型，包含三个元素类型 `string`、`number` 和 `boolean`。
- `[string, number, boolean][number]` 使用索引访问类型，将元组的元素类型转换为联合类型 `string | number | boolean`。



### 使用场景

`infer` 在以下场景中非常有用：

1. **推断函数的返回类型**：
   - 使用 `infer` 可以方便地推断出函数的返回类型，如 `ReturnType`。

2. **推断函数的参数类型**：
   - 使用 `infer` 可以方便地推断出函数的参数类型，如 `Parameters`。

3. **推断数组的元素类型**：
   - 使用 `infer` 可以方便地推断出数组的元素类型。

4. **推断元组的元素类型**：
   - 使用 `infer` 可以方便地推断出元组的元素类型。

5. **推断对象的属性类型**：
   - 使用 `infer` 可以方便地推断出对象的属性类型。

### 总结

- `infer` 是一个关键字，用于在条件类型中推断类型。
- `infer` 允许你在类型推断的过程中引入一个类型变量，并在条件类型的分支中使用这个类型变量。
- `infer` 在推断函数的返回类型、参数类型、数组的元素类型、元组的元素类型和对象的属性类型等场景中非常有用。
