## 题目

### 模拟极简链表

```js
const a = { val: "a" };
const b = { val: "b" };
const c = { val: "c" };
const d = { val: "d" };
a.next = b;
b.next = c;
c.next = d;

// 在 c 和 d 之间插入 e
const e = { val: "e" };
c.next = e;
e.next = d;

// 删除 e
c.next = d;

// 遍历链表
let p = a;

while (p) {
  console.log(p.val);
  p = p.next;
}
```

### [237. 删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list/)

有一个单链表的 `head`，我们想删除它其中的一个节点 `node`。

给你一个需要删除的节点 `node` 。你将 **无法访问** 第一个节点 `head`。

链表的所有值都是 **唯一的**，并且保证给定的节点 `node` 不是链表中的最后一个节点。

删除给定的节点。注意，删除节点并不是指从内存中删除它。这里的意思是：

- 给定节点的值不应该存在于链表中。
- 链表中的节点数应该减少 1。
- `node` 前面的所有值顺序相同。
- `node` 后面的所有值顺序相同。

**自定义测试：**

- 对于输入，你应该提供整个链表 `head` 和要给出的节点 `node`。`node` 不应该是链表的最后一个节点，而应该是链表中的一个实际节点。
- 我们将构建链表，并将节点传递给你的函数。
- 输出将是调用你函数后的整个链表。

![img](https://qn.huat.xyz/mac/202308252228823.jpg)

```
输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9
```

#### 答案

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

### [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308252231627.jpg)

```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

**示例 2：**

![img](https://qn.huat.xyz/mac/202308252231211.jpg)

```
输入：head = [1,2]
输出：[2,1]
```

**示例 3：**

```
输入：head = []
输出：[]
```

#### 解析

![在这里插入图片描述](https://qn.huat.xyz/mac/202308271341193.gif)

![image-20230825223029946](https://qn.huat.xyz/mac/202308252230973.png)

![image-20230825223241684](https://qn.huat.xyz/mac/202308252232715.png)

#### 答案

```js
var reverseList = function (head) {
  let p1 = head;
  let p2 = null;

  while (p1) {
    const tmp = p1.next;
    p1.next = p2;
    p2 = p1;
    p1 = tmp;
  }

  return p2;
};
```

- 时间复杂度：`O(n)`。
- 空间复杂度：`O(1)`。

### [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308271348567.jpg)

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

**示例 2：**

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

**示例 3：**

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

#### 解析

![image-20230827134954901](https://qn.huat.xyz/mac/202308271349945.png)

![image-20230827135034426](https://qn.huat.xyz/mac/202308271350483.png)

#### 答案

```js
var addTwoNumbers = function (l1, l2) {
  const l3 = new ListNode(0);

  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0;

  while (p1 || p2) {
    const v1 = p1 ? p1.val : 0;
    const v2 = p2 ? p2.val : 0;
    const val = v1 + v2 + carry;
    carry = Math.floor(val / 10);
    p3.next = new ListNode(val % 10);

    if (p1) {
      p1 = p1.next;
    }
    if (p2) {
      p2 = p2.next;
    }

    p3 = p3.next;
  }

  if (carry) {
    p3.next = new ListNode(carry);
  }

  return l3.next;
};
```

### [83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)

给定一个已排序的链表的头 `head` ， _删除所有重复的元素，使每个元素只出现一次_ 。返回 _已排序的链表_ 。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308271403273.jpg)

```
输入：head = [1,1,2]
输出：[1,2]
```

**示例 2：**

![img](https://qn.huat.xyz/mac/202308271403959.jpg)

```
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```

#### 解析

![image-20230827140702048](https://qn.huat.xyz/mac/202308271407104.png)

![image-20230827140732646](https://qn.huat.xyz/mac/202308271407706.png)

#### 答案

```js
var deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }

  return head;
};
```

### [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

给你一个链表的头节点 `head` ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。**注意：`pos` 不作为参数进行传递** 。仅仅是为了标识链表的实际情况。

_如果链表中存在环_ ，则返回 `true` 。 否则，返回 `false` 。

**示例 1：**

![img](https://qn.huat.xyz/mac/202308271432754.png)

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

#### 解析

![image-20230827143201990](https://qn.huat.xyz/mac/202308271432051.png)

![image-20230827143303768](https://qn.huat.xyz/mac/202308271433829.png)

#### 答案

### 双指针反转链表

![](https://qn.huat.xyz/mac/202308271341624.gif)

```js
// 定义一个链表节点类
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// 创建一个链表
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

