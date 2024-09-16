JS 手写



## 树遍历

### DFS



### BFS





## 树结构 -> 树结构

### dom 转 json

1、创建一个 Node 的 class，用于构建树结构

2、使用 dfs 递归的方式遍历原有 树结构 

3、dfs 中需要代入第二个参数，也就是父级：  dfs(node, parent) ，

- 第一次 parent ，赋值给 result，就是要返回的结果
- parent 存在， 就像  parent.children 中 push node



```js
function dom2Json(dom) {
    function Node(tag, attrs = {}, children = []) {
      this.tag = tag?.toLocaleLowerCase();
      this.attrs = attrs;
      this.children = children;
    }

    function getAttribute(dom) {
      const attrs = {};
      const domAttrs = dom.attributes;
      if (domAttrs) {
        for (const element of domAttrs) {
          const { nodeName, nodeValue } = element;
          attrs[nodeName] = nodeValue;
        }
      }

      return attrs;
    }

    let root = {};

    const dfs = (dom, parent) => {
      const node = new Node(dom.tagName, getAttribute(dom));

      if (Array.isArray(parent?.children)) {
        parent.children.push(node);
      } else {
        root = node;
      }

      if (dom.childNodes?.length) {
        dom.childNodes.forEach((item) => {
          if (item.nodeType === 3) {
            const nodeValue = item.nodeValue.trim();
            if (nodeValue) {
              node.children = nodeValue;
            }
          } else if (item.nodeType === 1) {
            dfs(item, node);
          }
        });
      }
    };

    dfs(dom, null);

    return root;
  }

```





### vnode 转 dom

```js
const vnode = {
  tag: 'DIV',
  attrs: {
    id: 'app'
  },
  children: [
    {
      tag: 'div',
      props: {
        onClick: () => alert('hello')
      },
      children: 'click me'
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}

function isEmpty(obj) {
    if (!obj) {
        return true
    }
    return Object.keys(obj).length === 0;
}

function handleAttrs(dom, vnode) {
    if (!isEmpty(vnode.attrs)) {
        Object.keys(vnode.attrs).forEach(key => {
            dom.setAttribute(key, vnode.attrs[key])
        })
    }
}

function handleProps(dom, vnode) {
    if (!isEmpty(vnode.props)){
        Object.keys(vnode.props).forEach(key => {
            if (/^on/gi.test(key)) {
                const fn = key.slice(2).toLocaleLowerCase()
                console.log(fn)
                dom.addEventListener(fn, vnode.props[key])
            }
        })
    }
}

function render(vnode, container) {
    const fragment = document.createDocumentFragment()

    const dfs = (vnode, fragment) => {
        const dom = document.createElement(vnode.tag)
        handleAttrs(dom, vnode)
        handleProps(dom, vnode)

        fragment.appendChild(dom)

        if (Array.isArray(vnode.children)){
            vnode.children.forEach(item => {
                dfs(item, dom)
            })
        } else if (typeof vnode.children === 'string') {
            const text = document.createTextNode(vnode.children)
            dom.appendChild(text)
        }
    }

    dfs(vnode, fragment)


    container.appendChild(fragment)
}

render(vnode, document.body)
```



## 扁平 -> 树结构  

### 数组转树

1、先循环一遍数组，将每一项改编成 树节点 

2、找到顶层节点的标识，将 顶层节点 赋值 给 tree

3、再次循环数组，通过当前项目的 父节点标识，找到父节点，将当前节点插入到父节点中

4、最后返回 tree



```js
const arr2 = [
  { id: 2, name: "部门B", parentId: 1 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 2 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 1, name: "部门A", parentId: 0 },
  { id: 6, name: "部门F", parentId: 3 },
];

function Node(id, name, children = []) {
   this.id = id
   this.name = name
   this.children = children
}

function arr2Tree(arr) {
 let tree = {}
 const map = new Map()

 arr.forEach(({ id, name }) => {
     map.set(id, new Node(id, name))
 })

 arr.forEach(({id, name, parentId}) => {
     const curNode = map.get(id)
     const pNode = map.get(parentId)

     if (parentId === 0) {
         tree = curNode
     } else  {
         if (pNode) {
             pNode.children.push(curNode)
         } else  {
            console.log("树结构有问题")
         }
     }
 })

 return tree
}
```



### 字符串转嵌套对象

```js
const str = 'a.b.c.d'

function str2obj(str) {
    let result = {}
    let p = result
    const arr = str.split('.')

    arr.forEach((key, i) => {
        if (i === arr.length -1) {
            p[key] = null
        } else  {
            p[key] = {}
        }

        p = p[key]
    })

    return result
}

 function str2obj2(str) {
  const arr = str.split('.')
  return arr.reduceRight((initial, key, i) => {
      if (i === arr.length - 1) {
          // { d:null }
          initial[key] = null
          return  initial
      } else  {
          return { [key]: initial }
      }
  }, {})
}

const result = str2obj(str)
console.log(result)
```





## 树结构 ->  扁平

### 树转数组

dfs 第二个参数带上父级信息

```js
const tree = {
  id: 1,
  name: "部门A",
  children: [
    {
      id: 2,
      name: "部门B",
      children: [
        { id: 4, name: "部门D" },
        { id: 5, name: "部门E" },
      ],
    },
    {
      id: 3,
      name: "部门C",
      children: [{ id: 6, name: "部门F" }],
    },
  ],
};


function tree2arr(tree) {
    const  arr = []

    const  dfs = (node, parent) => {
        const obj = { id: node.id, name: node.name, parentId: parent?.id ?? 0 }
        arr.push(obj)

        if (node.children?.length) {
         node.children.forEach(item => dfs(item, node))
        }
    }

    dfs(tree, null)

    return arr
}
```



