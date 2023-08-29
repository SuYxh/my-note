const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: [],
        },
        {
          val: "e",
          children: [],
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: [],
        },
        {
          val: "g",
          children: [],
        },
      ],
    },
  ],
};

// 基础bfs 【递归版】
function bfsRecursion(nodeArray) {
  if (nodeArray.length === 0) {
    return;
  }

  const nextLevel = [];
  for (const node of nodeArray) {
    console.log("bfsRecursion-->", node.val);
    if (node.children && node.children.length > 0) {
      nextLevel.push(...node.children);
    }
  }

  bfsRecursion(nextLevel);
}

// 基础bfs 【stack 版】
function bfsStack(root) {
  const q = [root];
  while (q.length > 0) {
    const n = q.shift();
    console.log("bfsStack -->", n.val);
    n.children.forEach((child) => {
      q.push(child);
    });
  }
}

// bfs 遍历时携带父级元素和层级 【递归版】
function bfsRecursionLevel(nodeArray, level = 0, parent = null) {
  if (nodeArray.length === 0) {
    return;
  }

  const nextLevel = [];
  for (const node of nodeArray) {
    console.log(
      `Level: ${level}, Parent: ${parent ? parent.val : "None"}, Node: ${
        node.val
      }`
    );
    if (node.children && node.children.length > 0) {
      nextLevel.push(...node.children);
    }
  }

  bfsRecursionLevel(nextLevel, level + 1, nodeArray[0]);
}

// bfs 遍历时携带父级元素和层级 【stack版】
function bfsStackLevel(root) {
  const q = [{ node: root, level: 0, parent: null }];

  while (q.length > 0) {
    const { node, level, parent } = q.shift();
    console.log(
      `Level: ${level}, Parent: ${parent ? parent.val : "None"}, Node: ${
        node.val
      }`
    );

    node.children.forEach((child) => {
      q.push({ node: child, level: level + 1, parent: node });
    });
  }
}

// bfsRecursion([tree])
// bfsStack(tree)

// bfsRecursionLevel([tree]);
// bfsStack(tree);

export default {
  tree,
  bfsRecursion,
  bfsStack,
  bfsRecursionLevel,
  bfsStackLevel,
};
