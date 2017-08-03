import TeylerBot from './components/bot';

const bot = new TeylerBot();

bot.connect();


// // production mode or not
// const TESTING = true;



// // the sizelimit on tts loops
// const sizelimit = 100;


// const backup = {};

// function startup(channel) {
//   channel.send('**Teyler-bot** has started! type `!help` for commands.');
// }

// function helpCommand(channel) {
//   channel.send(`\`\`\`!help- display this message
// !teyler {count} {slow|fast} - summons teyler optional count times, with slow or fast speed
// !timed {minutes}- summons teyler randomly in the next defined timeframe
// !backup- will have teyler-bot back up your arguments.
// !backoff- will have teyler-bot back down from helping. \`\`\``);
// }

// function repeatMessage(message, count, text) {
//   if (isNaN(count) || count < 0) {
//     message.channel.send(`${message.author}: can only use positive numbers for the number of summons`);
//     return;
//   }

//   if (count > sizelimit) {
//     message.channel.send(`${message.author}: woah, calm down satan.`);
//     return;
//   }

//   let mes = '';
//   for (let i = 0; i < count; i += 1) {
//     mes += text;
//   }
//   message.channel.sendTTSMessage(mes);
// }

// function getMessageIntArgument(message, index) {
//   const mesarray = message.content.split(' ');
//   if (mesarray.length > index) {
//     return parseInt(mesarray[index], 10);
//   }

//   return 1;
// }

// function getMessageStringArgument(message, index) {
//   const mesarray = message.content.split(' ');
//   if (mesarray.length > index) {
//     return (mesarray[index]);
//   }

//   return '';
// }

// function shouldRespond(guild) {
//   if (guild == null) {
//     return false;
//   }
//   if (TESTING === false) {
//     if (guild.name === 'Bot Test') {
//       return false;
//     }
//   } else if (guild.name !== 'Bot Test') {
//     return false;
//   }

//   return true;
// }

// function checkBackup(id) {
//   return backup[id];
// }

// function addBackup(id) {
//   backup[id] = true;
// }

// function removeBackup(id) {
//   delete backup[id];
// }

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

// function backupCommand(message) {
//   if (!checkBackup(message.author.id)) {
//     addBackup(message.author.id);
//     message.channel.send(`Backing up ${message.author}`);
//   } else {
//     message.channel.send(`Already backing you up ${message.author}!`);
//   }
// }

// function backoffCommand(message) {
//   if (checkBackup(message.author.id)) {
//     removeBackup(message.author.id);
//     message.channel.send(`Backing off ${message.author}`);
//   } else {
//     message.channel.send(`I, uhhh, wasn't backing you up before ${message.author}...`);
//   }
// }

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
// }

// function teylerCommand(message) {
//   const num = getMessageIntArgument(message, 1);
//   const speed = getMessageStringArgument(message, 2);
//   if (speed === 'slow' || speed === '') {
//     repeatMessage(message, num, 'teyler? ');
//   } else if (speed === 'fast') {
//     repeatMessage(message, num, 'teyler ');
//   } else {
//     message.channel.send(`${message.author}: can only use "slow" or "fast" as speed options.`);
//   }
// }

// function timedCommand(message) {
//   let num = getMessageIntArgument(message, 1);

//   if (num > sizelimit || num < 0) {
//     num = 1;
//   }

//   num = num * 1000 * 60;
//   const mult = Math.random();

//   num *= mult;
//   setTimeout(() => { repeatMessage(message, 1, 'teyler?'); }, num);
// }

// // create an event listener for messages
// bot.on('message', (message) => {
//   if (!shouldRespond(message.guild)) {
//     return;
//   }
//   // don't respond to bots
//   if (message.author.bot) {
//     return;
//   }

//   // check to see if message want to respond to
//   const prefix = '!';
//   if (!message.content.startsWith(prefix)) {
//     if (checkBackup(message.author.id)) {
//       sameFunction(message);
//     }

//     return;
//   }
//   if (message.content === '!help') {
//     helpCommand(message.channel);
//   } else if (message.content.startsWith('!teyler')) {
//     teylerCommand(message);
//   } else if (message.content.startsWith('!timed')) {
//     timedCommand(message);
//   } else if (message.content.startsWith('!backup')) {
//     backupCommand(message);
//   } else if (message.content.startsWith('!backoff')) {
//     backoffCommand(message);
//   }
//   // else if (message.content.startsWith("!image")){
//   // imageCommand(message);
//   // }
// });
