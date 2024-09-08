## husky

### 简介

Husky 是一个流行的工具，用于在 Git 钩子（hooks）中自动执行脚本，以此来提高代码质量和自动化开发流程。它通过简单的配置，可以在执行诸如提交（commit）和推送（push）等 Git 操作时自动运行指定的脚本，常用于执行代码格式化、静态检查、测试等任务。



### 为什么要使用 husky

虽然我们项目中引入了`prettier`和`eslint`对代码格式进行了校验，但是多人开发的时候难免有人不去主动执行这些格式化命令，依然可能提交不符合规范的代码到仓库中。因此我们可以使用 husky 来解决。



### 原理

Husky 的工作原理基于 Git 钩子的机制。Git 钩子是 Git 提供的一些脚本，可以在特定的重要动作发生时触发执行，例如提交前、提交后、推送前等。这些钩子脚本通常位于 Git 仓库的 `.git/hooks` 目录中。

当你通过 npm 安装 Husky 并执行 `husky install` 命令时，Husky 会在项目的 Git 钩子目录中设置一些链接（钩子）。这些钩子链接到 Husky 管理的脚本，而不是直接写入脚本代码到钩子文件中。

当触发一个 Git 操作（例如 `git commit` 或 `git push`）时，相应的 Git 钩子会被调用。如果该操作关联了一个 Husky 钩子，Husky 通过其管理的链接来执行配置中定义的命令或脚本。

如果任何 Husky 钩子中的命令返回非零状态码，Git 操作会被取消。这用于保证只有在所有检查都通过后，才能继续如提交或推送等操作。



### 安装

```
pnpm add -D husky@^8.0.3
```



### 配置

#### 配置prepare

在 `package.json` 中 `scripts` 中设置 `prepare` 钩子： `husky install`，在使用`pnpm install`的时候就会自动执行`husky install`。

```json
"scripts": {
  "prepare": "husky install"
},
```

> `prepare` 是 npm 的一个生命周期钩子。npm 脚本钩子是在包的生命周期的特定时刻自动执行的任务。这些钩子可以用来在安装、发布、测试等过程中自动化执行脚本。文末会有常用的 npm 钩子介绍



因为我们已经安装了依赖， 所以手动执行一下：

```sh
npx husky install
```

执行结束后可以看到在项目根目录生成了 `.husky` 的文件



#### 配置钩子

然后添加一个 commit 钩子文件，执行以下命令：

```sh
npx husky add .husky/pre-commit "pnpm lint:script"
```

> 不要直接复制文件，需要手动去执行这个命令。如果直接复制对应的文件，可能导致这个文件没有可执行权限，然后钩子无法执行。如果你拷贝的文件，请手动给文件添加一个可执行权限。

