interface IRes {
  char: string;
  length: number;
}

/**
 * @description: 求连续最多的字符和次数（嵌套循环）
 * @param {string} str
 * @return {*}
 */
export function findContinuousChar1(str: string): IRes {
  const res: IRes = {
    char: "",
    length: 0,
  };

  const length = str.length;
  if (length === 0) return res;

  let tempLength = 0; // 临时记录当前连续字符的长度

  // O(n)
  for (let i = 0; i < length; i++) {
    tempLength = 0; // 重置

    for (let j = i; j < length; j++) {
      if (str[i] === str[j]) {
        tempLength++;
      }

      if (str[i] !== str[j] || j === length - 1) {
        // 不相等，或者已经到了最后一个元素。要去判断最大值
        if (tempLength > res.length) {
          res.char = str[i];
          res.length = tempLength;
        }

        if (i < length - 1) {
          i = j - 1; // 跳步
        }

        break;
      }
    }
  }

  return res;
}

/**
 * @description: 求连续最多的字符和次数（双指针）
 * @param {string} str
 * @return {*}
 */
export function findContinuousChar2(str: string): IRes {
  const res: IRes = {
    char: "",
    length: 0,
  };

  const length = str.length;
  if (length === 0) return res;

  let tempLength = 0; // 临时记录当前连续字符的长度
  let i = 0;
  let j = 0;

  // O(n)
  for (; i < length; i++) {
    if (str[i] === str[j]) {
      tempLength++;
    }

    if (str[i] !== str[j] || i === length - 1) {
      // 不相等，或者 i 到了字符串的末尾
      if (tempLength > res.length) {
        res.char = str[j];
        res.length = tempLength;
      }
      tempLength = 0; // reset

      if (i < length - 1) {
        j = i; // 让 j “追上” i
        i--; // 细节
      }
    }
  }

  return res;
}

function findContinuousChar3(str: string) {
  const map: any = {};
  const result: any = {
    char: "",
    length: 0,
  };

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (map[char]) {
      map[char] += 1;
    } else {
      map[char] = 1;
    }
  }

  Object.keys(map).forEach((key) => {
    if (map[key] > result.length) {
      result.length = map[key];
      result.char = key;
    }
  });

  return result;
}

export function funcTest() {
  // // 功能测试
  // const str = 'aabbcccddeeee11223'
  // console.info(findContinuousChar2(str))
  // let str = ''
  // for (let i = 0; i < 100 * 10000; i++) {
  //     str += i.toString()
  // }
  // console.time('findContinuousChar1')
  // findContinuousChar1(str)
  // console.timeEnd('findContinuousChar1') // 219ms
  // console.time('findContinuousChar2')
  // findContinuousChar2(str)
  // console.timeEnd('findContinuousChar2') // 228ms
}
