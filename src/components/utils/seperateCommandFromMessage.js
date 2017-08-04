export default function (content) {
  let command = null;
  let contentText = null;
  if (content) {
    let endIndex = content.indexOf(' ');
    if (endIndex === -1) {
      endIndex = content.length;
    }

    command = content.substr(1, endIndex).trim();
    contentText = null;
    if (endIndex !== content.length) {
      contentText = content.substr(endIndex + 1, content.length).trim();
    }
  }

  return { command, contentText };
}
