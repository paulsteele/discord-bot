import { Message } from 'discord.js';
import Command from '../Command';
import send from '../utils/send';

const triggerText = 'teyler';
const shortHelpText = 'repeats teyler {count} times with fast/slow {speed}';
const longHelpText = 'Will repeat "teyler" the number of times specified with {count}.' +
  ' The speed will depend whether {speed} is "fast" or "slow".' +
  ' If both {count} and {speed} are supplied the remaining message will be repeated instead of "teyler"';
const version = '1.0.0';
const args = [
  'count',
  'speed',
];

class RepeatCommand extends Command {
  sizeLimit: number;
  defaultText: string;

  constructor() {
    super(triggerText, shortHelpText, longHelpText, version, args);
    this.sizeLimit = 100;
    this.defaultText = 'teyler';
  }

  execute(payload: Message, count = 1, speed = 'slow') {
    // payload should be an array of commands + channel to send message
    if (payload.channel) {
      if (isNaN(count) || count < 1) {
        send(payload.channel, `<@${payload.author.id}> can only use positive integers for count`);
        return;
      }

      if (count > this.sizeLimit) {
        send(payload.channel, `<@${payload.author.id}> the max number of repeats is ${this.sizeLimit}`);
        return;
      }
      let text = this.defaultText;
      if (payload.content) {
        text = payload.content;
      }

      let message = '';
      for (let i = 0; i < count; i += 1) {
        message += text;
        if (speed !== 'fast') {
          message += ' ';
        }
      }

      send(payload.channel, message, { tts: true });
    }
  }
}

export default new RepeatCommand();
