## release-it

### 简介

`release-it` 是一个自动化版本管理和发布软件包的工具，主要用于简化代码库中的版本发布流程。它适用于多种编程语言的项目，特别是 JavaScript 和 Node.js 项目，可以通过命令行界面操作。下面是一些关于 `release-it` 的关键特点：

- **自动版本控制**：`release-it` 可以自动更新项目的版本号，支持语义化版本（SemVer），并根据项目的变更自动决定版本号的更新（如主版本、次版本或补丁）。

-  **生成变更日志**：它可以自动从 Git 提交历史中生成变更日志，使用如 `conventional-changelog` 这样的工具来分类和格式化提交信息。

- **Git 操作**：`release-it` 自动处理 Git 标签的创建和推送，确保新版本的标签正确设置在版本库中。它还可以推送变更到远程仓库。

- **发布到 npm**：对于 Node.js 库，`release-it` 可以自动将新版本发布到 npm，处理如登录、打包、发布等步骤。

- **插件系统**：支持通过插件扩展功能，例如可以集成 Slack 通知、Docker、GitHub Releases 等。

- **高度可配置**：`release-it` 提供了丰富的配置选项，允许用户根据具体需求调整发布流程，如定义预发布脚本、自定义 Git 提交信息等。

- **支持预发布和构建版本**：可以管理 alpha、beta 等预发布版本，以及构建号的生成。

使用 `release-it` 通常涉及到在项目根目录下配置一个 `.release-it.json` 或 `release-it.js` 配置文件，定义所有发布相关的参数和选项。这使得发布流程更加自动化和一致，减少了人为错误和手动操作的需求。

> `conventional-changelog` 是一个用于自动生成变更日志的工具，它依赖于项目的 Git 提交信息遵循一定的约定（conventional commit messages）。这个约定通常基于 [AngularJS 提交信息指南](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)，但也可以配置为使用其他风格。



### 使用

#### 安装

首先，你需要在你的项目中安装 `release-it`。你可以选择全局安装或本地安装：

```bash
pnpm add -D  release-it@15.6.0
```

#### 配置

`release-it` 可以通过配置文件进行配置。你可以在项目根目录下创建一个 `.release-it.json` 文件。

以下是一个简单的配置示例：

```json
{
  "git": {
    "requireCleanWorkingDir": true,
    "requireUpstream": true,
    "commit": true,
    "commitMessage": "chore: release v${version}}",
    "tag": true,
    "tagName": "v${version}",
    "tagAnnotation": "Release v${version}",
    "push": true
  },
  "npm": {
    "publish": false,
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "github": {
    "release": true,
    "releaseName": "v${version}",
    "releaseNotes": "npx auto-changelog --stdout --commit-limit false -u"
  },
  "hooks": {
    "after:bump": "npx auto-changelog -p"
  },
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}

```



##### Git 配置

- **requireCleanWorkingDir**: 要求工作目录在发布前是干净的（无未提交的更改），确保发布的代码状态明确。
- **requireUpstream**: 要求本地分支有一个上游分支，也就是本地分支需要与远程分支关联，这是为了确保能够正确地推送更改。
- **commit**: 允许 `release-it` 创建一个 Git 提交。
- **commitMessage**: 设置 Git 提交信息的格式。使用 `${version}` 来动态插入新的版本号。**注意使用了 `chore` 开头，符合 `commitlint` 规范**
- **tag**: 允许 `release-it` 创建一个 Git 标签。
- **tagName**: 设置 Git 标签的名称。
- **tagAnnotation**: 设置 Git 标签的注释。
- **push**: 允许 `release-it` 将更改推送到远程仓库。



##### npm 配置

- **publish**: 设置为 `false` 表示不自动将包发布到 npm。这在你可能只想更新仓库而不发布新版本到 npm 时很有用。
- **access**: 控制发布的包是公开的还是私有的。默认情况下，npm 假设所有新的包都是私有的，除非指定。
- **registry**: 指定发布 npm 包时使用的注册表。这在你使用私有注册表或者希望发布到不同的 npm 环境（如 npmjs.org 或 GitHub Packages）时非常有用。
- **ignoreScripts**: 设置是否在发布前忽略 npm 脚本的执行。这可以防止在发布过程中运行预定义的脚本，如 `prepublish` 和 `postpublish` 脚本。
- **publishPath**：指定 npm 应该从哪个目录执行 `npm publish` 命令。默认情况下，如果不设置 `publishPath`，`npm publish` 将在项目根目录执行，它会根据根目录下的 `package.json` 中的 `files` 字段来确定哪些文件需要包含在发布的包中。



