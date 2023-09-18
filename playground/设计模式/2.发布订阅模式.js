class EventEmitter {
  constructor() {
    this.handles = {};
  }

  on(eventName, cb) {
    if (!this.handles[eventName]) {
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(cb);
  }

  emit(eventName, ...args) {
    // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
    const handlers = this.handles[eventName].slice();
    if (this.handles[eventName]) {
      handlers.forEach((cb) => {
        cb(...args);
      });
    }
  }

  off(eventName, cb) {
    const index = this.handles[eventName].indexOf(cb);
    if (index !== -1) {
      this.handles[eventName].splice(index, 1);
    }
  }

  once(eventName, cb) {
    const fn = () => {
      cb();
      this.off(eventName, fn);
    };
    this.on(eventName, fn);
  }
}

const fn1 = () => {
  console.log("爱XS，爱生活");
};

const fn2 = () => {
  console.log("爱XS，爱面试官");
};

const fn3 = () => {
  console.log("fn3-爱XS，once");
};

const fn4 = () => {
  console.log("fn4-爱XS，once");
};

const bus = new EventEmitter();

bus.on("click", (params) => {
  console.log("XS真好", params);
});

bus.on("click", fn1);
bus.on("click", fn2);

// bus.off("click", fn2)

bus.once("click", fn3);
bus.once("click", fn3);

// eventBus发现一个错误，once绑定多个fn，emit方法采用forEach循环，
// 会执行wrapper，wrapper里的off会删掉handlers里的fn，
// 导致下一次执行forEach循环时handlers索引映射的数据出错，emit应该克隆一份handlers，用克隆的数组forEach

bus.emit("click", "byte");

// bus.emit("click", "byt2")
