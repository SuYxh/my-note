const nums1 = [1, 2, 2, 1],
  nums2 = [2, 2];

function jiaoji(nums1, nums2) {
  const arr = [];

  nums1.forEach((item) => {
    if (nums2.includes(item) && !arr.includes(item)) {
      arr.push(item);
    }
  });

  return arr;
}

console.log("-->", jiaoji(nums1, nums2));
