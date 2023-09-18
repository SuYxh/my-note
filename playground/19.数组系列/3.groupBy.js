function groupBy(array, fn, type = "obj") {
  const groups = {};
  array.forEach((item) => {
    const group = JSON.stringify(fn(item));
    //这里利用对象的key值唯一性的，创建数组
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  // console.log(groups);
  //最后再利用map循环处理分组出来
  if (type === "obj") {
    return groups;
  } else {
    return Object.keys(groups).map((group) => groups[group]);
  }
}

let classData = [
  { key: 1, value: "冷热源班", label: "冷热源班" },
  { key: 2, value: "综合管网班", label: "综合管网班" },
  { key: 3, value: "AOC", label: "AOC" },
  { key: 3, value: "蓝焰班", label: "蓝焰班" },
];

// console.log(groupBy(classData, (item) => {
//   return item.key
// }))

function groupByKey(data, fn) {
  const obj = {};
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const flag = JSON.stringify(fn(element));
    obj[flag] = obj[flag] || [];
    obj[flag].push(element);
  }
  return obj;
}

console.log(
  groupByKey(classData, (item) => {
    return item.key;
  })
);
