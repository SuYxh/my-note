// #region timeout

const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  }, 1000);
});

const timeout = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("请求超时"));
  }, 5000); // 设置5秒的超时时间
});

Promise.race([fetchData, timeout])
  .then((result) => {
    // 处理结果
  })
  .catch((error) => {
    // 处理超时错误
    console.error(error);
  });

// #endregion timeout
