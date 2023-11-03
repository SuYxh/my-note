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
  let result = [];

  const bfs = (root) => {
    const queue = [];
    queue.push([root, 0]);

    while (queue.length) {
      const [el, level] = queue.shift();

      if (!result[level]?.length) {
        result[level] = [];
      }

      result[level].push(el.val);

      if (el.left) {
        queue.push([el.left, level + 1]);
      }

      if (el.right) {
        queue.push([el.right, level + 1]);
      }
    }
  };

  bfs(root);

  return result;
}

console.log(maxDepth(tree));
