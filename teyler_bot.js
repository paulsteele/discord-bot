/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

//production mode or not
const TESTING = false;


// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'MjMxNTkwOTUzMTk3MTA5MjQ4.CtClig.77OZXNMyFx8HuI_AB0HxoJjizIM';

const sizelimit = 100;

function startup(channel){
	channel.sendMessage("**Teyler-bot** has started! type `!help` for commands.");
}

function help(channel) {
	channel.sendMessage(`\`\`\`!help			  			  - display this message
!teyler {count} {slow|fast}	  - summons teyler optional count times, with slow or fast speed
!timed {minutes}				 - summons teyler randomly in the next defined timeframe\`\`\``);
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

function getMessageIntArgument(message, index){
	var mesarray = message.content.split(" ");
  	if (mesarray.length > index){
  		return parseInt(mesarray[index]);
  	}

  	return 1;
}

function getMessageStringArgument(message, index){
	var mesarray = message.content.split(" ");
  	if (mesarray.length > index){
  		return (mesarray[index]);
  	}

  	return "";
}

function shouldRespond(guild){
	if (guild == null){
		return false;
	}
	if (TESTING == false){
		if (guild.name == 'Bot Test'){
			return false;
		}
	}
	else{
		if (guild.name != 'Bot Test'){
			return false;
		}
	}

	return true;
}

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
  
  //send startup message
  for  (let guild of bot.guilds.array()){
  	if (shouldRespond(guild)){
  		var channel = guild.defaultChannel;
  		startup(channel);
  	}
  	
  }
  
});

// create an event listener for messages
bot.on('message', message => {

	if (!shouldRespond(message.guild)){
		return;
	}
	

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
  		var num = getMessageIntArgument(message, 1);
  		var speed = getMessageStringArgument(message, 2);
  		if (speed == "slow" || speed == ""){
			repeatMessage(message.channel, num, message.member, "teyler? ");
  		}
  		else if (speed == "fast"){
  			repeatMessage(message.channel, num, message.member, "teyler ");
  		}
  		else {
  			channel.sendMessage("Can only use \"slow\" or \"fast\" as speed options.");
  		}
  		
  	}
  	if (message.content.startsWith("!timed")){
  		var mesarray = message.content.split(" ");
  		var num = getMessageIntArgument(message, 1);

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