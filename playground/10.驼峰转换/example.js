const str = "get-element-by-id";

function transform2Hump(str) {
  const result = [];
  const array = str.split("-");
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const transformStr =
      i === 0
        ? element
        : element.charAt(0).toLocaleUpperCase() + element.substring(1);
    result.push(transformStr);
  }
  return result.join("");
}

const res = transform2Hump(str);

console.log(res);
