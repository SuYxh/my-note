## Prettier配置

其实只有 ESlint 是完全不够的, ESLint 经常结合 Prettier 一起使用才能体现它们的能力,Prettier 主要是对代码做格式化,接下来我们看下如何将两者结合起来



### 安装依赖

```
pnpm add -D prettier@^2.8.4  eslint-config-prettier@^8.6.0 eslint-plugin-prettier@^4.2.1
```

#### 命令说明

`pnpm add -D prettier@^2.8.4`这条命令会安装 Prettier 的版本范围为 `^2.8.4` 的最新版本。这意味着它将会安装 2.8.4 或者任何更新的 2.x 版本，但不会超过 3.0.0。如果 2.8.4 是目前可用的最新 2.x 版本，那么它就会安装 2.8.4。如果有更新的 2.x 版本，比如说 2.9.0 或 2.9.1，那么它会优先安装这些更新版本。



#### 包说明

**Prettier (`prettier@^2.8.4`)**: Prettier 是一个流行的代码格式化工具，可以自动格式化你的代码以保持一致的风格。它支持许多语言和样式配置，能够确保团队成员之间代码的一致性。

**ESLint Config Prettier (`eslint-config-prettier@^8.6.0`)**: 这个包是一个 ESLint 插件，**用来禁用所有与 Prettier 冲突的 ESLint 规则**。这样可以使 ESLint 和 Prettier 更好地协同工作，避免格式化时出现不必要的问题。它基本上确保了 ESLint 的规则不会与 Prettier 的格式化规则发生冲突。

**ESLint Plugin Prettier (`eslint-plugin-prettier@^4.2.1`)**: 作用是将 Prettier 的格式化规则集成到 ESLint 的检查中，如果代码格式不符合 Prettier 的风格，ESLint 会报告格式错误。**同时允许通过 ESLint 的修复命令（`--fix`）来应用 Prettier 的代码风格**。但它的主要作用是在 ESLint 运行时应用 Prettier 的格式化规则，并将格式化错误作为 ESLint 的规则违反报告出来。

简单来说，`eslint-plugin-prettier` 把 Prettier 作为 ESLint 的一个规则来运行。当你运行 `eslint --fix` 命令时，如果代码不符合 Prettier 的格式化标准，该插件会触发 Prettier 对代码进行格式化，从而使得代码符合预设的风格。这意味着你可以在使用 ESLint 检查代码质量的同时，自动纠正那些仅仅是风格问题的代码，实现两者的同步。



### 配置`.prettierrc.cjs`

```js
module.exports = {
  printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
  useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
  semi: true, // 行尾是否使用分号，默认为true
  trailingComma: 'none', // 是否使用尾逗号
  bracketSpacing: true // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
};
```



### 配置`.eslintrc.cjs`

