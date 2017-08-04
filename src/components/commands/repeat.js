import Command from '../command';

const triggerText = 'teyler';
const args = [
  'count',
  'speed',
];
const executeCommand = (payload, count = 1, speed = 0) => {
  // payload should be an array of commands + channel to send message
  if (payload.channel) {
    payload.channel.send('wutf up + ' + count + ' + ' + speed);
    if (payload.contentText) {
      payload.channel.send(payload.contentText);
    }
  }
};
const repeatHelp = 'repeats teyler {count} times with {speed}';

const repeatCommand = new Command(triggerText, args, executeCommand, repeatHelp);

export default repeatCommand;
