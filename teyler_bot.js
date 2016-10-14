/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'MjMxNTkwOTUzMTk3MTA5MjQ4.CtClig.77OZXNMyFx8HuI_AB0HxoJjizIM';

const sizelimit = 50;

function startup(channel){
	channel.sendMessage("Teyler-bot has started! type !help for commands.");
}

function help(channel) {
	channel.sendMessage(`!help - display this message\n
!teyler {count} - summons teyler optional times\n
!speed {count}  - summons teyler quickly\n
!random {minutes}        - summons teyler randomly in the next count minutes`);
}

function repeatMessage(channel, count, sender, message){
	if (isNaN(count) || count < 0){
  		channel.sendMessage("Can only use positive numbers for the number of summons");
  		return;
  	}

  	if (count > sizelimit){
  		channel.sendMessage("Woah, calm down satan.");
  		return;
  	}

	var mes = "";
	for (i = 0; i < count; i++){
		mes += message;
	}
	channel.sendTTSMessage(mes);
}

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
  
  //send startup message
  for  (let guild of bot.guilds.array()){
  	var channel = guild.defaultChannel;
  	startup(channel);
  }
  
});

// create an event listener for messages
bot.on('message', message => {
	//check to see if message want to respond to
	let prefix = "!";
	if(!message.content.startsWith(prefix)) {
		return;
	}
  	// don't respond to bots
  	if(message.author.bot) {
  		return;  
  	}

  	if (message == "!help"){
  		help(message.channel);
  	}
  	if (message.content.startsWith("!teyler")){
  		var mesarray = message.content.split(" ");
  		var num = 1;
  		if (mesarray.length > 1){
  			num = parseInt(mesarray[1]);
  		}
  		repeatMessage(message.channel, num, message.member, "teyler? ");
  	}
  	if (message.content.startsWith("!speed")){
  		var mesarray = message.content.split(" ");
  		var num = 1;
  		if (mesarray.length > 1){
  			num = parseInt(mesarray[1]);
  		}
  		repeatMessage(message.channel, num, message.member, "teyler ");
  	}
  	if (message.content.startsWith("!random")){
  		var mesarray = message.content.split(" ");
  		var num = 1;
  		if (mesarray.length > 1){
  			num = parseInt(mesarray[1]);
  		}
  		if (num > sizelimit || num < 0){
  			num = 1;
  		}

  		num = num * 1000 * 60;
  		var mult = Math.random();

  		num = num * mult;
  		setTimeout(function(){repeatMessage(message.channel, 1, message.member, "teyler?")}, num);
  	}
});

// log our bot in
bot.login(token);