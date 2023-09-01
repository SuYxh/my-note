# 什么是 Bash 和 CLI

## Bash 和 Shell 是什么？它们有什么用？

### 什么是 Shell？

Shell 是计算机提供给用户与其他程序进行交互的接口

> a shell program is one that provides users with an interface to interact with other programs

Shell 是一个命令解释器，当你输入命令后，由 Shell 进行解释后交给操作系统内核（OS Kernel）进行处理

![shell](https://qn.huat.xyz/mac/202309011122142.png)

> A Shell is an interface that gives you access to your computer’s Operating System. Think of it as a wrapper around your Operating System’s Kernel.

图形操作系统是 Shell 吗？是的！图形操作系统属于 GUI Shell

![shell-gui](https://qn.huat.xyz/mac/202309011123210.png)

> GUIs are a type of Shell

### 什么是 Bash？

简单地说：Bash 是一种程序，它的职责是用来进行人机交互

> Short answer: Bash is a program on your computer like any other, but designed to be easy for you to talk to.

Bash 和其他程序最大区别在于，它不是用来完成特定任务（如计算器、文件管理等），我们通过 bash shell 来执行程序

> Bash is a shell program designed to listen to my commands and do what I tell it to.

### Bash 有什么用？

绝大部分同学都习惯使用可视化的图形界面操作系统，但是 Bash 使用了一种与图形界面完全相反的方案：通过纯文本的控制台进行控制，它的主要交互方式通过键盘输入文本，文字反馈来实现人机交互。

![bash](https://qn.huat.xyz/mac/202309011123393.png)

那么一个关键问题：在 GUI 发展如火如荼的今天，Bash 过时了吗？不！恰恰相反 Bash 在开发领域应用越来越广泛。 Bash 最大的优势就是简单易用，虽然它的显示效果不如 GUI，但一旦熟练后其操作效率远远大于 GUI！

> Bash is a simple tool in a vast toolbox of programs that lets me interact with my system using a text-based interface.

# 什么是 CLI？

命令行界面（CLI）是一种基于文本界面（类似：MacOS 终端、Windows cmd.exe），用于运行程序

> A command-line interface (CLI) is a text-based user interface (UI) used to run programs, manage computer files and interact with the computer. Command-line interfaces are also called command-line user interfaces, console user interfaces and character user interfaces.

CLI 接受键盘输入，在命令符号提示处输入命令，然后由计算机执行并返回结果

> CLIs accept as input commands that are entered by keyboard; the commands invoked at the command prompt are then run by the computer.

今天大部分操作系统都会以 GUI 作为基础，但是基于 Unix 的系统都会同时提供 CLI 和 GUI。

> Today, most vendors offer the graphical user interface (GUI) as the default for operating systems (OSes) such as Windows, Linux and macOS. Most current Unix-based systems offer both a command-line interface and a graphical user interface.

## 总结

- Shell 是操作系统提供的接口程序，用于接收用户输入的命令，交给操作系统内核执行并接收响应结果
- Bash 是 Shell 的一个实现，用于执行用户输入的命令
- CLI 是 Bash 的运行环境，CLI 接收用户键盘输入，交给 Bash 执行，并将程序处理结果结果以文本形式进行显示

![03-cli](https://qn.huat.xyz/mac/202309011123797.png)
