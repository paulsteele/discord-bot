/* eslint-disable no-console */
export default function (channel, message, options) {
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
