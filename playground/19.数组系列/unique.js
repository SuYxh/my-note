let arr = [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3];

// [...new Set(arr)]

// filter
// arr.filter((item, index) => arr.indexOf(item) === index)

// reduce
// const newArr = arr.reduce((acc, cur) => {
//   return acc.includes(cur) ? acc : acc.concat(cur)
// }, [])

// console.log(newArr)

function myUnique(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    result.includes(element) ? null : result.push(element);
  }
  return result;
}

// console.log("-->", myUnique(arr))

function unique(arr) {
  let result = [];
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!obj[element]) {
      obj[element] = 1;
      result.push(element);
    }
  }
  return result;
}

function unique4(arr) {
  let result = [];
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!map.has(element)) {
      map.set(element, i);
      result.push(element);
    }
  }
  return result;
}

// console.log(unique4(arr))

function unique2(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const element1 = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const element2 = arr[j];
      if (element2 === element1) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
}

// unique2(arr)
// console.log(arr);
