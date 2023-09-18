interface IArrayItem {
  id: number;
  name: string;
  parentId: number;
}

interface ITreeNode {
  id: number;
  name: string;
  children?: ITreeNode[];
}

function treeConvertToArray(root: ITreeNode): IArrayItem[] {
  // Map
  const nodeToParent: Map<ITreeNode, ITreeNode> = new Map();

  const arr: IArrayItem[] = [];

  // 广度优先遍历，queue
  const queue: ITreeNode[] = [];
  queue.unshift(root); // 根节点 入队

  while (queue.length > 0) {
    const curNode = queue.pop(); // 出队
    if (curNode == null) break;

    const { id, name, children = [] } = curNode;

    // 创建数组 item 并 push
    const parentNode = nodeToParent.get(curNode);
    const parentId = parentNode?.id || 0;
    const item = { id, name, parentId };
    arr.push(item);

    // 子节点入队
    children.forEach((child) => {
      // 映射 parent
      nodeToParent.set(child, curNode);
      // 入队
      queue.unshift(child);
    });
  }
  console.log(nodeToParent);
  return arr;
}

function treeConvertToArray2(root: ITreeNode): IArrayItem[] {
  const arr: IArrayItem[] = [];
  const map = new Map<ITreeNode, ITreeNode>();

  const queue: ITreeNode[] = [];
  queue.unshift(root);

  while (queue.length > 0) {
    const curNode = queue.pop();
    if (!curNode) {
      break;
    }

    const { id, name } = curNode;
    const parentNode = map.get(curNode);
    const parentId = parentNode?.id || 0;

    arr.push({ id, name, parentId });

    if (curNode.children) {
      curNode.children.forEach((child) => {
        map.set(child, curNode);
        queue.unshift(child);
      });
    }
  }

  return arr;
}

export function funcTest() {
  const obj = {
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
  const arr1 = treeConvertToArray(obj);
  const arr2 = treeConvertToArray2(obj);
  console.info(arr1);
  console.info(arr2);
}
