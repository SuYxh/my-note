// #region sequentialControl

function sequentialControl(tasks) {
  return new Promise((resolve, reject) => {
    const results = [];

    function runTask(index) {
      if (index >= tasks.length) {
        resolve(results);
        return;
      }

      const task = tasks[index];
      task()
        .then((result) => {
          results.push(result);
          runTask(index + 1);
        })
        .catch(reject);
    }

    runTask(0);
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

// 执行任务
sequentialControl(tasks)
  .then((results) => {
    console.log("所有任务完成");
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });

// #endregion sequentialControl
