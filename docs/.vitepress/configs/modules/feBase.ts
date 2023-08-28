const data = {
  text: "前端基础",
  items: [
    {
      text: "JavaScript",
      items: [
        { text: "JavaScript 基础知识", link: "/fe/javascript/types" },
        { text: "ES6 常用知识", link: "/fe/es6/" },
        { text: "TypeScript 基础知识", link: "/fe/typescript/base" },
        { text: "浏览器相关知识", link: "/fe/browser/" },
      ],
    },
    {
      text: "CSS",
      items: [
        { text: "CSS 语法", link: "/fe/css/spec" },
        { text: "CSS 奇淫技巧", link: "/fe/css/tricks" },
        { text: "Sass 常用技巧", link: "/fe/sass/index" },
      ],
    },
  ],
  activeMatch: "^/fe",
};

export default data;
