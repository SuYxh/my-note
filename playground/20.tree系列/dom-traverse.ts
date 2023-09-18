/**
 * @description: 访问dom节点
 * @param {Node} n
 * @return {*}
 */
function visitNode(n: Node) {
  // 注释
  if (n instanceof Comment) {
    console.info("Comment node", n.textContent);
  }
  // 文本
  if (n instanceof Text) {
    const t = n.textContent?.trim();
    if (t) {
      console.info("Text node", t);
    }
  }
  // element
  if (n instanceof HTMLElement) {
    console.info("Element node", `<${n.tagName.toLowerCase()}>`);
  }
}

/**
 * @description: 深度优先遍历 【递归】
 * @param {Node} root
 * @return {*}
 */
function depthFirstTraverse(root: Node) {
  // 操作节点
  visitNode(root);

  // 注意 childNodes 和 children 不一样
  const childNodes = root.childNodes;

  if (childNodes.length) {
    childNodes.forEach((child) => depthFirstTraverse(child));
  }
}

/**
 * @description: 深度优先遍历 【栈】
 * @param {Node} root
 * @return {*}
 */
function depthFirstTraverse1(root: Node) {
  const stack: Node[] = [];

  // 根节点压栈
  stack.push(root);

  while (stack.length > 0) {
    // 出栈
    const curNode = stack.pop();
    if (curNode == null) break;

    visitNode(curNode);

    // 子节点压栈
    const childNodes = curNode.childNodes;
    if (childNodes.length > 0) {
      // reverse 反顺序压栈
      Array.from(childNodes)
        .reverse()
        .forEach((child) => stack.push(child));
    }
  }
}

/**
 * @description: 深度优先遍历 练习
 * @param {any} tree
 * @return {*}
 */
function dfsPractice(tree: any) {
  if (!tree) {
    return;
  }
  const stack = [];
  stack.push(tree);

  while (stack.length > 0) {
    const current: any = stack.pop();
    if (!current) {
      break;
    }

    console.log(current.name);

    if (current.children) {
      // @ts-ignore
      current.children.reverse().forEach((child) => stack.push(child));
    }
  }
}

/**
 * @description: 广度优先遍历
 * @param {Node} root
 * @return {*}
 */
function breadthFirstTraverse(root: Node) {
  const queue: Node[] = []; // 数组 vs 链表

  // 根节点入队列
  queue.unshift(root);

  while (queue.length > 0) {
    const curNode = queue.pop();
    if (curNode == null) break;

    visitNode(curNode);

    // 子节点入队
    const childNodes = curNode.childNodes;
    if (childNodes.length) {
      childNodes.forEach((child) => queue.unshift(child));
    }
  }
}

/**
 * @description: 广度优先遍历 练习
 * @param {any} tree
 * @return {*}
 */
function bfsPractice(tree: any) {
  const queue = [];

  queue.unshift(tree);

  while (queue.length > 0) {
    const cur = queue.pop();
    if (!cur) {
      break;
    }

    console.log(cur.name);

    if (cur.children) {
      // @ts-ignore
      cur.children.reverse().forEach((child) => queue.unshift(child));
    }
  }
}

function domTraverse() {
  const box = document.getElementById("box");
  if (box == null) throw new Error("box is null");
  console.log(
    "======================depthFirstTraverse========================"
  );
  // depthFirstTraverse(box)
  depthFirstTraverse1(box);

  console.log(
    "======================breadthFirstTraverse========================"
  );
  breadthFirstTraverse(box);
}

function practice() {
  const tree = {
    id: 1,
    name: "部门A",
    children: [
      {
        id: 2,
        name: "部门B",
        children: [
          { id: 4, name: "部门D" },
          { id: 5, name: "部门E" },
        ],
      },
      {
        id: 3,
        name: "部门C",
        children: [{ id: 6, name: "部门F" }],
      },
    ],
  };
  console.log("");
  console.log("");
  console.log("");
  console.log("======================dfsPractice========================");
  dfsPractice(tree);
  console.log("======================bfsPractice========================");
  bfsPractice(tree);
}

export function funcTest() {
  domTraverse();
  practice();
}
