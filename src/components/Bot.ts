import { Client } from 'discord.js';
import CommandList from './commands/CommandList';
import Command from './Command';
import ReadyHandler from './handlers/ReadyHandler';
import MessageHandler from './handlers/MessageHandler';

class Bot {
  client: Client;
  commands: Record<string, Command>;
  readyHandler: ReadyHandler;
  messageHandler: MessageHandler;
  store: any;

  constructor() {
    this.client = new Client();
    this.commands = this.registerCommands();
    this.store = {};

    this.readyHandler = new ReadyHandler(this.client);
    this.messageHandler = new MessageHandler(this.client, this.commands);

    this.setUpCommands();
    this.connect();
  }

  connect() {
    const { DISCORD_TOKEN } = process.env;
    this.client.login(DISCORD_TOKEN);
  }

  registerCommands(): Record<string, Command> {
    const commands: Record<string, Command> = {};

    CommandList.forEach((command: Command) => {
        commands[command.getTrigger()] = command;
      }
    );

    return commands;
  }

  setUpCommands() {
    Object.values(this.commands).forEach((command) => {
      command.setup(this);
    });
  }

  getCommands(): Record<string, Command> {
    return this.commands;
  }

  getCommand(commandPrefix: string) {
    return this.commands[commandPrefix];
  }

  getHandlers(): any[] {
    return [ this.readyHandler, this.messageHandler ];
  }

  getStore(): any {
    return this.store;
  }
}

export default Bot;
