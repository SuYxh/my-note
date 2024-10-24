## 1.Language and Environment 语言和环境

| 语言和环境 |  |
| --- | --- |
| target | 指定最终生成的代码语言版本，更改 target 时会引入对应的 lib。例如指定为 es5 时，我们使用`includes`语法会发生异常，提示找不到对应的 lib。当更改为 es6 时，会自动引入对应的`lib.2015.core.d.ts` |
| lib | 手动配置需要引入的类库,例如配置 `DOM`，可以在页面中使用浏览器属性。同时还需手动指定 target 所配置的类库 。 |
| jsx | 常见的属性有`react`(编译后生成`React.createElement`方法)、`react-jsx`(编译后生成自动导入语法)、`preserve`(不进行转化，常用于 vue 中的 tsx) |
| experimentalDecorators | 启用装饰器实验性语法 |
| emitDecoratorMetadata | 启用 metadata 生成元数据相关逻辑 |
| jsxFactory | 生成 react 对应的`React.createElement`或者 preact 中的 h 方法。需要在`"jsx": "react"`时使用。 |
| jsxFragmentFactory | 生成 react 对应的`React.Fragment`或者 preact 中的 Fragment。需要在`"jsx": "react"`时使用。 |
| jsxImportSource | 配置 jsx 对应导入模块的路径，需要在`"jsx": "react-jsx"`时使用。 |
| reactNamespace | 生成`createElement`调用的命名空间，默认是`React` |
| noLib | 禁用默认导入的所有 lib |
| useDefineForClassFields | 使用 defineProperty 来定义类中的属性 |
| moduleDetection | 模块发现，设置为 force 时所有内容均被当做模块。其它两种模式只会将带有`import`、`export`的识别为模块。 |

## 2.Modules 模块相关

### 1.module

> 控制最终 JavaScript 产物使用的模块标准 `CommonJs`、`ES6`、`ESNext`以及 `NodeNext` `AMD`、`UMD`、`System`等

### 2.rootDir

> 项目文件的根目录，默认推断为包含所有 ts 文件的文件夹。配合`outDir`可以看最终的输出结果。

-   如果指定后只会根据指定的路径进行编译输出。

### 3.moduleResolution

> 配置模块解析方式 `node`、`Classic`、`bundler`

-   在`Classic`下的模块 `import a from "a";` 导入时会查找 `./a.ts`(递归往上找同名文件)。不推荐使用
-   node：不支持`exports`
-   `node16` / `nodenext`强制使用相对路径模块时必须写扩展名
-   bundler：既能使用 `exports` 声明类型的同时，也可以使用相对路径模块不写扩展名。

### 4.baseUrl

> 定义文件进行解析的根目录，它通常会是一个相对路径，然后配合 tsconfig.json 所在的路径来确定根目录的位置。

```typescript
// baseUrl:'./'
import a from "src/a";
// 默认以tsconfig所在的路径进行解析
```

### 5.paths

> 类似于 alias，支持通过别名的方式进行导入。

