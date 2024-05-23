vite 配置



在使用 Vite 构建一个多页应用（MPA）时，你可以通过配置多个入口点来实现。Vite 默认支持使用 `rollupOptions` 来配置多个入口文件，这使得构建多页应用变得相对简单。下面是如何使用 Vite 来配置一个多页应用的步骤：

### 1. 初始化项目和安装依赖

首先，创建你的项目目录并初始化一个新的 Vite 项目，这里以使用 React 为例：

```bash
npm create vite@latest vite-mpa -- --template react
cd vite-mpa
npm install
```

### 2. 配置 Vite

在 `vite.config.js` 文件中配置多个入口点。你需要使用 `build.rollupOptions` 来指定每个页面的入口文件和输出的 HTML 文件。

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        page1: resolve(__dirname, 'page1.html'),
        page2: resolve(__dirname, 'page2.html'),
      }
    }
  }
})
```

### 3. 创建页面和资源

你需要为每个页面创建一个 HTML 文件，这些文件将作为入口点。在 `index.html`、`page1.html` 和 `page2.html` 中，你应该包含指向相应的 JavaScript 入口文件的引用。

例如，`page1.html` 的内容可能如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page 1</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/page1.js"></script>
</body>
</html>
```

然后创建对应的 JavaScript 文件，如 `src/page1.js`：

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => <h1>Page 1</h1>

ReactDOM.render(<App />, document.getElementById('app'))
```

重复相似的步骤来设置其他页面。

### 4. 构建和运行

在 `package.json` 中，你的脚本部分通常不需要改动，因为 Vite 的默认配置已经足够：

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

运行 `npm run dev` 来启动开发服务器，或者使用 `npm run build` 来构建你的多页应用。你会发现 Vite 为每个 HTML 入口文件生成了独立的资源文件夹。

使用 Vite 配置多页应用是一个比较直接的过程，通过简单的 `rollupOptions` 配置就可以实现。