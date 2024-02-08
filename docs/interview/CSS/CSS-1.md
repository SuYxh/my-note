### 1、怎么实现样式隔离？

**作用域样式（Scoped Styles）**

- 在 Vue 单文件组件中，可以使用 `scoped` 特性将样式限定于当前组件的作用域。
- 使用`<style scoped>`标签包裹的样式只对当前组件起作用，不会影响其他组件或全局样式。
- Vue 会通过给每个选择器添加一个唯一的属性选择器来实现作用域样式，确保样式仅适用于当前组件。

**CSS Modules**

- Vue 支持使用 CSS Modules 来实现样式的模块化和隔离。
- 在 Vue 单文件组件中，可以借助 `module` 特性启用 CSS Modules 功能，在样式文件中使用类似 `:local(.className)` 的语法来定义局部样式。
- CSS Modules 会自动生成唯一的类名，并在编译时将类名与元素关联起来，从而实现样式的隔离和局部作用域。

**命名约定**：

- 可以通过使用特定的命名约定来实现样式的隔离。
- 为了避免样式冲突，可以采用特定的命名规则或前缀，例如 BEM（Block Element Modifier）命名规范或基于组件名称的前缀。
- 通过在样式类名中添加前缀或特定的命名约定，可以减少样式冲突的可能性。

**CSS-in-JS 方案**：

- Vue 也可以结合 CSS-in-JS 库（如 `styled-components`、`emotion` 等）来实现样式的隔离。
- 使用这种方式，可以直接在组件代码中编写样式，并通过 JavaScript 对象或模板字符串的形式动态生成样式。
- CSS-in-JS 方案将样式与组件紧密关联，实现了更高程度的样式隔离和可重用性。





### 2、`Vue <style scoped>` 原理

`<style scoped>` 在 Vue 中是一种特殊的用法，用于定义组件级别的 CSS 样式。这意味着这些样式仅适用于当前组件，不会影响到其他组件。下面是 `<style scoped>` 工作原理的概述：



**唯一属性的生成** ：当你在一个 Vue 组件中使用 `<style scoped>`，Vue 会为该组件的所有模板元素添加一个唯一的属性（例如 `data-v-f3f3eg9`）。这个属性是一个随机生成的唯一标识符。**由Vue的编译器完成的**

**CSS 重写**：Vue 接着会通过预处理器（例如 webpack）重写这些样式定义，使得它们只匹配带有相应属性的元素。例如，如果你有一个 `.button { color: red; }` 的样式定义，并且 `<style>` 标签是 `scoped` 的，Vue 会将其转换为类似 `.button[data-v-f3f3eg9] { color: red; }` 的样式。**由Vue的构建工具链负责的**，webpack 对应 `vue-loader`， vite 对应 `@vitejs/plugin-vue`。Vue Loader还提供了对深层选择器（如 `>>>` 或 `/deep/`）的支持，允许父组件的样式影响子组件

需要注意的是，`<style scoped>` 不会影响子组件和传递给插槽的内容。这些元素不会获得同样的唯一属性，因此不会被 scoped CSS 影响。





### 3、CSS Modules

CSS Modules 是一种 CSS 文件的处理方法，它允许你以模块化的方式编写 CSS 代码。在 CSS Modules 中，每个 CSS 文件被视为一个独立的模块，这意味着在该文件中定义的所有样式都是局部作用域的，而不会影响到其他的 CSS 文件。这种方法可以有效地解决全局命名空间污染的问题，并提高 CSS 的模块化和可维护性。原理是通过改变传统的 CSS 类名处理方式，引入局部作用域和构建工具集成，从而实现更安全、更模块化的样式编写方法。这种方法在现代前端开发中越来越受欢迎，因为它极大地减少了样式冲突，提高了代码的可维护性和可重用性。

主要是基于以下几个核心概念和技术实现：

**局部作用域（Local Scoping）**

- **核心概念**：在传统的 CSS 中，所有的类名和 ID 都是在全局作用域下定义的，这意味着任何地方定义的样式都可以影响到整个网站。CSS Modules 改变了这一点，它为每个 CSS 文件创建一个局部作用域。
- **技术实现**：当 CSS Modules 被处理时，每个类名和选择器都被转换成一个唯一的字符串。这通常是通过结合原始类名、文件名和一个哈希值来生成的。

**类名映射（Class Name Mapping）**

- **核心概念**：在 CSS Modules 中，你在 CSS 文件中定义的类名将不直接用于 HTML。相反，你需要通过 JavaScript 导入 CSS Module，并使用返回的映射对象来引用类名。
- **技术实现**：当你在 JavaScript 中导入一个 CSS Module 文件时，它不会返回原始的类名，而是返回一个对象，其中包含了转换后的唯一类名。这样，你可以通过 JavaScript 动态地引用这些类名。

**构建工具集成（Build Tool Integration）**

- **核心概念**：CSS Modules 需要构建工具（如 Webpack、Parcel 或其他）的支持来处理和转换 CSS 文件。
- **技术实现**：构建工具使用特定的加载器（如 `css-loader` for Webpack）来处理 CSS Module 文件。这些加载器会解析 CSS 文件，将类名和选择器转换为唯一标识符，并生成相应的 JavaScript 映射。

**组合（Composability）**

- **核心概念**：CSS Modules 支持将一个样式“组合”到另一个样式中，这允许你在不同的模块间共享样式。
- **技术实现**：通过在一个 CSS 类中引用另一个类（使用 `composes` 关键字），你可以合并多个类的样式，从而实现样式的重用和组合。

**与预处理器的兼容性（Preprocessor Compatibility）**

- **核心概念**：CSS Modules 与预处理器（如 Sass、Less）兼容，允许你在模块化的上下文中使用变量、混合等预处理器特性。
- **技术实现**：在处理 CSS Module 之前，预处理器首先将其特有的语法转换为标准的 CSS，然后 CSS Modules 处理器会对这个转换后的 CSS 应用模块化转换。



**CSS Modules 不是 CSS 本身的一个特性**，**而是一种构建工具（如 Webpack 或 Browserify）中的一个插件或加载器功能**。通过使用这些工具，你可以在构建过程中将 CSS Modules 转换为普通的 CSS，并且保持其作用域的隔离性。



#### vue 和 webpack 

1、安装了 `vue-loader` 和 `css-loader`，因为这两个 loader 对于处理 Vue 组件中的 CSS 至关重要。

2、在 `webpack.config.js` 文件中，需要配置 `css-loader` 来启用 CSS Modules 功能。这可以通过在 loader 的选项中设置 `modules` 为 `true` 来实现。例如：

