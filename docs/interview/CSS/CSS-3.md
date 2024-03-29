CSS-3

### 第1题：相邻的两个inline-block节点为什么会出现间隔，该如何解决？

https://fe.ecool.fun/topic-answer/5f8efe01-0851-4c6f-87bc-f50d6e3ca279?orderBy=updateTime&order=desc&tagId=11



### 第2题：如何使用css来实现禁止移动端页面的左右划动手势？

CSS属性 `touch-action` 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。

最简单方法是：

```
html{
 touch-action: none;
 touch-action: pan-y;
}
```

还可以直接指定对应元素的宽度和overflow：

```
html{
 width: 100vw;
 overflow-x: hidden;
}
```



### 第3题：如何检测浏览器所支持的最小字体大小？

可以使用 JS 设置 DOM 的字体为某一个值，然后再取出来，如果值设置成功，就说明支持。





### 第4题：IconFont 的原理是什么

IconFont 的使用原理来自于 css 的 `@font-face` 属性。

这个属性用来定义一个新的字体，基本用法如下：

```
@font-face {
  font-family: <YourFontName>;
  src: <url> [<format>],[<source> [<format>]], *;
  [font-weight: <weight>];
  [font-style: <style>];
}
```

- font-family：为载入的字体取名字。
- src：[url]加载字体，可以是相对路径，可以是绝对路径，也可以是网络地址。[format]定义的字体的格式，用来帮助浏览器识别。主要取值为：【truetype(.ttf)、opentype（.otf）、truetype-aat、embedded-opentype(.eot)、svg(.svg)、woff(.woff)】。
- font-weight：定义加粗样式。
- font-style：定义字体样式。



### 第5题：Atom CSS 是什么？

Atom CSS：原子CSS，意思是一个类只干一件事。

不同于大家常用的BEM这类规则，原子css就是拆分，所有 CSS 类都有一个唯一的 CSS 规则。例如如下

```
.w-full{
  width:100%;
}
.h-full{
  height:100%;
}
```

而像这种就不是

```
.w&h-full{
  width:100%;
  height:100%;
}
```

当我们使用的时候，直接写class名就可以

```
<html>
	<body>
    	<div id="app" class="w-full h-full">
        </div>
	</body>
</html>
```

原子CSS的优缺点

- 优点
  - 减少了css体积，提高了css复用
  - 减少起名的复杂度
- 缺点
  - 增加了记忆成本。将css拆分为原子之后，你势必要记住一些class才能书写，哪怕tailwindcss提供了完善的工具链，你写background，也要记住开头是bg。
  - 增加了html结构的复杂性。当整个dom都是这样class名，势必会带来调试的麻烦，有的时候很难定位具体css问题
  - 你仍需要起class名。对于大部分属性而言，你可以只用到center,auto，100%，这些值，但是有时候你仍需要设定不一样的参数值，例如left，top，这时候你还需要起一个class名



### 第6题：CSS中的1像素问题是什么？有哪些解决方案？

1px 边框问题的由来

苹果 iPhone4 首次提出了 Retina Display（视网膜屏幕）的概念，在 iPhone4 使用的视网膜屏幕中，把 2x2 个像素当 1 个物理像素使用，即使用 2x2 个像素显示原来 1 个物理像素显示的内容，从而让 UI 显示更精致清晰，这 2x2 个像素叫做逻辑像素。

像这种像素比（像素比（即dpr）＝ 物理像素 / 逻辑像素）为 2 的视网膜屏幕也被称为二倍屏，目前市面上还有像素比更高的三倍屏、四倍屏。

而 CSS 中 1px 指的是物理像素，因此，设置为 1px 的边框在 dpr = 2 的视网膜屏幕中实际占用了 2 个逻辑像素的宽度，这就导致了界面边框变粗的视觉体验。



使用 transform 解决

通过设置元素的 box-sizing 为 border-box，然后构建伪元素，再使用 CSS3 的 transform 缩放，这是目前市面上最受推崇的解决方法。这种方法可以满足所有的场景，而且修改灵活，唯一的缺陷是，对于已使用伪元素的元素要多嵌套一个无用元素。具体的实现如下：

```
.one-pixel-border {
  position: relative;
  box-sizing: border-box;
}

.one-pixel-border::before {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  border: 1px solid red;
  transform: translate(-50%, -50%) scale(0.5, 0.5);
}
```



### 第7题：css加载会造成阻塞吗？

参考答案：

先说下结论：

- css加载不会阻塞DOM树的解析
- css加载会阻塞DOM树的渲染
- css加载会阻塞后面js语句的执行

为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:

- 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
- 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
- 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
- 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)



原理解析

浏览器渲染的流程如下：

- HTML解析文件，生成DOM Tree，解析CSS文件生成CSSOM Tree
- 将Dom Tree和CSSOM Tree结合，生成Render Tree(渲染树)
- 根据Render Tree渲染绘制，将像素渲染到屏幕上。

从流程我们可以看出来:

- DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。
- 然而，由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
- 由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。





### 第8题：CSS 中有哪几种定位方式？

- Static

这个是元素的默认定位方式，元素出现在正常的文档流中，会占用页面空间。

- Relative

相对定位方式，相对于其父级元素（无论父级元素此时为何种定位方式）进行定位，准确地说是相对于其父级元素所剩余的未被占用的空间进行定位（在父元素由多个相对定位的子元素时可以看出），且会占用该元素在文档中初始的页面空间，即在使用top，bottom，left，right进行移动位置之后依旧不会改变其所占用空间的位置。可以使用z-index进行在z轴方向上的移动。

