import Command from '../command';
import send from '../utils/send';

const triggerText = 'backoff';
const shortHelpText = 'backs off the author';
const longHelpText = 'Stops Teyler-bot from saying "same" after every message from the author';
const version = '1.0.0';

class BackoffCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version);
  }

  execute(payload) {
    if (payload.author) {
      if (this.store.backups[payload.author.id]) {
        this.store.backups[payload.author.id] = undefined;
        send(payload.channel, `<@${payload.author.id}>, backing off`);
      } else {
        send(payload.channel, `<@${payload.author.id}>, I wasn't backing you up...`);
      }
    }
  }
}

export default new BackoffCommand();
