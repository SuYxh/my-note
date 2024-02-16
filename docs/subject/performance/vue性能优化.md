Vue 性能优化



## 方向

- 资源加载优化
- 页面渲染优化



## 加载慢的原因

- 网络延时问题
- 资源文件体积是否过大
- 资源是否重复发送请求去加载了
- 加载脚本的时候，渲染内容堵塞了



## 优化方案

### 减小入口文件积

常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加。 在 vue-router 配置路由的时候，采用动态加载路由的形式。以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件。

```js
// 品牌选择页
{
  path: '/c2b/select-brand',
  name: 'select-brand',
  meta: {
    desc: '品牌选择页',
    pageId: 'Y7528',
    level: 2
  },
  component: async () =>
    await import(/* webpackChunkName: "select-brand" */ '@/views/c2b/SelectBrand/Index.vue')
},
```



### 静态资源本地缓存

- 后端返回资源问题:
  - 采用 HTTP 缓存，设置 Cache-Control ，Last-Modified ，Etag 等响应头
  - 采用 Service Worker 离线缓存

- 前端合理利用 LocalStorage



### UI框架按需加载

参考使用的 UI 框架给出的配置方式



### 抽离重复包

假设 A.js 文件是一个常用的库，现在有多个路由使用了 A.js 文件，这就造成了重复下载

解决方案如下：



**webpack**配置

Webpack 3及更早版本的配置

```js
const webpack = require('webpack');

module.exports = {
    // 其他配置...
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons', // 输出的文件名
            filename: 'commons.js', // 输出的文件名
            minChunks: 3, // 被3个以上的chunk共享的模块才会被抽离
        })
    ]
};
```



Webpack 4及以上版本的配置

```js
module.exports = {
    // 其他配置...
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons', // 输出的文件名
                    chunks: 'initial', // 只对入口文件处理
                    minChunks: 3, // 被3个以上的chunk共享的模块才会被抽离
                }
            }
        }
    }
};
```

如果一个模块被3个或更多的chunk所共享，它将被Webpack提取到`commons`这个共享的chunk中。`name`属性定义了输出的共享chunk的名称，`chunks: 'initial'`表示只考虑初始chunk（即入口点），而`minChunks: 3`指定了一个模块被抽取为公共模块前必须被引用的最小次数。

`chunks: 'initial'` 我要是针对所有文件呢？

```js
module.exports = {
    // 其他配置...
    optimization: {
        splitChunks: {
            chunks: 'all', // 修改为'all'以包括所有类型的chunk
            cacheGroups: {
                commons: {
                    name: 'commons',
                    minChunks: 3,
                    // 你可以根据需要添加更多配置，如test, priority等
                }
            }
        }
    }
};
```

- 使用`chunks: 'all'`时，可能会导致更多的代码分割，这对于某些应用来说是有益的，因为它可以减少初始加载时间并提高缓存利用率。然而，这也可能导致产生更多的HTTP请求，特别是如果应用有大量小模块被频繁地共享和重用。
- 在配置`cacheGroups`时，你可以根据实际需要定制分割策略。例如，你可以为来自`node_modules`的模块设置一个单独的缓存组，或者为特定类型的资源（如CSS）设置专门的缓存组。
- 调整Webpack的代码分割配置可能需要一些试验和错误检查，以找到最适合你项目的设置。特别是对于大型或复杂的Web应用，合理的代码分割策略对性能有显著影响。



Vite通过Rollup的配置来实现

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      // Rollup 配置项
      output: {
        // 控制代码分割的配置
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 把所有依赖包打包到一个单独的文件中
            return 'vendor';
          }
        }
      }
    }
  }
});
```



### 图片资源的压缩

图片资源虽然不在编码过程中，但它却是对页面性能影响最大的因素对于所有的图片资源，我们可以进行适当的压缩对页面上使用到的 icon ，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上，用以减轻 http 请求压力。



Vite 中我们一般使用 `vite-plugin-imagemin`来进行图片压缩；

```js
//vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

{
  plugins: [
    // 忽略前面的插件
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
}
```



在Webpack中，进行图片压缩通常会使用`image-webpack-loader`。这个loader可以在Webpack处理图片文件时（如在`import`图片或使用`url-loader`/`file-loader`处理图片时）自动优化和压缩图片。`image-webpack-loader`支持多种图片格式，包括JPEG、PNG、GIF、SVG等，并且允许配置多种压缩工具的选项，如`mozjpeg`、`optipng`、`pngquant`、`svgo`等。

```
pnpm install -D image-webpack-loader file-loader
```

配置 webpack

```js
module.exports = {
  // 其他配置...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader', // 或者使用 'url-loader'
            options: {
              name: '[path][name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65, // 调整JPEG图片的压缩质量
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4, // 调整PNG图片的压缩速度和质量
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75, // 开启WEBP并调整压缩质量
              },
            },
          },
        ],
      },
    ],
  },
  // 其他配置...
};
```

### 开启GZip压缩

`compression-webpack-plugin`是一个Webpack插件，用于在Webpack构建过程中压缩资源文件。通过这个插件，可以将生成的文件压缩成`.gz`（Gzip）、`.br`（Brotli）等格式的文件，从而减小文件大小，提高网站加载速度和性能。这对于生产环境的Web应用尤其重要，因为它可以显著减少传输数据的大小，提升用户体验。

```js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // 其他配置...
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip', // 使用gzip压缩
      test: /\.(js|css|html|svg)$/, // 压缩.js, .css, .html, .svg文件
      threshold: 10240, // 只处理大于10KB的文件
      minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
    })
  ]
  // 其他配置...
};
```

当使用`compression-webpack-plugin`或任何客户端资源压缩策略时，服务端通常需要进行相应的配置改动以正确地处理和提供这些压缩后的文件。这些改动确保服务端能够根据客户端的请求头（如`Accept-Encoding`）返回正确格式的压缩文件，并设置适当的响应头（如`Content-Encoding`）以指示文件的压缩类型。

```
server {
    location / {
        gzip_static on; # 启用或禁用从预压缩文件中提供响应
        expires max; # 设置资源的缓存过期时间
    }
}
```

当浏览器接收到响应后，它会检查`Content-Encoding`头部，了解响应体的压缩方式。如果浏览器支持该压缩方法，它会自动解压缩响应体，然后按照正常的流程解析和显示内容。这个解压缩过程对用户来说是透明的，不需要任何手动干预。



在Vite中，可以使用`vite-plugin-compression`插件来开启Gzip压缩。这个插件能够在Vite项目的构建过程中为生成的资源文件（如JavaScript、CSS、HTML等）自动创建Gzip压缩版本。除了Gzip，`vite-plugin-compression`还支持生成其他格式的压缩文件，比如Brotli，这取决于你的配置。

```
pnpm install -D vite-plugin-compression
```

配置

```js
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 默认为false，设置为true时禁用压缩
      threshold: 10240, // 只有大小大于该值的资源会被处理，默认为0
      algorithm: 'gzip', // 使用gzip压缩，也可以配置为'brotliCompress'等其他值
      ext: '.gz', // 压缩文件的扩展名
    })
  ]
});
```



### 使用 SSR