```js
{
  module: {
    rules: [
      // ... 其他规则
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // localIdentName 选项用于定义生成的类名格式，这样可以确保它们是唯一的。
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
}

```

3、在 Vue 组件中使用 CSS Modules

```
<template>
  <div :class="$style.myClass">
    <!-- 使用样式的内容 -->
  </div>
</template>

<style module>
.myClass {
  color: red;
}
</style>
```

4、使用动态样式

```
<template>
  <div :class="dynamicClass">
    <!-- 内容 -->
  </div>
</template>

<script>
export default {
  computed: {
    dynamicClass() {
      return this.someCondition ? this.$style.classOne : this.$style.classTwo;
    },
  },
};
</script>

<style module>
.classOne {
  /* 样式定义 */
}
.classTwo {
  /* 另一种样式定义 */
}
</style>
```



#### react umi

在 React 的 Umi 框架中，对 CSS Modules 的支持被内置和自动化了，这是为什么你只需要使用 `.module.css` 文件名后缀就可以启用 CSS Modules 功能的原因。Umi 框架为了简化开发者的工作流，已经在其构建系统中预配置了对 CSS Modules 的支持。

自动化配置

在 Umi 中，当你创建一个以 `.module.css` 结尾的 CSS 文件时，Umi 自动识别这个文件为 CSS Module。Umi 的构建系统（基于 Webpack）会自动应用必要的 loader 和配置来处理这些文件。这意味着你不需要手动在 Webpack 配置文件中设置 CSS Modules。

工作原理

当你使用 `.module.css` 文件时，Umi（通过其底层的 Webpack 配置）会自动启用 CSS Modules 的特性。这包括：

1. **自动作用域**：每个 CSS 类名在构建过程中自动转换成唯一的标识符，从而确保样式的局部作用域。

2. **易于集成**：在 React 组件中，你可以直接导入 `.module.css` 文件，并像使用 JavaScript 对象一样使用其中的类名。

比如： 在 Umi 项目中，使用 CSS Modules 非常直接：

```jsx
import React from 'react';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    Hello World
  </div>
);

export default App;
```

在这个例子中，`App.module.css` 文件中定义的样式将被限制在 `App` 组件中，避免全局污染。





### 4、CSS Modules 和 `Vue <style scoped>` 有什么区别和联系？

CSS Modules 和 Vue 的 `<style scoped>` 是两种不同的方法，用于实现样式的局部作用域，它们有各自的特点和使用场景：

#### CSS Modules

1. **原理**：CSS Modules 通过 JavaScript 动态引用和映射 CSS 类名。它在构建时将类名转换为唯一标识符，从而实现样式的封装和局部作用域。

2. **使用**：在 JavaScript 或 Vue 组件中导入 CSS 文件，然后以对象属性的形式引用类名。

3. **优势**：
   - 可以实现跨组件的样式共享。
   - 易于与 CSS 预处理器（如 Sass、Less）和其他工具集成。
   - 提供了编写可复用 CSS 的能力。

4. **局限性**：
   - 需要构建工具的支持（如 Webpack）。
   - 对项目结构和构建过程有一定要求。

#### Vue 的 `<style scoped>`

1. **原理**：Vue 在编译时为模板中的元素和相应的 CSS 选择器添加唯一的数据属性，从而实现样式的局部作用域。

2. **使用**：在单文件组件（.vue 文件）的 `<style>` 标签中添加 `scoped` 属性。

3. **优势**：
   - 简单易用，无需额外配置或工具支持。
   - 与 Vue 单文件组件紧密集成，提供了更直观的样式封装。

4. **局限性**：
   - 样式不易在多个组件间共享。
   - 每个组件的样式是独立的，可能会导致样式重复。

#### 区别和联系

- **目标相同**：两者都旨在提供 CSS 的局部作用域，避免样式冲突。
- **实现方式不同**：CSS Modules 是通过 JavaScript 和构建工具实现的，而 Vue 的 `<style scoped>` 是通过 Vue 的编译器实现的。
- **集成程度**：`<style scoped>` 更紧密地集成在 Vue 的生态系统中，而 CSS Modules 更通用，可以用在多种框架和环境中。
- **适用场景**：CSS Modules 更适合需要大量样式复用和组件化的大型项目，而 `<style scoped>` 更适合轻量级或对构建工具要求不高的项目。



### 5、flex 布局下，怎么改变元素的顺序？

可以使用`order`属性来改变Flex布局下元素的顺序。`order`属性指定了Flex容器内部各个项目的排列顺序，其默认值为0。

通过调整`order`属性的值，可以改变元素的顺序。具体步骤如下：

1. 将元素定义为Flex容器，使用`display: flex;`或者`display: inline-flex;`。
2. 为每个子元素设置`order`属性，根据需要设置不同的值，值越小的元素会在前面，值相等的元素按照文档流原始顺序排列。

以下是一个示例代码：

```css
<div class="flex-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>

.flex-container {
  display: flex;
}

.item {
  order: 2; /* 改变顺序 */
}
```



在上述代码中，通过将第二个子元素的`order`属性设置为2，可以将其放置在其他子元素之后。

请注意，`order`属性接受任意整数值，负数也可以使用。同时，当多个元素的`order`值相同时，它们会按照它们在文档流中的位置进行排序。





### 6、object-fit 用法

**`object-fit`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)（例如：`<img>` 或 `<video>`）的内容应该如何适应到其使用高度和宽度确定的框。你可以通过使用 `object-position` 属性来切换被替换元素的内容对象在元素框内的对齐方式。

