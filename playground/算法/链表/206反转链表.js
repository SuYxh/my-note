import list from "./singlyLinkedList.js";

function reversal(list) {
  let prev = null;
  let curr = list;

  while (curr) {
    const tmp = curr.next;

    curr.next = prev;

    prev = curr;

    curr = tmp;
  }

  return prev;
}

// const res = reversal(list);
// console.log(res);
