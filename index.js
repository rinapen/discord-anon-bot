const { Client, Events, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, Partials, ChannelType, PermissionsBitField, messageLink } = require('discord.js');
require('dotenv').config();

const Post = require("./models/Post");
const Thread = require("./models/Thread");
const { generateUniqueID } = require("./utils/utils")

const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
    partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.Channel
    ]
});

const buttonMessageMap = new Map();

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

client.on(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);
    const channelId = "1219789774630686723";
    sendButton(true, channelId)
    const threadChannelId = '1220353181414850620';

    const channel = client.channels.cache.get(threadChannelId);

    if (!channel) {
        console.error(`Channel with ID ${threadChannelId} not found.`);
        return;
    }

    try {
        const messages = await channel.messages.fetch();
        await Promise.all(messages.map(msg => msg.delete()));

        const threadEmbed = new EmbedBuilder()
            .setTitle("スレッド")
            .setDescription("スレッドを作成できます。\nスレッドは3日間アクセス\n投稿がない場合は管理者の判断で削除します。")
            .setColor(0x2b2d31)
            
        const threadButton = new ButtonBuilder()
            .setCustomId("threadOpen")
            .setLabel("スレ立")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("1220356448903757846");

        const deleteButton = new ButtonBuilder()
            .setCustomId("delete")
            .setLabel("スレッド削除")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("1220714183042007083");

        const row = new ActionRowBuilder()
            .addComponents(threadButton, deleteButton);

        await channel.send({components: [row], embeds: [threadEmbed]});
    } catch (error) {
        console.error('Error:', error);
    }
});

