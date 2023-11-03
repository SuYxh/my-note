var RecentCounter = function () {
  this.queue = [];
};

RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);
  while (this.queue[0] < t - 3000) {
    this.queue.shift();
  }
  return this.queue.length;
};

// 输入：
// ["RecentCounter", "ping", "ping", "ping", "ping"]
// [[], [1], [100], [3001], [3002]]
// 输出：
// [null, 1, 2, 3, 3]

// 解释：
const recentCounter = new RecentCounter();
recentCounter.ping(1); // requests = [1]，范围是 [-2999,1]，返回 1
recentCounter.ping(100); // requests = [1, 100]，范围是 [-2900,100]，返回 2
recentCounter.ping(3001); // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
recentCounter.ping(3002); // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3
recentCounter.ping(3003);
recentCounter.ping(3004);
recentCounter.ping(3005);

console.log(recentCounter.queue);

// 作者：力扣官方题解
// 链接：https://leetcode.cn/problems/number-of-recent-calls/solutions/1467662/zui-jin-de-qing-qiu-ci-shu-by-leetcode-s-ncm1/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
