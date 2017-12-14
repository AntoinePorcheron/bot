module.exports = function(){    
    this.is_undefined = function( object ) { return ( typeof object === "undefined" ); };
    this.is_command =  function( msg ) {
        let message = msg.content.split(' ');
        let isCommand = message[0][0] == BEGIN_COMMAND;
        if ( message.length > 1 )
            isCommand = isCommand || message[1][0] == BEGIN_COMMAND;
        return isCommand;
    };
    
    this.user_concerned = function( msg , username ){
        return msg.mentions.users.findKey( 'username' , username ) != null;;
    };
    
    this.is_concerned = function ( msg ){
        let concerned = user_concerned( msg , BOT_NAME );
        if ( EVERYONE_MENTIONS_CONCERNED )
            concerned = concerned || msg.mentions.everyone;
        return concerned;
    };
};
