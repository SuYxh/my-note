# 自动部署 Github Page

在你需要部署到 Github Page 的项目下，建立一个 yml 文件，放在 `.github/workflow` 目录下。你可以命名为 `ci.yml`，它类似于 Jenkins 的 `Jenkinsfile` 文件，里面包含的是要自动执行的脚本代码。

### yml

这个 yml 文件的内容如下：

```yml
name: Build and Deploy
on: # 监听 main 分支上的 push 事件
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # 构建环境使用 ubuntu
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.1
        with:
          persist-credentials: false

      - name: Install and Build # 下载依赖 打包项目
        run: |
          npm install
          npm run build
      - name: Deploy # 将打包内容发布到 github page
        uses: JamesIves/github-pages-deploy-action@4.1.7 # 使用别人写好的 actions
        with: # 自定义环境变量
          ACCESS_TOKEN: ${{ secrets.ACTION_DEMO_TOKEN }}
          BRANCH: gh-pages
          FOLDER: dist
          REPOSITORY_NAME: SuYxh/SuYxh.github.io # 这是我的 github page 地址
          TARGET_FOLDER: github_action_demo # 打包的文件将放到静态服务器 github_action_demo 目录下
```

或者

```yml
name: GitHub Actions Build and Deploy

# 触发条件: push 到 master 分支后
on:
  workflow_dispatch:
  push:
    branches:
      - main

# 设置上海时区
env:
  TZ: Asia/Shanghai

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 安装 pnpm
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      # 设置 node 版本
      - name: Set node version to 18
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "pnpm"

      # 打包静态文件
      - name: Build
        run: pnpm install && pnpm run build:github

      - name: Copy files
        run: cp README.md ./dist/

      # 部署
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          # GitHub 密钥
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 指定仓库
          REPOSITORY_NAME: SuYxh/my-note
          # GitHub Pages 读取的分支
          BRANCH: gh-pages
          # 静态文件所在目录
          FOLDER: dist
```

并且在`package.json`在文件中添加命令： `build:github` ， 对应的内容

```shell
"build:github": "cross-env APP_BASE_PATH=/my-note/ npm run build",
```

### 变量配置

`ACTION_DEMO_TOKEN` 配置方式

1. 打开 Github 网站，点击你右上角的头像，选择 `settings`。

   <img src="https://qn.huat.xyz/mac/20220212155204.png" alt="image-20220212155158921" style="zoom:50%;" />

2. 点击左下角的 `developer settings`。

   ![image-20220212160122604](https://qn.huat.xyz/mac/20220212160122.png)

3. 在左侧边栏中，单击 `Personal access tokens（个人访问令牌）`，单击 `Generate new token（生成新令牌）`。

   ![image-20220212160700914](https://qn.huat.xyz/mac/20220212160700.png)

4. 输入名称并勾选 `repo`，拉到最下面，点击 `Generate token`，并将生成的 token 保存起来。

   ![image-20220212161059771](https://qn.huat.xyz/mac/20220212161059.png)

   ![image-20220212161124457](https://qn.huat.xyz/mac/20220212161124.png)

5. 打开 Github 项目，点击 `settings`。点击 `secrets`->`Action`。

   ![image-20220212161921381](https://qn.huat.xyz/mac/20220212161921.png)

6. 创建一个密钥，名称随便填（中间用下划线隔开），内容填入刚才创建的 token。

   ![image-20220212162004788](https://qn.huat.xyz/mac/20220212162004.png)

将上文代码中的 `ACTION_DEMO_TOKEN` 替换成刚才创建的 secret，保存后，提交到 Github。

以后你的项目只要执行 `git push`，Github Actions 就会自动构建项目并发布到你的 Github Page 上。

Github Actions 的执行详情点击仓库中的 `Actions` 选项查看。

![image-20220212162209803](https://qn.huat.xyz/mac/20220212162209.png)

演示地址 https://suyxh.github.io/github_action_demo/#/

具体详情可以参考一下我的 demo 项目 **[github_action_demo](https://github.com/SuYxh/github_action_demo)**。