然后我们就会发现根目录出现了`.husky/pre-commit` 文件， 我们修改一下 commit 之前的命令，让其提交之前先进行 lint 校验

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint:script
pnpm lint:style
```





### 提交代码

按照跟之前一样的方式进行代码提交：

```shell
git add .
git commit -m "xxx"
```

如图：

![image-20240908171233861](https://qn.huat.xyz/mac/202409081712880.png)

可以看到 `pre-commit`钩子被触发，  执行了 `pnpm lint:script` 和` pnpm lint:style`

修改一个不符合 eslint 的规范文件，然后进行提交之后你会发现它会先自动给你修复之后再进行提交，如果无法修复则抛出一个错误：

![image-20240908171407957](https://qn.huat.xyz/mac/202409081714978.png)



### husky 常用钩子

- **pre-commit**：最常用的钩子之一，通常用于在提交前执行脚本，如运行代码格式化、静态代码分析、轻量级测试等，以确保代码质量。

- **commit-msg**：用于检查提交消息的格式。可以配置脚本来验证提交信息是否符合团队的标准，例如是否包含特定的前缀或格式。

- **pre-push**：在 `git push` 操作之前执行。常用于运行较为耗时的操作，如完整的测试套件，确保不会将不稳定或未经充分测试的代码推送到远程仓库。

- **post-checkout**：在成功的 `git checkout` 操作后执行。可以用来恢复依赖或执行其他需要在切换分支后进行的清理操作。

- **post-merge**：在合并操作完成后执行。常用于恢复依赖，或者检查合并后的代码中可能需要手动解决的问题。

- **pre-rebase**：在 `git rebase` 开始之前执行。可以用来防止重排到某个特定的提交。



push 之后的钩子有没有呢？

在 Git 中，没有直接的钩子用于处理 `git push` 操作完成后的事件。Git 钩子主要聚焦于本地仓库的事件，如提交前、提交后、推送前等。**Husky** 也遵循这种设计，主要提供对本地 Git 钩子的支持，因此没有直接的方式来配置一个在 `git push` 操作完成后立即执行的钩子。

后续我们会用到 `release-it` 这个工具，可以在里面配置发布以后的操作。



## commitlint

### 简介

`commitlint` 是一个用于**检查 Git 提交信息是否符合预定规范**的工具。这个工具主要通过一系列的规则来确保提交信息的一致性和清晰度，有助于提高项目的可维护性。使用 `commitlint` 可以让团队成员遵循同一提交信息格式，便于代码审查和版本历史追踪。



### 为什么使用它

使用 `commitlint` 的主要好处是它能强制实施一致的提交信息格式，这在大型团队或开源项目中尤为重要。良好且一致的提交信息有助于代码审查和问题追踪，也便于自动生成变更日志。



### 如何工作

`commitlint` 主要通过读取 Git 钩子中的提交信息来工作。通常与 `husky`（一个用于管理 Git 钩子的工具）一起配合使用，可以在执行提交操作（如 `git commit`）时自动触发提交信息的检查。



### 安装

```js
pnpm add -D @commitlint/cli@^17.6.3 @commitlint/config-conventional@^17.6.3
```

 `@commitlint/cli` 和 `@commitlint/config-conventional` 都是用于设置和管理 Git 提交信息规范的工具，分别承担不同的角色：

#### `@commitlint/cli`
这个包是 `commitlint` 的命令行接口（CLI），提供了运行 `commitlint` 的主要功能。你需要通过这个 CLI 来执行提交信息的检查工作。它解析提交信息并根据配置的规则进行验证，如果提交信息不符合规则，它会返回错误并阻止提交操作。基本上，这个包是 `commitlint` 工具的核心，负责实际的检查逻辑。

#### `@commitlint/config-conventional`
这个包提供了一个预设的配置规则集，基于 Conventional Commits 规范。Conventional Commits 是一种针对所有语言的轻量级约定，用于使用明确的提交信息来自动化和改善软件发布流程。这种规范包括了提交信息的结构，如何表达新特性、修复、破坏性变化等信息。

`@commitlint/config-conventional` 主要包含以下几个方面的规则：
- **type**: 提交类型，如 `feat` (新功能), `fix` (修复), `docs` (文档变更), 等。
- **scope**: 可选的，用来指明提交影响的范围，例如 `api` 或 `ui`。
- **subject**: 提交摘要，简明扼要说明改动。
- **footer**: 可选的，用来指定与之前提交的关联或关闭 issue 的标识。
- **headers**: 提交信息的头部。



### 常用 type

- **feat**: 新功能（feature）。
- **fix**: 修补bug。
- **docs**: 文档（documentation）的更改。
- **style**: 不影响代码含义的改变（即不影响运行结果的代码格式化、括号、空格等）。
- **refactor**: 既不是修复bug也不是添加功能的代码更改，即代码重构。
- **perf**: 提高性能的代码更改。
- **test**: 添加或修改测试。
- **build**: 影响构建系统或外部依赖关系的更改（例如 scopes: gulp, broccoli, npm）。
- **ci**: 更改持续集成软件的配置文件和脚本（例如 scopes: Travis, Circle, BrowserStack, SauceLabs）。
- **chore**: 其他不修改源代码或测试文件的更改。
- **revert**: 撤销之前的提交。



### 配置

#### 编写配置文件

可以通过一个名为 `commitlint.config.js` 的配置文件来设定规则。这里面可以定义哪些规则是启用的，哪些是禁用的，以及自定义规则。`commitlint` 支持多种配置扩展，例如 `@commitlint/config-conventional`，这是一个基于 Conventional Commits 规范的常用配置。

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```



