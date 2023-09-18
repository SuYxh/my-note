const LRUCache = function (capacity) {
  this.keys = [];
  this.cache = Object.create(null);
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (this.cache[key]) {
    // 调整位置
    remove(this.keys, key);
    this.keys.push(key);
    return this.cache[key];
  }
  return -1;
};

LRUCache.prototype.put = function (key, value) {
  if (this.cache[key]) {
    // 存在即更新
    this.cache[key] = value;
    remove(this.keys, key);
    this.keys.push(key);
  } else {
    // 不存在即加入
    this.keys.push(key);
    this.cache[key] = value;
    // 判断缓存是否已超过最大值
    if (this.keys.length > this.capacity) {
      removeCache(this.cache, this.keys, this.keys[0]);
    }
  }
};

// 移除 key
function remove(arr, key) {
  if (arr.length) {
    const index = arr.indexOf(key);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

// 移除缓存中 key
function removeCache(cache, keys, key) {
  cache[key] = null;
  remove(keys, key);
}

const cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
cache.get(2); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
cache.get(1); // 返回 -1 (未找到)
cache.get(3); // 返回  3
cache.get(4); // 返回  4

console.log(cache.get(4));
