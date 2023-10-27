# 详解 route 对象与 router 对象

在前面小节中，我们频繁的使用过 route 对象和 router 对象，这两个对象在路由中非常的重要，下面我们来详细的学习一下。

## route 对象与 router 对象

首先 route 对象用来获取路由信息，而 router 对象用来调用路由方法的。具体区别在于，route 对象是针对获取操作的，主要是操作当前路由的，而 router 对象是针对设置操作的，主要是操作整个路由系统对应的功能。

route 对象具体功能如下：

- fullPath
- hash
- href
- matched
- meta
- name
- params
- path
- query

主要就是一些路由信息，像常见的动态路由参数，query 数据，meta 元信息，url 路径等等。

router 对象具体功能如下：

- addRoute
- afterEach
- back
- beforeEach
- beforeResolve
- currentRoute
- forward
- getRoutes
- go
- hasRoute
- push
- removeRoute

主要就是一些方法，动态改变路由表，路由守卫， 历史记录的前进后退，编程式路由等等。
