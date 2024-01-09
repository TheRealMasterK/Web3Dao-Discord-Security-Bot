import Bot from "../classes/Bot"
import { ActionRow, ActionRowBuilder, CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import Command from "../classes/Command"

let config : Command =  {
    name: "post",
    toRegister: true,
    description : "Post your job",
    options: [],
    defferReply: false,
    async exec(interaction: CommandInteraction, bot: Bot, args: []) {
        let modal = new ModalBuilder()
        .setCustomId('jobPoster')
        .setTitle('Fill your data.')
        
        let row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
            .setCustomId('name')
            .setLabel("Job name")
            .setStyle(TextInputStyle.Short)
        )

        let row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
            .setCustomId('description')
            .setLabel("Job description")
            .setStyle(TextInputStyle.Paragraph)
        )
        
        let row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
            .setCustomId('reward')
            .setLabel("Job reward")
            .setStyle(TextInputStyle.Short)
        )

        modal.addComponents(row1, row2, row3)

        await interaction.showModal(modal)

    }
}

module.exports = config