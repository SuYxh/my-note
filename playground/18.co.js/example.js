const fs = require("fs").promises;
function* read(url) {
  const content = yield fs.readFile(url, "utf-8");
  const age = yield fs.readFile(content, "utf-8");
  const res = yield age + 100;
  return res;
}

function* read2(url) {
  const content = yield fs.readFile(url, "utf-8");
  const content2 = yield fs.readFile(content, "utf-8");
  const res = yield content2 + "Good";
  return res;
}

/* const it = read("./name.txt")
let { value, done } = it.next()
Promise.resolve(value).then(res => {
  console.log(res)
  let { value, done } = it.next(res)
  Promise.resolve(value).then(res => {
    console.log("-->", res)
  })
}) */

function co(it) {
  return new Promise((resolve, reject) => {
    const next = (data) => {
      let { value, done } = it.next(data);
      if (!done) {
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject);
      } else {
        resolve(value);
      }
    };
    next();
  });
}

function co2(it) {
  return new Promise((resolve, reject) => {
    const next = (res) => {
      let { value, done } = it.next(res);
      if (!done) {
        Promise.resolve(value).then((res) => next(res), reject);
      } else {
        resolve(value);
      }
    };
    next();
  });
}

co(read("./name.txt")).then((res) => {
  console.log("co", res);
});

co2(read2("./name.txt")).then((res) => {
  console.log("co", res);
});

/* function* buy() {
  console.log("start");
  let a = yield 1;
  console.log("a的值", a);
  let b = yield 2;
  console.log(b);
  console.log("end");
  return b;
}
let it2 = buy();

// console.log(it, Object.prototype.toString.call(it));

console.log(it2.next("a"));
// console.log(it2.next("yxh"));
// console.log(it2.next()); */
