### 变量

**CSS变量**又称**CSS自定义属性**，指可在整个文档中重复使用的值。它由自定义属性`--var`与函数`var()`组成，`var()`用于引用自定义属性。谈到为何会在`CSS`中使用变量，以下使用一个示例讲述。

```css
/* 不使用变量 */
.title {
	background-color: red;
}
.desc {
	background-color: red;
}

/* 使用变量 */
:root {
	--bg-color: red;
}
.title {
	background-color: var(--bg-color);
}
.desc {
	background-color: var(--bg-color);
}
```

这也是**颜色主题切换**的一种解决方案，好处在于只需维护一套`CSS代码`。

```html
<button id="red-theme-bt">切换红色主题</button>
<button id="blue-theme-bt">切换蓝色主题</button>
<button id="green-theme-bt">切换绿色主题</button>
```

```js
["red", "blue", "green"].forEach(v => {
	const btn = document.getElementById(`${v}-theme-btn`);
	btn.addEventListener("click", () => document.body.style.setProperty("--bg-color", v));
});
```

`CSS`使用变量有如下好处。

-   减少样式代码的重复性
-   增加样式代码的扩展性
-   提高样式代码的灵活性
-   增加一种`CSS`与`JS`的通讯方式
-   无需深层遍历`DOM`改变某个样式

可能有些同学会问，`Scss`与`Less`早就实现变量该特性，何必再多此一举？可是细想下，变量对比`Scss变量`与`Less变量`又有它的过人之处。

-   浏览器原生特性，无需经过任何转译可直接运行
-   `DOM对象`一员，极大便利`CSS`与`JS`间的联系

### 认识

>  阮一峰老师的教程[《CSS变量教程》](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)

-   声明：`--变量名`
-   读取：`var(--变量名, 默认值)`
-   类型
    -   普通：只能用作`属性值`不能用作`属性名`
    -   字符：与字符串拼接，`"Hello, "var(--name)`
    -   数值：使用`calc()`与数值单位连用，`var(--width) * 10px`
-   作用域
    -   范围：在`当前节点块作用域`及其`子节点块作用域`中有效
    -   优先级别：`内联样式 > ID选择器 > 类选择器 = 伪类选择器 = 属性选择器 > 标签选择器 = 伪元素选择器 > 通配选择器 = 兄弟选择器 = 后代选择器`

接着使用几个特别的场景展示变量的魅力。还是那句话，**一样东西有使用的场景，那自然就会有它的价值**，那用的人也会越来越多。

### 场景

其实变量有一个特别好用的场景，就是结合`List集合`使用。

#### 条形加载条

一个条形加载条通常由几条线条组成，每条线条相应一个存在不同时延的相同动画，通过时间差运行相同动画，以产生加载效果。估计很多同学可能会把代码编写为以下形式。

