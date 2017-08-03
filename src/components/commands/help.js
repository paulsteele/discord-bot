import Command from '../command';

const triggerText = 'help';
const helpText = 'displays this message';

class HelpCommand extends Command {
  constructor() {
    super(triggerText, null, helpText);
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
    let messageContent = '```';
    commandArray.forEach((command, index) => {
      messageContent += Command.getPrefix() + command.getTrigger();
      messageContent += ' - ';
      messageContent += command.getHelp();
      if (index !== commandArray.length - 1) {
        messageContent += '\n';
      }
    });
    messageContent += '```';
    this.helpText = messageContent;
  }
}

export default new HelpCommand();
