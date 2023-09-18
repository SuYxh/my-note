function each(obj, cb) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const item = obj[i],
        result = cb.call(item, item, i);
      if (result === false) break;
    }
    return obj;
  }

  const keys = Reflect.ownKeys(obj);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index],
      item = obj[key],
      result = cb.call(item, item, key);
    if (result === false) break;
  }
  return obj;
}

function mergeHook(parentVal, childVal) {
  // 将 undefined、function 合并成一个数组
  // 如果 childVal 不存在，以 parentVal 为准
  if (childVal) {
    // 如果 parentVal 不存在，直接将 childVal 变成数组 ，如果 parentVal 存在，合并成数组
    if (parentVal) {
      // 合并成数组
      return parentVal.concat(childVal);
    } else {
      // 直接将childVal变成数组
      return [childVal];
    }
  } else {
    return parentVal;
  }
}

function mergeOptions(parent, child) {
  // parent: 默认值
  // child ： 传入的值
  let opts = {};

  for (const key in child) {
    // parent[key] 为 undefined
    // child[key] 为  function
    opts[key] = mergeHook(parent[key], child[key]);
  }

  return opts;
}

class CreateElementTagName {
  constructor(tag, options) {
    this.tag = tag;
    this.options = options;
    // this.options = mergeOptions({}, options)   // 将传入的和默认的做一个合并
    this.attributeArray = [];
    this.element = "";
    this.flag = false;
    console.log(this);
    // this.callHook(this, 'beforeCreate')
    // this.callHook(this, 'created')
  }

  setAttribute() {
    each(this.options, (attr, key) => {
      this.attributeArray.push(`${key}="${this.options[key]}"`);
    });
    // class: 'yhx' ==> class = 'yhx'
    this.attributeArray.push(" ");
    return this.attributeArray.join(" ");
  }

  delete(attrName) {
    if (!this.element.includes(attrName)) return;
    const strAry = this.element.split(" ");
    // console.log(strAry)
    for (let i = 0; i < strAry.length; i++) {
      const element = strAry[i];
      if (element.startsWith(attrName)) {
        // console.log(i)
        strAry.splice(1, 1);
        break;
      }
    }
    console.log(strAry);
    this.element = strAry.join("");
    return strAry.join(" ");
  }

  callHook(vm, hookName) {
    console.log("-->", hookName);
    vm.options[hookName]?.forEach((h) => h());
  }

  mixin(obj) {
    // 当前的this -->  Vue
    this.options = mergeOptions(this.options, obj); // 将传入的和默认的做一个合并
    // console.log("mixin--合并：", this.options)
  }

  render() {
    return this.element;
  }

  generatorElement() {
    if (this.tag === "html") {
      CreateElementTagName.getInstance();
    }
    if (this.flag) {
      return;
    }
    const attrs = this.setAttribute();
    // console.log("attrs->", attrs)
    const tagLength = this.tag.length;
    let str = `<${this.tag}></${this.tag}>`;
    const strArray = str.split("");
    strArray.splice(tagLength + 1, 0, " ");
    strArray.splice(tagLength + 2, 0, attrs);
    this.element = strArray.join("");
    return this.element;
  }

  static getInstance() {
    if (!CreateElementTagName.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      CreateElementTagName.instance = new CreateElementTagName();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    this.flag = true;
    return CreateElementTagName.instance;
  }
}

const element = new CreateElementTagName("div", {
  class: "yhx",
  color: "red",
  good: true,
});

const res = element.generatorElement();

const delres = element.delete("class");

const element2 = new CreateElementTagName("html", {
  class: "yhx",
  color: "red",
  good: true,
});

const res2 = element2.generatorElement();
console.log("is->", res === res2);

element.mixin({
  beforeCreate() {
    console.log("mixin --> beforeCreate OK!!!");
  },
});

console.log(res);
console.log(delres);

/*** 生命周期尝试  */

function callHook(vm, hookName) {
  vm.options[hookName]?.forEach((h) => h());
}

class Voc {
  constructor(options) {
    this.defaultOptions = {
      mounted() {
        console.log("mounted");
      },
    };
    this.options = mergeOptions(this.defaultOptions, options);
    callHook(this, "beforeCreate");
    callHook(this, "created");
  }

  static mixin(obj) {
    this.options = mergeOptions(this.options, obj); // 将传入的和默认的做一个合并
  }
}

// Voc.mixin({
//   beforeCreate() {
//     console.log("mixin --> beforeCreate OK!!!")
//   },
// })

const voc = new Voc({
  beforeCreate() {
    console.log("voc beforeCreate OK!!!");
  },
  created() {
    console.log("voc created OK!!!");
  },
});
