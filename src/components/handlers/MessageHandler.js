import Command from '../command';
import seperateCommandFromMessage from '../utils/seperateCommandFromMessage';
import seperateArgsFromContent from '../utils/seperateArgsFromContent';

class MessageHandler {
  constructor(commands) {
    this.commands = commands;
    this.handle = this.handle.bind(this);
    this.listeners = [];
  }

  handle(message) {
    if (message.author.bot) {
      return;
    }

    if (message.content.trim().startsWith(Command.getPrefix())) {
      const splitContent = seperateCommandFromMessage(message.content);
      const command = this.commands[splitContent.command];
      if (command) {
        const splitArg = seperateArgsFromContent(splitContent.contentText,
          command.getArgs().length);
        const author = {
          ...message.author,
          voiceChannel: message.member.voiceChannel,
        };
        const payload = {
          author,
          channel: message.channel,
          voiceChannel: message.member.voiceChannel,
          contentText: splitArg.contentText,
        };
        command.execute(payload, ...splitArg.argArray);
      }
    } else { // handle other listeners
      this.listeners.forEach((listener) => {
        if (listener.handle) {
          listener.handle(message);
        }
      });
    }
  }

  registerListener(listener) {
    this.listeners[this.listeners.length] = listener;
  }
}

export default MessageHandler;
