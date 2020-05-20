const { Command } = require('discord.js-commando');

module.exports = class SomeoneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'someone',
            aliases: ['s'],
            group: 'pings',
            memberName: 'someone',
            description: 'Pings a random online user',
        });
    }
    async run(message) {
        let members = await message.guild.members.fetch();

        for (const [key, value] of members.entries()) {
            if (value.user.bot) members.delete(key);
            else if (gm.presence.status === "offline") members.delete(key);
            else if (gm.presence.status === "dnd")members.delete(key);
            else if (value.user.equals(message.author)) members.delete(key);
        }

        if (!members.size) await message.channel.send('There\'s nobody to send the message to!');

        else {
            members = members.array();
            let member = members[Math.floor(Math.random()*members.length)].user;
            await message.reply(`<@${member.id}>`);
        }
    }
};

