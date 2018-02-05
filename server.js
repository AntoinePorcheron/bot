const fs = require("fs");
const Discord = require("discord.js");
const {exec} = require("child_process");
const client = new Discord.Client();
const CYANIDE_HAPINESS_MAX = 4844;

const COMMAND_START = [ '!' ];
const TOKEN_FILE = '.token';
const KNOWN_LANGUAGE = [ "c", "cpp", "python", "java", "javascript" ];
const SHELL_COMMAND = { "cpp" : "echo \"${content}\" | g++ -x c++ - -o ${filename}.out && ./${filename}.out",
                        "c" : "echo \"${content}\" | gcc -x c - -o ${filename}.out && ./${filename}.out",
                        "python" : "echo \"${content}\" | python",
                        "java" : "echo \"class ${filename}{\n${content}\n}\" > ${filename}.java && javac ${filename}.java && java ${filename}",
                        "javascript": "echo \"${content}\" > ${filename}.js && node ${filename}.js"
                      };
const TEX_HEADER = "\\nonstopmode\n\\documentclass{article}\n\\pagestyle{empty}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\begin{document}\n";
const TEX_FOOTER = "\n\\end{document}";


/**
 * Fonction qui permet de lire les secrets necessaire pour faire la
 * connexion au serveur
 */
fs.readFile(TOKEN_FILE, 'utf8', function(err, data) {
    if (err)
        return console.error(err);
    client.login(data);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    BOT_NAME = client.user.username;
});

client.on('message', msg => { handleMessage(msg); });

/**
 * Fonction qui traite les messages
 * @param message discord
 */
function handleMessage(msg) {
    if (isCode(msg.content) && contains(KNOWN_LANGUAGE, getCode(msg.content))) {
        runCode(msg, getCodeContent(msg.content));
    }else if( isCode(msg.content ) && getCode(msg.content) === "tex" ) {
        generateImage(msg);
    }
}

/**
 * Fonction qui à partir d'un bout de code tex génère une image et la renvoie au client
 */
function generateImage(msg){
    const content = getCodeContent(msg.content);
    const filename = "_" + content.hashCode();
    const command1 = `echo \"${TEX_HEADER}${content}${TEX_FOOTER}\" > ${filename}.tex`
    const command2 = `pdflatex ${filename}.tex`
    const command3 = `convert ${filename}.pdf -trim ${filename}.png`;
    console.log(command1);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            msg.reply("Erreur lors de la génération de l'image...");
            msg.reply("Erreur : ");
            msg.reply(`\`\`\`bash ${error} \`\`\``);

        } else {
            exec(command, (error2, stdout, stderr) => {
                if ( error2 ){
                    console.log(error2);
                }else{
                    exec(command, (error1, stdout, stderr) => {
                        if ( error1 ){
                            console.log(error1);
                        }else{
                            console.log("succès");
                        }
                    });
                }
            });
            msg.reply("", {"files" : [`${filename}.png`]});
            
        }
    });
}

/**
 * Fonction qui determine si un message reçu est une commande
 * @param msg un message discord
 */
function isCommand(msg) {
    let message = msg.content.trim();
    let command = false;
    COMMAND_START.forEach(
        (element) => { command = command || element === message[0]; });
    return command;
}

/**
 * Fonction qui parse un message texte pour determiner la commande et les
 * paramètres associé
 * @param msg chaine de charactères
 */
function parseCommand(msg) {
    let message = msg.trim().substr(1).split(' ');
    let params = message.shift();
    return {"command" : message[0], "params" : params};
}

/**
 * Fonction qui determine si un objet est non définie
 */
function is_undefined(object) { return (typeof object) === "undefined"; }

/**
 * Fonction qui détermine si l'utilisateur username est concerné par le
 * message msg
 * @param msg le message discord
 * @param username l'utilisateur concerné
 */
function user_concerned(msg, username) {
    return msg.mentions.users.findKey('username', username) != null;
}

/**
 * Fonction qui détermine si un message texte contient du code ( formaté par
 * discord )
 */
function isCode(msg) { return msg.startsWith('```'); }

/**
 * Fonction qui détermine quel
 * est le code utilisé dans le
 * texte
 */
function getCode(msg) {
    msg = msg.replace('\n', ' ');
    return msg.substr(3).split(' ')[0];
}

/**
 * Fonction qui permet de
 * recuperer le corp du code
 */
function getCodeContent(msg) {
    msg = msg.replace(/```/g, '').split('\n');
    msg.shift();
    return msg.join('\n').replace(/"/g, "\\\"").trim();
}

/**
 * Fonction qui retourne le(s)
 * utilisateur(s) concernée(s)
 * par un message discord
 */
function getConcerned(msg) { return msg.mentions.users; }

/**
 * Fonction qui determine si le
 * bot est concerné dans le
 * message discord
 */
function isConcerned(msg) {
    let concerned = user_concerned(msg, BOT_NAME);
    if (EVERYONE_MENTIONS_CONCERNED)
        concerned = concerned || msg.mentions.everyone;
    return concerned;
}

function runCode(msg, content) {
    const language = getCode(msg.content);
    const filename = "_" + content.hashCode();
    const command = SHELL_COMMAND[language].replace(/\$\{content\}/g, content).replace(/\$\{filename\}/g, filename);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            msg.reply("Error : ");
            msg.reply("```bash\n" + stderr + "\n```");

        } else {
            msg.reply("STDOUT : ");
            msg.reply("```bash\n" + stdout + "\n```");
            msg.reply("STDERR : ");
            msg.reply("```bash\n" + stderr + "\n```");
        }
    });
}

/**
 * Fonction qui génère un hash pour une chaine de charactères
 */
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0)
        return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

/**
 * Fonction qui retourne vrai si l'élément 'element' se trouve dans le tableau 'array'
 */
function contains(array, element) {
    let result = false;
    array.forEach((el) => { result = result || el === element; });
    return result;
}

class BinaryTree{
    constructor(){
        this.left = null;
        this.right = null;
        this.value = null;
    }
}

/*
  ```cpp
  #include <iostream>
  int main(){
  std::cout << "\```javascript message\`\`\`" << std::endl;
  std::cerr << "error" << std::endl;
  return 0;
  }
  ```
  ```python
  if ( __name__ == "__main__" ):
  
     print("ahah")
  ```

  ```javascript
  function replicate(){
  console.log('test');/*``` test ```javascript console.log("je suis là"); ``` test ```*/
/*}*/
/*  replicate();*/
/*```*/
/**/
