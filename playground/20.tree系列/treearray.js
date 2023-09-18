/**
 * @Description 组合接口返回的侧边栏路由为树形结构
 * @param { Array } data 需要处理的数据
 * @return { Array } 组合完成的树形结构
 **/

/**
     转化规则如下：
          const data = [
      {
        parent: 0,
        label: '菜单1',
        id: 1,
      },
      {
        parent: 0,
        label: '菜单2',
        id: 2,
      },
      {
        parent: 0,
        label: '菜单3',
        id: 3,
      },
      {
        parent: 2,
        label: '菜单2-1',
        id: 4,
      },
      {
        parent: 3,
        label: '菜单3-1',
        id: 5,
      },
      {
        parent: 5,
        label: '菜单3-1-1',
        id: 6,
      },
    ];   ===>
    data = [
      {
        parent: 0,
        label: '菜单1',
        id: 1,
      },
      {
        parent: 0,
        label: '菜单2',
        id: 2,
        children:[
          {
            parent: 2,
            label: '菜单2-1',
            id: 4,
          },
        ]
      },
      {
        parent: 0,
        label: '菜单3',
        id: 3,
        children:[
          {
            parent: 3,
            label: '菜单3-1',
            id: 5,
            children:[
              {
                parent: 5,
                label: '菜单3-1-1',
                id: 6,
              },
            ]
          },
        ]
      },
    
    ]; 

     **/
const getSideMenuListToTree = function (data) {
  data ? (data = data) : (data = []);
  let parent = data.filter((item) => item.ParentId == 0); //一级菜单
  let childrens = data.filter((item) => item.ParentId != 0); //子级菜单
  function formatToTree(parent, childrens) {
    parent.forEach((x) => {
      childrens.forEach((v) => {
        if (x.Id == v.ParentId) {
          x.children ? x.children.push(v) : (x.children = [v]);
          formatToTree(x.children, childrens);
        }
      });
    });
  }
  function solveTreeData(parent, list) {
    parent.forEach((item) => {
      list.push({
        label: item.Title,
        path: item.Url,
        children:
          (item.children &&
            item.children.length &&
            solveTreeData(item.children, [])) ||
          [],
      });
    });
    return list;
  }
  formatToTree(parent, childrens);
  let res = solveTreeData(parent, []);
  return res;
};
