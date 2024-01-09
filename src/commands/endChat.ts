import Bot from "../classes/Bot"
import { ActionRow, ActionRowBuilder, CommandInteraction, EmbedBuilder, ModalBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import Command from "../classes/Command"
import db, { deleteChat, getAppliers, getAppliersOwner, getChat, getJob } from "../firebase"

let config : Command =  {
    name: "endchat",
    toRegister: true,
    description : "End chat with employee",
    options: [],
    defferReply: true,
    async exec(interaction: CommandInteraction, bot: Bot, args: []) {
        if(!interaction.channel?.isDMBased()) {
            return await interaction.editReply({
                embeds: [new EmbedBuilder().setTitle('Use this command at DM channel!').setColor('Red')]
            })
        } 

        let activeChat = await getChat(db, interaction.user.id)

        if(!activeChat) {
            let embed = new EmbedBuilder()
            .setTitle("You don't have active chat!")
            .setColor('Red')
            return await interaction.editReply({
                embeds: [embed]
            })
        }

        if(activeChat.initiate != interaction.user.id) {
            let embed = new EmbedBuilder()
            .setTitle("You cannot end this chat because you haven't initiate it.")
            .setColor('Red')
            return await interaction.editReply({
                embeds: [embed]
            })
        }

        let embed = new EmbedBuilder()
        .setTitle('You ended chat with user.')
        .setColor('Green')

        let companionEmbed = new EmbedBuilder()
        .setTitle('Employer ended chat with you.')
        .setColor('Red')

        let job = await getJob(db, activeChat.jobId)

        if(!job) return

        let guild = await bot.guilds.fetch(job.guildId)
        let member = await guild.members.fetch(activeChat.companionId)

        await member.send({
            embeds: [companionEmbed]
        })

        await deleteChat(db, interaction.user.id)
        await deleteChat(db, activeChat.companionId)

        await interaction.editReply({
            embeds: [embed]
        })

    }
}

module.exports = config