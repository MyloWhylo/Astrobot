const {Command} = require('discord.js-commando');

module.exports = class RollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            aliases: ['r'],
            group: 'config',
            memberName: 'roll',
            description: 'Rolls a number of dice with a specified number of sides',
            args: [
                {
                    key: 'numDice',
                    prompt: 'How many dice would you like to roll?',
                    type: 'integer',
                    default: 1,
                    validate: numDice => numDice > 0,
                },
                {
                    key: 'numSides',
                    prompt: 'How many sides would you like the di(c)e to have?',
                    type: 'integer',
                    default: 6,
                    validate: numSides => numSides > 0,
                }]
        });
    }

    async run(message, {numDice, numSides}) {
        let total = 0;
        for (let i = 0; i < numDice; i++) {
            total += getRandomIntInclusive(1,numSides);
        }
        await message.reply(numDice == 1 ? `Wow! You rolled a ${total}.` : `Wow! You rolled a ${total}, with an average roll of ${total / numDice}.`);
    }
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}