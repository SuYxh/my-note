# npm或Yarn 转 pnpm

可参考`vue`代码库的这一次升级[commit log](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fcore%2Fcommit%2F61c5fbd3e35152f5f32e95bf04d3ee083414cecb%23diff-18ae0a0fab29a7db7aded913fd05f30a2c8f6c104fadae86c9d217091709794c)

操作步骤：

全局安装`pnpm`

```bash
npm install -g pnpm
```

删除`npm`或`yarn`生成的`node_modules`

```bash
# 项目目录下运行或手动物理删除
rm -rf node_modules
```

`pnpm import`从其他软件包管理器的`lock` 文件生成 `pnpm-lock.yaml`，再执行`pnpm install --frozen-lockfile`（相当于`npm ci`）生成依赖，防止没有lock文件意外升级依赖包，导致项目出错

```bash
# 生成`pnpm-lock.yaml`
pnpm import

# 安装依赖
pnpm install --frozen-lockfile
```

删除`npm`或`yarn`生成的`lock`文件

```bash
# 删除package-lock.json
rm -rf package-lock.json
# 删除yarn.lock
rm -rf yarn.lock
```

项目中的`npm`命令等修改为`pnpm`，包括`README`文档、运行命令等