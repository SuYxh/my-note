class Leader {
  constructor(name) {
    this.name = name;
    this.prod = null;
    this.observes = [];
  }

  add(observe) {
    this.observes.push(observe);
  }

  setState(state) {
    this.prod = state;
  }

  notify() {
    this.observes.forEach((observe) => observe.update(this.prod));
  }
}

class Work {
  constructor(name) {
    this.name = name;
    this.doc = null;
  }

  update(state) {
    // console.log('');
    this.doc = state;
    this.work();
  }

  work() {
    console.log(`${this.doc}--${this.name}开始工作啦`);
  }
}

const ui = new Work("ui");
const fe = new Work("yxh");
const boss = new Leader("boss");

boss.add(ui);
boss.add(fe);

boss.setState("新任务发布");
boss.notify();
