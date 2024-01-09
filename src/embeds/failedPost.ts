import { CommandInteraction, EmbedBuilder } from "discord.js"
import Bot from "../classes/Bot"

let config : ResultEmbed = {
    name: "failedPost",
    async exec(interaction: CommandInteraction, bot: Bot) {
        let embed = new EmbedBuilder()
        .setTitle("Fail")
        .setDescription('There was an error! Try again please!')
        .setColor('Red')

        await interaction.editReply({
            embeds: [embed]
        })
    }
} 

module.exports = config