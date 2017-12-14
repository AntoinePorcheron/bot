module.exports = function(){
    this.TOKEN_FILE = '.token';
    this.BOT_NAME;
    this.EVERYONE_MENTIONS_CONCERNED = true;
    this.COMMAND = { 'roll': dice_command }
    this.BEGIN_COMMAND = '!';
}
