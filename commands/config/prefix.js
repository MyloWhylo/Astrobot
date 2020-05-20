const { Command } = require('discord.js-commando');

module.exports = class PrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prefix',
            aliases: ['p'],
            group: 'config',
            memberName: 'prefix',
            description: 'Changes the prefix',
            args: [
                {
                    key: 'prefix',
                    prompt: 'What would you like the prefix to be?',
                    type: 'string',
                }]
        });
    }
        async run(message, {prefix}){
            this.client.commandPrefix = prefix;
            await message.reply(`Changed the prefix to ${prefix}`)
    }
};
