import { Client, GatewayIntentBits, Partials } from "discord.js";

export const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger) as number[],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    restTimeOffset: 100
});