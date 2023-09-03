const sidebar = {
  "/pit/": [
    {
      text: "开发经验",
      // collapsed: false,
      items: [
        { text: "npm 踩坑记录", link: "/pit/npm" },
        { text: "PC 踩坑记录", link: "/pit/pc" },
        { text: "H5 踩坑记录", link: "/pit/h5" },
      ],
    },
    {
      text: "调试方法",
      // collapsed: false,
      items: [
        { text: "调试方法", link: "/pit/debug/调试方法" },
        { text: "远程调试", link: "/pit/debug/远程调试" },
      ],
    },
    {
      text: "常见效果",
      collapsed: false,
      items: [
        { text: "目录", link: "/pit/commonEffect/index" },
        { text: "弹幕效果", link: "/pit/commonEffect/弹幕效果" },
      ],
    },
  ],
};

export default sidebar;
