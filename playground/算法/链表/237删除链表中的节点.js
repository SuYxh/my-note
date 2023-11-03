import list from "./singlyLinkedList.js";
// console.log(list);

// 自己写的 乞丐版
function deleteNode0(list, target) {
  let head = list;
  let current = head;

  while (current.next) {
    console.log(current.value);
    if (current.next.value === target) {
      current.next = current.next.next;
    }
    current = current.next;
  }

  return head;
}

// 标准版
function deleteNode(head, value) {
  if (head === null) {
    return null;
  }

  // 如果要删除的节点是头节点
  if (head.value === value) {
    return head.next;
  }

  let current = head;
  while (current.next !== null) {
    if (current.next.value === value) {
      current.next = current.next.next;
      // return head;
    }
    current = current.next;
  }

  return head;
}

const res = deleteNode0(list, 3);
console.log(res);

export default {};
