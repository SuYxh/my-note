## 迁移 vite

最主要原因就是本地开发启动速度快。在使用 vite 之前，特地先使用了 [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin) 这个插件来检测 webpack 的打包速度，结果是需要 15s - 20s。 相比之下，在切换 vite 之后，几乎就是秒启动

![](https://qn.huat.xyz/mac/202402071132025.awebp)

当然也有一个弊端：**开发环境的首屏渲染、懒加载相比 webpack 更慢了**，根本原因是 vite 把源文件的 resolve、load、transform、parse 延后到由浏览器执行。但只要在首屏渲染完成后，vite 会使用强缓存对构建内容进行缓存，在这之后相比于 webpack 每次更新内容之后的重新打包，vite 的热更新又是是丝滑的热更新体验

为什么生产环境不一并迁移 vite？最主要的考虑还是担心影响现有业务流程，而且 vite 的生产环境也是通过 rollup 打包来实现的，在生产构建没有很大的性能时间问题前暂时还是使用 webpack 进行生产打包构建

## 迁移步骤和踩坑总结

首先是安装依赖，因为最新版本的 Vite 3.0 支持的 Node 最低版本是 14.18+，不再支持 Node 12，考虑到老项目，还是选择了 Vite 2.9 版本。另外老项目使用的还是 Vue2，所以需要使用到 [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2) 插件，让 Vue2 项目中可以使用 Vite。

> `vue@2.7`版本，需要安装[@vitejs/plugin-vue2]()，2.7之前的版本安装[vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)

-   安装依赖：`npm i -D vite@^2.9.14 vite-plugin-vue2`，然后在 `package.json`新增一个启动命令，新建一个 `vite.config.js` 配置文件

```json
// vite 启动命令
"scripts": {
  "dev:vite": "vite",
},

// 新增 vite.config.js 文件和基础内容
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true,
    }),
  ],
});
```

不出意外的话是可以直接启动的，但是页面是空白，原因是因为在传统的 vue-cli / webpack 项目中 `index.html` 文件一般都是放在 `public` 目录下。而在 vite 项目中 `index.html` 是放在根目录下，作为整个项目的入口，通过 `index.html` 中的 `<script>` 标签来加载 js 文件。考虑到升级前定下的原则：**尽量不改动原有项目代码和配置**，所以需要使用到 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md) 这个插件修改 vite 识别 `index.html` 目录的位置

-   安装依赖 `npm i -D vite-plugin-html`，然后在 `vite.config.js` 中配置 `index.html` 入口
-   index.html 新增：`<script type="module" src="/src/main.js"></script>`

```js
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      template: 'public/index.html',
      minify: true
    }),
  ]
})
```

