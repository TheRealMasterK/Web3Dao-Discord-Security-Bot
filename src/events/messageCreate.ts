import Bot from "../classes/Bot"
import { Embed, EmbedBuilder, Message } from "discord.js"
import db, { getChat, getJob } from "../firebase"

let config : BotEvent = {
    name: "messageCreate",
    once: false,
    async exec(message : Message, bot: Bot) {
        if(message.author.bot) return

        let activeChat = await getChat(db, message.author.id)

        if(!activeChat) return

        let job = await getJob(db, `${activeChat?.jobId}`)

        if(!job) return

        let guild = await bot.guilds.fetch(`${job?.guildId}`)

        let reciever = await guild.members.fetch(`${activeChat?.companionId}`)

        let embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle(`New message from ${message.author.username}. Job: ${job?.title}`)
        .setDescription(`${message.content}`)
        .setTimestamp()

        await reciever?.send({
            embeds: [embed]
        })
    }
}

module.exports = config