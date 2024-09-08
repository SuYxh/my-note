## Stylelint配置



### 依赖安装

```
pnpm add -D \
  stylelint@^14.0.0 \
  stylelint-prettier@^3.0.0 \
  stylelint-config-standard@^29.0.0 \
  stylelint-config-recommended-less@^1.0.4 \
  postcss-html@^1.5.0 \
  postcss-less@^6.0.0 \
  stylelint-config-recommended-vue@^1.4.0 \
  stylelint-config-recess-order@^3.1.0 \
  stylelint-config-prettier@^9.0.5
```



#### 包说明

**stylelint@^14.0.0**

- `stylelint`是一个强大的、现代的样式检查工具，用于检查CSS/SCSS/Less 等样式表的代码质量和代码风格。版本`^14.0.0`表示安装这个主版本号为14的最新版本。

**stylelint-prettier@^3.0.0**

- `stylelint-prettier`是一个插件，它允许你使用`Prettier`作为`stylelint`的一个规则集来格式化样式文件。这样可以保证`stylelint`和`Prettier`之间的风格一致性。

**stylelint-config-standard@^29.0.0**

- `stylelint-config-standard`是`stylelint`的一个扩展配置，提供一组推荐的样式规则，这些规则符合一般的CSS标准和最佳实践。

**stylelint-config-recommended-less@^1.0.4**

- 这是专门为Less文件设计的`stylelint`配置，提供了一组推荐的规则，以确保Less代码的质量和一致性。

**postcss-html@^1.5.0**

- `postcss-html`是一个`PostCSS`语法插件，用于支持HTML文件中嵌入的CSS代码的解析，这对于处理Vue文件中的样式尤其有用。

**postcss-less@^6.0.0**

- `postcss-less`是PostCSS的一个插件，用于解析Less语法，使PostCSS能够处理Less文件。

**stylelint-config-recommended-vue@^1.4.0**

- 这是一个针对Vue项目的`stylelint`配置，包含了一组针对Vue文件中样式部分的推荐规则。

**stylelint-config-recess-order@^3.1.0**

- 这是一个`stylelint`的排序规则配置包，基于RECESS的属性排序原则，用于保持样式声明的一致顺序。

**stylelint-config-prettier@^9.0.5**

- `stylelint-config-prettier`是一个取消所有与`Prettier`冲突的`stylelint`规则的配置。当你同时使用`Prettier`进行格式化时，这个配置包可以避免`stylelint`的规则与`Prettier`的格式化规则冲突。



### 编写`.stylelintrc.cjs`

```js
module.exports = {
  // 注册了stylelint-prettier插件，使stylelint能够集成Prettier的格式化功能。这允许你在stylelint检查的同时应用Prettier的自动格式化
  plugins: ['stylelint-prettier'],
  // 继承一系列规则集合
  extends: [
    //继承了stylelint-config-standard，它包含了一套广泛接受的标准规则，这些规则旨在避免错误和实现最佳实践
    'stylelint-config-standard',
    // 针对Less文件的推荐规则集，适用于使用Less作为CSS预处理器的项目。
    'stylelint-config-recommended-less',
    // 样式属性的排序规则，基于RECESS的排序原则。这有助于保持CSS属性声明的一致性和可读性。
    'stylelint-config-recess-order',
    // 接入 Prettier 规则
    // 确保所有stylelint的规则不会与Prettier的格式化规则冲突。这是在使用Prettier作为代码格式化工具时的必要配置
    'stylelint-config-prettier',
    // 这是一个便捷的配置，同时包含了stylelint-prettier插件和stylelint-config-prettier配置，确保stylelint与Prettier完美整合。
    'stylelint-prettier/recommended'
  ],
  customSyntax: 'postcss-less',
  // 配置 rules
  rules: {
    // 启用Prettier自动格式化功能。这意味着在stylelint运行时，Prettier将自动格式化样式文件。
    'prettier/prettier': true,
    // 要求类名以小写字母开始，允许数字和中划线，或者以x-开头后接小写字母和中划线。这有助于保持类名的一致性和符合特定命名约定
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^x-[a-z]+(-{1,2}[a-z]+)*$',
      {
        message: function (selector) {
          return `Expected class selector "${selector}" to match custom pattern`
        }
      }
    ]
  }
}
```



