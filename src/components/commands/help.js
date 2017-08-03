import Command from '../command';

const triggerText = 'help';
const executeCommand = (payload) => {
  // payload should be an array of commands + channel to send message
  if (payload.channel) {
    payload.channel.send('wut up');
  }
};
const helpText = 'displays this message';

const helpCommand = new Command(triggerText, executeCommand, helpText);

export default helpCommand;
