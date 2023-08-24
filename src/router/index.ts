import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import dataStructureRoutes from "./dataStructure";
import Home from "@/views/Home/index.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  ...dataStructureRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
