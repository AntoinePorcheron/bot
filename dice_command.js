module.exports = function(){
    this.dice = function( max_val ){
        if ( is_undefined( max_val ) )
            max_val = 7;
        let min_dice_value = 1;
        let value;
        if ( max_val > 0 )
            value = randint( min_dice_value , max_val );
        else
            value = -1;
        return value;
    };

    this.dice_command = function(command , msg ) {
        let dices = [];
        if ( is_undefined( command ) )
            dices.push( dice() );
        else{
            commands = command.split('d');
            let nb_dices = parseInt(commands[0]);
            let max_value = parseInt(commands[1]);
            if ( nb_dices > 0 )
                for ( let i = 0; i < nb_dices; ++i )
                    dices.push( dice( max_value ) );   
        }
        let all_right = dices.length > 0;
        for ( let i = 0; i < dices.length; ++i )
            if ( dices[i] < 1 )
                all_right = false;   
        if ( all_right )
            dice_message( dices , msg );
        else
            dice_error_message( msg );
    }; 
    
    this.dices_sum = function( dices ){
        let sum = 0;
        dices.forEach( function ( v ) { sum += v; } );
        return sum;
    };
    
    this.dice_message = function( dices , msg ){
        let message = "résultat = " + dices_sum(dices);
        if ( dices.length > 1 )
            message += " dés = " + dices;
        msg.reply( message );
    };
    
    this.dice_error_message = function(msg){
        msg.reply("Les paramètres fournis ne sont pas valide...");
    };
};
