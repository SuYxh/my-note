

## ESlint配置

`ESLint` 是在 `ECMAScript/JavaScript` 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误,我们来看一下如何在我们的项目中使用它

### 安装依赖

```csharp
pnpm add -D eslint@8.35.0  @typescript-eslint/eslint-plugin@5.54.0 @typescript-eslint/parser@5.54.0 @eslint-plugin-vue@9.9.0
```

这是我使用到的版本，如果不锁定版本，eslint的配置方式可能会有些变化，会有很多莫名其妙的问题。其中的 `typescript` 版本是 `5.1.6` 。



#### **相关包说明**

**eslint@8.35.0**：

- ESLint的核心包，提供代码检查的基本功能。

**@typescript-eslint/eslint-plugin@5.54.0**：

- 一个ESLint插件，提供了一套额外的规则，用于支持TypeScript的语法和特性。

**@typescript-eslint/parser@5.54.0**：

- TypeScript的解析器，使ESLint能够理解和分析TypeScript代码。

**@eslint-plugin-vue@9.9.0**：

- 专为Vue文件设计的ESLint插件，提供了一系列规则来帮助你保持Vue代码的质量和规范性。





### 编写.eslintrc

#### 配置文件

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
    'plugin:@typescript-eslint/recommended'
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
    // 禁用 @ts-ignore、@ts-nocheck、@ts-check 等 TypeScript 特定的注释
    '@typescript-eslint/ban-ts-comment': 'off',
    // 关闭对 Vue 组件名称必须为多单词的限制
    'vue/multi-word-component-names': 'off',
    // 配置未使用变量的检查规则，允许变量和参数名以 _ 开头，忽略剩余的兄弟属性
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true 
    }],
  }
};
```

#### extends 和 plugins 的使用

`extends`数组中指定的条目通常对应于ESLint的配置包或者是其他插件提供的预设配置。这些预设配置包含了一组预定义的规则设置，可以帮助你快速启动特定类型的项目（如React、Vue、TypeScript项目等）。例如：

- **`eslint:recommended`**：这是ESLint官方提供的一套推荐规则，它内置于ESLint中，不需要额外安装。
- **`plugin:vue/vue3-essential`**：这需要安装Vue的ESLint插件（`eslint-plugin-vue`），它包含了Vue特定的代码质量和风格规则。
- **`plugin:@typescript-eslint/recommended`**：这需要安装TypeScript的ESLint插件（`@typescript-eslint/eslint-plugin`）以及解析器（`@typescript-eslint/parser`），这些包提供了适用于TypeScript代码的规则。



`plugins`数组中指定的插件名称对应于需要安装的ESLint插件。这些插件通常提供额外的ESLint规则，这些规则专门针对特定语言（如TypeScript）、框架（如Vue、React）或者编程范式。例如：

- **`vue`**：使用这个插件需要安装`eslint-plugin-vue`。
- **`@typescript-eslint`**：使用这个插件需要安装`@typescript-eslint/eslint-plugin`和`@typescript-eslint/parser`。



#### extends 和 plugins 的区别

##### `extends`

- **定义**：`extends` 属性**用于继承一组或多组已经定义好的规则配置**。这些配置可以是 ESLint 官方的，也可以是第三方提供的，甚至是你项目中的其他配置文件。
- **用途**：通过使用 `extends`，你可以基于一个广泛接受的规则集开始，例如 `eslint:recommended`，或者采用特定社区（如 React 或 Vue）的最佳实践。`extends` 使你能够重用别人的配置，避免从头开始编写所有规则，从而快速启动项目的代码质量管理。
- **示例**：如果你在使用 Vue.js，并且希望遵循基本的 Vue 规范，你可能会在配置中添加 `extends: ['plugin:vue/vue3-essential']`，这会应用 Vue 插件为 Vue 3 推荐的基本规则集。

##### `plugins`

- **定义**：`plugins` 属性**用于添加新的 ESLint 插件**。插件通常包含一组自定义的规则，有时还包括额外的环境设置或配置，这些都是为了支持特定的 JavaScript 框架、库或其他编程环境。
- **用途**：使用 `plugins` 允许你引入新的规则集，这些规则集可以独立于 ESLint 默认提供的规则。插件很有用，特别是当你使用如 TypeScript 或 Vue 这样的技术时，它们需要特定的语法和结构检查。插件不仅增加了新的规则，有时还提供了新的配置项和环境信息。
- **示例**：对于 TypeScript 支持，你可能会添加 `plugins: ['@typescript-eslint']`，这使你能够在 `rules` 部分启用或配置由 `@typescript-eslint/eslint-plugin` 提供的规则。

##### 对比

- **扩展现有规则**：如果你只是想扩展或修改现有的一套规则集（无论是 ESLint 核心的、还是通过插件提供的），你会使用 `extends`。
- **引入新规则或功能**：如果你需要向 ESLint 引入完全新的规则或特定技术的支持（尤其是对于不是 JavaScript 原生支持的语言或框架），则需要使用 `plugins`。





### 编写 .eslintignore

```
**.d.ts
/packages/easyest
dist
node_modules
```



### 添加命令

```shell
"lint:script": "eslint --ext .js,.jsx,.vue,.ts,.tsx --ignore-pattern 'node_modules/*' --fix --quiet ."
```

#### 解释

**eslint**: 这是启动 ESLint 的命令。

**--ext .js,.jsx,.vue,.ts,.tsx**: 这个选项指定 ESLint 要检查的文件扩展名。默认情况下，ESLint 只检查 `.js` 文件。这里配置了 ESLint 同时检查 `.js`, `.jsx`, `.vue`, `.ts`, 和 `.tsx` 文件。这意味着 ESLint 将会检查包括 JavaScript、JSX、Vue、TypeScript 在内的多种类型的源代码文件。

**--ignore-pattern 'node_modules/\*'**: 这个选项告诉 ESLint 忽略项目中的 `node_modules` 文件夹。通常，`node_modules` 文件夹包含第三方库的代码，这些代码不需要我们进行代码风格或错误检查。通过忽略这个文件夹，可以加快检查速度并减少不必要的报告输出。

**--fix**: 这个选项使 ESLint 会自动修复所有可修复的问题。ESLint 有一些规则是可以自动修正的，比如格式化问题如空格、缩进等。开启此选项后，当ESLint检测到这些问题时，它将尝试自动修复它们，并保存更改。

**--quiet**: 这个选项告诉 ESLint 减少输出的信息量，它只会报告错误级别的问题，忽略警告级别的问题。这有助于聚焦于更严重的代码问题，使输出结果更清晰。

**.**   这是告诉 ESLint 检查当前目录及其所有子目录下的文件。这是命令的目标路径部分，`.` 代表当前工作目录。

#### 执行命令

虽然找个文件添加一个变量不使用，执行 `pnpm lint:script`

![image-20240908140242308](https://qn.huat.xyz/mac/202409081402340.png)

手动 删除这个在次运行：

![image-20240908140401705](https://qn.huat.xyz/mac/202409081404736.png)

就没什么问题了。





## 开发extends 和 plugins

### 编写extends

编写自己的 ESLint 配置扩展（extend）是一个很好的方法，可以在多个项目之间重用特定的代码风格和规则。

#### 步骤 1: 创建配置文件

首先，你需要创建一个包含你想要强制的 ESLint 规则的配置文件。这通常是一个 `.eslintrc.js` 或 `.eslintrc.json` 文件。例如，你可以创建一个 `.eslintrc.js` 文件，包含以下内容：

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'indent': ['error', 2],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    }
};
```