### 添加命令

```shell
"lint:style": "stylelint --ignore-pattern 'node_modules/*' --fix \"src/**/*.{css,less}\"",
```



- stylelint
  - 调用`stylelint`命令，这是一个用于检查CSS/SCSS/Less等样式文件的工具。
- --ignore-pattern 'node_modules/*'
  - 使用`--ignore-pattern`选项指定忽略`node_modules`目录。这是因为`node_modules`通常包含第三方库，我们不需要检查这些库文件的样式。
- --fix
  - `--fix`选项使`stylelint`尝试自动修复找到的样式问题。这可以自动解决一些常见的样式问题，例如空格、缩进或者属性顺序等。
- "src/**/*.{css,less}"
  - 这部分指定了`stylelint`将要检查的文件路径。`src/**/*.{css,less}`表示`src`目录下的所有子目录中的`.css`和`.less`文件。
  - 这里使用了glob模式（通配符路径），`**`代表任意级别的子目录，`*.{css,less}`表示匹配所有以`.css`或`.less`结尾的文件。





## 问题

1、我配置了这些以后，还需要安装对应的 vscode 插件吗？比如：ESLint、Prettier - Code formatter、Stylelint 吗？

需要。下面是你可能需要安装的插件列表：

**ESLint** - 这个插件会根据你的 `.eslintrc` 配置来检查你的 JavaScript/TypeScript 代码。它可以帮助你发现和修复代码中的问题，保持代码质量和风格一致性。

**Prettier - Code formatter** - Prettier 插件可以自动格式化你的代码，根据你在 `.prettierrc` 中定义的规则调整代码格式。这个插件通常与 ESLint 结合使用，以确保代码格式的一致性而不与 ESLint 规则冲突。

**Stylelint** - Stylelint 插件用于检查你的 CSS/LESS/SCSS 等样式文件。根据你的 `.stylelintrc` 配置，它可以帮助你保持样式代码的整洁和一致。



2、这些插件的作用是什么呢？安装这些可以带来什么好处呢？如果我只安装插件，而项目下没有对应的配置文件呢？ 会发生什么？ 

**插件的作用：**

**ESLint 插件**: 通常会在你编写代码时实时进行错误检查，并可以配置为在保存文件时自动修复（例如修复代码风格问题）。但它可能不会完全执行像 `eslint --fix` 那样的命令行中所有规则的修复。

**Prettier 插件**: 在保存文件时自动格式化代码，按照 `.prettierrc` 或 VSCode 配置的设置调整代码风格。

**Stylelint 插件**: 类似于 ESLint 插件，可以在编写代码时或保存文件时检查和修复样式文件。



**命令行操作**:

```
"lint:script": "eslint --ext .js,.jsx,.vue,.ts,.tsx --ignore-pattern 'node_modules/*' --fix --quiet .",
"lint:style": "stylelint --ignore-pattern 'node_modules/*' --fix \"src/**/*.{css,less}\""
```

- **`lint:script` 命令**: 这个命令通过 `eslint` 对指定文件执行更彻底的检查和修复。它包括语法错误、潜在的问题以及风格问题的修复，并支持多种文件扩展。
- **`lint:style` 命令**: 类似地，这个命令使用 `stylelint` 对样式文件进行深入的检查和修复，针对的是 CSS、LESS 文件的风格和潜在错误。



如果**只安装插件而没有对应的配置文件**，会发生以下情况：

- 插件通常会有一套默认的规则，如果你没有提供配置文件，它们就会按照这些默认规则来运行。这意味着插件仍然会起作用，但可能不会完全符合你的项目或团队的具体需求。
- 没有配置文件，你无法自定义规则来满足特定的编码风格或项目需求，可能会导致插件的部分功能不符合预期。
- 在团队项目中，缺乏配置文件可能导致代码风格在团队成员之间不一致。



**总结**

- 使用 VSCode 插件并配置“保存时格式化”可以自动处理很多常见的格式化和轻量级的 linting 问题，适合日常开发使用。
- 使用命令行工具（例如 `lint:script` 和 `lint:style`）可以执行更全面的检查和修复。这些命令适合在提交代码前进行一次完整的代码质量检查，或者在项目中定期执行以保持代码质量。
