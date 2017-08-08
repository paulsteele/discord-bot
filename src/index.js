import TeylerBot from './components/bot';

const bot = new TeylerBot();

bot.connect();

// // the ready event is vital, it means that your bot will only start reacting to information
// // from Discord _after_ ready is emitted.
// bot.on('ready', () => {
//   console.log('I am ready!');

//   // send startup message
//   bot.guilds.array().forEach((guild) => {
//     if (shouldRespond(guild)) {
//       const channel = guild.defaultChannel;
//       startup(channel);
//     }
//   });
// });


// function occurrences(string, subString, allowOverlapping = true) {
//   if (subString.length <= 0) {
//     return (string.length + 1);
//   }

//   let count = 0;
//   const step = allowOverlapping ? 1 : subString.length;

//   for (let i = 0; i < string.length; i += step) {
//     i = string.indexOf(subString, i);
//     if (i >= 0) {
//       count += 1;
//     } else {
//       break;
//     }
//   }
//   return count;
// }

// function sameFunction(message) {
//   if (message.content.indexOf('same') > -1) {
//     let also = occurrences(message.content, 'also', false);
//     if (also > sizelimit) {
//       also = sizelimit;
//     }
//     let mes = '';
//     for (let i = 0; i < also + 1; i += 1) {
//       mes += 'also ';
//     }
//     mes += 'same';
//     message.channel.send(mes);
//   } else {
//     message.channel.send('same');
//   }
