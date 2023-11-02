const data = [
  {
    name: "a",
    children: [
      { name: "b", children: [{ name: "e" }] },
      { name: "c", children: [{ name: "f" }] },
      { name: "d", children: [{ name: "g" }] },
    ],
  },
  {
    name: "a2",
    children: [
      { name: "b2", children: [{ name: "e2" }] },
      { name: "c2", children: [{ name: "f2" }] },
      { name: "d2", children: [{ name: "g2" }] },
    ],
  },
];

// 深度遍历, 使用递归
function dfs(data) {
  const result = [];
  data.forEach((item) => {
    // item => {name:"a",children:[{name:"a1"}]}
    const map = (data) => {
      result.push(data.name);
      data.children && data.children.forEach((child) => map(child));
    };
    map(item);
  });
  return result.join(",");
}

// 广度遍历, 创建一个执行队列, 当队列为空的时候则结束
function bfs(data) {
  let result = [];
  let queue = data;
  // console.log([...queue])
  while (queue.length > 0) {
    [...queue].forEach((child) => {
      queue.shift();
      result.push(child.name);
      child.children && queue.push(...child.children);
    });
  }
  return result.join(",");
}

// console.log(dfs(data));
function test(tree, curDelLevel = 0) {
  let i = 0;
  if (tree.children) {
    const delLevel = tree.children.length === 1 ? -1 : 0;
    curDelLevel += delLevel;
    tree.delLevel = curDelLevel;
    const arr = tree.children;
    while (arr.length > i) {
      arr[i] = bar(arr[i], curDelLevel);
      i++;
    }
  } else {
    tree.delLevel = curDelLevel;
  }
  return tree;
}
