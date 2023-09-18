const fs = require("fs").promises;

const obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
  // [Symbol.iterator]() {
  //   let index = 0
  //   return {
  //     next: () => {
  //       return {
  //         value: this[index],
  //         done: this.length === index++
  //       }
  //     }
  //   }
  // }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  },
};

// console.log('obj', [...obj]);

function* gen() {
  console.log("start");
  let a = yield 1;
  console.log(a);
  let b = yield 2;
  console.log(b);
  console.log("end");
  return b;
}

const it = gen();

// console.log(it.next());
// console.log(it.next("yhx"));
// console.log(it.next());

function co(it) {
  return new Promise((resolve, reject) => {
    const next = (data) => {
      let { value, done } = it.next(data);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject);
      }
    };
    next();
  });
}

// co(gen()).then(res => {
//   console.log('res=>', res);
// })

/* function * read() {
  let content = yield fs.readFile('../name.txt', 'utf8');
  let age = yield fs.readFile("../" + content, 'utf8');
  let a = yield age + 100;
  return a;
}


const it = read()
let { value, done } = it.next()

Promise.resolve(value).then(res => {
  console.log(res)
  let { value, done } = it.next(res)
  Promise.resolve(value).then(res => {
    console.log(res)
    let { value, done } = it.next(res)
    console.log(value);
  })
}) */

function* read() {
  try {
    let content = yield fs.readFile("./name.txt", "utf8");
    let res = yield fs.readFile("./" + content, "utf8");
    let a = res + 1000;
    return a;
  } catch (error) {
    console.log(error);
  }
}

// co(read()).then(res => {
//   console.log('read=>', res);
// })

const itRead = read();

let { value, done } = itRead.next();

Promise.resolve(value).then((res) => {
  console.log("read-1", res);
  let { value, done } = itRead.next(res);
  // console.log('value-1', value);
  Promise.resolve(value).then((res) => {
    console.log("read-2", res);

    let { value, done } = itRead.next(res);
    console.log(value);
  });
});

function coPro(it) {
  return new Promise((resolve, reject) => {
    const next = (data) => {
      let { value, done } = it.next(data);

      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject);
      }
    };

    next();
  });
}

coPro(read()).then((res) => {
  console.log("coPro", res);
});
