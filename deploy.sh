echo 'start!'
pnpm build
scp -r ./dist root@120.46.190.74:/www/wwwroot/note.vuejs.news
echo 'over'