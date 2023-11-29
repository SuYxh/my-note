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

console.log(transformStr("a.b.c"));
