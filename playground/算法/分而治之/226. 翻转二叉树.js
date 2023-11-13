/**
我们定义了 TreeNode 类来表示二叉树的节点。
invertTree 函数接受一个二叉树的根节点作为参数。
如果当前节点不是 null，我们首先交换它的左右子节点。
然后递归地调用 invertTree 函数来翻转当前节点的左子树和右子树。
最后返回翻转后的根节点。

这个算法的时间复杂度是 O(n)，其中 n 是树中节点的数量，因为每个节点都需要访问一次。空间复杂度是 O(h)，其中 h 是树的高度，这是由于递归的深度受树的高度限制。
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function invertTree(root) {
  if (root == null) {
    return null;
  }

  // 交换当前节点的左右子树
  [root.left, root.right] = [root.right, root.left];

  // 递归地翻转左右子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
}
