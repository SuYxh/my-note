const obj = {
  0: "math",
  1: "chinese",
  2: "elglish",
  sex: undefined,
  score: {
    math: 98,
    chinese: 100,
    elglish: 19,
  },
  reg: /\d+/gim,
  time: new Date(),
  friends: ["tom", "jerry"],
  say: function () {
    console.log("good good study!");
  },
  tag: Symbol("TAG"),
  [Symbol.toStringTag]: "object",
  name: "yxh",
};

obj.xxx = {
  0: obj,
};

export default obj;
