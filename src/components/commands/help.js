import Command from '../command';
import send from '../utils/send';

const triggerText = 'help';
const shortHelpText = 'displays information about {command}';
const longHelpText = 'Displays a list of all commands, and brief descriptions.' +
  ' If {command} is specified, will display a more detailed help message for that command';
const version = '1.0.0';
const args = [
  'command',
];

class HelpCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version, args);
    this.helpText = null;
  }

  execute(payload, command = null) {
    if (command) {
      const actualCommand = this.commands[command];
      if (Command.isValid(actualCommand)) {
        let messageContent = '```';
        messageContent += `Command - ${actualCommand.getTrigger()}\n`;
        const commandArgs = actualCommand.getArgs();
        if (commandArgs.length) {
          messageContent += 'Arguments -';
          commandArgs.forEach((arg) => {
            messageContent += ` ${Command.getArgIdentifier().start}${arg}${Command.getArgIdentifier().end}`;
          });
          messageContent += '\n';
        }
        messageContent += actualCommand.getLongHelp();
        messageContent += '```';
        send(payload.channel, messageContent);
      }
    } else {
      send(payload.channel, this.helpText);
    }
  }

  finalizeSetup() {
    const commandArray = Object.values(this.commands);
    commandArray.sort(Command.compare);
    const maxCommandLength = HelpCommand.getMaxCommandLength(commandArray);

    let messageContent = '```';
    commandArray.forEach((command, index) => {
      messageContent += Command.getPrefix() + HelpCommand
        .getTriggerAndArgs(command).padEnd(maxCommandLength);
      messageContent += '- ';
      messageContent += command.getShortHelp();
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
    const commandArgs = command.getArgs();
    for (let i = 0; i < commandArgs.length; i += 1) {
      val += Command.getArgIdentifier().start;
      val += commandArgs[i];
      val += Command.getArgIdentifier().end;
      val += ' ';
    }

    return val;
  }
}

export default new HelpCommand();
