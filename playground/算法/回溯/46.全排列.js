// 时间复杂度 O(n!)
// 空间复杂度 O(n)

function permute(nums) {
  const result = [];
  const backtrack = (path) => {
    if (path.length === nums.length) {
      result.push(path);
      return;
    }

    nums.forEach((n) => {
      if (path.includes(n)) {
        return;
      }
      backtrack(path.concat(n));
    });
  };

  backtrack([]);
  return result;
}

console.log(permute([1, 2, 3]));
