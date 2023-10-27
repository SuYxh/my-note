# @types 和 DefinitelyTyped 仓库

## DefinitelyTyped 仓库

DefinitelyTyped 是一个 高质量 的 TypeScript 类型定义的仓库。通过 @types 方式来安装常见的第三方 JavaScript 库的声明适配模块。

仓库的在线地址为：https://github.com/borisyankov/DefinitelyTyped

那么这个仓库起到什么作用呢？在上一个小节中讲到，如果一个 JS 模块想要适配 TS 项目，那么需要有 d.ts 声明文件。那么如果这个 JS 模块没有提供声明文件的话，就可以通过 DefinitelyTyped 仓库下载第三方的声明文件来进行适配。

这个仓库会包含大部分常见 JS 库的声明文件，只需要下载就可以生效。下面我们举例，下载一个 jquery 库，并在 TS 项目引入 jquery。

```typescript
// 1_demo.ts
import $ from 'jquery  // error，提示缺少声明文件
```

jquery 库并没有默认提供 d.ts 声明文件，所以导入模块的时候肯定是要报错的。鼠标移入到错误上，提示的信息就有让我们去安装对应的第三方声明文件，即：`npm i --save-dev @types/jquery`

那么我们按照提示进行安装后，就会解决适配问题了，错误信息不再提示，并且 jquery 库的类型系统也会生效。

当然并不是所有的 JS 模块都需要下载第三方的@types，因为有些模块默认就会代码 d.ts 的声明文件，例如 moment 这个模块，安装好后，就会自带 moment.d.ts 文件。
