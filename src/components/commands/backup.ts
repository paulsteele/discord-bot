import Command from '../command';
import send from '../utils/send';

const triggerText = 'backup';
const shortHelpText = 'backs up the author';
const longHelpText = 'Makes Teyler-bot say "same" after every message from the author';
const version = '1.0.0';

class BackupCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version);
  }

  execute(payload) {
    if (payload.author) {
      if (!this.store.backups[payload.author.id]) {
        this.store.backups[payload.author.id] = true;
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

export default new BackupCommand();
