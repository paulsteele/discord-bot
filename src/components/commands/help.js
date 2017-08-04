import Command from '../command';

const triggerText = 'help';
const helpText = 'displays this message';

class HelpCommand extends Command {
  constructor() {
    super(triggerText, [], null, helpText);
    this.helpText = null;
  }

  execute(payload) {
    // payload should be an array of commands + channel to send message
    if (payload.channel) {
      payload.channel.send(this.helpText);
    }
  }

  populate(commands) {
    const commandArray = Object.values(commands);

    const maxCommandLength = HelpCommand.getMaxCommandLength(commandArray);

    let messageContent = '```';
    commandArray.forEach((command, index) => {
      messageContent += Command.getPrefix() + HelpCommand
        .getTriggerAndArgs(command).padEnd(maxCommandLength);
      messageContent += '- ';
      messageContent += command.getHelp();
      if (index !== commandArray.length - 1) {
        messageContent += '\n';
      }
    });
    messageContent += '```';
    this.helpText = messageContent;
  }

  static getMaxCommandLength(commandArray) {
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

  static getTriggerAndArgs(command) {
    const trigger = command.getTrigger();
    let val = '';
    val += trigger;
    val += ' ';
    const args = command.getArgs();
    for (let i = 0; i < args.length; i += 1) {
      val += Command.getArgIdentifier().start;
      val += args[i];
      val += Command.getArgIdentifier().end;
      val += ' ';
    }

    return val;
  }
}

export default new HelpCommand();
