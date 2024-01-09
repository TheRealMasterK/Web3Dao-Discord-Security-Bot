import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction, TextChannel } from "discord.js"
import Bot from "../classes/Bot"
import db, { addApplier, getJob } from "../firebase"
  

let config : Handler = {
    name: "apply",
    async exec(interaction : ModalSubmitInteraction, bot: Bot) {
        let id = interaction.customId.split('_')[1]

        let appliedChannel = await bot.channels.fetch(`${process.env.APPLIED_CHANNEL}`)

        let appliedEmbed = new EmbedBuilder()
        .setTitle('New application for a job!')
        .setColor('Blurple')
        .setDescription(`JOB ID: ${id}`)
        .addFields([{
            name: "User: ",
            value: `${interaction.user}`,
            inline: true
        }, {
            name: "Username",
            value: `${interaction.user.username}`,
            inline: true
        }, {
            name: "Joined at: ",
            value: `${interaction.user.createdAt}`,
            inline: true
        }])
        .setThumbnail(interaction.user.avatarURL())

        let row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setCustomId(`delete-app_${id}_${interaction.user.id}`)
            .setLabel('Delete application')
            .setStyle(ButtonStyle.Secondary)
        )

        let job = await getJob(db, id)
        
        if(interaction.user.id == job?.userId) return bot.embeds.get('failedApplied')?.exec(interaction, bot)

        await addApplier(db, {
            guildId: interaction.guild?.id,
            userId: interaction.user.id,
            jobId: id,
            employer: job?.userId
        })

        await (appliedChannel as TextChannel).send({
            embeds: [appliedEmbed],
            components: [row]
        })

        bot.embeds.get('successApplied')?.exec(interaction, bot)
    }
}

module.exports = config