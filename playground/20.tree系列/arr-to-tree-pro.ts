const arr = [
  {
    id: 9,
    parent_id: 13,
    type: "menu",
    permissionDesc: "员工管理菜单",
    permissionMark: "userManage",
    permissionName: "员工管理",
  },
  {
    id: 10,
    parent_id: 9,
    type: "button",
    permissionDesc: "为员工分配角色",
    permissionMark: "distributeRole",
    permissionName: "分配角色",
  },
  {
    id: 11,
    parent_id: 9,
    type: "button",
    permissionDesc: "通过 excel 导入员工",
    permissionMark: "importUser",
    permissionName: "导入员工",
  },
  {
    id: 12,
    parent_id: 9,
    type: "button",
    permissionDesc: "删除员工",
    permissionMark: "removeUser",
    permissionName: "删除员工",
  },
  {
    id: 13,
    parent_id: 0,
    type: "",
    permissionDesc: "授权平台",
    permissionMark: "",
    permissionName: "授权平台",
  },
  {
    id: 14,
    parent_id: 13,
    type: "menu",
    permissionDesc: "角色列表菜单",
    permissionMark: "roleList",
    permissionName: "角色列表",
  },
  {
    id: 15,
    parent_id: 14,
    type: "button",
    permissionDesc: "为角色分配权限",
    permissionMark: "distributePermission",
    permissionName: "分配权限",
  },
  {
    id: 16,
    parent_id: 13,
    type: "menu",
    permissionDesc: "为角色分配权限",
    permissionMark: "permissionList",
    permissionName: "权限列表",
  },
  {
    id: 17,
    parent_id: 13,
    type: "menu",
    permissionDesc: "文章排名菜单",
    permissionMark: "articleRanking",
    permissionName: "文章排名",
  },
  {
    id: 18,
    parent_id: 13,
    type: "menu",
    permissionDesc: "创建文章页面",
    permissionMark: "articleCreate",
    permissionName: "创建文章",
  },
];

const convert = (arr: any[]) => {
  // 树的根结点
  let root: any = null;
  // 用于保存在遇见根结点之前的数据
  let _root: any = null;

  const map = new Map();

  arr.forEach((item) => {
    const treeNode = { ...item };

    map.set(item.id, treeNode);

    const parentNode = map.get(item.parent_id);

    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(treeNode);
    }

    if (item.parent_id === 0) {
      if (_root) {
        treeNode.children = [_root];
      }
      root = treeNode;
    } else {
      _root = parentNode;
    }
  });
  return root;
};

export function funcTest() {
  const res = convert(arr);
  console.log(res);
  console.log("-------------------------");
}
