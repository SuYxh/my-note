曾经有一个著名的网站[CSSTricks](https://css-tricks.com)做了一份属性排序的[调查问卷](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties)，调查结果如下。

![调查问卷](https://qn.huat.xyz/mac/202406121319779.awebp)

-   **A**：随意排序占`39%`
-   **B**：根据类型排序占`45%`
-   **C**：根据单行代码长度排序占`2%`
-   **D**：根据属性字母排序占`14%`

其实属性排序有很多优点。

-   突出`CSS艺术之美`
-   防止属性重复编写
-   快速定位到问题代码
-   锻炼无视图架构网页的能力
-   快速在脑海中构思排版与布局
-   提高代码的可读性与可维护性

很多开发者都会给属性做排序，可见大家对属性排序都是持有肯定的态度，只在排序方式中会有一定的分歧。`根据长度排序`与`根据字母排序`是较简单易用的排序方式，但忽略了属性间的关联性。`根据类型排序`又会分为很多种，主要还是围绕着`盒模型`。

-   **根据类型排序**
-   **根据长度排序**
-   **根据字母排序**

属性排序并不会影响样式的功能与性能，只是让代码看起来更简洁更规范。


### 理解

若编写一个节点样式，先声明`display`还是`width`？`display`决定了该节点的开始状态，是`none`，还是`block`，还是`inline`，还是其他。若先声明`width`，万一后续声明`display:inline`表示该节点是行内元素，行内元素无法显式声明宽高，那`width`不是白白浪费了？所以推荐声明`display`在首位，毕竟它声明了该节点最开始的状态：`有还是无`。

### 排序

因此，我将属性排序根据`布局 → 尺寸 → 界面 → 文字 → 交互`的方式顺序定义。把交互属性放到后面是因为`transform`与`animation`会让节点重新生成新图层，新图层不会对其他图层造成影响。

#### 布局属性

-   显示：`display`、`visibility`
-   溢出：`overflow`、`overflow-x`、`overflow-y`、`scroll-behavior`、`scroll-snap-align`
-   浮动：`float`、`clear`
-   定位：`position`、`left`、`right`、`top`、`bottom`、`z-index`
-   列表：`list-style`、`list-style-type`、`list-style-position`、`list-style-image`
-   表格：`table-layout`、`border-collapse`、`border-spacing`、`caption-side`、`empty-cells`
-   弹性：`flex-flow`、`flex-direction`、`flex-wrap`、`justify-content`、`align-content`、`align-items`、`align-self`、`flex`、`flex-grow`、`flex-shrink`、`flex-basis`、`order`
-   多列：`columns`、`column-width`、`column-count`、`column-gap`、`column-rule`、`column-rule-width`、`column-rule-style`、`column-rule-color`、`column-span`、`column-fill`、`column-break-before`、`column-break-after`、`column-break-inside`
-   格栅：`grid-columns`、`grid-rows`

#### 尺寸属性

-   模型：`box-sizing`
-   边距：`margin`、`margin-left`、`margin-right`、`margin-top`、`margin-bottom`
-   填充：`padding`、`padding-left`、`padding-right`、`padding-top`、`padding-bottom`
-   边框：`border`、`border-width`、`border-style`、`border-color`、`border-colors`、`border-<direction>-<param>`
-   圆角：`border-radius`、`border-top-left-radius`、`border-top-right-radius`、`border-bottom-left-radius`、`border-bottom-right-radius`
-   框图：`border-image`、`border-image-source`、`border-image-slice`、`border-image-width`、`border-image-outset`、`border-image-repeat`
-   大小：`width`、`min-width`、`max-width`、`height`、`min-height`、`max-height`

#### 界面属性

-   外观：`appearance`
-   轮廓：`outline`、`outline-width`、`outline-style`、`outline-color`、`outline-offset`、`outline-radius`、`outline-radius-<direction>`
-   背景：`background`、`background-color`、`background-image`、`background-repeat`、`background-repeat-x`、`background-repeat-y`、`background-position`、`background-position-x`、`background-position-y`、`background-size`、`background-origin`、`background-clip`、`background-attachment`、`bakground-composite`
-   遮罩：`mask`、`mask-mode`、`mask-image`、`mask-repeat`、`mask-repeat-x`、`mask-repeat-y`、`mask-position`、`mask-position-x`、`mask-position-y`、`mask-size`、`mask-origin`、`mask-clip`、`mask-attachment`、`mask-composite`、`mask-box-image`、`mask-box-image-source`、`mask-box-image-width`、`mask-box-image-outset`、`mask-box-image-repeat`、`mask-box-image-slice`
-   滤镜：`box-shadow`、`box-reflect`、`backdrop-filter`、`mix-blend-mode`、`filter`、`opacity`
-   裁剪：`object-fit`、`clip`、`clip-path`
-   事件：`resize`、`zoom`、`cursor`、`pointer-events`、`touch-callout`、`user-modify`、`user-focus`、`user-input`、`user-select`、`user-drag`

#### 文字属性

-   模式：`line-height`、`line-clamp`、`vertical-align`、`direction`、`unicode-bidi`、`writing-mode`、`ime-mode`
-   文本：`text-overflow`、`text-decoration`、`text-decoration-line`、`text-decoration-style`、`text-decoration-color`、`text-decoration-skip`、`text-underline-position`、`text-align`、`text-align-last`、`text-justify`、`text-indent`、`text-stroke`、`text-stroke-width`、`text-stroke-color`、`text-shadow`、`text-transform`、`text-size-adjust`
-   字体：`src`、`font`、`font-family`、`font-style`、`font-stretch`、`font-weight`、`font-variant`、`font-size`、`font-size-adjust`、`color`
-   内容：`tab-size`、`overflow-wrap`、`word-wrap`、`word-break`、`word-spacing`、`letter-spacing`、`white-space`、`caret-color`、`quotes`、`content`、`content-visibility`、`counter-reset`、`counter-increment`、`page`、`page-break-before`、`page-break-after`、`page-break-inside`

#### 交互属性

-   模式：`will-change`、`perspective`、`perspective-origin`、`backface-visibility`
-   变换：`transform`、`transform-origin`、`transform-style`
-   过渡：`transition`、`transition-property`、`transition-duration`、`transition-timing-function`、`transition-delay`
-   动画：`animation`、`animation-name`、`animation-duration`、`animation-timing-function`、`animation-delay`、`animation-iteration-count`、`animation-direction`、`animation-play-state`、`animation-fill-mode`
