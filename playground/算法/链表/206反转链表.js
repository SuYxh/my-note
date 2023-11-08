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

// const res = fanzhuan(list);
// console.log(res);

function fz(list) {
  let p1 = list;
  let p2 = null;

  while (p1) {
    const tmp = p1.next;
    p1.next = p2;

    p2 = p1;
    p1 = tmp;
  }

  console.log("p2");
  console.log(p2);
  return p2;
}

const res2 = fz(list);
console.log(res2);

export default {};
