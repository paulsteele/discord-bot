import Command from '../command';

export default function (commandArray) {
  let length = 0;
  commandArray.forEach((command) => {
    let prefixLength = command.getTrigger().length;
    let hadArgs = false;
    command.getArgs().forEach((arg) => {
      hadArgs = true;
      // extra space for each
      prefixLength += 1;
      // spaces for argument tags
      prefixLength += Command.getArgIdentifier().start.length;
      prefixLength += Command.getArgIdentifier().end.length;
      // space for the argument
      prefixLength += arg.length;
    });
    if (hadArgs) {
      prefixLength += 1;
    }

    if (length < prefixLength) {
      length = prefixLength;
    }
  });

  return length;
}
