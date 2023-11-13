/**
 *在这个实现中：
subsets 函数初始化结果数组 result。
backtrack 是一个递归函数，它接受两个参数：start 表示当前递归的起始位置，current 是当前生成的子集。
在每次递归调用中，首先将 current 数组的一个副本添加到结果集中，这样可以捕获所有可能的子集，包括空子集。
接着，遍历从 start 开始的所有元素，递归地调用 backtrack 函数，每次递归都向 current 添加一个新元素。
完成对一个元素的所有递归调用后，需要从 current 中移除该元素（这就是所谓的回溯），以便在接下来的迭代中可以正确生成新的子集。
 */

function subsets(nums) {
  let result = [];

  function backtrack(start, current) {
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      // 添加当前元素到子集
      current.push(nums[i]);
      // 递归
      backtrack(i + 1, current);
      // 移除当前元素（回溯）
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

let nums = [1, 2, 3];
let result = subsets(nums);
console.log(result);
