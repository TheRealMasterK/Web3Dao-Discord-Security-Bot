import { EmbedBuilder, CommandInteraction, ModalSubmitInteraction } from "discord.js"
import Bot from "../classes/Bot"

let config : ResultEmbed = {
    name: "failedApplied",
    async exec(interaction: CommandInteraction, bot: Bot) {
        let embed = new EmbedBuilder()
        .setTitle("Fail")
        .setDescription('You cannot apply for this job!')
        .setColor('Red')

        await interaction.editReply({
            embeds: [embed]
        })
    }
} 

module.exports = config