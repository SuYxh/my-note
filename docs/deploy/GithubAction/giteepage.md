# GitHub Action 自动部署--同步至 Gitee Pages

## 背景

`github`的服务器在国外，因为某些原因，在大多数的网络环境下都是无法顺畅访问的

`gitee`的服务器在国内，由国内公司运营

纵使如此，大多数开发者还是习惯使用`github`（远在海外，也要想尽各种办法）

那么为什么需要把`github`和`gitee`的仓库进行同步呢？原因不言而喻

目前可用的进行同步的方法可能有：

- 利用`gitee`官方的同步（导入`github`项目），这种方法只能一次性导入
- 本地同时关联`gitee`和`github`，提交时都`push`一份，这种方法纯属手动
- 利用`github action`

下面介绍利用`github action`如何实现`github`到`gitee`的持续同步

## Github 代码同步到 Gitee

> 这里有 2 种方式可以选择，分别为 git-mirror-action 和 hub-mirror-action，使用时任选其一即可

### git-mirror-action

```yml
name: Sync

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:doocs/leetcode.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:Doocs/leetcode.git
```

**secrets.GITEE_RSA_PRIVATE_KEY 说明**

使用命令 ssh-keygen -t rsa -C "youremail@example.com" 生成 SSH Key。然后在当前的 GitHub 项目中添加 secret，命名为`GITEE_PRIVATE_KEY` ，内容为生成的私钥；然后将公钥添加到 gitee 设置中的 ssh 公钥中。

### hub-mirror-action

```yml
name: Sync Github Repos To Gitee

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-20.04
    steps:
      - name: Sync Github Repos To Gitee # 名字随便起
        uses: Yikun/hub-mirror-action@v1.1 # 使用Yikun/hub-mirror-action
        with:
          src: github/Hargeek # 源端账户名(github)
          dst: gitee/ssgeek # 目的端账户名(gitee)
          dst_key: ${{ secrets.GITEE_PRIVATE_KEY }} # SSH密钥对中的私钥
          dst_token: ${{ secrets.GITEE_TOKEN }} # Gitee账户的私人令牌
          account_type: user # 账户类型
          clone_style: "https" # 使用https方式进行clone，也可以使用ssh
          debug: true # 启用后会显示所有执行命令
          force_update: true # 启用后，强制同步，即强制覆盖目的端仓库
          static_list: "python-nianbao-struct" # 静态同步列表，在此填写需要同步的仓库名称，可填写多个
          timeout: "600s" # git超时设置，超时后会自动重试git操作
```

- GITEE_PRIVATE_KEY: 同上

- GITEE_TOKEN：在`gitee`打开个人设置—>安全设置—>私人令牌，新建一个私人令牌，命名随意，复制生成的令牌值；在`github`打开`settings`—>`Secrets->Actions`，新建一个`secret`，名为`GITEE_TOKEN`，值为复制的令牌值

## 部署到 Gitee Page

使用 `gitee-pages-action`来进行部署，详情参考官网https://github.com/marketplace/actions/gitee-pages-action 。

> 第一次部署会报错
>
> 首次需要手动登录 Gitee ，点击“启动”进行 Gitee Pages 服务的部署。

<p align="center">
   <img src="https://cdn.jsdelivr.net/gh/yanglbme/gitee-pages-action@main/images/logo.png">
</p>

### 参数说明

| 参数             | 描述                         | 是否必传 | 默认值   | 示例                       |
| ---------------- | ---------------------------- | -------- | -------- | -------------------------- |
| `gitee-username` | Gitee 用户名                 | 是       | -        | `yanglbme`                 |
| `gitee-password` | Gitee 密码                   | 是       | -        | `$ secrets.GITEE_PASSWORD` |
| `gitee-repo`     | Gitee 仓库（严格区分大小写） | 是       | -        | `doocs/leetcode`           |
| `branch`         | 要部署的分支（分支必须存在） | 否       | `master` | `main`                     |
| `directory`      | 要部署的分支上的目录         | 否       |          | `src`                      |
| `https`          | 是否强制使用 HTTPS           | 否       | `true`   | `false`                    |

## 完整示例

在 GitHub 项目 `.github/workflows/` 文件夹下创建一个 `.yml` 文件，如 `deploy_to_gitee.yml`，内容如下：

```yml
name: deployToGitee
env:
  # 7 GiB by default on GitHub, setting to 6 GiB
  # https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources
  NODE_OPTIONS: --max-old-space-size=6144
on:
  push:
    branches: [main]

jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # 设置服务器时区为东八区
      - name: Set time zone
        run: sudo timedatectl set-timezone 'Asia/Shanghai'

      - name: Setup Node.js v16.x
        uses: actions/setup-node@v1
        with:
          node-version: "16.x"

      - name: Install
        run: yarn install

      - name: Build
        run: yarn build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./dist
          personal_token: ${{ secrets.PERSONAL_TOKEN }}
          commit_message: Update ghPages
          force_orphan: true

      - name: Sync to Gitee
        uses: Yikun/hub-mirror-action@master
        with:
          src: "github/SuYxh"
          dst: "gitee/ironc"
          dst_key: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
          dst_token: ${{ secrets.GITEE_TOKEN }}
          static_list: "github_to_gitee"
          force_update: true
          debug: true

      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: ironc
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD，登录Gitee的密码
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: ironc/github_to_gitee
          # 是否强制使用 HTTPS
          https: false
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: gh-pages
```

### PERSONAL_TOKEN

![image-20220212222310816](https://qn.huat.xyz/mac/20220212222310.png)

![image-20220212222425670](https://qn.huat.xyz/mac/20220212222425.png)

将生成的 token 配置到当前 GitHub 项目的 secret 中即可

### GITEE_RSA_PRIVATE_KEY

在命令行终端或 Git Bash 使用命令 <code>ssh-keygen -t rsa -C "youremail@example.com"</code> 生成 SSH Key，注意替换为自己的邮箱。生成的 <code>id_rsa</code> 是私钥，<code>id_rsa.pub</code> 是公钥。(⚠️ 注意此处不要设置密码，生成的公私钥用于下面 GitHub / Gitee 的配置，以保证公私钥成对，否则从 GitHub -> Gitee 的同步将会失败。)

在 Gitee 的个人设置页面「<a href="https://gitee.com/profile/sshkeys">安全设置 -> SSH 公钥</a>」配置 SSH 公钥（即：<code>id_rsa.pub</code>），命名随意

在 GitHub 项目的`Settings -> Secrets-> Actions`路径下配置好命名为 `GITEE_RSA_PRIVATE_KEY` 的密钥，`GITEE_RSA_PRIVATE_KEY` 存放 id_rsa 私钥

### GITEE_TOKEN

1、在`gitee`打开个人设置—>安全设置—>私人令牌，新建一个私人令牌，命名随意，复制生成的令牌值

2、在`github`打开`settings`—>`secrets`，新建一个`secret`，名为`GITEE_TOKEN`，值为上面复制的令牌值

### GITEE_PASSWORD

在 GitHub 项目的`Settings -> Secrets-> Actions`路径下配置好命名为 `GITEE_PASSWORD` 的密钥。`GITEE_PASSWORD` 存放 Gitee 帐号的密码。

## 总结

先使用 [Yikun/hub-mirror-action](https://github.com/yikun/hub-mirror-action) 将 GitHub 仓库同步到 Gitee 仓库，再使用 [yanglbme/gitee-pages-action](https://github.com/yanglbme/gitee-pages-action) 实现 Gitee Pages 的自动部署。
