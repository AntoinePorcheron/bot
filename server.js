const fs = require("fs");
const Discord = require("discord.js");
const redis = require("redis");
const natural = require("natural");

const client = new Discord.Client();

require("./useful.js")();
require("./dice_command.js")();
require("./config.js")();

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
        else if ( is_command( msg ) )
            command_handler( msg );
        else if ( is_concerned( msg ) )
            msg.reply("Hey, je suis concerné!");
    }
});

function start_test()
{
    let rclient= redis.createClient();
    rclient.on('ready', function(){ console.log("ready"); });
    rclient.set('test_0', JSON.stringify({mot : 'mot', value : 0 }));
    rclient.get('test_0',function(err, val) {
        if ( !err )
            console.log(val);
    });
}

start_test();
