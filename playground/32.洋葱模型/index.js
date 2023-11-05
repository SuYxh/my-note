// 模拟 Koa 的 Context 对象
class Context {
  constructor() {
    this.data = {};
  }
}

// 模拟 Koa 的中间件机制
class Onion {
  constructor() {
    this.middlewares = [];
  }

  // 使用 use 方法添加中间件
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // 执行中间件
  async execute(context) {
    const dispatch = (i) => {
      if (i === this.middlewares.length) return Promise.resolve();
      const middleware = this.middlewares[i];
      return Promise.resolve(middleware(context, () => dispatch(i + 1)));
    };

    return dispatch(0);
  }
}

// 使用示例
const app = new Onion();

// 添加第一个中间件
app.use(async (ctx, next) => {
  console.log("Middleware 1 Start");
  ctx.data["1"] = "first";
  await next();
  console.log("Middleware 1 End");
});

// 添加第二个中间件
app.use(async (ctx, next) => {
  console.log("Middleware 2 Start");
  ctx.data["2"] = "second";
  await next();
  console.log("Middleware 2 End");
});

// 添加第三个中间件
app.use(async (ctx, next) => {
  console.log("Middleware 3 Start");
  ctx.data["3"] = "third";
  await next();
  console.log("Middleware 3 End");
});

// 创建上下文并执行中间件
const ctx = new Context();
app.execute(ctx).then(() => {
  console.log("All middlewares are finished.");
  console.log(ctx.data); // { '1': 'first', '2': 'second', '3': 'third' }
});
