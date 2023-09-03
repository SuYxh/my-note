# commander 搭建脚手架.md

```js
#! /usr/bin/env node

console.log("welcome to use xh1998-test cli!");

// xh1998-test -s / --first a/b/c

const Commander = require("commander");
const pkg = require("../package.json");

// 单例
const { program } = Commander;

// 手动实例化
// const program = new Commander.Command()

program
  .name(Object.keys(pkg.bin)[0])
  .usage("<command> [options]")
  .version(pkg.version)
  .option("-d, --debug", "是否开始调试模式", false)
  .option("-e, --env <envName>", "获取环境变量名称");
// .parse(process.argv)

// console.log(program.opts().debug);
// console.log(program.opts().env);

// command 注册命令
const clone = program.command("clone <source> [destination]");

clone
  .description("clone a repository")
  .option("-f, --force", "是否强制克隆")
  .action((source, destination, cmdObj) => {
    console.log("do clone", source, destination, cmdObj);
  });

// addCommand 注册子命令

const service = new Commander.Command("service");

service
  .command("start [port]")
  .description("start service at some port")
  .action((port) => {
    console.log("do service start", port);
  });

service
  .command("stop")
  .description("stop service")
  .action(() => {
    console.log("stop service");
  });

program.addCommand(service);

// command 的高级用法
// 可以实现 脚手架串行
// 执行 xh1998-test install init 相当于 xh1998-test  init
program
  .command("install [name]", "install package", {
    // 这里可以是其他的脚手架
    executableFile: "imooc-cli",
    // 可以将 xh1998-test 作为默认的执行命令
    // isDefault: true
    // 可以隐藏命令，在 -h 的时候无法看到
    // hidden: true
  })
  .alias("i");

// xh1998-test 命令后面必须要有个命令
program
  .argument("<cmd> [options]")
  .description("test command !!!")
  .action((cmd, options) => {
    console.log("cmd, env --> ", cmd, options);
  });

program.parse(process.argv);
```
