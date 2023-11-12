import {
  generateSingleLinkedList,
  SingleListNode,
} from "./singlyLinkedList.js";

const l = generateSingleLinkedList([1, 3, 3, 4]);

function deleteDuplicates(l) {
  let p = l;

  while (p && p.next) {
    if (p.value === p.next.value) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }

  return l;
}

const result = deleteDuplicates(l);
console.log("result", result);
