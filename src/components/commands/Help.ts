import Command from '../Command';
import send from '../utils/send';
import getHelpMessage from '../utils/getHelpMessage';
import getMaxCommandLength from '../utils/getMaxCommandLength';

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
      } else {
        send(payload.channel, `Command \`${command}\` was not found`);
      }
    } else {
      send(payload.channel, this.helpText);
    }
  }

  finalizeSetup() {
    const commandArray = Object.values(this.commands);
    commandArray.sort(Command.compare);
    const maxCommandLength = getMaxCommandLength(commandArray);

    let messageContent = '```';
    commandArray.forEach((command, index) => {
      messageContent += getHelpMessage(command, index, commandArray.length, maxCommandLength);
    });
    messageContent += '```';
    this.helpText = messageContent;
  }
}

export default new HelpCommand();
