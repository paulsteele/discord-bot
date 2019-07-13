import { Message } from 'discord.js';
import Command from '../Command';
import send from '../utils/send';

const triggerText = 'coinflip';
const shortHelpText = 'flips a coin';
const longHelpText = 'randomly decides between heads or tails';
const version = '1.1.0';

class CoinFlipCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version);
  }

  execute(payload: Message) {
    let result = 'heads';
    if (Math.random() < 0.5) {
      result = 'tails';
    }
    send(payload.channel, `<@${payload.author.id}> the result was ${result}!`);
  }
}

export default new CoinFlipCommand();
