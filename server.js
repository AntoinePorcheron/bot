const Discord = require("discord.js");
const client = new Discord.Client();

let TOKEN_FILE = '.token';
let fs = require( 'fs' );

let BOT_NAME = "Bot de sept lieu"; // shouldn't be done like this I think...

let EVERYONE_MENTIONS_CONCERNED = true;

function dice( command_value ) {

    if ( typeof command_value === "undefined" )
        command_value = "";
    
    let value;
    let min_dice_value = 1;
    if ( dice === '' )
    {
        value = randint( min_dice_value , 7 );
    }
    else
    {
        commands = command_value.split('d');
        if ( commands.length == 2 )
        {
            let nb_dice, max;
            nb_dice = parseInt(commands[0]);
            max = parseInt(commands[1]);
            value = randint( min_dice_value , max );
        }
        else
        {
            value = -1;
        }
    }
    return value;
}

let COMMAND =
    {
        'roll': dice
    }
let BEGIN_COMMAND = '!';

//FUNCTION
function rand01()
{
    return Math.random();
}

function rand(min, max) //generate between [min, max[
{
    return ( rand01() * ( max - min ) ) + min;
}

function randint(min, max) //generate integer value between [min, max[
{
    return Math.floor( rand( min , max ) )
}


function user_concerned( msg , username )
{
    return msg.mentions.users.findKey( 'username' , username ) != null;;
}

function is_concerned( msg )
{
    let concerned = user_concerned( msg , BOT_NAME );
    if ( EVERYONE_MENTIONS_CONCERNED )
        concerned = concerned || msg.mentions.everyone;
    return concerned;
}

function is_command( msg )
{
    let message = msg.content.split(' ');
    let isCommand = message[0][0] == BEGIN_COMMAND;
    if ( message.length > 1 )
        isCommand = isCommand || message[1][0] == BEGIN_COMMAND;
    return isCommand;
}

function command_handler( msg )
{
    let message = msg.content.split(' ');
    let position = ( message[0][0] != BEGIN_COMMAND ? 1 : 0 );
    let command = message[position].replace('!', '');
    msg.reply(COMMAND[command]( message[1] ));

    
}


//SERVER INTERACTION
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

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
        else if ( is_command( msg ) )
        {
            command_handler( msg )
        }
        else if ( is_concerned( msg ) )
        {
            msg.reply("Hey, je suis concerné!");
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
