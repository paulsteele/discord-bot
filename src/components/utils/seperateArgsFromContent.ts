export default function (content: string, numArgs: number) {
  let contentText = content;
  const argArray = [];
  if (contentText !== null) {
    contentText = contentText.trim();
    for (let i = 0; i < numArgs && contentText.length !== 0; i += 1) {
      let endIndex = contentText.indexOf(' ');
      if (endIndex === -1) {
        endIndex = contentText.length;
      }
      const arg = contentText.substr(0, endIndex).trim();
      argArray[i] = arg;
      endIndex += 1;
      contentText = contentText.substr(endIndex).trim();
    }
  }
  return { argArray, contentText };
}
