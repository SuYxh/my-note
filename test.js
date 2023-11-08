// Promise.resolve().then(() => console.log('A'));

// process.nextTick(() => console.log('B'));

// setImmediate(() => console.log('C'));

// setTimeout(() => console.log('D'), 0);

// (() => console.log('E'))();

console.log("A");

setTimeout(() => console.log("B"), 0);

setImmediate(() => console.log("C"));

process.nextTick(() => console.log("D"));

console.log("E");
