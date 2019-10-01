import { StreamDispatcher, TextChannel } from 'discord.js';
import * as ytdl from 'ytdl-core';
import Bot from '../Bot';
import Command, { Payload } from '../Command';
import send from '../utils/send';

const triggerText = 'play';
const shortHelpText = 'plays {audio_url} in a voice channel';
const longHelpText = 'Will play the selected {audio_url} in the voice channel the user is currently in.' +
  ' Right now only supports youtube links';
const version = '1.1.11';
const args = [
  'audio_url',
];

class PlayCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.triggerText = triggerText;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.version = version;
    this.args = args;
    this.bot.getStore()['playQueue'] = [];
  }

  execute(payload: Payload, audioUrl = "") {
    const { channel, author } = payload;
    if (!audioUrl) {
      send(channel, 'an {audio_url} must be specifed');
      return;
    }

    if (channel instanceof TextChannel) {
      const guildAuthor = channel.guild.member(author);
      const { voiceChannel } = guildAuthor;

      if (!voiceChannel) {
        send(channel, `<@${payload.author.id}> you must be in a voice channel to play audio`);
        return;
      }

      const playQueue = this.bot.getStore()['playQueue'] as StreamDispatcher[];

      if (playQueue.length > 0) {
        send(channel, `<@${payload.author.id}> something is already playing, you can stop it with \`!stop\``);
        return;
      }

      ytdl.getInfo(audioUrl, (err, info) => {
        if (err || !info.video_id) {
          console.log(err);
          send(channel, 'Invalid audio URL');
          return;
        }
        voiceChannel.join()
          .then(() => {
            const stream = ytdl(info.video_url, { filter: 'audioonly' });
            const streamOptions = { seek: 0, volume: 0.1 };
            return voiceChannel.connection.playStream(stream, streamOptions);
          })
          .then((dispatcher) => {
            const stopPlaying = () => {
              playQueue.pop();
              voiceChannel.leave();
            };
            dispatcher.on('end', stopPlaying);
            dispatcher.on('error', (playErr) => { console.error(playErr); stopPlaying(); });
            playQueue.push(dispatcher);
          });
      });
    } else {
      send(channel, 'must be in a server to run `play`');
    }

  }
}

export default PlayCommand;
