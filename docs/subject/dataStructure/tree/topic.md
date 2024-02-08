## 题目

### [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

给定一个二叉树 `root` ，返回其最大深度。

二叉树的 **最大深度** 是指从根节点到最远叶子节点的最长路径上的节点数。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308291247182.jpg)

```
输入：root = [3,9,20,null,null,15,7]
输出：3
```

#### 解析

![image-20230829124902881](https://qn.huat.xyz/mac/202308291249903.png)

![image-20230829124934145](https://qn.huat.xyz/mac/202308291249167.png)

#### 答案

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let res = 0;

  const dfs = (root, l) => {
    if (!root) return;

    // 叶子结点去做刷新
    if (!root.left && !root.right) {
      res = Math.max(res, l);
    }

    dfs(root.left, l + 1);
    dfs(root.right, l + 1);
  };

  dfs(root, 1);

  return res;
};
```

### [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明：**叶子节点是指没有子节点的节点。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308291302567.jpg)

```
输入：root = [3,9,20,null,null,15,7]
输出：2
```

**示例 2：**

```
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
```

#### 解析

思路 1: 深度优先遍历

使用深度优先遍历，取出层级的最小值，这样会遍历所有的节点，会比较慢，所以采用广度优先遍历

思路 2:广度优先遍历

![image-20230829130525071](https://qn.huat.xyz/mac/202308291305108.png)

![image-20230829130600793](https://qn.huat.xyz/mac/202308291306822.png)

#### 答案

```
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if(!root) {
        return 0
    }

    const q= [[root, 1]]
    while(q.length) {
        const [n, l] = q.shift()

        if(n.left) {
            q.push([n.left, l+1])
        }
        if(n.right) {
            q.push([n.right, l + 1])
        }

        if (!n.left && !n.right) {
            return l
        }
    }
};
```

### [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

给你二叉树的根节点 `root` ，返回其节点值的 **层序遍历** 。 （即逐层地，从左到右访问所有节点）。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308291316272.jpg)

```
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
```

**示例 2：**

```
输入：root = [1]
输出：[[1]]
```

**示例 3：**

```
输入：root = []
输出：[]
```

#### 解析

![image-20230829132652860](https://qn.huat.xyz/mac/202308291326887.png)

![image-20230829132723541](https://qn.huat.xyz/mac/202308291327589.png)

#### 答案

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  const q = [[root, 0]];
  const arr = [];
  while (q.length) {
    let [n, l] = q.shift();
    console.log(n.val, l);

    if (arr[l] && arr[l].length) {
      arr[l].push(n.val);
    } else {
      arr[l] = [n.val];
    }

    if (n.left) {
      q.push([n.left, l + 1]);
    }

    if (n.right) {
      q.push([n.right, l + 1]);
    }
  }

  return arr;
};
```

优化版：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  const q = [root];
  const arr = [];
  while (q.length) {
    let len = q.length;
    arr.push([]);
    while (len--) {
      let n = q.shift();

      arr[arr.length - 1].push(n.val);

      if (n.left) {
        q.push(n.left);
      }

      if (n.right) {
        q.push(n.right);
      }
    }
  }

  return arr;
};
```

### [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

给定一个二叉树的根节点 `root` ，返回 _它的 **中序** 遍历_ 。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308292118584.jpg)

```
输入：root = [1,null,2,3]
输出：[1,3,2]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：[1]
```

#### 解析

就是 中序遍历

#### 答案

递归版

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = [];

  const rec = (n) => {
    if (!n) {
      return;
    }

    rec(n.left);
    res.push(n.val);
    rec(n.right);
  };

  rec(root);

  return res;
};
```

非递归版

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let p = root;

  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    res.push(n.val);
    p = n.right;
  }

  return res;
};
```

### [112. 路径总和](https://leetcode.cn/problems/path-sum/)

给你二叉树的根节点 `root` 和一个表示目标和的整数 `targetSum` 。判断该树中是否存在 **根节点到叶子节点** 的路径，这条路径上所有节点值相加等于目标和 `targetSum` 。如果存在，返回 `true` ；否则，返回 `false` 。

**叶子节点** 是指没有子节点的节点。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308292233990.jpg)

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
解释：等于目标和的根节点到叶节点路径如上图所示。
```

**示例 2：**

![img](https://qn.huat.xyz/mac/202308292233474.jpg)

```
输入：root = [1,2,3], targetSum = 5
输出：false
解释：树中存在两条根节点到叶子节点的路径：
(1 --> 2): 和为 3
(1 --> 3): 和为 4
不存在 sum = 5 的根节点到叶子节点的路径。
```

**示例 3：**

```
输入：root = [], targetSum = 0
输出：false
解释：由于树是空的，所以不存在根节点到叶子节点的路径。
```

#### 解析

![image-20230829223808280](https://qn.huat.xyz/mac/202308292238332.png)

![image-20230829223828458](https://qn.huat.xyz/mac/202308292238490.png)

#### 答案

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }
  let res = false;
  const dfs = (n, s) => {
    console.log(n.val, s);
    if (!n.left && !n.right && s === targetSum) {
      res = true;
    }
    if (n.left) {
      dfs(n.left, s + n.left.val);
    }
    if (n.right) {
      dfs(n.right, s + n.right.val);
    }
  };

  dfs(root, root.val);

  return res;
};
```
