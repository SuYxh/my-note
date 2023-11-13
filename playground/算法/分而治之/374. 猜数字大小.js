/**
 * Forward declaration of guess API.
 * @param {number} num -> your guess
 * @return -1 if num is higher than the picked number
 *         1 if num is lower than the picked number
 *         otherwise return 0
 * var guess = function(num) {}
 */

// 二分查找
var guessNumber = function (n) {
  let low = 1;
  let high = n;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let res = guess(mid);

    if (res === 0) {
      return mid;
    } else if (res < 0) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1;
};

// 分而治之
var guessNumber = function (n) {
  function divideAndConquer(low, high) {
    if (low > high) {
      return -1;
    }

    const mid = Math.floor((low + high) / 2);
    const res = guess(mid);

    if (res === 0) {
      return mid;
    } else if (res === -1) {
      return divideAndConquer(low, mid - 1);
    } else {
      return divideAndConquer(mid + 1, high);
    }
  }
  return divideAndConquer(1, n);
};
