const arr = [1, 2, 3, 4, 5, 6];

function handler(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let tmp = arr[start];
    arr[start] = arr[end];
    arr[end] = tmp;

    start++;
    end--;
  }

  return arr;
}

const res = handler(arr);
console.log(res);
