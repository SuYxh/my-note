# 最新Vue3项目代码规范

>  Eslint v9.0.0...

## 项目初始化

使用pnpm

```shell
npm create vite@latest
```

本文以下使用pnpm安装的

![image-20240518153849806](https://qn.huat.xyz/mac/202405181538019.png)





## EditorConfig

**1\. 作用：** 使项目代码风格在不同开发人员编辑器中保持一致。

**2\. 安装：** VSCode 搜索 EditorConfig for VS Code 插件并安装。

**3\. 配置：**

根目录创建文件`.editorconfig`并复制以下配置：

```
# Editor configuration, see http://editorconfig.org
# 表示是最顶层的 EditorConfig 配置文件
root = true
[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行
trim_trailing_whitespace = true # 删除一行中的前后空格
```

**4\. 如下：**

![image-20240518154342680](/Users/yangxinhao/Library/Application Support/typora-user-images/image-20240518154342680.png)

  

## Eslint

**1\. 作用：** ESLint 是一个用于检测 JavaScript 代码问题的工具，帮我们发现并修复 JavaScript 代码中的问题。

**2\. 安装：**

```shell
pnpm create @eslint/config
```

```shell
√ How would you like to use ESLint? · (To check syntax and find problems)
√ What type of modules does your project use? · (JavaScript modules (import/export))
√ Which framework does your project use? · (Vue.js)
√ Does your project use TypeScript? · (Yes)
√ Where does your code run? · (Browser)
√ Would you like to install them now?  （Yes）
√ Which package manager do you want to use? （根据自己情况，本文使用pnpm）
```

此时根目录会生成`eslint.config.js`文件, 内容如下：

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
```

注意：此时我们安装的是Eslint的版本为：9.0.0，这是Eslint更新的变动比较大的版本，具体跟新内容请查阅官网。

![image-20240518154624645](https://qn.huat.xyz/mac/202405181546854.png)



  

**3\. 配置：**

根目录修改文件`eslint.config.js`配置如下：

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
export default [
  // eslint 默认推荐规则
  pluginJs.configs.recommended,
  // ts 默认推荐规则
  ...tseslint.configs.recommended,
  // vue3 基础推荐规则
  ...pluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      ecmaVersion: 2020,
      // parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
];

```

**4\. 如下：**

![image-20240518154727342](https://qn.huat.xyz/mac/202405181547544.png)



  

## Prettier

**1\. 作用：** Prettier 是一个代码格式化工具，可以自动格式化代码，使其符合统一的风格。

**2\. 安装：**`pnpm add -D prettier eslint-plugin-prettier eslint-config-prettier`

**3\. 配置：**

1.  修改 `eslint.config.js` 添加 prettier 配置
    

```js
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'
export default [
	// eslint 默认推荐规则
	pluginJs.configs.recommended,
	// ts 默认推荐规则
	...tseslint.configs.recommended,
	// vue3 基础推荐规则
	...pluginVue.configs['flat/recommended'],
  // prettier 默认推荐规则
	pluginPrettierRecommendedConfigs,
	{
    languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				...globals.node,
			},
			ecmaVersion: 2020,
			// parser: parserVue,
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
]
```

2.  根目录下新建 `prettier.config.js` 添加如下配置：
    

```js
export default {
	tabWidth: 2, // 缩进
	useTabs: true, // 缩进方式
	semi: false, // 语句结尾是否加分号
	singleQuote: true, // 单引号
	printWidth: 120, // 换行长度
	arrowParens: 'always', // 箭头函数参数
	bracketSpacing: true, // 对象花括号内是否加空格
	endOfLine: 'auto', // 换行符
	// vueIndentScriptAndStyle: true, // vue文件内script和style标签缩进
}
```

**4\. 如下：**

![image-20240518154856085](https://qn.huat.xyz/mac/202405181548275.png)



## Eslint可能出现的问题

> 也可能没有，没有就不用管

当打开components/HelloWorld.vue 文件，会发现此行报错：

```js
defineProps<{ msg: string }>() // Parsing error: Unexpected token )eslint
```

解决办法： 配置 vue-eslint-parser，修改eslint.config.js

```js
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'
import parserVue from 'vue-eslint-parser'

export default [
	// eslint 默认推荐规则
	pluginJs.configs.recommended,
	// ts 默认推荐规则
	...tseslint.configs.recommended,
	// vue3 基础推荐规则
	...pluginVue.configs['flat/recommended'],
	// prettier 默认推荐规则
	pluginPrettierRecommendedConfigs,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
				...globals.node,
			},
			ecmaVersion: 2020,
			parser: parserVue,
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
]
```

2.  添加插件 vite-plugin-eslint`pnpm add -D vite-plugin-eslint`
    

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
})
```

由于 vite-plugin-eslint 库有点落后，导致 vite 高版本不能正确的识别 cjs 模块，所以配置src\\vite-env.d.ts：

```js
/// <reference types="vite/client" />

/**
 * 由于 vite-plugin-eslint 库有点落后，导致 vite 高版本不能正确的识别 cjs 模块
 * 所以这里手动定义
 */
declare module 'vite-plugin-eslint' {
	import { Plugin } from 'vite'
	import { ESLint } from 'eslint'

	/** Plugin options, extending from ESlint options */
	interface Options extends ESLint.Options {
		/** Path to ESLint instance that will be used for linting */
		eslintPath?: string
		/** Check all matching files on project startup */
		lintOnStart?: boolean
		/** A single file, or array of files, to include when linting */
		include?: string | string[]
		/** A single file, or array of files, to exclude when linting */
		exclude?: string | string[]
		/** Custom error formatter or the name of a built-in formatter */
		formatter?: string | ESLint.Formatter['format']
		/** The waring found will be printed */
		emitWarning?: boolean
		/** The errors found will be printed */
		emitError?: boolean
		/** Will cause the module build to fail if there are any warnings, based on emitWarning */
		failOnWarning?: boolean
		/** Will cause the module build to fail if there are any errors, based on emitError */
		failOnError?: boolean
	}

	const content: (rawOptions?: Options) => Plugin
	export default content
}
```

修改配置 tsconfig.json

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "preserve",

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,
		"types": [
			// 编译过程中被包含进来的类型声明文件
			"vite/client"
		]
	}
}
```

## stylint

**1\. 作用：** stylelint 是一个 CSS 语法检查工具，可以检测 CSS 代码的错误和风格问题。

**2\. 安装：**`pnpm add -D stylelint stylelint-config-html stylelint-config-prettier stylelint-config-standard stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-recommended-vue`

```
stylelint    核心库 
stylelint-config-html    解析 HTML 文件中的样式 
stylelint-config-prettier    结合 Prettier 使用 
stylelint-config-standard    StyleLint 的标准可共享配置
stylelint-config-recess-order    提供优化样式顺序的配置 
stylelint-config-recommended-scss    扩展 stylelint-config-recommended 共享配置并为 SCSS 配置其规则 
stylelint-config-recommended-vue    扩展 stylelint-config-recommended 共享配置并为 Vue 配置其规则
```

**3\. 配置：**

1.  根目录创建`.stylelintrc.js`并配置：
    

```js
export default {
	// 继承推荐规范配置
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recommended-scss',
		'stylelint-config-recommended-vue/scss',
		'stylelint-config-html/vue',
		'stylelint-config-recess-order',
	],
	// 指定不同文件对应的解析器
	overrides: [
		{
			files: ['**/*.{vue,html}'],
			customSyntax: 'postcss-html',
		},
		{
			files: ['**/*.{css,scss}'],
			customSyntax: 'postcss-scss',
		},
	],
	// 自定义规则
	rules: {
		// 允许 global 、export 、v-deep等伪类
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep'],
			},
		],
	},
}
```

2.  根目录创建 .stylelintignore 文件，配置忽略文件如下：
    

```
dist
node_modules
public
.husky
.vscode
```

**4\. 如下：**

![image-20240518155329021](https://qn.huat.xyz/mac/202405181553131.png)



## 命令配置

配置根目录文件`package.json`的配置：

```json
"lint:eslint": "eslint --fix",
"lint:format": "prettier --write --log-level warn \"src/**/*.{js,ts,json,tsx,css,less,vue,html,md}\"",
"lint:stylelint": "stylelint \"**/*.{css,scss,vue,html}\" --fix"
```

代码检查和格式化命令

```
pnpm lint:eslint
pnpm lint:format
pnpm lint:stylelint
```

## vscode编译器保存自动化配置

修改根目录.vscode文件夹下的`settings.json`(没有的话新建一个)：

```json
{
	"files.eol": "\n", // 文件结束符
	"eslint.format.enable": true, // 开启保存时自动修复
	"editor.codeLens": true, // 显示行号
	"editor.tabSize": 2, // 重新设定tabsize
	"editor.detectIndentation": false, // 禁用自动检测缩进
	// 将prettier设置为默认格式化程序(在编辑器中有可能被其他Formatter占用，所以将prettier设置为默认Formatter)
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	// 关闭js/ts的默认format,统一用eslint进行格式化（tslint已经不维护了，所以转eslint吧）
	"javascript.format.enable": false,
	"typescript.format.enable": false,
	// 保存时自动格式化 (根据根目录下‘.prettierrc文件配置项’)
	"editor.formatOnSave": true,
	// Enable per-language
	"[html]": {
		"editor.defaultFormatter": "vscode.html-language-features",
		"editor.formatOnSave": true
	},
	"[vue]": {
		"editor.formatOnSave": true, // 交给 eslint
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	// 什么类型的文件需要遵守stylelint规则
	"stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"],
	// 为ESLint启用“保存时自动修复”，并且仍然具有格式和快速修复功能
	"editor.codeActionsOnSave": {
		"source.fixAll": "always",
		"source.fixAll.stylelint": "always"
	},
	"[markdown]": {
		"editor.defaultFormatter": null,
		"editor.formatOnSave": false
	},
	"[json]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[scss]": {
		"editor.defaultFormatter": "stylelint.vscode-stylelint"
	}
}
```



## husky v9

### 作用

husky 是一个 Git 钩子工具，可以在提交代码时自动检测到代码提交时修改的文件，然后执行相应的检查命令。

核心内容是配置 Husky 的 pre-commit 和 commit-msg 两个钩子:

1.  pre-commit：Husky + Lint-staged 整合实现 Git 提交前代码规范检测/格式化 (前提：ESlint + Prettier + Stylelint 代码统一规范。
    
2.  commit-msg: Husky + Commitlint + Commitizen + cz-git 整合实现生成规范化且高度自定义的 Git commit message。
    

### 安装

我们husky v9版本，它和v8安装过程不太一样，大家要注意！husky v9与v8区别

```
pnpm install husky -D
npx husky init
```

这命令做了四件事儿：

1.  安装 husky 到开发依赖
    
    ![image-20240518160103603](https://qn.huat.xyz/mac/202405181601694.png)

2.  在项目根目录下创建 .husky 目录
    

![image-20240518160151022](https://qn.huat.xyz/mac/202405181601099.png)



3.  在 .husky 目录创建 pre-commit hook，并初始化 pre-commit 命令为 npm test
    

![image-20240518160211575](https://qn.huat.xyz/mac/202405181602651.png)



4.  修改 package.json 的 scripts，增加 "prepare": "husky"
    

![image-20240518160239595](https://qn.huat.xyz/mac/202405181602675.png)



### 配置

当我们安装lint-staged之后再配置

## lint-staged

### 作用

lint-staged 也是一个 Git 钩子工具，当我们在 git add 到暂存区的文件运行 linters (ESLint/Prettier/StyleLint) 的工具，避免在 git commit 提交时在整个项目执行。

### 安装

```
pnpm install -D lint-staged
```

### 配置

1.  在package.json配置中添加：
    

```json
"lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{cjs,json}": [
      "prettier --write"
    ],
    "*.{vue,html}": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{scss,css}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
```

![image-20240518160644058](https://qn.huat.xyz/mac/202405181606139.png)



2.  在scripts添加lint-staged命令：`"lint:lint-staged": "lint-staged"`
    

![image-20240518161013369](https://qn.huat.xyz/mac/202405181610454.png)



3.  修改husky提交前前钩子命令：根目录 .husky 目录下 pre-commit 文件中的 npm test 修改为 npm run lint:lint-staged
    

![image-20240518161353997](https://qn.huat.xyz/mac/202405181613075.png)



### 使用

Git提交代码检测

```
git add .
git commit -m "测试"
```

![image-20240518161958122](https://qn.huat.xyz/mac/202405181619227.png)

如果执行 `pre-commit` 中的   `pnpm lint:lint-staged` 命令没有生效，那么执行一下 `pnpm prepare`，然后再次执行提交命令

## Commitlint

### 作用

commitlint 是一个 git commit 校验约束工具，检查您的提交消息是否符合 Conventional commit format

### 安装

```
pnpm install @commitlint/config-conventional @commitlint/cli --save-dev
pnpm install -D commitizen 
```

### 配置

1.  根目录创建 commitlint.config.cjs 配置文件，示例配置：
    

```js
// commitlint.config.cjs
module.exports = {
	// 继承的规则
	extends: ['@commitlint/config-conventional'],
	// 自定义规则
	rules: {
		// @see https://commitlint.js.org/#/reference-rules
		// 提交类型枚举，git提交type必须是以下类型
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新增功能
				'fix', // 修复缺陷
				'docs', // 文档变更
				'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
				'refactor', // 代码重构（不包括 bug 修复、功能新增）
				'perf', // 性能优化
				'test', // 添加疏漏测试或已有测试改动
				'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
				'ci', // 修改 CI 配置、脚本
				'revert', // 回滚 commit
				'chore', // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
			],
		],
		'subject-case': [0], // subject大小写不做校验
	},
	prompt: {
		messages: {
			type: '选择你要提交的类型 :',
			scope: '选择一个提交范围（可选）:',
			customScope: '请输入自定义的提交范围 :',
			subject: '填写简短精炼的变更描述 :\n',
			body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			footerPrefixesSelect: '选择关联issue前缀（可选）:',
			customFooterPrefix: '输入自定义issue前缀 :',
			footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
			generatingByAI: '正在通过 AI 生成你的提交简短描述...',
			generatedSelectByAI: '选择一个 AI 生成的简短描述:',
			confirmCommit: '是否提交或修改commit ?',
		},
		// prettier-ignore
		types: [
      { value: "feat", name: "特性:     ✨  新增功能", emoji: ":sparkles:" },
      { value: "fix", name: "修复:     🐛  修复缺陷", emoji: ":bug:" },
      { value: "docs", name: "文档:     📝  文档变更", emoji: ":memo:" },
      { value: "style", name: "格式:     🌈  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: ":lipstick:" },
      { value: "refactor", name: "重构:     🔄  代码重构（不包括 bug 修复、功能新增）", emoji: ":recycle:" },
      { value: "perf", name: "性能:     🚀  性能优化", emoji: ":zap:" },
      { value: "test", name: "测试:     🧪  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:" },
      { value: "build", name: "构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）", emoji: ":package:" },
      { value: "ci", name: "集成:     ⚙️  修改 CI 配置、脚本", emoji: ":ferris_wheel:" },
      { value: "revert", name: "回退:     ↩️  回滚 commit", emoji: ":rewind:" },
      { value: "chore", name: "其他:     🛠️  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: ":hammer:" },
     ],
		useEmoji: true,
		emojiAlign: 'center',
		useAI: false,
		aiNumber: 1,
		themeColorCode: '',
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: 'bottom',
		customScopesAlias: 'custom',
		emptyScopesAlias: 'empty',
		upperCaseSubject: false,
		markBreakingChangeMode: false,
		allowBreakingChanges: ['feat', 'fix'],
		breaklineNumber: 100,
		breaklineChar: '|',
		skipQuestions: [],
		issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
		customIssuePrefixAlign: 'top',
		emptyIssuePrefixAlias: 'skip',
		customIssuePrefixAlias: 'custom',
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
		maxHeaderLength: Infinity,
		maxSubjectLength: Infinity,
		minSubjectLength: 0,
		scopeOverrides: undefined,
		defaultBody: '',
		defaultIssues: '',
		defaultScope: '',
		defaultSubject: '',
	},
}
```

2.  执行下面命令生成 commint-msg 钩子用于 git 提交信息校验
    

```sh
echo "npx --no -- commitlint --edit $1" > .husky/commit-msg
```

![image-20240518162257300](https://qn.huat.xyz/mac/202405181622389.png)

## cz-git

### 作用

与commitizen搭配使用，是一款工程性更强，轻量级，高度自定义，标准输出格式的 commitizen 适配器。

### 安装

```
pnpm install -D cz-git
```

### 配置

1.  在package.json配置中添加：
    

```
"config": {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
},
```

![image-20240518162349973](https://qn.huat.xyz/mac/202405181623049.png)



2.  在script添加提交指令
    

```
"commit": "git pull && git add -A && git-cz && git push",
```

![image-20240518162445525](https://qn.huat.xyz/mac/202405181624616.png)

### 使用

```
pnpm commit
```

![image-20240518162526114](https://qn.huat.xyz/mac/202405181625207.png)



## 代码仓库

https://github.com/SuYxh/vue3-project-code-specification







## 参考

2024最新Vue3项目代码规范【上】

https://mp.weixin.qq.com/s?__biz=MzIzNjUxMzE2NQ==&mid=2247489735&idx=1&sn=402a2672d0fbee93aacfda19262fdbf6&chksm=e8d7ea25dfa06333999a5a742887e0d67444bfe27ee2629754c2822da2404c8817a113d03f36&scene=21#wechat_redirect



2024最新Vue3项目代码规范【下】

https://mp.weixin.qq.com/s?__biz=MzIzNjUxMzE2NQ==&mid=2247489767&idx=1&sn=17404c34a3486e734361fd762183dbca&chksm=e8d7ea05dfa06313d1676b2b621587b5e5d9d4b028e74636378b5ef69bb2f2d7820fd4b62c0a&mpshare=1&scene=1&srcid=0420pAocePUXWxCl0INXkk3t&sharer_shareinfo=9708772cf9b6ca64c83b172845c91f1f&sharer_shareinfo_first=9708772cf9b6ca64c83b172845c91f1f#rd



从0到1实践，企业级前端开发底层规范搭建（2024版）

https://juejin.cn/post/7345277549335642112



基于Vite+Vue3+TS+AntDV4+Unocss+Pinia的项目开发底层（2024版）

https://juejin.cn/post/7348275757799817231







