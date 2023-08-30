// #region concurrentControl1

/**
 * @description: 并发控制
 * @param {*} tasks
 * @param {*} limit
 * @return {*}
 */
function concurrentControl(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedTasks = 0;
    let runningTasks = 0;

    function runTask(task) {
      return new Promise((taskResolve) => {
        task()
          .then((result) => {
            results.push(result);
            completedTasks++;
            runningTasks--;

            if (completedTasks === tasks.length) {
              resolve(results);
            } else {
              runNextTask();
            }

            taskResolve();
          })
          .catch(reject);
      });
    }

    function runNextTask() {
      while (
        runningTasks < limit &&
        completedTasks + runningTasks < tasks.length
      ) {
        const task = tasks[completedTasks + runningTasks];
        runningTasks++;
        runTask(task);
      }
    }

    runNextTask();
  });
}

// 示例任务函数
function delayTask(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${name} 完成`);
      resolve(name);
    }, delay);
  });
}

// 定义一组任务
const tasks = [
  () => delayTask("任务1", 2000),
  () => delayTask("任务2", 1000),
  () => delayTask("任务3", 3000),
  () => delayTask("任务4", 1500),
  () => delayTask("任务5", 2500),
];

// 设置并发限制为2，执行任务
concurrentControl(tasks, 2)
  .then((results) => {
    console.log("所有任务完成");
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });

// #endregion concurrentControl1
