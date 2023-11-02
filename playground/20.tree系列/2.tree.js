let testNode = {
  name: "test node",
  level: 0,
  nodes: [
    {
      name: "node 1",
      level: 0,
      nodes: [
        {
          name: "node 1-1",
          level: 0,
          nodes: [
            { name: "node 1-1-1", level: 0, nodes: [] },
            { name: "node 1-1-2", level: 0, nodes: [] },
          ],
        },
        { name: "node 1-2", level: 0, nodes: [] },
      ],
    },
    {
      name: "node 2",
      level: 0,
      nodes: [{ name: "node 2-1", level: 0, nodes: [] }],
    },
    { name: "node 3", level: 0, nodes: [] },
  ],
};

function getNodesLevel(node) {
  let level = 0;
  let queue = [];
  queue.push(node);

  while (queue.length > 0) {
    let currentNode = queue.shift();

    if (currentNode && currentNode.nodes) {
      level = currentNode.level + 1;
      currentNode.nodes.forEach((element) => {
        element.level = level;
        queue.push(element);
      });
    }
  }
}

getNodesLevel(testNode);
console.log(JSON.stringify(testNode));
