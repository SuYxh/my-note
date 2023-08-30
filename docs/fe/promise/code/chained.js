// #region chained

function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("first");
    }, 1000);
  });
}

function doSomethingElse(p) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(p + "second");
    }, 1000);
  });
}

function doThirdThing(p) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(p + "third");
    }, 1000);
  });
}

doSomething()
  .then((result) => {
    // 处理第一个异步操作的结果
    console.log("1", result);
    return doSomethingElse(result);
  })
  .then((anotherResult) => {
    // 处理第二个异步操作的结果
    console.log("2", anotherResult);
    return doThirdThing(anotherResult);
  })
  .then((finalResult) => {
    // 处理最终的结果
    console.log(`最终结果为: ${finalResult}`);
  })
  .catch((error) => {
    // 处理错误
    console.error(`发生错误: ${error}`);
  });

// #endregion chained