## 对象操作

### 深拷贝

```js
function deepClone(obj, cache = new Set()) {
  if (obj === null || !obj) {
      return obj
  }

  const type = Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase()
  const Ctor = obj.constructor

  if (/(symbol|bigint)/gi.test(type)) {
   return Object(obj)
  }

  if (/(regexp|date)/gi.test(type)) {
      return new Ctor(obj)
  }

  if (/(error)/gi.test(type)) {
      return new Error(obj.message)
  }

  if (/(function)/gi.test(type)) {
      return function () {
          return obj.call(this, ...arguments)
      }
  }

  if (/(array|object)/gi.test(type)){
      if (cache.has(obj)) {
          return  obj
      }

      cache.add(obj)

      const result = new Ctor()

      Reflect.ownKeys(obj).forEach(key => {
          const  val = obj[key]
          result[key] = deepClone(val, cache)
      })
  }

  return  obj
}
```



### 比较对象是否相等

```js
function deepEqual(obj1, obj2) {
    if (typeof obj1 !== typeof obj2) {
        return  false
    }

    if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
     return  obj1 === obj2
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        return  arrayEqual(obj1, obj2)
    }

    const keys1 = Object.keys(obj1).sort()
    const keys2 = Object.keys(obj2).sort()

    if (keys1.length !== keys2.length) {
        return  false
    }

    for (let i = 0; i < keys1.length; i++) {
        if (keys2[i] !== keys1[i]) {
            return  false
        }

        if (!deepEqual(obj1[keys1[i]], obj2[keys2[i]])) {
            return  false
        }
    }

    return true
}

function arrayEqual(arr1, arr2) {
    const l1 = arr1.length
    const l2 = arr2.length
    if (l1 !== l2){
       return  false
    }

    for(let i = 0; i < l1; i++) {
        if (!deepEqual(arr1[i], arr2[i])) {
            return  false
        }
    }

    return true
}

// isEqual函数，相等输出true，不相等输出false
console.log(deepEqual(obj1, obj2)); // 输出 false
```



### 对象合并

```js
function mergeOptios(options, params) {
   const merged = { ...options }

   Reflect.ownKeys(params).forEach(key => {
       const  val = params[key]

       if (Array.isArray(val)) {
           merged[key] = [...(options[key] ?? []), ...val]
       } else if(typeof val === 'object' && val !== null) {
          merged[key] = mergeOptios((options[key] ?? {}), val)
       } else  {
           merged[key] = val
       }

   })


   return merged
  }
```







## 异步操作

### 并发控制

```js
class  TaskQueue {
    constructor(worker, cb) {
        this.worker= worker
        this.cb = cb
        this.queue = []
        this.running = 0
        this.result = []

        this.resolve = null
        this.reject = null
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }

    push(task) {
        this.queue.push(task)
        this.next()
    }

    next() {
        while (this.queue.length && this.running < this.worker){
            const  task = this.queue.shift()
            const [fn, index] = task
            this.running ++
            Promise.resolve(fn()).then(res => {
                this.result[index] = res
            }).catch(err => {
                if (typeof this.cb === 'function') {
                    this.cb('error')
                }
                this.reject(err)
            }).finally(() => {
                this.running --
                this.next()
            })

        }

        if (this.running === 0) {
            if (typeof this.cb === 'function') {
                this.cb(this.result)
            }
            this.resolve(this.result)
        }
    }

    promisify() {
        return this.promise
    }
}

function limit(tasks, worker, cb) {
    const  queue = new TaskQueue(worker, cb)

    tasks.forEach((task, index) => {
        queue.push([task, index])
    })

    return queue.promisify()
}

// limit(tasks, 2, (result) => {
//     console.log('result', result)
// })

limit(tasks, 2).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```



### promise

```js
Promise.race = function (arr) {
  return new Promise((resolve, reject) => {
      arr.forEach(item => {
          Promise.resolve(item).then(resolve).catch(reject)
      })
  })
}

Promise.all = function (arr) {
  console.log(arr)
  let result = []
  let num = 0
  return new Promise((resolve, reject) => {
      arr.forEach((item, index) => {
          Promise.resolve(item).then(res => {
              result[index] = res
              num++
              if (num === arr.length) {
                  resolve(result)
              }
          }).catch(reject)
      })
  })
}

```





### 调度器







## 递归



## 排序



```js
function bubble(arr) {

  for(let i = 0; i < arr.length-1; i++) {
      for(let j = 0; j < arr.length -1 -i; j++) {
       if (arr[j] > arr[j+1]) {
           [arr[j+1], arr[j]] = [arr[j], arr[j+1]]
       }
      }
  }

  return arr
}
```





```js
function quick(arr) {
  if (arr.length <= 1) {
      return  arr
  }

  const  middleIndex = Math.floor(arr.length / 2)
  const  middleVal = arr[middleIndex]
  arr.splice(middleIndex, 1)

  let leftArr = []
  let rightArr = []

  for (let i= 0; i< arr.length; i++) {
      if (arr[i] > middleVal) {
          rightArr.push(arr[i])
      } else  {
          leftArr.push(arr[i])
      }
  }

  return quick(leftArr).concat(middleVal, quick(rightArr))
}
```

