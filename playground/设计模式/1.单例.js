class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    // console.log(SingleDog.instance);
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

// true

console.log(s1 === s2);

class YXH {
  name = "yxh";
}

const a = new YXH();

// console.log('yxh', YXH.instance);
