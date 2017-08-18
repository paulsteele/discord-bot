import Command from '../command';
import send from '../utils/send';
import getVersionNumbersFromString from '../utils/getVersionNumbersFromString';
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

  execute(payload, requestVersion = packageVersion) {
    const message = NewCommand.getNewCommands(requestVersion, this.commands);

    send(payload.channel, message);
  }

  static getNewCommands(requestVersion, commands) {
    const parsedVersion = getVersionNumbersFromString(requestVersion);
    if (parsedVersion) {
      const commandArray = Object.values(commands);
      commandArray.sort(Command.compare);
      const newCommands = [];

      commandArray.forEach((command) => {
        const commandVersion = getVersionNumbersFromString(command.getVersion());
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

  static checkIfNewer(baseVersion, candidateVersion) {
    if (candidateVersion.release > baseVersion.release) {
      return true;
    } else if (candidateVersion.release < baseVersion.release) {
      return false;
    }
    if (candidateVersion.major > baseVersion.major) {
      return true;
    } else if (candidateVersion.major < baseVersion.major) {
      return false;
    }
    if (candidateVersion.minor >= baseVersion.minor) {
      return true;
    }
    return false;
  }
}

export default new NewCommand();
