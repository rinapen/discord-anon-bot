const { Client, Events, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, Partials, ChannelType, PermissionsBitField, messageLink } = require('discord.js');

const buttonMessageMap = new Map();
const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
    partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.Channel
    ]
});

async function sendButton(SendOK, channelId) {
    const channel = client.channels.cache.get(channelId);
    if (!channel) {
        console.log(`指定されたIDのチャンネルが見つかりません: ${channelId}`);
        return;
    }

    if (SendOK === true) {
        const anonymousButton = new ButtonBuilder()
            .setCustomId("anonymous")
            .setLabel("匿名")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("1219813381570170921");

        const NotanonymousButton = new ButtonBuilder()
            .setCustomId("notanonymous")
            .setLabel("非匿名")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("1219813381570170921");

        const RuleButton = new ButtonBuilder()
            .setCustomId("rule")
            .setLabel("規約")
            .setStyle(ButtonStyle.Success)
            .setEmoji("1219861316269899896");

        const reportButton = new ButtonBuilder()
            .setCustomId("report")
            .setLabel("通報")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("1219862630555193425")

        const ImageURLButton = new ButtonBuilder()
            .setLabel("画像変換")
            .setURL("https://discordapp.com/users/1219880237878480926")
            .setStyle(ButtonStyle.Link)

        const row = new ActionRowBuilder()
            .addComponents(anonymousButton, NotanonymousButton, RuleButton, reportButton, ImageURLButton);

        const interaction = await channel.send({
            components: [row]
        });
        // チャンネルごとにボタンメッセージを保存
        buttonMessageMap.set(channelId, interaction);
    } else {
        // チャンネルごとのボタンメッセージを削除
        const buttonMessage = buttonMessageMap.get(channelId);
        if (buttonMessage) {
            await buttonMessage.delete();
            buttonMessageMap.delete(channelId);
        }
    }
}

function generateUniqueID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';
    for (let i = 0; i < 12; i++) {
        uniqueID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueID;
}

module.exports = {sendButton, generateUniqueID};