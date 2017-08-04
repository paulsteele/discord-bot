export default function (content, numArgs) {
  let contentText = content;
  const argArray = [];
  if (contentText !== null) {
    for (let i = 0; i < numArgs; i += 1) {
      let endIndex = contentText.indexOf(' ');
      if (endIndex !== -1) {
        const arg = contentText.substr(0, endIndex).trim();
        argArray[i] = arg;
        endIndex += 1;
        contentText = contentText.substr(endIndex).trim();
      } else {
        break;
      }
    }
  }
  return { argArray, contentText };
}
