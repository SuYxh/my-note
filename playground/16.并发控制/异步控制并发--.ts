function myRequest(url: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, 3000);
  });
}

function limitRequest(urls: string[] = [], limit: number = 3) {
  console.log("limitRequest", urls, limit);
  return new Promise((resolve, reject) => {
    const len = urls.length;
    let count = 0;

    // 同时启动limit个任务
    while (limit > 0) {
      start();
      limit -= 1;
    }

    function start() {
      if (!urls.length) {
        return;
      }
      const url = urls.shift(); // 从数组中拿取第一个任务
      console.log("start-task", url);
      if (url) {
        myRequest(url)
          .then((res) => {
            // todo
          })
          .catch((err) => {
            // todo
          })
          .finally(() => {
            if (count == len - 1) {
              // 最后一个任务完成
              resolve({});
            } else {
              // 完成之后，启动下一个任务
              count++;
              start();
            }
          });
      }
    }
  });
}

// 测试
limitRequest([
  "http://xxa",
  "http://xxb",
  "http://xxc",
  "http://xxd",
  "http://xxe",
]);
