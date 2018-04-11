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
      const topChannel = guild.channels.reduce((previous, channel) => {
        if ((!previous || (previous && previous.position > channel.position)) && channel.type === 'text') {
          return channel;
        }
        return previous;
      }, null);

      if (false && topChannel) {
        send(topChannel, `**Teyler-bot V${version}** has started! type \`!help\` for a list of commands. Type \`!new\` to see what's new.`);
      }
    });
  }
}

export default ReadyHandler;
