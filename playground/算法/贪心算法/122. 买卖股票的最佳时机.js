/**
 * 
 我们遍历股票价格数组，从第二个元素开始。
如果当前元素的价格比前一个元素的价格高，就将差值添加到利润中。这是基于“贪心算法”的思想，即只要有利可图就进行交易。
最后，返回总利润。
这个算法的时间复杂度是 O(n)，其中 n 是价格数组的长度，因为我们只需要遍历数组一次。空间复杂度是 O(1)，因为我们只需要常数级别的额外空间。
 */

function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}

// 示例
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 输出: 7 (买入1卖出5，买入3卖出6)
console.log(maxProfit([1, 2, 3, 4, 5])); // 输出: 4 (买入1卖出5)
console.log(maxProfit([7, 6, 4, 3, 1])); // 输出: 0 (没有利润)
