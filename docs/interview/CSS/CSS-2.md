CSS2



### 第1题：怎么实现一个宽高自适应的正方形？

1、利用vw来实现

```
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}
```



2、利用元素的margin/padding百分比是相对父元素width的性质来实现：

```
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}
```



3、利用子元素的margin-top的值来实现：

```
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```



### 第2题：说说对 CSS 工程化的理解

CSS 工程化是为了解决以下问题：

1. **宏观设计**：CSS 代码如何组织、如何拆分、模块结构怎样设计？
2. **编码优化**：怎样写出更好的 CSS？
3. **构建**：如何处理我的 CSS，才能让它的打包结果最优？
4. **可维护性**：代码写完了，如何最小化它后续的变更成本？如何确保任何一个同事都能轻松接手？

以下三个方向都是时下比较流行的、普适性非常好的 CSS 工程化实践：

- 预处理器：Less、 Sass 等；
- 重要的工程化插件： PostCss；
- Webpack loader 等 。

基于这三个方向，可以衍生出一些具有典型意义的子问题，这里我们逐个来看：

**（1）预处理器：为什么要用预处理器？它的出现是为了解决什么问题？**

预处理器，其实就是 CSS 世界的“轮子”。预处理器支持我们写一种类似 CSS、但实际并不是 CSS 的语言，然后把它编译成 CSS 代码：



