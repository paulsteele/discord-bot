import Command from '../Command';

const getTriggerAndArgs = (command: Command): string => {
  const trigger = command.getTrigger();
  let val = '';
  val += trigger;
  val += ' ';
  const commandArgs = command.getArgs();
  for (let i = 0; i < commandArgs.length; i += 1) {
    val += Command.getArgIdentifier().start;
    val += commandArgs[i];
    val += Command.getArgIdentifier().end;
    val += ' ';
  }

  return val;
};

export default function (command: Command, index: number, length: number, maxCommandLength: number): string {
  let messageContent = '';

  messageContent += Command.getPrefix() + getTriggerAndArgs(command).padEnd(maxCommandLength);
  messageContent += '- ';
  messageContent += command.getShortHelp();
  if (index !== length - 1) {
    messageContent += '\n';
  }

  return messageContent;
}
