# 布局

- 盒子模型的宽度如何计算？
- margin 纵向重叠的案例
- margin 负值的案例
- BFC 理解和应用
- float 布局以及 clearfix
- filex 画色子

## 盒模型计算

> offsetWidth =（内容宽度 ＋内边距＋ 边框），无外边距

![image.png](https://qn.huat.xyz/mac/202309091214271.awebp)

### 案例

如下代码，请问 div1 的 offsetWidth 是多大？ （ 122px）

```css
#div1 {
  width: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
}
```

如下代码，请问 div1 的 offsetWidth 是多大？ （ 100px）

```css
#div1 {
  width: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
  box-sizing: border-box;
}
```

可以使用如下代码进行测试：

```js
const w = document.getElementById("div1").offsetWidth;
console.log(w);
```

## margin 纵向重叠

### 案例

![image-20230909133844537](https://qn.huat.xyz/mac/202309091338564.png)

答案： 15px

### 解析

- 相邻元素的 margin-top 和 margin-bottom 会发生重叠
- 空白内容的`＜p ></p＞`也会重叠

## margin 负值案例

- margin-top 和 margin-left 负值，元素向上、向左移动

- margin-right 负值，右侧元素左移，自身不受影响
- margin-bottom 负值，下方元素上移，自身不受影响

案例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>margin 负值</title>
    <style type="text/css">
      body {
        margin: 20px;
      }

      .float-left {
        float: left;
      }
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }

      .container {
        border: 1px solid #ccc;
        padding: 10px;
      }
      .container .item {
        width: 100px;
        height: 100px;
      }
      .container .border-blue {
        border: 1px solid blue;
      }
      .container .border-red {
        border: 1px solid red;
      }
    </style>
  </head>
  <body>
    <p>用于测试 margin top bottom 的负数情况</p>
    <div class="container">
      <div class="item border-blue">this is item 1</div>
      <div class="item border-red">this is item 2</div>
    </div>

    <p>用于测试 margin left right 的负数情况</p>
    <div class="container clearfix">
      <div class="item border-blue float-left">this is item 3</div>
      <div class="item border-red float-left">this is item 4</div>
    </div>
  </body>
</html>
```

## BFC 理解与应用

理解

- Block format context ，块级格式化上下文

- 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素

形成条件

- Float 不是 none
- position 是 absolute 或者 fixed
- overflow 不是 visible
- display 是 flex inline-block 等

## 圣杯布局和双飞翼布局

圣杯布局和双飞翼布局的目的

- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

圣杯布局和双飞翼布局的技术总结

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，一个用 padding 一个用 margin

圣杯布局

![image-20230909145940962](https://qn.huat.xyz/mac/202309091459022.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>圣杯布局</title>
    <style type="text/css">
      body {
        min-width: 550px;
      }
      #header {
        text-align: center;
        background-color: #f1f1f1;
      }

      #container {
        padding-left: 200px;
        padding-right: 150px;
      }
      #container .column {
        float: left;
      }

      #center {
        background-color: #ccc;
        width: 100%;
      }
      #left {
        position: relative;
        background-color: yellow;
        width: 200px;
        margin-left: -100%;
        right: 200px;
      }
      #right {
        background-color: red;
        width: 150px;
        margin-right: -150px;
      }

      #footer {
        text-align: center;
        background-color: #f1f1f1;
      }

      /* 手写 clearfix */
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }
    </style>
  </head>
  <body>
    <div id="header">this is header</div>
    <div id="container" class="clearfix">
      <div id="center" class="column">this is center</div>
      <div id="left" class="column">this is left</div>
      <div id="right" class="column">this is right</div>
    </div>
    <div id="footer">this is footer</div>
  </body>
</html>
```

双飞翼布局

![image-20230909145921042](https://qn.huat.xyz/mac/202309091459099.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>双飞翼布局</title>
    <style type="text/css">
      body {
        min-width: 550px;
      }
      .col {
        float: left;
      }

      #main {
        width: 100%;
        height: 200px;
        background-color: #ccc;
      }
      #main-wrap {
        margin: 0 190px 0 190px;
      }

      #left {
        width: 190px;
        height: 200px;
        background-color: #0000ff;
        margin-left: -100%;
      }
      #right {
        width: 190px;
        height: 200px;
        background-color: #ff0000;
        margin-left: -190px;
      }
    </style>
  </head>
  <body>
    <div id="main" class="col">
      <div id="main-wrap">this is main</div>
    </div>
    <div id="left" class="col">this is left</div>
    <div id="right" class="col">this is right</div>
  </body>
</html>
```

## 手写 clearfix

```css
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
```

## 画色子

![image-20230909145848808](https://qn.huat.xyz/mac/202309091458875.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>flex 画骰子</title>
    <style type="text/css">
      .box {
        width: 200px;
        height: 200px;
        border: 2px solid #ccc;
        border-radius: 10px;
        padding: 20px;

        display: flex;
        justify-content: space-between;
      }
      .item {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #666;
      }
      .item:nth-child(2) {
        align-self: center;
      }
      .item:nth-child(3) {
        align-self: flex-end;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <span class="item"></span>
      <span class="item"></span>
      <span class="item"></span>
    </div>
  </body>
</html>
```
