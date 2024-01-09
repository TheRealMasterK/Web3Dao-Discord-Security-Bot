import { ApplicationCommandOptionData } from "discord.js"

type Command = {
    name: string,
    description: string,
    toRegister: boolean,
    options: Array<ApplicationCommandOptionData>,
    defferReply: boolean,
    exec: Function
}

export default Command