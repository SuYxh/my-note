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

function transform(str) {
  const firstToUpperCase = (char) => {
    if (typeof char !== "string" || !char.length) {
      return str;
    }
    return char.charAt(0).toUpperCase() + char.slice(1);
  };

  const newStr = str
    .split("-")
    .map((item, index) => (index === 0 ? item : firstToUpperCase(item)))
    .join("");

  return newStr;
}

console.log(transform(str));
