const sidebar = {

  "/subject/chatGPT/": [
    {
      text: "openai",
      collapsed: false,
      items: [
        { text: "官网", link: "https://platform.openai.com/" },
        { text: "我的GPT", link: "https://ask.vuejs.news/#/" },
        { text: "文档", link: "/subject/chatGPT/openai/index" },
        { text: "Models", link: "/subject/chatGPT/openai/Models" },
        { text: "GPT", link: "/subject/chatGPT/openai/GPT" },
      ],
    },
    {
      text: "使用",
      collapsed: false,
      items: [
        { text: "chatGPT平台", link: "/subject/chatGPT/use/使用资源" },
        { text: "Prompt编写", link: "/subject/chatGPT/use/Prompt" },
        { text: "Prompt资源", link: "/subject/chatGPT/use/Prompt资源" },
      ],
    },
    {
      text: "开发",
      collapsed: false,
      items: [{ text: "开发指南", link: "/subject/chatGPT/develop/index" }],
    },
    {
      text: "学习",
      collapsed: false,
      items: [{ text: "AI 学习资源", link: "/subject/chatGPT/study/AI 学习资源" }],
    },
  ],

  "/subject/dataStructure/": [
    {
      text: "数组",
      collapsed: false,
      items: [
        { text: "概念", link: "/subject/dataStructure/array/index" },
        { text: "题目", link: "/subject/dataStructure/array/topic" },
      ],
    },
    {
      text: "栈",
      collapsed: false,
      items: [
        { text: "概念", link: "/subject/dataStructure/stack/index" },
        { text: "题目", link: "/subject/dataStructure/stack/topic" },
      ],
    },
    {
      text: "队列",
      collapsed: false,
      items: [
        { text: "普通队列", link: "/subject/dataStructure/queue/index" },
        { text: "优先队列", link: "/subject/dataStructure/queue/priorityQueue" },
        { text: "题目", link: "/subject/dataStructure/queue/topic" },
      ],
    },
    {
      text: "链表",
      collapsed: false,
      items: [
        { text: "单向链表", link: "/subject/dataStructure/LinkedList/index" },
        {
          text: "双向链表",
          link: "/subject/dataStructure/LinkedList/doubleLinkedList",
        },
        { text: "题目", link: "/subject/dataStructure/LinkedList/topic" },
      ],
    },

    {
      text: "集合",
      collapsed: false,
      items: [
        { text: "概念", link: "/subject/dataStructure/set/index" },
        { text: "题目", link: "/subject/dataStructure/set/topic" },
      ],
    },

    {
      text: "字典",
      collapsed: false,
      items: [
        { text: "概念", link: "/subject/dataStructure/map/index" },
        { text: "题目", link: "/subject/dataStructure/map/topic" },
      ],
    },

    {
      text: "哈希表",
      collapsed: false,
      items: [
        { text: "概念", link: "/subject/dataStructure/hashTable/index" },
        { text: "题目", link: "/subject/dataStructure/hashTable/topic" },
      ],
    },

    {
      text: "树",
      collapsed: false,
      items: [
        { text: "树", link: "/subject/dataStructure/tree/index" },
        { text: "二叉树", link: "/subject/dataStructure/tree/binaryTree" },
        { text: "二叉搜索树", link: "/subject/dataStructure/tree/binarySearchTree" },
        { text: "遍历专题", link: "/subject/dataStructure/tree/traverse" },
        { text: "题目", link: "/subject/dataStructure/tree/topic" },
      ],
    },

    {
      text: "图",
      collapsed: false,
      items: [
        { text: "概念", link: "/subject/dataStructure/graph/index" },
        { text: "题目", link: "/subject/dataStructure/graph/topic" },
      ],
    },
    {
      text: "搜索排序",
      collapsed: false,
      items: [
        { text: "概念", link: "/subject/dataStructure/searchSort/index" },
        { text: "题目", link: "/subject/dataStructure/searchSort/index" },
      ],
    },
  ],

  "/subject/weixin/": [
    {
      text: "小程序",
      collapsed: false,
      items: [
        { text: "简介", link: "/subject/weixin/miniprogram/index" },
        { text: "扫码登录", link: "/subject/weixin/miniprogram/小程序扫码登录" },
      ],
    },
    {
      text: "公众号",
      collapsed: false,
      items: [{ text: "简介", link: "/subject/weixin/gzh/index" }],
    },
  ],

  "/subject/harmonyOS/": [
    {
      text: "鸿蒙开发",
      collapsed: false,
      items: [{ text: "简介", link: "/subject/harmonyOS/index" }],
    },
  ],
};

export default sidebar;