使用 `publishPath` 主要是为了以下几个场景：

- **构建产物**：如果你的项目需要构建（如 TypeScript 项目需要编译为 JavaScript），构建输出通常放在如 `dist` 或 `build` 目录中。设置 `publishPath` 可以直接在这个构建输出目录中运行 `npm publish`，确保发布的是正确的构建文件。
- **子项目**：在管理多个包的仓库（如使用 Lerna 管理的 monorepo）时，可以为每个子项目单独设置 `publishPath`，确保从正确的子项目目录发布。



NPM 登录处理

关于 npm 登录，`release-it` 默认假设你已经在命令行环境中登录了 npm（通过运行 `npm login`）。当你执行 `release-it` 且配置了自动发布到 npm 时，它将使用你的 npm 账户凭据进行发布。

如果启用了 npm 的双因素认证（2FA），则需要在发布时提供一次性密码（OTP）。`release-it` 支持通过配置文件或在运行时提示输入 OTP 来处理这种情况。配置示例如下：

```json
"npm": {
  "publish": true,
  "otpPrompt": true  // 在需要时在命令行提示输入 OTP
}
```

如果你在一个自动化的环境（如 CI/CD 管道）中使用 `release-it`，你需要确保 npm 的认证令牌被正确设置在环境变量中，或者使用 `.npmrc` 配置文件来管理认证。如果你还没有登录到 npm，当你尝试使用 `release-it`（或任何其他自动化工具）发布包到 npm 时，你将遇到授权相关的错误。





##### GitHub 配置

- **release**: 允许 `release-it` 在 GitHub 创建一个新的发布。
- **releaseName**: 设置 GitHub 发布的名称。
- **releaseNotes**: 使用 `auto-changelog` 命令生成发布说明。该命令将会列出所有的提交，并以标准输出的形式提供，使用 `-u` 参数来包含未解决的提交。
- **token**: GitHub 的访问令牌，用于授权 `release-it` 访问你的 GitHub 仓库。
- **assets**: 指定一个或多个文件或目录作为发布的附件上传到 GitHub。可以是具体文件的路径或符合 glob 模式的路径。
- **repo**: 指定要发布的 GitHub 仓库，格式为 `"username/repo"`。通常情况下，`release-it` 会自动从 Git 配置中获取仓库信息，但如果你需要发布到另一个仓库，可以在这里指定。



##### 钩子（Hooks）

- after:bump ：在版本号增加后执行的命令，这里是运行 `auto-changelog` 来更新变更日志并自动提交（由 `-p` 参数指示）。



```json
{
  "hooks": {
  	// 在 release-it 流程启动前执行, 用途：运行前置检查，如运行测试、清理操作等。
    "before:init": ["echo 'Starting release process...'"],
    // 在 release-it 流程初始化完成后执行，用途：设置环境变量或进行初步配置。
    "after:init": ["echo 'Initialization complete!'"],
    // 在项目版本号提升之前执行，用途：执行代码检查、生成文档等
    "before:bump": ["npm run lint"],
    // 在项目版本号提升后执行。用途：更新变更日志、构建项目。
    "after:bump": ["npx auto-changelog -p", "npm run build"],
    // 在发布之前执行。用途：执行最终的验证或者清理步骤。
    "before:release": ["echo 'Final checks before release...'"],
    // 在发布完成后执行。用途：通知团队成员、部署到生产环境、清理操作。
    "after:release": ["npm run deploy", "echo 'Release completed!'"]
  }
}
```



##### Commitizen 配置

- **path**: 指定 Commitizen 使用的自定义配置路径，这里使用的是 `cz-customizable`，它允许你自定义提交信息的格式。



#### 发布

安装并配置好 `release-it` 后，你可以通过以下命令来执行发布流程：

```bash
"release": "release-it",
```

运行这个命令后，`release-it` 会提示你选择要发布的版本类型（如 `patch`, `minor`, `major`），然后它会自动执行以下步骤：

1. **更新版本号**：根据你选择的版本类型（`patch`, `minor`, `major`）更新 `package.json` 中的版本号。
2. **生成 Git 提交**：将更改提交到 Git 仓库，并生成一个带有版本号的 Git 标签。
3. **推送 Git 标签**：将标签推送到远程仓库。
4. **创建 GitHub/GitLab 发布**：如果配置了 `github.release` 或 `gitlab.release`，`release-it` 会自动在 GitHub 或 GitLab 上创建一个发布。



