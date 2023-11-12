const arr = ["0.1.1", "2.3.3", "0.302.1", "4.2", "4.3.5", "4.3.4.5"];

arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }

    if (s1 === s2) continue;

    return s2 - s1;
  }
});

console.log(arr);

// 版本号比较
function compareVersions(a, b) {
  // debugger
  const arr1 = a.split(".").map(Number);
  const arr2 = b.split(".").map(Number);

  const minLength = Math.min(arr1.length, arr2.length);

  for (let i = 0; i < minLength; i++) {
    if (arr2[i] > arr1[i]) {
      return -1; // 返回负数表示a应该在b前面
    } else if (arr2[i] < arr1[i]) {
      return 1; // 返回正数表示b应该在a前面
    }
  }

  // 长度不同时，短的数组排在前面
  if (arr2.length > arr1.length) {
    return -1;
  } else if (arr2.length < arr1.length) {
    return 1;
  }

  return 0; // 数组相等，返回0
}

function compareVersion2(a, b) {
  const versionA = a.split(".").map(Number);
  const versionB = b.split(".").map(Number);

  const minLength = Math.min(versionA.length, versionB.length);

  for (let i = 0; i < minLength; i++) {
    if (versionA[i] > versionB[i]) {
      return 1;
    } else if (versionA[i] < versionB[i]) {
      return -1;
    }
  }

  if (versionA.length > versionB.length) {
    return 1;
  } else if (versionA.length < versionB.length) {
    return -1;
  }

  return 0;
}

function bubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (compareVersions(arr[j], arr[j + 1]) > 0) {
        // 当前元素大于后一个元素，交换位置
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}
