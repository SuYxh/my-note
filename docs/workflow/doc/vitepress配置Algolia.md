# Algolia

## 申请

地址： https://docsearch.algolia.com/apply/

vitepress 搜索使用 algolia,使用前需要申请 appId,appKey,indexName， 申请后需要回复邮件确认。

- 您必须是该网站的所有者，或至少有更新其内容的权限
- 你的网站必须是公开的
- 你的网站必须是一个开源项目或技术博客的技术文档，不授权于商业内容
- 你的网站必须到生产环境

可以回复：

```
I am the site owner and can change the content of the site
```

收到的回复：

![image-20230829094815703](https://qn.huat.xyz/mac/202308290948721.png)

如果你已经注册了账号之后申请的，收到邮件后，去同意一下邀请，如果没有注册，点击 **[Accept this invitation to join your application and get started!](https://www.algolia.com/users/invitation/accept?invitation_token=zskYb9iykfmx7b12N9s1)** 去注册登陆。

algolia 控制台： https://dashboard.algolia.com/

crawler 控制台： https://crawler.algolia.com/admin/crawlers?sort=status&order=ASC&limit=20&appId=xxx

## vitepress 配置

```typescript
import type { DefaultTheme } from "vitepress";

export const algolia: DefaultTheme.AlgoliaSearchOptions = {
  appId: "xxx", // 换成你的
  apiKey: "xxx", // 换成你的
  indexName: "xxx", // 换成你的
  placeholder: "搜索",
  translations: {
    button: {
      buttonText: "搜索",
      buttonAriaLabel: "搜索",
    },
    modal: {
      searchBox: {
        resetButtonTitle: "清除查询条件",
        resetButtonAriaLabel: "清除查询条件",
        cancelButtonText: "取消",
        cancelButtonAriaLabel: "取消",
      },
      startScreen: {
        recentSearchesTitle: "搜索历史",
        noRecentSearchesText: "没有搜索历史",
        saveRecentSearchButtonTitle: "保存至搜索历史",
        removeRecentSearchButtonTitle: "从搜索历史中移除",
        favoriteSearchesTitle: "收藏",
        removeFavoriteSearchButtonTitle: "从收藏中移除",
      },
      errorScreen: {
        titleText: "无法获取结果",
        helpText: "你可能需要检查你的网络连接",
      },
      footer: {
        selectText: "选择",
        navigateText: "切换",
        closeText: "关闭",
        searchByText: "搜索提供者",
      },
      noResultsScreen: {
        noResultsText: "无法找到相关结果",
        suggestedQueryText: "你可以尝试查询",
        reportMissingResultsText: "你认为该查询应该有结果？",
        reportMissingResultsLinkText: "点击反馈",
      },
    },
  },
};
```

## ci 配置

`algolia.yml`

```yml
name: algolia
on:
  push:
    branches:
      - main
jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Get the content of algolia.json as config
        id: algolia_config
        run: echo "config=$(cat crawlerConfig.json | jq -r tostring)" >> $GITHUB_OUTPUT
      - name: Push indices to Algolia
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.APPLICATION_ID }}
          API_KEY: ${{ secrets.API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
```

## 问题

1、登陆控制台的时候可能出现：

```
Your Algolia plan does not allow you to access the Crawler.
Please contact the support or your Customer Success Manager if you want to know more.
```

这个时候，直接给官网发邮件，然后会帮你开权限：

```
When I login to https://crawler.algolia.com/admin/users/login with my account number 1806328384@qq.com, the page gives me a prompt:

Your Algolia plan does not allow you to access the Crawler.
Please contact the support or your Customer Success Manager if you want to know more.

Why is this happening?
```

2、Index not allowed with this API Key

![img](https://qn.huat.xyz/mac/202308290956481.avis)

解决： 把你项目的 apikey 换一下就好了，你配置的这个 key 没有权限。

在这里去找 key： https://dashboard.algolia.com/account/api-keys

![image-20230829100003846](https://qn.huat.xyz/mac/202308291000875.png)

## 参考

vitepress 添加 Algolia 搜索

https://juejin.cn/post/7202987088151887929

VitePress 如何开启 algolia 搜索功能

https://zhuanlan.zhihu.com/p/645455037

vitepress 如何开启 algolia 全文搜索

https://juejin.cn/post/7161320316285747231

VuePress 博客优化之开启 Algolia 全文搜索

https://juejin.cn/post/7070109475419455519

https://crawler.algolia.com/admin/users/login?

https://crawler.algolia.com/admin/crawlers?sort=status&order=ASC&limit=20

https://dashboard.algolia.com/apps/B6VEKNQSXN/explorer/browse/my-note-index?searchMode=search
