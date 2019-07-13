import { Message } from 'discord.js';
import Command from '../Command';
import send from '../utils/send';

const triggerText = 'stop';
const shortHelpText = 'stops playing what was started with !play';
const longHelpText = 'Immediately stops playing the audio that is currently playing.';
const version = '1.1.11';
const args: string[] = [];

class StopCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version, args);
  }

  execute(payload: Message) {
    if (this.store.playQueue && this.store.playQueue.length > 0) {
      const stream = this.store.playQueue.pop();
      stream.end();
    } else {
      send(payload.channel, `<@${payload.author.id}>, there is nothing playing right now.`);
    }
  }
}

export default new StopCommand();
