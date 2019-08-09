import Bot from '../Bot';
import Command, { Payload } from '../Command';
import send from '../utils/send';

const triggerText = 'backoff';
const shortHelpText = 'backs off the author';
const longHelpText = 'Stops Teyler-bot from saying "same" after every message from the author';
const version = '1.0.0';

class BackoffCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.triggerText = triggerText;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.version = version;
  }

  execute(payload: Payload) {
    if (payload.author) {
      const watchList = this.bot.getStore()['backups'] as Record<string, boolean>;
      if (watchList[payload.author.id]) {
        delete watchList[payload.author.id];
        send(payload.channel, `<@${payload.author.id}>, backing off`);
      } else {
        send(payload.channel, `<@${payload.author.id}>, I wasn't backing you up...`);
      }
    }
  }
}

export default BackoffCommand;
