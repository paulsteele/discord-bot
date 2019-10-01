import Command from '../Command';

export default function (content: string) {
  let command = "";
  let contentText = "";
  if (content) {
    const workingContent = content.trim();
    let endIndex = workingContent.indexOf(' ');
    if (endIndex === -1) {
      endIndex = workingContent.length;
    }

    const prefixLength = Command.getPrefix().length;
    command = workingContent.substr(prefixLength, (endIndex - prefixLength) + 1).trim();

    if (endIndex !== workingContent.length) {
      contentText = workingContent.substr(endIndex + 1, workingContent.length).trim();
    }
  }

  return { command, contentText };
}
