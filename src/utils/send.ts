import {  DMChannel, GroupDMChannel, MessageOptions, TextChannel} from 'discord.js';

export default function (channel: TextChannel | GroupDMChannel | DMChannel, message: string, options?: MessageOptions)  {
  if (channel && message) {
    channel.send(message, options)
      .catch((err) => {
        console.error(err);
        if (err.code === 50035) {
          channel.send('Discord won\'t let me send a message that long. ¯\\_(ツ)_/¯');
        }
      });
  }
}
