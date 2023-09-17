## env

```nginx
# 配置服务器信息
serverHost=120.19.10.15
serverUser=root
serverPassword=yasgjdnabsdma

# 配置 GIT 仓库信息
gitRepoUrl=https://gitee.com/ironc/test-service
gitBranchName=master

# 服务器上的项目目录
gitLocalFolder=/var/www/test-service

# 配置pm2
pm2AppName=test-service
```

## deploy.js

```nginx
const ssh2 = require('ssh2');
require('dotenv').config()

// 配置服务器信息
const serverHost = process.env.serverHost;
const serverUser = process.env.serverUser;
const serverPassword = process.env.serverPassword;

// 配置 GIT 仓库信息
const gitRepoUrl = process.env.gitRepoUrl;
const gitBranchName = process.env.gitBranchName;
const gitLocalFolder = process.env.gitLocalFolder;

// 配置pm2
const pm2AppName = process.env.pm2AppName;

// 创建 SSH 连接
const ssh = new ssh2.Client();
ssh.on('error', (err) => {
  console.log('Error connecting to SSH server:', err);
});
ssh.on('ready', () => {
  console.log('Connected to SSH server');
  // 在服务器上执行拉取代码的命令
  ssh.exec(`cd ${gitLocalFolder} && git checkout ${gitBranchName} && git pull origin ${gitBranchName}`, (err, stream) => {
    if (err) {
      console.log('Error pulling code from git repo:', err);
      ssh.end();
      return;
    }
    // 输出拉取代码的命令执行的输出
    stream.on('data', (data) => {
      console.log('Pulling code from git repo:', data.toString());
    });
    stream.on('end', () => {
      console.log('Code pulled from git repo successfully');

      // 重新安装依赖
      ssh.exec('npm install', (err, stream) => {
        if (err) {
          console.log('Error install:', err);
          ssh.end();
          return;
        }
        // 安装依赖 进程的命令执行的输出
        stream.on('data', (data) => {
          console.log('npm install:', data.toString());
        });
        stream.on('end', () => {
          console.log('npm install successfully');

          // 在服务器上执行重新启动 pm2 进程的命令
          ssh.exec(`pm2 restart ${pm2AppName}`, (err, stream) => {
            if (err) {
              console.log('Error restarting app with pm2:', err);
              ssh.end();
              return;
            }
            // 输出重新启动 pm2 进程的命令执行的输出
            stream.on('data', (data) => {
              console.log('Restarting app with pm2:', data.toString());
            });
            stream.on('end', () => {
              console.log('App restarted with pm2 successfully');
              // 断开 SSH 连接
              ssh.end();
            });
          });
        });
      });
    });
  });
});


ssh.connect({
  host: serverHost,
  username: serverUser,
  password: serverPassword,
});
```