client.on(Events.MessageCreate, async (message) => {
    if (message.content.startsWith("!sendButton")) {
        const channelId = message.content.split(" ")[1];
        if (!channelId) {
            message.channel.send("チャンネルIDが指定されていません。");
            return;
        }
        await sendButton(true, channelId);
        message.channel.send(`ボタンを送信しました。`);
    }
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

    if (interaction.customId === "threadOpen") {
        const modal = new ModalBuilder()
            .setCustomId("threadModal")
            .setTitle('スレッドの作成');

        const titleInput = new TextInputBuilder()
            .setCustomId('threadTitle')
            .setLabel("タイトル: ")
            .setMaxLength(100)
            .setPlaceholder("例: 岸田総理っているか？")
            .setStyle(TextInputStyle.Short);

        const ruleInput = new TextInputBuilder()
            .setCustomId('ruleInput')
            .setLabel("本文: ")
            .setPlaceholder("例: 政治に私情は持ち出すな！てか岸田いらなくね？")
            .setMaxLength(100)
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
        const secondActionRow = new ActionRowBuilder().addComponents(ruleInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }
    if (interaction.customId === "delete") {
        try {
            const thread = await Thread.findOneAndDelete({ userId: interaction.user.id });
            if (!thread) {
                await interaction.reply({ content: 'スレッドが見つかりませんでした。', ephemeral: true });
                return;
            }

            const channel = client.channels.cache.get(thread.channelId);
            if (channel) {
                await channel.delete();
            }

            await interaction.reply({ content: 'スレッドと関連するチャンネルを削除しました。', ephemeral: true });
        } catch (error) {
            console.error('スレッドの削除中にエラーが発生しました:', error);
            await interaction.reply({ content: 'スレッドの削除中にエラーが発生しました。', ephemeral: true });
        }
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
                if (interaction.channel.id === "1219789774630686723") {
                    const newPost = new Post({
                        content: censoredPost,
                        imageURL: imageURL,
                        author: interaction.user.username,
                        isAnonymous: isAnonymous,
                        uniqueID: user.uniqueID
                    });
                    await newPost.save();
                }
                
                
    
                const postCount = await Post.countDocuments();
                const threadId = interaction.channel.id; 
                let threadCounter = await Thread.findOne({ threadId });

                if (threadCounter) {
                    threadCounter.count++;
                    await threadCounter.save();
                } else {
                    console.error("Thread counter not found for thread ID: " + threadId);

                    threadCounter = new Thread({ threadId, count: 1 });
                    await threadCounter.save();
                    console.log("New thread counter created for thread ID: " + threadId);
                }
                const postEmbed = new EmbedBuilder()
                    .setDescription(censoredPost) // Use the censored version
                    .setTimestamp()
                    .setColor(0x2b2d31);
    
                if (imageURL && imageURL.startsWith('https')) {
                    postEmbed.setImage(imageURL);
                }
                const channelId = interaction.channel.id;
                const thread = await Thread.findOne({ channelId });
                if (interaction.channel.id === "1219789774630686723") {
                    if (!isAnonymous) {
                        postEmbed.setAuthor({ name: `${postCount + 149}:${author}`, iconURL: interaction.user.displayAvatarURL()  });
                        // await api.createPost({text: `${postCount + 149}:${author}\n${censoredPost}`, groupId: "289158"});
                    } else {
                        postEmbed.setAuthor({ name: `${postCount + 149}:${author} (${user.uniqueID})`, iconURL: "https://cdn.discordapp.com/attachments/1218519041023414332/1219822391513976994/Etl1X6ZUUAACFGr.jpg?ex=660cb321&is=65fa3e21&hm=b47b869819c0c000208404c04b11a303202140b9c6d365757f6e7bc3a68dce75&" });
                        // await api.createPost({text: `${postCount + 149}: 匿名(${user.uniqueID})\n${censoredPost}`, groupId: "289158"});
                    }
                } else {
                    if (!isAnonymous) {
                        postEmbed.setTitle(`${threadCounter.count}:${author}`);
                        if (interaction.user.id === thread.userId) {
                            postEmbed.setTitle(`<:owner:1220362869439467591> ${threadCounter.count}: ${author}`);
                        }
                    } else {
                        postEmbed.setTitle(`${threadCounter.count}: 匿名(${user.uniqueID})`)
                        if (interaction.user.id === thread.userId) {
                            postEmbed.setTitle(`<:owner:1220362869439467591> ${threadCounter.count}: 匿名(${user.uniqueID})`);
                        }
                    }
                }
    
                sendButton(false, interaction.channel.id);
                await client.channels.cache.get(interaction.channel.id).send({ embeds: [postEmbed] });
    
                sendButton(true, interaction.channel.id);
                await interaction.deferUpdate();
            } catch (error) {
                console.error(error);
            }
        }
    
        if (interaction.customId === "threadModal") {
            const userId = interaction.member.user.id; // ユーザーIDを取得
            const threadTitle = interaction.fields.getTextInputValue('threadTitle');
            const rule = interaction.fields.getTextInputValue('ruleInput');
    
    
            // MongoDBにユーザーIDを検索して既にスレッドを作成しているか確認
            try {
                const existingThread = await Thread.findOne({ userId });
                if (existingThread) {
                    await interaction.reply({content: '既にスレッドを作成しています。', ephemeral: true});
                    return;
                }
    
                const permissions = [
                    {
                        id: interaction.guildId,
                        deny: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.CreatePublicThreads,
                            PermissionsBitField.Flags.CreatePrivateThreads
                        ]
                    }
                ];
    
                // チャンネルを作成してスレッド情報を表示
                const newChannel = await interaction.guild.channels.create({
                    name: threadTitle,
                    type: ChannelType.GuildText,
                    permissionOverwrites: permissions,
                    parent: "1220353121612464168"
                });
                const channelId = newChannel.id;
                const newThread = new Thread({ userId, channelId, threadTitle });
                await newThread.save();
    
                const ruleEmbed = new EmbedBuilder()
                    .setDescription(rule)
                    .setTimestamp()
                    .setColor(0x2b2d31);
                // ユーザーがスレッドを作成した場合、主を表示    
                ruleEmbed.setTitle(`<:owner:1220362869439467591> 匿名`);
                                
                await newChannel.send({ content:`# ${threadTitle}`, embeds: [ruleEmbed] });
                await sendButton(true, channelId);
                await interaction.deferUpdate();
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
