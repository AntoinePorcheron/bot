const fs = require("fs");
const Discord = require("discord.js");
const { exec } = require("child_process");
const client = new Discord.Client();

const COMMAND_START = [ '!' ];
const TOKEN_FILE = '.token';
/**
 * Fonction qui permet de lire les secrets necessaire pour faire la connexion au
 * serveur
 */
fs.readFile(TOKEN_FILE, 'utf8', function(err, data) {
  if (err)
    return console.error(err);
  client.login(data);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  BOT_NAME = client.user.username;
});

client.on('message', msg => {
    handleMessage(msg);
    console.log(msg.content);
});

/**
 * Fonction qui traite les messages
 * @param message discord
 */
function handleMessage(msg) {
  if (msg.author.username != client.user.username) {
    if (msg.content.indexOf('gros') > -1)
      msg.reply("Pas autant que ta mère!");
    else if (msg.content.indexOf('petit') > -1)
      msg.reply("Pas autant que ta bite!");
    else if (is_command(msg)) {
      let command = msg.content.split(' ')[0];
      commandsManager.call(msg.content);
    } else if (is_concerned(msg))
      msg.reply("Hey, je suis concerné!");
  }
}

/**
 * Fonction qui determine si un message reçu est une commande
 * @param msg un message discord
 */ 
function isCommand(msg) {
  let message = msg.content.trim();
  let command = false;
  COMMAND_START.forEach(
      (element) => { command = command || element === message[0]; });
  return command;
}

/**
 * Fonction qui parse un message texte pour determiner la commande et les paramètres associé
 * @param msg chaine de charactères
 */
function parseCommand(msg){
    let message = msg.trim().substr(1).split(' ');
    let params = message.shift();
    return { "command" : message[0], "params" : params };
}

/**
 * Fonction qui determine si un objet est non définie
 */
function is_undefined(object) { return (typeof object) === "undefined"; }

/**
 * Fonction qui détermine si l'utilisateur username est concerné par le message msg
 * @param msg le message discord
 * @param username l'utilisateur concerné
 */
function user_concerned(msg, username) {
  return msg.mentions.users.findKey('username', username) != null;
}

/**
 * Fonction qui détermine si un message texte contient du code ( formaté par discord )
 */
function isCode(msg){
    return msg.startWith('```');
}

/**
 * Fonction qui détermine quel est le code utilisé dans le texte
 */
function getCode(msg){
    return msg.substr(3).split(' ')[0];
}

/**
*/

/**
 * Fonction qui retourne le(s) utilisateur(s) concernée(s) par un message discord
 */
function getConcerned(msg){
    return msg.mentions.users;
}

/**
 * Fonction qui determine si le bot est concerné dans le message discord
 */
function is_concerned(msg) {
  let concerned = user_concerned(msg, BOT_NAME);
  if (EVERYONE_MENTIONS_CONCERNED)
    concerned = concerned || msg.mentions.everyone;
  return concerned;
}
