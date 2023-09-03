import cliSidebar from "./cliSidebar";

const sidebar = {
  "/workflow/doc/": [
    {
      text: "文档搭建",
      collapsed: false,
      items: [
        { text: "文档搭建", link: "/workflow/doc/index" },
        { text: "配置Algolia", link: "/workflow/doc/vitepress配置Algolia" },
      ],
    },
  ],
  "/workflow/cli/": cliSidebar,
};

export default sidebar;
