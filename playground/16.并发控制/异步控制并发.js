class TaskQueue {
  running = 0;
  queue = [];
  queueCopy = [];
  results = [];
  index = 0;

  constructor(pool, callback) {
    this.pool = pool;
    this.callback = callback;
  }

  pushTask(task) {
    let self = this;
    self.queue.push(task);
    self.queueCopy.push(task);
    self.next();
  }

  next() {
    let self = this;
    while (self.running < self.pool && self.queue.length) {
      self.running++;
      let task = self.queue.shift();
      self.index++;
      task()
        .then((result) => {
          // self.results.push(result)
          const index = self.queueCopy.findIndex((item) => item === task);
          self.results[index] = result;
        })
        .finally(() => {
          self.running--;
          self.next();
        });
    }
    if (self.running === 0) self.callback(self.results);
  }
}

function createQueueRequest(tasks, pool, callback) {
  if (typeof pool === "function") {
    callback = pool;
    pool = 2;
  }
  if (typeof pool !== "number") pool = 2;
  if (typeof callback !== "function") callback = function () {};
  let TQ = new TaskQueue(pool, callback);
  tasks.forEach((task) => TQ.pushTask(task));
}

const delay = function delay(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("interval", interval);
      resolve(interval);
    }, interval);
  });
};

const tasks = [
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

createQueueRequest(tasks, 2, (results) => {
  console.log(results);
});
