import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction, TextChannel } from "discord.js"
import Bot from "../classes/Bot"
import db, { addJob, getJobs } from "../firebase";

function generateRandomId(length : number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }
  

let config : Handler = {
    name: "jobPoster",
    async exec(interaction : ModalSubmitInteraction, bot: Bot) {
        let channel = await bot.channels.fetch(`${process.env.JOB_CHANNEL}`)

        let jobId: string = generateRandomId(20)

        let jobEmbed = new EmbedBuilder()
        .setTitle('New Job Posted!')
        .setDescription('Press the button below to apply!')
        .setColor('Blurple')
        .addFields([{
            name: "JOB ID:",
            value: jobId,
            inline: true
        }, {
            name: "Employer:",
            value: `${interaction.user}`,
            inline: true
        }, {
            name: "Job name:",
            value: `${interaction.fields.getField('name').value}`,
            inline: true
        }, {
            name: "Job description:",
            value: `${interaction.fields.getField('description').value}`,
            inline: true
        }, {
            name: "Job reward:",
            value: `${interaction.fields.getField('reward').value}`,
            inline: true
        }])

        let jobRow = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`apply_${jobId}`)
            .setLabel('Apply')
            .setStyle(ButtonStyle.Secondary)
        )

        await addJob(db, {
            guildId: interaction.guild?.id,
            userId: interaction.user.id,
            jobId,
            title: interaction.fields.getField('name').value,
            description: interaction.fields.getField('description').value,
            reward: interaction.fields.getField('reward').value
        })

        await (channel as TextChannel).send({
            embeds: [jobEmbed],
            components: [jobRow]
        })

        bot.embeds.get('successPost')?.exec(interaction, bot)
    }
}

module.exports = config