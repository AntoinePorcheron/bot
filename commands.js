module.exports = class Commands{
    constructor(){
        this.commands = {};
    }

    set(key , fun ){
        this.commands[key] = fun;
    }

    call(msg_content){
        let command = msg_content.split(' ');
        return commands[command[0]](commands[1]);
    }
}
