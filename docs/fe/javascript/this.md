



在之前的文章中留了下面这样一段代码：

```js
var bar = {
    myName:"time.geekbang.com",
    printName: function () {
        console.log(myName)
    }    
}
function foo() {
    let myName = " 极客时间 "
    return bar.printName
}
let myName = " 极客邦 "
let _printName = foo()
_printName()
bar.printName()
```

相信你已经知道了，在 printName 函数里面使用的变量 myName 是属于全局作用域下面的，所以最终打印出来的值都是“极客邦”。这是因为 **JavaScript 语言的作用域链是由词法作用域决定的，而词法作用域是由代码结构来确定的。** 

不过按照常理来说，调用`bar.printName`方法时，该方法内部的变量 myName 应该使用 bar 对象中的，因为它们是一个整体，大多数面向对象语言都是这样设计的，比如我用 C++ 改写了上面那段代码，如下所示：

```js
#include <iostream>
using namespace std;
class Bar{
    public:
    char* myName;
    Bar(){
      myName = "time.geekbang.com";
    }
    void printName(){
       cout<< myName <<endl;
    }  
} bar;
 
char* myName = " 极客邦 ";
int main() {
	bar.printName();
	return 0;
}
```

在这段 C++ 代码中，我同样调用了 bar 对象中的 printName 方法，最后打印出来的值就是 bar 对象的内部变量 myName 值——“time.geekbang.com”，而并不是最外面定义变量 myName 的值——“极客邦”，所以**在对象内部的方法中使用对象内部的属性是一个非常普遍的需求**。但是 JavaScript 的作用域机制并不支持这一点，基于这个需求，JavaScript 又搞出来另外一套**this 机制**。

```js
printName: function () {
  console.log(this.myName)
}    
```

接下来咱们就展开来介绍 this，不过在讲解之前，希望你能区分清楚**作用域链**和**this**是两套不同的系统，它们之间基本没太多联系。在前期明确这点，可以避免你在学习 this 的过程中，和作用域产生一些不必要的关联。



## JavaScript 中的 this 是什么

关于 this，我们还是得先从执行上下文说起。在前面几篇文章中，我们提到执行上下文中包含了变量环境、词法环境、外部环境，但其实还有一个 this 没有提及，具体你可以参考下图：

