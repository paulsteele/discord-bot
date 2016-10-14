/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

//production mode or not
const TESTING = false;


// import the discord.js module
const Discord = require('discord.js');
var keys = require('./keys.js');

var http = require('https');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

//the sizelimit on tts loops
const sizelimit = 100;

var Flickr = require("node-flickr");
var flickrkey = {"api_key": keys.FLICKRKEY}
flickr = new Flickr(flickrkey);

var backup = {};

function startup(channel){
	channel.sendMessage("**Teyler-bot** has started! type `!help` for commands.");
}

function helpCommand(channel) {
	channel.sendMessage(`\`\`\`!help			  			  - display this message
!teyler {count} {slow|fast}	  - summons teyler optional count times, with slow or fast speed
!timed {minutes}				 - summons teyler randomly in the next defined timeframe
!backup						  - will have teyler-bot back up your arguments.
!backoff						 - will have teyler-bot back down from helping. \`\`\``);
}

function repeatMessage(message, count, text){
	if (isNaN(count) || count < 0){
  		message.channel.sendMessage(message.author + ": can only use positive numbers for the number of summons");
  		return;
  	}

  	if (count > sizelimit){
  		message.channel.sendMessage(message.author + ": woah, calm down satan.");
  		return;
  	}

	var mes = "";
	for (i = 0; i < count; i++){
		mes += text;
	}
	message.channel.sendTTSMessage(mes);
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

function checkBackup(id){
	return backup.hasOwnProperty(id);
}

function addBackup(id){
	backup[id] = true;
}

function removeBackup(id){
	delete backup[id];
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
	// don't respond to bots
  	if(message.author.bot) {
  		return;  
  	}

	//check to see if message want to respond to
	let prefix = "!";
	if(!message.content.startsWith(prefix)) {
		
		if (checkBackup(message.author.id)){
			sameFunction(message);
		}

		return;
		
	}
  	if (message == "!help"){
  		helpCommand(message.channel);
  	}
  	else if (message.content.startsWith("!teyler")){
  		teylerCommand(message);
  		
  	}
  	else if (message.content.startsWith("!timed")){
  		timedCommand(message);
  	}
  	else if (message.content.startsWith("!backup")){
  		backupCommand(message);
  	}
  	else if (message.content.startsWith("!backoff")){
  		backoffCommand(message);
  	}
  	//else if (message.content.startsWith("!image")){
  		//imageCommand(message);
  	//}
});

function teylerCommand(message){
	var num = getMessageIntArgument(message, 1);
	var speed = getMessageStringArgument(message, 2);
	if (speed == "slow" || speed == ""){
		repeatMessage(message, num,  "teyler? ");
	}
	else if (speed == "fast"){
		repeatMessage(message, num, "teyler ");
	}
	else {
		message.channel.sendMessage(message.author + ": can only use \"slow\" or \"fast\" as speed options.");
	}
}

function timedCommand(message){
	var mesarray = message.content.split(" ");
  		var num = getMessageIntArgument(message, 1);

  		if (num > sizelimit || num < 0){
  			num = 1;
  		}

  		num = num * 1000 * 60;
  		var mult = Math.random();

  		num = num * mult;
  		setTimeout(function(){repeatMessage(message, 1, "teyler?")}, num);
}

function backupCommand(message){
	if (!checkBackup(message.author.id)){
		addBackup(message.author.id);
		message.channel.sendMessage("Backing up " + message.author);
	}
	else{
		message.channel.sendMessage("Already backing you up " + message.author + "!");
	}
}

function backoffCommand(message){
	if (checkBackup(message.author.id)){
		removeBackup(message.author.id);
		message.channel.sendMessage("Backing off " + message.author);
	}
	else{
		message.channel.sendMessage("I, uhhh, wasn't backing you up before " + message.author + "...");
	}
}

function sameFunction(message){
	if (message.content.indexOf('same') > -1){
		var also = occurrences(message.content, "also", false);
		if (also > sizelimit){
			also = sizelimit;
		}
		var mes = "";
		for (i = 0; i < also + 1; i++){
			mes += "also ";
		}
		mes += "same";
		message.channel.sendMessage(mes);
	}
	else{
		message.channel.sendMessage("same");
	}
}

function imageCommand(message){
	var tag = getMessageStringArgument(message, 1);
	var i = 2;
	while(true){
		var partial = getMessageStringArgument(message, i);
		if (partial != ""){
			tag += "," + partial
		}
		else{
			break;
		}
		i++;
	}
	console.log(tag);
	if (tag == ""){
		message.channel.sendMessage(message.author + ": You got to put a search term dummy");
		return;
	}
	flickr.get("photos.search", {"tags": tag, "per_page": 1, "tag_mode": "all", "sort": "relevance", "extras" : "url_o" }, function(err, result){
    	if (err) {
    		return console.error(err);
    	}
    	if (result.photos.total == 0){
    		message.channel.sendMessage("I couldn't find anything...");
    		return;
    	}
    	var text = result.photos.photo[0].url_o;
    	message.channel.sendMessage(text);
    	
	});

	
}

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

// log our bot in
bot.login(keys.DISCORDTOKEN);
