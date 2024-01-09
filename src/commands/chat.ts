import Bot from "../classes/Bot"
import { ActionRow, ActionRowBuilder, CommandInteraction, EmbedBuilder, ModalBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import Command from "../classes/Command"
import db, { getAppliers, getAppliersOwner, getChat } from "../firebase"

let config : Command =  {
    name: "chat",
    toRegister: true,
    description : "Start chat with employee",
    options: [],
    defferReply: true,
    async exec(interaction: CommandInteraction, bot: Bot, args: []) {

        if(!interaction.channel?.isDMBased()) {
            return await interaction.editReply({
                embeds: [new EmbedBuilder().setTitle('Use this command at DM channel!').setColor('Red')]
            })
        } 

        let activeChat = await getChat(db, interaction.user.id)

        if(activeChat) {
            let embed = new EmbedBuilder()
            .setTitle('You already have a chat with user.')
            .setDescription('End previous one to start new.')

            return await interaction.editReply({
                embeds: [embed]
            })
        }

        let embed = new EmbedBuilder()
        .setTitle('Choose employee you want to chat.')
        .setColor('Blurple')

        let appliers = await getAppliersOwner(db, interaction.user.id)

        let memberOptions : Array<SelectMenuOptionBuilder> = []

        let usedIDs: Array<string> = []

        for(var i = 0; i < appliers.length; i++) {
            let guild = await bot.guilds.fetch(appliers[i].guildId)
            let member = await guild.members.fetch(appliers[i].userId)

            if(!usedIDs.includes(`${appliers[i].userId}_${appliers[i].jobId}`) && appliers[i].userId != interaction.user.id) {
                usedIDs.push(`${appliers[i].userId}_${appliers[i].jobId}`)
                memberOptions.push(new SelectMenuOptionBuilder().setLabel(`${member?.user.username}`).setValue(`${appliers[i].userId}_${appliers[i].jobId}`).setDescription(`Job ID: ${appliers[i].jobId}`))
            } 
        }

        let row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents([
            new SelectMenuBuilder()
            .setCustomId('employee-select')
            .setPlaceholder('Choose a person')
            .addOptions(memberOptions)
        ])

        await interaction.editReply({
            embeds: [embed],
            components: [row]
        })

    }
}

module.exports = config