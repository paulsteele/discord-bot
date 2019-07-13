import { Message } from 'discord.js';
import Command from '../Command';
import send from '../utils/send';
import Version from '../utils/Version';
import getHelpMessage from '../utils/getHelpMessage';
import getMaxCommandLength from '../utils/getMaxCommandLength';

import { version as packageVersion } from '../../../package.json';

const triggerText = 'new';
const shortHelpText = 'shows what is new since {version}';
const longHelpText = 'shows a list of all the new commands in the latest version.' +
  ' If {version} is supplied, then any changes since then will be shown.';
const version = '1.1.10';

const args = [
  'version',
];

class NewCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version, args);
  }

  execute(payload: Message, requestVersion = packageVersion) {
    const message = NewCommand.getNewCommands(requestVersion, this.commands);

    send(payload.channel, message);
  }

  static getNewCommands(requestVersion: string, commands: Command[]) {
    const parsedVersion = new Version(requestVersion);
    if (parsedVersion) {
      const commandArray = Object.values(commands);
      commandArray.sort(Command.compare);
      const newCommands:Command[] = [];

      commandArray.forEach((command) => {
        const commandVersion = new Version(command.getVersion());
        if (commandVersion && NewCommand.checkIfNewer(parsedVersion, commandVersion)) {
          newCommands.push(command);
        }
      });

      if (newCommands.length === 0) {
        return 'No new commands found ¯\\_(ツ)_/¯';
      }

      let message = '```';
      const maxCommandLength = getMaxCommandLength(newCommands);
      newCommands.forEach((command, index) => {
        message += getHelpMessage(command, index, newCommands.length, maxCommandLength);
      });
      message += '```';

      return message;
    }
    return 'Version numbers must be of form `<release>.<major>.<minor>`';
  }

  static checkIfNewer(baseVersion: Version, candidateVersion: Version) {
    if (candidateVersion.release > baseVersion.release) {
      return true;
    }
    if (candidateVersion.release < baseVersion.release) {
      return false;
    }
    if (candidateVersion.major > baseVersion.major) {
      return true;
    }
    if (candidateVersion.major < baseVersion.major) {
      return false;
    }
    if (candidateVersion.minor >= baseVersion.minor) {
      return true;
    }
    return false;
  }
}

export default new NewCommand();
