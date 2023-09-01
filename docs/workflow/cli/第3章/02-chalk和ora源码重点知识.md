# chalk 和 ora 源码重点知识

## chalk

### 知识点 1：自定义 imports 引用

在 package.json 中定义：

```json
{
  "imports": {
    "#ansi-styles": "./source/vendor/ansi-styles/index.js",
    "#supports-color": {
      "node": "./source/vendor/supports-color/index.js",
      "default": "./source/vendor/supports-color/browser.js"
    }
  }
}
```

应用：

```js
import ansiStyles from "#ansi-styles";
import supportsColor from "#supports-color";
```

### 知识点 2：批量生成方法和构造者模式应用

根据 ansiStyles 配置批量生成构造者方法：

```js
for (const [styleName, style] of Object.entries(ansiStyles)) {
  styles[styleName] = {
    get() {
      const builder = createBuilder(
        this,
        createStyler(style.open, style.close, this[STYLER]),
        this[IS_EMPTY]
      );
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    },
  };
}
```

通过 createBuilder 生成构造者对象：

```js
const createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) =>
    applyStyle(
      builder,
      arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" ")
    );

  Object.setPrototypeOf(builder, proto);

  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;

  return builder;
};
```

### 知识点 3：在对象的原型(prototype)上新增属性

```js
Object.defineProperties(createChalk.prototype, styles);
```

### 知识点 4：使用工厂模块快速生成 chalk 实例

定义：

```js
function createChalk(options) {
  return chalkFactory(options);
}
```

应用：

```js
const chalk = createChalk();

export default chalk;
```

### 知识点 5：替换对象的原型

```js
const chalkFactory = (options) => {
  const chalk = (...strings) => strings.join(" ");
  applyOptions(chalk, options);

  Object.setPrototypeOf(chalk, createChalk.prototype);

  return chalk;
};
```

### 知识点 6：向\n 两侧注入转义字符

```js
export function stringEncaseCRLFWithFirstIndex(
  string, // 带\n的初始字符串
  prefix, // 闭合字符串，\n左侧注入
  postfix, // 开启字符串，\n右侧注入
  index // 第一个\n位置序号
) {
  let endIndex = 0;
  let returnValue = "";
  do {
    // 是否存在\r
    const gotCR = string[index - 1] === "\r";
    // 向\n两侧注入转移字符
    returnValue +=
      string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) +
      prefix +
      (gotCR ? "\r\n" : "\n") +
      postfix;
    // 获取\n后面一个字符的位置
    endIndex = index + 1;
    // 获取下一个\n的序号
    index = string.indexOf("\n", endIndex);
  } while (index !== -1); // 如果存在\n则继续循环
  // 获取\n后面的字符串进行拼接
  returnValue += string.slice(endIndex);
  return returnValue;
}
```

## ora

### 知识点 7：Class 私有属性

```js
class Test {
  #name = "sam";

  #getName() {
    return this.#name;
  }
}

const t = new Test();
console.log(t.#getName()); // error
console.log(t.#name); // error
```

### 知识点 8：输入流缓冲

```js
import readline from 'node:readline';
import { BufferListStream } from 'bl';

#mutedStream = new BufferListStream();
this.#mutedStream.pipe(process.stdout);

this.#rl = readline.createInterface({
  input: process.stdin,
  output: this.#mutedStream,
});
```

### 知识点 9：命令行光标隐藏和显示

```js
console.log("\u001B[?25l"); // 光标隐藏
console.log("\u001B[?25h"); // 光标显示

import cliCursor from "cli-cursor";
cliCursor.show(stream);
cliCursor.hide(stream);
```

### 知识点 10：命令行清屏操作

```js
this.#stream.cursorTo(0); // 光标移动到初始位置

for (let index = 0; index < this.#linesToClear; index++) {
  if (index > 0) {
    this.#stream.moveCursor(0, -1); // 如果清除行数大于1，光标上移一行
  }

  this.#stream.clearLine(1); // 清除一行
}
```

### 知识点 11：打印成功字符

使用 log-symbols 获取成功字符

```js
import logSymbols from "log-symbols";

console.log(logSymbols.success); // ✔
```
