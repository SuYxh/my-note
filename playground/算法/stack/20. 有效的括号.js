function isValid(s) {
  const stack = [];

  s.split("").forEach((item) => {
    if (item === "(" || item === "[" || item === "{") {
      stack.push(item);
    } else {
      const top = stack[stack.length - 1];
      if (
        (top === "(" && item === ")") ||
        (top === "[" && item === "]") ||
        (top === "{" && item === "}")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  });

  return !stack.length;
}

function isValid2(s) {
  const stack = [];
  const map = new Map();

  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");

  s.split("").forEach((item) => {
    if (map.get(item)) {
      stack.push(item);
    } else {
      const top = stack[stack.length - 1]; // {
      // item }
      if (item === map.get(top)) {
        stack.pop();
      } else {
        return false;
      }
      // if (
      //     (top === '(' && item === ')') ||
      //     (top === '[' && item === ']') ||
      //     (top === '{' && item === '}')
      //   ) {
      //   stack.pop()
      // } else {
      //   return false
      // }
    }
  });

  return !stack.length;
}

const s = "()[]{}";
// const s = "()[]{}{}}}()"
console.log(isValid2(s));
