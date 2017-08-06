/* eslint-disable no-console */
// import the discord.js module
import Discord from 'discord.js';
import discordKey from '../tokens';
import * as commands from './commands';
import Command from './command';
// import ReadyHandler from './handlers/ReadyHandler';
import MessageHandler from './handlers/MessageHandler';

class TeylerBot {
  constructor() {
    this.client = new Discord.Client();
    this.commands = [];
    this.registerCommands();
    this.registerHandlers();
    this.connect();
  }

  connect() {
    this.client.login(discordKey);
  }

  registerHandlers() {
    // const readyHandler = new ReadyHandler(this.client.guilds);
    // this.client.on('ready', readyHandler.handle);
    const messageHandler = new MessageHandler(this.commands);
    this.client.on('message', messageHandler.handle);
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

    // special setup for help command as it needs scope
    if (this.commands.help) {
      this.commands.help.populate(this.commands);
    }
  }
}

export default TeylerBot;
