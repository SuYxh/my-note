const tree = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: {
        val: 7,
      },
      right: {
        val: 2,
      },
    },
  },
  right: {
    val: 8,
    left: {
      val: 13,
    },
    right: {
      val: 4,
      right: {
        val: 1,
      },
    },
  },
};

// 栈实现
function hasPathSum(root, target) {
  if (!root) {
    return false;
  }
  const stack = [];
  stack.push([root, 0]);

  while (stack.length) {
    let [el, sum] = stack.pop();
    console.log(el.val);
    sum += el.val;

    if (!el.left && !el.right && sum === target) {
      return true;
    }

    if (el.left) {
      stack.push([el.left, sum]);
    }

    if (el.right) {
      stack.push([el.right, sum]);
    }
  }

  return false;
}

// 递归实现
function hasPathSum2(root, target) {
  let flag = false;

  const dfs = (root, sum) => {
    console.log(root.val);
    sum += root.val;

    if (!root.left && !root.right && sum === target) {
      flag = true;
    }

    if (root.left) {
      dfs(root.left, sum);
    }

    if (root.right) {
      dfs(root.right, sum);
    }
  };

  dfs(root, 0);

  return flag;
}

console.log(hasPathSum(tree, 22));
console.log(hasPathSum2(tree, 22));
