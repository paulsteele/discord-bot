import { Attachment, FileOptions, Message, User, Guild } from 'discord.js';
import Command from '../Command';
import send from '../utils/send';

const triggerText = 'snapshot';
const shortHelpText = 'takes a snapshot since {message id}';
const longHelpText = 'Will take a snapshot of recent conversations since the message with {message id} and put' +
  ' them in a format that is consumable by the Bull Moose Party Podcast.' +
  ' Message Ids can be found by enabling developer mode and then right clicking a message';
const version = '1.2.0';
const args = [
  'messageId',
];

const messageLimit = 100;
const delimiter = '###';

class SnapshotCommand extends Command {
  constructor() {
    super(triggerText, shortHelpText, longHelpText, version, args);
  }

  execute(payload: Message, messageId: string | undefined = undefined) {
    if (!messageId) {
      send(payload.channel, 'No message id provided');
    }
    payload.channel.startTyping();
    payload.channel.fetchMessages({ after: messageId, limit: messageLimit })
      .then((messages) => {
        payload.channel.stopTyping();
        const script = messages.map(this.formatMessage, this).reverse().join('\n');
        const options: FileOptions = { attachment: Buffer.from(script, 'utf8'), name: 'script.txt' };

        send(payload.channel, 'Here\'s your snapshot', {file: options});
      });
  }


  formatMessage(message: Message) {
    return `${this.getDisplayName(message.author, message.guild)} ${delimiter} ${message.createdAt} ${delimiter} ${message.content}`;
  }

  getDisplayName(author: User, guild: Guild) {
    return guild.member(author).displayName;
  }
}

export default new SnapshotCommand();