![下载](https://qn.huat.xyz/mac/202405231447265.png)



从图中可以看出，**this 是和执行上下文绑定的**，也就是说每个执行上下文中都有一个 this。前面提到过，执行上下文主要分为三种——全局执行上下文、函数执行上下文和 eval 执行上下文，所以对应的 this 也只有这三种——全局执行上下文中的 this、函数中的 this 和 eval 中的 this。

不过由于 eval 我们使用的不多，所以本文我们对此就不做介绍了，如果你感兴趣的话，可以自行搜索和学习相关知识。

那么接下来我们就重点讲解下**全局执行上下文中的 this**和**函数执行上下文中的 this**。

## 全局执行上下文中的 this

首先我们来看看全局执行上下文中的 this 是什么。

你可以在控制台中输入`console.log(this)`来打印出来全局执行上下文中的 this，最终输出的是 window 对象。所以你可以得出这样一个结论：全局执行上下文中的 this 是指向 window 对象的。这也是 this 和作用域链的唯一交点，作用域链的最底端包含了 window 对象，全局执行上下文中的 this 也是指向 window 对象。



## 函数执行上下文中的 this

现在你已经知道全局对象中的 this 是指向 window 对象了，那么接下来，我们就来重点分析函数执行上下文中的 this。还是先看下面这段代码：

```js
function foo(){
  console.log(this)
}
foo()
```

我们在 foo 函数内部打印出来 this 值，执行这段代码，打印出来的也是 window 对象，这说明在默认情况下调用一个函数，其执行上下文中的 this 也是指向 window 对象的。估计你会好奇，那能不能设置执行上下文中的 this 来指向其他对象呢？答案是肯定的。通常情况下，有下面三种方式来设置函数执行上下文中的 this 值。

### 1. 通过函数的 call 方法设置

你可以通过函数的**call**方法来设置函数执行上下文的 this 指向，比如下面这段代码，我们就并没有直接调用 foo 函数，而是调用了 foo 的 call 方法，并将 bar 对象作为 call 方法的参数。

```js
let bar = {
  myName : " 极客邦 ",
  test1 : 1
}
function foo(){
  this.myName = " 极客时间 "
}
foo.call(bar)
console.log(bar)
console.log(myName)
```

执行这段代码，然后观察输出结果，你就能发现 foo 函数内部的 this 已经指向了 bar 对象，因为通过打印 bar 对象，可以看出 bar 的 myName 属性已经由“极客邦”变为“极客时间”了，同时在全局执行上下文中打印 myName，JavaScript 引擎提示该变量未定义。

其实除了 call 方法，你还可以使用**bind**和**apply**方法来设置函数执行上下文中的 this。

### 2. 通过对象调用方法设置

要改变函数执行上下文中的 this 指向，除了通过函数的 call 方法来实现外，还可以通过对象调用的方式，比如下面这段代码：

```js
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
  }
}
myObj.showThis()
```

在这段代码中，我们定义了一个 myObj 对象，该对象是由一个 name 属性和一个 showThis 方法组成的，然后再通过 myObj 对象来调用 showThis 方法。执行这段代码，你可以看到，最终输出的 this 值是指向 myObj 的。

所以，你可以得出这样的结论：**使用对象来调用其内部的一个方法，该方法的 this 是指向对象本身的**。

接下来我们稍微改变下调用方式，把 showThis 赋给一个全局对象，然后再调用该对象，代码如下所示：

```js
var myObj = {
  name : " 极客时间 ",
  showThis: function(){
    this.name = " 极客邦 "
    console.log(this)
  }
}
var foo = myObj.showThis
foo()
```

执行这段代码，你会发现 this 又指向了全局 window 对象。

所以通过以上两个例子的对比，你可以得出下面这样两个结论：

- **在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。**
- **通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。**



### 3. 通过构造函数中设置

你可以像这样设置构造函数中的 this，如下面的示例代码：

```js
function CreateObj(){
  this.name = " 极客时间 "
}
var myObj = new CreateObj()
```

在这段代码中，我们使用 new 创建了对象 myObj，那你知道此时的构造函数 CreateObj 中的 this 到底指向了谁吗？

其实，当执行 new CreateObj() 的时候，JavaScript 引擎做了如下四件事：

- 首先创建了一个空对象 tempObj；
- 接着调用 CreateObj.call 方法，并将 tempObj 作为 call 方法的参数，这样当 CreateObj 的执行上下文创建时，它的 this 就指向了 tempObj 对象；
- 然后执行 CreateObj 函数，此时的 CreateObj 函数执行上下文中的 this 指向了 tempObj 对象；
- 最后返回 tempObj 对象。

这样，我们就通过 new 关键字构建好了一个新对象，并且构造函数中的 this 其实就是新对象本身。



## this 的设计缺陷以及应对方案

就我个人而言，this 并不是一个很好的设计，因为它的很多使用方法都冲击人的直觉，在使用过程中存在着非常多的坑。下面咱们就来一起看看那些 this 设计缺陷。

### 1. 嵌套函数中的 this 不会从外层函数中继承

我认为这是一个严重的设计错误，并影响了后来的很多开发者，让他们“前赴后继”迷失在该错误中。我们还是结合下面这样一段代码来分析下：

```js
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
myObj.showThis()
```

我们在这段代码的 showThis 方法里面添加了一个 bar 方法，然后接着在 showThis 函数中调用了 bar 函数，那么现在的问题是：bar 函数中的 this 是什么？

如果你是刚接触 JavaScript，那么你可能会很自然地觉得，bar 中的 this 应该和其外层 showThis 函数中的 this 是一致的，都是指向 myObj 对象的，这很符合人的直觉。但实际情况却并非如此，执行这段代码后，你会发现**函数 bar 中的 this 指向的是全局 window 对象，而函数 showThis 中的 this 指向的是 myObj 对象**。这就是 JavaScript 中非常容易让人迷惑的地方之一，也是很多问题的源头。

**你可以通过一个小技巧来解决这个问题**，比如在 showThis 函数中**声明一个变量 self 用来保存 this**，然后在 bar 函数中使用 self，代码如下所示：

```js
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    var self = this
    function bar(){
      self.name = " 极客邦 "
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)
```

执行这段代码，你可以看到它输出了我们想要的结果，最终 myObj 中的 name 属性值变成了“极客邦”。其实，这个方法的的本质是**把 this 体系转换为了作用域的体系**。

其实，**你也可以使用 ES6 中的箭头函数来解决这个问题**，结合下面代码：

```js
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    var bar = ()=>{
      this.name = " 极客邦 "
      console.log(this)
    }
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)
```

执行这段代码，你会发现它也输出了我们想要的结果，也就是箭头函数 bar 里面的 this 是指向 myObj 对象的。这是因为 ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。

通过上面的讲解，你现在应该知道了 this 没有作用域的限制，这点和变量不一样，所以嵌套函数不会从调用它的函数中继承 this，这样会造成很多不符合直觉的代码。要解决这个问题，你可以有两种思路：

- 第一种是把 this 保存为一个 self 变量，再利用变量的作用域机制传递给嵌套函数。
- 第二种是继续使用 this，但是要把嵌套函数改为箭头函数，因为箭头函数没有自己的执行上下文，所以它会继承调用函数中的 this。



### 2. 普通函数中的 this 默认指向全局对象 window

上面我们已经介绍过了，在默认情况下调用一个函数，其执行上下文中的 this 是默认指向全局对象 window 的。

不过这个设计也是一种缺陷，因为在实际工作中，我们并不希望函数执行上下文中的 this 默认指向全局对象，因为这样会打破数据的边界，造成一些误操作。如果要让函数执行上下文中的 this 指向某个对象，最好的方式是通过 call 方法来显示调用。

这个问题可以通过设置 JavaScript 的“严格模式”来解决。在严格模式下，默认执行一个函数，其函数的执行上下文中的 this 值是 undefined，这就解决上面的问题了。



## 五种场景

- 作为普通函数
- 作为对象方法被调用
- 在 class 方法中调用
- 使用 call apply bind
- 箭头函数

![image-20230910112538518](https://qn.huat.xyz/mac/202309101125547.png)

![image-20230910112633363](https://qn.huat.xyz/mac/202309101126387.png)

![image-20230910112655938](https://qn.huat.xyz/mac/202309101126962.png)



## 总结

首先，在使用 this 时，为了避坑，你要谨记以下三点：

1. 当函数作为对象的方法调用时，函数中的 this 就是该对象；
2. 当函数被正常调用时，在严格模式下，this 值是 undefined，非严格模式下 this 指向的是全局对象 window；
3. 嵌套函数中的 this 不会继承外层函数的 this 值。

最后，我们还提了一下箭头函数，因为箭头函数没有自己的执行上下文，所以箭头函数的 this 就是它外层函数的 this。

## 思考

```js
let userInfo = {
  name:"jack.ma",
  age:13,
  sex:'male',
  updateInfo:function(){
    console.log(1, this)
    // 模拟 xmlhttprequest 请求延时
    setTimeout(function(){
      console.log(2, this)
      this.name = "pony.ma"
      this.age = 39
      this.sex = 'female'
    },100)
  }
}
 
userInfo.updateInfo()
console.log(userInfo)
```

我想通过 updateInfo 来更新 userInfo 里面的数据信息，但是这段代码存在一些问题，你能修复这段代码吗？

```js
let userInfo = {
  name:"jack.ma",
  age:13,
  sex:'male',
  updateInfo:function(){
    console.log(1, this)
    // 模拟 xmlhttprequest 请求延时
    setTimeout(() => {
      console.log(2, this)
      this.name = "pony.ma"
      this.age = 39
      this.sex = 'female'
    },100)
  }
}
 
userInfo.updateInfo()
console.log(userInfo)
```



