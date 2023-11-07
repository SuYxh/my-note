function createCounter(start) {
  let count = start;
  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getValue: function () {
      return count;
    },
  };
}

const counterFromFive = createCounter(5);
counterFromFive.increment();
console.log(counterFromFive.getValue()); // 应该打印什么？
counterFromFive.decrement();
console.log(counterFromFive.getValue()); // 应该打印什么？
