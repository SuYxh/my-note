export function getQueryParam(param, url?) {
  url = url ? url : window.location.href

  const queryString = url.split('?')[1];
  if (!queryString) {
    return null;
  }

  const params = {};
  const paramPairs = queryString.split('&');

  for (let i = 0; i < paramPairs.length; i++) {
    const pair = paramPairs[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    params[key] = value;
  }

  return params[param] || null;
}

export function redirectTo() {
  window.location.href = getQueryParam('redirect');
}