![img](https://qn.huat.xyz/mac/202312192232009.image)



那为什么写 CSS 代码写得好好的，偏偏要转去写“类 CSS”呢？这就和本来用 JS 也可以实现所有功能，但最后却写 React 的 jsx 或者 Vue 的模板语法一样。

随着前端业务复杂度的提高，前端工程中对 CSS 提出了以下的诉求：

1. 宏观设计上：我们希望能优化 CSS 文件的目录结构，对现有的 CSS 文件实现复用；
2. 编码优化上：我们希望能写出结构清晰、简明易懂的 CSS，需要它具有一目了然的嵌套层级关系，而不是无差别的一铺到底写法；我们希望它具有变量特征、计算能力、循环能力等等更强的可编程性，这样我们可以少写一些无用的代码；
3. 可维护性上：更强的可编程性意味着更优质的代码结构，实现复用意味着更简单的目录结构和更强的拓展能力，这两点如果能做到，自然会带来更强的可维护性。

这三点是传统 CSS 所做不到的，也正是预处理器所解决掉的问题。预处理器普遍会具备这样的特性：

- 嵌套代码的能力，通过嵌套来反映不同 css 属性之间的层级关系 ；
- 支持定义 css 变量；
- 提供计算函数；
- 允许对代码片段进行 extend 和 mixin；
- 支持循环语句的使用；
- 支持将 CSS 文件模块化，实现复用。

**（2）PostCss：PostCss 是如何工作的？我们在什么场景下会使用 PostCss？**



![img](https://qn.huat.xyz/mac/202312192232207.image)



它和预处理器的不同就在于，预处理器处理的是 类CSS，而 PostCss 处理的就是 CSS 本身。Babel 可以将高版本的 JS 代码转换为低版本的 JS 代码。PostCss 做的是类似的事情：它可以编译尚未被浏览器广泛支持的先进的 CSS 语法，还可以自动为一些需要额外兼容的语法增加前缀。更强的是，由于 PostCss 有着强大的插件机制，支持各种各样的扩展，极大地强化了 CSS 的能力。

PostCss 在业务中的使用场景非常多：

- 提高 CSS 代码的可读性：PostCss 其实可以做类似预处理器能做的工作；
- 当我们的 CSS 代码需要适配低版本浏览器时，PostCss 的 [Autoprefixer](https://github.com/postcss/autoprefixer) 插件可以帮助我们自动增加浏览器前缀；
- 允许我们编写面向未来的 CSS：PostCss 能够帮助我们编译 CSS next 代码；

**（3）Webpack 能处理 CSS 吗？如何实现？**

- **Webpack 在裸奔的状态下，是不能处理 CSS 的**，Webpack 本身是一个面向 JavaScript 且只能处理 JavaScript 代码的模块化打包工具；
- Webpack 在 loader 的辅助下，是可以处理 CSS 的。

如何用 Webpack 实现对 CSS 的处理：

- Webpack 中操作 CSS 需要使用的两个关键的 loader：css-loader 和 style-loader
- 注意，答出“用什么”有时候可能还不够，面试官会怀疑你是不是在背答案，所以你还需要了解每个 loader 都做了什么事情：
  - css-loader：导入 CSS 模块，对 CSS 代码进行编译处理；
  - style-loader：创建style标签，把 CSS 内容写入标签。

在实际使用中，**css-loader 的执行顺序一定要安排在 style-loader 的前面**。因为只有完成了编译过程，才可以对 css 代码进行插入；若提前插入了未编译的代码，那么 webpack 是无法理解这坨东西的，它会无情报错。



### 第3题：CSS预处理器/后处理器是什么？为什么要使用它们？

**预处理器，** 如：`less`，`sass`，`stylus`，用来预编译`sass`或者`less`，增加了`css`代码的复用性。层级，`mixin`， 变量，循环， 函数等对编写以及开发UI组件都极为方便。

**后处理器，** 如： `postCss`，通常是在完成的样式表中根据`css`规范处理`css`，让其更加有效。目前最常做的是给`css`属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

`css`预处理器为`css`增加一些编程特性，无需考虑浏览器的兼容问题，可以在`CSS`中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让`css`更加的简洁，增加适应性以及可读性，可维护性等。

其它`css`预处理器语言：`Sass（Scss）`, `Less`, `Stylus`, `Turbine`, `Swithch css`, `CSS Cacheer`, `DT Css`。

使用原因：

- 结构清晰， 便于扩展
- 可以很方便的屏蔽浏览器私有语法的差异
- 可以轻松实现多重继承
- 完美的兼容了`CSS`代码，可以应用到老项目中



#### 拓展

css-loader 和 postcss-loader 有什么区别？

`css-loader` 和 `postcss-loader` 是 webpack 中使用的两种不同的加载器（loader），它们在处理 CSS 文件时扮演着不同的角色。

css-loader

1. **功能**：`css-loader` 的主要功能是处理 CSS 文件中的 `@import` 和 `url()` 表达式，就像它们在 JS 模块系统中被使用一样。这允许你在 CSS 文件中使用本地文件路径，`css-loader` 会解析这些路径并将对应的文件包含在 webpack 的依赖图中。

2. **转换为模块**：`css-loader` 还会将 CSS 转换为 JavaScript 模块。当你在 JavaScript 文件中导入 CSS 文件时（例如使用 `import './style.css'`），`css-loader` 会生成一个 JavaScript 模块，这个模块包含了 CSS 字符串及其相关的处理逻辑。

3. **与其他加载器结合**：通常与 `style-loader`（将 CSS 插入到 DOM 中）或 `MiniCssExtractPlugin.loader`（将 CSS 提取到单独的文件中）结合使用。

postcss-loader

1. **功能**：`postcss-loader` 是用来使用 PostCSS 处理 CSS 文件的。PostCSS 是一个功能强大的工具，可以通过插件来扩展 CSS 的功能，比如自动添加浏览器厂商前缀、使用未来的 CSS 语法、优化 CSS 代码等。

2. **插件系统**：PostCSS 的核心特性是它的插件系统，`postcss-loader` 允许你在 webpack 构建过程中应用这些插件。你可以在 `postcss.config.js` 配置文件中指定要使用的插件。

3. **灵活性和扩展性**：`postcss-loader` 提供了极大的灵活性和扩展性，你可以根据项目的需要选择和配置各种插件，例如 `autoprefixer`、`cssnano`、`postcss-preset-env` 等。

在 webpack 中的使用

在 webpack 的配置中，这两个加载器通常一起使用，先使用 `css-loader` 处理 CSS 文件，然后使用 `postcss-loader` 进一步处理 `css-loader` 的输出。这允许你既能利用 `css-loader` 的模块化特性，又能享受 PostCSS 提供的强大功能和灵活的插件系统。

```javascript
{
  test: /\.css$/,
  use: [
    'style-loader', // 将 JS 字符串生成为 style 节点
    'css-loader',   // 将 CSS 转化成 CommonJS 模块
    'postcss-loader' // 使用 postcss 处理 CSS
  ]
}
```

简而言之，`css-loader` 主要负责将 CSS 转化为 JS 模块并处理 CSS 中的依赖，而 `postcss-loader` 负责使用 PostCSS 插件来转换和优化 CSS 代码。



在 webpack 的生态系统中，`style-loader` 和 `MiniCssExtractPlugin.loader` 是两个常用的加载器（loader），它们用于处理样式文件，但以不同的方式。

style-loader

1. **功能**：`style-loader` 用于将 CSS 添加到 DOM 中。当你在 JavaScript 文件中导入 CSS 时，`style-loader` 会生成一个 `<style>` 标签，并将 CSS 内容插入到这个标签中。然后，这个标签会被添加到 HTML 文档的 `<head>` 部分。

2. **开发环境中的使用**：由于 `style-loader` 插入的样式是热加载的，这使得它非常适合在开发环境中使用，因为它支持热模块替换（HMR），即当 CSS 文件被修改时，页面无需完全刷新即可更新样式。

3. **局限性**：在生产环境中，使用 `style-loader` 可能会导致一些性能问题，因为所有的 CSS 都会打包进 JavaScript 文件中，增加了文件大小，并可能延迟了样式的加载。

MiniCssExtractPlugin.loader

1. **功能**：`MiniCssExtractPlugin.loader` 用于将 CSS 提取到单独的文件中。在构建过程中，它会生成 `.css` 文件而不是将 CSS 内容注入到 JavaScript 中。这对于生产环境特别有用，因为它减少了主 JavaScript 文件的大小，并允许浏览器并行加载 CSS 和 JavaScript。

2. **生产环境中的使用**：在生产环境中，将 CSS 提取为单独的文件通常是更好的选择，因为这样可以利用浏览器的缓存机制，只有在 CSS 文件本身发生变化时才需要重新加载，同时还可以减少初始加载时间。

3. **配置**：要使用 `MiniCssExtractPlugin`，你需要安装插件，并在 webpack 配置中添加它。它通常与 `optimize-css-assets-webpack-plugin` 一起使用，后者用于优化和压缩提取出的 CSS 文件。

使用场景对比

- **开发环境**：在开发环境中，推荐使用 `style-loader`，因为它支持热模块替换，能够提高开发效率。

- **生产环境**：在生产环境中，建议使用 `MiniCssExtractPlugin.loader` 将 CSS 提取到单独的文件中，以优化加载性能和资源缓存。

webpack 中的配置示例

```javascript
// 开发环境
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}

// 生产环境
{
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader']
}
```

在实际使用中，你可以根据构建环境（development 或 production）动态地选择使用 `style-loader` 还是 `MiniCssExtractPlugin.loader`。









### 第4题：为什么有时候⽤translate来改变位置⽽不是使用position进行定位？

translate 是 transform 属性的⼀个值。

改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。

⽽改变绝对定位会触发重新布局，进⽽触发重绘和复合。

transform使浏览器为元素创建⼀个 GPU 图层，但改变绝对定位会使⽤到 CPU。

因此translate()更⾼效，可以缩短平滑动画的绘制时间。

⽽translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况。

具体的原理可查看 [【前端基础系列】CSS篇-带你搞懂“硬件加速”](https://mp.weixin.qq.com/s?__biz=Mzk0NTI2NDgxNQ==&mid=2247484939&idx=1&sn=229467c549cec5e3980671f488a4d89e&chksm=c31947cbf46ecedd13f930b44e9bc2a25ce706a8d30fce56c54584598015640338a6e075b8ff#rd)





### 第5题：transition和animation的区别

- transition是过度属性，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于flash的补间动画，设置一个开始关键帧，一个结束关键帧。
- animation是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。它也类似于flash的补间动画，但是它可以设置多个关键帧（用@keyframe定义）完成动画。





### 第6题：下面这段代码中，class为content的元素，实际高度是100px吗？

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>

    <style>
      .parent {
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 300px;
        background: yellow;
      }
      div {
        width: 100%;
      }
      .header {
        height: 200px;
        background: red;
      }
      .content {
        height: 100%;
        background: blue;
      }
      .footer {
        height: 200px;
        background: black;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="header"></div>
      <div class="content"></div>
      <div class="footer"></div>
    </div>
  </body>
</html>
```

不是。首先，content元素的 height 设置为 “100%”，在父级的高度为固定值时，直接继承该高度，也就是600px。但父级设置了 display:flex ，在高度固定的前提下，子元素的高度会按比例进行缩放，所以content元素最后的高度应该是 600 * (600/(200+600+200)) = 360px

在线demo可访问查看： https://codesandbox.io/s/strange-curran-3kci7i?file=/index.html





### 第7题：说说 Vue 中 CSS scoped 的原理(详解 vue-loader)

https://fe.ecool.fun/topic-answer/3e12b5bf-53ed-4b71-a199-49d7935f87b4?orderBy=updateTime&order=desc&tagId=11

### 第8题：硬件加速的原理是什么？ 

https://fe.ecool.fun/topic-answer/5adab921-8dfb-4a65-9f44-38ae8a70820f?orderBy=updateTime&order=desc&tagId=11



### 第9题：CSS动画和JS实现的动画分别有哪些优缺点？

#### CSS动画

##### 优点

- 浏览器可以对动画进行优化
- 代码相对简单,性能调优方向固定
- 对于帧速表现不好的低版本浏览器，`CSS3`可以做到自然降级，而`JS`则需要撰写额外代码

##### 缺点

- 运行过程控制较弱,无法附加事件绑定回调函数
- 代码冗长，想用`CSS`实现稍微复杂一点动画,最后`CSS`代码都会变得非常笨重

#### JS动画

##### 优点

- 控制能力很强, 可以在动画播放过程中对动画进行控制：开始、暂停、回放、终止、取消都是可以做到的。
- 动画效果比`css3`动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只有`js`动画才能完成
- `CSS3`有兼容性问题，而`JS`大多时候没有兼容性问题

##### 缺点

- 代码的复杂度高于`CSS`动画
- `JavaScript`在浏览器的主线程中运行，而主线程中还有其它需要运行的`JavaScript`脚本、样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情况



### 第10题：前端实现动画有哪些方式？

1. css3的`transition` 属性
2. css3的`animation` 属性
3. 原生JS动画
4. 使用`canvas`绘制动画
5. SVG动画
6. Jquery的`animate`函数
7. 使用gif图片

https://fe.ecool.fun/topic-answer/8b516cb7-fa94-4d68-929f-d3c628d1b7a2?orderBy=updateTime&order=desc&tagId=11



### 第11题：假设下面样式都作用于同一个节点元素`span`，判断下面哪个样式会生效

```
body#god div.dad span.son {width: 200px;}
body#god span#test {width: 250px;}
```

本题考察css的样式优先级权重，大家需要记住：

当两个权值进行比较的时候，是从高到低逐级将等级位上的权重值（如 权值 1,0,0,0 对应--> 第一等级权重值，第二等级权重值，第三等级权重值，第四等级权重值）来进行比较的，而不是简单的 1000个数 + 100个数 + 10个数 + 1个数 的总和来进行比较的，换句话说，低等级的选择器，个数再多也不会越等级超过高等级的选择器的优先级的。

所以本题的分析思路是：

- 先比较高权重位，即第一个样式的高权重为 `#god` = 100
- 第二个样式的高权重为 `#god` + `#text` = 200
- 100 < 200
- 所以最终计算结果是取 `width: 250px;`
- 若两个样式的高权重数量一样的话，则需要比较下一较高权重！

答案是 `width: 250px;`





### 第12题：为何CSS不支持父选择器？

这个问题的答案和“为何CSS相邻兄弟选择器只支持后面的元素，而不支持前面的兄弟元素？”是一样的。

浏览器解析HTML文档，是从前往后，由外及里的。所以，我们时常会看到页面先出现头部然后主体内容再出现的加载情况。

但是，如果CSS支持了父选择器，那就必须要页面所有子元素加载完毕才能渲染HTML文档，因为所谓“父选择器”，就是后代元素影响祖先元素，如果后代元素还没加载处理，如何影响祖先元素的样式？于是，网页渲染呈现速度就会大大减慢，浏览器会出现长时间的白板。加载多少HTML就可以渲染多少HTML，在网速不是很快的时候，就显得尤为的必要。比方说你现在看的这篇文章，只要文章内容加载出来就可以了，就算后面的广告脚本阻塞了后续HTML文档的加载，我们也是可以阅读和体验。但是，如果支持父选择器，则整个文档不能有阻塞，页面的可访问性则要大大降低。

有人可能会说，要不采取加载到哪里就渲染到哪里的策略？这样子问题更大，因为会出现加载到子元素的时候，父元素本来渲染的样式突然变成了另外一个样式的情况，体验非常不好。

“相邻选择器只能选择后面的元素”也是一样的道理，不可能说后面的HTML加载好了，还会影响前面HTML的样式。

所以，从这一点来讲，CSS支持“父选择器”或者“前兄弟选择器”的可能性要比其他炫酷的CSS特性要低，倒不是技术层面，而是CSS和HTML本身的渲染机制决定的。当然，以后的事情谁都说不准，说不定以后网速都是每秒几个G的，网页加载速度完全就忽略不计，说不定就会支持了。



### 第13题：第二个子元素的高度是多少

```
<div class="container">
    <div style="height: 100px"></div>
    <div style="min-height: 10px"></div>
</div>
<style>
    .container{
        display: flex;
    }
    .container > div {
        width: 100px;
    }
</style>
```

答案：100px

Flex 布局会默认：

- 把所有子项变成水平排列。
- 默认不自动换行。
- 让子项与其内容等宽，并把所有子项的高度变为最高子项的高度。





### 第14题：如何从html元素继承box-sizing？

在大多数情况下我们在设置元素的 border 和 padding 并不希望改变元素的 width,height值，这个时候我们就可以为该元素设置 `box-sizing:border-box;`。

如果不希望每次都重写一遍，而是希望他是继承而来的，那么我们可以使用如下代码：

```
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

这样的好处在于他不会覆盖其他组件的 box-sizing 值，又无需为每一个元素重复设置 box-sizing:border-box;



### 第15题：js和css是如何影响DOM树构建的？

先做个总结，然后再进行具体的分析：

CSS不会阻塞DOM的解析，但是会影响JAVAScript的运行，javaSscript会阻止DOM树的解析，最终css（CSSOM）会影响DOM树的渲染，也可以说最终会影响渲染树的生成。

接下来我们先看javascript对DOM树构建和渲染是如何造成影响的，分成三种类型来讲解：

#### JavaScript脚本在html页面中

```
<html>
  <body>
    <div>1</div>
    <script>
      let div1 = document.getElementsByTagName('div')[0]
      div1.innerText = 'time.geekbang'
    </script>
    <div>test</div>
  </body>
</html>
```

两段div中间插入一段JavaScript脚本，这段脚本的解析过程就有点不一样了。

当解析到script脚本标签时，HTML解析器暂停工作，javascript引擎介入，并执行script标签中的这段脚本。

因为这段javascript脚本修改了DOM中第一个div中的内容，所以执行这段脚本之后，div节点内容已经修改为time.geekbang了。脚本执行完成之后，HTML解析器回复解析过程，继续解析后续的内容，直至生成最终的DOM。

#### html页面中引入javaScript文件

```
//foo.js
let div1 = document.getElementsByTagName('div')[0]
div1.innerText = 'time.geekbang'

<html>
  <body>
    <div>1</div>
    <script type="text/javascript" src='foo.js'></script>
    <div>test</div>
  </body>
</html>
```

这段代码的功能还是和前面那段代码是一样的，只是把内嵌JavaScript脚本修改成了通过javaScript文件加载。

其整个执行流程还是一样的，执行到JAVAScript标签时，暂停整个DOM的解析，执行javascript代码，不过这里执行javascript时，需要现在在这段代码。这里需要重点关注下载环境，因为javascript文件的下载过程会阻塞DOM解析，而通常下载又是非常耗时的，会受到网络环境、javascript文件大小等因素的影响。

优化机制：

谷歌浏览器做了很多优化，其中一个主要的优化就是预解析操作。当渲染引擎收到字节流之后，会开启一个预解析线程，用来分析HTML文件中包含的JavaScript、CSS等相关文件，解析到相关文件之后，会开启一个预解析线程，用来分析HTML文件中包含的javascprit、css等相关文件、解析到相关文件之后，预解析线程会提前下载这些文件。

再回到 DOM 解析上，我们知道引入 JavaScript 线程会阻塞 DOM，不过也有一些相关的策略来规避，比如使用 CDN 来加速 JavaScript 文件的加载，压缩 JavaScript 文件的体积。

另外，如果 JavaScript 文件中没有操作 DOM 相关代码，就可以将该 JavaScript 脚本设置为异步加载，通过 async 或 defer 来标记代码，使用方式如下所示：

```
<script async type="text/javascript" src='foo.js'></script>
<script defer type="text/javascript" src='foo.js'></script>
```

async和defer区别：

- async：脚本并行加载，加载完成之后立即执行，执行时机不确定，仍有可能阻塞HTML解析，执行时机在load事件派发之前。
- defer：脚本并行加载，等待HTML解析完成之后，按照加载顺序执行脚本，执行时机DOMContentLoaded事件派发之前。

#### html页面中有css样式

```
//theme.css
div {color:blue}

<html>
<head>
    <style src='theme.css'></style>
</head>
<body>
  <div>1</div>
  <script>
      let div1 = document.getElementsByTagName('div')[0]
      div1.innerText = 'time.geekbang' // 需要 DOM
      div1.style.color = 'red' // 需要 CSSOM
  </script>
  <div>test</div>
</body>
</html>
```

该示例中，JavaScript 代码出现了 `div1.style.color = ‘red’` 的语句，它是用来操纵 CSSOM 的，所以在执行 JavaScript 之前，需要先解析 JavaScript 语句之上所有的CSS 样式。所以如果代码里引用了外部的 CSS 文件，那么在执行 JavaScript 之前，还需要等待外部的 CSS 文件下载完成，并解析生成 CSSOM 对象之后，才能执行 JavaScript 脚本。

而 JavaScript 引擎在解析 JavaScript 之前，是不知道 JavaScript 是否操纵了 CSSOM的，所以渲染引擎在遇到 JavaScript 脚本时，不管该脚本是否操纵了 CSSOM，都会执行CSS 文件下载，解析操作，再执行 JavaScript 脚本。所以说 JavaScript 脚本是依赖样式表的，这又多了一个阻塞过程。

总结：通过上面三点的分析，我们知道了 JavaScript 会阻塞 DOM 生成，而样式文件又会阻塞js的执行。



### 第16题：CSSOM树和DOM树是同时解析的吗？

浏览器会下下载HTML解析页面生成DOM树，遇到CSS标签就开始解析CSS，这个过程不会阻塞，但是如果遇到了JS脚本，此时假如CSSOM还没有构建完，需要等待CSSOM构建完，再去执行JS脚本，然后再执行DOM解析，此时会阻塞。



### 第17题：position：absolute绝对定位，是相对于谁的定位？

CSS position属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

absolute的元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的 **非 static 定位祖先元素** 的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。



### 第18题：怎么做移动端的样式适配？

https://fe.ecool.fun/topic-answer/ffd21d04-15d9-4f94-9167-5edf63a42741?orderBy=updateTime&order=desc&tagId=11



### 第19题：CSS 垂直居中有哪些实现方式？

我们在布局一个页面时，通常都会用到水平居中和垂直居中，处理水平居中很好处理，不外乎就是设定margin:0 auto;或是text-align:center;,就可以轻松解决掉水平居中的问题，但一直以来最麻烦对齐问题就是「垂直居中」，以下将介绍几种单纯利用CSS垂直居中的方式，只需要理解背后的原理就可以轻松应用。

下面为公共代码：

```
<div class="box">
    <div class="small">small</div>
</div>

.box {
    width: 300px;
    height: 300px;
    background: #ddd;
}
.small {
    background: red;
}
```

#### flex

方法 1

```
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
```



方法 2

```
.box {
    display: flex;
    justify-content: center;
}
.small {
    align-self: center;
}
```



#### absolute + margin实现

方法 1

```
.box {
    position: relative;
}
.small {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    width: 100px;
    height: 100px;

```

方法2

```
.box {
    position: relative;
}
.small {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100px;
    height: 100px;
}
```

#### absolute + calc 实现

```
.box {
    position: relative;
}
.small {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
}
```

#### absolute + transform 实现

```
.box {
    position: relative;
}
.small {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    width: 100px;
    height: 100px;
}
```

#### 转行内元素

```
.box {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.small {
    padding: 6px 10px;
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: 16px;
}
```

#### table-cell

```
.box {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.small {
    padding: 6px 10px;
    display: inline-block;
}
```



### 第20题：怎么让CSS flex布局最后一行列表左对齐？

https://fe.ecool.fun/topic-answer/389a7ca7-43d2-4fbe-99ef-50bea32bef5c?orderBy=updateTime&order=desc&tagId=11





