function createSeries(n) {
  if (n <= 0) {
    return () => 0;
  }
  const recur = createSeries(n - 1);
  return function () {
    return n + recur();
  };
}

const sumUpToFive = createSeries(5);
console.log(sumUpToFive()); // 应该打印什么？
