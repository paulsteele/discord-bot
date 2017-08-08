import Command from '../command';
import send from '../utils/send';

const triggerText = 'teyler';
const args = [
  'count',
  'speed',
];

const sizeLimit = 100;
const defaultText = 'teyler';

const executeCommand = (payload, count = 1, speed = 'slow') => {
  // payload should be an array of commands + channel to send message
  if (payload.channel) {
    if (isNaN(count) || count < 1) {
      send(payload.channel, `${payload.author} can only use positive integers for count`);
      return;
    }

    if (count > sizeLimit) {
      send(payload.channel, `${payload.author} the max number of repeats is ${sizeLimit}`);
      return;
    }
    let text = defaultText;
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
};
const repeatHelp = 'repeats teyler {count} times with fast/slow {speed}';

const repeatCommand = new Command(triggerText, args, executeCommand, repeatHelp);

export default repeatCommand;