#### 步骤 2: 打包配置为 npm 包

将你的配置打包成一个 npm 包，这样其他项目就可以通过 npm 安装和使用它。为此，你需要创建一个 `package.json` 文件。可以通过运行 `npm init` 快速生成此文件，或手动创建一个简单的 `package.json`：

```json
{
  "name": "eslint-config-myconfig",
  "version": "1.0.0",
  "main": "index.js",
  "keywords": ["eslint", "eslintconfig", "config"],
  "peerDependencies": {
    "eslint": "^7.0.0"
  }
}
```

在这个例子中，`"main"` 字段指向了包含你的 ESLint 规则的文件。你可以将前面创建的 `.eslintrc.js` 的内容移动到 `index.js` 中，或者在 `index.js` 中引用 `.eslintrc.js`：

```javascript
module.exports = require('./eslintrc');
```

#### 步骤 3: 发布到 npm

在发布前，确保你已经注册了 npm 账户，并且在本地登录了你的 npm 账户（使用 `npm login`）。然后在你的项目根目录运行：

```bash
npm publish
```

这将会把你的扩展发布到 npm，使其可以被其他项目通过 npm 安装。

#### 步骤 4: 使用扩展

在其他项目中，你可以通过运行以下命令来安装你的 ESLint 配置扩展：

```bash
npm install eslint-config-myconfig --save-dev
```

然后在 ESLint 配置文件中使用你的扩展：

```json
{
    "extends": "myconfig"
}
```

请注意，如果你的包名以 `eslint-config-` 开头，你可以在 `extends` 中省略这个前缀。



### 编写 plugins

