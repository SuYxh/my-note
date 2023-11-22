// 示例: 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

function handleSum(nums, target) {
  let result = -1;
  const map = new Map();
  // 7, 0 --> 2
  // 2, 1 --> 7

  nums.forEach((item, index) => {
    const diff = target - item;

    map.set(diff, index);

    if (map.get(item) || map.get(item) == 0) {
      result = [map.get(item), index];
    }
  });

  return result;
}

console.log(handleSum([2, 7, 11, 15], 9));
