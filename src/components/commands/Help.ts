import Bot from '../Bot';
import Command, { Payload } from '../Command';
import getHelpMessage from '../utils/getHelpMessage';
import getMaxCommandLength from '../utils/getMaxCommandLength';
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
  helpList: string;

  constructor(bot: Bot) {
    super(bot);
    this.triggerText = triggerText;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.version = version;
    this.args = args;
    this.helpList = "";
  }

  execute(payload: Payload, command: Command) {
    if (command) {
      const actualCommand = this.bot.getCommand(command.getTrigger());
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
      if (!this.helpList) {
        this.createHelpList();
      }
      send(payload.channel, this.helpList);
    }
  }

  createHelpList() {
    const commandArray = Object.values(this.bot.getCommands());
    commandArray.sort(Command.compare);
    const maxCommandLength = getMaxCommandLength(commandArray);

    let messageContent = '```';
    commandArray.forEach((command, index) => {
      messageContent += getHelpMessage(command, index, commandArray.length, maxCommandLength);
    });
    messageContent += '```';
    this.helpList = messageContent;
  }
}

export default HelpCommand;
