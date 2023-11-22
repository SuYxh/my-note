function curry(fn) {
  let params = [];

  function curried(...args) {
    params = [...params, ...args];
    if (args.length === 0) {
      // 当没有提供新的参数时，执行函数
      const result = fn.apply(this, params);
      params = []; // 清空参数数组以便于后续调用
      return result;
    } else {
      return curried;
    }
  }

  return curried;
}

// 测试函数
function add(...nums) {
  return nums.reduce((acc, num) => acc + num, 0);
}

// 创建柯里化的 add 函数
const curriedAdd = curry(add);

// 使用链式调用
console.log(curriedAdd(1)(2)(3, 5)()); // 需要在最后调用一次无参数的函数来触发计算
