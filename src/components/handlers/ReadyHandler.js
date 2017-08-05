/* eslint-disable no-console */
import send from '../utils/send';

class ReadyHandler {
  constructor(guilds) {
    this.guilds = guilds;
    this.handle = this.handle.bind(this);
  }

  handle() {
    console.log('I am ready!');
    this.guilds.array().forEach((guild) => {
      const channel = guild.defaultChannel;
      send(channel, '**Teyler-bot V2** has started! type `!help` for commands.');
    });
  }
}

export default ReadyHandler;
