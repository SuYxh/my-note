const sidebar = {
  "/afterEnd/node/": [
    {
      text: "基础",
      collapsed: false,
      items: [{ text: "简介", link: "/afterEnd/node/index" }],
    },
  ],

  "/afterEnd/db/": [
    {
      text: "基础",
      collapsed: false,
      items: [{ text: "简介", link: "/afterEnd/db/index" }],
    },
    {
      text: "mysql",
      collapsed: false,
      items: [
        { text: "SQL查询", link: "/afterEnd/db/mysql/SQL查询" }
      ],
    },
    {
      text: "mongodb",
      collapsed: false,
      items: [
        { text: "安装", link: "/afterEnd/db/mongodb/install-mac.md" },
        { text: "基础查询", link: "/afterEnd/db/mongodb/基础查询.md" },
      ],
    },
  ],

  "/afterEnd/nginx/": [
    {
      text: "基础",
      collapsed: false,
      items: [{ text: "简介", link: "/afterEnd/nginx/index" }],
    },
  ],
};

export default sidebar;
