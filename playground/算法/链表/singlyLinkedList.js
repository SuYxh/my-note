const data = [1, 2, 3, 4, 5];

class SingleListNode {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

export function generateSingleLinkedList(arr) {
  if (!arr.length) {
    return;
  }

  const head = new SingleListNode(arr[0]);
  let pointer = head;

  for (let i = 1; i < arr.length; i++) {
    const newNode = new SingleListNode(arr[i]);
    pointer.next = newNode;
    pointer = newNode;
  }

  return head;
}

const result = generateSingleLinkedList(data);
console.log(result);

export default result;
