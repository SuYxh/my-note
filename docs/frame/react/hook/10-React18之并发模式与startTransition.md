# React18 之并发模式与 startTransition

React 18 之前，渲染是一个单一的、不间断的、同步的事务，一旦渲染开始，就不能被中断。

React 18 引入并发模式，它允许你将标记更新作为一个 transitions，这会告诉 React 它们可以被中断执行。这样可以把紧急的任务先更新，不紧急的任务后更新。

利用 startTransition 这个方法来实现不紧急的任务操作。

```jsx
let { memo, useState, startTransition } = React;
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
  const handleChange = (ev) => {
    setSearchWord(ev.target.value); //第一个任务
    startTransition(() => {
      setQuery(ev.target.value); //第二个任务(不紧急的任务)
    });
  };
  return (
    <div>
      <input type="text" value={searchWord} onChange={handleChange} />
      <List query={query} />
    </div>
  );
});
```

这里的`第一个任务`是紧急的，需要先执行，而`第二个任务`耗时比较长，所以可以作为不紧急任务存在，这样就不会阻塞`第一个任务`先去执行操作，从而达到不影响视图的渲染。
