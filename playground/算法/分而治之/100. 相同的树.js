/**
我们定义了 TreeNode 类来表示二叉树的节点。
isSameTree 函数递归地比较两个树的每个节点。
首先检查当前比较的两个节点是否都是 null。如果是，返回 true。
接下来检查两个节点中是否有一个是 null 或者它们的值不相等。如果是，返回 false。
最后递归地调用 isSameTree 函数来分别比较左子树和右子树。
这个算法的时间复杂度和空间复杂度都是 O(n)，其中 n 是树中节点的数量。这是因为我们需要访问树中的每个节点进行比较。
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function isSameTree(p, q) {
  // 如果两个节点都是 null，则认为它们相同
  if (p === null && q === null) {
    return true;
  }

  // 如果其中一个节点是 null，另一个不是，或者它们的值不同，则不相同
  if (p === null || q === null || p.val !== q.val) {
    return false;
  }

  // 递归地比较左子树和右子树
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
