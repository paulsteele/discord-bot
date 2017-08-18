import Command from '../command';
import send from '../utils/send';

const triggerText = 'timed';
const helpText = 'queues a message to be sent with a random delay of max {time}';
const args = [
  'time',
];

class TimedCommand extends Command {
  constructor() {
    super(triggerText, helpText, args);
    this.sizeLimit = 60;
    this.defaultText = 'teyler';
  }

  execute(payload, time = 5) {
    // payload should be an array of commands + channel to send message
    if (payload.channel) {
      if (isNaN(time) || time < 0) {
        send(payload.channel, `${payload.author} can only use positive integers for time`);
        return;
      }

      if (time > this.sizeLimit) {
        send(payload.channel, `${payload.author} the max time is ${this.sizeLimit}`);
        return;
      }
      let text = this.defaultText;
      if (payload.contentText) {
        text = payload.contentText;
      }

      let maxDelay = time * 1000 * 60;
      maxDelay *= Math.random();
      setTimeout(() => { send(payload.channel, text, { tts: true }); }, maxDelay);
    }
  }
}

export default new TimedCommand();
