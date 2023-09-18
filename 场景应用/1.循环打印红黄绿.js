/**
 *  红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
 */
function red() {
  console.log("red", getTime());
}

function green() {
  console.log("green", getTime());
}

function yellow() {
  console.log("yellow", getTime());
}

function getTime() {
  return new Date().toLocaleTimeString();
}

/**
 * @description: promise 形式
 * @return {*}
 */
async function runPromise() {
  function delay(fn, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn();
        resolve();
      }, time);
    });
  }

  while (true) {
    console.log("即将红灯", getTime());
    await delay(red, 3000);
    console.log("即将绿灯", getTime());
    await delay(green, 1000);
    console.log("即将黄灯", getTime());
    await delay(yellow, 2000);
  }
}

/**
 * @description: callback 形式
 * @return {*}
 */
function runCallback() {
  function task(fn, time, callback) {
    setTimeout(() => {
      fn();
      callback();
    }, time);
  }

  function step() {
    console.log("即将红灯", getTime());
    task(red, "3000", () => {
      console.log("即将绿灯", getTime());
      task(green, "1000", () => {
        console.log("即将黄灯", getTime());

        task(yellow, "2000", step);
      });
    });
  }

  step();
}

runCallback();
