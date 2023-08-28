const sidebar = {
  "/chatGPT/": [
    {
      text: "openai",
      collapsed: false,
      items: [
        { text: "官网", link: "https://platform.openai.com/" },
        { text: "文档", link: "/chatGPT/openai/index" },
        { text: "Models", link: "/chatGPT/openai/Models" },
        { text: "GPT", link: "/chatGPT/openai/GPT" },
      ],
    },
    {
      text: "使用",
      collapsed: false,
      items: [
        { text: "chatGPT平台", link: "/chatGPT/use/使用资源" },
        { text: "Prompt编写", link: "/chatGPT/use/Prompt" },
        { text: "Prompt资源", link: "/chatGPT/use/Prompt资源" },
      ],
    },
    {
      text: "开发",
      collapsed: false,
      items: [{ text: "开发指南", link: "/chatGPT/develop/index" }],
    },
    {
      text: "学习",
      collapsed: false,
      items: [{ text: "AI 学习资源", link: "/chatGPT/study/AI 学习资源" }],
    },
  ],
};

export default sidebar;
