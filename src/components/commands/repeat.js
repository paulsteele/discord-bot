import Command from '../command';

const triggerText = 'teyler';
const executeCommand = (payload) => {
  // payload should be an array of commands + channel to send message
  if (payload.channel) {
    payload.channel.send('wutf up');
    payload.channel.send(payload.contentText);
  }
};
const repeatHelp = 'repeats teyler optional times';

const repeatCommand = new Command(triggerText, executeCommand, repeatHelp);

export default repeatCommand;
