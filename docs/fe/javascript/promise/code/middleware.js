// #region middleware

function middleware1(data) {
  return new Promise((resolve) => {
    // 进行操作
    resolve(transformedData1);
  });
}

function middleware2(data) {
  return new Promise((resolve) => {
    // 进行操作
    resolve(transformedData2);
  });
}

doSomething()
  .then((result) => middleware1(result))
  .then((modifiedResult) => middleware2(modifiedResult))
  .then((finalResult) => {
    // 处理最终结果
    console.log(`最终结果为: ${finalResult}`);
  })
  .catch((error) => {
    // 处理错误
    console.error(`发生错误: ${error}`);
  });

// #endregion middleware1
