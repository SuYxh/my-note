/**
 * 某停车场，分 3 层，每层 100 车位，每个车位可以监控车辆的进入和离开。
 * 车辆进入前，显示每层的空余车位数量，
 * 车辆进入时，摄像头可识别车牌号和时间
 * 车辆出来时，出口显示器显示车牌号和停车时长
 */

// 停车信息
interface IEntryInfo {
  number: string;
  inTime: number;
  place?: ParkPlace; // 车位
}

class Car {
  number: string;
  constructor(number: string) {
    this.number = number;
  }
}

// 入口摄像头
class ParkCamera {
  shot(car: Car): IEntryInfo {
    return {
      number: car.number,
      inTime: Date.now(),
    };
  }
}

// 出口显示器
class ParkScreen {
  show(info: IEntryInfo) {
    const { number, inTime } = info;
    const duration = Date.now() - inTime; // 停车时长
    console.log(`车牌号 ${number}，停车时长 ${duration}`);
  }
}

// 车位
class ParkPlace {
  isEmpty = true;
  getInto() {
    this.isEmpty = false;
  }
  out() {
    this.isEmpty = true;
  }
}

// 层
class ParkFloor {
  index: number;
  parkPlaces: ParkPlace[];
  constructor(index: number, places: ParkPlace[]) {
    this.index = index;
    this.parkPlaces = places;
  }
  get emptyPlaceNum(): number {
    let num = 0;
    for (const place of this.parkPlaces) {
      if (place.isEmpty) num++;
    }
    return num;
  }
}

// 停车场
class Park {
  parkFloors: ParkFloor[];
  parkCamera = new ParkCamera();
  parkScreen = new ParkScreen();
  entryInfoList: Map<string, IEntryInfo> = new Map(); // key car.number
  constructor(floors: ParkFloor[]) {
    this.parkFloors = floors;
  }
  getInto(car: Car) {
    // 调用摄像头拍照
    const entryInfo = this.parkCamera.shot(car);
    // 某个车位
    const i = Math.round((Math.random() * 100) % 100);
    const place = this.parkFloors[0].parkPlaces[i]; // 停在第一层的某个车位
    // 进入车位
    place.getInto();
    // 记录停车信息
    entryInfo.place = place;
    this.entryInfoList.set(car.number, entryInfo); // key value
  }

  out(car: Car) {
    // 获取停车信息
    const entryInfo = this.entryInfoList.get(car.number);
    if (entryInfo == null) return;
    const { place } = entryInfo;
    if (place == null) return;

    // 从车位离开
    place.out();

    // 出口显示屏，显示
    this.parkScreen.show(entryInfo);

    // 删除停车信息的记录
    this.entryInfoList.delete(car.number);
  }

  get emptyInfo(): string {
    return this.parkFloors
      .map((floor) => {
        return `${floor.index} 层还有 ${floor.emptyPlaceNum} 个空闲车位`;
      })
      .join("\n");
  }
}

// 初始化停车场
const floors: ParkFloor[] = [];
// 3 层
for (let i = 0; i < 3; i++) {
  const places: ParkPlace[] = [];
  // 每层 100 个车位
  for (let i = 0; i < 100; i++) {
    places[i] = new ParkPlace();
  }
  floors[i] = new ParkFloor(i + 1, places);
}
const park = new Park(floors);
// console.log('park', park)

const car1 = new Car("A1");
const car2 = new Car("A2");
const car3 = new Car("A3");

document.getElementById("btn-car1-into")?.addEventListener("click", () => {
  console.log("第一辆车即将进入");
  console.log(park.emptyInfo);
  park.getInto(car1);
});
document.getElementById("btn-car1-out")?.addEventListener("click", () => {
  console.log("第一辆车离开");
  park.out(car1);
});
document.getElementById("btn-car2-into")?.addEventListener("click", () => {
  console.log("第二辆车即将进入");
  console.log(park.emptyInfo);
  park.getInto(car2);
});
document.getElementById("btn-car2-out")?.addEventListener("click", () => {
  console.log("第二辆车离开");
  park.out(car2);
});
document.getElementById("btn-car3-into")?.addEventListener("click", () => {
  console.log("第三辆车即将进入");
  console.log(park.emptyInfo);
  park.getInto(car3);
});
document.getElementById("btn-car3-out")?.addEventListener("click", () => {
  console.log("第三辆车离开");
  park.out(car3);
});

export default {};
