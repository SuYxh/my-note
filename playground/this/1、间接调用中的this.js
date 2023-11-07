var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function (fn) {
    fn();
    arguments[0]();
  },
};
obj.method(fn, 1);

/**
 * 析: 这个问题考察的是this的指向以及arguments对象的使用。

fn()直接调用，没有明确的调用者，因此this指向全局对象（在非严格模式下）。在浏览器中，this.length将会输出全局变量length的值，即10。
arguments[0]()是在obj.method内部调用的，此时arguments[0]等于fn，但由于是通过arguments对象调用，this指向arguments对象，而arguments对象的length属性表示传递给函数的参数个数，这里传递了两个参数(fn和1)，因此输出2。
 */
