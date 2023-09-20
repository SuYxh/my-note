import data from "./data.js";

function deepClone(obj, cache = new Set()) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  if (cache.has(obj)) {
    return;
  }

  cache.add(obj);

  const result = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key], cache);
    }
  }

  return result;
}

function test() {
  const newObj = deepClone(data);
  console.log("obj", data);
  console.log("newObj", newObj);

  // data.say()
  // newObj.say()
}

export default {
  deepClone,
  test,
};
