const Discord = require("discord.js");
const client = new Discord.Client();

let TOKEN_FILE = '.token';
let fs = require( 'fs' );

let BOT_NAME = "Bot de sept lieu"; // shouldn't be done like this I think...

let EVERYONE_MENTIONS_CONCERNED = true;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function is_concerned( msg )
{
    let concerned = msg.mentions.users.findKey('username', BOT_NAME) != null;
    if ( EVERYONE_MENTIONS_CONCERNED )
        concerned = concerned || msg.mentions.everyone;
    return concerned;
}

client.on('message', msg => {
    if ( msg.author.username != BOT_NAME )
    {
        if ( msg.content.indexOf('gros') > -1 )
        {
            msg.reply("Pas autant que ta mère!");
        }
        else if ( msg.content.indexOf('petit') > -1 )
        {
            msg.reply("Pas autant que ta bite!");
        }
        else
        {
            if ( is_concerned( msg ) )
            {
                msg.reply("Hey, je suis concerné!");
            }
        }
    }
});

//login the client bot
fs.readFile( TOKEN_FILE , 'utf8', function(err, data){
    if ( err ) {
        return console.log(err);
    }
    client.login(data);
});
