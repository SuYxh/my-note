// 链表节点的构造函数
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// 检测链表是否有环的函数
var hasCycle = function (head) {
  if (head === null) return false;

  let slow = head; // 慢指针
  let fast = head; // 快指针

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next; // 慢指针移动一步
    fast = fast.next.next; // 快指针移动两步

    if (slow === fast) {
      // 如果快慢指针相遇，则表示有环
      return true;
    }
  }

  // 如果快指针到达链表尾部，则表示没有环
  return false;
};
