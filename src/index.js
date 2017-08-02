/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// import the discord.js module
import Discord from 'discord.js';
import discordToken from './tokens';
// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();


const sizelimit = 50;

function startup(channel) {
  channel.sendMessage('Teyler-bot has started! type !help for commands.');
}

function help(channel) {
  channel.sendMessage(`!help - display this message\n
!teyler {count} - summons teyler optional times\n
!speed {count}  - summons teyler quickly\n
!random {minutes}        - summons teyler randomly in the next count minutes`);
}

function repeatMessage(channel, count, sender, message) {
  if (isNaN(count) || count < 0) {
    channel.sendMessage('Can only use positive numbers for the number of summons');
    return;
  }

  if (count > sizelimit) {
    channel.sendMessage('Woah, calm down satan.');
    return;
  }

  let mes = '';
  for (let i = 0; i < count; i += 1) {
    mes += message;
  }
  channel.sendTTSMessage(mes);
}

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  // send startup message
  bot.guilds.array().forEach((guild) => {
    startup(guild.defaultChannel);
  });
});

// create an event listener for messages
bot.on('message', (message) => {
  // check to see if message want to respond to
  const prefix = '!';
  if (!message.content.startsWith(prefix)) {
    return;
  }
  // don't respond to bots
  if (message.author.bot) {
    return;
  }

  if (message === '!help') {
    help(message.channel);
  }
  if (message.content.startsWith('!teyler')) {
    const mesarray = message.content.split(' ');
    let num = 1;
    if (mesarray.length > 1) {
      num = parseInt(mesarray[1], 10);
    }
    repeatMessage(message.channel, num, message.member, 'teyler? ');
  }
  if (message.content.startsWith('!speed')) {
    const mesarray = message.content.split(' ');
    let num = 1;
    if (mesarray.length > 1) {
      num = parseInt(mesarray[1], 10);
    }
    repeatMessage(message.channel, num, message.member, 'teyler ');
  }
  if (message.content.startsWith('!random')) {
    const mesarray = message.content.split(' ');
    let num = 1;
    if (mesarray.length > 1) {
      num = parseInt(mesarray[1], 10);
    }
    if (num > sizelimit || num < 0) {
      num = 1;
    }

    num = num * 1000 * 60;
    const mult = Math.random();

    num *= mult;
    setTimeout(() => { repeatMessage(message.channel, 1, message.member, 'teyler?'); }, num);
  }
});

// log our bot in
bot.login(discordToken);
