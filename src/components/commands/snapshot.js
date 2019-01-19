import { Attachment } from 'discord.js';
import Command from '../command';
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

  execute(payload, messageId) {
    if (!messageId) {
      send(payload.channel, 'No message id provided');
    }
    payload.channel.startTyping();
    payload.channel.fetchMessages({ after: messageId, limit: messageLimit })
      .then((messages) => {
        payload.channel.stopTyping();
        const script = messages.map(this.formatMessage, this).reverse().join('\n');
        send(payload.channel, 'Here\'s your snapshot', { file: new Attachment(Buffer.from(script, 'utf8'), 'script.txt') });
      });
  }


  formatMessage(message) {
    return `${this.getDisplayName(message.author, message.guild)} ${delimiter} ${message.createdAt} ${delimiter} ${message.content}`;
  }

  getDisplayName(author, guild) {
    return guild.member(author).displayName;
  }
}

export default new SnapshotCommand();
