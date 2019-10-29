import { Client, Collection, Guild } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { version } from '../../package.json';
import Config from '../Config';
import send from '../utils/send';

class ReadyHandler {
  guilds: Collection<string, Guild>;
  config: Config;
  versionFile: string = '';

  constructor(client: Client, config: Config) {
    this.guilds = client.guilds;
    this.handle = this.handle.bind(this);
    this.config = config;

    fs.mkdirSync(path.resolve(this.config.statePath), {recursive: true});
    this.versionFile = path.resolve(config.statePath, 'version.txt');

    client.once('ready', this.handle);
  }

  handle() {
    if (this.checkIfNewDeploy()) {
      this.guilds.forEach((guild) => {
        const topChannel = guild.channels.reduce((previous, channel) => {
          if ((!previous || (previous && previous.position > channel.position)) && channel.type === 'text') {
            return channel;
          }
          return previous;
        }, null);

        if (topChannel) {
          send(topChannel, `**Teyler-bot V${version}** has been released! type \`!help\` for a list of commands. Type \`!new\` to see what's new.`);
        }
      });

      this.updateDeploy();
    }

    console.log(`V${version} started`);
  }

  checkIfNewDeploy(): boolean {
    if (!fs.existsSync(this.versionFile)) {
      return true;
    }

    const file = fs.openSync(this.versionFile, 'r');
    const currentVersion: string = fs.readFileSync(file).toString();

    return currentVersion !== version;
  }

  updateDeploy() {
    const file = fs.openSync(this.versionFile, 'w');

    fs.writeSync(file, version);
  }
}

export default ReadyHandler;