编写一个自定义的 ESLint 插件是一个进阶的过程，涉及到创建一系列的规则、可能的环境定义，以及配置。自定义插件允许你对 ESLint 进行扩展，添加专门针对项目或语言特性的检查规则。

#### 步骤 1: 创建插件项目

首先，创建一个新的 npm 项目。在一个空文件夹中，运行：

```bash
npm init -y
```

这会生成一个基本的 `package.json` 文件。

#### 步骤 2: 添加 ESLint 依赖

安装 ESLint 作为开发依赖：

```bash
npm install eslint --save-dev
```

#### 步骤 3: 创建插件文件

在项目中创建一个 JavaScript 文件来编写你的插件代码。这个文件将导出一个对象，对象中包含了你的插件定义。

##### 功能描述

平时我们可能直接在项目使用字符串，比如：

```js
function setLocalData(data: string) {
    window.localStorage.setItem('token', data) // 错误：使用了字符串字面值
}
```

这样，这个 key 就不容易维护， 应该将字符串存储在变量或常量中，然后使用这些变量或常量进行操作。

```js
const TOKEN = 'token'

function setLocalData(data: string) {
    window.localStorage.setItem(TOKEN, data)
}
```

这样做的好处包括：

**增加可维护性**：当相同的字符串在多个地方使用时，将其存储在一个变量中可以减少重复代码。如果未来需要修改这个字符串，只需在一个地方修改即可，而不是在代码的多个位置进行更改。

**增强可读性**：使用具有描述性名称的变量来代替硬编码的字符串可以提高代码的可读性。其他开发者可以更容易地理解代码的意图。

**方便管理**：集中管理应用中使用的字符串可以简化国际化和本地化的过程，因为所有的字符串都在一个容易访问和修改的地方。

接下来就来实现这个插件，一个基本的插件结构如下：

```javascript
// my-plugin.js
module.exports = {
    rules: {
        'my-custom-rule': {
            create: function(context) {
                return {
                    // 规则定义，例如：
                    'Literal': (node) => {
                        if (typeof node.value === 'string') {
                            context.report({
                                node,
                                message: 'Avoid using string literals.'
                            });
                        }
                    }
                };
            }
        }
    }
};
```

##### 解析

`create`: 这是一个工厂函数，它接受一个 `context` 对象（提供与 ESLint 运行环境的接口）并返回一个对象。这个对象定义了该规则将如何应用到代码的不同部分。

`Literal`: 这是一个节点选择器，它会匹配代码中所有的字面量节点。每当 ESLint 解析器遇到一个字面量节点时，它会调用此函数。

`node`: 这是当前被处理的 AST（抽象语法树）节点对象。在这个例子中，我们检查节点的 `value` 是否为字符串类型。

`context.report`: 这是一个方法用来报告问题。它接受一个对象，其中包含了报告的详细信息，包括哪个节点触发了这个报告和问题的描述。



#### 步骤 4: 配置 package.json

在 `package.json` 文件中，确保你有以下配置，这样 ESLint 才能识别和使用你的插件：

```json
{
  "name": "eslint-plugin-myplugin",
  "version": "1.0.0",
  "main": "my-plugin.js",
  "peerDependencies": {
    "eslint": "^7.0.0"
  }
}
```

这里的 `"main"` 指向你的插件文件。插件名必须以 `eslint-plugin-` 开始，这样 ESLint 才能正确地识别和加载插件。

#### 步骤 5: 发布插件

确保你在 npm 上注册了一个账户，并在命令行中登录。然后，你可以使用以下命令将你的插件发布到 npm：

```bash
npm publish
```

#### 步骤 6: 使用插件

在其他项目中安装你的插件：

```bash
npm install eslint-plugin-myplugin --save-dev
```

在 ESLint 配置文件中添加你的插件和规则：

```json
{
  "plugins": [
    "myplugin"
  ],
  "rules": {
    "myplugin/my-custom-rule": "error"
  }
}
```

通过这些步骤，你可以创建一个简单的 ESLint 插件，并在其他项目中使用它来强制执行自定义的代码规范。



## 问题

#### 为什么没有使用 `pnpm create @eslint/config` 初始化 `eslin` 呢？ 

这个命令是用来通过命令行交互方式快速创建和配置 ESLint 的配置文件。这个命令提供了一种方便的方式，让开发者可以根据自己的项目需求和技术栈来生成相应的 `.eslintrc` 配置文件。会根据你的回答自动生成一个符合你的需求的 `.eslintrc` 配置文件。此外，它还会**自动安装所需的 ESLint 插件和配置包，通常会安装所需插件和配置包的最新稳定版本**，就可能会导致各种各样的问题，所以我们不再这里使用命令初始化，而是自己进行配置。



