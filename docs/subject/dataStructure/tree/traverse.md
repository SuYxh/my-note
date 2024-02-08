# 树-遍历专题

![download-2](https://qn.huat.xyz/mac/202308271933850.jpg)

## 深度优先遍历

![download-3](https://qn.huat.xyz/mac/202308271933081.jpg)

### 代码

```js
const tree = {
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

const dfs = (root) => {
  console.log(root.val);
  root.children.forEach(dfs);
};

dfs(tree);
```

## 广度优先遍历

![download-5](https://qn.huat.xyz/mac/202308271935160.jpg)

### 代码

```js
const tree = {
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

const bfs = (root) => {
  const q = [root];
  while (q.length > 0) {
    const n = q.shift();
    console.log(n.val);
    n.children.forEach((child) => {
      q.push(child);
    });
  }
};

bfs(tree);
```

## 二叉树

![download-2](https://qn.huat.xyz/mac/202308271939161.jpg)

### 先序遍历

![download-3](https://qn.huat.xyz/mac/202308271940607.jpg)

#### 代码

递归版本

```js
const preorder = (root) => {
  if (!root) {
    return;
  }
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
};
```

非递归版本

```js
const preorder = (root) => {
  if (!root) {
    return;
  }
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
};
```

### 中序遍历

![download-4](https://qn.huat.xyz/mac/202308271947339.jpg)

#### 代码

```js
const inorder = (root) => {
  if (!root) {
    return;
  }
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
};
```

非递归版

```js
const inorder = (root) => {
  if (!root) {
    return;
  }
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
};
```

### 后序遍历

![download-5](https://qn.huat.xyz/mac/202308271948206.jpg)

#### 代码

```js
const postorder = (root) => {
  if (!root) {
    return;
  }
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
};
```

非递归版

```js
const postorder = (root) => {
  if (!root) {
    return;
  }
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    outputStack.push(n);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
};
```