接下来启动项目，会发现 Vite 无法识别忽略 `.vue` 后缀的文件，这是因为 Vite 已不再默认忽略.vue扩展名（根据 github 上 [issue 讨论](https://github.com/vitejs/vite/issues/178#issuecomment-630138450)，尤大回答设计就是如此），所以只能手动兼容

![](https://qn.huat.xyz/mac/202402071218589.awebp)

-   在 `vite.config.js` 中手动配置后缀名忽略选项

```js
export default defineConfig({
  resolve: {
    // 手动配置后缀名忽略选项
    extensions: ['.vue', '.js', '.json', '.mjs']
  },
});
```

继续启动项目，提示找不到 sass 依赖，只能重新安装 sass，版本选择低一些，`sass@~1.26.5`，过高可能存在问题

-   安装 sass 依赖：`npm i -D sass@~1.26.5`

![](https://qn.huat.xyz/mac/202402071218484.awebp)

接下来启动项目需要解决两个别名识别问题，一个是常用的 webpack 别名定义，一般都会在 webpack 配置文件定义 `src` 目录的别名方便开发引入文件。第二个是 sass 别名的引入，项目中引入 sass 文件的方式是 `@import '~variable.scss'`，vite 支持了 `@import` 的引入，但是无法识别`~` 别名

![](https://qn.huat.xyz/mac/202402071218586.awebp)

-   增加适配 webpack 定义别名 `@xxx` 和 `@/xxx` 的场景
-   增加适配引入 sass 文件 `~/xxxx` 和 `~xxx` 的场景

```js
export default defineConfig({
  resolve: {
    alias: [
      // 适配 @xxxx、@/xxxx
      { find: '@', replacement: path.join(__dirname, 'src') },
      // 适配 ~/xxxx
      { find: /* ~/ *//^~(?=\/)/, replacement: path.join(__dirname, 'node_modules') },
      // 适配 ~xxxx
      { find: /* ~ *//^~(?!\/)/, replacement: path.join(__dirname, 'node_modules/') },
    ]
  },
});

```

继续填坑，提示 `require is not defined`，由于开发环境使用浏览器的 ESM 模式，不支持 CJS 模式，本着不修改源码的原则，继续使用插件兼容 CJS 的模式

-   安装 [@originjs/vite-plugin-require-context](https://www.npmjs.com/package/@originjs/vite-plugin-require-context) 和 [vite-plugin-commonjs](https://github.com/vite-plugin/vite-plugin-commonjs) 插件并在 `vite.config.js` 文件中引入

```js
import commonjs from 'vite-plugin-commonjs'
import ViteRequireContext from '@originjs/vite-plugin-require-context'

export default defineConfig({
  plugins: [
    // 兼容 commonjs
    commonjs(),
    // 兼容 webpack require.context 写法
    ViteRequireContext(),
  ]
});
```

在 webpack 中使用环境变量的方式主要是通过 `process.env.xxx`，而 vite 中是通过 `import.meta.env.VITE_xxx` 的方式访问环境变量，为了不影响生产环境 webpack 环境变量的使用，需要自定义项目中使用到的环境变量

-   在 `vite.config.js` 中自定义项目使用到的环境变量

```js
define: {
    // 同 webpack.DefinePlugin，手动兼容 dev 环境 process.env
    'process.env': {
      VUE_APP_ENV: 'development',
      VUE_APP_REQUESTPATH: '/hrpb',
      VUE_APP_TITLE: '传统金融业务人员PB系统',
      VUE_APP_SHORT_TITLE: 'hrpb'
    }
},
```

到这里项目中基本可以正常启动不报错了，但是如果项目使用的 UI 组件库是按需引入的话，还要在 vite 中重新配置一遍按需引入

-   使用 [vite-plugin-style-import](https://github.com/vbenjs/vite-plugin-style-import) 配置 UI 组件库按需引入
-   `vite.config.js` 配置 ant-design-vue 主题色等自定义颜色

```js
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'

plugins: [
  // 导入 ant-design-vue 样式
  createStyleImportPlugin({
    resolves: [AndDesignVueResolve()]
  })
],
css: {
  // 定义 ant-design-vue 颜色
  preprocessorOptions: {
    less: {
      modifyVars: {
        'primary-color': '#b60005'
      },
        javascriptEnabled: true
    }
  }
}
```

## 迁移 vite 后效果

冷启动时间直线减少，现在只需要 2 秒左右，而且即使项目体积增大，启动速度也没有太大的变化，其次就是热更新几乎是无感的，不像 webpack 可能还需要等待一两秒的重新打包

![截屏2022-08-21 19.11.11](https://qn.huat.xyz/mac/202402071224435.awebp)

但现在 vite 的首屏加载时间确实是存在的一个问题，相信这也是 vite 后续提升的方向之一吧



## 参考

vue2.7+webpack迁移vite实践总结

https://juejin.cn/post/7249933985564000312



[ Vite ]使用 vite 重构 webpack 项目过程中对两者之间差异对比的思考（ 一 ）

https://juejin.cn/post/7101544284788097032