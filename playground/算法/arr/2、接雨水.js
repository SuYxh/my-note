// 使用两个指针从两端遍历数组，根据左右两边的最高柱子的较小值来计算当前位置的积水量，逐步向中间移动。
// 这段代码使用了双指针技术来遍历数组，同时跟踪左右两边的最高柱子。
// 当左边的柱子比右边的矮时，使用左边的最高值来计算积水；
// 反之，则使用右边的最高值。这种方法只需要一次遍历就能计算出总的积水量，
// 时间复杂度为 O(n)，空间复杂度为 O(1)。

function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let result = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        result += leftMax - height[left];
      }

      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        result += rightMax - height[right];
      }

      right--;
    }
  }

  return result;
}

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(height)); // 输出积水的总量
