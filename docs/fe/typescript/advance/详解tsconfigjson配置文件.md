# 详解 tsconfig.json 配置文件

## tsconfig.json

前面我们已经对 tsconfig.json 文件有了一些大致的了解，本小节我们来详解一下这个配置文件。

这个配置文件主要使用`compilerOptions: {}`进行 TS 的编译与转化。当然还有一些其他外层可配置的字段，如下：

```json
{
  "compilerOptions": {}, // 编译选项
  "files": [], // 包含在程序中的文件的允许列表
  "extends": "", // 继承的另一个配置文件
  "include": [], // 指定的进行编译解析
  "exclude": [], // 指定的不进行编译解析
  "references": [] // 项目引用，提升性能
}
```

其中 files 和 include 都是指定哪些文件是可以进行编译的，只不过 files 指定的是比较少的文件，多文件的话可以用 include 来进行指定，当然如果要跳过哪些文件不进行编译，就可以利用 exclude 字段。

extends 可以通过继承的方式去加载另一个配置文件，使用的情况并不是很多。references 可以把编译分成一个一个独立的模块，这样是有助于性能的提升。这些选项都是顶层的，用的最多的还是 compilerOptions 字段。

## compilerOptions

通过`tsc --init`会自动生成`tsconfig.json`文件，这个文件会默认带有 6 个选项配置，如下：

```json
{
  "compilerOptions": {
    "target": "es2016", // 指定编译成的是哪个版本的js
    "module": "commonjs", // 指定要使用的模块化的规范
    "strict": true, // 所有严格检查的总开关
    "esModuleInterop": true, // 兼容JS模块无default的导入
    "skipLibCheck": true, // 跳过所有.d.ts文件的类型检查
    "forceConsistentCasingInFileNames": true // 引入时强制区分大小写
  }
}
```

除了初始的这些配置外，其他的配置都用注释给注释起来了，同时`tsconfig.json`把配置选项做了一些分类。

- Projects -> 项目
- Language and Environment -> 语言和环境
- Modules -> 模块
- JavaScript Support -> JS 的支持
- Emit -> 发射
- Interop Constraints -> 操作约束
- Type Checking -> 类型检测
- Completeness -> 完整性

在`Projects`分类中，`incremental`表示增量配置，可以对编译进行缓存，下一次编译会在上一次编译的基础上完成，这样有助于性能；`tsBuildInfoFile`是增量编译的目录，生成一个缓存文件。

在`Language and Environment`分类中表示最终文件会编译成什么样子，`target`就是转化成 JS 的版本；`jsx`配置是可以指定`tsx`转换成`jsx`还是`js`。

在`Modules `分类是用于控制模块的，`module`表示模块化转换后的风格，是 ESM 还是 AMD 还是 CJS 等；`moduleResolution`表示查找模块的方式，如果设置值为`node`表示查找模块的时候会找`node_modules`这个文件夹，如果选择其他的方式会导致查找模块的方式发生改变。

在`JavaScript Support`分类中主要是对 JS 进行一些配置的，`allowJs`表示是否允许对 JS 文件进行编译，默认是 false，当开启为 true 的时候，可以把 JS 文件进行编译输出；`checkJs`表示可以对 JS 文件进行类型检测，如果类型发生改变就会有报错警告。

在`Emit `分类中表示编译输出的情况，`declaration`表示是否生成 d.ts 文件；`sourceMap`表示是否生成.map 文件。

在`Interop Constraints`分类中会对使用进行操作约束，`esModuleInterop`表示当模块不具备 export default 形式的时候也可以默认导入的方式来使用；`forceConsistentCasingInFileNames`表示模块引入的时候是否区分大小写。

在`Type Checking`分类表示对类型进行检测，`strict`表示是否开启严格模式，对类型检测会非常的严格，一般建议开启。在严格模式下限制是非常多的，例如：当一个变量是 any 类型的时候也要去指定一下类型；null 不能成为其他类型的子类型，所以 null 不能随便赋值给其他类型等等。

在`Completeness `分类表示是否具备完整性检测，`skipLibCheck`表示是否跳过对 d.ts 的类型检测，默认都是跳过的。

![image-20231027222052221](https://qn.huat.xyz/mac/202310272220247.png)

![image-20231027221918022](https://qn.huat.xyz/mac/202310272219073.png)

![image-20231027221932231](https://qn.huat.xyz/mac/202310272219257.png)
