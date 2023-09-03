# yargs 搭建脚手架

```js
#! /usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const dedent = require("dedent");

const arg = hideBin(process.argv);
console.log("arg", arg);

const cli = yargs(arg);

cli
  .usage("usage: xh1998-test [command] <options>")
  .strict()
  .recommendCommands()
  .fail((err, msg) => {
    console.log("err", err);
    // console.log('msg', msg);
  })
  .alias("h", "help")
  .alias("V", "version")
  .wrap(cli.terminalWidth())
  .epilogue(
    dedent`  
  Hello!

  Welcome to use xh1998-test cli!
`
  )
  .options({
    debug: {
      type: "boolean",
      describe: "Bootstrap debug mode",
      alias: "d",
    },
  })
  .option("registry", {
    type: "string",
    describe: "Define global registry",
    alias: "r",
  })
  .group(["debug"], "Dev Options:")
  .command(
    "init [name]",
    "Do init a project",
    (yargs) => {
      yargs.option("name", {
        type: "string",
        describe: "Name of project",
        alias: "n",
      });
    },
    (argv) => {
      console.log("init-->", argv);
    }
  ).argv;
```
