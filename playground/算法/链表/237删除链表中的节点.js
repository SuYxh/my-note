import list from "./singlyLinkedList.js";

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
    }
    current = current.next;
  }

  return head;
}

const res = deleteNode(list, 3);
console.log(res);

export default {};
