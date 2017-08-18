/* eslint-disable no-console */
// import the discord.js module
import Discord from 'discord.js';
import discordKey from '../tokens'; // eslint-disable-line import/extensions, import/no-unresolved
import * as commands from './commands';
import Command from './command';
import ReadyHandler from './handlers/ReadyHandler';
import MessageHandler from './handlers/MessageHandler';

class TeylerBot {
  constructor() {
    this.client = new Discord.Client();
    this.commands = {};
    this.handlers = {};
    this.store = {};

    this.registerCommands();
    this.registerHandlers();
    this.setUpCommands();
    this.connect();
  }

  connect() {
    this.client.login(discordKey);
  }

  registerHandlers() {
    this.handlers.readyHandler = new ReadyHandler(this.client.guilds);
    this.client.once('ready', this.handlers.readyHandler.handle);
    this.handlers.messageHandler = new MessageHandler(this.commands);
    this.client.on('message', this.handlers.messageHandler.handle);
  }

  registerCommands() {
    Object.values(commands).forEach((command) => {
      if (Command.isValid(command)) {
        this.commands[command.getTrigger()] = command;
      } else {
        console.log(command);
        console.log('could not be loaded as a command');
      }
    });
  }

  setUpCommands() {
    Object.values(this.commands).forEach((command) => {
      command.setup(this.commands, this.handlers, this.store);
    });
  }
}

export default TeylerBot;
