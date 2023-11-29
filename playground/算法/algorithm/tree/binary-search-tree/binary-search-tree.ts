export interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}

const arr: number[] = [];
const preOrderTraverseArray: number[] = [];
const inOrderTraverseArray: number[] = [];
const postOrderTraverseArray: number[] = [];

const bst: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 4,
      left: null,
      right: null,
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 8,
      left: null,
      right: null,
    },
  },
};

/**
 * @description: 二叉树前序遍历
 * @param {ITreeNode} node
 * @return {*}
 */
function preOrderTraverse(node: ITreeNode | null) {
  if (node == null) return;
  // debugger
  // console.log(node.value)
  preOrderTraverseArray.push(node.value);
  preOrderTraverse(node.left);
  // console.log('<--node.left');
  preOrderTraverse(node.right);
  // console.log('-->node.right');
}

/**
 * @description: 二叉树中序遍历
 * @param {ITreeNode} node
 * @return {*}
 */
function inOrderTraverse(node: ITreeNode | null) {
  if (node == null) return;
  inOrderTraverse(node.left);
  // console.log(node.value)
  inOrderTraverseArray.push(node.value);
  inOrderTraverse(node.right);
}

/**
 * @description: 二叉树后序遍历
 * @param {ITreeNode} node
 * @return {*}
 */
function postOrderTraverse(node: ITreeNode | null) {
  if (node == null) return;
  postOrderTraverse(node.left);
  postOrderTraverse(node.right);
  // console.log(node.value)
  postOrderTraverseArray.push(node.value);
}

/**
 * @description: 寻找 BST 里的第 K 小值
 * @param {ITreeNode} node tree node
 * @param {number} k 第几个值
 * @return {*}
 */
export function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node);
  return inOrderTraverseArray[k - 1] || null;
}

export function funcTest() {
  preOrderTraverse(bst);
  inOrderTraverse(bst);
  postOrderTraverse(bst);

  console.log("前序遍历", preOrderTraverseArray);
  console.log("中序遍历", inOrderTraverseArray);
  console.log("后序遍历", postOrderTraverseArray);
  console.log("BST 里的第 3 小值", getKthValue(bst, 3));
}
