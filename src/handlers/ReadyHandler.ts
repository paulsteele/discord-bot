import { Client, Collection, Guild } from 'discord.js';
import { version } from '../../package.json';
import Config from '../Config';
import send from '../utils/send';

class ReadyHandler {
  guilds: Collection<string, Guild>;
  config: Config;

  constructor(client: Client, config: Config) {
    this.guilds = client.guilds;
    this.handle = this.handle.bind(this);
    this.config = config;

    client.once('ready', this.handle);
  }

  handle() {
    console.log('I am ready!');
    this.guilds.forEach((guild) => {
      const topChannel = guild.channels.reduce((previous, channel) => {
        if ((!previous || (previous && previous.position > channel.position)) && channel.type === 'text') {
          return channel;
        }
        return previous;
      }, null);

      if (topChannel) {
        send(topChannel, `**Teyler-bot V${version}** has started! type \`!help\` for a list of commands. Type \`!new\` to see what's new.`);
      }
    });
  }
}

export default ReadyHandler;
