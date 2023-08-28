import type { DefaultTheme } from "vitepress";
import feBase from "./modules/feBase";
import frame from "./modules/frame";
import build from "./modules/build";
import tools from "./modules/tools";
import chatgpt from "./modules/chatgpt";
import pit from "./modules/pit";
import me from "./modules/me";
import computerBase from "./modules/computerBase";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "我的项目", link: "/nav", activeMatch: "^/nav" },
  // 前端基础
  feBase,
  // 框架
  frame,
  // { text: '源码阅读', link: '/analysis/utils/only-allow', activeMatch: '^/analysis' },
  // 构建部署
  build,
  // 工具
  tools,
  // 计算机基础
  computerBase,
  // 踩坑记录
  pit,
  // chatgpt
  chatgpt,
  // 关于我
  me,
];