// 反转链表
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next; // 保存当前节点的下一个节点

    curr.next = prev; // 当前节点指向前一个节点

    prev = curr; // 前一个节点更新为当前节点
    curr = nextTemp; // 当前节点更新为下一个节点
  }

  return prev; // 返回反转后的链表头节点
}

// 打印反转后的链表
function printList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next;
  }
}

const reversedHead = reverseList(node1);
printList(reversedHead);
```

- 时间复杂度：`O(n)`。
- 空间复杂度：`O(1)`。

在上述示例中，我们首先定义了一个链表，并创建了一个包含五个节点的链表。然后，我们使用双指针法来反转该链表。具体步骤如下：

1. 初始化两个指针 `prev` 和 `curr`，初始时分别指向 `null` 和链表的头节点 `head`。
2. 在循环中，使用一个临时变量 `nextTemp` 来保存当前节点 `curr` 的下一个节点。
3. 将当前节点 `curr` 的 `next` 指针指向前一个节点 `prev`，实现反转。
4. 然后将 `prev` 指针更新为当前节点 `curr`，`curr` 指针更新为下一个节点 `nextTemp`。
5. 重复步骤 3 和 4，直到遍历完整个链表。
6. 最后返回反转后的链表的头节点 `prev`。

在示例中，我们还提供了一个用于打印链表的辅助函数 `printList`，以便验证反转是否成功。

### 双指针反转数组

```js
function reverseArray(arr) {
  let left = 0; // 左指针
  let right = arr.length - 1; // 右指针

  while (left < right) {
    // 交换左右指针所指向的元素
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    // 移动指针
    left++;
    right--;
  }

  return arr;
}

const arr = [1, 2, 3, 4, 5];
const reversedArr = reverseArray(arr);
console.log(reversedArr); // 输出：[5, 4, 3, 2, 1]
```

在上述示例中，我们定义了一个 `reverseArray` 方法，它接收一个数组作为参数，并使用双指针的方式将数组进行反转。

算法步骤如下：

1. 初始化左指针 `left` 为 0，右指针 `right` 为数组长度减 1。
2. 使用`while`循环，当左指针小于右指针时执行以下操作：
   - 交换左指针和右指针所指的元素，即将左指针元素与右指针元素进行交换。
   - 左指针向右移动一位，即 `left++`。
   - 右指针向左移动一位，即 `right--`。
3. 循环结束后，返回反转后的数组。

在示例中，我们将数组 `[1, 2, 3, 4, 5]` 传递给 `reverseArray` 方法，并打印出反转后的数组 `[5, 4, 3, 2, 1]`。无论数组是有序还是乱序，双指针法都适用。

### 双指针

双指针可以用于解决多种问题，例如：

1. 判断链表是否有环：使用快慢指针，如果存在环，快指针最终会追上慢指针。
2. 寻找链表的中间节点：使用快慢指针，快指针每次移动两步，慢指针每次移动一步，当快指针到达链表末尾时，慢指针指向的就是中间节点。
3. 寻找数组中的两个数之和/三个数之和等特定目标值：通过设置左右指针，根据当前和与目标值的关系来调整指针位置。
4. 在有序数组中查找满足特定条件的元素：通过设置左右指针，在有序数组中进行二分搜索。

对于双指针问题，并没有固定的代码模板，因为具体问题的要求和约束不同。但是，通常双指针问题可以遵循以下基本思路：

1. 初始化左指针和右指针的位置。
2. 使用循环或其他条件判断语句，移动指针并处理指针所指的元素。
3. 根据问题要求修改指针的移动条件，直到达到问题的结束条件。

虽然双指针问题没有固定的代码模板，但通过理解问题的本质和要求，结合双指针的特性，可以设计出适用于具体问题的双指针算法。需要根据具体问题进行调整和灵活运用。
