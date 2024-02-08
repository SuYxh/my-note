### 说说你对webpack的理解?解决了什么问题?
#### 背景
Webpack 最初的目标是实现前端项目的模块化，旨在更高效地管理和维护项目中的每一个资源
#### 模块化
最早的时候，我们会通过文件划分的形式实现模块化，也就是将每个功能及其相关状态数据各自单独放到不同的 Js 文件中
约定每个文件是一个独立的模块，然后再将这些 js 文件引入到页面，一个 script 标签对应一个模块，然后调用模块化的成员
```typescript
<script src="module-a.js"></script>
<script src="module-b.js"></script>
```
但这种模块弊端十分的明显，模块都是在全局中工作，大量模块成员污染了环境，模块与模块之间并没有依赖关系、维护困难、没有私有空间等问题
项目一旦变大，上述问题会尤其明显
随后，就出现了命名空间方式，规定每个模块只暴露一个全局对象，然后模块的内容都挂载到这个对象中
```typescript
window.moduleA = {
  method1: function () {
    console.log('moduleA#method1')
  }
}
```
这种方式也并没有解决第一种方式的依赖等问题再后来，我们使用立即执行函数为模块提供私有空间，通过参数的形式作为依赖声明，如下
```typescript
// module-a.js
(function ($) {
  var name = 'module-a'
  function method1 () {
    console.log(name + '#method1')
    $('body').animate({ margin: '200px' })
  }
  window.moduleA = {
    method1: method1
  }
})(jQuery)
```
上述的方式都是早期解决模块的方式，但是仍然存在一些没有解决的问题。例如，我们是用过 script 标签在页面引入这些模块的，这些模块的加载并不受代码的控制，时间一久维护起来也十分的麻烦
理想的解决方式是，在页面中引入一个 J5 入口文件，其余用到的模块可以通过代码控制，按需加载进来
除了模块加载的问题以外，还需要规定模块化的规范，如今流行的则是 CommonJSES Modules

#### 问题
现代前端开发已经变得十分的复杂，所以我们开发过程中会遇到如下的问题:

- 需要通过模块化的方式来开发
- 使用一些高级的特性来加快我们的开发效率或者安全性，比如通过ES6+、TypeScript开发脚本逻辑，通过sass、less等方式来编写css样式代码
- 监听文件的变化来并且反映到浏览器上，提高开发的效率
- JavaScript 代码需要模块化，HTML 和 CSS 这些资源文件也会面临需要被模块化的问题。
- 开发完成后我们还需要将代码进行压缩、合并以及其他相关的优化而 webpack 恰巧可以解决以上问题

#### 是什么
webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具

- 静态模块

这里的静态模块指的是开发阶段，可以被 webpack 直接引用的资源 (可以直接被获取打包进 bundle.js 的资源)
当 webpack 处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块(不再局限 is 文件) ，并生成一个或多个 bundle


### 说说webpack的热更新是如何做到的?原理是什么?
#### 是什么
HMR 全称 Hot Module Replacement ，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用例如，我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失。如果使用的是HMR ，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用
在 webpack 中配置开启热模块也非常的简单，如下代码
```typescript
const webpack = require('webpack')
module.exports = {
  // ...
  devServer: {
    // HMR 
    hot: true
    // hotOnly: true
  }
}
```
通过上述这种配置，如果我们修改并保存 css 文件，确实能够以不刷新的形式更新到页面中但是，当我们修改并保存 js 文件之后，页面依旧自动刷新了，这里并没有触发热模块所以， HMR 并不像 Webpack 的其他特性一样可以开箱即用，需要有一些额外的操作我们需要去指定哪些模块发生更新时进行 HRM ，如下代码:
```typescript
if(module.hot){
  module.hot.accept('./util.js',()=>{
    console.log("util.js 更新了")
  })
}
```
#### 实现原理
首先来看看一张图，如下:

