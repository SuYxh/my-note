echo 'start!'
pnpm build
scp -r ./dist root@182.92.240.250:/www/wwwroot/blog.ironc.cn
echo 'over'