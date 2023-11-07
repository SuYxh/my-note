function createCounter() {
  var counter = 0;
  return {
    increment: function () {
      counter++;
    },
    print: function () {
      console.log(counter);
    },
  };
}

var myCounter = createCounter();
myCounter.increment();
myCounter.print(); // 应该打印什么？
