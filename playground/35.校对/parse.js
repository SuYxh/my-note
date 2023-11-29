// 解析原始文本（rawJson）
function parseRawJson(rawJson) {
  let rawTexts = [];
  for (let key in rawJson) {
    for (let part in rawJson[key]) {
      rawTexts.push(rawJson[key][part].text);
    }
  }
  return rawTexts;
}

// 解析字幕文本（videoTxt）
function parseVideoTxt(videoTxt) {
  const regex =
    /(\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}.\d{3})\n([\s\S]*?)(?=\n\n|\n$)/g;
  let subtitles = [];
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
