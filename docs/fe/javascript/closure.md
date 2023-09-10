# 闭包

作用域应用的特殊情况，有两种表现：

- 函数作为参数被传递
- 函数作为返回值被返回

函数作为参数被传递

```js
function print(fn) {
  const a = 200;
  fn();
}
const a = 100;
function fn() {
  console.log(a);
}
print(fn); // 100
```

函数作为返回值被返回

```js
function create() {
  const a = 100;
  return function () {
    console.log(a);
  };
}

const fn = create();
const a = 200;
fn(); // 100
```

::: tip
所有的自由变量的查找，是在函数定义的地方，向上级作用域查找

不是在执行的地方！！！
:::

### 闭包隐藏数据

```js
// 闭包隐藏数据，只提供 API
function createCache() {
  const data = {}; // 闭包中的数据，被隐藏，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}

const c = createCache();
c.set("a", 100);
console.log(c.get("a"));
```
