import type { DefaultTheme } from "vitepress";
import feSidebar from "./modules/feSidebar";
import frameSidebar from "./modules/frameSidebar";
import buildSidebar from "./modules/buildSidebar";
import subjectSidebar from "./modules/subjectSidebar";
import pit from "./modules/pitSidebar";
import toolSidebar from "./modules/toolSidebar";
import interviewSidebar from "./modules/interviewSidebar";
import afterEndSidebar from "./modules/afterEndSidebar";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  // 前端基础
  ...feSidebar,
  // 框架
  ...frameSidebar,
  // 构建部署
  ...buildSidebar,

  ...pit,
  ...subjectSidebar,
  ...toolSidebar,
  ...interviewSidebar,
  ...afterEndSidebar,
};
