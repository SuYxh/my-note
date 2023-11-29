function printNum() {
  for (let i = 1; i <= 4; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000 * i);
  }
}

// printNum()

// 使用 闭包

for (var i = 0; i < 5; i++) {
  (function printNummber(i) {
    setTimeout(() => {
      console.log(i);
    }, 1000 * i);
  })(i);
}

((p) => {
  console.log("iife", p);
})("hello");
