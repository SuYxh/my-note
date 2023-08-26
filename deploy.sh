echo 'start!'
pnpm build:blog
scp -r ./dist root@120.46.190.74:/www/wwwroot/demo.ironc.cn/blog
echo 'over'