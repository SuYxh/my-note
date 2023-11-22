/**
dp 数组用于存储每个位置结尾的最长递增子序列的长度。
对于数组中的每个元素 arr[i]，我们查找所有 j < i 的元素 arr[j]，如果 arr[j] < arr[i]，则 arr[i] 可以接在 arr[j] 后面形成一个更长的递增子序列。这时，我们更新 dp[i] 为 dp[j] + 1 和当前 dp[i] 的较大值。
最后，我们在 dp 数组中找到最大值，这就是最长递增子序列的长度。

这种实现的时间复杂度是 n 的平方 是输入数组的长度。对于更大的数据集，可能需要更高效的算法，例如使用二分查找的方法，但基本思路仍然是动态规划
 */

function longestIncreasingSubsequence(arr) {
  if (arr.length === 0) return 0;

  // dp[i] 表示以 arr[i] 结尾的最长递增子序列的长度
  let dp = new Array(arr.length).fill(1);
  let max = 1;

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }

  return max;
}

// 使用示例
let sequence = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestIncreasingSubsequence(sequence)); // 输出最长递增子序列的长度

/**
tails 数组用于存储目前最长的递增子序列。
对于每个输入元素 num，如果它比 tails 数组的最后一个元素大，就将它添加到 tails 数组的末尾，这表示我们找到了一个更长的递增子序列。
如果 num 不比 tails 数组的最后一个元素大，
我们使用二分查找在 tails 数组中找到第一个大于等于 num 的数的位置，
并用 num 替换这个位置上的数。这一步是基于这样的想法：
虽然这可能不会立即增加递增子序列的长度，但它会降低之后元素加入序列的要求，
从而有可能在未来形成更长的递增子序列。
最后，tails 数组的长度就是最长递增子序列的长度。
 */
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;

  let tails = [nums[0]];

  for (let num of nums) {
    if (num > tails[tails.length - 1]) {
      tails.push(num);
    } else {
      // 二分查找在 tails 中找到第一个大于等于 num 的数的位置
      let left = 0;
      let right = tails.length - 1;

      while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (tails[mid] < num) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      tails[left] = num;
    }
  }

  return tails.length;
}

// 使用示例
let sequence2 = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(sequence2)); // 输出最长递增子序列的长度
