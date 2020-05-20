const {Command} = require('discord.js-commando');


module.exports = class MentionCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mention',
            aliases: ['m'],
            group: 'pings',
            memberName: 'mention',
            description: 'Mentions a user the amount of times specified',
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to mention?',
                    type: 'user',
                },
                {
                    key: 'times',
                    prompt: 'How many times would you like to mention them?',
                    type: 'integer',
                }
            ]
        });
    }

    run(message, {user, times}) {
        let msgout = '';
        if (times < 1 || isNaN(times)) {
            message.reply("That amount isn't valid. Please try again.");
        }
        else {
            if (times == 69) msgout += "nice\n";
            for (let i = 0; i < times; i++) {
                msgout += user.toString();
                msgout += "\n";
            }
            if (msgout.length >= 2000) {
                message.reply("that went over 2000 characters, try a smaller amount of mentions.");
            }
            else {
                message.reply(msgout);
            }
        }
    }
}
