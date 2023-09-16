## 向 url 添加参数

```js
function addURLParam(url, name, value) {
  url += url.indexOf("?") == -1 ? "?" : "&";
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}
```

## 获取 url 上的参数

```js
export function getQueryParam(url, param) {
  const queryString = url.split("?")[1];
  if (!queryString) {
    return null;
  }

  const params = {};
  const paramPairs = queryString.split("&");

  for (let i = 0; i < paramPairs.length; i++) {
    const pair = paramPairs[i].split("=");
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    params[key] = value;
  }

  return params[param] || null;
}
```
