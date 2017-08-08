import Command from '../command';
import send from '../utils/send';

const triggerText = 'backoff';
const helpText = 'backs off the author';

class BackoffCommand extends Command {
  constructor() {
    super(triggerText, [], null, helpText);
    this.helpText = null;
    this.store = null;
  }

  execute(payload) {
    if (payload.author) {
      if (this.store.backups[payload.author]) {
        this.store.backups[payload.author] = undefined;
        send(payload.channel, `${payload.author}, backing off`);
      } else {
        send(payload.channel, `${payload.author}, I wasn't backing you up...`);
      }
    }
  }

  populate(store) {
    this.store = store;
  }
}

export default new BackoffCommand();