![image-20230905115904162](https://qn.huat.xyz/mac/202410242234159.png)



```typescript
"paths": {
  "@/shared/*": ["./src/shared/*"]
}
import a from "@/shared/isString";
```

### 6.rootDirs

> 实现虚拟目录，告诉 TS 将这些模块视为同一层级下，但不会影响最终输出结果。可用于映射声明文件。 `"rootDirs":["src/style","src/typings"]`

![image-20230905130946578](https://qn.huat.xyz/mac/202410242235531.png)



**var.module.scss**

```typescript
:export {
  color: red;
  border: 2px;
}
```

**var.module.scss.d.ts**

```typescript
interface IScss {
  color: string;
  border: string;
}
const IScss: IScss;
export default IScss;
```

### 7.typeRoots

> 默认情况下，TypeScript 会在 `node_modules/@types` 下查找类型定义文件，可以通过设置 `typeRoots` 选项指定类型查找的目录。

```typescript
{
  "typeRoots": ["./node_modules/@types", "./typings"]
  "types": [
    "jquery" // 仅添加哪些声明文件
  ]
},
"include": ["src/**/*"] // 指定查找目录
```

### 8.allowUmdGlobalAccess

> 允许 umd 模块全局访问 `export as namespace _;` ，关闭后需要导入模块后才能访问。

**@types/lodash/index.d.ts**

```typescript
declare const _ = _;
declare namespace _ {
  export type flatten = () => void;
}
export as namespace _; // 将这个命名空间变成全局的不需要导入即可使用
export = _; // 为了用户可以导入
```

```typescript
console.log(_); // 可以直接访问
```

> 如果文件不在@types 目录下，需要配置`include`包含此文件。

### 9.moduleSuffixes

> 模块增添后缀进行查找`[".controller", ".service"]`

![image-20230905134030037](https://qn.huat.xyz/mac/202410242235663.png)

### 10.allowImportingTsExtensions

> 默认不允许，开启后在相对导入时就允许使用扩展名`.ts`、`.mts`、`.tsx`，注意要同时启用 `--noEmit` 或者 `--emitDeclarationOnly`，因为这些文件导入路径还需要被构建工具进行处理后才能正常使用。

### 11.resolvePackageJsonExports

> 强制 TypeScript 在从 `node_modules` 中的包中读取时查询 `package.json` 文件的 `exports` 字段。 在`moduleResolution`这个值为`node16`, `nodenext`, 和 `bundler`时默认开启。

```typescript
{
  "name":"my-package",
  "exports":{
      ".":{
          "types":"./index.d.ts", // 声明文件
          "import":"./index.mjs", // import导入的方式
          "require": "./index.js" // requie导入的方式
      }
  }
}
```

### 12.resolvePackageJsonImports

> 强制 TypeScript 在从其祖先目录包含 `package.json` 的文件执行以 `#` 开头的查找时查询 `package.json` 文件的 `imports` 字段。

```typescript
"imports": {
    "#dep/*.js": "./src/utils/*.js"
}
```

### 13.customConditions

> 获取当 TypeScript 从 package.json 的导出或导入字段解析时要考虑的附加条件列表。

### 14.resolveJsonModule

> 启用了这一配置后，你就可以直接导入 Json 文件，并对导入内容获得完整的基于实际 Json 内容的类型推导。

### 15.allowArbitraryExtensions

> 是否以`{file basename}.d.{extension}` 的形式查找该路径的声明文件。

-   文件是`app.rc`则声明文件是`app.d.rc.ts`

```typescript
declare const style: {
  color: string;
  background: string;
};
export default style;
```

### 16.noResolve

> 不解析文件导入和三斜线指令。

| 模块相关 |  |
| --- | --- |
| module | 指定编译后采用的模块方式 |
| rootDir | 项目文件的根目录，默认推断为包含所有 ts 文件的文件夹。配合`outDir`可以看最终的输出结果。 |
| moduleResolution | 按照 node 方式进行模块解析。 |
| baseUrl | 配置项目解析的根目录，配置后可以直接通过根路径的方式导入模块。 |
| paths | 路径别名配置`"@/utils/*": ["src/utils/*"]`。可以使用相对路径，也可以配置`baseUrl`指定相对路径 |
| rootDirs | 实现虚拟目录，告诉 TS 将这些模块视为同一层级下，但不会影响最终输出结果。可用于映射声明文件。 `"rootDirs":["src/a","src/b"]` |
| typeRoots | 指定类型查找的目录`node_modules/@types`、`./typings` |
| types | 手动指定 node\_modules/@types 下需要加载的类型。 |
| allowUmdGlobalAccess | 允许 umd 模块全局访问 `export as namespace _;` |
| moduleSuffixes | 模块增添后缀进行查找`[".module", ".service"]` |
| allowImportingTsExtensions | 在相对导入时就允许使用 ts 的扩展名，注意要同时启用 `--noEmit` 或者 `--emitDeclarationOnly`，因为这些文件导入路径还需要被构建工具进行处理后才能正常使用。 |
| resolvePackageJsonExports | 强制 TypeScript 在从 `node_modules` 中的包中读取时查询 `package.json` 文件的 `exports` 字段 |
| resolvePackageJsonImports | 强制 TypeScript 在从其祖先目录包含 `package.json` 的文件执行以 `#` 开头的查找时查询 `package.json` 文件的 `imports` 字段。 |
| customConditions | 自定义条件，基本用不到 |
| resolveJsonModule | 解析 json 模块 |
| allowArbitraryExtensions | 是否以`{file basename}.d.{extension}` 的形式查找该路径的声明文件。 |
| noResolve | 不解析文件导入和三斜线指令 |

## 3.JS 支持

| javascript 相关 |  |
| --- | --- |
| allowJs | 在开启此配置后，可在 `.ts` 文件中去导入 `.js` / `.jsx` 文件。 |
| checkJs | 检查 js 文件，也可以通过@`ts-check` |
| maxNodeModuleJsDepth | "node\_modules”检查 JavaScript 文件的最大文件夹深度。就是 node\_modules 向上查找的层级 |

![image-20230905172127213](https://qn.huat.xyz/mac/202410242236937.png)



## 4.Emit 输出相关

### 1.declaration

> declaration 接受一个布尔值，即是否产生声明文件 。默认不生产

### 2.declarationMap

> 引入第三方模块时，默认会查找`.d.ts`文件，配置 declarationMap 后，可以映射到原始的 ts 文件。**发布 npm 包时并不会携带这些文件**

### 3.emitDeclarationOnly

> 此配置会让最终构建结果只包含构建出的声明文件（`.d.ts`），而不会包含 `.js` 文件

### 4.sourceMap

> 创建 ts 对应的`.map`文件

### 5.inlineSourceMap

> 内嵌 sourcemap，不能与 sourceMap 属性连用

### 6.outFile

> 将所有结果打包到一个文件中（指定文件名），仅支持`amd`和`system`模块

### 7.outDir

> 将所有生成的文件发射到此目录中

### 8.removeComments

> 移除 ts 文件内的注释

### 9.noEmit

> 在编译过程中不生成文件，但是编译过程中会进行类型检测。

### 10.importHelpers

> 基于 target 进行语法降级，往往需要一些辅助函数，将新语法转换为旧语法的实现。启用 importHelpers 配置，这些辅助函数就将从 tslib 中导出而不是在源码中定义。

![image-20230905180702672](https://qn.huat.xyz/mac/202410242237150.png)

> 需要安装`tslib`，并且开启`moduleResolution`选项。

### 11.importsNotUsedAsValues

> 是否保留导入后未使用的导入值，默认则删除。此属性被`verbatimModuleSyntax`替代

```typescript
import Car from "./car"; // 导入的是类型，默认会被移除。应该使用import type
function buyCar(car: Car) {
  return car;
}
```

### 12.downlevelIteration

> 是否开启对 iterator 降级处理，默认在低版本中直接转化成索引遍历

```typescript
let arr = [1, 2, 3];
for (let key of arr) {
  console.log(arr);
}
```

### 13.sourceRoot

> 在 debugger 时，用于定义我们的源文件的根目录。

### 14.mapRoot

> 在 debugger 时，用于定义我们的`source map`文件的根目录。

### 15.inlineSources

> 增加 sourcesContent，压缩后依然可以找到对应的源代码

### 16.emitBOM

> 生成 BOM 头

### 17.newLine

> 换行方式 `crlf`(Carriage Return Line Feed)widows 系统的换行符。`lf`(Line Feed)Linux 系统的换行方式

### 18.stripInternal

> 是否禁止 JSDoc 注释中带有@internal 的代码发出类型声明

```typescript
/**
 * @internal
 */
const a = "abc";
export default a;
```

### 19.noEmitHelpers

> 在开启时源码中仍然会使用这些辅助函数，但是不存在从 tslib 中导入的过程，同时需要将`importHelpers`关闭。

```typescript
export function merge(o1: object, o2: object) {
  return { ...o1, ...o2 };
}
```

### 20.noEmitOnError

> 构建过程中有错误产生会阻止写入

### 21.preserveConstEnums

> 让常量枚举也转化成对象输出

### 22.declarationDir

> 指定声明文件输出的目录

### 23.preserveValueImports

> 保留所有值导入，不进行移除。(未用到也进行保留,已经废弃) ,同`importsNotUsedAsValues`

| 输出相关 |  |
| --- | --- |
| declaration | 是否产生声明文件 |
| declarationMap | 为声明文件也生成 source map，通过`.d.ts`映射到`.ts`文件 |
| emitDeclarationOnly | 仅生成`.d.ts`文件，不生成`.js`文件 |
| sourceMap | 创建 js 对应的`.map`文件 |
| outFile | 将所有结果打包到一个文件中，仅支持`amd`和`system`模块 |
| outDir | 将所有生成的文件发射到此目录中 |
| removeComments | 移除 ts 文件内的注释 |
| noEmit | 在编译过程中不生成文件，但是编译过程中会进行类型检测。 |
| importHelpers | 从`tslib`中引入辅助函数解析高版本语法 `{...obj}` |
| importsNotUsedAsValues | 是否保留导入后未使用的导入值 |
| downlevelIteration | 是否开启对 iterator 降级处理，默认在低版本中直接转化成索引遍历 |
| sourceRoot | 在 debugger 时，用于定义我们的源文件的根目录。 |
| mapRoot | 在 debugger 时，用于定义我们的`source map`文件的根目录。 |
| inlineSourceMap | 内嵌 sourcemap，不能与 sourceMap 属性连用 |
| inlineSources | 内链 sourcesContent 属性，压缩后依然可以找到对应的源代码 |
| emitBOM | 生成 BOM 头 |
| newLine | 换行方式 `crlf`(Carriage Return Line Feed)widows 系统的换行符。`lf`(Line Feed)Linux 系统的换行方式 |
| stripInternal | 是否禁止 JSDoc 注释中带有@internal 的代码发出声明 |
| noEmitHelpers | 不从 tslib 中导入辅助函数 |
| noEmitOnError | 构建过程中有错误产生会阻止写入 |
| preserveConstEnums | 让常量枚举也转化成对象输出 |
| declarationDir | 指定声明文件输出的目录 |
| preserveValueImports | 保留所有值导入，不进行移除。(未用到也进行保留,已经废弃) |

## 5.Interop Constraints 互操作约束

### 1.isolatedModules

> 隔离模块，重导出一个类型需要使用`export type`。

### 2.verbatimModuleSyntax

> 取代 isolatedModules、preserveValueImports、importsNotUsedAsValues。`import type` 就删除， `import`就留下。

| 互操作约束 |  |
| --- | --- |
| isolatedModules | 隔离模块，文件中需要包含`import`、`export`，导入类型需要使用`import type`进行导入 |
| verbatimModuleSyntax | 取代 isolatedModules、preserveValueImports、importsNotUsedAsValues |
| allowSyntheticDefaultImports | 解决 ES Module 和 CommonJS 之间的兼容性问题。模拟默认导出。 |
| esModuleInterop | 解决 ES Module 和 CommonJS 之间的兼容性问题。可以支持`import React from 'react'`。会自动开启`allowSyntheticDefaultImports` |
| preserveSymlinks | 不把符号链接解析为真实路径 |
| forceConsistentCasingInFileNames | 强制文件名使用时大小写一致 |

### 3.allowSyntheticDefaultImports

> 解决 ES Module 和 CommonJS 之间的兼容性问题。（输出成`module:commonjs`）

```typescript
function sum(a: number, b: number) {
  return a + b;
}
export = sum;
```

```typescript
import sum from "./sum"; // es6方式导入
```

> 兼容模块间转换，模拟`commonjs`默认导出。

### 4.esModuleInterop

> 默认开启，解决 ES Module 和 CommonJS 之间的兼容性(`.default`)问题。可以支持`import React from 'react'`。会自动开启`allowSyntheticDefaultImports`

### 5.preserveSymlinks

> 是否禁用将符号链接解析为其真实路径 （开启后等价于`webpack.resolve.symlinks`为 false ）。webpack 中大多数情况下采用`symlinks:true`（Webpack 会按照符号链接的实际位置来解析模块，这是通常的行为。）

### 6.forceConsistentCasingInFileNames

> 强制文件名使用时大小写一致

## 6.Type Checking 类型检测

### 1.strict

> 设置为 true 会启用全部类型检测选项，同时也可以指定单独关闭某个具体的类型检测的选项

### 2.noImplicitAny

> 为具有隐含“any”类型的表达式和声明启用错误报.

![image-20230904173622951](https://qn.huat.xyz/mac/202410242239794.png)

### 3.strictNullChecks

> 开启此选项让 typescript 执行严格的 null 检查

![image-20230904180305387](https://qn.huat.xyz/mac/202410242239057.png)

### 4.strictFunctionTypes

> 开启后支持函数参数的双向协变

![image-20230904182230767](https://qn.huat.xyz/mac/202410242239906.png)

### 5.strictBindCallApply

> 请检查“bind”、“call”和“apply”方法的参数是否与原始函数匹配。

![image-20230904182655811](https://qn.huat.xyz/mac/202410242239315.png)

### 6.strictPropertyInitialization

> 检查构造函数中已声明但未设置的类属性。

![image-20230904182944653](https://qn.huat.xyz/mac/202410242239291.png)

### 7.noImplicitThis

> 当“this”的类型为“any”时，报错。

![image-20230904183444565](https://qn.huat.xyz/mac/202410242239835.png)

### 8.useUnknownInCatchVariables

> 将 catch 变量默认为“unknown”，而不是“any”。

![image-20230904183634256](https://qn.huat.xyz/mac/202410242239979.png)

### 9.alwaysStrict

> 确保输出文件始终带有 “use strict”

### 10.noUnusedLocals

> 当 ts 发现未使用的局部变量时, 会给出一个编译时错误

![image-20230904200239262](https://qn.huat.xyz/mac/202410242240823.png)

### 11.noUnusedParameters

> 当 ts 发现参数未使用时, 会给出一个编译时错误

![image-20230904200529109](https://qn.huat.xyz/mac/202410242240187.png)

### 12.exactOptionalPropertyTypes

> 默认值为 false，将可选属性类型解释为写入，而不是添加“未定义”。在初始化时可以留空为`undefined`, 但是不能被手动设置为`undefined`

![image-20230904230349202](https://qn.huat.xyz/mac/202410242240372.png)

### 13.noImplicitReturns

> 默认值为 false，开启这个选项，所有分支都要有 return。

![image-20230905005057547](https://qn.huat.xyz/mac/202410242240139.png)

### 14.noFallthroughCasesInSwitch

> 默认值为 false，开启这个选项，每个 switch 中的 case 都要有 break；

![image-20230905005405028](https://qn.huat.xyz/mac/202410242240298.png)

### 15.noUncheckedIndexedAccess

> 默认值为 false，开启这个选项，给索引签名语法声明的属性补上一个`undefined`类型

![image-20230905005833025](https://qn.huat.xyz/mac/202410242240922.png)

### 16.noImplicitOverride

> 默认值为 false，开启这个选项，保证子类重写基类的方法时, 必须在方法前加上`override`关键词

![image-20230905010216331](https://qn.huat.xyz/mac/202410242240631.png)

### 17.noPropertyAccessFromIndexSignature

> 默认值为 false，开启这个选项，禁止通过访问常规属性的方法来访问索引签名声明的属性。

![image-20230905010846558](https://qn.huat.xyz/mac/202410242240566.png)

### 18.allowUnusedLabels

> 默认值为 false，开启这个选项后，允许没有使用的 label

![image-20230905011343726](https://qn.huat.xyz/mac/202410242241081.png)

### 19.allowUnreachableCode

> 默认值为 false，开启这个选项后，则允许出现无法触达的代码

![image-20230905011714348](https://qn.huat.xyz/mac/202410242241512.png)

| 类型检查 |  |
| --- | --- |
| strict | 启用所有严格类型检测选项 |
| noImplicitAny | 关闭后，没有指定参数类型时，默认推导为 any |
| strictNullChecks | 关闭后，null 和 undefiend 将会成为任何类型的子类型 |
| strictFunctionTypes | 关闭后，参数变为双向协变 |
| strictBindCallApply | 关闭后，不检测 call、bind、apply 传递的参数。 |
| strictPropertyInitialization | 关闭后，函数声明属性无需初始化操作。 |
| noImplicitThis | 关闭后，this 默认推导为 any |
| useUnknownInCatchVariables | 关闭后，catch 中的 error 类型会变为 any。 |
| alwaysStrict | 关闭后，不使用严格模式 |
| noUnusedLocals | 关闭后，允许声明未使用的变量 |
| noUnusedParameters | 关闭后，允许声明未使用的参数 |
| exactOptionalPropertyTypes | 开启后，进行严格可选属性检测，不能赋予 undefined |
| noImplicitReturns | 开启后，要求所有路径都需要有返回值。 |
| noFallthroughCasesInSwitch | 开启后，switch、case 中不能存在连续执行的情况。 |
| noUncheckedIndexedAccess | 任意接口中访问不存在的属性会在尾部添加`undefiend`类型 |
| noImplicitOverride | 增添 override 关键字，才可以覆盖父类的方法 |
| noPropertyAccessFromIndexSignature | 不允许访问任意接口中不存在的属性 |
| allowUnusedLabels | 是否允许未使用的 label 标签 |
| allowUnreachableCode | 是否允许无法执行到的代码 |

## 7.Completeness 完整性

| 完整性 |  |
| --- | --- |
| skipLibCheck | 跳过类库检测，不检测内置声明文件及第三方声明文件。 |
| skipDefaultLibCheck | 跳过 TS 库中内置类库检测。 |

## 8.Projects 项目

### 1.incremental

> incremental 配置将启用增量构建，在每次编译时首先 diff 出发生变更的文件，仅对这些文件进行构建，然后将新的编译信息通过 `.tsbuildinfo` 存储起来。

### 2.tsBuildInfoFile

> 控制这些编译信息文件的输出位置。

### 3.composite

> 在 Project References 的被引用子项目 `tsconfig.json` 中必须为启用状态。并且在子项目中必须启用 declaration ，必须通过 files 或 includes 声明子项目内需要包含的文件等。

| 项目相关 |  |
| --- | --- |
| incremental | 启用增量构建， 当使用--watch 的时候可以配合开启 |
| composite | 被 references 引用的`tsconfig.json`必须标识为 true |
| tsBuildInfoFile | 增量构建文件的存储路径 |
| disableSourceOfProjectReferenceRedirect | 在引用复合项目时首选源文件而不是声明文件。 |
| disableSolutionSearching | 编辑时，选择不检查多项目引用的项目。 |
| disableReferencedProjectLoad | 禁用引用项目加载 |

## 9.其他

### 1.files、include 与 exclude

-   使用 files 我们可以描述本次包含的所有文件，每个值都需要是完整的文件路径，适合在小型项目时使用。

```
{
  "include": ["src/**/*", "utils/*.ts"],
  "exclude": ["src/file-excluded", "/**/*.test.ts", "/**/*.e2e.ts"]
}
```

> **exclude 只能剔除已经被 include 包含的文件**。

### 2.extends

**tsconfig.base.json**

```typescript
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

**tsconfig.json**

```typescript
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### 3.references

> 可以将整个工程拆分成多个部分，我们可以定义这些部分的引用关系，为它们使用独立的 tsconfig 配置。

-   root
    
    -   **index.ts**
        
        ```typescript
        import user from "../user";
        console.log(user());
        ```
        
    -   **tsconfig.json**
        
        ```typescript
        {
          "extends": "../tsconfig.json",
          "compilerOptions": {
            "target": "ES2015",
            "baseUrl": ".",
            "outDir": "../dist/root"
          },
          "include": ["./**/*.ts"],
          "references": [
            {
              "path": "../user"
            }
          ]
        }
        ```
    
-   user
    
    -   **index.ts**
        
        ```typescript
        export default function () {
          return "get user";
        }
        ```
        
    -   **tsconfig.json**
        
        ```typescript
        {
          "extends": "../tsconfig.json",
          "compilerOptions": {
            "composite": true,
            "target": "ES5",
            "module": "NodeNext",
            "baseUrl": ".",
            "outDir": "../dist/user"
          },
          "include": ["./**/*.ts"]
        }
        ```
    
-   tsconfig.json
    
    ```typescript
    {
      "compilerOptions": {
        "declaration": true,
        "module": "NodeNext",
        "moduleResolution": "NodeNext"
      }
    }
    ```
    

> `tsc --build <要打包的文件夹>`

### 4.watchOptions

> 监听选项,一般不进行配置

```typescript
"watchOptions": {
  // 如何监听文件 使用操作系统的原生事件来进行监听
  "watchFile": "useFsEvents",
  // 如何监听目录
  "watchDirectory": "useFsEvents",
  // 对变更不频繁的文件，检查频率降低
  "fallbackPolling": "dynamicPriority",
  "synchronousWatchDirectory": true,
  "excludeDirectories": ["**/node_modules", "_build"],
  "excludeFiles": ["build/fileWhichChangesOften.ts"] // 减少更新范围
}
```