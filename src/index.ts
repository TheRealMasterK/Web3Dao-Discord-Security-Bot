import { Client, Embed, GatewayIntentBits, OAuth2Scopes, Partials } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
import Bot from './classes/Bot'
import fs from "fs";
import path from "path";
import Command from "./classes/Command";

const bot = new Bot({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites
    ],
    partials: [Partials.Channel]
})


const commandFile = fs.readdirSync(path.join(__dirname, 'commands')).filter((file: string) => file.endsWith('.js'));
const eventFile = fs.readdirSync(path.join(__dirname, 'events')).filter((file: string) => file.endsWith('.js'));
const modulesFile = fs.readdirSync(path.join(__dirname, 'modules')).filter((file: string) => file.endsWith('.js'));
const embedsFile = fs.readdirSync(path.join(__dirname, 'embeds')).filter((file: string) => file.endsWith('.js'));

for (const file of eventFile) {
    const module : BotEvent = require(path.join(__dirname, `/events/${file}`));

    const execute = (...args: any) => module.exec(...args, bot);

    if(module.once) {
        bot.once(module.name, execute)
    } else {
        bot.on(module.name, execute)
    }

    console.log(`[ MODULES ] ${module.name} event loaded`);
}

for (const file of commandFile) {
    const module : Command = require(path.join(__dirname, `/commands/${file}`));
    bot.commands.set(module.name, module);
    console.log(`[ MODULES ] ${module.name} command loaded`);
}

for (const file of modulesFile) {
    const module : Handler = require(path.join(__dirname, `/modules/${file}`));
    bot.handlers.set(module.name, module);
    console.log(`[ MODULES ] ${module.name} module loaded`);
}

for (const file of embedsFile) {
    const module : ResultEmbed = require(path.join(__dirname, `/embeds/${file}`));
    bot.embeds.set(module.name, module);
    console.log(`[ MODULES ] ${module.name} embed loaded`);
}

async function registerSlash() {
    for (const file of commandFile) {
        const module : Command = await import(`./commands/${file}`);
        if (module.toRegister == true) {
            if (module.options !== undefined) {
                bot.application?.commands.create({
                    name: module.name,
                    description: module.description,
                    options: module.options
                });
            } else {
                bot.application?.commands.create({
                    name: module.name,
                    description: module.description
                });
            }
        }
    }
}

bot.once('ready', async () => {
    await registerSlash()

    let link = bot.generateInvite({
        permissions: ["Administrator"],
        scopes: [OAuth2Scopes.Bot]
    })

    console.log(`[ BOT ] Bot is online!`)
    console.log(`[ BOT ] Invite Link is: ${link}`)
})

bot.login(process.env.TOKEN)