import type { DefaultTheme } from "vitepress";
import feBase from "./modules/feBase";
import frame from "./modules/frame";
import build from "./modules/build";
import me from "./modules/me";
import subject from "./modules/subject";
import afterEnd from "./modules/afterEnd";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "项目", link: "/nav", activeMatch: "^/nav" },
  // 前端基础
  feBase,
  // 框架
  frame,
  // { text: '源码阅读', link: '/analysis/utils/only-allow', activeMatch: '^/analysis' },
  // 构建部署
  build,
  // 数据库
  afterEnd,
  // 工具
  // { text: "工具", link: "/tools/index", activeMatch: "^/tools" },
  // 计算机基础
  subject,
  // 踩坑记录
  // 关于我
  me,
];
