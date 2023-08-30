// #region mergedRequest

const apiEndpoints = [
  "https://api.example.com/data1",
  "https://api.example.com/data2",
  "https://api.example.com/data3",
];

const promises = apiEndpoints.map((endpoint) => {
  return fetch(endpoint).then((response) => response.json());
});

Promise.all(promises)
  .then((results) => {
    // 合并所有结果
    const mergedResult = results.reduce((acc, result) => {
      return { ...acc, ...result };
    }, {});
    console.log(mergedResult);
  })
  .catch((error) => {
    // 处理错误
    console.error(`发生错误: ${error}`);
  });

// #endregion mergedRequest
