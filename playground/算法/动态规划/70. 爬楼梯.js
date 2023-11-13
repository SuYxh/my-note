// 时间复杂度 O(n)
// 空间复杂度 O(n)

function climbStairs(n) {
  if (n < 2) {
    return 1;
  }

  const dp = [1, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(climbStairs(4));

// 时间复杂度 O(n)
// 空间复杂度 O(1)
function climbStairsPro(n) {
  if (n < 2) {
    return 1;
  }

  let dp0 = 1;
  let dp1 = 1;

  for (let i = 2; i <= n; i++) {
    const tmp = dp0;
    dp0 = dp1;
    dp1 = dp1 + tmp;
  }

  return dp1;
}
