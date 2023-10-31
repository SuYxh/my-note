echo 'start!'
pnpm build
scp -r ./dist root@120.46.190.74:/www/wwwroot/blog.vuejs.news
echo 'over'