![图片.png](https://qn.huat.xyz/mac/202402082256038.png)




- Webpack Compile:将JS 源代码编译成 bundle.js
- HMR Server:用来将热更新的文件输出给 HMR Runtime
- Bundle Server:静态资源文件服务器，提供文件访问路径
- HMR Runtime: socket服务器，会被注入到浏览器，更新文件的变化
- bundle.js:构建输出的文件
- 在HMR Runtime 和 HMR Server之间建立 websocket，即图上4号线，用于实时更新文件变化

上面图中，可以分成两个阶段:

- 启动阶段为上图 1-2-A-B

在编写未经过 webpack 打包的源代码后，Webpack Compile 将源代码和 HMR Runtime一起编译成bundle文件，传输给 Bundle Server 静态资源服务器

- 更新阶段为上图 1-2-3-4

当某一个文件或者模块发生变化时，webpack 监听到文件变化对文件重新编译打包，编译生成唯一的hash值，这个hash 值用来作为下一次热更新的标识
根据变化的内容生成两个补丁文件 manifest(包含了 hash和chundId，用来说明变化的内容)和chunk.js模块
由socket 服务器在 HMR Runtime和HMR Server之间建立 websocket链接，当文件发生改动的时候，服务端会向浏览器推送一条消息，消息包含文件改动后生成的 hash 值，如下图的 h 属性，作为下一次热更细的标识

![图片.png](https://qn.huat.xyz/mac/202402082257420.png)

在浏览器接受到这条消息之前，浏览器已经在上一次socket消息中已经记住了此时的hash标识.去服务这时候我们会创建一个 ajax去服务端请求获取到变化内容的 manifest文件
mainfest 文件包含重新 build 生成的hash值，以及变化的模块，对应上图的c属性
浏览器根据manifest文件获取模块变化的内容，从而触发 render 流程，实现局部模块更新

![图片.png](https://qn.huat.xyz/mac/202402082257508.png)



#### 总结
关于webpack 热模块更新的总结如下:

- 通过 webpack-dev-server 创建两个服务器: 提供静态资源的服务 (express)和Socket服
- express server 负责直接提供静态资源的服务 (打包后的资源直接被浏览器请求和解析)
- socket server 是一个 websocket 的长连接，双方可以通信
- 当 socket server 监听到对应的模块发生变化时，会生成两个文件.json (manifest文件)和.js文件(update chunk)
- 通过长连接，socket server 可以直接将这两个文件主动发送给客户端 (浏览器）
- 浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新

### 说说webpack的构建流程?

### 说说webpack proxy工作原理?为什么能解决跨域?
#### 是什么
webpack proxy ，即 webpack 提供的代理服务。基本行为就是接收客户端发送的请求后转发给其他服务器。其目的是为了便于开发者在开发模式下解决跨域问题 (浏览器安全策略限制)。想要实现代理首先需要一个中间服务器，webpack 中提供服务器的工具为 webpack-dev-server
#### webpack-dev-server
webpack-dev-server 是 webpack官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起
目的是为了提高开发者日常的开发效率，只适用在开发阶段
关于配置方面，在 webpack 配置对象属性中通过 devServer 属性提供，如下:
```typescript
// ./webpack.config.js
const path = require('path')
module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'https://api.github.com'
      }
    }
    // ...
  }
}
```
devServetr 里面 proxy 则是关于代理的配置，该属性为对象的形式，对象中每一个属性就是一个代理的规则匹配
一般为了辨别都会设置前缀为 `/api` ，属性的名称是需要被代理的请求路径前缀值为对应的代理匹配规则，对应如下:

- target: 表示的是代理到的目标地址
- pathRewrite: 默认情况下，我们的 `/api-hy` 也会被写入到URL中，如果希望删除，可以使用pathRewrite
- secure: 默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false
- changeOrigin:它表示是否更新代理后请求的 headers 中host地址

#### 工作原理

proxy 工作原理实质上是利用 http-proxy-middleware 这个 http 代理中间件，实现请求转发给其他服务器
举个例子:
在开发阶段，本地地址为 `http://localhost:3000` ，该浏览器发送一个前缀带有 /api 标识的请求到服务端获取数据，但响应这个请求的服务器只是将请求转发到另一台服务器中
```typescript
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true
                      }));
app.listen(3000);
// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
```
#### 跨域
在开发阶段.webpack-dev-server 会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上
所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题通过设置 webpack proxy 实现代理请求后，相当于浏览器与服务端中添加一个代理者
当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地

![图片.png](https://qn.huat.xyz/mac/202402082257192.png)

在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据
注意:服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制


### 说说webpack中常见的Loader? 解决了什么问题?
loader 用于对模块的"源代码"进行转换，在 import 或"加载"模块时预处理文件webpack 做的事情，仅仅是分析出各种模块的依赖关系，然后形成资源列表，最终打包生成到指定的文件中。如下图所示:

![图片.png](https://qn.huat.xyz/mac/202402082257169.png)



在webpack内部中，任何文件都是模块，不仅仅只是js文件
默认情况下，在遇到 import 或者require 加载模块的时候，webpack;只支持对 js和json文件打包
像css;png 等这些类型的文件的时候，webpack:则无能为力，这时候就需要配置对应sass的:Loader 进行文件内容的解析
在加载模块的时候，执行顺序如下

![图片.png](https://qn.huat.xyz/mac/202402082257056.png)

当 webpack碰到不识别的模块的时候，webpack:会在配置的中查找该文件解析规则
关于配置:loader;的方式有三种:

- 配置方式(推荐) : 在 webpack.config.js文件中指定 loader。
- 内联方式: 在每个 import 语句中显式指定 loader
- CLI方式:在 shell 命令中指定它们


#### 配置方式
关于 loader 的配置，我们是写在:module.rules属性中，属性介绍如下:

- rules 是一个数组的形式，因此我们可以配置很多个:loader。 
- 每一个 loader对应一个对象的形式，对象属性 test 为匹配的规则，一般情况为正则表达式 
- 属性 use 针对匹配到文件类型，调用对应的 loader:进行处理

#### 特性
这里继续拿上述代码，来讲讲:Loader:的特性
从上述代码可以看到，在处理:css 模块的时候,use属性中配置了三个;loader;分别处理:css文件
因为loader 支持链式调用，链中的每个 loader 会处理之前已处理过的资源，最终变为is 代码,顺序为相反的顺序执行，即上述执行方式为sass-loader 、css-loader、style-loader
除此之外，:loader;的特性还有如下:

- loader 可以是同步的，也可以是异步的
- loader 运行在 Node.js 中，并且能够执行任何操作
- 除了常见的通过 !package.json的 main来将一个 npm 模块导出为 loader，还可以在module.rules 中使用:loader:字段直接引用一个模块
- 插件(plugin)可以为 loader 带来更多特性
- loader 能够产生额外的任意文件

可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如:压缩、打包、语言翻译和更多其他特性

#### 常见的loader
在页面开发过程中，我们经常性加载除了js文件以外的内容，这时候我们就需要配置响应的Loader进行加载
常见的:loader 如下

- style-loader: 将css添加到DOM的内联样式标签style里
- css-loader :允许将css文件通过require的方式引入，并返回css代码
- less-loader: 处理less
- sass-loader: 处理sass
- postcss-loader: 用postcss来处理CSS
- autoprefixer-loader: 处理CSS3属性前缀，已被弃用，建议直接使用postcssfile-loader: 分发文件到output目录并返回相对路径
- ur-loader: 和file-loader类似，但是当文件小于设定的limit时可以返回一个Data Ur
- html-minify-loader: 压缩HTML
- babel-loader :用babel来转换ES6文件到ES

下面给出一些常见的 Loader 的使用
##### css-loader
```typescript
rules: [
  ...,
  {
    test: /\.css$/,
    use: {
      loader: "css-loader",
      options: {
        // 禁用/启用 url() 处理
        url: true,
        // 禁用/启用 @import  处理
        import: true,
        //  禁用/启用 Sourcemap 处理
        sourceMap: false
      }
    }
  }
]
```
如果只通过 css-loader 加载文件，这时候页面代码设置的样式并没有生效原因在于，css-loader 只是负责将，CSS 文件进行一个解析，而并不会将解析后的 css 插入到页面中
如果我们希望再完成插入 style 的操作，那么我们还需要另外一个 loader ，就是 style-Loader

##### style-loader
```typescript
rules: [
  ...,
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  }
]
```
同一个任务的 loader 可以同时挂载多个，处理顺序为: **从右到左，从下往上**

##### less-loader
开发中，我们也常常会使用 less sass stylus 预处理器编写 css 样式，使开发效率提高。这里需要使用 less-loader
```typescript
rules: [
  ...,
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader","less-loader"]
  }
]
```

##### raw-loader
在webpack 中通过 import 方式导入文件内容，该 loader 并不是内置的，所以首先要安装
```typescript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.(txt|md)$/,
        use: 'raw-loader'
      }
    ]
  }
}
```

##### file-loader
把识别出的资源模块，移动到指定的输出目目录，并且返回这个资源在输出目录的地址(字符串)
```typescript
rules: [
  ...,
  {
    test: /\.(png|jpe?g|gif)$/,
    use: {
      loader: "file-loader",
      options: {
        // placeholder 占位符 [name] 资源模块的名称
        // [ext] 源资源模块的后缀
        name: "[name]_[hash].[ext]",
        // 打包后的存放位置
        outputPath: "./images",
        // 打包后文件的 url
        publicPath: './images',
      }
    }
  }
]
```
##### url-loader
可以处理理 file-loader 所有的事情，但是遇到图片格式的模块，可以选择性的把图片转成 base64格式的字符串，并打包到 js 中，对小体积的图片比较合适，大图片不合适。
```typescript
rules: [
  ...,
  {
    test: /\.(png|jpe?g|gif)$/,
    use: {
      loader: "url-loader",
      options: {
        // placeholder 占位符 [name] 资源模块的名称
        // [ext] 源资源模块的后缀
        name: "[name]_[hash].[ext]",
        // 打包后的存放位置
        outputPath: "./images"
        // 打包后文件的 url
        publicPath: './images',
        // 小于100字节转成 base64 格式
        limit: 100
      }
    }
  }
]
```
### 说说webpack中常见的Plugin? 解决了什么问题?
Plugin (Plug-in) 是一种计算机应用程序，它和主应用程序互相交互，以提供特定的功能
是一种遵循一定规范的应用程序接口编写出来的程序，只能运行在程序规定的系统下，因为其需要调用原纯净系统提供的函数库或者数据
webpack 中的 plugin 也是如此， plugin 赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在 webpack 的不同阶段 (钩子 / 生命周期)，贯穿了 webpack 整个编译周期

![图片.png](https://qn.huat.xyz/mac/202402082257443.png)

目的在于解决 Loader无法实现的其他事

#### 配置方式
这里讲述文件的配置方式，一般情况，通过配置文件导出对象中 plugins 属性传入 new 实例对象。
如下所示:
```typescript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm 
const webpack = require('webpack'); // 
module.exports = {
  ...
    plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
};
```
#### 特性
其本质是一个具有 apply 方法 javascript 对象
apply 方法会被 webpack compiler 调用，并且在整个编译生命周期都可以访问 compiler 对象
```typescript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack ');
    });
  }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;
```
compiler hook 的 tap 方法的第一个参数，应是驼峰式命名的插件名称
关于整个编译生命周期钩子，有如下:

- entry-option : 初始化 option
- run
- compile: 真正开始的编译，在创建 compilation 对象之前
- compilation : 生成好了 compilation 对象
- make 从 entry 开始递归分析依赖，准备对每个模块进行 build
- after-compile: 编译 build 过程结束
- emit : 在将内存中 assets 内容写到磁盘文件夹之前
- after-emit :在将内存中 assets 内容写到磁盘文件夹之后
- done: 完成所有的编译过程
- failed :编译失败的时候

#### 常见的 Plugin



![图片.png](https://qn.huat.xyz/mac/202402082257177.png)



##### HtmlWebpackPlugin
在打包结束后，自动生成一个 html 文文件，并把打包生成的 js 模块引入到该 html 中
```typescript
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  ...
    plugins: [
    new HtmlWebpackPlugin({
      title: "My App",
      filename: "app.html",
      template: "./src/html/index.html"
    })
    ]
};
```
```typescript
<!--./src/html/index.html-->
  <!DOCTYPE html>
  <html lang="en">
    <head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%=htmlWebpackPlugin.options.title%></title>
    </head>
    <body>
    <h1>html-webpack-plugin</h1>
    </body>
    </html>
```
在 html 模板中，可以通过 <%=htmlWebpackPlugin.options.XXX%> 的方式获取配置的值更多的配置可以自寻查找
##### clean-webpack-plugin
删除 (清理)构建目录
```typescript
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  ...
    plugins: [
    ...,
    new CleanWebpackPlugin(),
    ...
    ]
}
```
##### mini-css-extract-plugin
提取CSS 到一个单独的文件中
```typescript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    ...,
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    ...
  ]
}
```
##### DefinePlugin
允许在编译时创建配置的全局对象，是一个 webpack 内置的插件，不需要安装
```typescript
const { DefinePlugun } = require('webpack')
module.exports = {
  ...
    plugins:[
    new DefinePlugin({
      BASE_URL:'"./"'
    })
    ]
}
```
这时候编译 template 模块的时候，就能通过下述形式获取全局对象
```typescript
<link rel="icon" href="<%= BASE_URL%>favicon.ico>"
```
##### copy-webpack-plugin
复制文件或目录到执行区域，如 vue 的打包过程中，如果我们将一些文件放到 public 的目录下，那么这个目录会被复制到 dist 文件夹中
```typescript
new CopyWebpackPlugin({
  parrerns:[
    {
      from:"public",
      globOptions:{
        ignore:[
          '**/index.html'
        ]
      }
    }
  ]
})
```
复制的规则在 patterns 属性中设置

- from:设置从哪一个源中开始复制
- to: 复制到的位置，可以省略，会默认复制到打包的目录下
- globOptions: 设置一些额外的选项，其中可以编写需要忽略的文件

### 说说Loader和Plugin的区别? 编写Loader，Plugin的思路?

- loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终起打包到指定的文件中
- plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事

从整个运行时机上来看，如下图所示:

![图片.png](https://qn.huat.xyz/mac/202402082258045.png)

可以看到，两者在运行时机上的区别:

- loader 运行在打包文件之前
- plugins 在整个编译周期都起作用

在 webpack 运行的生命周期中会广播出许多事件， Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果
对于 loader ，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将 A.scss 或 A.less 转变为 B.css，单纯的文件转换过程

#### 编写loader
在编写 loader 前，我们首先需要了解 loader 的本质
其本质为函数，函数中的 this 作为上下文会被 webpack 填充，因此我们不能将loader 设为一个箭头函数
函数接受一个参数，为 webpack 传递给 loader 的文件源内容
函数中 this 是由 webpack 提供的对象，能够获取当前 loader 所需要的各种信息
函数中有异步操作或同步操作，异步操作通过this.callback 返回，返回值要求为 string 或者 Buffer
代码如下所示:
```typescript
// 导出一个函数，source为webpack传递给Loader的文件源内容
module.exports = function(source) {
  const content = doSomeThing2JsString(source);

  // 如果 loader 配置了 options 对象，那么this.query将指向 options
  const options = this.query;

  // 可以用作解析其他模块路径的上下文
  console.log('this.context');

  /*
* this.callback 参数:
* error: Error null，当 loader 出错时向外抛出一个 error
* content: StringBuffer，经过 loader 编译后需要导出的内容* sourceMap:为方便调试生成的编译后内容的 source map
* ast: 本次编译生成的 AST 静态语法树，之后执行的 oader 可以直接使用这个 AST.进而省去重复生成 AST 的过程
*/
  this.callback(null, content); //  异步
  return content; // 同步
}
```
一般在编写 loader 的过程中，保持功能单一，避免做多种功能
如 less 文件转换成css 文件也不是一步到位，而是 less-loader、、css-loader、style-Loader 几个Loader 的链式调用才能完成转换。

#### 编写 Plugin
由于 webpack 基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件就可以在特定的阶段执行自己的插件任务
在之前也了解过，webpack 编译会创建两个核心对象:

- compiler: 包含了 webpack 环境的所有的配置信息，包括 options，loader 和 plugin，和webpack 整个生命周期相关的钩子
- compilation: 作为 plugin 内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化。一次新的 Compilation 将被创建

如果自己要实现 plugin ，也需要遵循一定的规范:

- 插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问 compiler 实例
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，因此不建议修改
- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住

现 plugin 的模板如下:
```typescript
class MyPlugin {
  // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation => { 
      // compilation: 当前打包构建流程的上下文
      console.log(compilation);

      // do something...
    })
  }
}
```
在emit 事件发生时，代表源文件的转换和组装已经完成，可以读取到最终将输出的资源、代码块模块及其依赖，并且可以修改输出资源的内容

