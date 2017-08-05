import Command from '../command';
import seperateCommandFromMessage from '../utils/seperateCommandFromMessage';
import seperateArgsFromContent from '../utils/seperateArgsFromContent';

class MessageHandler {
  constructor(commands) {
    this.commands = commands;
    this.handle = this.handle.bind(this);
  }

  handle(message) {
    if (message.content.trim().startsWith(Command.getPrefix())) {
      const splitContent = seperateCommandFromMessage(message.content);
      const command = this.commands[splitContent.command];
      if (command) {
        const splitArg = seperateArgsFromContent(splitContent.contentText,
          command.getArgs().length);
        const payload = {
          channel: message.channel,
          author: message.author,
          contentText: splitArg.contentText,
        };
        command.execute(payload, splitArg.argArray);
      }
    }
  }
}

export default MessageHandler;
