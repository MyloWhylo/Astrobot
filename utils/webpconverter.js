const fs = require('fs');
const request = require('request');
const wp = require('webp-converter');
const {MessageAttachment} = require('discord.js');

module.exports = {
    convertWebpToJPEG: async function (message, attachment) {
        if (attachment.name.includes('.webp')){
            let outFile = "./temp/"+attachment.name.replace('.webp','.png');
            let inFile = "./temp/"+attachment.name;
            request.get(attachment.url).pipe(fs.createWriteStream(inFile)).on('close', function () {
                wp.dwebp(inFile, outFile, "-o", function(status,error) {
                    console.log(status,error);
                    let attach = new MessageAttachment(`./${outFile}`);
                    let guild = message.guild;
                    let nick = guild.member(message.author).displayName;
                    message.reply((nick + ": " + message.content), attach);
                    setTimeout(function() {
                        fs.unlinkSync(inFile);
                        fs.unlinkSync(outFile);
                    }, 60000);
                    message.delete();
                });
            });
        }
    }
}