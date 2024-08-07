

### String Skill



#### 格式化金钱

```
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = ThousandNum(20190214);
// money => "20,190,214"
```



#### 生成随机ID

```js
const RandomId = len => Math.random().toString(36).substr(3, len);
const id = RandomId(10);
// id => "jg7zpgiqva"
```

#### 生成随机HEX色值

```js
const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();
// color => "#f03665"
```

#### 生成星级评分

```js
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);
// start => "★★★"
```

#### 操作URL查询参数

```js
const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=young&sex=male"
params.has("young"); // true
params.get("sex"); // "male"
```

### Number Skill



#### 取整

> 代替正数的`Math.floor()`，代替负数的`Math.ceil()`

```js
const num1 = ~~ 1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1
```

#### 补零

```js
const FillZero = (num, len) => num.toString().padStart(len, "0");
const num = FillZero(169, 5);
// num => "00169"
```

#### 时间戳

```js
const timestamp = +new Date("2019-02-14");
// timestamp => 1550102400000
```

#### 精确小数

```js
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);
// num => 1.7
```

#### 判断奇偶

```js
const OddEven = num => !!(num & 1) ? "odd" : "even";
const num = OddEven(2);
// num => "even"
```

#### 取最小最大值

```js
const arr = [0, 1, 2];
const min = Math.min(...arr);
const max = Math.max(...arr);
// min max => 0 2
```

#### 生成范围随机数

```js
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const num = RandomNum(1, 10);
```

### Boolean Skill

#### 判断数据类型

> 可判断类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap

```js
function DataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
}
DataType("young"); // "string"
DataType(20190214); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false
```

#### 是否为空数组

```js
const arr = [];
const flag = Array.isArray(arr) && !arr.length;
// flag => true
```

#### 是否为空对象

```js
const obj = {};
const flag = DataType(obj, "object") && !Object.keys(obj).length;
// flag => true
```

#### 满足条件时执行

```js
const flagA = true; // 条件A
const flagB = false; // 条件B
(flagA || flagB) && Func(); // 满足A或B时执行
(flagA || !flagB) && Func(); // 满足A或不满足B时执行
flagA && flagB && Func(); // 同时满足A和B时执行
flagA && !flagB && Func(); // 满足A且不满足B时执行
```

#### 

#### 函数退出代替条件分支退出

```js
if (flag) {
    Func();
    return false;
}
// 换成
if (flag) {
    return Func();
}
```

#### switch/case使用区间

```js
const age = 26;
switch (true) {
    case isNaN(age):
        console.log("not a number");
        break;
    case (age < 18):
        console.log("under age");
        break;
    case (age >= 18):
        console.log("adult");
        break;
    default:
        console.log("please set your age");
        break;
}
```

### Array Skill

#### 克隆数组

```js
const _arr = [0, 1, 2];
const arr = [..._arr];
// arr => [0, 1, 2]
```

#### 合并数组

```js
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];
const arr = [...arr1, ...arr2];
// arr => [0, 1, 2, 3, 4, 5];
```

#### 去重数组

```js
const arr = [...new Set([0, 1, 1, null, null])];
// arr => [0, 1, null]
```

#### 混淆数组

```js
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - .5);
// arr => [3, 4, 0, 5, 1, 2]
```

#### 清空数组

```js
const arr = [0, 1, 2];
arr.length = 0;
// arr => []
```

#### 截断数组

```js
const arr = [0, 1, 2];
arr.length = 2;
// arr => [0, 1]
```

#### 交换赋值

```js
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0
```

#### 过滤空值

> 空值：undefined、null、""、0、false、NaN

```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]
```

#### 

#### 数组首部插入成员

```js
let arr = [1, 2]; // 以下方法任选一种
arr.unshift(0);
arr = [0].concat(arr);
arr = [0, ...arr];
// arr => [0, 1, 2]
```

#### 数组尾部插入成员

```js
let arr = [0, 1]; // 以下方法任选一种
arr.push(2);
arr.concat(2);
arr[arr.length] = 2;
arr = [...arr, 2];
// arr => [0, 1, 2]
```

#### 统计数组成员个数

```js
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, v) => {
	t[v] = t[v] ? ++t[v] : 1;
	return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }
```

#### 解构数组成员嵌套

```js
const arr = [0, 1, [2, 3, [4, 5]]];
const [a, b, [c, d, [e, f]]] = arr;
// a b c d e f => 0 1 2 3 4 5
```

