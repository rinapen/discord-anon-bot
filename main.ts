import { Events } from "discord.js";
import { client } from "./bot/client";
import { initialize } from "./bot/event";
import { config } from "./config";
import { handleMessage } from "./bot/messageHandler";

client.once(Events.ClientReady, initialize);
client.on(Events.MessageCreate, handleMessage)
client.login(config.BOT_TOKEN);