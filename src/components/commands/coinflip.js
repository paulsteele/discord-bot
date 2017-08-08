import Command from '../command';
import send from '../utils/send';

const triggerText = 'coinflip';
const args = [];

const executeCommand = (payload) => {
  let result;
  if (Math.random() < 0.5) {
    result = 'heads';
  } else {
    result = 'tails';
  }
  send(payload.channel, `${payload.author} the result was ${result}!`);
};
const repeatHelp = 'flips a coin';

const coinFlip = new Command(triggerText, args, executeCommand, repeatHelp);

export default coinFlip;