- Absolute

绝对定位方式，脱离文档流，不会占用页面空间。以最近的不是static定位的父级元素作为参考进行定位，如果其所有的父级元素都是static定位，那么此元素最终则是以当前窗口作为参考进行定位。

可以使用top，bottom，left，right进行位置移动，亦可使用z-index在z轴上面进行移动。当元素为此定位时，如果该元素为内联元素，则会变为块级元素，即可以直接设置其宽和高的值；如果该元素为块级元素，则其宽度会由初始的100%变为auto。

注意：当元素设置为绝对定位时，在没有指定top，bottom，left，right的值时，他们的值并不是0，这几个值是有默认值的，默认值就是该元素设置为绝对定位前所处的正常文档流中的位置。

- Fixed

绝对定位方式，直接以浏览器窗口作为参考进行定位。其它特性同absolute定位。

当父元素使用了transform的时候，会以父元素定位。

- sticky

粘性定位，可以简单理解为relative和fixed布局的混合。

当粘性约束矩形在可视范围内为relative，反之，则为fixed粘性定位元素如果和它的父元素一样高，则垂直滚动的时候，粘性定位效果是不会出现的它的定位效果完全受限于父级元素们。

如果父元素的overflow属性设置了scroll，auto,overlay值，那么，粘性定位将会失效同一容器中多个粘贴定位元素独立偏移，因此可能重叠；位置上下靠在一起的不同容器中的粘贴定位元素则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。



### 第9题：style标签写在body后与body前有什么区别？

页面加载自上而下 当然是先加载样式。

写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）



### 第10题：两个同级的相邻元素之间，有看不见的空白间隔，是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

解决方法：

- 相邻元素代码代码全部写在一排
- 浮动元素，float:left;
- 在父级元素中用font-size:0;





### 第11题：元素竖向的百分比设定是相对于容器的高度吗？

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。





### 第12题：为什么会出现浮动？什么时候需要清除浮动？清除浮动的方式有哪些？

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。

浮动带来的问题：

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后
- 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除浮动的方式：

- 父级div定义height
- 最后一个浮动元素后加空div标签 并添加样式clear:both。
- 包含浮动元素的父标签添加样式overflow为hidden或auto。
- 父级div定义zoom





### 第13题：页面导入样式时，使用link和@import有什么区别？

link属于HTML标签，而@import是css提供的；

页面被加载时，link会同时被加载，而@import引用的css会等到页面被加载完再加载；

@import只在IE5以上才能识别，而link是XHTML标签，无兼容问题；

link方式的样式的权重高于@import的权重。



### 第14题：CSS匹配规则顺序是怎么样的？

相信大多数初学者都会认为CSS匹配是左向右的，其实恰恰相反。

CSS匹配发生在Render Tree构建时（Chrome Dev Tools将其归属于Layout过程）。此时浏览器构建出了DOM，而且拿到了CSS样式，此时要做的就是把样式跟DOM上的节点对应上，浏览器为了提高性能需要做的就是快速匹配。

首先要明确一点，浏览器此时是给一个"可见"节点找对应的规则，这和jQuery选择器不同，后者是使用一个规则去找对应的节点，这样从左到右或许更快。但是对于前者，由于CSS的庞大，一个CSS文件中或许有上千条规则，而且对于当前节点来说，大多数规则是匹配不上的，稍微想一下就知道，如果从右开始匹配（也是从更精确的位置开始），能更快排除不合适的大部分节点，而如果从左开始，只有深入了才会发现匹配失败，如果大部分规则层级都比较深，就比较浪费资源了。

除了上面这点，我们前面还提到DOM构建是"循序渐进的"，而且DOM不阻塞Render Tree构建（只有CSSOM阻塞），这样也是为了能让页面更早有元素呈现。

考虑如下情况，如果我们此时构建的只是部分DOM，而CSSOM构建完成，浏览器就会构建Render Tree。

这个时候对每一个节点，如果找到一条规则从右向左匹配，我们只需要逐层观察该节点父节点是否匹配，而此时其父节点肯定已经在DOM上。

但是反过来，我们可能会匹配到一个DOM上尚未存在的节点，此时的匹配过程就浪费了资源。



### 第15题：如何使用css完成视差滚动效果?

https://fe.ecool.fun/topic-answer/fad85622-728a-4c93-bf22-d91f8902837d?orderBy=updateTime&order=desc&tagId=11



### 第16题：怎么使用 CSS 如何画一个三角形

https://fe.ecool.fun/topic-answer/f2e90e32-83d2-4ba4-8a57-033160fac9c4?orderBy=updateTime&order=desc&tagId=11



### 第17题：什么是响应式设计？响应式设计的基本原理是什么？如何进行实现？

https://fe.ecool.fun/topic-answer/dc8c6233-f645-444c-8e31-f18bc3f5244f?orderBy=updateTime&order=desc&tagId=11



### 第18题：如果使用CSS提高页面性能？

https://fe.ecool.fun/topic-answer/6f841b28-be0d-413f-9b7a-70e740fa7621?orderBy=updateTime&order=desc&tagId=11



### 第19题：怎么使用 CSS3 实现动画？

https://fe.ecool.fun/topic-answer/38358609-e797-42f9-983d-3e2709fb4fdd?orderBy=updateTime&order=desc&tagId=11



