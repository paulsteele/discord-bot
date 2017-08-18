import Command from '../command';
import send from '../utils/send';

const triggerText = 'backup';
const shortHelpText = 'backs up the author';
const longHelpText = 'Makes Teyler-bot say "same" after every message from the author';

class BackupCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText);
  }

  execute(payload) {
    if (payload.author) {
      if (!this.store.backups[payload.author]) {
        this.store.backups[payload.author] = true;
        send(payload.channel, `${payload.author}, backing you up`);
      } else {
        send(payload.channel, `${payload.author}, I am already backing you up`);
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
    if (this.store.backups[message.author]) {
      send(message.channel, `${message.author} same`);
    }
  }
}

export default new BackupCommand();
