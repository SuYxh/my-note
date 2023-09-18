// https://juejin.cn/post/7212435153573527609

const arr = [50, 25, 10, 5, 90, 60];

function sleepSort(arr) {
  return new Promise((resolve) => {
    const sortedArr = [];
    let sortedCount = 0;

    arr.forEach((num) => {
      setTimeout(() => {
        sortedArr.push(num);
        sortedCount++;

        if (sortedCount === arr.length) {
          resolve(sortedArr);
        }
      }, num);
    });
  });
}

sleepSort(arr).then((sortedArr) => {
  console.log("Sorted array - 1:", sortedArr);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sleepSort2(arr) {
  const sortedArr = [];

  const processNumber = async (num) => {
    await sleep(num);
    sortedArr.push(num);
  };

  const promises = arr.map((num) => processNumber(num));
  await Promise.all(promises);

  return sortedArr;
}

(async () => {
  const sortedArr = await sleepSort2(arr);
  console.log("Sorted array -2 :", sortedArr);
})();
