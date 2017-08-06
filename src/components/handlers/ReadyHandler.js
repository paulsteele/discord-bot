/* eslint-disable no-console */
import send from '../utils/send';
import { version } from '../../../package.json';

class ReadyHandler {
  constructor(guilds) {
    this.guilds = guilds;
    this.handle = this.handle.bind(this);
  }

  handle() {
    console.log('I am ready!');
    this.guilds.array().forEach((guild) => {
      const channel = guild.defaultChannel;
      send(channel, `**Teyler-bot V${version}** has started! type \`!help\` for commands.`);
    });
  }
}

export default ReadyHandler;
