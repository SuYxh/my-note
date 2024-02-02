function transformStr(str) {
  const arr = str.split(".");
  let result = {};
  let p = result;

  arr.forEach((key, index) => {
    p[key] = {};

    if (index === arr.length - 1) {
      p[key] = null;
    }

    p = p[key];
  });

  return result;
}

const result = transformStr("a.b.c");

console.log(result);

function walk(obj) {
  let str = "";
  let p = obj;

  while (p) {
    const keys = Object.keys(p);

    keys.forEach((key) => {
      str = str ? str + "." + key : str + key;
      p = p[key];
      console.log(p);
    });
  }

  return str;
}

setTimeout(() => {
  const res = walk(result);
  console.log("res", res.toString());
}, 1000);
