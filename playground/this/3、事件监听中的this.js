var button = {
  clicked: false,
  click: function () {
    this.clicked = true;
    console.log(button.clicked, this.clicked);
    (function () {
      console.log(this.clicked);
    })();
  },
};
button.click();

/**
 * 解析: 这个问题考察了this在不同上下文中的行为。

button.click()调用时，this指向button对象，因此this.clicked被设置为true。
在立即执行函数表达式(IIFE)中，没有绑定外部的this，所以在非严格模式下它的this指向全局对象，在严格模式下this是undefined。
因此，第一个console.log输出true, true，而IIFE中的console.log在非严格模式下输出undefined，在严格模式下会抛出错误。
 */
