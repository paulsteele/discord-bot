import { Message } from 'discord.js';
import Command from '../Command';
import Handler from '../Handler';
import seperateArgsFromContent from '../utils/seperateArgsFromContent';
import seperateCommandFromMessage from '../utils/seperateCommandFromMessage';

class MessageHandler implements Handler {
  commands: Record<string, Command>;
  listeners: any[];
  constructor(commands: Record<string, Command>) {
    this.commands = commands;
    this.handle = this.handle.bind(this);
    this.listeners = [];
  }

  handle(message: Message): boolean {
    if (message.author.bot) {
      return false;
    }

    if (message.content.trim().startsWith(Command.getPrefix())) {
      const splitContent = seperateCommandFromMessage(message.content);
      const command = this.commands[splitContent.command];
      if (command) {
        const splitArg = seperateArgsFromContent(splitContent.contentText,
          command.getArgs().length);
        const payload = {
          author: message.author,
          channel: message.channel,
          contentText: splitArg.contentText,
        };

        command.execute(payload, ...splitArg.argArray);
        return true;
      }
      return false;
    }
    return false;
  }
}

export default MessageHandler;
