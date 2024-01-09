import Bot from "../classes/Bot"
import { Message } from "discord.js"
import Command from "../classes/Command"

let config : Command =  {
    name: "hello",
    toRegister: false,
    description : "template command",
    options: [],
    defferReply: true,
    async exec(message: Message, bot: Bot, args: []) {

    }
}

module.exports = config