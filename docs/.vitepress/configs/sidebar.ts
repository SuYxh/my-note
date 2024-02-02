import type { DefaultTheme } from "vitepress";
import feSidebar from "./modules/feSidebar";
import frameSidebar from "./modules/frameSidebar";
import buildSidebar from "./modules/buildSidebar";
import dataStructureSidebar from "./modules/dataStructureSidebar";
import pit from "./modules/pitSidebar";
import chatgptSidebar from "./modules/chatgptSidebar";
import toolSidebar from "./modules/toolSidebar";
import wxSidebar from "./modules/wxSidebar";
import interviewSidebar from "./modules/interviewSidebar";
import sqlSidebar from "./modules/sqlSidebar";
import standardSidebar from './modules/standardSidebar';

export const sidebar: DefaultTheme.Config["sidebar"] = {
  // 前端基础
  ...feSidebar,
  // 框架
  ...frameSidebar,
  // 构建部署
  ...buildSidebar,

  ...pit,
  ...dataStructureSidebar,
  ...chatgptSidebar,
  ...toolSidebar,
  ...wxSidebar,
  ...interviewSidebar,
  ...sqlSidebar,
  ...standardSidebar
};
