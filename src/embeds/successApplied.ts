import { EmbedBuilder, CommandInteraction, ModalSubmitInteraction } from "discord.js"
import Bot from "../classes/Bot"

let config : ResultEmbed = {
    name: "successApplied",
    async exec(interaction: CommandInteraction, bot: Bot) {
        let embed = new EmbedBuilder()
        .setTitle("Success")
        .setDescription('You successfully applied for this job!\nFuther communication will be going through DM.')
        .setColor('Green')

        await interaction.editReply({
            embeds: [embed]
        })
    }
} 

module.exports = config