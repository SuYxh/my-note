import list from "./singlyLinkedList.js";

function fanzhuan(list) {
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

const res = fanzhuan(list);
console.log(res);

export default {};
