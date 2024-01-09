import Bot from "../classes/Bot"
import { Interaction } from "discord.js"

let config : BotEvent = {
    name: "interactionCreate",
    once: false,
    async exec(interaction : Interaction, bot: Bot) {
        if(interaction.isModalSubmit()) {
            await interaction.deferReply({ephemeral: true})
            let handler = bot.handlers.get(interaction.customId)

            if(!handler) return

            handler.exec(interaction, bot)
        }

        if(interaction.isButton()) {
            await interaction.deferReply({ephemeral: true})

            let handler = bot.handlers.get(interaction.customId.split('_')[0])

            if(!handler) return

            handler.exec(interaction, bot)
        }

        if(interaction.isSelectMenu()) {
            await interaction.deferReply({ephemeral: true})
            let handler = bot.handlers.get(interaction.customId)

            if(!handler) return

            handler.exec(interaction, bot)
        }
 
        if(interaction.isCommand()) {            
            let cmd = bot.commands.get(interaction.commandName)
            if(!cmd) return

            if(cmd.defferReply) await interaction.deferReply({ephemeral: true})
            
            let args = []
            let options = interaction.options.data;

            for (var i = 0; i < options.length; i++) {
                args.push(options[i].value);
            }

            cmd.exec(interaction, bot, args)
        }
    }
}

module.exports = config