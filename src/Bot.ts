import { Client, Message } from 'discord.js';
import * as express from 'express';
import Api from './Api';
import { default as Apis } from './apis';
import Command from './Command';
import { default as Commands } from './commands';
import Handler, { isHandler } from './Handler';
import MessageHandler from './handlers/MessageHandler';
import ReadyHandler from './handlers/ReadyHandler';

class Bot {
  client: Client;
  commands: Record<string, Command>;
  readyHandler: ReadyHandler;
  messageHandler: MessageHandler;
  handlers: Handler[];
  store: Record<string, Object>;
  apiServer: express.Express;

  constructor() {
    this.client = new Client();
    this.store = {};
    this.handlers = [];
    this.apiServer = express();
    this.commands = this.registerCommands();
    this.registerApis();

    this.readyHandler = new ReadyHandler(this.client);
    this.messageHandler = new MessageHandler(this.commands);

    this.connect();
    this.client.on('message', this.handleMessage.bind(this));
    console.log('listening on 3000');
    this.apiServer.listen(3000);
  }

  connect() {
    const { DISCORD_TOKEN } = process.env;
    this.client.login(DISCORD_TOKEN);
  }

  registerCommands(): Record<string, Command> {
    const commands: Record<string, Command> = {};

    Commands(this).forEach((command: Command) => {
        commands[command.getTrigger()] = command;
        if (isHandler(command)) {
          this.handlers.push(command);
        }
      }
    );

    return commands;
  }

  registerApis(): void {
    Apis().forEach((api: Api) => {
      api.register(this.apiServer);
    });
  }

  handleMessage(message: Message) {
    const handled = this.messageHandler.handle(message);
    if (!handled) {
      this.handlers.forEach((handler: Handler) => {
        handler.handle(message);
      });
    }
  }

  getCommands(): Record<string, Command> {
    return this.commands;
  }

  getCommand(commandPrefix: string) {
    return this.commands[commandPrefix];
  }

  getStore(): Record<string, Object> {
    return this.store;
  }
}

export default Bot;
