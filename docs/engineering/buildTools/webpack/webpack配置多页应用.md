webpack 配置多页应用





在使用 Webpack 5 来配置一个多页应用 (MPA) 时，你需要为每个页面定义一个入口点，并且为每个入口点生成一个独立的 HTML 文件。这通常通过 `HtmlWebpackPlugin` 来实现，它可以为每个页面生成对应的 HTML 文件。下面是一个基本的多页应用配置示例：

### 1. 初始化项目和安装依赖

首先，确保你的项目中已经安装了 Node.js。然后创建你的项目目录，初始化项目，并安装必要的依赖：

```bash
mkdir webpack-mpa
cd webpack-mpa
npm init -y
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install --save react react-dom
```

### 2. 配置 Webpack

在项目根目录下创建一个 `webpack.config.js` 文件。在这个文件中，你将配置多个入口和对应的 `HtmlWebpackPlugin` 实例：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development', // 或 'production'
  entry: {
    page1: './src/page1/index.js',
    page2: './src/page2/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page1/template.html',
      filename: 'page1.html',
      chunks: ['page1'],
    }),
    new HtmlWebpackPlugin({
      template: './src/page2/template.html',
      filename: 'page2.html',
      chunks: ['page2'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};
```

### 3. 创建页面和资源

在 `src` 目录下为每个页面创建一个子目录，包括它们的 JavaScript 入口文件和 HTML 模板：

```
src/
├─ page1/
│  ├─ index.js
│  └─ template.html
├─ page2/
│  ├─ index.js
│  └─ template.html
```

每个 `index.js` 可以是一个简单的 React 组件入口，例如：

```javascript
// src/page1/index.js
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>Page 1</h1>;

ReactDOM.render(<App />, document.getElementById('root'));
```

对应的 `template.html` 可以如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page 1</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

### 4. 构建和运行

你可以添加一些脚本到 `package.json` 以构建和运行你的项目：

```json
"scripts": {
  "start": "webpack serve --open",
  "build": "webpack"
}
```

然后运行 `npm start` 来启动开发服务器，或运行 `npm run build` 来构建你的项目。

通过以上步骤，你可以为每个页面配置独立的入口和 HTML 文件，使用 Webpack 5 来构建一个多页应用。