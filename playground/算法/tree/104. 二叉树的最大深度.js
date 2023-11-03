const tree = {
  val: 3,
  left: {
    val: 9,
  },
  right: {
    val: 20,
    left: {
      val: 15,
    },
    right: {
      val: 7,
    },
  },
};

function maxDepth(root) {
  let l = 0;
  let num = 0;

  // 递归
  // const dfs = (root, level) => {
  //   console.log(root.val);
  //   l = Math.max(l, level);
  //   if (root.left) {
  //     dfs(root.left, level + 1);
  //   }
  //   if (root.right) {
  //     dfs(root.right, level + 1);
  //   }
  // };

  // 栈
  const dfs = (root) => {
    const stack = [];
    stack.push(root);

    while (stack.length) {
      num++;
      const el = stack.pop();
      console.log(el.val);
      if (el.left) {
        stack.push(el.left);
      }
      if (el.right) {
        stack.push(el.right);
      }

      if (!el.left && !el.right) {
        l = Math.max(num, l);
        num = 0;
      }
    }
  };

  dfs(root, 1);

  return l;
}

console.log(maxDepth(tree));
