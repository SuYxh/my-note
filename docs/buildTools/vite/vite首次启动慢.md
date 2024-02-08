vite 首次启动慢

### 解决方案

#### 使用 http2

通过`vite-plugin-mkcert`在本地 Dev Server 上开启 HTTP2:

```
pnpm i vite-plugin-mkcert -D
```

然后在 Vite 配置中进行使用:

```js
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    // https 选项需要开启
    https: true,
  },
});
```

插件的原理也比较简单，由于 HTTP2 依赖 TLS 握手，插件会帮你自动生成 TLS 证书，然后支持通过 HTTPS 的方式启动，而 Vite 会自动把 HTTPS 服务升级为 HTTP2。

> 其中有一个特例，即当你使用 Vite 的 proxy 配置时，Vite 会将 HTTP2 降级为 HTTPS，不过这个问题你可以通过[vite-plugin-proxy-middleware](https://github.com/williamyorkl/vite-plugin-proxy-middleware)插件解决。

使用上 HTTP2 之后，在某些情况下大量并行请求的问题会得到明显的改善。



#### 预构建

```
pnpm i -D vite-plugin-optimize-persist vite-plugin-package-config
```

```js
// vite.config.ts
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

export default {
  plugins: [
    PkgConfig(),
    OptimizationPersist()
  ]
}
```

首次加载的时候，依然会很慢，这个是正常现象，因为这个插件, 加快vite载入界面速度的原理, 也和上面说的一样，而第一次，这个插件也没法知道，哪些依赖需要预构建，他只是在vite动态引入资源的时候，将这些资源都记录下来，自动写入了package.json中，当再次启动项目的时候，插件会读取之前他写入在package.json中的数据，并告知vite，这样vite就能对这些资源进行预构建了，也就能加快进入界面的速度了，但相应的启动速度就会比原来稍微慢一点。



### 参考

Vite 的首屏性能为什么不好？

https://cloud.tencent.com/developer/article/2224646



vite首次打开界面加载慢问题/解决

https://blog.csdn.net/pzy_666/article/details/123017630



vite首次启动加载慢

https://www.cnblogs.com/hetaojs/p/15386371.html