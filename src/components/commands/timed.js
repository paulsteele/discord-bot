import Command from '../command';
import send from '../utils/send';

const triggerText = 'timed';
const shortHelpText = 'queues a message to be sent with a random delay of max {time}';
const longHelpText = 'Will repeat "teyler" at a random time between 0 and {time} minutes.' +
  ' If the message contains more than just {time} that message will be repeated instead of "teyler"';
const version = '1.0.0';
const args = [
  'time',
];

class TimedCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version, args);
    this.sizeLimit = 60;
    this.defaultText = 'teyler';
  }

  execute(payload, time = 5) {
    // payload should be an array of commands + channel to send message
    if (payload.channel) {
      if (isNaN(time) || time < 0) {
        send(payload.channel, `<@${payload.author.id}> can only use positive integers for time`);
        return;
      }

      if (time > this.sizeLimit) {
        send(payload.channel, `<@${payload.author.id}> the max time is ${this.sizeLimit}`);
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
