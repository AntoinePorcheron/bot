require("./useful.js")();
const Dice = require("./dice.js");

function filterInt(value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return Number(value);
    return NaN;
}

function intifyArray(array){
    for (let i = 0; i < array.length; ++i){
        array[i] = filterInt(array[i]);
    }
    return array;
}

function parse_dice_params(params){
    let dice_params = intifyArray(params.split('d'));
    if ( dice_params.length === 2 ){
        if ( isNaN(dice_params[0]) || isNaN(dice_params[1]) ){
            dice_params[0] = -1;
            dice_params[1] = -1;
        }
    }else{
        dice_params = [-1, -1];
    }
    return dice_params;
}

module.exports = function(){
    this.command = function(msg, params){
        let dice_quantity = 1;
        let max_dice_value = 6;
        let error = false;
        
        if ( !is_undefined( dice_params ) ){
            let dice_params = parse_dice_params(params);
            
            if ( dice_params[0] > 0 && dice_params[1] > 0 ){
                dice_quantity = dice_params[0];
                max_dice_value = dice_params[1];
            }else{
                error = true;
            }
        }
        
        let dice = new /*Dice.*/Dice(max_dice_value);
        let sum = 0;
        
        for (let i = 0; i < dice_quantity; ++i)
            sum += dice.throw().value

        let response;
        if ( error ){
            response = "Error while parsing input data"
        }else{
            response = `Resultat : ${sum}`;
        }
        return response;
    }
};
