const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const webpconverter = require('./utils/webpconverter.js');
const { MessageAttachment } = require('discord.js');
const botInfo = require('./botInfo.json');

const astrobot = new CommandoClient({
    commandPrefix: botInfo.prefix,
    owner: botInfo.owner,
    invite: botInfo.invite,
    unknownCommandResponse: false,
    disableEveryone: true
});

astrobot.registry
    .registerGroups([
        ['pings','Mention people randomly!'],
        ['fun', 'Random fun stuff'],
        ['config', 'Settings and stuffs']
    ])
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        ping: false,
        prefix: false,
        unknownCommand: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));
astrobot.once('ready', () => {
    console.log(`{green}Ready to go!{reset}`);
    astrobot.user.setActivity('the world burn', { type: 'WATCHING'});
});

astrobot.on('message', async message => {
    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.array()) {
            await webpconverter.convertWebpToJPEG(message, attachment);
        }
    }
});

astrobot.on('error', console.error);

astrobot.login(botInfo.token);

const terminalColors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    BGblack: '\x1b[40m',
    BGred: '\x1b[41m',
    BGgreen: '\x1b[42m',
    BGyellow: '\x1b[43m',
    BGblue: '\x1b[44m',
    BGmagenta: '\x1b[45m',
    BGcyan: '\x1b[46m',
    BGwhite: '\x1b[47m'
}

const oldLog = console.log;

global.console.log = function (...args) {
    args = args.map(arg => {
        if (typeof arg === 'string') {
            /* eslint-disable guard-for-in */
            for (const color in terminalColors) {
                arg = arg.replace('{' + color + '}', terminalColors[color]);
            }
            arg += terminalColors.reset;
        }
        return arg;
    });
    return oldLog(new Date().toISOString().replace('T', ' ').replace('Z', ''), ...args);
};
