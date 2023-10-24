const sidebar = {
  "/db/mysql/": [
    {
      text: "基础",
      collapsed: false,
      items: [{ text: "SQL查询", link: "/db/mysql/base/index" }],
    },
  ],

  "/db/mongodb/": [
    {
      text: "安装",
      link: "/db/mongodb/install-mac.md",
    },
    {
      text: "基础",
      collapsed: true,
      items: [
        {
          text: "查询",
          link: "/db/mongodb/base/index",
        },
      ],
    },
  ],
};

export default sidebar;
