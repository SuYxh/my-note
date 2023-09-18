/**
 * @description:
 * @param {string} url
 * @return {*}
 */
function getUrlParams(url: string) {
  if (!url.includes("?")) {
    url = decodeURIComponent(url);
  }
  const result: any = {};
  const params = url.split("?")?.[1];
  params?.split("&")?.forEach((param) => {
    const [key, value] = param.split("=");
    result[key] = decodeURIComponent(value);
  });
  return result;
}

const user = getUrlParams(
  "http://www.baidu.com?user=web%E5%A4%A7%E5%89%8D%E7%AB%AF&age=18"
);
const user2 = getUrlParams(
  "http%3A%2F%2Fwww.baidu.com%3Fuser%3Dweb%E5%A4%A7%E5%89%8D%E7%AB%AF%26age%3D18"
);
console.log(user); // { user: 'web大前端', age: '18' }
console.log(user2); // { user: 'web大前端', age: '18' }

const getParameters = (url: string) =>
  JSON.parse(
    `{"${decodeURI(url.split("?")[1])
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );

console.log(
  getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1")
);
// {q: 'js+md', newwindow: '1'}
