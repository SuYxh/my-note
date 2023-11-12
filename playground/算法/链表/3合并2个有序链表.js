import {
  generateSingleLinkedList,
  SingleListNode,
} from "./singlyLinkedList.js";

const l1 = generateSingleLinkedList([1, 2, 4]);
const l2 = generateSingleLinkedList([1, 3, 4]);

function mergeTwoLists(l1, l2) {
  let l3 = new SingleListNode(0);

  let p1 = l1;
  let p2 = l2;
  let p3 = l3;

  while (p1 || p2) {
    const val1 = p1.value ? p1.value : 0;
    const val2 = p2.value ? p2.value : 0;

    p3.next = new SingleListNode(val1 > val2 ? val2 : val1);
    p3.next.next = new SingleListNode(val1 > val2 ? val1 : val2);

    if (p1) {
      p1 = p1.next;
    }
    if (p2) {
      p2 = p2.next;
    }
    p3 = p3.next.next;
  }

  return l3.next;
}

setTimeout(() => {
  const result = mergeTwoLists(l1, l2);
  console.log(result);
}, 500);