#### 新增 commit 钩子

```shell
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

`.husky/commit-msg` 内容如下：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```



### 提交代码

先提交一个不符合规范的 type ，就会发现报错了：

![image-20240908172306497](https://qn.huat.xyz/mac/202409081723516.png)



正确提交：

![image-20240908172334071](https://qn.huat.xyz/mac/202409081723094.png)

这样就可以规范我们的提交信息了。



### 自定义 type

这个 type 能不能自定义呢？当然是可以的，但是有这些就够用了，那还是来看看如何自定义：

修改 `commitlint.config.js` 文件中配置 `type-enum` 规则：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // 错误级别，不符合则拒绝提交
      'always',
      [
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档更新
        'style', // 样式（不影响代码运行的更改）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'perf', // 性能优化
        'test', // 增加测试
        'build', // 影响构建系统或外部依赖关系的更改
        'ci', // 对CI配置文件和脚本的更改
        'chore', // 其他改动（不修改src或test的其它更改）
        'revert', // 撤销之前的提交
        'ui', // UI 更改
        'init', // 初始提交
        'config', // 配置相关
        'deploy', // 部署相关
      ]
    ]
  }
};

```

在这个配置文件中，我首先使用了 `extends: ['@commitlint/config-conventional']` 来继承 Conventional Commits 的默认规则，然后通过 `rules` 对象自定义了 `type-enum` 规则。`type-enum` 规则的数组第一个元素 `2` 指明了这是一个必须遵守的规则（错误级别），第二个元素 `always` 指示规则总是生效，第三个元素是一个数组，列出了所有允许的 `type`。

通过这样的配置，可以在项目中使用这些 `type` 来标记你的 Git 提交，帮助维护清晰的版本历史。当你执行 `git commit` 时，如果提交信息的 `type` 不在这个列表中，`commitlint` 将会阻止提交并给出错误提示。这样可以确保团队成员遵循相同的提交规范。



## lint-staged

### 简介

`lint-staged` 是一个**在Git暂存文件上自动运行代码检查（linters）和格式化工具**的包。它通常与 `husky` 结合使用，`husky` 可以让你轻松地在 Git 钩子上触发脚本，比如在每次提交之前自动运行 `lint-staged`。

### 工作原理

当你执行 Git 提交操作时，`lint-staged` 会自动运行配置在其下的命令，但只针对已暂存的（通过 `git add` 添加的）文件。这意味着它只检查和修正你即将提交的文件，而不会影响到其他的文件。这样可以大幅提高代码检查的效率，尤其是在大型项目中。



### 安装

```shell
pnpm add -D lint-staged@^15.2.10
```



### 配置

#### 编写配置文件

再 `package.json` 中进行配置：

```json
{
   "lint-staged": {
      "./**/*.{js,jsx,ts,tsx,vue}": [
        "eslint --ext .js,.jsx,.vue,.ts,.tsx --fix --quiet ./"
      ],
      "*.{css,less}": [
        "stylelint --fix \"/src/**/*.{css,less}\""
      ]
    },
}
```

- 针对 `./**/*.{js,jsx,ts,tsx,vue}` 这些文件，使用 `eslint` 来检查和修正这些文件
- 针对 `*.{css,less}` 这些文件，使用 `stylelint` 来检查和修正这些文件

我们还可以把这些对应的脚本写成命令，如下：

```json
{
  "scripts": {
    "lint:script": "eslint --ext .js,.jsx,.vue,.ts,.tsx --ignore-pattern 'node_modules/*' --fix --quiet .",
    "lint:style": "stylelint --ignore-pattern 'node_modules/*' --fix \"src/**/*.{css,less}\"",
    "lint-staged": "lint-staged",
  },
  
  "lint-staged": {
      "./**/*.{js,jsx,ts,tsx,vue}": [
        "pnpm lint:script"
      ],
      "*.{css,less}": [
        "pnpm lint:style"
      ]
    },
}
```



#### 修改` pre-commit`钩子

修改文件 `.husky/pre-commit` ：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm  lint-staged
```

