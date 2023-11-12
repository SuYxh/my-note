## 请实现 DOM2JSON 一个函数

## 描述

请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式

```js
<div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

把上诉dom结构转成下面的JSON格式

{
  tag: 'DIV',
  children: [
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

```

## 代码

```js
function dom2Json(domtree) {
  let obj = {};
  obj.name = domtree.tagName;
  obj.children = [];
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)));
  return obj;
}
```

```js
function _render(dom) {
  let root = null;

  const dfs = (dom, parentNode) => {
    console.log(dom.tagName, dom.nodeType);
    const attributes = {};
    for (let attr of dom.attributes) {
      attributes[attr.name] = attr.value;
    }
    const node = new TreeNode(dom.tagName, attributes);

    if (parentNode) {
      parentNode.children.push(node);
    } else {
      root = node;
    }

    if (dom.childNodes?.length) {
      dom.childNodes?.forEach((child) => dfs(child, node));
    }
  };

  dfs(dom, null);

  return root;
}
```

```js
function _render2(dom) {
  let root = null;

  const dfs = (dom, parentNode) => {
    if (dom.nodeType === Node.TEXT_NODE) {
      // Handle text nodes by adding them directly to the parent node
      parentNode.text = (parentNode.text || "") + dom.nodeValue;
    } else if (dom.nodeType === Node.ELEMENT_NODE) {
      // Convert attributes to a regular object
      const attributes = {};
      for (let attr of dom.attributes) {
        attributes[attr.name] = attr.value;
      }
      const node = new TreeNode(dom.tagName.toLowerCase(), attributes);

      // Add the new node to the parent, or set it as root if there's no parent
      if (parentNode) {
        parentNode.children.push(node);
      } else {
        root = node;
      }

      // Recursively process all child nodes
      dom.childNodes.forEach((child) => dfs(child, node));
    }
  };

  dfs(dom, null);

  return root;
}
```
