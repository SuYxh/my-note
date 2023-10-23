# React18 与 Vue3 对比之 diff 算法的相同策略与不同策略

## diff 算法的相同策略

首先两个框架都是采用了同层级对比的方式，这样可以大大减少对比的次数。

![18-01-diff算法同层级对比](https://qn.huat.xyz/mac/202310231353747.png)

当两个节点进行对比的时候，要分不同的情况进行处理。

<div align=center>
    <img src="https://qn.huat.xyz/mac/202310231352323.png" />
    <div>diff算法对比情况</div>
</div>

大部分的策略都是一样的，只有当两个字节都存在子节点的时候，对比方案才有所区别。

## diff 算法的不同策略

下面是一个具体的案例，来分别看一下 Vue 和 React 是如何进行处理的。

![18-03-子节点不同的案例](https://qn.huat.xyz/mac/202310231354843.png)

下面先看一下 Vue 的策略，即数组格式，首尾对比，最长递增子序列。

![18-04-Vue的diff策略](https://qn.huat.xyz/mac/202310231354848.png)

再看一下 React 的策略，即 r 链表格式，从左到右，索引比较。

![18-05-React的diff策略](https://qn.huat.xyz/mac/202310231354792.png)