![条形加载条](https://qn.huat.xyz/mac/202406141019197.awebp)

```html
<ul class="strip-loading">
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
```

```scss
.strip-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
	li {
		border-radius: 3px;
		width: 6px;
		height: 30px;
		background-color: #f66;
		animation: beat 1s ease-in-out infinite;
		& + li {
			margin-left: 5px;
		}
		&:nth-child(2) {
			animation-delay: 200ms;
		}
		&:nth-child(3) {
			animation-delay: 400ms;
		}
		&:nth-child(4) {
			animation-delay: 600ms;
		}
		&:nth-child(5) {
			animation-delay: 800ms;
		}
		&:nth-child(6) {
			animation-delay: 1s;
		}
	}
}
@keyframes beat {
	0%,
	100% {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(.5);
	}
}
```



分析代码发现，每个`<li>`只是`animation-delay`不同，其余代码则完全相同，换成其他类似的**List集合**，那岂不是有十个`<li>`就写十个`:nth-child(n)`。显然这种方式不灵活也不易于封装成组件，若能像`JS`那样封装为一个函数并根据参数输出不同样式效果，那就更棒了。说到这里，很明显就是为了铺垫变量的技巧了。

对于`HTML部分`的修改，让每个`<li>`拥有一个自己作用域中的变量。对于`CSS部分`的修改，需分析哪些属性是随着`index`递增而发生规律变化的，对规律变化的部分使用变量表达式代替。

```html
<ul class="strip-loading">
	<li style="--line-index: 1;"></li>
	<li style="--line-index: 2;"></li>
	<li style="--line-index: 3;"></li>
	<li style="--line-index: 4;"></li>
	<li style="--line-index: 5;"></li>
	<li style="--line-index: 6;"></li>
</ul>
```

```scss
.strip-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
	li {
		--time: calc((var(--line-index) - 1) * 200ms);
		border-radius: 3px;
		width: 6px;
		height: 30px;
		background-color: #f66;
		animation: beat 1.5s ease-in-out var(--time) infinite;
		& + li {
			margin-left: 5px;
		}
	}
}
@keyframes beat {
	0%,
	100% {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(.5);
	}
}
```

变量`--line-index`与`--time`使每个`<li>`拥有一个属于自己的作用域。例如第二个`<li>`，`--line-index`的值为`2`，`--time`的计算值为`200ms`，换成第三个`<li>`后这两个值又会不同。

这就是变量的作用范围所致(`在当前节点块作用域及其子节点块作用域中有效`)，因此在`.strip-loading`的块作用域中调用`--line-index`是无效的。

```scss
/* flex属性无效 */
.strip-loading {
	display: flex;
	align-items: center;
	flex: var(--line-index);
}
```

通过妙用变量，把代码从`41行`缩减到`27行`，对于那些含有`List集合`越多的场景，效果就越明显。这样处理也更美观更易维护，某天说加载效果的时间差不明显，直接将`calc((var(--line-index) - 1) * 200ms)`中的`200ms`调整为`400ms`，就无需修改每个`:nth-child(n)`了。

#### 心形加载条

![鱼兄心形加载条](https://qn.huat.xyz/mac/202406141020423.awebp)

通过动图分析，发现每条线条的背景颜色与动画时延不同，另外动画运行时的高度也不同。细心的你可能还会发现，第一条与第九条的高度一样，第二条与第八条的高度一样，依次类推，得到`高度变换相同类`的公式：`对称index = 总数 + 1 - index`。

背景颜色使用滤镜的色相旋转`hue-rotate()`，目的是为了使颜色过渡得更自然；动画时延与上述`条形加载条`一样。以下就用变量根据看到的动图实现一番。

```html
<div class="heart-loading">
	<ul style="--line-count: 9;">
		<li class="line-1" style="--line-index: 1;"></li>
		<li class="line-2" style="--line-index: 2;"></li>
		<li class="line-3" style="--line-index: 3;"></li>
		<li class="line-4" style="--line-index: 4;"></li>
		<li class="line-5" style="--line-index: 5;"></li>
		<li class="line-6" style="--line-index: 6;"></li>
		<li class="line-7" style="--line-index: 7;"></li>
		<li class="line-8" style="--line-index: 8;"></li>
		<li class="line-9" style="--line-index: 9;"></li>
	</ul>
</div>
```

```scss
.heart-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
	ul {
		display: flex;
		justify-content: space-between;
		width: 150px;
		height: 10px;
	}
	li {
		--angle: calc(var(--line-index) / var(--line-count) * .5turn);
		--time: calc((var(--line-index) - 1) * 40ms);
		border-radius: 5px;
		width: 10px;
		height: 10px;
		background-color: #3c9;
		filter: hue-rotate(var(--angle));
		animation-duration: 1s;
		animation-delay: var(--time);
		animation-iteration-count: infinite;
		&.line-1,
		&.line-9 {
			animation-name: beat-1;
		}
		&.line-2,
		&.line-8 {
			animation-name: beat-2;
		}
		&.line-3,
		&.line-7 {
			animation-name: beat-3;
		}
		&.line-4,
		&.line-6 {
			animation-name: beat-4;
		}
		&.line-5 {
			animation-name: beat-5;
		}
	}
}
@keyframes beat-1 {
	0%,
	10%,
	90%,
	100% {
		height: 10px;
	}
	45%,
	55% {
		height: 30px;
		transform: translate3d(0, -15px, 0);
	}
}
@keyframes beat-2 {
	0%,
	10%,
	90%,
	100% {
		height: 10px;
	}
	45%,
	55% {
		height: 60px;
		transform: translate3d(0, -30px, 0);
	}
}
@keyframes beat-3 {
	0%,
	10%,
	90%,
	100% {
		height: 10px;
	}
	45%,
	55% {
		height: 80px;
		transform: translate3d(0, -40px, 0);
	}
}
@keyframes beat-4 {
	0%,
	10%,
	90%,
	100% {
		height: 10px;
	}
	45%,
	55% {
		height: 90px;
		transform: translate3d(0, -30px, 0);
	}
}
@keyframes beat-5 {
	0%,
	10%,
	90%,
	100% {
		height: 10px;
	}
	45%,
	55% {
		height: 90px;
		transform: translate3d(0, -20px, 0);
	}
}
```

一波操作后就有了以下效果，在暖色调的蔓延与肾上腺素的飙升下，这是一种心动的感觉。

![心形加载条](https://qn.huat.xyz/mac/202406141021749.awebp)

#### 标签导航

上述通过两个加载条演示了变量在`CSS`中的应用以及一些妙用技巧，现在通过**标签导航**演示变量在`JS`中的应用。

`JS`中有三个操作变量的`API`。

-   读取变量：`elem.style.getPropertyValue()`
-   设置变量：`elem.style.setProperty()`
-   删除变量：`elem.style.removeProperty()`

先上效果图，效果中主要是使用变量标记`每个标签的背景颜色`与`切换标签的显示状态`。

![标签导航](https://qn.huat.xyz/mac/202406141021759.awebp)

```html
<div class="tab-navbar">
	<nav>
		<label class="active">标题1</label>
		<label>标题2</label>
		<label>标题3</label>
		<label>标题4</label>
	</nav>
	<main>
		<ul style="--tab-count: 4;">
			<li style="--bg-color: #f66;">内容1</li>
			<li style="--bg-color: #66f;">内容2</li>
			<li style="--bg-color: #f90;">内容3</li>
			<li style="--bg-color: #09f;">内容4</li>
		</ul>
	</main>
</div>
```

```scss
.tab-navbar {
	display: flex;
	overflow: hidden;
	flex-direction: column-reverse;
	border-radius: 10px;
	width: 300px;
	height: 400px;
	nav {
		display: flex;
		height: 40px;
		background-color: #f0f0f0;
		line-height: 40px;
		text-align: center;
		label {
			flex: 1;
			cursor: pointer;
			transition: all 300ms;
			&.active {
				background-color: #3c9;
				color: #fff;
			}
		}
	}
	main {
		flex: 1;
		ul {
			--tab-index: 0;
			--tab-width: calc(var(--tab-count) * 100%);
			--tab-move: calc(var(--tab-index) / var(--tab-count) * -100%);
			display: flex;
			flex-wrap: nowrap;
			width: var(--tab-width);
			height: 100%;
			transform: translate3d(var(--tab-move), 0, 0);
			transition: all 300ms;
		}
		li {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			background-color: var(--bg-color);
			font-weight: bold;
			font-size: 20px;
			color: #fff;
		}
	}
}
```

```js
const navs = document.querySelectorAll(".tab-navbar nav label");
const tabs = document.querySelector(".tab-navbar main ul");

navs.forEach((v, i) => v.addEventListener("click", e => {
	navs.forEach(v => v.classList[v === e.target ? "add" : "remove"]("active"));
	tabs.style.setProperty("--tab-index", i);
}));
```

在`<ul>`中定义`--tab-index`表示标签当前的索引，当点击按钮时重置`--tab-index`的值，可实现移动`<ul>`的位置显示指定标签。可移动`<ul>`是因为定义了`--tab-move`，通过`calc()`计算`--tab-index`与`--tab-move`的关系，以操控`transform:translate3d()`移动`<ul>`。

另外在`<li>`中定义`--bg-color`表示标签的背景颜色，也是一种较简洁的模板赋值方式，总比写`<li :style="backgroundColor:${color}">`要好看。若多个属性依赖一个变量赋值，那使用变量赋值到`style`中就更方便了，那些属性可在`css文件`中计算与赋值，这样可帮助`JS`分担一些属性计算工作。

#### 悬浮跟踪按钮

通过几个示例实践了变量在`CSS`与`JS`中的应用，相信大家已掌握了其用法与技巧。曾经在某个网站看过一个酷炫的鼠标悬浮效果，好像也是使用变量实现的。我凭着记忆也使用变量实现一番。

其实思路也很简单，先对按钮布局与着色，然后使用伪元素标记鼠标的位置，定义`--x`与`--y`表示伪元素在按钮中的坐标，通过`JS`获取鼠标在按钮中的`offsetX`与`offsetY`分别赋值给`--x`与`--y`，再对伪元素添加径向渐变的背景颜色，大功告成，一个酷炫的鼠标悬浮跟踪效果就这样诞生了。

![悬浮跟踪按钮](https://qn.huat.xyz/mac/202406141022268.awebp)

```html
<a class="track-btn">
	<span>妙用CSS变量，让你的CSS变得更心动</span>
</a>
```

```scss
.track-btn {
	overflow: hidden;
	position: relative;
	border-radius: 25px;
	width: 400px;
	height: 50px;
	background-color: #66f;
	cursor: pointer;
	line-height: 50px;
	text-align: center;
	font-weight: bold;
	font-size: 18px;
	color: #fff;
	span {
		position: relative;
		pointer-events: none; // 不加会卡顿
	}
	&::before {
		--size: 0;
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		background-image: radial-gradient(circle closest-side, #09f, transparent);
		content: "";
		transform: translate3d(-50%, -50%, 0);
		transition: width 200ms ease, height 200ms ease;
	}
	&:hover::before {
		--size: 400px;
	}
}
```

```js
const btn = document.getElementsByClassName("track-btn")[0];
const btnStyle = btn.style;
btn.addEventListener("mousemove", e => {
	btnStyle.setProperty("--x", `${e.offsetX}px`);
	btnStyle.setProperty("--y", `${e.offsetY}px`);
});
```

其实可结合`鼠标事件`完成更多的酷炫效果，例如动画关联、事件响应等操作。无做不到只有想不到，尽情发挥你的想象力啦。

#### 悬浮视差按钮

曾经在`CodePen`中还看到一个很不错的示例，一个[悬浮视差按钮](https://t.co/qE0woiNip8)，具体代码涉及一些`3D变换`的知识。看完源码，根据其思路自己也实现一番，顺便对代码稍加改良。

![悬浮视差按钮](https://qn.huat.xyz/mac/202406141023228.awebp)

### 兼容

对于现代浏览器来说，变量的兼容性其实还是挺好的，所以可放心使用。毕竟现在都是各大浏览器厂商快速迭代的时候，产品对于用户体验来说是占了很大比重，因此在条件允许的情况下还是大胆尝新，不要被一些过去的所谓的规范约束着。

![变量兼容性](https://qn.huat.xyz/mac/202406141023969.awebp)

在完成一个产品时，不仅是为了完成工作任务，若在保证进度的同时能花点心思点缀，可能会有意外的收获。

通过循序渐进的方式探讨变量的应用与技巧，对于一个这么好用的特性，当然是不能放过啦。其实多多思考，就能把变量用在很多场景中。最后送给大家一个大大的彩蛋，一个暖心彩虹色调搭配的爱心点赞按钮。

![点赞按钮](https://qn.huat.xyz/mac/202406141023146.awebp)



```html
<div class="bruce flex-ct-x" data-title="点赞按钮">
	<button class="like-btn">
		<div class="like-wrapper">
			<div class="like-ripple"></div>
			<svg class="like-heart" width="24" height="24" viewBox="0 0 24 24">
				<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
			</svg>
			<div class="like-particle" style="--line-count: 6;">
				<div class="like-particle-item" style="--line-index: 1;"></div>
				<div class="like-particle-item" style="--line-index: 2;"></div>
				<div class="like-particle-item" style="--line-index: 3;"></div>
				<div class="like-particle-item" style="--line-index: 4;"></div>
				<div class="like-particle-item" style="--line-index: 5;"></div>
				<div class="like-particle-item" style="--line-index: 6;"></div>
			</div>
		</div>
	</button>
</div>
```





```scss
$heart-color: #f66;
$easing: cubic-bezier(.7, 0, .3, 1);
$duration: 500ms;
.like-btn {
	position: relative;
	z-index: 1;
	border: none;
	border-radius: 100%;
	width: 1em;
	height: 1em;
	appearance: none;
	background-color: #fff;
	cursor: pointer;
	font-size: 200px;
	transition: all $duration $easing;
	&::before {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		box-shadow: 0 .3em .6em rgba(#000, .3);
		content: "";
		transition: inherit;
	}
	&::after {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		background-color: #fff;
		content: "";
	}
	&:active {
		&::before {
			animation: depress-shadow $duration $easing both;
		}
	}
	&:focus::after {
		animation: depress $duration $easing both;
	}
}
.like-wrapper {
	display: grid;
	justify-content: center;
	align-items: center;
	> * {
		grid-area: 1/1;
		margin: auto;
	}
}
.like-ripple {
	overflow: hidden;
	position: relative;
	border-radius: 100%;
	width: 1em;
	height: 1em;
	&::before {
		position: absolute;
		left: 0;
		top: 0;
		border: .4em solid $heart-color;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		content: "";
		transform: scale(0);
	}
	.like-btn:focus & {
		&::before {
			animation: ripple-out $duration $easing;
		}
	}
}
.like-heart {
	display: block;
	width: .5em;
	height: .5em;
	transform-origin: center 80%;
	path {
		transition: all $duration $easing;
		stroke: $heart-color;
		stroke-width: 2;
		fill: transparent;
		.like-btn:focus & {
			fill: $heart-color;
		}
	}
	.like-btn:focus & {
		animation: heart-bounce $duration $easing;
	}
}
.like-particle {
	position: relative;
	width: 1px;
	height: 1px;
}
.like-particle-item {
	--angle: calc(var(--line-index) / var(--line-count) * 1turn);
	$color-list: #f66 #66f #f90 #09f #9c3 #3c9;
	position: absolute;
	left: 0;
	top: 0;
	border-radius: .05em;
	width: .1em;
	height: .1em;
	transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scaleY(0);
	transition: all $duration $easing;
	@each $v in $color-list {
		$index: index($color-list, $v);
		&:nth-child(#{$index}) {
			background-color: $v;
		}
	}
	.like-btn:focus & {
		animation: particle-out calc(#{$duration} * 1.2) $easing forwards;
	}
}
.like-btn:focus {
	cursor: normal;
	pointer-events: none;
}
@keyframes depress {
	0%,
	100% {
		transform: none;
	}
	50% {
		transform: translateY(5%) scale(.9);
	}
}
@keyframes depress-shadow {
	0%,
	100% {
		transform: none;
	}
	50% {
		transform: scale(.5);
	}
}
@keyframes heart-bounce {
	0%,
	80%,
	100% {
		transform: scale(1);
	}
	40% {
		transform: scale(.7);
	}
}
@keyframes particle-out {
	50% {
		height: .3em;
		transform: translate(-50%, -50%) rotate(var(--angle)) translateY(.8em) scale(1);
	}
	60% {
		height: .2em;
		transform: translate(-50%, -50%) rotate(var(--angle)) translateY(.8em) scale(1);
	}
	100% {
		transform: translate(-50%, -50%) rotate(var(--angle)) translateY(1em) scale(0);
	}
}
@keyframes ripple-out {
	from {
		transform: scale(0);
	}
	to {
		transform: scale(5);
	}
}
```

