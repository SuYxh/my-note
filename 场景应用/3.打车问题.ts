/**
 * 打车问题： 可以打快车和专车，快车每公里 1 元，专车每公里 2 元， 无论什么车，都有车牌号和车辆名称。
 * 打车时，你要启动行程并显示车辆信息
 * 结束行程，显示价格（假定行驶了 5 公里）
 *
 * 请用代码实现
 */

class Car {
  name: string;
  number: string; // 车牌号，字符串
  price = 0;
  constructor(name: string, number: string) {
    this.name = name;
    this.number = number;
  }
}

class ExpressCar extends Car {
  price = 1;
  constructor(name: string, number: string) {
    super(name, number);
  }
}

class SpecialCar extends Car {
  price = 2;
  constructor(name: string, number: string) {
    super(name, number);
  }
}

class Trip {
  car: Car; // 类型是 Car ，这样可以兼容 Car 的子类
  constructor(car: Car) {
    this.car = car;
  }
  start() {
    console.log(`行程开始：name ${this.car.name}, number ${this.car.number}`);
  }
  end() {
    console.log(`行程结束，价格 ${this.car.price * 5}`);
  }
}

// const car = new ExpressCar('桑塔纳', 'A111222')
const car = new SpecialCar("迈腾", "A333444");
const trip = new Trip(car);
trip.start();
trip.end();

export default {};
