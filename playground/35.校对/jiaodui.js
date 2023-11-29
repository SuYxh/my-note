const rawJson = {
  334: {
    begin: {
      text: "一步进门，我的世界打开了！近地铁房源，【2室2厅】【83平】，客厅温馨舒适，全家出行选择更多元；厨房美食互享，卧室安静舒适，快来感受全新生活！",
      part: "begin",
      have3Tag: false,
    },
    room: {
      text: "不简陋，更不简单！房间布置贴心舒适，处处透着生活气息，每一次进门都像回家一样惬意。",
      part: "room",
      have3Tag: false,
    },
    neighborhood: {
      text: "一座守望相助的小区，【20栋】【1101户】，生活按需封闭管理，让你放心居住；【容积率低于2】，精致低密的生活品质，呼之欲出！",
      part: "neighborhood",
      have3Tag: false,
    },
    around: {
      text: "无缝接轨绝佳生活圈，【地铁郫筒站】【19个幼儿园】【5个小学】【8个中学】，帮你从萌新到大学一路顺畅；临近【蜀院】【大医院】【太平洋购物中心】，生活配套一应俱全，真正的全方位舒适体验！",
      part: "around",
      have3Tag: true,
    },
    end: {
      text: "我能帮你找更多好房，丰富配套近在咫尺，你还在等什么？快来联系我，我的拼搏，你的收获！",
      part: "end",
      have3Tag: false,
    },
  },
};

const videoTxt = `WEBVTT

00:01.160 --> 00:02.060
一步进门

00:02.320 --> 00:03.700
我的世界打开了

00:04.000 --> 00:05.960
进地铁房源两室两厅

00:05.960 --> 00:06.860
八十三平

00:07.240 --> 00:08.340
客厅温馨舒适

00:08.720 --> 00:10.200
全家出行选择更多元

00:10.200 --> 00:11.300
厨房美式互享

00:11.640 --> 00:12.820
卧室安静舒适

00:13.200 --> 00:14.580
快来感受全新生活

00:15.160 --> 00:17.060
不简陋更不简单

00:17.480 --> 00:18.820
房间布置贴心舒适

00:19.160 --> 00:20.540
处处透着生活气息

00:20.920 --> 00:22.780
每一次进门都像回家一样惬意

00:23.160 --> 00:24.700
一座守望相助的小区

00:25.040 --> 00:26.700
二十栋一千一百零一户

00:27.160 --> 00:28.500
生活按需封闭管理

00:28.760 --> 00:29.840
让你放心居住

00:29.840 --> 00:30.940
容积率低于二

00:31.440 --> 00:34.020
精致低密的生活品质呼之欲出

00:34.440 --> 00:35.000
无缝接轨

00:35.000 --> 00:35.980
绝佳生活圈

00:36.360 --> 00:37.120
地铁皮筒站

00:37.120 --> 00:37.880
十九个幼儿园

00:37.880 --> 00:38.480
五个小学

00:38.480 --> 00:39.300
八个中学

00:39.960 --> 00:41.440
从萌新到大学一路顺畅

00:41.440 --> 00:42.640
临近曙院大医院

00:42.640 --> 00:43.860
太平洋购物中心

00:44.320 --> 00:45.660
生活配套一应俱全

00:46.080 --> 00:47.620
真正的全方位舒适体验

00:47.960 --> 00:49.460
我能帮你找更多好房

00:49.920 --> 00:51.340
丰富配套近在咫尺

00:51.640 --> 00:52.720
你还在等什么

00:52.720 --> 00:53.660
快来联系我

00:53.920 --> 00:54.900
我的拼搏

00:55.240 --> 00:56.180
你的收获`;

/**
 * @description: 解析原始文本（rawJson）
 * @param {*} rawJson
 * @return {*}
 */
function parseRawJson(rawJson) {
  const rawTexts = [];
  for (let key in rawJson) {
    for (let part in rawJson[key]) {
      rawTexts.push(rawJson[key][part].text);
    }
  }
  return rawTexts;
}

/**
 * @description: 解析字幕文本（videoTxt）
 * @param {*} videoTxt
 * @return {*}
 */
function parseVideoTxt(videoTxt) {
  const regex =
    /(\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}.\d{3})\n([\s\S]*?)(?=\n\n|\n$|$)/g;
  const subtitles = [];
  let match;
  while ((match = regex.exec(videoTxt)) !== null) {
    subtitles.push({
      startTime: match[1],
      endTime: match[2],
      text: match[3].trim(),
    });
  }
  return subtitles;
}

/**
 * @description: 阿拉伯数字转中文，比如 20 => 二十 83 => 八十三
 * @param {*} arabicNumber
 * @return {*}
 */
