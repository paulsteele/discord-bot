import Command from '../command';
import send from '../utils/send';

const triggerText = 'coinflip';
const shortHelpText = 'flips a coin';
const longHelpText = 'randomly decides between heads or tails';

class CoinFlipCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText);
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
