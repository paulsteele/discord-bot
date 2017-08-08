import Command from '../command';
import send from '../utils/send';

const triggerText = 'timed';
const args = [
  'time',
];

const sizeLimit = 60;
const defaultText = 'teyler';

const executeCommand = (payload, time = 5) => {
  // payload should be an array of commands + channel to send message
  if (payload.channel) {
    if (isNaN(time) || time < 0) {
      send(payload.channel, `${payload.author} can only use positive integers for time`);
      return;
    }

    if (time > sizeLimit) {
      send(payload.channel, `${payload.author} the max time is ${sizeLimit}`);
      return;
    }
    let text = defaultText;
    if (payload.contentText) {
      text = payload.contentText;
    }

    let maxDelay = time * 1000 * 60;
    maxDelay *= Math.random();
    setTimeout(() => { send(payload.channel, text, { tts: true }); }, maxDelay);
  }
};
const repeatHelp = 'queues a message to be sent with a random delay of max {time}';

const timedCommand = new Command(triggerText, args, executeCommand, repeatHelp);

export default timedCommand;
