const sidebar = {

  "/tools/": [
    {
      text: "开发常用",
      collapsed: false,
      items: [
        { text: "第三方库", link: "/workflow/doc/index" },
        // { text: "配置Algolia", link: "/workflow/doc/vitepress配置Algolia" },
      ],
    },
  ],

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
};

export default sidebar;
