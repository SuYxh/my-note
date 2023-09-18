/**
 *
 * 听说你会Promise？ 那么如何控制请求并发数呢？
 * https://juejin.cn/post/7219961144584552504?
 *
 *
 * 我如何控制大屏看板 1000个 Echarts 渲染并发?
 * https://juejin.cn/post/7043701993189146654
 */

const delay = function delay(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(interval);
    }, interval);
  });
};
let tasks = [
  () => {
    return delay(1000);
  },
  () => {
    return delay(1003);
  },
  () => {
    return delay(1005);
  },
  () => {
    return delay(1002);
  },
  () => {
    return delay(1004);
  },
  () => {
    return delay(1006);
  },
];

function createRequest(tasks, pool) {
  pool = pool || 5;
  let results = [],
    together = new Array(pool).fill(null),
    index = 0;
  together = together.map(() => {
    return new Promise((resolve, reject) => {
      const run = function run() {
        if (index >= tasks.length) {
          resolve();
          return;
        }
        let old_index = index,
          task = tasks[index++];
        task()
          .then((result) => {
            results[old_index] = result;
            run();
          })
          .catch((reason) => {
            reject(reason);
          });
      };
      run();
    });
  });
  return Promise.all(together).then(() => results);
}

function jk(tasks, pool = 5) {
  let result = [],
    workSpace = new Array(pool).fill(null),
    index = 0;
  workSpace = workSpace.map(() => {
    return new Promise((resolve, reject) => {
      const run = function run() {
        if (index >= tasks.length) {
          resolve();
          return;
        }
        let old_index = index,
          task = tasks[index++];
        task().then((res) => {
          result[old_index] = res;
          run();
        }, reject);
      };
      run();
    });
  });
  return Promise.all(workSpace).then(() => result);
}

createRequest(tasks, 2)
  .then((results) => {
    // 都成功，整体才是成功，按顺序存储结果
    console.log("成功-->", results);
  })
  .catch((reason) => {
    // 只要有也给失败，整体就是失败
    console.log("失败-->", reason);
  });

function createQueueRequest(tasks, pool, callback) {
  if (typeof pool === "function") {
    callback = pool;
    pool = 5;
  }
  if (typeof pool !== "number") pool = 5;
  if (typeof callback !== "function") callback = function () {};
  //------
  class TaskQueue {
    running = 0;
    queue = [];
    results = [];
    pushTask(task) {
      let self = this;
      self.queue.push(task);
      self.next();
    }
    next() {
      let self = this;
      while (self.running < pool && self.queue.length) {
        self.running++;
        let task = self.queue.shift();
        task()
          .then((result) => {
            self.results.push(result);
          })
          .finally(() => {
            self.running--;
            self.next();
          });
      }
      if (self.running === 0) callback(self.results);
    }
  }
  let TQ = new TaskQueue();
  tasks.forEach((task) => TQ.pushTask(task));
}
createQueueRequest(tasks, 2, (results) => {
  console.log(results);
});