#### 解构数组成员别名

```js
const arr = [0, 1, 2];
const { 0: a, 1: b, 2: c } = arr;
// a b c => 0 1 2
```

#### 解构数组成员默认值

```js
const arr = [0, 1, 2];
const [a, b, c = 3, d = 4] = arr;
// a b c d => 0 1 2 4
```

#### 获取随机数组成员

```js
const arr = [0, 1, 2, 3, 4, 5];
const randomItem = arr[Math.floor(Math.random() * arr.length)];
// randomItem => 1
```

#### 创建指定长度数组

```js
const arr = [...new Array(3).keys()];
// arr => [0, 1, 2]
```

#### 创建指定长度且值相等的数组

```js
const arr = new Array(3).fill(0);
// arr => [0, 0, 0]
```

#### reduce代替map和filter

```js
const _arr = [0, 1, 2];

// map
const arr = _arr.map(v => v * 2);
const arr = _arr.reduce((t, v) => {
    t.push(v * 2);
    return t;
}, []);
// arr => [0, 2, 4]

// filter
const arr = _arr.filter(v => v > 0);
const arr = _arr.reduce((t, v) => {
    v > 0 && t.push(v);
    return t;
}, []);
// arr => [1, 2]

// map和filter
const arr = _arr.map(v => v * 2).filter(v => v > 2);
const arr = _arr.reduce((t, v) => {
    v = v * 2;
    v > 2 && t.push(v);
    return t;
}, []);
// arr => [4]
```

### 

### Object Skill

#### 克隆对象

```js
const _obj = { a: 0, b: 1, c: 2 }; // 以下方法任选一种
const obj = { ..._obj };
const obj = JSON.parse(JSON.stringify(_obj));
// obj => { a: 0, b: 1, c: 2 }
```

#### 合并对象

```js
const obj1 = { a: 0, b: 1, c: 2 };
const obj2 = { c: 3, d: 4, e: 5 };
const obj = { ...obj1, ...obj2 };
// obj => { a: 0, b: 1, c: 3, d: 4, e: 5 }
```

#### 对象字面量

> 获取环境变量时必用此方法，用它一直爽，一直用它一直爽

```js
const env = "prod";
const link = {
    dev: "Development Address",
    test: "Testing Address",
    prod: "Production Address"
}[env];
// link => "Production Address"
```

#### 对象变量属性

```js
const flag = false;
const obj = {
    a: 0,
    b: 1,
    [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }
```

#### 创建纯空对象

```js
onst obj = Object.create(null);
Object.prototype.a = 0;
// obj => {}
```

#### 删除对象无用属性

```js
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
// rest => { b: 1, c: 2 }
```

#### 解构对象属性嵌套

```js
const obj = { a: 0, b: 1, c: { d: 2, e: 3 } };
const { c: { d, e } } = obj;
// d e => 2 3
```

#### 解构对象属性别名

```js
const obj = { a: 0, b: 1, c: 2 };
const { a, b: d, c: e } = obj;
// a d e => 0 1 2
```

#### 解构对象属性默认值

```js
const obj = { a: 0, b: 1, c: 2 };
const { a, b = 2, d = 3 } = obj;
// a b d => 0 1 3
```

### Function Skill

#### 一次性函数

> 适用于运行一些只需执行一次的初始化代码

```js
function Func() {
    console.log("x");
    Func = function() {
        console.log("y");
    }
}
```

#### 惰性载入函数

> 函数内判断分支较多较复杂时可大大节约资源开销

```js
function Func() {
    if (a === b) {
        console.log("x");
    } else {
        console.log("y");
    }
}
// 换成
function Func() {
    if (a === b) {
        Func = function() {
            console.log("x");
        }
    } else {
        Func = function() {
            console.log("y");
        }
    }
    return Func();
}
```



#### 字符串创建函数

```js
const Func = new Function("name", "console.log(\"I Love \" + name)");
```

#### 优雅处理错误信息

```js
try {
    Func();
} catch (e) {
    location.href = "https://stackoverflow.com/search?q=[js]+" + e.message;
}
```

#### 优雅处理Async/Await参数

```js
function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func());
```

#### 优雅处理多个函数返回值

```js
function Func() {
    return Promise.all([
        fetch("/user"),
        fetch("/comment")
    ]);
}
const [user, comment] = await Func(); // 需在async包围下使用
```