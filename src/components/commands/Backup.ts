import { Message } from 'discord.js';
import Bot from '../Bot';
import Command, { Payload } from '../Command';
import send from '../utils/send';

const triggerText = 'backup';
const shortHelpText = 'backs up the author';
const longHelpText = 'Makes Teyler-bot say "same" after every message from the author';
const version = '1.0.0';

class BackupCommand extends Command {
  constructor(bot: Bot) {
    super(bot)
    this.triggerText = triggerText;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.version = version;
  }

  execute(payload: Payload) {
    if (payload.author) {
      if (!this.bot.getStore.backups[payload.author.id]) {
        this.bot.getStore.backups[payload.author.id] = true;
        send(payload.channel, `<@${payload.author.id}>, backing you up`);
      } else {
        send(payload.channel, `<@${payload.author.id}>, I am already backing you up`);
      }
    }
  }

  finalizeSetup() {
    if (this.handlers.messageHandler) {
      this.handlers.messageHandler.registerListener(this);
    }
    this.store.backups = {};
  }

  handle(message) {
    if (this.store.backups[message.author.id]) {
      send(message.channel, `${message.author} same`);
    }
  }
}

export default BackupCommand;