运行命令

![image-20240908203630190](https://qn.huat.xyz/mac/202409082036213.png)



github 截图

![image-20240908203728150](https://qn.huat.xyz/mac/202409082037173.png)



### 插件开发

需求：开发一个在发布结束后进行消息通知的 `release-it` 插件。这个插件将在 `release-it` 发布流程的最后阶段发送一个通知消息到控制台。这里只是用来模拟，你还可以进行通知到群里等。

#### 初始化插件项目

1、**创建插件目录并初始化**：

```bash
mkdir release-it-notification-plugin
cd release-it-notification-plugin
```

2、**初始化 npm 包**：

```bash
npm init -y
```

#### 编写插件

**创建插件文件**（`index.js`）：

```javascript
/**
 * NotificationPlugin 用于 release-it
 * 该插件在 release-it 的发布流程的不同阶段提供控制台日志通知，
 * 表明发布流程的进展。
 */
class NotificationPlugin {
  /**
   * 构造函数，初始化插件实例，配置和上下文。
   * @param {Object} config - 特定于此插件的配置设置，由 release-it 传递。
   * @param {Object} context - release-it 提供的上下文，包括日志记录器和版本信息。
   */
  constructor(config, context) {
    this.config = config;
    this.context = context;
  }

  /**
   * 初始化插件。这在 release-it 生命周期中被调用一次。
   * 这是设置或验证配置的好地方。
   */
  init() {
    this.log = this.context.log; // 使用 release-it 的内建日志功能进行输出。
    console.log('插件初始化完成。');
  }

  /**
   * 在发布流程初始化开始前调用的钩子。
   * 用于执行初始化前的任务，如设置环境变量等。
   */
  beforeInit() {
    console.log('正在准备初始化发布流程...');
  }

  /**
   * 在发布流程初始化完成后调用的钩子。
   * 可以在这里执行依赖于完全初始化环境的操作。
   */
  afterInit() {
    console.log('发布流程初始化完成。');
  }

  /**
   * 在版本号提升前调用的钩子。
   * 这对于必须在项目版本号增加之前发生的任务非常有用。
   */
  beforeBump() {
    console.log('正在准备提升版本号...');
  }

  /**
   * 在版本号已被提升后调用的钩子。
   * 适用于在新版本号应用后应执行的任务，如生成包含版本的文件。
   */
  afterBump() {
    console.log('版本提升完成。');
  }

  /**
   * 在执行发布任务前调用的钩子。
   * 这可以用于发布前的检查或设置任务。
   */
  beforeRelease() {
    console.log('正在准备发布...');
  }

  /**
   * 在所有发布任务完成后调用的钩子。
   * 这是执行发布后任务的好地方，如通知或清理。
   * @param {string} message - 发布后要记录的自定义消息，可以通过插件设置配置。
   */
  afterRelease() {
    const message = this.config.message || '发布流程成功完成！';
    console.log(message);
  }
}

module.exports = NotificationPlugin;

```

这里列出一些常用的 `release-it` 钩子，并在每个钩子中添加一个 `console.log` 以示例其使用：

- **beforeInit**: 在初始化流程开始前执行。
- **afterInit**: 在初始化流程完成后执行。
- **beforeBump**: 在版本号提升前执行。
- **afterBump**: 在版本号提升后执行。
- **beforeRelease**: 在发布前执行。
- **afterRelease**: 在发布后执行。



#### 使用和测试插件

1、**在另一个项目中安装并配置插件**：

假设你的插件文件位于本地某个目录，你可以通过本地路径将其加入到另一个项目中。

```bash
npm install --save-dev /path/to/release-it-notification-plugin
```

2、**配置 `release-it`**：

修改或创建项目的 `.release-it.json` 配置文件，添加你的插件：

```json
{
  "plugins": {
    "/path/to/release-it-notification-plugin": {
      "message": "Custom release finished!"
    }
  }
}
```



- **"plugins"**: 这是 `release-it` 中用于定义所有插件配置的顶级键。
- **"/path/to/release-it-notification-plugin"**: 这应该匹配你的插件名称或路径，确保 `release-it` 能正确加载它。
- **"message"**: 这是传递给插件的配置项，根据你的插件设计来定义。在这个示例中，`message` 是一个自定义消息文本，插件会在发布结束后在控制台输出这条消息。



#### 发布插件

完成测试后，你可以将插件发布到 npm，以便其他项目也可以使用。



