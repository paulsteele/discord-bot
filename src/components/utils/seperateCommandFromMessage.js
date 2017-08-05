import Command from '../command';

export default function (content) {
  let command = null;
  let contentText = null;
  if (content) {
    const workingContent = content.trim();
    let endIndex = workingContent.indexOf(' ');
    if (endIndex === -1) {
      endIndex = workingContent.length;
    }

    command = workingContent.substr(Command.getPrefix().length, endIndex).trim();
    contentText = null;
    if (endIndex !== workingContent.length) {
      contentText = workingContent.substr(endIndex + 1, workingContent.length).trim();
    }
  }

  return { command, contentText };
}
