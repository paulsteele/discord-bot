import Bot from '../Bot';
import Command, { Payload } from '../Command';
import send from '../utils/send';

const triggerText = 'stop';
const shortHelpText = 'stops playing what was started with !play';
const longHelpText = 'Immediately stops playing the audio that is currently playing.';
const version = '1.1.11';
const args: string[] = [];

class StopCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.triggerText = triggerText;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.version = version;
    this.args = args;
  }

  execute(payload: Payload) {
    if (this.bot.getStore().playQueue && this.bot.getStore().playQueue.length > 0) {
      const stream = this.bot.getStore().playQueue.pop();
      stream.end();
    } else {
      send(payload.channel, `<@${payload.author.id}>, there is nothing playing right now.`);
    }
  }
}

export default StopCommand;
