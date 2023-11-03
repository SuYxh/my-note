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

function minDepth(root) {
  let l = 0;

  const bfs = (root) => {
    const queue = [];
    queue.push(root);

    while (queue.length) {
      l++;
      const el = queue.shift();
      console.log(el.val);
      if (el.left) {
        queue.push(el.left);
      }
      if (el.right) {
        queue.push(el.right);
      }

      if (!el.left && !el.right) {
        return l;
      }
    }
  };

  bfs(root);

  return l;
}

console.log(minDepth(tree));
