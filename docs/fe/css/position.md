### absolute 和 relative 分别依据什么定位？

- relative 依据自身定位
- absolute 依据最近一层的定位元素定位
  - absolute relative fixed
  - body

### 居中对齐有哪些实现方式？

<br/>

#### 水平居中

- inline 元素：text-align:center
- block 元素：margin:auto
- absolute 元素：left： 50% + margin-left 负值

#### 垂直居中

- inline 元素：line-height 的值等于 height 值
- absolute 元素：top: 50% + margin-top 负值
- absolute 元素：transform(-50%,-50%)
- absolute 元素：top, left, bottom, right = 0 + margin: auto
