import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextChannel
} from "discord.js";
import { client } from "./BotClient";
import { config } from "../config";

export const buttonMessageMap = new Map<string, any>();

const anonymousButton = new ButtonBuilder()
    .setCustomId("post")
    .setLabel("投稿")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("📝");

const reportButton = new ButtonBuilder()
    .setCustomId("report")
    .setLabel("通報")
    .setStyle(ButtonStyle.Danger)
    .setEmoji("🚨");

const createThreadButton = new ButtonBuilder()
    .setCustomId("threadButton")
    .setLabel("スレッド")
    .setStyle(ButtonStyle.Success)
    .setEmoji("🧵");

const deleteButton = new ButtonBuilder()
    .setCustomId("delete")
    .setLabel("スレ削除")
    .setStyle(ButtonStyle.Danger)
    .setEmoji("🗑️");

export async function sendButton(sendOK: boolean): Promise<void> {
    try {
        const channel = client.channels.cache.get(config.MAIN_TIMELINE_CHANNEL!) as TextChannel;
        if (!channel) {
            console.log(`指定されたIDのチャンネルが見つかりません: ${config.MAIN_TIMELINE_CHANNEL}`);
            return;
        }

        if (sendOK) {
            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(anonymousButton, createThreadButton, deleteButton, reportButton);

            const interaction = await channel.send({ components: [row] });
            buttonMessageMap.set(config.MAIN_SERVER_ID!, interaction);
        } else {
            const buttonMessage = buttonMessageMap.get(config.MAIN_SERVER_ID!);
            if (buttonMessage) {
                await buttonMessage.delete();
                buttonMessageMap.delete(config.MAIN_SERVER_ID!);
            }
        }
    } catch (err) {
        console.error("Error in sendButton:", err);
    }
}

export async function sendButtonToThread(sendOK: boolean, threadId: string): Promise<void> {
    try {
        const { Thread } = await import("../models/Thread");
        const thread = await Thread.findByChannelId(threadId);

        if (thread) {
            const mainChannelId = thread.channelIds.main;
            const mainChannel = client.channels.cache.get(mainChannelId) as TextChannel;

            if (mainChannel) {
                if (sendOK) {
                    const row = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(anonymousButton);

                    const interaction = await mainChannel.send({ components: [row] });
                    buttonMessageMap.set(mainChannelId, interaction);
                } else {
                    const buttonMessage = buttonMessageMap.get(mainChannelId);
                    if (buttonMessage) {
                        await buttonMessage.delete();
                        buttonMessageMap.delete(mainChannelId);
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error in sendButtonToThread:', err);
    }
}

