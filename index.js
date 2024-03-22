const { Client, Events, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, Partials } = require('discord.js');
const mongoose = require("mongoose");
require('dotenv').config();
const { Client: YayClient } = require("./yay.js");
const wait = require('node:timers/promises').setTimeout;
const api = new YayClient();

let emailRotationIndex = 0;
const emailRotation = [
    "hosemendoxe@gmail.com",
    "netawakuryusei@gmail.com",
    "ryusei.sagiyama@gmail.com",
    "josemendoxe@gmail.com"
];


mongoose.connect("mongodb+srv://Hinata-Code:Airmax313@cluster0.jspkofo.mongodb.net/Chat?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("データベースとの接続に成功しました。"))
    .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
    content: String,
    imageURL: String,
    author: String,
    isAnonymous: Boolean,
    uniqueID: String // ユーザーの固有IDを保存するフィールドを追加
});

const Post = mongoose.model('Post', postSchema);

let buttonMessage = null;
async function sendButton(SendOK) {
    const channelId = "1219789774630686723";
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
        buttonMessage = interaction;
    } else if (buttonMessage) {
        await buttonMessage.delete();
        buttonMessage = null;
    }
}
const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
    partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.Channel
    ]
});

// ユーザーの固有IDを生成する関数
function generateUniqueID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';
    for (let i = 0; i < 12; i++) {
        uniqueID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueID;
}


client.once(Events.ClientReady, async () => {
    sendButton(true);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.customId === "anonymous" || interaction.customId === "notanonymous") {
        const modal = new ModalBuilder()
            .setCustomId(interaction.customId + 'Post')
            .setTitle('書き込み');

        const postInput = new TextInputBuilder()
            .setCustomId('postInput')
            .setLabel("投稿内容:")
            .setMaxLength(1000)
            .setPlaceholder("例: こんにちは！今日はいい天気ですね")
            .setStyle(TextInputStyle.Paragraph);

        const imageURLInput = new TextInputBuilder()
            .setCustomId('imageURLInput')
            .setLabel("画像URL:")
            .setPlaceholder("例: https://~.png")
            .setMaxLength(100)
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(postInput);
        const secondActionRow = new ActionRowBuilder().addComponents(imageURLInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }

    if (interaction.customId === "report") {
        const modal = new ModalBuilder()
            .setCustomId("sendreport")
            .setTitle('通報');

        const reportInput = new TextInputBuilder()
            .setCustomId('reportInput')
            .setLabel("通報内容")
            .setMaxLength(1000)
            .setPlaceholder("例: 〇〇番の投稿が卑猥です！消してください。")
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(reportInput);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    }

    if (interaction.customId === "rule") {
        const ruleEmbed = new EmbedBuilder()
            .setTitle('利用規約')
            .setDescription(`
                **利用規約**

                **1. 掲示板へのご参加ありがとうございます。**

                1.1 当掲示板は完全な匿名性を提供します。開示請求は5万円から受け付けますが、それ以外の理由による開示請求は一切行いません。

                1.2 ユーザーのプライバシーを尊重し、適切な管理を行います。

                **2. 利用に際しての禁止事項**

                2.1 誹謗中傷、ヌード、過激な画像などの投稿は固く禁止します。

                2.2 公共の秩序や法律に違反するような行為、または他のユーザーに迷惑をかける行為も禁止されています。

                **3. 免責事項**

                3.1 掲示板の利用は全てユーザーの自己責任で行ってください。当掲示板は投稿内容について一切の責任を負いません。

                3.2 管理者の裁量により、適切ではないと判断された投稿は削除される場合があります。

                **4. その他**

                4.1 利用規約は予告なく変更されることがあります。最新の利用規約は常に掲示板上でご確認ください。

                4.2 ご不明な点やご質問がございましたら、お気軽に管理者までお問い合わせください。

                以上が本掲示板の利用規約となります。利用前に必ずご一読ください。
            `)
            .setTimestamp()
            .setColor(0x2b2d31)
        interaction.reply({embeds: [ruleEmbed], ephemeral: true})
    }

    const blacklistedWords = require('./blacklist.json');

    if (interaction.isModalSubmit()) {
        if (interaction.customId === "anonymousPost" || interaction.customId === "notanonymousPost") {
            const post = interaction.fields.getTextInputValue('postInput');
            let imageURL = interaction.fields.getTextInputValue('imageURLInput');
            const isAnonymous = interaction.customId === "anonymousPost";
            const author = isAnonymous ? "匿名" : interaction.user.username;
    
            try {
                let user = await Post.findOne({ author: interaction.user.id });
                if (!user) {
                    const uniqueID = generateUniqueID();
                    user = new Post({
                        author: interaction.user.id,
                        uniqueID: uniqueID
                    });
                    await user.save();
                }
    
                // Replace blacklisted words with "*"
                let censoredPost = post ? post.replace(/\./g, "\"") : ""; // Replace "." with ""
                blacklistedWords.forEach(word => {
                    const regex = new RegExp(word, "gi");
                    censoredPost = censoredPost.replace(regex, "*".repeat(word.length));
                });
    
                const newPost = new Post({
                    content: censoredPost,
                    imageURL: imageURL,
                    author: interaction.user.username,
                    isAnonymous: isAnonymous,
                    uniqueID: user.uniqueID
                });
    
                await newPost.save();
    
                const postCount = await Post.countDocuments();
                
                const postEmbed = new EmbedBuilder()
                    .setDescription(censoredPost) // Use the censored version
                    .setTimestamp()
                    .setColor(0x2b2d31);
    
                if (imageURL && imageURL.startsWith('https')) {
                    postEmbed.setImage(imageURL);
                }
                
                // Rotate through email addresses for posting
                const email = emailRotation[emailRotationIndex];
                emailRotationIndex = (emailRotationIndex + 1) % emailRotation.length;
    
                // Login with the rotated email address
                await api.login({ email: email, password: process.env.YAY_PASSWORD });
    
                if (!isAnonymous) {
                    postEmbed.setAuthor({ name: `${postCount + 149}:${author}`, iconURL: interaction.user.displayAvatarURL()  });
                    await api.createPost({text: `${postCount + 149}:${author}\n${censoredPost}`, groupId: "289158"});
                } else {
                    postEmbed.setAuthor({ name: `${postCount + 149}:${author} (${user.uniqueID})`, iconURL: "https://cdn.discordapp.com/attachments/1218519041023414332/1219822391513976994/Etl1X6ZUUAACFGr.jpg?ex=660cb321&is=65fa3e21&hm=b47b869819c0c000208404c04b11a303202140b9c6d365757f6e7bc3a68dce75&" });
                    await api.createPost({text: `${postCount + 149}: 匿名${user.uniqueID}\n${censoredPost}`, groupId: "289158"});
                }
    
                sendButton(false);
                await client.channels.cache.get("1219789774630686723").send({ embeds: [postEmbed] });
    
                sendButton(true);
                await interaction.deferUpdate();
                await wait(4_000)
            } catch (error) {
                console.error(error);
            }
        }

        if (interaction.customId === "sendreport") {
            const report = interaction.fields.getTextInputValue('reportInput');

            const dmChannel = await client.users.cache.get('1154344959646908449');

            dmChannel.send(`新しいレポートが届きました\n\n${report}\n${interaction.user.username}`);
            interaction.deferUpdate();
        }
    }
});

client.login(process.env.BOT_TOKEN);
