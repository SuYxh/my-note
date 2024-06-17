### 函数

**CSS函数**指复杂类型或调用特殊处理的组件值类型。为单调的属性声明增加了更强大的点缀，让简单的`CSS`变得更有艺术感。其语法也很简单，形式为`function(params)`，与`JS`的函数调用一样。在`CSS代码`中，只要带有`()`的属性值都是函数。

### 分类

很多同学用惯的函数只有`url()`、`rgb()`和`rgba()`，稍微深入一点的也只有`calc()`、`cubic-bezier()`和`linear-gradient()`。

从`W3C标准`中查阅可知目前总共存在`86`个可用函数(不包括那些实验性的函数)，一点也不比属性少。根据惯例，我又对其进行了合理的记忆分类，暂未得到很多浏览器支持且在[Caniuse](https://link.juejin.cn/?target=https%3A%2F%2Fwww.caniuse.com "https://www.caniuse.com")中未收录的函数就不在分类范围中。

> 颜色函数

-   **rgb()**：RGB色彩模式
-   **rgba()**：RGBA色彩模式
-   **hsl()**：HSL色彩模式
-   **hsla()**：HSLA色彩模式
-   **color()**：色彩模式，基于当前颜色衍生出其他颜色

> 属性函数

-   **attr()**：属性
-   **var()**：变量

> 数学函数

-   **clamp()**：区间范围值
-   **counter()**：计数器
-   **counters()**：嵌套计数器
-   **calc()**：计算
-   **max()**：最大值
-   **min()**：最小值

> 背景函数

-   **url()**：图像路径
-   **element()**：图像映射，渲染指定元素为图像
-   **image-set()**：图像集合，根据屏幕分辨率匹配图像
-   **linear-gradient()**：线性渐变
-   **radial-gradient()**：径向渐变
-   **conic-gradient()**：锥形渐变
-   **repeating-linear-gradient()**：重复线性渐变
-   **repeating-radial-gradient()**：重复径向渐变
-   **repeating-conic-gradient()**：重复锥形渐变

> 滤镜函数

-   **blur()**：模糊
-   **brightness()**：亮度
-   **contrast()**：对比度
-   **drop-shadow()**：阴影
-   **grayscale()**：灰度
-   **hue-rotate()**：色相旋转
-   **invert()**：反相
-   **opacity()**：透明度
-   **saturate()**：饱和度
-   **sepia()**：褐色

> 图形函数

-   **circle()**：圆形
-   **ellipse()**：椭圆形
-   **inset()**：矩形
-   **path()**：路径
-   **polygon()**：多边行

> 变换函数

-   **matrix()**：矩阵
-   **matrix3d()**：3D矩阵
-   **perspective()**：视距
-   **rotate()**：旋转
-   **rotate3d()**：3D旋转
-   **rotateX()**：X轴旋转
-   **rotateY()**：Y轴旋转
-   **rotateZ()**：Z轴旋转
-   **scale()**：缩放
-   **scale3d()**：3D缩放
-   **scaleX()**：X轴缩放
-   **scaleY()**：Y轴缩放
-   **scaleZ()**：Z轴缩放
-   **skew()**：扭曲
-   **skewX()**：X轴扭曲
-   **skewY()**：Y轴扭曲
-   **translate()**：位移
-   **translate3d()**：3D位移
-   **translateX()**：X轴位移
-   **translateY()**：Y轴位移
-   **translateZ()**：Z轴位移

> 缓动函数

-   **cubic-bezier()**：贝塞尔曲线
-   **steps()**：逐帧

___

分类完毕发现函数很多，但我觉得很多都用不上或不实用，所以我会列举一些我认为在项目中特别有用的函数！

### 颜色函数

颜色函数是最常见函数之一，可用在`border-color`、`outline-color`、`background-color`、`box-shadow`、`color`、`caret-color`等属性中。

##### RGB色彩模式

将文本声明为白色，普通声明可用`color:white`或`color:#fff`。有了颜色函数后，可用`rgb()/rgba()`声明。将原来的声明改成`color:rgb(255,255,255)`或`rgba(255,255,255,1)`。

`rgb()`的`R`表示**红色**，`G`表示**绿色**，`B`表示**蓝色**，而`rgba()`多出来的`A`表示透明度。`A`与`opacity`声明的透明度不同，`rgba()`声明的透明度不会应用到子节点中，而`opacity`声明的透明度会应用到子节点中。

建议在声明普通颜色时使用**HEX色彩模式(16进制色彩模式)**，若颜色存在透明度的需求，可用`rgba()`，但`rgba()`的参数不太友好，得把`HEX`转换为`RGB`。

##### HSL色彩模式

**HSL色彩模式**是一种工业界的色彩标准，因为它能涵盖到人类视觉所能感知的所有颜色，所以在工业界广泛应用。

`hsl()/hsla()`与上述两个颜色函数在`CSS`与`Scss`中的用法相似。H表示**色相**，S表示**饱和度**，L表示**亮度**，A表示**透明度**。

**色相**又称**色盘**，指色彩的基本属性。就是常说的颜色名称，例如红色、绿色等，此时应想起画家那个装满不同颜料的色盘吧。色相的单位是`deg`，值的范围在`0~360deg`，若超过`360deg`则相当绕N圈再计算剩余的值。`0deg`与`360deg`为红色，`120deg`为绿色，`240deg`为蓝色。

**饱和度**指色彩的纯度。值越高色彩越纯，值越低色彩越灰。饱和度的单位是`%`，值的范围在`0~100%`。`0%`为灰色，`100%`为全色。

**亮度**指色彩的发光强度。值越高色彩越亮，值越低色彩越暗。亮度的单位是`%`，值的范围在`0~100%`。`0%`为最暗，`100%`为最亮。

饱和度与亮度的单位即使是`0`也得写成`0%`，否则整个函数都会失效。

**HSL色彩模式**其实是一种将`RGB色彩模式`中的点在圆柱坐标系中标记出来的表示法，该表示法试图做到比基于笛卡尔坐标系的几何结构`RGB`更直观。

### 属性函数

##### attr()

`attr(val)`用于返回节点属性，通常结合伪元素的`content`使用，是一个很优雅的函数。兼容性好不说了，还极其低调，导致很多同学都以为它是一个`CSS3特性`。

```html
<h1 class="Hello" data-name="dahuang"></h1>
```

```scss
h1 {
	&::before {
		content: attr(class);
	}
	&::after {
		content: attr(data-name);
	}
}
```

`::before`通过`attr()`获取`<h1 class>`的属性值并赋值到`content`中，`::after`通过`attr()`获取`<h1 data-name>`的属性值并赋值到`content`中，最终`<h1>`的`innerText`是`Hello dahuang`。

`attr()`可灵活结合选择器返回节点属性并赋值到伪元素的`content`中，通过`attr()`结合`:hover`与`:empty`抓取节点需显示的内容是一个很不错的技巧。

-   当`按钮1`触发悬浮状态`:hover`时，通过`attr()`获取节点的`data-msg`并赋值到`::after`的`content`中
-   当`按钮2`内容为空`:empty`时，通过`attr()`获取节点的`href`并赋值到`::after`的`content`中

![节点属性](https://qn.huat.xyz/mac/202406141003891.awebp)

```html
<a class="hover-tips btn-1" href="https://www.baidu.com" data-msg="Hello World">提示框</a>
<a class="hover-tips btn-2" href="https://www.baidu.com"></a>
```

```scss
.hover-tips {
	position: relative;
	padding: 0 20px;
	border-radius: 10px;
	height: 40px;
	background-color: #66f;
	line-height: 40px;
	color: #fff;
	& + .hover-tips {
		margin-top: 10px;
	}
	&.btn-1 {
		&::after {
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 5px;
			width: 100%;
			height: 100%;
			background-color: rgba(#000, .5);
			opacity: 0;
			text-align: center;
			font-size: 12px;
			content: attr(data-msg);
			transition: all 300ms;
		}
		&:hover::after {
			left: calc(100% + 20px);
			opacity: 1;
		}
	}
	&.btn-2:empty::after {
		content: attr(href);
	}
}
```

##### var()

`var()`用于引用自定义属性，是`CSS变量`的组成之一

### 数学函数

##### calc()

`calc(exp)`用于动态计算单位，`数值`、`长度`、`角度`、`时间`和`百分比`都能作为参数。因为执行数学表达式返回运算后的计算值，可减少大量人工计算甚至无需人工计算，是最有用的函数之一。

`calc()`饥不择食，所有计量单位都能作为参数参与整个动态计算。

-   **数值**：`整数`、`浮点数`
-   **长度**：`px`、`em`、`rem`、`vw`、`vh`等
-   **角度**：`deg`、`turn`
-   **时间**：`s`、`ms`
-   **百分比**：`%`

`calc()`虽然好用，但新手难免会遇到一些坑，谨记以下特性，相信就能玩转`calc()`了。

-   四则运算：只能使用`+`、`-`、`*`、`/`作为运算符号
-   运算顺序：遵循加减乘除运算顺序，可用`()`提升运算等级
-   符号连接：每个运算符号必须使用`空格`间隔
-   混合计算：可混合不同计量单位动态计算

第三点尤为重要，若未能遵守，浏览器直接忽略该属性。



在单页面应用中有遇到因为有滚动条或无滚动条而导致网页路由在跳转时发生向左或向右的抖动吗？这让强迫症患者很不舒服，此时可用`calc()`巧妙解决该问题。

```css
.elem {
	padding-right: calc(100vw - 100%);
}
```

`100vw`是视窗宽度，`100%`是内容宽度，那`100vw - 100%`就是滚动条宽度了，声明`padding-right`用于保留滚动条出现的位置，这样滚动条出不出现都不会让网页抖动了。

大部分浏览器的滚动条默认宽度是`17px`，那声明`padding-right:17px`不就行了吗？因为还有很少浏览器的滚动条默认宽度不是`17px`，另外`Chrome系列浏览器`都可自定义滚动条宽度，这是无法直接知道的，因此声明`padding-right:calc(100vw - 100%)`动态计算浏览器的滚动条默认宽度是最适合不过的。



##### clamp()/max()/min()

`clamp()/max()/min()`与`calc()`类似，所有计量单位都能作为参数参与整个动态计算，这些函数与`calc()`可互相嵌套使用。

```css
.elem { width: calc(min(1200px, 100%) / 5); }
```

`max(...val)`用于返回最大值，`min(...val)`用于返回最小值，支持一个或多个值或数学表达式，值间使用`,`间隔。虽然`max()`名称是最大值，但实际上是用于限制最大值；`min()`名称是最小值，但实际上是用于限制最小值。

在响应式开发中，通常会声明内容宽度`100%`自适应且最大值不超过`1200px`。

```css
.elem { width: 100%; max-width: 1200px; }
```

若用`min()`表示，只需一行声明。

```css
.elem { width: min(1200px, 100%); }
```

`clamp(min, val, max)`用于返回区间范围值。`val`在`min~max`则返回`val`，`val`小于`min`则返回`min`，`val`大于`max`则返回`max`，妥妥的响应式函数。

`clamp(min, val, max)`等价于`max(min, min(val, max))`。`clamp()`可用于响应式开发，很好地履行响应式的义务，让组件属性在指定条件中使用指定值。

```css
.elem { width: clamp(100px, 25vw, 300px); }
```

节点宽度声明在`100~300px`，随着视窗宽度变化而变化。若视窗宽度大于`300px`则节点宽度一直保持`300px`，若视窗宽度在`100~300px`则节点宽度为`25vw`转化后的`px`，若视窗宽度小于`100px`则节点宽度一直保持`100px`。

### 图形函数

`clip-path`用于创建一个只有节点的部分区域可显示的剪切区域。裁剪完毕，内部区域显示，外部区域隐藏。一般应用在`SVG`中，但也可当作裁剪效果用于节点中。当节点使用`clip-path`声明裁剪路径时，可用这五个图形函数裁剪区域，除了`path()`其他四个函数的兼容性还不错。

以下使用`circle()`、`ellipse()`和`polygon()`绘制一些常见图形。

![各种图形](https://qn.huat.xyz/mac/202406141006866.awebp)

```html
<ul class="figure-box" style="--count: 12;">
	<li class="star" style="--index: 0;"></li>
	<li class="ellipse" style="--index: 1;"></li>
	<li class="circle" style="--index: 2;"></li>
	<li class="triangle" style="--index: 3;"></li>
	<li class="rhombus" style="--index: 4;"></li>
	<li class="trapezoid" style="--index: 5;"></li>
	<li class="parallelogram" style="--index: 6;"></li>
	<li class="pentagon" style="--index: 7;"></li>
	<li class="left-arrow" style="--index: 8;"></li>
	<li class="right-arrow" style="--index: 9;"></li>
	<li class="close" style="--index: 10;"></li>
	<li class="message" style="--index: 11;"></li>
</ul>
```

```scss
.figure-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	max-width: 720px;
	li {
		--angle: calc(var(--index) / var(--count) * 1turn);
		margin: 10px;
		width: 100px;
		height: 100px;
		background-color: #3c9;
		filter: hue-rotate(var(--angle));
		&.star {
			clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
		}
		&.ellipse {
			clip-path: ellipse(40% 50% at 50% 50%);
		}
		&.circle {
			clip-path: circle(50% at 50% 50%);
		}
		&.triangle {
			clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		}
		&.rhombus {
			clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
		}
		&.trapezoid {
			clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
		}
		&.parallelogram {
			clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
		}
		&.pentagon {
			clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
		}
		&.left-arrow {
			clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
		}
		&.right-arrow {
			clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
		}
		&.close {
			clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
		}
		&.message {
			clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
		}
	}
}
```

整体来说在指定坐标中标记连线的点即可。推荐一个裁剪路径的网站[Clippy](https://bennettfeely.com/clippy)，轻松绘制各种由线条组成的裁剪区域。`clip-path`有一个明显的限制，就是只能裁剪折线形成的图形，不能裁剪曲线形成的图形。

