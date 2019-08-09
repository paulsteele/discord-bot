import { Client, Message } from 'discord.js';
import Command from './Command';
import CommandList from './commands/CommandList';
import Handler, { isHandler } from './handlers/Handler';
import MessageHandler from './handlers/MessageHandler';
import ReadyHandler from './handlers/ReadyHandler';

class Bot {
  client: Client;
  commands: Record<string, Command>;
  readyHandler: ReadyHandler;
  messageHandler: MessageHandler;
  handlers: Handler[];
  store: Record<string, Object>;

  constructor() {
    this.client = new Client();
    this.commands = this.registerCommands();
    this.store = {};
    this.handlers = [];

    this.readyHandler = new ReadyHandler(this.client);
    this.messageHandler = new MessageHandler(this.commands);
    this.handlers.push(this.messageHandler);

    this.connect();
    this.client.on('message', this.handleMessage);
  }

  connect() {
    const { DISCORD_TOKEN } = process.env;
    this.client.login(DISCORD_TOKEN);
  }

  registerCommands(): Record<string, Command> {
    const commands: Record<string, Command> = {};

    CommandList(this).forEach((command: Command) => {
        commands[command.getTrigger()] = command;
        if (isHandler(command)) {
          this.handlers.push(command);
        }
      }
    );

    return commands;
  }

  handleMessage(message: Message) {
    this.handlers.forEach((handler: Handler) => {
      handler.handle(message);
    });
  }

  getCommands(): Record<string, Command> {
    return this.commands;
  }

  getCommand(commandPrefix: string) {
    return this.commands[commandPrefix];
  }

  getStore(): any {
    return this.store;
  }
}

export default Bot;