```js
module.exports = {
  // 指定代码运行的环境
  env: {
    // 设置为 true 表示代码会在浏览器环境中运行，这样ESLint会预定义浏览器全局变量（如 window, document 等）
    browser: true,
    // 支持到ES2021（ECMAScript 2021）的新语法特性
    es2021: true,
    // 设置为 true 表示代码在Node.js环境中运行，ESLint会预定义Node.js全局变量和作用域
    node: true
  },
  // 继承的规则
  extends: [
    // 包含一组核心规则，这些规则能发现代码中的常见问题。这是ESLint官方提供的一套推荐规则，它内置于ESLint中，不需要额外安装
    'eslint:recommended',
    // 应用Vue.js 3.x版本的基本规则集，用于Vue文件的检查，需要安装Vue的ESLint插件（eslint-plugin-vue）
    'plugin:vue/vue3-essential',
    // 适用于 TypeScript 的推荐规则集，提供了与 TypeScript 相关的最佳实践，通过@typescript-eslint/eslint-plugin提供。
    'plugin:@typescript-eslint/recommended',
    // 【新增】 接入 prettier 的规则，这两个配置是为了整合 Prettier 和 ESLint。
    // 'prettier' 是一个基础配置，它确保 ESLint 和 Prettier 不会发生冲突
    'prettier',
    // 是一个推荐配置，它包括了 'prettier' 并且设置了 'prettier/prettier' 规则为 'error'，这意味着任何不符合 Prettier 格式的代码都会被标记为错误
    'plugin:prettier/recommended'
  ],
  // 全局变量
  globals: {
    // 这是一个Vue 3的全局方法，你在这里将其设置为true，表示在代码中可以自由使用而不会被ESLint标记为未定义
    defineOptions: true
  },
  // 用于解析 .vue 文件，使 ESLint 能够理解和检查 Vue 组件的 <template> 和 <script> 部分
  parser: 'vue-eslint-parser',
  // 解析器选项
  parserOptions: {
    // 使用最新的ECMAScript版本
    ecmaVersion: 'latest',
    //使用ECMAScript模块
    sourceType: 'module',
    // 指定使用@typescript-eslint/parser来解析TypeScript代码
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    // 添加 Vue.js 相关的规则，使用这个插件需要安装eslint-plugin-vue
    'vue',
    // 添加 TypeScript 相关的规则，使用这个插件需要安装@typescript-eslint/eslint-plugin和@typescript-eslint/parser
    '@typescript-eslint'
  ],
  rules: {
    // 【新增】这条规则确保所有不符合 Prettier 格式的代码都会被 ESLint 报告为错误。这样可以在执行 --fix 的时候进行修复。
    'prettier/prettier': 'error',
    // 禁用 @ts-ignore、@ts-nocheck、@ts-check 等 TypeScript 特定的注释
    '@typescript-eslint/ban-ts-comment': 'off',
    // 关闭对 Vue 组件名称必须为多单词的限制
    'vue/multi-word-component-names': 'off',
    // 配置未使用变量的检查规则，允许变量和参数名以 _ 开头，忽略剩余的兄弟属性
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ]
  }
};
```

### 配置自动格式化

#### vscode格式化默认选择 prettier

![image-20240908151106281](https://qn.huat.xyz/mac/202409081511317.png)

#### 添加 vscode config

.vscode/settings.json

```json
{
  /*
   * @description 编译器配置
   * @param tabSize 默认tab为两个空格
   * @param formatOnSave 保存时自动修复
   */
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  /*
   * @description stylelint 配置
   * @param autoFixOnSave 保存时自动修复
   */
  "stylelint.autoFixOnSave": true,
  /*
   * @description 配置编辑器设置以覆盖某种语言
   */
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

最后：

**重启 vscode！！！**

**重启 vscode！！！**

**重启 vscode！！！**



重启后，按`ctrl+s`就能自动格式化代码了





## 问题

### 冲突问题： Insert ';' eslint(prettier/prettier)

在 ESLint 中集成了 Prettier 并使用 `eslint-plugin-prettier` 以及 `eslint-config-prettier` 时，如果 ESLint 报告了 `Insert ';' eslint(prettier/prettier)` 错误，这意味着代码风格与 Prettier 的配置不符，尤其是关于分号的使用。已经配置了 Prettier 以不在行尾添加分号（`semi: false`），但如果 ESLint 仍然报告需要插入分号的错误，这通常是因为 ESLint 的配置与 Prettier 的配置冲突。

1、**更新 `.eslintrc` 配置**: 确保你的 ESLint 配置文件中包含了 `eslint-plugin-prettier` 和 `eslint-config-prettier`。



2、更新 rule，设置 `"semi": false`

```js
{
  "rules": {
    "prettier/prettier": ["error", {
      "semi": false,
      "singleQuote": true,
      "trailingComma": "none",
      "bracketSpacing": true,
      "printWidth": 80,
      "tabWidth": 2,
      "useTabs": false
    }]
  }
}
```