#### 使用 --fix 的命令，未定义的变量为什么没有被删除呢？

```
"lint:script": "eslint --ext .js,.jsx,.vue,.ts,.tsx --ignore-pattern 'node_modules/*' --fix --quiet ."
```

在ESLint配置中设置了`@typescript-eslint/no-unused-vars`规则来标记未使用的变量为错误，并且配置了`--fix`选项，然而，`--fix`选项不会自动删除未使用的变量，因为这可能会导致代码逻辑的改变或破坏，特别是在不清楚变量是否在未检测到的副作用中起作用的情况下。

ESLint的`--fix`功能主要用于自动修复那些确定不会改变代码逻辑的问题，例如缩进、分号、空格等风格问题。对于像未使用变量这样可能会影响程序逻辑的问题，ESLint默认不会进行自动修复，因为这种操作需要开发者自己审核和确认。

如果你希望自动移除未使用的变量，你可能需要使用更激进的代码重构工具或手动删除这些变量。然而，在实际开发中，通常建议开发者亲自检查这些潜在的问题，以避免引入错误或不期望的行为。



#### 如何自动删除未定义的变量呢？

如果您想自动删除未使用的变量，可以考虑使用其他工具，如 ts-prune 或 ts-unused-exports。但请注意，这些工具可能会更激进地删除代码，所以使用时要小心。



我想使用  ts-unused-exports 删除未使用的变量，这个可以做到吗？ 应该怎么配置呢？



#### 如何针对某一行忽略eslint检查呢？

```js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a = 1;
```



#### 插件包名和配置名称为什么对不上？

比如：我配置的是 plugin:vue/vue3-essential， 却要安装  eslint-plugin-vue 呢？ 这是为什么？有什么规范吗？

回答如下：

这个问题涉及到 ESLint 插件和配置的命名约定，这些约定有助于区分插件本身和它提供的具体配置。

**插件命名和安装**

当你安装一个 ESLint 插件时，通常它的 npm 包名以 `eslint-plugin-` 开头。例如：

- `eslint-plugin-vue` 是 Vue.js 的 ESLint 插件。
- `eslint-plugin-react` 是 React 的 ESLint 插件。

这是因为 ESLint 社区约定插件的包名必须以 `eslint-plugin-` 开头，这样 ESLint 才能在初始化时自动识别和加载这些插件。

**配置引用**

在 ESLint 配置文件中，当你使用 `extends` 或 `plugins` 引用这些插件时，通常不需要再写完整的包名。ESLint 会自动在引用名前补充 `eslint-plugin-`，从而正确加载插件。因此：

- 在 `plugins` 字段中，你只需写 `vue` 而不是 `eslint-plugin-vue`。
- 在 `extends` 字段中，配置引用通常以 `plugin:` 开头，后跟插件名和具体配置。例如，`plugin:vue/vue3-essential` 指的是 `eslint-plugin-vue` 插件提供的 `vue3-essential` 配置。



**为什么插件名和配置名对不上？**

插件包可能包含多个预设的配置规则集，以适应不同的用途或代码风格需求。例如，`eslint-plugin-vue` 可能提供：

- `vue3-essential`：这个规则集提供了确保应用运行不出错的最基本的规则。这些规则捕获的是可能导致错误的明显Vue语法和结构问题。适合刚开始使用Vue或者小型项目，想要确保基本的代码质量而不过多干涉代码风格或更细微的最佳实践。

- `vue3-strongly-recommended`：除了包含“essential”级别的所有规则外，还增加了一些强烈推荐遵循的规则，这些规则通常关注于代码的一致性和可读性。适合那些希望进一步提高代码质量，确保代码的一致性和可读性，以便团队成员能更容易地阅读和维护代码的项目。

- `vue3-recommended`： 这是最严格的规则集，包括了“essential”和“strongly recommended”中的所有规则，并且添加了一些推荐的最佳实践，这些最佳实践基于Vue社区的广泛经验。适合用于那些追求高代码质量，以及想要利用Vue社区累积的最佳实践来最大化项目维护性和可扩展性的中大型项目。

这些都是同一个插件包（`eslint-plugin-vue`）内定义的不同规则集。因此，在 `extends` 中使用这些配置时，你需要指定它们属于哪个插件（`vue`），以及具体使用该插件的哪个配置（如 `vue3-essential`）。



**规范**

ESLint 的这种命名和引用方式有助于保持配置的简洁和一致性，同时确保可以从大量可用的插件中轻松选择和配置所需功能。这种方法还有助于自动化工具和脚本识别和处理这些依赖关系，从而简化了项目的设置和维护工作。



