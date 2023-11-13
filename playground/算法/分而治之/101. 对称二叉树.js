/**
 * 
 TreeNode 类用于表示二叉树的节点。
isSymmetric 函数检查整棵树是否对称。它主要调用 isMirror 函数。
isMirror 函数递归地检查两棵树（在开始时是输入树的左右子树）是否互为镜像。它首先检查两个节点是否同时为 null（如果是，则它们互为镜像）。
如果其中一个节点为 null 而另一个不是，或者两个节点的值不相等，那么树不对称。
最后，函数递归地检查当前节点的左子树是否与另一节点的右子树镜像对称，以及当前节点的右子树是否与另一节点的左子树镜像对称。
这个算法的时间复杂度是 O(n)，其中 n 是树中节点的数量，因为我们需要访问树中的每个节点。空间复杂度也是 O(n)，这是由于递归的深度在最坏情况下可以达到树的高度，即树的节点数量。
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function isSymmetric(root) {
  if (root == null) {
    return true;
  }

  return isMirror(root.left, root.right);
}

function isMirror(t1, t2) {
  if (t1 == null && t2 == null) {
    return true;
  }

  if (t1 == null || t2 == null) {
    return false;
  }

  return (
    t1.val === t2.val &&
    isMirror(t1.left, t2.right) &&
    isMirror(t1.right, t2.left)
  );
}
