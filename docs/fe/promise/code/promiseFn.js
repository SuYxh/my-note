// #region myCatch
Promise.prototype.myCatch = function (onRejected) {
  return this.then(undefined, onRejected);
};
// #endregion myCatch

// #region myFinally
Promise.prototype.myFinally = function (onFinally) {
  return this.then(
    (value) => {
      return Promise.resolve(onFinally()).then(() => value);
    },
    (reason) => {
      return Promise.resolve(onFinally()).then(() => {
        throw reason;
      });
    }
  );
};
// #endregion myFinally

// #region myAll

Promise.prototype.myAll = function (iterable) {
  const tasks = Array.from(iterable);
  if (tasks.length === 0) {
    return Promise.resolve([]);
  }
  if (tasks.every((task) => !(task instanceof Promise))) {
    return Promise.resolve(tasks);
  }

  return new Promise((resolve, reject) => {
    let values = new Array(tasks.length).fill(null);
    let fulfillCount = 0;

    tasks.forEach((task, index, arr) => {
      if (task instanceof Promise) {
        task.then(
          (value) => {
            fulfillCount++;
            values[index] = value;

            if (fulfillCount === arr.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      } else {
        fulfillCount++;
        values[index] = task;
      }
    });
  });
};
// #endregion myAll
