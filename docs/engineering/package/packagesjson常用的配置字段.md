`packages.json`这个文件中有很多的字段，但是其实很多开发者只知道那几个字段的意思：

-   **version**：版本号
    
-   **dependencies**：生产依赖
    
-   **devDependencies**：开发依赖
    

其他就一概不知了，但是如果你想要实现前端进阶的话，**前端工程化**是绕不过去的一环，而`packages.json`则是**前端工程化**中重要的一部分！

## 必需字段

-   **name：** 定义你的项目的名称，不能使用`.`或`_`开头，并且不能包含大写字母
    
-   **version：** 定义你的项目的版本号，格式为 ：`大版本号.次版本号.修订号`
    

## 描述字段

-   **description：** 项目的描述
    
-   **keywords：** 项目的关键词，会在 NPM 文档上显示
    
-   **author：** 项目的作者
    
-   **contributors：** 项目的贡献者
    
-   **homepage：** 项目的主页地址，一般放 github 的地址
    
-   **repository：** 项目的源码地址，一般放 github 的地址
    
-   **bug：** 项目提交问题的地址
    
-   **funding：** 项目捐赠支持的地址
    

## 依赖字段

-   **dependencies：** 生产依赖
    
-   **devDependencies：** 开发依赖
    
-   **peerDependencies：** 对等依赖，比如你开发一个库需要依赖vue，你的项目也需要依赖vue，这个时候peerDependencies里的vue就会忽略安装，提高安装效率
    
-   **peerDependenciesMeta：** 对等依赖标记
    
-   **engines：** 声明对 npm 或 node 的版本要求
    
-   **workspaces：** 单代码库管理多个子项目，pnpm 的 workspace 就是依赖了这个字段
    

## 脚本字段

-   **scripts：** 放一些项目运行的命令，比如 start、dev、build、prepare、test等等
    
-   **config：** 项目的一些配置，比如设置环境变量
    

## 入口 & 文件 & 类型 字段

-   **bin：** 定义命令行执行的文件
    
-   **main：** 指定你项目的入口文件
    
-   **module：** 指定项目的 esmodule 入口文件
    
-   **browser：** 指定浏览器引入时使用的入口文件（umd）
    
-   **types：** 指定项目的类型声明文件（.d.ts）
    
-   **type：** 一般要设置成 module，项目才能使用 esmodule 语法
    
-   **exports：** 当打包工具支持exports字段时（webpack、Rollup 等），以上main，browser，module，types四个字段都被忽略
    
    ```
    "exports": {
          ".": {
          "import": "./dist/index.esm.js",
          "require": "./dist/index.cjs.js",
          "browser": "./dist/index.umd.js",
          "types": "./dist/index.d.ts"
        }
    }
    ```
    
-   "." 表示默认导出
    
-   "import": 指定了 ES module (ESM) 规范下的导出文件路径
    
-   "require": 指定了 CommonJS 规范下的导出文件路径
    
-   "browser": 指定了用于浏览器环境的导出文件路径
    
-   "types": 指定了类型声明文件的路径
    

## 发包字段

-   **files：** 指明哪些文件需要发包到 NPM 上
    
-   **private：** 设置是否要发到私有库上，发公共库的话 false
    
-   **publishConfig：** 指定发包到某个位置
    
-   **os：** 指定你的包适用于什么操作系统
    
-   **cpu：** 与 os 类似
    
-   **license：** 指定你的包的开源协议，各个协议允许做什么事情，如下图
    

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 第三方字段（非官方）

-   **eslintConfig：** eslint配置，但是现在都不用这个区配置了，都是用 .eslintrc
    
-   **babel：** babel配置，现在不用了，都用 .babelrc
    
-   **unpkg：** 指定通过 cdn 使用你的包的时候的入口文件
    
-   **lint-staged：** 一般配合 githooks 一起对暂存区的文件进行代码校验
    
-   **browserslist：** 告知支持哪些浏览器
    
-   **sideEffects：** 说明项目是否有副作用，配合 webpoack 或者 rollup进行 tree-shaking
    


