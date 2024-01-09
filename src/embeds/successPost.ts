import { EmbedBuilder, CommandInteraction, ModalSubmitInteraction } from "discord.js"
import Bot from "../classes/Bot"

let config : ResultEmbed = {
    name: "successPost",
    async exec(interaction: CommandInteraction, bot: Bot) {
        let embed = new EmbedBuilder()
        .setTitle("Success")
        .setDescription('Your job successfully posted!')
        .setColor('Green')

        await interaction.editReply({
            embeds: [embed]
        })
    }
} 

module.exports = config