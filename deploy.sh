echo 'start!'
pnpm build
scp -r ./dist root@120.46.190.74:/www/wwwroot/blog.ironc.cn
echo 'over'