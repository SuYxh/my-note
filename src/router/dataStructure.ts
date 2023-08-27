import { RouteRecordRaw } from "vue-router";

const dataStructureRoutes: Array<RouteRecordRaw> = [
  {
    path: "/dataStructure",
    name: "dataStructure",
    meta: {
      title: "数据结构",
      path: "/dataStructure",
    },
    component: async () => {
      return await import("@/views/dataStructure/index.vue");
    },
    children: [
      {
        path: "stack",
        name: "stack",
        meta: {
          title: "栈",
          path: "/dataStructure/stack",
        },
        component: async () => {
          return await import("@/views/dataStructure/Stack/index.vue");
        },
      },
      {
        path: "tree",
        name: "tree",
        meta: {
          title: "树",
          path: "/dataStructure/tree",
        },
        component: async () => {
          return await import("@/views/dataStructure/Tree/index.vue");
        },
      },
    ],
  },
];

export default dataStructureRoutes;
