## 常见组合选择器

“组合选择器”是一种特殊字符，表示选择器之间的关系类型。常见的组合选择器主要有：

- ``空格字符，例如 `a b` ，称之为后代组合选择器，匹配直接或嵌套的子元素；
- `>` 字符，例如 `a > b` ，称之为直接子元素组合选择器，仅匹配顶层未嵌套的子元素；
- `+` 字符，例如 `a + b` ，称之为相邻兄弟组合选择器，仅匹配紧随其后的下一个兄弟元素；
- `~` 字符，例如 `a ~ b` ，称之为通用兄弟组合选择器，匹配基础选择器（`a`）之后的一个或多个兄弟元素（`b`）。

![img](https://qn.huat.xyz/mac/202406041006300.awebp)



## 常见伪类选择器

而伪类选择器就相对比较复杂一些，它根据不同功能可以分为：

- 状态伪类选择器，比如 `:hover` 、`:active` 、`visited` 和 `focus` 等；
- 焦点伪类选择器，比如 `:focus-within` 和 `:focus-visible` 等；
- 结构型伪类选择器，比如 `:nth-child`、`:nth-last-child`、`:first-child`、 `:last-child`、`:only-child`、`:nth-of-type`、`:nth-last-of-type`、 `:first-of-type`、 `:last-of-type` 和 `:only-of-type` 等；
- 表单伪类选择器，比如 `:autofill`、`:enabled`、 `:disabled`、`:read-only`、 `:read-write`, `:placeholder-shown`、 `:default`、 `:checked`、`:indeterminate`、`:valid`、`:invalid`、`:in-range`、`:out-of-range`、`:required` 和 `:optional` 等；
- 目标伪类选择器，比如 `:target` ；
- 语言伪类选择器，比如 `:dir()` 和 `:lang()` 等；
- 函数伪类选择器，比如 `:not()` 、`:is()` 和 `:where()` 等。





## 类型选择器

CSS **类型选择器**通过节点名称匹配元素。换句话说，它选择一个文件中所有给定类型的元素。

![1_-JCNx3lGjzh9qBUSEOzyxA](https://qn.huat.xyz/mac/202406041039773.webp)



## ID 选择器

CSS **ID 选择器**会根据该元素的 [`id`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/id) 属性中的内容匹配元素。为了使该元素被选中，它的 `id` 属性必须与选择器中给出的值完全匹配。

![1_n9eE4N_MxNHtqGJsT-UN4g](https://qn.huat.xyz/mac/202406041041060.webp)



## 后代选择器

**后代组合器**（通常用单个空格（" "）字符表示）组合了两个选择器，如果第二个选择器匹配的元素具有与第一个选择器匹配的祖先（父母，父母的父母，父母的父母的父母等）元素，则它们将被选择。利用后代组合器的选择器称为*后代选择器*。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator

![1_qHLesQtFFjAQ6rzozzq1LQ](https://qn.huat.xyz/mac/202406041042270.webp)



### Combine the Descendant & ID Selectors

![1_vf8iP56PsPVtQm0sWMKeZw](https://qn.huat.xyz/mac/202406041044432.webp)



## 类选择器

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **类选择器**根据 [`class`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#class) 属性的内容匹配元素。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors

![1_S_A0sD5jNOKzBjqoIo3OEw](https://qn.huat.xyz/mac/202406041045046.webp)



### Combine the Class Selector

![1_mJ_vh75gt0c7_8rCU0Uqnw](https://qn.huat.xyz/mac/202406041046198.webp)



## 关系选择器

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Combinators

![1_TI5OMdbG8tkf-1V37ehcVA](https://qn.huat.xyz/mac/202406041047986.webp)



### The Universal Selector

Just Select everything!

![1_9uLklowRUCFSl1HvBXmFJw](https://qn.huat.xyz/mac/202406041047182.webp)



### Combine the Universal Selector

![1_QXwvFB6dOojDIx-AS4JV_A](https://qn.huat.xyz/mac/202406041048132.webp)

## Adjacent Sibling Selector

**接续兄弟选择器**（`+`）介于两个选择器之间，当第二个元素*紧跟在*第一个元素之后，并且两个元素都是属于同一个父[元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)的子元素，则第二个元素将被选中。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Next-sibling_combinator

![1_JR9ekwWtjX46TUIO9mEEFw](https://qn.huat.xyz/mac/202406041049384.webp)



## General Sibling Selector

**后续兄弟选择器**（`~`）将两个选择器分开，并匹配第二个选择器的*所有迭代元素*，位置无须紧邻于第一个元素，只须有相同的父级[元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Subsequent-sibling_combinator

![1_PpN8Si1M3RjpRlQoiXslFA](https://qn.huat.xyz/mac/202406041050774.webp)



## Child Selector

**子组合器**（`>`）被放在两个 CSS 选择器之间。它只匹配那些被第二个选择器匹配的元素，这些元素是被第一个选择器匹配的元素的直接子元素。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator

![1_sROR9K_-88YbQKMx_XgB8g](https://qn.huat.xyz/mac/202406041051825.webp)



## :first-child

**`:first-child`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)表示在一组兄弟元素中的第一个元素

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child

![1_F_yEHA3tbPRB-cIb6WrJKw](https://qn.huat.xyz/mac/202406041055133.webp)



## :only-child

**`:only-child`** CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)表示没有任何兄弟元素的元素。这与 `:first-child:last-child` 或 `:nth-child(1):nth-last-child(1)` 相同，但前者具有更小的权重性。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child

![1_u0kZdAFytmqSLCMBFxVw3Q](https://qn.huat.xyz/mac/202406041100685.webp)



## :last-child

**`:last-child`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)代表一组兄弟元素中的最后元素。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child

![1_u7VwIoigw3ltJkTuLgtERg](https://qn.huat.xyz/mac/202406041100735.webp)



## :nth-child()

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **`:nth-child()`** [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)根据元素在父元素的子元素列表中的索引来选择元素。换言之，`:nth-child()` 选择器根据父元素内的所有兄弟元素的位置来选择子元素。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child

![1_bos1vOH4iMPpc8zdASuXJw](https://qn.huat.xyz/mac/202406041102875.webp)

## :nth-last-child

**`:nth-last-child()`** 这个[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) 从兄弟节点中从后往前匹配处于某些位置的元素

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child

![1_6peGscuMEFzUIthOVFFVkg](https://qn.huat.xyz/mac/202406041103300.webp)



## :first-of-type

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) **`:first-of-type`** 表示一组兄弟元素中其类型的第一个元素。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type

![1_rX3uZbCJgFHdYOK0ZVWMZw](https://qn.huat.xyz/mac/202406041104483.webp)



## :nth-of-type

**`:nth-of-type()`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)基于相同类型（标签名称）的兄弟元素中的位置来匹配元素。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type

![1_DRelZmf006HbHgxMKm5XTQ](https://qn.huat.xyz/mac/202406041104577.webp)



### Nth-of-type Selector with Formula

![1_CIxZCG18ouLiseQmruuahw](https://qn.huat.xyz/mac/202406041106724.webp)

```
:nth-of-type(even)
:nth-of-type(odd)
:nth-of-type(2)
:nth-of-type(2n)
:nth-of-type(3n-1)
:nth-of-type(2n+2)
```



## :only-of-type

**`:only-of-type`** CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)代表了任意一个元素，这个元素没有其他相同类型的兄弟元素。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type

![1_B7Ou5thh8krY6pjbBPY1Vw](https://qn.huat.xyz/mac/202406041108932.webp)



## :last-of-type

`:last-of-type` [CSS 伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) 表示了在（它父元素的）子元素列表中，最后一个给定类型的元素。当代码类似 Parent tagName:last-of-type 的作用区域包含父元素的所有子元素中的最后一个选定元素，也包括子元素的最后一个子元素并以此类推。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type

```html
<p>
  <em>我没有颜色 :(</em><br />
  <strong>我没有颜色 :(</strong><br />
  <em>我有颜色 :D</em><br />
  <strong>我也没有颜色 :(</strong><br />
</p>

<p>
  <em>我没有颜色 :(</em><br />
  <span><em>我有颜色！</em></span
  ><br />
  <strong>我没有颜色 :(</strong><br />
  <em>我有颜色 :D</em><br />
  <span>
    <em>我在子元素里，但没有颜色！</em><br />
    <span style="text-decoration:line-through;"> 我没有颜色 </span><br />
    <em>我却有颜色！</em><br /> </span
  ><br />
  <strong>我也没有颜色 :(</strong>
</p>
```

![image-20240604111028009](https://qn.huat.xyz/mac/202406041110043.png)



## :empty

**`:empty`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)用于选择不包含任何子元素的元素。子元素可以是元素节点或文本（包括空格）。但是注释、处理指令和 CSS [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 不会影响元素是否被认定为空。

![1_3JkBDDRwmOlA9hyLAvtJ6A](https://qn.huat.xyz/mac/202406041111283.webp)

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty



## Negation Pseudo-class

The `:not()` CSS pseudo-class represents elements that do not match a list of selectors. Since it prevents specific items from being selected, it is known as the *negation pseudo-class*.

![1_HqU-8u78D95wcaSnmgFIjA](https://qn.huat.xyz/mac/202406041113464.webp)



## 属性选择器

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors



![1_gyvI83d00kwOy7InlSiCuQ](https://qn.huat.xyz/mac/202406041113717.webp)



![1_MSq9DRZ8uImALfHgdGY1EQ](https://qn.huat.xyz/mac/202406041114857.webp)



![1_iz2gCqSj8Plw6Dcr6bc7Sg](https://qn.huat.xyz/mac/202406041114011.webp)



![1_5avo5jOiyPJ59PA6HbMDkQ](https://qn.huat.xyz/mac/202406041114368.webp)



![1_TZeSjPwyu5UZft4CsSjQOQ](https://qn.huat.xyz/mac/202406041114385.webp)



