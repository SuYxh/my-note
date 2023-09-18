const fs = require("fs");

// Promise.defer = function () {
//   let dfd = {}
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve
//     dfd.reject = reject
//   })
//   return dfd
// }

// Promise.defer = function () {
//   const dfd = {}
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve
//     dfd.reject = reject
//   })

//   return dfd
// }

// function read(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, "utf8", (err, data) => {
//       if (err) reject(err)
//       resolve(data)
//     })
//   })
// }

Promise.defer = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

// function read(url) {
//   let dfd = Promise.defer()
//   fs.readFile(url, "utf8", (err, data) => {
//     if (err) dfd.reject(err)
//     dfd.resolve(data)
//   })
//   return dfd.promise
// }

function read(url) {
  let dfd = Promise.defer();
  fs.readFile(url, "utf-8", (err, data) => {
    if (err) dfd.reject(err);
    dfd.resolve(data);
  });
  return dfd.promise;
}

read("./name.txt")
  .then(
    (res) => {
      console.log("res", res);
      return read("./" + res);
    },
    (err) => {
      console.log("err", err);
    }
  )
  .then(
    (res) => {
      console.log("res2", res);
    },
    (err) => {
      console.log("err2", err);
    }
  );
