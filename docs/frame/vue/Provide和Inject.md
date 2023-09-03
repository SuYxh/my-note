> 原文： https://juejin.cn/post/7267487352455921723

两个`inject`工具函数轻松解决**严格注入**和**Hook 返回值透传**问题！

![image.png](https://qn.huat.xyz/mac/202309021950240.awebp)

![image.png](https://qn.huat.xyz/mac/202309021950795.awebp)

## 痛苦的经历

自从使用了`Provide/Inject`代码的组织方式更加灵活了，但是这个**灵活性的增加伴随着代码容错性的降低**。我相信只要是真的在项目中引入`Provide/Inject`的同学，一定一定有过或者正在经历下面的状况：

- 😢 注入名（Injection key）经常拼错，又或者注入名太多导致注入名取名困难(程序员通病)
- 🤨 为了弄清楚`inject()`注入的是啥，不得不找到对应`provide()`
- 😓 另一种情况是重复`provide()`同一值，导致 Injection 覆盖
- 🥴 使用`inject()`时祖先链上未必存在对应的`provide()`，不得不做空值处理或默认值处理
- 😑 在 hook 中使用`provide()`，但是调用 hook 的组件无法`inject()`这个 hook 的`provide()`
- ...

## Provide/Inject 解决了什么问题？

[依赖注入|Vue.js](https://link.juejin.cn/?target=)中提到`Provide/Inject`这两个 API 主要是用来解决**Prop 逐级透传问题**（就像下面这样）

![image.png](https://qn.huat.xyz/mac/202309021950533.awebp)

引入`Provide/Inject`后`Prop`就可以直接传入到后代组件（就像下面这样）

![image.png](https://qn.huat.xyz/mac/202309021950149.awebp)

根组件中通过`provide`提供注入值，示例代码如下：

```typescript
import { provide } from "vue";

provide(/* 注入名 */ "account", /* 值 */ { name: "youth" });
```

后代组件中通过`inject`获取祖先组件注入的值，示例代码如下：

```typescript
import { inject } from "vue";

const message = inject("account");
```

当只是在项目中小范围的使用`provide`和`inject`时，上面示例的写法没什么问题。但是如果项目工程较大，代码量也多的情况下，就会出现一些问题。

## 注入名冲突

问题是如何保证`account`不会被其他业务组件覆盖？例如如果某个业务组件也提供了`account`的信息，就像下面这样：

![image.png](https://qn.huat.xyz/mac/202309021950727.awebp)

中间层的`ParentView`组件可能是一个用户列表组件，也提供了`account`数据，这里的`account`可能是列表选中的用户，而`Main`中提供的是当前用户。在`DeepChild`组件中可能即需要当前登录用户信息，又需要列表选中的用户信息，而目前`DeepChild`中只能获取到`ParentView`提供的选中用户信息。

> 当然这种业务场景有很多解决方案，这里先认为只能通过`provide/inject`解决（不杠哈 🌝）

当然我们完全可以在`ParentView`中将注入名改写为`selectAccount`来解决这个问题，但是如果中间层还有其他的组件，这些组件也有`selectAccount`呢？

### 实践方案

在项目中创建一个名为`injection-key.ts`的文件，我习惯将该文件创建为`src/constants/injection-key.ts`。这样在该文件中统一管理项目下的注入名，并且**使用`Symbol`来创建注入名，来回避取名冲突**

```typescript
export const CurAccountKey = Symbol("account");

export const AuthAccountKey = Symbol("account");
```

用法示例：

`Main.vue`:

```vue
import { provide } from 'vue'; import { CurAccountKey } from
'@/constants/injectionKeys'; const user = reactive({ id: 1, name: 'youth' });
provide(CurAccountKey, user);
```

`ParentView.vue`:

```vue
import { provide } from 'vue'; import { AuthAccountKey } from
'@/constants/injectionKeys'; const user = reactive({ id: 1, name: 'John Doe' });
provide(AuthAccountKey, user);
```

`DeepChild.vue`:

```vue
import { inject } from 'vue'; import { AuthAccountKey, CurAccountKey } from
'@/constants/injectionKeys'; const curAccount = inject(CurAccountKey); const
authAccount = inject(AuthAccountKey);
```

## 注入提示

但是使用`inject(CurAccountKey)`会代码什么样的数据？这就不得不全局查找`CurAccountKey`的`provide`了。这种的使用体验十分不好，这时 Vue 官方推荐我们使用 TS。

```typescript
import { inject } from "vue";
import { AuthAccountKey, CurAccountKey } from "@/constants/injectionKeys";

const curAccount = inject(CurAccountKey);
curAccount.name; // curAccount存在name吗？
```

### 实践方案

[Vue|为 provide / inject 标注类型]()中提到了`InjectionKey`类型，**使用 TS 和`InjectionKey`可以有效解决类型提示问题**

`src/types.ts`:

```typescript
export interface Account {
  name: string;
  id: number;
}
```

`src/constants/injection-key.ts`:

```typescript
import { InjectionKey } from "vue";
import { Account } from "@/types";

export const CurAccountKey: InjectionKey<Account> = Symbol("account");
```

`Main.vue`:

```vue
import { provide } from 'vue'; import { CurAccountKey } from
'@/constants/injectionKeys'; const user = reactive({ id: 1, name: 'youth' });
provide(CurAccountKey, 'name: youth'); // ❌ provide(CurAccountKey, user); // 💯
```

`DeepChild.vue`:

```vue
const curAccount = inject(CurAccountKey); curAccount?.age; // ❌ curAccount?.id;
// 💯
```

## 严格注入

默认情况下，`inject`  假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告

```typescript
const curAccount = inject(CurAccountKey);
curAccount?.id;
```

当然有时候我们可能并不是要求必须在祖先链上提供，这时候 Vue 官方推荐我们使用默认值来解决祖先链未提供值的情况，这也仅仅是能解决`inject`值不是必要值的情况

但是有些情况下我们又**要求祖先链上必须提供需要的`inject`**，这种情况更常见的是通用型组件开发中。例如：`<ElTable>`和`<ElTableColumn>`组件，`<ElTableColumn>`的祖先链上必须存在`<ElTable>`组件。如果单独使用`<ElTableColumn>`是不合法的，这时候应该抛出错误 ❌ 而不是警告 ⚠️

要解决上面的严格依赖问题，我们当然可以在子组件中通过判断`inject`的值是否为`undefined`，如果是则抛出异常。这种代码很简单：

```typescript
const curAccount = inject(CurAccountKey);
if (!curAccount) {
  throw new Error("CurAccountKey必须提供对应的Provide");
}
curAccount.id;
```

嗯，不错！是解决了问题！如果严格依赖的很多呢？难不成到处都是`if`判断？

### 实践方案

创建一个严格注入工具函数，当对应的注入名没有被提供时抛出异常。

```typescript
export const injectStrict = <T>(
  key: InjectionKey<T>,
  defaultValue?: T | (() => T),
  treatDefaultAsFactory?: false
): T => {
  const result = inject(key, defaultValue, treatDefaultAsFactory);
  if (!result) {
    throw new Error(`Could not resolve ${key.description}`);
  }
  return result;
};
```

使用`injectStrict`重写吧：

```typescript
const curAccount = injectStrict(CurAccountKey);
curAccount.id;
```

## 再谈逐级穿透

**在 Vue 中 Provide 组件无法使用 provide 值**

这个看着有点绕，直观来看使用情况是这样的：

```typescript
const user = reactive({ id: 1, name: 'youth' });
provide(CurAccountKey, user);

...

inject(CurAccount); // 这里无法获取👆提供的user
```

哎？😯 这时候有的同学肯定会说，Provide 组件使用`provide`的值？有没有搞错啊？怎么会有这种操作？

```typescript
const user = reactive({ id: 1, name: "youth" });
provide(CurAccountKey, user);

//这里需要user值的时候，直接用不就好了？？
user;
```

### 逐级透传问题又来了

但是，别忘了自定义`hook`的情况啊！！如果`provide(CurAccountKey, user);`是在一个自定义的`hook`中的呢？

`useAccount.ts`:

```typescript
export const useAccount = async () => {
  const user = await fetch("/**/*");
  provide(CurAccountKey, user);
  return { user };
};
```

如果是直接调用`useAccount`还不是问题，因为`useAccount`返回了`user`。在调用`userAccount`的地方可以直接解构出`user`，这样很直观也很方便。

**如果`useAccount`被其他的`hook`再次封装呢？**

`useApp.ts`:

```typescript
export const useApp = async () => {
  const account = await useAccount();
  ...
  return {
    account
  }
}
```

当然，这也不是没有解决方法，可以在`useApp`中解构`account`再返回

`useApp.ts`:

```typescript
export const useApp = async () => {
  const account = await useAccount();
  ...
  return {
    ...account
  }
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23514e7cc0e34ab1859166a95b2590bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

等下？有没有觉得这种情况很熟悉？我们把`hook`换成组件，情况是不是就是这样：

![image.png](https://qn.huat.xyz/mac/202309021953971.awebp)

不能说相似，只能说一毛一样啊！`Provide/Inject`的出现就是为了解决这样的问题，但是当在`hook`中出现透传时，却又成了最初的样子啊！

**屠龙勇士最终变成恶龙？**

你可能会说那没办法呀！**Vue 无法在当前组件中获取到当前组件的`provide`**，还能有什么好招？先 🐶 着吧！

### 实践方案

解决上面问题的方案也很简单，就是获取当前组件实例，然后从组件实例中找到`provide`的值就好了！

既然 Vue 本身无法支持当前组件获取当前组件的`provide`，那我们自己实现一个吧！

```typescript
import { getCurrentInstance, inject, InjectionKey } from "vue";

export const injectWithSelf = <T>(key: InjectionKey<T>): T | undefined => {
  const vm = getCurrentInstance() as any;
  return vm?.provides[key as any] || inject(key);
};
```

这里我们**从当前组件的实例中找到对应 key 的`provide`值，如果不存在就走`inject`从祖先链组件中获取**。

使用`injectWithSelf`重写一下吧：

`useAccount.ts`:

```typescript
export const useAccount = async () => {
  const user = await fetch("/**/*");
  provide(CurAccountKey, user);
  return { user };
};
```

`useApp.ts`:

```typescript
export const useApp = async () => {
  const account = await useAccount();
  ...
  return {
    account
  }
}
```

`Main.vue`:

```typescript
useApp();

// 必须在useApp()之后
const user = injectWithSelf(CurAccountKey);
```

## 最后

- **使用`Symbol`来创建注入名，来回避取名冲突**
- **使用 TS 和`InjectionKey`可以有效解决类型提示问题**
- **使用自定义`injectStrict`可以解决严格注入问题**
- **使用自定义`injectWithSelf`可以解决`hook`嵌套时的返回值逐级穿透问题**

如果你觉得这篇文章对你在开发中有所帮助，麻烦多点赞评论收藏 😊

如果...，麻烦多点赞评论收藏 😊

![image.png](https://qn.huat.xyz/mac/202309021954096.awebp)