[语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit#语法)

```
// 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“[黑边](https://zh.wikipedia.org/wiki/黑邊)”。
object-fit: contain; 
// 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。
object-fit: cover; 
// 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。
object-fit: fill; 
// 被替换的内容将保持其原有的尺寸。
object-fit: none; 
// 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。
object-fit: scale-down; /* Global values */ 
object-fit: inherit; 
object-fit: initial; 
object-fit: revert; 
object-fit: revert-layer; 
object-fit: unset; 
```



### 7、行内元素和块级元素有什么区别

**行内元素（Inline Elements）：**

- 默认情况下，行内元素在水平方向上以行内的方式显示，不会独占一行。
- 行内元素只能容纳文本或其他行内元素，不能容纳块级元素。
- 行内元素的宽度和高度由其内容决定，无法设置固定的宽度和高度。
- 行内元素可以设置左右的外边距（margin）和内边距（padding），但上下外边距和内边距对行内元素不起作用。
- 常见的行内元素包括 `<span>`、`<a>`、`<strong>`、`<em>`、`<img>` 等。

**块级元素（Block-level Elements）：**

- 默认情况下，块级元素会独占一行的空间，即使它们宽度没有填满父元素的水平空间。
- 块级元素可以包含其他块级元素和行内元素。
- 块级元素的宽度、高度、内外边距都可以通过 CSS 设置。
- 块级元素会自动在其前后创建换行。
- 常见的块级元素包括 `<div>`、`<p>`、`<h1>`-`<h6>`、`<ul>`、`<ol>`、`<li>`、`<table>` 等。

通过 CSS 的 `display` 属性可以修改元素的显示方式，例如将行内元素设置为块级元素或将块级元素设置为行内元素，这样可以改变元素在页面中的布局和显示效果。



### 第6题：em/px/rem/vh/vw 这些单位有什么区别？

| CSS单位      |                                        |
| ------------ | -------------------------------------- |
| 相对长度单位 | em、ex、ch、rem、vw、vh、vmin、vmax、% |
| 绝对长度单位 | cm、mm、in、px、pt、pc                 |

**px**：绝对单位，页面按精确像素展示

**em**：相对单位，基准点为父节点字体的大小，如果自身定义了`font-size`按自身来计算，整个页面内`1em`不是一个固定的值

**rem**：相对单位，可理解为`root em`, 相对根节点`html`的字体大小来计算

**vh、vw**：主要用于页面视口大小布局，在页面布局上更加方便简单





### 第7题：html和css中的图片加载与渲染规则是什么样的？



Web浏览器先会把获取到的HTML代码解析成一个DOM树，HTML中的每个标签都是DOM树中的一个节点，包括`display: none`隐藏的标签，还有JavaScript动态添加的元素等。

浏览器会获取到所有样式，并会把所有样式解析成样式规则，在解析的过程中会去掉浏览器不能识别的样式。

浏览器将会把DOM树和样式规则组合在一起（DOM元素和样式规则匹配）后将会合建一个渲染树（Render Tree），渲染树类似于DOM树，但两者别还是很大的：

渲染树能识别样式，渲染树中每个节点（NODE）都有自己的样式，而且渲染树不包含隐藏的节点（比如display:none的节点，还有`</head>`内的一些节点），因为这些节点不会用于渲染，也不会影响节点的渲染，因此不会包含到渲染树中。一旦渲染树构建完毕后，浏览器就可以根据渲染树来绘制页面了。

简单的归纳就是浏览器渲染Web页面大约会经过六个过程：

- 解析HTML，构成DOM树
- 解析加载的样式，构建样式规则树
- 加载JavaScript，执行JavaScript代码
- DOM树和样式规则树进行匹配，构成渲染树
- 计算元素位置进行页面布局
- 绘制页面，最终在浏览器中呈现



先概括一点：

> Web页面中不是所有的图片都会加载和渲染！

我们可以归纳为：

- `<img>`、`<picture>`和设置background-image的元素遇到display:none时，图片会加载，但不会渲染。
- `<img>`、`<picture>`和设置background-image的元素祖先元素设置display:none时，background-image不会渲染也不会加载，而img和picture引入的图片不会渲染但会加载
- `<img>`、`<picture>`和background-image引入相同路径相同图片文件名时，图片只会加载一次
- 样式文件中background-image引入的图片，如果匹配不到DOM元素，图片不会加载
- 伪类引入的background-image，比如:hover，只有当伪类被触发时，图片才会加载



### 第8题：如何实现单行／多行文本溢出的省略样式？

#### 单行文本溢出省略

涉及的`css`属性有：

- text-overflow：规定当文本溢出时，显示省略符号来代表被修剪的文本
- white-space：设置文字在一行显示，不能换行
- overflow：文字长度超出限定宽度，则隐藏超出的内容

`overflow`设为`hidden`，普通情况用在块级元素的外层隐藏内部溢出元素，或者配合下面两个属性实现文本溢出省略

`white-space:nowrap`，作用是设置文本不换行，是`overflow:hidden`和`text-overflow：ellipsis`生效的基础

`text-overflow`属性值有如下：

- clip：当对象内文本溢出部分裁切掉
- ellipsis：当对象内文本溢出时显示省略标记（...）

`text-overflow`只有在设置了`overflow:hidden`和`white-space:nowrap`才能够生效的

举个例子

```
<style>
    p{
        overflow: hidden;
        line-height: 40px;
        width:400px;
        height:40px;
        border:1px solid red;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<p 这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本</p >
```

效果如下：



![img](https://qn.huat.xyz/mac/202312181921082.png)



#### 多行文本溢出省略

多行文本溢出的时候，我们可以分为两种情况：

- 基于高度截断
- 基于行数截断

##### 基于高度截断

###### 伪元素 + 定位

核心的`css`代码结构如下：

- position: relative：为伪元素绝对定位
- overflow: hidden：文本溢出限定的宽度就隐藏内容）
- position: absolute：给省略号绝对定位
- line-height: 20px：结合元素高度,高度固定的情况下,设定行高, 控制显示行数
- height: 40px：设定当前元素高度
- ::after {} ：设置省略号样式

代码如下所示：

```
<style>
    .demo {
        position: relative;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
    }
    .demo::after {
        content: "...";
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: white;
        padding: 0 20px 0 10px;
    }
</style>

<body>
    <div class='demo'>这是一段很长的文本</div>
</body>
```

实现原理很好理解，就是通过伪元素绝对定位到行尾并遮住文字，再通过 `overflow: hidden` 隐藏多余文字

这种实现具有以下优点：

- 兼容性好，对各大主流浏览器有好的支持
- 响应式截断，根据不同宽度做出调整

一般文本存在英文的时候，可以设置`word-break: break-all`使一个单词能够在换行时进行拆分

##### 基于行数截断

纯`css`实现也非常简单，核心的`css`代码如下：

- -webkit-line-clamp: 2：用来限制在一个块元素显示的文本的行数，为了实现该效果，它需要组合其他的WebKit属性）
- display: -webkit-box：和1结合使用，将对象作为弹性伸缩盒子模型显示
- -webkit-box-orient: vertical：和1结合使用 ，设置或检索伸缩盒对象的子元素的排列方式
- overflow: hidden：文本溢出限定的宽度就隐藏内容
- text-overflow: ellipsis：多行文本的情况下，用省略号“…”隐藏溢出范围的文本

```css
<style>
    p {
        width: 400px;
        border-radius: 1px solid red;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<p>
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
</p >
```

可以看到，上述使用了`webkit`的`CSS`属性扩展，所以兼容浏览器范围是`PC`端的`webkit`内核的浏览器，由于移动端大多数是使用`webkit`，所以移动端常用该形式

需要注意的是，如果文本为一段很长的英文或者数字，则需要添加`word-wrap: break-word`属性



##### js + css

css结构如下：

```
1p {
2    position: relative;
3    width: 400px;
4    line-height: 20px;
5    overflow: hidden;
6
7}
8.p-after:after{
9    content: "..."; 
10    position: absolute; 
11    bottom: 0; 
12    right: 0; 
13    padding-left: 40px;
14    background: -webkit-linear-gradient(left, transparent, #fff 55%);
15    background: -moz-linear-gradient(left, transparent, #fff 55%);
16    background: -o-linear-gradient(left, transparent, #fff 55%);
17    background: linear-gradient(to right, transparent, #fff 55%);
18}
```

javascript代码如下：

```
1$(function(){
2 //获取文本的行高，并获取文本的高度，假设我们规定的行数是五行，那么对超过行数的部分进行限制高度，并加上省略号
3   $('p').each(function(i, obj){
4        var lineHeight = parseInt($(this).css("line-height"));
5        var height = parseInt($(this).height());
6        if((height / lineHeight) >3 ){
7            $(this).addClass("p-after")
8            $(this).css("height","60px");
9        }else{
10            $(this).removeClass("p-after");
11        }
12    });
13})
```

### 第9题：CSS中，有哪些方式可以隐藏页面元素？有什么区别?

通过`css`实现隐藏元素方法有如下：

- display:none
- visibility:hidden
- opacity:0
- 设置height、width模型属性为0
- position:absolute
- clip-path

#### display:none

设置元素的`display`为`none`是最常用的隐藏元素的方法

```
.hide {
    display:none;
}
```

将元素设置为`display:none`后，元素在页面上将彻底消失。元素本身占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘。消失后，自身绑定的事件不会触发，也不会有过渡效果

特点：元素不可见，不占据空间，无法响应点击事件

#### visibility:hidden

设置元素的`visibility`为`hidden`也是一种常用的隐藏元素的方法

从页面上仅仅是隐藏该元素，DOM结果均会存在，只是当时在一个不可见的状态，不会触发重排，但是会触发重绘

```
.hidden{
    visibility:hidden
}
```

给人的效果是隐藏了，所以他自身的事件不会触发

特点：元素不可见，占据页面空间，无法响应点击事件

#### opacity:0

`opacity`属性表示元素的透明度，将元素的透明度设置为0后，在我们用户眼中，元素也是隐藏的

不会引发重排，一般情况下也会引发重绘

> 如果利用 animation 动画，对 opacity 做变化（animation会默认触发GPU加速），则只会触发 GPU 层面的 composite，不会触发重绘

```
.transparent {
    opacity:0;
}
```

由于其仍然是存在于页面上的，所以他自身的的事件仍然是可以触发的，但被他遮挡的元素是不能触发其事件的

需要注意的是：其子元素不能设置opacity来达到显示的效果

特点：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件

#### 设置height、width属性为0

将元素的`margin`，`border`，`padding`，`height`和`width`等影响元素盒模型的属性设置成0，如果元素内有子元素或内容，还应该设置其`overflow:hidden`来隐藏其子元素

```
.hiddenBox {
    margin:0;     
    border:0;
    padding:0;
    height:0;
    width:0;
    overflow:hidden;
}
```

特点：元素不可见，不占据页面空间，无法响应点击事件

#### position:absolute

将元素移出可视区域

```
.hide {
   position: absolute;
   top: -9999px;
   left: -9999px;
}
```

特点：元素不可见，不影响页面布局

#### clip-path

通过裁剪的形式

```
.hide {
  clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);
}
```

特点：元素不可见，占据页面空间，无法响应点击事件



|                        | display: none | visibility: hidden | opacity: 0 |
| :--------------------- | :------------ | :----------------- | ---------- |
| 页面中                 | 不存在        | 存在               | 存在       |
| 重排                   | 会            | 不会               | 不会       |
| 重绘                   | 会            | 会                 | 不一定     |
| 自身绑定事件           | 不触发        | 不触发             | 可触发     |
| transition             | 不支持        | 支持               | 支持       |
| 子元素可复原           | 不能          | 能                 | 不能       |
| 被遮挡的元素可触发事件 | 能            | 能                 | 不能       |



### 第10题：CSS3 中 transition 和 animation 的属性分别有哪些？



#### Transition 属性

`transition` 属性用于定义元素在状态改变时从一个样式转换到另一个样式的过渡效果。它包含以下几个属性：

- `transition-property`：指定过渡效果应用的 CSS 属性名称，多个属性可以用逗号分隔。
- `transition-duration`：指定过渡效果的持续时间，单位可以是秒(s)或毫秒(ms)。
- `transition-timing-function`：指定过渡效果的时间曲线，也就是过渡的速度变化函数。
- `transition-delay`：指定过渡效果开始之前的延迟时间，单位可以是秒(s)或毫秒(ms)。

示例：

```
/* 定义一个简单的过渡效果 */
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: width 1s ease-in-out;
}

.box:hover {
  width: 200px;
}
```

在上面的示例中，当鼠标悬停在 `.box` 元素上时，宽度从 100px 过渡到 200px，过渡持续时间为 1 秒，过渡速度为 ease-in-out。



#### Animation 属性

`animation` 属性用于定义复杂的动画效果，可以自定义关键帧（keyframes）来实现更复杂的动画效果。它包含以下几个属性：

- `animation-name`：指定定义动画的关键帧名称。
- `animation-duration`：指定动画的持续时间，单位可以是秒(s)或毫秒(ms)。
- `animation-timing-function`：指定动画的时间曲线，也就是动画的速度变化函数。
- `animation-delay`：指定动画开始之前的延迟时间，单位可以是秒(s)或毫秒(ms)。
- `animation-iteration-count`：指定动画的重复次数，可以使用一个整数值或 `infinite`（表示无限循环）。
- `animation-direction`：指定动画的播放方向，可以是 `normal`（默认），`reverse`（反向播放），`alternate`（正向再反向循环），或 `alternate-reverse`（反向再正向循环）。
- `animation-fill-mode`：指定动画在非运行时的样式，可以是 `none`（默认），`forwards`（保持最后一帧的样式），`backwards`（应用第一帧的样式），或 `both`（同时应用第一帧和最后一帧的样式）。
- `animation-play-state`：指定动画的播放状态，可以是 `running`（默认，动画正在播放）或 `paused`（动画暂停）。

示例：

```
/* 定义一个简单的动画 */
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.box {
  width: 100px;
  height: 100px;
  background-color: red;
  animation: slide-in 1s ease-in-out infinite alternate;
}
```

在上面的示例中，`.box` 元素会应用一个名为 `slide-in` 的动画，从左侧滑动进入容器，动画持续时间为 1 秒，以 ease-in-out 时间曲线播放，无限循环，并且往返运动。



### 第11题：说说对 CSS 预编语言的理解，以及它们之间的区别

CSS 预编语言是一种基于 CSS 的扩展语言，可以更加方便和高效地编写 CSS 代码。其主要作用是为 CSS 提供了变量、函数、嵌套、继承、混合等功能，以及更加易于维护和组织的代码结构。

常见的 CSS 预编语言有 Sass、Less 和 Stylus 等，它们之间的区别如下：

1、语法不同：Sass 和 Less 使用类似于 CSS 的语法规则，而 Stylus 则使用了更加简洁和灵活的缩进式语法。

2、变量定义方式不同：Sass 使用 `$` 符号来定义变量，Less 使用 `@` 符号，Stylus 则直接使用变量名即可。

3、操作符和函数库不同：Sass 和 Less 支持常见的操作符和函数库，例如运算符、颜色处理、字符串处理等，而 Stylus 的函数库更加强大，支持更多的特性和功能。

4、编译方式不同：Sass 和 Less 都需要通过编译器进行编译，可以将预编译的代码转换成标准的 CSS 代码。而 Stylus 则可以直接在浏览器中解析和执行，可以动态调整样式和布局。



### 第12题：::before 和::after 中双冒号和单冒号有什么区别、作用？

在 CSS 中伪类一直用 : 表示，如 :hover, :active 等

伪元素在 CSS1 中已存在，当时语法是用 `:` 表示，如 `:before` 和 `:after`

后来在 CSS3 中修订，伪元素用 `::` 表示，如 `::before` 和 `::after`，以此区分伪元素和伪类

由于低版本 IE 对双冒号不兼容，开发者为了兼容性各浏览器，可以继续使用 `:after` 这种老语法表示伪元素

- 单冒号（:）用于 css3 的伪类
- 双冒号（::）用于 css3 的伪元素

作用：`::before` 和 `::after` 的主要作用是在元素内容前后加上指定内容。

另外，伪类与伪元素的区别有：

- 伪类与伪元素都是用于向选择器加特殊效果
- 伪类与伪元素的本质区别就是是否抽象创造了新元素
- 伪类只要不是互斥可以叠加使用
- 伪元素在一个选择器中只能出现一次，并且只能出现在末尾
- 伪类与伪元素优先级分别与类、标签优先级相同



### 第13题：怎么理解回流跟重绘？什么场景下会触发？

#### 是什么

在`HTML`中，每个元素都可以理解成一个盒子，在浏览器解析过程中，会涉及到回流与重绘：

- 回流：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置
- 重绘：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制

具体的浏览器解析渲染机制如下所示：

- 解析HTML，生成DOM树，解析CSS，生成CSSOM树
- 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
- Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
- Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
- Display:将像素发送给GPU，展示在页面上

在页面初始渲染阶段，回流不可避免的触发，可以理解成页面一开始是空白的元素，后面添加了新的元素使页面布局发生改变

当我们对 `DOM` 的修改引发了 `DOM `几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性，然后再将计算的结果绘制出来

当我们对 `DOM `的修改导致了样式的变化（`color`或`background-color`），却并未影响其几何属性时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式，这里就仅仅触发了重绘

#### 如何触发

要想减少回流和重绘的次数，首先要了解回流和重绘是如何触发的

##### 回流触发时机

回流这一阶段主要是计算节点的位置和几何信息，那么当页面布局和几何信息发生变化的时候，就需要回流，如下面情况：

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
- 页面一开始渲染的时候（这避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

还有一些容易被忽略的操作：获取一些特定属性的值

> offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight

这些属性有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流

除此还包括`getComputedStyle `方法，原理是一样的

##### 重绘触发时机

触发回流一定会触发重绘

可以把页面理解为一个黑板，黑板上有一朵画好的小花。现在我们要把这朵从左边移到了右边，那我们要先确定好右边的具体位置，画好形状（回流），再画上它原有的颜色（重绘）

除此之外还有一些其他引起重绘行为：

- 颜色的修改
- 文本方向的修改
- 阴影的修改

##### 浏览器优化机制

由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列

当你获取布局信息的操作的时候，会强制队列刷新，包括前面讲到的`offsetTop`等方法都会返回最新的数据

因此浏览器不得不清空队列，触发回流重绘来返回正确的值



#### 如何减少

我们了解了如何触发回流和重绘的场景，下面给出避免回流的经验：

- 如果想设定元素的样式，通过改变元素的 `class` 类名 (尽可能在 DOM 树的最里层)
- 避免设置多项内联样式
- 应用元素的动画，使用 `position` 属性的 `fixed` 值或 `absolute` 值(如前文示例所提)
- 避免使用 `table` 布局，`table` 中每个元素的大小以及内容的改动，都会导致整个 `table` 的重新计算
- 对于那些复杂的动画，对其设置 `position: fixed/absolute`，尽可能地使元素脱离文档流，从而减少对其他元素的影响
- 使用css3硬件加速，可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘
- 避免使用 CSS 的 `JavaScript` 表达式

在使用 `JavaScript` 动态插入多个节点时, 可以使用`DocumentFragment`. 创建后一次插入. 就能避免多次的渲染性能

但有时候，我们会无可避免地进行回流或者重绘，我们可以更好使用它们

例如，多次修改一个把元素布局的时候，我们很可能会如下操作

```
const el = document.getElementById('el')
for(let i=0;i<10;i++) {
    el.style.top  = el.offsetTop  + 10 + "px";
    el.style.left = el.offsetLeft + 10 + "px";
}
```

每次循环都需要获取多次`offset`属性，比较糟糕，可以使用变量的形式缓存起来，待计算完毕再提交给浏览器发出重计算请求

```
// 缓存offsetLeft与offsetTop的值
const el = document.getElementById('el') 
let offLeft = el.offsetLeft, offTop = el.offsetTop

// 在JS层面进行计算
for(let i=0;i<10;i++) {
  offLeft += 10
  offTop  += 10
}

// 一次性将计算结果应用到DOM上
el.style.left = offLeft + "px"
el.style.top = offTop  + "px"
```

我们还可避免改变样式，使用类名去合并样式

```
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```

使用类名去合并样式

```
<style>
    .basic_style {
        width: 100px;
        height: 200px;
        border: 10px solid red;
        color: red;
    }
</style>
<script>
    const container = document.getElementById('container')
    container.classList.add('basic_style')
</script>
```

前者每次单独操作，都去触发一次渲染树更改（新浏览器不会），

都去触发一次渲染树更改，从而导致相应的回流与重绘过程

合并之后，等于我们将所有的更改一次性发出

我们还可以通过通过设置元素属性`display: none`，将其从页面上去掉，然后再进行后续操作，这些后续操作也不会触发回流与重绘，这个过程称为离线操作

```
const container = document.getElementById('container')
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
```

离线操作后

```
let container = document.getElementById('container')
container.style.display = 'none'
container.style.width = '100px'
container.style.height = '200px'
container.style.border = '10px solid red'
container.style.color = 'red'
...（省略了许多类似的后续操作）
container.style.display = 'block'
```



### 第14题：z-index属性在什么情况下会失效？

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index值越大就越是在上层。z-index元素的position属性需要是relative，absolute或是fixed。

z-index属性在下列情况下会失效：

- 父元素position为relative时，子元素的z-index失效。解决：父元素position改为absolute或static；
- 元素没有设置position属性为非static属性。解决：设置该元素的position属性为relative，absolute或是fixed中的一种；
- 元素在设置z-index的同时还设置了float浮动。解决：float去除，改为`display：inline-block`；

- 在手机端 `iOS 13` 系统中，`-webkit-overflow-scrolling:touch` 也会使 `z-index` 失效，将 `touch` 换成 `unset`





### 第15题：使用原生js实现以下效果：点击容器内的图标，图标边框变成border:1px solid red，点击空白处重置

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>


  <div id="container">
    <img src="icon1.png" class="icon" alt="Icon 1">
    <img src="icon2.png" class="icon" alt="Icon 2">
    <img src="icon2.png" class="icon" alt="Icon 3">
    <img src="icon2.png" class="icon" alt="Icon 4">
    <img src="icon2.png" class="icon" alt="Icon 5">
  </div>
  
  <script>
    // 获取容器元素
    const container = document.getElementById('container');
    // 获取所有图标元素
    const icons = document.querySelectorAll('.icon');

    // 为容器添加点击事件监听器
    container.addEventListener('click', function (e) {
      // 遍历所有图标
      icons.forEach(icon => {
        // 如果点击的目标是图标之一
        if (e.target === icon) {
          // 改变该图标的边框样式
          icon.style.border = '1px solid red';
        } else {
          // 否则，重置图标的边框样式
          icon.style.border = 'none';
        }
      });
    });

    // 为整个文档添加点击事件监听器来重置图标边框
    document.addEventListener('click', function (e) {
      // 如果点击的不是图标（即点击的是空白处）
      if (!e.target.classList.contains('icon')) {
        // 重置所有图标的边框样式
        icons.forEach(icon => {
          icon.style.border = 'none';
        });
      }
    });


  </script>


</body>

</html>
```



### 第16题：position: fixed 一定是相对于浏览器窗口进行定位吗？

不一定。

`position:fixed;`的元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置，元素的位置在屏幕滚动时不会改变。`fixed` 属性会创建新的层叠上下文。

当元素祖先的 `transform`, `perspective` 或 `filter` 属性`非 none` 时，容器由视口改为该祖先。



```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .transformed-ancestor {
      transform: rotate(15deg);
      /* 应用变换 */
      border: 1px solid black;
      /* 为了可视化边界 */
      margin-top: 100px;
      margin-left: 50px;
      width: 200px;
      height: 200px;
    }

    .fixed-element {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 100px;
      height: 100px;
      background-color: red;
    }
  </style>
</head>

<body>
  <div class="transformed-ancestor">
    <div class="fixed-element">固定定位元素</div>
  </div>
</body>

</html>
```



![image-20231219153031388](https://qn.huat.xyz/mac/202312191530548.png)

### 第17题：css选择器有哪些？优先级分别是什么？哪些属性可以继承？

#### 选择器

CSS选择器是CSS规则的第一部分

它是元素和其他部分组合起来告诉浏览器哪个HTML元素应当是被选为应用规则中的CSS属性值的方式

选择器所选择的元素，叫做“选择器的对象”

我们从一个`Html`结构开始

```
<div id="box">
        <div class="one">
            <p class="one_1"></p>
            <p class="one_1"></p>
        </div>
        <div class="two"></div>
        <div class="two"></div>
        <div class="two"></div>
</div>
```

关于`css`属性选择器常用的有：

```
- id选择器（#box），选择id为box的元素
- 类选择器（.one），选择类名为one的所有元素
- 标签选择器（div），选择标签为div的所有元素
- 后代选择器（#box div），选择id为box元素内部所有的div元素
- 子选择器（.one>one_1），选择父元素为.one的所有.one_1的元素
- 相邻同胞选择器（.one+.two），选择紧接在.one之后的所有.two元素
- 群组选择器（div,p），选择div、p的所有元素
```

还有一些使用频率相对没那么多的选择器：

- 伪类选择器

```
1:link ：选择未被访问的链接
2:visited：选取已被访问的链接
3:active：选择活动链接
4:hover ：鼠标指针浮动在上面的元素
5:focus ：选择具有焦点的
6:first-child：父元素的首个子元素
```

- 伪元素选择器

```
:link ：选择未被访问的链接
:visited：选取已被访问的链接
:active：选择活动链接
:hover ：鼠标指针浮动在上面的元素
:focus ：选择具有焦点的
:first-child：父元素的首个子元素
```

- 属性选择器

```
[attribute] 选择带有attribute属性的元素
[attribute=value] 选择所有使用attribute=value的元素
[attribute~=value] 选择attribute属性包含value的元素
[attribute|=value]：选择attribute属性以value开头的元素
```

在`CSS3`中新增的选择器有如下：

- 层次选择器（p~ul），选择前面有p元素的每个ul元素
- 伪类选择器

```
:first-of-type 父元素的首个元素
:last-of-type 父元素的最后一个元素
:only-of-type 父元素的特定类型的唯一子元素
:only-child 父元素中唯一子元素
:nth-child(n) 选择父元素中第N个子元素
:nth-last-of-type(n) 选择父元素中第N个子元素，从后往前
:last-child 父元素的最后一个元素
:root 设置HTML文档
:empty 指定空的元素
:enabled 选择被禁用元素
:disabled 选择被禁用元素
:checked 选择选中的元素
:not(selector) 选择非 <selector> 元素的所有元素
```

- 属性选择器

```
[attribute*=value]：选择attribute属性值包含value的所有元素
[attribute^=value]：选择attribute属性开头为value的所有元素
[attribute$=value]：选择attribute属性结尾为value的所有元素
```

#### 优先级

相信大家对`CSS`选择器的优先级都不陌生：

> 内联 > ID选择器 > 类选择器 > 标签选择器

到具体的计算层⾯，优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

- 如果存在内联样式，那么 A = 1, 否则 A = 0
- B的值等于 ID选择器出现的次数
- C的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数
- D 的值等于 标签选择器 和 伪元素 出现的总次数

这里举个例子：

```
#nav-global > ul > li > a.nav-link
```

套用上面的算法，依次求出 `A` `B` `C` `D` 的值：

- 因为没有内联样式 ，所以 A = 0
- ID选择器总共出现了1次， B = 1
- 类选择器出现了1次， 属性选择器出现了0次，伪类选择器出现0次，所以 C = (1 + 0 + 0) = 1
- 标签选择器出现了3次， 伪元素出现了0次，所以 D = (3 + 0) = 3

上面算出的`A` 、 `B`、`C`、`D` 可以简记作：`(0, 1, 1, 3)`

知道了优先级是如何计算之后，就来看看比较规则：

- 从左往右依次进行比较 ，较大者优先级更高
- 如果相等，则继续往右移动一位进行比较
- 如果4位全部相等，则后面的会覆盖前面的

经过上面的优先级计算规则，我们知道内联样式的优先级最高，如果外部样式需要覆盖内联样式，就需要使用`!important`

#### 继承属性

在`css`中，继承是指的是给父元素设置一些属性，后代元素会自动拥有这些属性 关于继承属性，可以分成：

- 字体系列属性

```
font:组合字体
font-family:规定元素的字体系列
font-weight:设置字体的粗细
font-size:设置字体的尺寸
font-style:定义字体的风格
font-variant:偏大或偏小的字体
```

- 文本系列属性

```
text-indent：文本缩进
text-align：文本水平对齐
line-height：行高
word-spacing：增加或减少单词间的空白
letter-spacing：增加或减少字符间的空白
text-transform：控制文本大小写
direction：规定文本的书写方向
color：文本颜色
```

- 元素可见性

```
visibility
```

- 表格布局属性

```
caption-side：定位表格标题位置
border-collapse：合并表格边框
border-spacing：设置相邻单元格的边框间的距离
empty-cells：单元格的边框的出现与消失
table-layout：表格的宽度由什么决定
```

- 列表属性

```
list-style-type：文字前面的小点点样式
list-style-position：小点点位置
list-style：以上的属性可通过这属性集合
```

- 引用

```
quotes：设置嵌套引用的引号类型
```

- 光标属性

```
cursor：箭头可以变成需要的形状
```

继承中比较特殊的几点：

- a 标签的字体颜色不能被继承
- h1-h6标签字体的大下也是不能被继承的

#### 无继承的属性

- display
- 文本属性：vertical-align、text-decoration
- 盒子模型的属性：宽度、高度、内外边距、边框等
- 背景属性：背景图片、颜色、位置等
- 定位属性：浮动、清除浮动、定位position等
- 生成内容属性：content、counter-reset、counter-increment
- 轮廓样式属性：outline-style、outline-width、outline-color、outline
- 页面样式属性：size、page-break-before、page-break-after



### 第18题：单行文本怎么实现两端对齐？

说起两端对齐，大家首先想到的可能是 `text-align: justify;`，但justify对最后一行无效。

通常这样的排版对整段文字是极好的，我们并不希望当最后一行只有两个字时也两端对齐，毕竟这是不便于阅读的，那么当我们只有一行文本，但要实现单行文本两端对齐怎么解决？

#### 方法一：添加一行

根据justify对最后一行无效，我们可以新增一行，使该行文本不是最后一行，实现如下：

```
//html
<div class="item">
    <span class="label" >{{item.label}}</span>：
    <span class="value">{{item.value}}</span>
</div>

//scss
.item {
    height: 32px;
    line-height: 32px;
    margin-bottom: 8px;
    .label {
        display: inline-block;
        height: 100%;
        width: 100px;
        text-align: justify;
        vertical-align: top;
        &::after {
            display: inline-block;
            width: 100%;
            content: '';
            height: 0;
        }
    }
    .value {
        padding-right: 10px;
    }
}
```



#### 方法二： text-align-last

text-align-last，该属性定义的是一段文本中最后一行在被强制换行之前的对齐规则。

```
//scss
.item {
    margin-bottom: 8px;
    .label {
        display: inline-block;
        height: 100%;
        min-width: 100px;
        text-align: justify;
        text-align-last: justify;
    }
    .value {
        padding-right: 10px;
    }
}
```



### 第19题：使用css实现一个无限循环动画

想要实现CSS动画的无限循环，其实主要就是要使用`animation-iteration-count`这个属性，将其设置为`infinite`，动画就会一直循环播放

```
<image class="anima" mode="widthFix" @click="nav" src="@/static/1_btn.png"></image>

.anima {
  animation-name: likes; // 动画名称
  animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
  animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
  animation-delay: 0s; // 动画延迟时间
  animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
  animation-duration: 1s; // 动画完成时间
}

@keyframes likes {
  0%{
  	transform: scale(1);
  }
  25%{
  	transform: scale(0.9);
  }
  50%{
  	transform: scale(0.85);
  }
  75%{
  	transform: scale(0.9);
  }
  100%{
  	transform: scale(1);
  }
}
```



### 第20题：怎么触发BFC，BFC有什么应用场景？

#### 文档流

在介绍BFC之前，需要先给大家介绍一下文档流。

我们常说的文档流其实分为`定位流`、`浮动流`、`普通流`三种。

##### 绝对定位(Absolute positioning)

如果元素的属性 `position` 为 `absolute` 或 `fixed`，它就是一个绝对定位元素。

在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

它的定位相对于它的包含块，相关CSS属性：`top`、`bottom`、`left`、`right`；

对于 `position: absolute`，元素定位将相对于上级元素中最近的一个`relative、fixed、absolute`，如果没有则相对于body；

对于 `position:fixed`，正常来说是相对于浏览器窗口定位的，但是当**元素祖先的 `transform` 属性非 `none` 时，会相对于该祖先进行定位**。

##### 浮动 (float)

在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

##### 普通流 (normal flow)

普通流其实就是指BFC中的FC。FC(`Formatting Context`)，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。

在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行。块级元素则会被渲染为完整的一个新行。

除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

#### BFC 概念

先看下MDN上关于BFC的定义：

> 块格式化上下文（`Block Formatting Context`，`BFC`） 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

具有 `BFC` 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 `BFC` 具有普通容器所没有的一些特性。通俗一点来讲，可以把 `BFC` 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

除了 BFC，还有：

- `IFC`（行级格式化上下文）- `inline` 内联
- `GFC`（网格布局格式化上下文）- `display: grid`
- `FFC`（自适应格式化上下文）- `display: flex`或`display: inline-flex`

**注意**：同一个元素不能同时存在于两个 `BFC` 中。

#### BFC的触发方式

MDN上对于[BFC的触发条件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)写的很多，总结一下常见的触发方式有（只需要满足一个条件即可触发 BFC 的特性）：

- 根元素，即 `<html>`
- 浮动元素：`float` 值为 `left` 、`right`
- `overflow` 值不为 `visible`，即为 `auto`、`scroll`、`hidden`
- `display` 值为 `inline-block`、`table-cell`、`table-caption`、`table`、`inline-table`、`flex`、`inline-flex`、`grid`、`inline-grid`
- 绝对定位元素：`position` 值为 `absolute`、`fixed`

#### BFC的特性

- BFC 是页面上的一个独立容器，容器里面的子元素不会影响外面的元素。
- BFC 内部的块级盒会在垂直方向上一个接一个排列
- 同一 BFC 下的相邻块级元素可能发生外边距折叠，创建新的 BFC 可以避免外边距折叠
- 每个元素的外边距盒（`margin box`）的左边与包含块边框盒（`border box`）的左边相接触（从右向左的格式的话，则相反），即使存在浮动
- 浮动盒的区域不会和 BFC 重叠
- 计算 BFC 的高度时，浮动元素也会参与计算

#### 应用

BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。我们可以利用BFC的这个特性来做很多事。

#### 自适应两列布局

左列浮动（定宽或不定宽都可以），给右列开启 BFC。

```
<div>
    <div class="left">浮动元素，无固定宽度</div>
    <div class="right">自适应</div>
</div>

* {
    margin: 0;
    padding: 0;
}
.left {
    float: left;
    height: 200px;
    margin-right: 10px;
    background-color: red;
}
.right {
    overflow: hidden;
    height: 200px;
    background-color: yellow;
}
```

效果： 

![img](https://qn.huat.xyz/mac/202312182328876.image)



- 将左列设为左浮动，将自身高度塌陷，使得其它块级元素可以和它占据同一行的位置。
- 右列为 div 块级元素，利用其自身的流特性占满整行。
- 右列设置overflow: hidden,触发 BFC 特性，使其自身与左列的浮动元素隔离开，不占满整行。

这即是上面说的 BFC 的特性之一：**浮动盒的区域不会和 BFC 重叠**

### 防止外边距（margin）重叠

兄弟元素之间的外边距重叠

```
<div>
    <div class="child1"></div>
    <div class="child2"></div>
</div>

* {
    margin: 0;
    padding: 0;
}
.child1 {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    background-color: red;
}
.child2 {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    background-color: green;
}
```

效果： 

![img](https://qn.huat.xyz/mac/202312182328076.image)



两个块级元素，红色 div 距离底部 10px，绿色 div 距离顶部 20px，按道理应该两个块级元素相距 30px 才对，但实际却是取距离较大的一个，即 20px。

> 块级元素的上外边距和下外边距有时会合并（或折叠）为一个外边距，其大小取其中的较大者，这种行为称为外边距折叠（重叠），注意这个是发生在属于同一 BFC 下的块级元素之间

根据 BFC 特性，创建一个新的 BFC 就不会发生 margin 折叠了。比如我们在他们两个 div 外层再包裹一层容器，加属性 `overflow: hidden`，触发 BFC，那么两个 div 就不属于同个 BFC 了。

```
<div>
    <div class="parent">
        <div class="child1"></div>
    </div>
    <div class="parent">
        <div class="child2"></div>
    </div>
</div>

.parent {
    overflow: hidden;
}

/* ... */
```



![img](https://qn.huat.xyz/mac/202312182328187.image)



这个关于兄弟元素外边距叠加的问题，除了触发 BFC 也有其他方案，比如你统一只用上边距或下边距，就不会有上面的问题。

### 父子元素的外边距重叠

这种情况存在父元素与其第一个或最后一个子元素之间（嵌套元素）。

如果在父元素与其第一个/最后一个子元素之间不存在边框、内边距、行内内容，也没有创建块格式化上下文、或者清除浮动将两者的外边距 分开，此时子元素的外边距会“溢出”到父元素的外面。

```
<div id="parent">
  <div id="child"></div>
</div>

* {
    margin: 0;
    padding: 0;
}
#parent {
    width: 200px;
    height: 200px;
    background-color: green;
    margin-top: 20px;
}
#child {
    width: 100px;
    height: 100px;
    background-color: red;
    margin-top: 30px;
}
```



![img](https://qn.huat.xyz/mac/202312182328282.image)



如上图，红色的 div 在绿色的 div 内部，且设置了 `margin-top` 为 30px，但我们发现红色 div 的顶部与绿色 div 顶部重合，并没有距离顶部 30px，而是溢出到父元素的外面计算。即本来父元素距离顶部只有 20px，被子元素溢出影响，外边距重叠，取较大的值，则距离顶部 30px。

解决办法：

- 给父元素触发 BFC（如添加overflow: hidden）
- 给父元素添加 border
- 给父元素添加 padding

这样就能实现我们期望的效果了： 

![img](https://qn.huat.xyz/mac/202312182328434.image)



### 清除浮动解决令父元素高度坍塌的问题

当容器内子元素设置浮动时，脱离了文档流，容器中总父元素高度只有边框部分高度。

```
<div class="parent">
  <div class="child"></div>
</div>

* {
    margin: 0;
    padding: 0;
}
.parent {
    border: 4px solid red;
}
.child {
    float: left;
    width: 200px;
    height: 200px;
    background-color: blue;
}
```



![img](https://qn.huat.xyz/mac/202312182328671.image)



解决办法：给父元素触发 BFC，使其有 BFC 特性：**计算 BFC 的高度时，浮动元素也会参与计算**

```
.parent {
    overflow: hidden;
    border: 4px solid red;
}
```



![img](https://qn.huat.xyz/mac/202312182328797.image)



上面我们都是用的 `overflow: hidden` 触发 BFC，因为确实常用，但是触发 BFC 也不止是只有这一种方法。

如上面写的所示，可以设置`float: left;`，`float: right;`，`display: inline-block;`，`overflow: auto;`，`display: flex;`，`display: table;`，`position` 为 `absolute` 或 `fixed` 等等，这些都可以触发，不过父元素宽度表现不一定相同，但父元素高度都被撑出来了。

当然实际运用可不是随便挑一个走，还是根据场景选择。