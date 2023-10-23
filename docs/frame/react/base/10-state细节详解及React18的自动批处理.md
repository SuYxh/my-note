# state 细节详解及 React18 的自动批处理

## 自动批处理

自动批处理，即有助于减少在状态更改时发生的重新渲染次数。在 React18 之前也有批处理的，但是在 Promise、setTimeout、原生事件中是不起作用的。

实际上自动批处理指的是，同一时机多次调用`setState()`方法的一种处理机制。

```jsx
handleClick = () => {
  this.setState({
    msg: "hi",
  });
  this.setState({
    count: 1,
  });
};
```

这里的代码当点击触发后，虽然调用了两次`setState()`方法，但是只会触发一次`render()`方法的重新执行。那么这就是所谓的自动批处理机制，这样是有助于性能的，减少重新执行的次数。

而且不管在什么时机下，都不会有问题的，这个在 React18 版本之前并不是所有的情况都好用的，比如：定时器。

```jsx
handleClick = () => {
  setTimeout(() => {
    this.setState({
      msg: "hi",
    });
    this.setState({
      count: 1,
    });
  }, 2000);
};
```

上面代码在 React18 之前的版本中，将会触发两次`render()`方法。默认是自动批处理的，当然也可以改成不是自动批处理的方式，通过`ReactDOM.flushSync`这个方法。

```jsx
handleClick = () => {
  ReactDOM.flushSync(() => {
    this.setState({
      msg: "hi",
    });
  });
  ReactDOM.flushSync(() => {
    this.setState({
      count: 1,
    });
  });
};
```

## 异步处理

既然 React18 对多次调用采用的是自动批处理机制，那么就说明这个`setState()`方法是异步的，所以要注意方法调用完后，我们的 state 数据并不会立即发生变化，因为 state 可能会被先执行了。

```jsx
handleClick = () => {
  /* this.setState({
          count: this.state.count + 1
        });
        console.log( this.state.count ); */
  this.setState(
    {
      count: this.state.count + 1,
    },
    () => {
      //异步执行结束后的回调函数
      console.log(this.state.count);
    }
  );
};
```

可利用`setState()`方法的第二个参数来保证数据更新后再去执行。这里还要注意同样的数据修改只会修改一次，可利用`setState()`的回调函数写法来保证每一次都能触发。

```jsx
handleClick = () => {
  /* this.setState({
          count: this.state.count + 1
        });
        this.setState({
          count: this.state.count + 1
        });
        this.setState({
          count: this.state.count + 1
        }); */
  this.setState((state) => ({ count: state.count + 1 }));
  this.setState((state) => ({ count: state.count + 1 }));
  this.setState((state) => ({ count: state.count + 1 }));
};
```

这样页面按钮点击一次，count 会从 0 直接变成了 3。
