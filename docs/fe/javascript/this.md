# this

- 作为普通函数
- 作为对象方法被调用
- 在 class 方法中调用
- 使用 call apply bind
- 箭头函数

![image-20230910112538518](https://qn.huat.xyz/mac/202309101125547.png)

![image-20230910112633363](https://qn.huat.xyz/mac/202309101126387.png)

![image-20230910112655938](https://qn.huat.xyz/mac/202309101126962.png)

```js
// 模拟 bind
Function.prototype.bind1 = function () {
  // 将参数拆解为数组
  const args = Array.prototype.slice.call(arguments);

  // 获取 this（数组第一项）
  const t = args.shift();

  // fn1.bind(...) 中的 fn1
  const self = this;

  // 返回一个函数
  return function () {
    return self.apply(t, args);
  };
};

function fn1(a, b, c) {
  console.log("this", this);
  console.log(a, b, c);
  return "this is fn1";
}

const fn2 = fn1.bind1({ x: 100 }, 10, 20, 30);
const res = fn2();
console.log(res);
```
