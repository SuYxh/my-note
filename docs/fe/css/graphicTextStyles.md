# 图文样式

### line-height 的继承问题

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>line-height 继承问题</title>
    <style type="text/css">
      body {
        font-size: 20px;
        line-height: 200%;
      }
      p {
        background-color: #ccc;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <p>这是一行文字</p>
  </body>
</html>
```

p 标签的行高将会是多少？

- 写具体数值，如 30px ，则继承该值
- 写比例，如 2/1.5 ，则继承该比例
- 写百分比，如 200%，则继承计算出来的值

答案 40px
