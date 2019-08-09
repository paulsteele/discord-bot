import axios, { AxiosResponse } from 'axios';
import Bot from '../Bot';
import Command, { Payload } from '../Command';
import send from '../utils/send';

const triggerText = 'joke';
const shortHelpText = 'tells a joke';
const longHelpText = 'tells you a random joke from the internet';
const version = '2.0.0';
const jokeUrl = 'https://official-joke-api.appspot.com/random_joke';

class Joke extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.triggerText = triggerText;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.version = version;
  }

  execute(payload: Payload) {
    axios.get(jokeUrl).then((value: AxiosResponse) => {
      send(payload.channel, `${value.data.setup} - ${value.data.punchline}`);
    });
  }
}

export default Joke;
