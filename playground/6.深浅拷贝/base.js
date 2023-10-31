import data from "./data.js";

// reg、Symbol、Date
function deepClone(obj, cache = new Set()) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  if (cache.has(obj)) {
    return obj;
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
  const newObj = dp(data);
  console.log("obj", data);
  console.log("newObj", newObj);
}

export default {
  deepClone,
  test,
};
