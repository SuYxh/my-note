function isEqual(A, B) {
  const keysA = Object.keys(A);
  const keysB = Object.keys(B);

  // 健长不一致的话就更谈不上相等了
  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];

    // 类型不等的话直接就不相等了
    if (typeof A[key] !== typeof B[key]) return false;

    // 当都不是对象的时候直接判断值是否相等
    if (
      typeof A[key] !== "object" &&
      typeof B[key] !== "object" &&
      A[key] !== B[key]
    ) {
      return false;
    }

    if (Array.isArray(A[key]) && Array.isArray(B[key])) {
      if (!arrayEqual(A[key], B[key])) return false;
    }

    // 递归判断
    if (typeof A[key] === "object" && typeof B[key] === "object") {
      if (!isEqual(A[key], B[key])) return false;
    }
  }

  return true;
}

function arrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

const obj1 = {
  a: 1,
  c: 3,
  b: {
    c: [1, 2],
  },
};
const obj2 = {
  c: 4,
  b: {
    c: [1, 2],
  },
  a: 1,
};

// isEqual函数，相等输出true，不相等输出false

console.log(isEqual(obj1, obj2));
