export default function (content) {
  let endIndex = content.indexOf(' ');
  if (endIndex === -1) {
    endIndex = content.length;
  }

  const command = content.substr(1, endIndex).trim();
  let contentText = null;
  if (endIndex !== content.length) {
    contentText = content.substr(endIndex + 1, content.length).trim();
  }

  return { command, contentText };
}
