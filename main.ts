import { Events, Interaction } from "discord.js";
import { client } from "./bot/BotClient";
import { initialize } from "./bot/Event";
import { config } from "./config";
import { handleMessage } from "./bot/messageHandler";
import { handleInteraction } from "./bot/interactionHandler";

client.once(Events.ClientReady, initialize);
client.on(Events.MessageCreate, handleMessage);
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (interaction.isButton() || interaction.isModalSubmit()) {
        await handleInteraction(interaction);
    }
});

if (!config.BOT_TOKEN) {
    console.error("[×] BOT_TOKENが設定されていません。");
    process.exit(1);
}

client.login(config.BOT_TOKEN);