const options = {
  url: "",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  data: null,
  arr: [10, 20, 30],
  config: {
    xhr: {
      async: true,
      cache: false,
    },
  },
};

const params = {
  url: "http://www.zhufengpeixun.cn/api/",
  headers: {
    "X-Token": "EF00F987DCFA6D31",
  },
  data: {
    lx: 1,
    from: "weixin",
  },
  arr: [30, 40],
  config: {
    xhr: {
      cache: true,
    },
  },
};

function mergeOptions(options, params) {
  // 创建一个新对象，以避免修改原始对象
  let merged = { ...options };

  // 遍历 params 对象
  for (let key in params) {
    // 检查是否是数组
    if (Array.isArray(params[key])) {
      // 合并或替换数组
      merged[key] = [...(options[key] || []), ...params[key]];
    } else if (typeof params[key] === "object" && params[key] !== null) {
      // 如果是对象，则递归合并
      merged[key] = mergeOptions(options[key] || {}, params[key]);
    } else {
      // 否则，直接覆盖或添加属性
      merged[key] = params[key];
    }
  }

  return merged;
}

// 使用方法
const mergedOptions = mergeOptions(options, params);