function arabicNumberToChinese(arabicNumber) {
  const numbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const units = ["", "十", "百", "千", "万", "亿"];

  if (arabicNumber === 0) {
    return numbers[0];
  }

  let chineseNumber = "";
  let strNumber = arabicNumber.toString();
  let len = strNumber.length;

  for (let i = 0; i < len; i++) {
    let num = strNumber[i];
    if (num !== "0") {
      chineseNumber += numbers[parseInt(num)] + units[len - 1 - i];
    } else {
      if (!chineseNumber.endsWith(numbers[0]) && i !== len - 1) {
        chineseNumber += numbers[0];
      }
    }
  }

  // 处理特殊情况
  chineseNumber = chineseNumber.replace(/零+/g, "零");
  chineseNumber = chineseNumber.replace(/零(万|亿)/g, "$1");
  chineseNumber = chineseNumber.replace(/^一十/, "十");
  chineseNumber = chineseNumber.replace(/零$/, ""); // 移除结尾的零

  return chineseNumber;
}

/**
 * @description: 将字符串中的阿拉伯数字转中文
 * @param {*} str
 * @return {*}
 */
function replaceNum(str) {
  return str.replace(/\d+/gi, (match) => {
    return arabicNumberToChinese(match);
  });
}

/**
 * @description: 校对字幕
 * @param {*} rawTexts
 * @param {*} subtitles
 * @return {*}
 */
function correctSubtitles(rawTexts, subtitles) {
  // 不同点
  const diff = [];
  const _subtitles = [...subtitles];
  // 遇见这些符号就跳过
  const symbolList = ["，", "！", "【", "】", "；", "。", "？"];
  // _subtitles 数组中的下标
  let index = 0;
  // _subtitles 数组每项 text 对应的下标
  let counter = 0;

  // 循环对比 源文件中每一项的每一个字符和_subtitles 数组每项 text 对应的字符
  for (let i = 0; i < rawTexts.length; i++) {
    // if (i >= 5) {
    //   break
    // }

    // 源文件对应的语句文案
    const statement = rawTexts[i];

    // 循环语句对比字符
    for (let j = 0; j < statement.length; j++) {
      // 源文件对应的字符
      const char = statement[j];

      // 遇见符号，跳出循环，字幕文件中没有
      if (symbolList.includes(char)) {
        continue;
      }

      // 获取到字幕文件中的文案
      let text = _subtitles?.[index]?.["text"];
      // 获取到字幕文件中的文案对应的字符
      let textChar = text[counter];

      // 如果 textChar 不存在，取 _subtitles 下一项的 text，然后继续找对应的文案字符
      if (!textChar) {
        // 获取下一项文案
        index = index + 1;
        // 从新开始计数
        counter = 0;

        text = _subtitles?.[index]?.["text"];
        textChar = text[counter];
      }

      // console.log(char, textChar);

      if (char !== textChar) {
        console.log(
          "不相等",
          _subtitles[index]["text"],
          _subtitles[index]["text"][counter],
          char
        );

        // 记录一下不相等的位置，没有实际用处
        diff.push({
          originChar: char,
          originLocation1: i,
          originLocation2: j,
          videoChar: _subtitles[index]["text"][counter],
          videoLocation1: index,
          videoLocation2: counter,
        });

        // 如果不相等，尝试找源文件的后面 3 个范围的字符串看看是否和字幕文件相等，
        let num = 0;
        let flag = false;

        while (num <= 3) {
          // 获取当前 char 后面的字符
          const behindChar = statement[j + num];

          console.log(
            "====",
            behindChar === _subtitles[index]["text"][counter],
            num
          );

          // 如果后续的字符能找到和字幕文件中相匹配的，就修改循环j的值
          if (behindChar === _subtitles[index]["text"][counter]) {
            j = j + num;
            flag = true;
            break;
          }

          num++;
        }

        // 如果找到了，说明字幕文件可能是某些字漏掉了，此时不做修改处理
        if (!flag) {
          const text = _subtitles[index]["text"];
          _subtitles[index]["text"] = text.replace(text[counter], char);
        }
      }

      counter++;
    }
  }

  // console.log('diff', diff);
  return _subtitles;
}

// 生成新的字幕文本
function generateNewSubtitles(correctedSubtitles) {
  return correctedSubtitles
    .map((sub) => `${sub.startTime} --> ${sub.endTime}\n${sub.text}`)
    .join("\n\n");
}

// 执行校对
let rawTexts = parseRawJson(rawJson);
// console.log('rawTexts-1', rawTexts);
rawTexts = rawTexts.map((item) => replaceNum(item));
console.log("rawTexts-2", rawTexts);

const subtitles = parseVideoTxt(videoTxt);
// console.log('subtitles', subtitles);

const correctedSubtitles = correctSubtitles(rawTexts, subtitles);
// console.log('correctedSubtitles', correctedSubtitles);

const newSubtitlesTxt = generateNewSubtitles(correctedSubtitles);

console.log(newSubtitlesTxt);
