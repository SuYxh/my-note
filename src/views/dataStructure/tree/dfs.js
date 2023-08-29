const root = {
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

// 基础dfs 【递归版】
function dfsRecursion(root) {
  console.log("dfs 递归版", root.val); // 访问当前节点
  root.children.forEach((child) => {
    dfsRecursion(child); // 递归访问子节点
  });
}

// 基础dfs 【stack版】
function dfsStack(root) {
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const n = stack.pop();
    console.log("dfs stack版", n.val);
    for (let i = n.children.length - 1; i >= 0; i--) {
      stack.push(n.children[i]);
    }
  }
}

// dfs 遍历时携带父级元素和层级 【递归版】
function dfsLevelRecursion(root, parent = null, level = 0) {
  // 打印当前元素、父级元素和层级
  console.log(`当前元素: ${root.val}`);
  console.log(`父级元素: ${parent ? parent.val : null}`);
  console.log(`层级: ${level}`);

  for (const child of root.children) {
    dfsLevelRecursion(child, root, level + 1);
  }
}

//  dfs 遍历时携带父级元素和层级 【stack版】
function dfsLevelStack(root) {
  const stack = [];
  stack.push({ node: root, parent: null, level: 0 });

  while (stack.length > 0) {
    const { node, parent, level } = stack.pop();

    // 打印当前元素、父级元素和层级
    console.log(`当前元素: ${node.val}`);
    console.log(`父级元素: ${parent ? parent.val : null}`);
    console.log(`层级: ${level}`);

    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push({ node: node.children[i], parent: node, level: level + 1 });
    }
  }
}

// dfsRecursion(root)
// dfsStack(root)

// dfsLevelRecursion(root)
// dfsLevelStack(root)

export default {
  root,
  dfsRecursion,
  dfsStack,
  dfsLevelStack,
  dfsLevelRecursion,
};
