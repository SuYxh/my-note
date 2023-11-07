(async function () {
  console.log("start");
  const a = await 100;
  console.log("a", a);
  const b = await Promise.resolve(200);
  console.log("b", b);
  const c = await Promise.reject(300);
  console.log("c", c);
  console.log("end");
})(); // 执行完毕，打印出那些内容？
