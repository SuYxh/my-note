`deploy.sh`

```shell
echo 'start deploy'
pnpm build

# 网站1
# echo 'start copy to gpt-plus.huat.xyz'
# echo '~~~~~~~~~~~~~~~'
# scp -r ./dist root@23.224.197.125:/www/wwwroot/gpt-plus.huat.xyz/
# echo '~~~~~~~~~~~~~~~'
# echo 'over copy to gpt-plus.huat.xyz'

# 网站2
echo 'start copy to gpt.vuejs.news'
echo '~~~~~~~~~~~~~~~'
scp -r ./dist root@23.224.197.125:/www/wwwroot/gpt.vuejs.news/
echo '~~~~~~~~~~~~~~~'
echo 'over copy to gpt.vuejs.news'

echo 'over deploy'
```

增加可执行权限

```
chmod +x deploy.sh
```
