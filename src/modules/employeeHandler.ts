import { EmbedBuilder, SelectMenuInteraction } from "discord.js";
import Bot from "../classes/Bot";
import db, { addChat, getChat } from "../firebase";

let config : Handler = {
    name: "employee-select",
    async exec(interaction : SelectMenuInteraction, bot: Bot) {
        let ids = interaction.values[0].split('_')
        let companionChat = await getChat(db, ids[0])

        if(companionChat) {
            let embed = new EmbedBuilder()
            .setTitle('This user already in chat.')
            .setColor('Red')

            return await interaction.editReply({
                embeds: [embed]
            })
        }

        await addChat(db, {
            jobId: ids[1],
            userId: interaction.user.id,
            companionId: ids[0],
            initiate: interaction.user.id
        })

        await addChat(db, {
            jobId: ids[1],
            userId: ids[0],
            companionId: interaction.user.id,
            initiate: interaction.user.id
        })

        let embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('You started a chat with user.')

        await interaction.editReply({
            embeds: [embed]
        })
    }
}

module.exports = config