在提交前执行 `pnpm  lint-staged`， 别忘记配置一下这个命令啦：

```shell
"lint-staged": "lint-staged",
```



### 提交代码

提交一下

![image-20240908173353030](https://qn.huat.xyz/mac/202409081733067.png)

这样就只会校验暂存区中的文件啦。



## commitizen

Commitizen 是一个开源工具，用于**帮助开发者通过命令行工具生成符合约定的提交信息**。这些约定可以基于多种社区标准，如 Conventional Commits 规范。Commitizen 的主要目的是标准化提交信息的格式，使其更加清晰、一致，并便于管理版本和生成更好的发布日志。它提供了一个交互式的命令行界面，引导你填写提交消息的各个部分（如类型、范围、描述等），从而生成符合 `Conventional Commits` 规范的提交消息。

### 安装

```bash
pnpm add -D commitizen@^4.3.0 cz-conventional-changelog@^3.3.0
```

**commitizen**:

- `commitizen` 是一个帮助开发者创建符合特定格式的提交信息的工具。它通过提供一个交互式的命令行界面来引导开发者完成提交信息的填写，确保每条提交信息都是可读的、符合预定规范的。
- 使用 `commitizen`，开发者可以避免手动编写符合规范的提交信息，而是通过选择预设的选项来生成这些信息。这有助于维护项目的提交历史的一致性和可追踪性。

**cz-conventional-changelog**:

- `cz-conventional-changelog` 是一个 `commitizen` 的适配器，用于生成符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范的提交信息。Conventional Commits 是一种基于语义化版本控制的提交信息标准，它规定了提交信息的结构，包括类型、范围和描述。
- 使用 `cz-conventional-changelog` 时，它会提供一个交互式的步骤来生成各部分内容，例如选择更改类型（如 feat, fix, docs 等），指定更改范围，和详细描述更改内容。这使得版本管理更加清晰，也便于自动化工具（如 semantic-release）基于提交日志生成版本和变更日志。





### 配置

#### 增加commitizen配置

在 `package.json` 中添加以下配置：

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

这个配置是用于设置 `commitizen` 工具，它说明了如何指定 `commitizen` 使用特定的适配器——在这个案例中是 `cz-conventional-changelog`。具体配置的意义如下：

- **"config"**: 这是 `package.json` 文件中的顶层属性，用于包含项目的配置选项。
- **"commitizen"**: 这是放在 `config` 下的一个属性，专门用于配置 `commitizen` 相关的设置。
- **"path"**: 这个属性指定了 `commitizen` 应该使用的适配器的路径。这里的路径 `"./node_modules/cz-conventional-changelog"` 表示 `commitizen` 在运行时将加载位于项目 `node_modules` 目录下的 `cz-conventional-changelog` 包。

当你安装了 `commitizen` 和 `cz-conventional-changelog` 后，通过在项目的 `package.json` 文件中添加上述配置，你就告诉了 `commitizen` 每次执行 `git cz` 命令时，应该使用 `cz-conventional-changelog` 这个适配器来帮助生成符合 Conventional Commits 规范的提交信息。这个配置确保了所有的 Git 提交信息都遵循一定的标准格式，从而支持版本控制和自动化工具更有效地工作。



#### 添加命令

```shell
"cz": "git add . && cz"
```



### 提交代码

运行 `pnpm cz` 后，你会看到类似以下的交互式界面：

![image-20240908174650609](https://qn.huat.xyz/mac/202409081746638.png)



![image-20240908174756714](https://qn.huat.xyz/mac/202409081747747.png)

根据提示选择提交类型、填写范围、描述等信息，`Commitizen` 会自动生成符合 `Conventional Commits` 规范的提交消息。不过提示信息是英文的，如何自定义呢？



## cz-customizable

### 简介

`cz-customizable` 是一个可定制的 Commitizen 适配器，允许你根据项目的具体需求定制 Git 提交信息的格式。使用 `cz-customizable`，团队可以定义自己的提交信息规范，适应特定的工作流程和项目管理需求。



### 安装

```shell
pnpm add cz-customizable@^7.2.1
```



### 配置

#### 编写`.cz-config`

在项目根目录下创建一个 `.cz-config.js` 文件，并添加以下内容：

```javascript
module.exports = {
  // 定义提交类型的数组
  types: [
    { value: 'feat', name: '🎉 特性:    一个新的特性' }, // 特性: 添加新功能
    { value: 'fix', name: '🐛 修复:    修复一个Bug' }, // 修复: 解决bug
    { value: 'docs', name: '📚 文档:    文档变更' }, // 文档: 变更文档
    { value: 'style', name: '💄 格式:    代码格式（不影响代码运行的变动）' }, // 格式: 代码样式调整，不影响逻辑
    { value: 'refactor', name: '🔨 重构:    代码重构（既不是新增功能，也不是修复bug）' }, // 重构: 改进代码结构/设计
    { value: 'perf', name: '⚡️ 性能:    性能优化' }, // 性能: 提升性能
    { value: 'test', name: '✅ 测试:    添加一个测试' }, // 测试: 添加测试
    { value: 'chore', name: '🔧 工具:    开发工具变动（构建、脚手架工具等）' }, // 工具: 更新构建工具或辅助工具
    { value: 'revert', name: '⏪ 回退:    代码回退' } // 回退: 撤销之前的提交
  ],

  // 范围列表，当前为空
  scopes: [],

  // 是否允许提交信息包含工单号
  allowTicketNumber: false,
  // 工单号是否必填
  isTicketNumberRequired: false,
  // 工单号前缀
  ticketNumberPrefix: 'TICKET-',
  // 工单号的正则表达式，限定为1到5位数字
  ticketNumberRegExp: '\\d{1,5}',

  // 提交信息各部分的提示信息
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  // 是否允许自定义范围
  allowCustomScopes: true,
  // 允许标记破坏性变更的提交类型
  allowBreakingChanges: ['feat', 'fix'],
  // 跳过的问题列表
  skipQuestions: ['scope', 'body', 'footer'],

  // 提交信息标题的最大字符限制
  subjectLimit: 100
};

```

#### 配置自定义适配器

在 `package.json` 中配置 `Commitizen` 使用 `cz-customizable` 适配器：

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  },
  "cz-customizable": {
    "config": ".cz-config.cjs"
  }
},
```



### 提交代码

```bash
pnpm cz
```

![image-20240908192535612](https://qn.huat.xyz/mac/202409081925655.png)

就变成了我们自定义的配置啦！！！



## NPM钩子

是的，`prepare` 是 npm 的一个生命周期钩子。npm 脚本钩子是在包的生命周期的特定时刻自动执行的任务。这些钩子可以用来在安装、发布、测试等过程中自动化执行脚本。

以下是一些常用的 npm 生命周期钩子：

### 安装前后
- `preinstall`：在安装包之前运行。
- `install` 或 `postinstall`：在包安装后运行。

### 发布前后
- `prepublish`：在包发布前运行。
- `prepare`：在包被打包和发布之前，以及本地 `npm install` 无参数执行时运行。
- `prepublishOnly`：在包发布前运行，运行时机在 `prepare` 之后，`publish` 和 `pack` 命令之前。
- `postpublish`：在包发布后运行。

### 版本管理
- `preversion`：在改变包版本之前运行。
- `version`：在改变包版本后运行，且在提交和标记之前。
- `postversion`：在改变版本后运行，且在提交和标记之后。

### 测试
- `pretest`：在执行测试之前运行。
- `test`：执行测试。
- `posttest`：在测试执行后运行。

### 启动
- `prestart`：在启动脚本之前运行。
- `start`：启动脚本。
- `poststart`：在启动脚本之后运行。

### 停止
- `prestop`：在停止脚本之前运行。
- `stop`：停止脚本。
- `poststop`：在停止脚本之后运行。

### 其他
- `preuninstall`：在包卸载之前运行。
- `postuninstall`：在包卸载之后运行。
