import Command from '../command';
import send from '../utils/send';

const triggerText = 'teyler';
const helpText = 'repeats teyler {count} times with fast/slow {speed}';
const args = [
  'count',
  'speed',
];

class RepeatCommand extends Command {
  constructor() {
    super(triggerText, helpText, args);
    this.sizeLimit = 100;
    this.defaultText = 'teyler';
  }

  execute(payload, count = 1, speed = 'slow') {
    // payload should be an array of commands + channel to send message
    if (payload.channel) {
      if (isNaN(count) || count < 1) {
        send(payload.channel, `${payload.author} can only use positive integers for count`);
        return;
      }

      if (count > this.sizeLimit) {
        send(payload.channel, `${payload.author} the max number of repeats is ${this.sizeLimit}`);
        return;
      }
      let text = this.defaultText;
      if (payload.contentText) {
        text = payload.contentText;
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
