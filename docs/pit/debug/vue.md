1、vue-devTool 直接在 vscode 打开对应的组件

前提： 在 vscode 执行一下命令

![image-20230907164939294](https://qn.huat.xyz/mac/202309071649339.png)

添加代码片段

```js
if (process.env.NODE_ENV !== 'production') {
  ; (window as any).VUE_DEVTOOLS_CONFIG = {
    openInEditorHost: 'https://localhost:8080/'
  }
}
```

vue-devTool

![image-20230907164748085](https://qn.huat.xyz/mac/202309071647162.png)

如果出现报错：

![image-20230907164849471](https://qn.huat.xyz/mac/202309071648496.png)

打开链接去浏览器认证一下
