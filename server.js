const Discord = require("discord.js");
const client = new Discord.Client();

let TOKEN_FILE = '.token';
let fs = require( 'fs' );

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping')
    {
        msg.reply('Pong!');
    }
    else
    {
        msg.reply( msg.content );
        /*console.log(msg.);*/
    }
});

//login the client bot
fs.readFile( TOKEN_FILE , 'utf8', function(err, data){
    if ( err ) {
        return console.log(err);
    }
    client.login(data);
});
