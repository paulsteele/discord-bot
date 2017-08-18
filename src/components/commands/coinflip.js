import Command from '../command';
import send from '../utils/send';

const triggerText = 'coinflip';
const helpText = 'flips a coin';

class CoinFlipCommand extends Command {
  constructor() {
    super(triggerText, helpText);
    this.result = null;
  }

  execute(payload) {
    if (Math.random() < 0.5) {
      this.result = 'heads';
    } else {
      this.result = 'tails';
    }
    send(payload.channel, `${payload.author} the result was ${this.result}!`);
  }
}

export default new CoinFlipCommand();
