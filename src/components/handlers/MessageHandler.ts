import { Client, Message } from 'discord.js';
import Command from '../Command';
import seperateCommandFromMessage from '../utils/seperateCommandFromMessage';
import seperateArgsFromContent from '../utils/seperateArgsFromContent';

class MessageHandler {
  commands: Record<string, Command>;
  listeners: any[];
  constructor(client: Client, commands: Record<string, Command>) {
    this.commands = commands;
    this.handle = this.handle.bind(this);
    this.listeners = [];

    client.on('message', this.handle);
  }

  handle(message: Message) {
    if (message.author.bot) {
      return;
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
