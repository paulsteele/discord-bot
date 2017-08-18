import Command from '../command';
import send from '../utils/send';

const triggerText = 'backoff';
const helpText = 'backs off the author';

class BackoffCommand extends Command {
  constructor() {
    super(triggerText, helpText);
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
}

export default new BackoffCommand();
