import {
  generateSingleLinkedList,
  SingleListNode,
} from "./singlyLinkedList.js";

const l1 = generateSingleLinkedList([2, 4, 3]);
const l2 = generateSingleLinkedList([5, 6, 4]);

function addTwoNumbers(l1, l2) {
  let l3 = new SingleListNode(0);

  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let num = 0;

  while (p1 || p2) {
    const val1 = p1 ? p1.value : 0;
    const val2 = p2 ? p2.value : 0;
    const val = val1 + val2 + num;

    num = Math.floor(val / 10);
    p3.next = new SingleListNode(val % 10);

    if (p1) {
      p1 = p1.next;
    }
    if (p2) {
      p2 = p2.next;
    }
    p3 = p3.next;
  }

  if (num) {
    p3.next = new SingleListNode(num);
  }

  return l3.next;
}

setTimeout(() => {
  const result = addTwoNumbers(l1, l2);
  console.log(result);
}, 500);
