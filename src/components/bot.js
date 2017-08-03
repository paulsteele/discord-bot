// import the discord.js module
import Discord from 'discord.js';
import discordKey from '../tokens';
import * as commands from './commands';
import Command from './command';

import seperateCommandFromMessage from './utils/seperateCommandFromMessage';

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
    // remember to bind the functions if they need use of this
    this.client.on('message', this.handleMessage.bind(this));
    this.client.on('ready', this.handleReady.bind(this));
  }

  registerCommands() {
    Object.values(commands).forEach((command) => {
      if (command.getTrigger) {
        this.commands[command.getTrigger()] = command;
      }
    });
  }

  handleReady() {
    console.log('I am ready!'); // eslint-disable-line no-console
    // send startup message
    this.client.guilds.array().forEach((guild) => {
      const channel = guild.defaultChannel;
      this.commands.help.execute({ channel });
    });
  }

  handleMessage(message) {
    if (message.content.startsWith(Command.getPrefix())) {
      const splitContent = seperateCommandFromMessage(message.content);
      if (this.commands[splitContent.command]) {
        const payload = {
          channel: message.channel,
          contentText: splitContent.contentText,
        };
        this.commands[splitContent.command].execute(payload);
      }
    }
  }
}

export default TeylerBot;
