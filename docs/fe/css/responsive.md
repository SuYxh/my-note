# 响应式

### rem 是什么？

rem 是一个长度单位

- px，绝对长度单位，最常用
- em，相对长度单位，相对于父元素，不常用
- rem ，相对长度单位，相对于根元素，常用于响应式布局

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>rem 演示</title>
    <style type="text/css">
      html {
        font-size: 100px;
      }
      div {
        background-color: #ccc;
        margin-top: 10px;
        font-size: 0.16rem;
      }
    </style>
  </head>
  <body>
    <p style="font-size: 0.1rem">rem 1</p>
    <p style="font-size: 0.2rem">rem 1</p>
    <p style="font-size: 0.3rem">rem 1</p>

    <div style="width: 1rem;">this is div1</div>
    <div style="width: 2rem;">this is div2</div>
    <div style="width: 3rem;">this is div3</div>
  </body>
</html>
```

### vh、vw

- window.screen.height // 屏幕高度
- window.innerHeight // 网页视口高度
- document.body.clientHeight // body 高度

![image-20230909170204757](https://qn.huat.xyz/mac/202309091702786.png)

667: window.screen.height

553: window.innerHeight

body 高度: 页面上文案+红色滑块

### 如何实现响应式？

- rem
- 媒体查询
- vh vw
