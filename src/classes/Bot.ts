import { Client, Collection } from "discord.js";
import Command from "./Command";

class Bot extends Client {
    public commands : Map<string, Command> = new Collection()
    public handlers : Map<string, Handler> = new Collection()
    public embeds : Map<string, ResultEmbed> = new Collection()
}

export default Bot