const fs = require("fs");
const Discord = require("discord.js");

const DC = require("./dice_command.js");
const Commands = require("./commands.js");

require("./useful.js")();

require("./config.js")();

const client = new Discord.Client();
const commandsManager = new Commands/*.Commands*/();
commandsManager.set('!roll', DC.command );

//login the client bot
fs.readFile( TOKEN_FILE , 'utf8', function(err, data){
    if ( err ) {
        return console.log(err);
    }
    client.login(data);
});

//SERVER INTERACTION
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    BOT_NAME = client.user.username;
});

client.on('message', msg => {
    if ( msg.author.username != BOT_NAME )
    {
        if ( msg.content.indexOf('gros') > -1 )
            msg.reply("Pas autant que ta mère!");
        else if ( msg.content.indexOf('petit') > -1 )
            msg.reply("Pas autant que ta bite!");
        else if ( is_command( msg ) ){
            /*command_handler( msg );*/
            let command = msg.content.split(' ')[0];
            commandsManager.call( msg.content );
        }
        else if ( is_concerned( msg ) )
            msg.reply("Hey, je suis concerné!");
    }
});
