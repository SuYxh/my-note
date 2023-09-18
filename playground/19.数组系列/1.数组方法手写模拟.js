Array.prototype.x_forEach = function (callback, content) {
  let self = this,
    i = 0,
    length = self.length;
  content = content == null ? window : content;
  for (; i < length; i++) {
    typeof callback === "function" ? callback.call(content, self[i], i) : null;
  }
};

Array.prototype.x_reduce = function (callback, prev) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (!prev) {
      prev = callback(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }
  return prev;
};

const sum = [1, 2, 3].x_reduce((a, b) => a + b, 0);
const sum2 = [1, 2, 3].reduce((a, b) => a + b, 0);

// console.log(sum, sum2)
