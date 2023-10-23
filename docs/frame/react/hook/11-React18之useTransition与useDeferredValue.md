# React18 之 useTransition 与 useDeferredValue

在上一个小节中，我们学习了 startTransiton 这个方法，在本小节中讲学习两个辅助操作的方法，可以方便使用 sartTransiton。

## useTransition

useTransition 返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。

```jsx
let { memo, useState, useTransition } = React;
let List = memo(({ query }) => {
  const text = "hello world";
  const items = [];

  if (query !== "" && text.includes(query)) {
    const arr = text.split(query);
    for (let i = 0; i < 10000; i++) {
      items.push(
        <li key={i}>
          {arr[0]}
          <span style={{ color: "red" }}>{query}</span>
          {arr[1]}
        </li>
      );
    }
  } else {
    for (let i = 0; i < 10000; i++) {
      items.push(<li key={i}>{text}</li>);
    }
  }

  return <ul>{items}</ul>;
});
let Welcome = memo(() => {
  const [searchWord, setSearchWord] = useState("");
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const handleChange = (ev) => {
    setSearchWord(ev.target.value); //第一个任务
    startTransition(() => {
      setQuery(ev.target.value); //第二个任务(不紧急的任务)
    });
  };
  return (
    <div>
      <input type="text" value={searchWord} onChange={handleChange} />
      {pending ? <div>loading...</div> : <List query={query} />}
    </div>
  );
});
```

利用 useTransition 方法得到两个值，分别是：pending 和 startTransiton。pending 是一个等价的状态。当没有成功前 pending 得到 true，当操作完成后，pending 就会变成 false，这样就会有更好的用户体验效果。

## useDeferredValue

useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。

```jsx
let { memo, useState, useDeferredValue } = React;
let List = memo(({ query }) => {
  const text = "hello world";
  const items = [];
  if (query !== "" && text.includes(query)) {
    const arr = text.split(query);
    for (let i = 0; i < 10000; i++) {
      items.push(
        <li key={i}>
          {arr[0]}
          <span style={{ color: "red" }}>{query}</span>
          {arr[1]}
        </li>
      );
    }
  } else {
    for (let i = 0; i < 10000; i++) {
      items.push(<li key={i}>{text}</li>);
    }
  }
  return <ul>{items}</ul>;
});
let Welcome = memo(() => {
  const [searchWord, setSearchWord] = useState("");
  const query = useDeferredValue(searchWord); // query就是不紧急时候的值(延迟后的值)
  const handleChange = (ev) => {
    setSearchWord(ev.target.value); //第一个任务
  };
  return (
    <div>
      <input type="text" value={searchWord} onChange={handleChange} />
      <List query={query} />
    </div>
  );
});
```

useDeferredValue()可以直接得到不紧急的值 query，所以简化了操作，内部自动进行了 startTransiton 调用。
