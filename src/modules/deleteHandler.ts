import { EmbedBuilder, SelectMenuInteraction } from "discord.js";
import Bot from "../classes/Bot";
import db, { addChat, deleteApplier } from "../firebase";

let config : Handler = {
    name: "delete-app",
    async exec(interaction : SelectMenuInteraction, bot: Bot) {
        let ids = interaction.customId.split('_')

        await deleteApplier(db, ids[2], ids[1])

        let embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('You successfuly deleted application.')

        await interaction.message.delete()

        await interaction.editReply({
            embeds: [embed]
        })
    }
}

module.exports = config