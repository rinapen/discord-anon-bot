const { Client, Events, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, Partials, ChannelType, PermissionsBitField } = require('discord.js');
require('dotenv').config();
// 毎日0時にユニークIDを更新
const schedule = require('node-schedule');
const Post = require("./models/Post");
const Thread= require("./models/Thread");
const ThreadPost= require("./models/ThreadPost");
const GlobalPostCount = require("./models/GlobalPostCount");
const Unique = require("./models/UniqueID");

const { generateUniqueID } = require("./utils/utils");

const MAIN_SERVER_ID = process.env.MAIN_SERVER_ID;

const MAIN_TIMELINE_CHANNEL = process.env.MAIN_TIMELINE_CHANNEL;

const MAIN_THREAD_PARENT = process.env.MAIN_THREAD_PARENT;

// 定数定義
const EMBED_COLOR = 0x2b2d31;
const ANONYMOUS_THUMBNAIL = "https://media.discordapp.net/attachments/1220269370580795482/1250382302073327738/OIG2.hBuT.jpg?ex=666abcc3&is=66696b43&hm=91c2d82b0b13e6ec5f6e9f08dfa861f904ed80d158d4ef54d2233e84e6cf2438&=&format=webp&width=595&height=595";
const REACTION_EMOJIS = ["❤", "😂", "🥺"];
const OWNER_EMOJI = "<:owner:1220362869439467591>";
const ADMIN_EMOJI = "<:Admin:1249110303593992202>";
const CHANNEL_PREFIXES = {
    TIMELINE_ANONYMOUS: '匿名-',
    TIMELINE_NON_ANONYMOUS: '非匿名-',
    THREAD_ANONYMOUS: 't-匿名',
    THREAD_NON_ANONYMOUS: 't-非匿名'
};

const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
    restTimeOffset: 100
});

const buttonMessageMap = new Map();
const blacklistedWords = require("./blacklist.json");
// 正規表現を事前コンパイル（パフォーマンス向上）
const blacklistRegexes = blacklistedWords.map(word => ({
    word: word,
    regex: new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi")
}));

const anonymousButton = new ButtonBuilder()
    .setCustomId("post")
    .setLabel("投稿")
    .setStyle(ButtonStyle.Primary)
    .setEmoji({ id: "1219813381570170921" });

const reportButton = new ButtonBuilder()
    .setCustomId("report")
    .setLabel("通報")
    .setStyle(ButtonStyle.Danger)
    .setEmoji({ id: "1219862630555193425" });

const createThreadButton = new ButtonBuilder()
    .setCustomId("threadButton")
    .setLabel("スレッド")
    .setStyle(ButtonStyle.Success)
    .setEmoji({ id: "1220356448903757846" });

const deleteButton = new ButtonBuilder()
    .setCustomId("delete")
    .setLabel("スレ削除")
    .setStyle(ButtonStyle.Danger)
    .setEmoji({ id: "1220714183042007083" });



async function sendButton(sendOK) {
    try {
        const channel = client.channels.cache.get(MAIN_TIMELINE_CHANNEL);
        if (!channel) {
            console.log(`指定されたIDのチャンネルが見つかりません: ${MAIN_TIMELINE_CHANNEL}`);
            return;
        }

        if (sendOK) {
            const row = new ActionRowBuilder()
                .addComponents(anonymousButton, createThreadButton, deleteButton, reportButton);

            const interaction = await channel.send({ components: [row] });

            buttonMessageMap.set(MAIN_SERVER_ID, interaction);
        } else {
            const buttonMessage = buttonMessageMap.get(MAIN_SERVER_ID);
            if (buttonMessage) {
                await buttonMessage.delete();
                buttonMessageMap.delete(MAIN_SERVER_ID);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function sendButtonToThread(sendOK, threadId) {
    try {
        const thread = await Thread.findOne({
            'channelIds.main': threadId
        });

        if (thread) {
            const mainChannelId = thread.channelIds.main;
            const mainChannel = client.channels.cache.get(mainChannelId);

            if (mainChannel) {
                if (sendOK) {
                    const row = new ActionRowBuilder()
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



async function updatePostURLs(isThread, message1, postCount, userID, authorName, imageURL, primaryServerId, uniqueID, content, channelId) {
    const messageURL = `https://discord.com/channels/${message1.guild.id}/${message1.channel.id}/${message1.id}`;
    
    if (isThread) {
        let thread = await ThreadPost.findOne({ postCount: postCount });
        if (!thread) {
            thread = new ThreadPost({
                channelId: channelId,
                postCount: postCount,
                uniqueID: uniqueID,
                author: userID,
                authorName: authorName,
                content: content,
                url: new Map(),
                imageURL: imageURL
            });
        }
        if (!thread.url) {
            thread.url = new Map();
        }
        thread.url.set(primaryServerId, messageURL);
        await thread.save();
    } else {
        let post = await Post.findOne({ postCount: postCount });
        if (!post) {
            post = new Post({
                postCount: postCount,
                uniqueID: uniqueID,
                author: userID,
                authorName: authorName,
                content: content,
                url: new Map(),
                imageURL: imageURL
            });
        }
        if (!post.url) {
            post.url = new Map();
        }
        post.url.set(primaryServerId, messageURL);
        await post.save();
    }
}

const getUniqueID = async (userId) => {
    try {
        if (!userId) {
            throw new Error('userId is required');
        }

        let uniqueIDDoc = await Unique.findOne({ userId });
        
        if (!uniqueIDDoc) {
            const newUniqueID = await generateUniqueID();
            uniqueIDDoc = new Unique({ userId: userId, uniqueID: newUniqueID });
            await uniqueIDDoc.save();
        }
        
        return uniqueIDDoc.uniqueID;
    } catch (err) {
        console.error('Error in getUniqueID:', err);
        throw err;
    }
};

// Function to update unique IDs for all users (一括更新でパフォーマンス向上)
const updateUniqueIDs = async () => {
    try {
        const users = await Unique.find({});
        
        const bulkOps = await Promise.all(users.map(async (user) => ({
            updateOne: {
                filter: { _id: user._id },
                update: {
                    $set: {
                        uniqueID: await generateUniqueID(),
                        updatedAt: new Date()
                    }
                }
            }
        })));
        
        if (bulkOps.length > 0) {
            await Unique.bulkWrite(bulkOps);
        }
        
        console.log('Unique IDs updated.');
    } catch (err) {
        console.error('Error in updateUniqueIDs:', err);
    }
};

// Schedule the updateUniqueIDs function to run daily at midnight
schedule.scheduleJob('0 0 * * *', async () => {
    console.log('Updating unique IDs...');
    await updateUniqueIDs();
});

client.on(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on(Events.MessageCreate, async (message) => {
    try {
        // ボットのメッセージを無視する
        if (message.author.bot) return;

        // チャンネル名を取得し、匿名・非匿名およびスレッドかどうかを判定する
        const channelName = message.channel.name;
        const isTimelineAnonymous = channelName.startsWith(CHANNEL_PREFIXES.TIMELINE_ANONYMOUS);
        const isTimelineNonAnonymous = channelName.startsWith(CHANNEL_PREFIXES.TIMELINE_NON_ANONYMOUS);
        const isThreadAnonymous = channelName.startsWith(CHANNEL_PREFIXES.THREAD_ANONYMOUS);
        const isThreadNonAnonymous = channelName.startsWith(CHANNEL_PREFIXES.THREAD_NON_ANONYMOUS);

        // 匿名・非匿名のタイムラインまたはスレッドでないチャンネルの場合は終了
        if (!isTimelineAnonymous && !isTimelineNonAnonymous && !isThreadAnonymous && !isThreadNonAnonymous) return;

        // 共通処理
        const userID = message.author.id;
        let originalContent = message.content;
        let attachedImageURLs = [];
        let attachedFiles = [];

        // 引用投稿の処理
        const quoteMatch = originalContent.match(/>>\d+/);
        if (quoteMatch) {
            const quotedPostNumber = quoteMatch[0].replace('>>', '');
            let referencedPost;
            if (isTimelineAnonymous || isTimelineNonAnonymous) {
                referencedPost = await Post.findOne({ postCount: quotedPostNumber });
            } else if ( isThreadAnonymous || isThreadNonAnonymous) {
                referencedPost = await ThreadPost.findOne({ postCount: quotedPostNumber });
            }
            
            if (referencedPost) {
                const primaryServerId = message.guildId;
                const primaryServerPostLink = referencedPost.url.get(primaryServerId);

                const primaryQuotedLink = `[>>${quotedPostNumber}](${primaryServerPostLink})`;

                originalContent = originalContent.replace(quoteMatch[0], '').trim();
                originalContent = `${primaryQuotedLink} ${originalContent}`;
            } else {
                originalContent = originalContent.replace(quoteMatch[0], '').trim();
                originalContent = `>>${quotedPostNumber} ${originalContent}`;
            }
        }

        const referenceMatch = originalContent.match(/^\^(\d+)\s+(.+)/);
        let first;
        if (referenceMatch) {
            const referencedPostNumber = referenceMatch[1];
            const referencedMessage = referenceMatch[2];
            first = referencedMessage;
            let referencedPost;
            if (isThreadAnonymous || isThreadNonAnonymous) {
                referencedPost = await Thread.findOne({ postCounter: referencedPostNumber });
            } else if (isTimelineAnonymous || isTimelineNonAnonymous) {
                referencedPost = await Post.findOne({ postCount: referencedPostNumber });
            }
            if (referencedPost && referencedPost.content && !referencedPost.isQuoted) { // contentが存在していて、まだ引用されていない場合のみ
                const referencedContent = referencedPost.content;
                const referencedAuthorName = referencedPost.authorName; // 投稿者名
                const borderedContent = `**${referencedMessage}**\n---------------------------\n[${referencedPostNumber}] ${referencedAuthorName}\n\n${referencedContent}\n---------------------------`; // ダッシュで囲む
                const quotedContent = `${borderedContent}`; // 引用元の作者名を追加
                originalContent = quotedContent; // 元のコンテンツに置換
            }
        }

        // コンテンツや添付ファイルから画像URLとファイルURLを抽出する
        const imageURLRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|mp4|mov))/i;
        const fileURLRegex = /(https?:\/\/.*\.(?:pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z))/i;
        let imageURLMatch;
        let fileURLMatch;
        while ((imageURLMatch = imageURLRegex.exec(originalContent)) !== null) {
            attachedImageURLs.push(imageURLMatch[0]);
            originalContent = originalContent.replace(imageURLMatch[0], '');
        }
        while ((fileURLMatch = fileURLRegex.exec(originalContent)) !== null) {
            attachedFiles.push(fileURLMatch[0]);
            originalContent = originalContent.replace(fileURLMatch[0], '');
        }

        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
                if (attachment.contentType.includes("image") || attachment.contentType.includes("video")) {
                    attachedImageURLs.push(attachment.url);
                } else {
                    attachedFiles.push(attachment.url);
                }
            });
        }

        // グローバル投稿カウントを増加
        let globalPostCount = await GlobalPostCount.findOne();
        if (!globalPostCount) {
            globalPostCount = new GlobalPostCount({ postCount: 0 });
        }
        globalPostCount.postCount++;
        await globalPostCount.save();

        // ブラックリストにある単語を検閲（事前コンパイル済みの正規表現を使用）
        let censoredOriginalContent = originalContent;
        blacklistRegexes.forEach(({ word, regex }) => {
            censoredOriginalContent = censoredOriginalContent.replace(regex, "*".repeat(word.length));
        });
        censoredOriginalContent = censoredOriginalContent.replace(/(https?:\/\/discord(?:\"|\.com)\/channels\/\d+\/\d+\/\d+)/gi, (match, p1) => {
            return `<${p1}>`;
        }).replace(/\.(?=https?:\/\/discord(?:\"|\.com)\/channels\/\d+\/\d+)/gi, (match) => {
            return match === '.' ? match : '';
        });

        // ユーザーの一意のIDを生成
        const uniqueID = await getUniqueID(userID);
        const thread1 = await Thread.findOne({ userId: userID})
        // 匿名性に基づいて作者名を決定
        let authorName;
        if (isTimelineAnonymous || isThreadAnonymous) {
            authorName = `匿名ちゃん`;
        } else {
            authorName = `${message.author.username}`;
            if (thread1 && message.channel.parentId === thread1.channelIds.main) {
                authorName = `${OWNER_EMOJI} ${authorName}`;
            }
            if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                authorName = `${ADMIN_EMOJI} ${authorName}`;
            }
        }

        // 投稿の送信と記録
        const primaryServerId = message.guild.id;

        let mainTimeline;
        let postCount;
        let threadData = null;
        
        if (isTimelineAnonymous || isTimelineNonAnonymous) {
            mainTimeline = client.channels.cache.get(MAIN_TIMELINE_CHANNEL);
            postCount = globalPostCount.postCount;
        } else if (isThreadAnonymous || isThreadNonAnonymous) {
            const mainTimelineChannelId = message.channel.parentId;
            mainTimeline = client.channels.cache.get(mainTimelineChannelId);
            
            threadData = await Thread.findOne({ 'channelIds.main': mainTimelineChannelId });
            if (threadData) {
                postCount = threadData.postCounter + 1;
                threadData.postCounter = postCount;
                await threadData.save();
            } else {
                console.error('Thread not found for channel:', mainTimelineChannelId);
                return;
            }
        }

        let postContent = `\n\n\n${censoredOriginalContent || ''}`;

        if (!mainTimeline) {
            console.error('Main timeline channel not found');
            return;
        }

        let postEmbed = new EmbedBuilder()
            .setTimestamp()
            .setColor(EMBED_COLOR)
            .setTitle(`[${postCount}] ${authorName}`)
            .setDescription(postContent);

        if (isThreadAnonymous || isTimelineAnonymous) {
            postEmbed.setThumbnail(ANONYMOUS_THUMBNAIL);
        } else {
            postEmbed.setThumbnail(message.author.displayAvatarURL());
        }

        const sentMessage = await mainTimeline.send({ embeds: [postEmbed] });
        for (const emoji of REACTION_EMOJIS) {
            await sentMessage.react(emoji);
        }
        
        const isThread = isThreadAnonymous || isThreadNonAnonymous;
        const contentToStore = first || censoredOriginalContent;
        await updatePostURLs(
            isThread, 
            sentMessage, 
            postCount, 
            userID, 
            authorName, 
            attachedImageURLs[0], 
            message.guildId, 
            uniqueID, 
            contentToStore, 
            message.channel.parentId
        );

        // 添付ファイルを並列送信（パフォーマンス向上）
        const allAttachments = [...attachedImageURLs, ...attachedFiles];
        await Promise.all(allAttachments.map(url => mainTimeline.send(url)));

        // ボタンの更新
        if (isTimelineAnonymous || isTimelineNonAnonymous) {
            await sendButton(true);
        } else if (isThreadAnonymous || isThreadNonAnonymous) {
            await sendButtonToThread(true, message.channel.parentId);
        }
        // 投稿をログチャンネルに記録
        const logChannel = client.channels.cache.get(process.env.LOGCHANNEL);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('投稿ログ')
                .addFields(
                    { name: '匿名', value: isTimelineAnonymous || isThreadAnonymous ? 'Yes' : 'No', inline: true },
                    { name: 'ユーザーネーム', value: message.author.username, inline: true },
                    { name: 'ユーザーID', value: message.author.id, inline: true },
                    { name: '投稿内容', value: message.content || 'なし' },
                    { name: 'タイムスタンプ', value: new Date().toLocaleString() }
                )
                .setTimestamp();
            await logChannel.send({ embeds: [logEmbed] });
        }

    } catch (error) {
        console.error('Error processing message:', error);
    }
});
client.on(Events.InteractionCreate, async (interaction) => {
    try {
        const userId = interaction.user.id;
        if (interaction.isButton()) {
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
            if (interaction.customId === "post") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    
                    const userId = interaction.user.id;
                    
                    const createThread = async (isAnonymous) => {
                        let threadName;
                        if (interaction.channelId === MAIN_TIMELINE_CHANNEL) {
                            threadName = isAnonymous ? `匿名-${userId}` : `非匿名-${userId}`;
                        } else if (interaction.channel.name.includes('t-')) {
                            threadName = isAnonymous ? `匿名-${userId}` : `非匿名-${userId}`;
                        } else {
                            threadName = isAnonymous ? `t-匿名-${userId}` : `t-非匿名-${userId}`;
                        }
                    
                        const existingThread = interaction.channel.threads.cache.find(thread =>
                            thread.name === threadName && !thread.archived
                        );
                    
                        if (existingThread) {
                            await interaction.editReply({ content: `すでに${isAnonymous ? '匿名' : '非匿名'}のスレッドが存在します。` });
                            return false;
                        }
                    
                        const thread = await interaction.channel.threads.create({
                            name: threadName,
                            autoArchiveDuration: 1440,
                            type: ChannelType.PrivateThread,
                            reason: 'User requested thread'
                        });
                    
                        await thread.setRateLimitPerUser(5);
                        await thread.members.add(interaction.user.id);
                    
                        const threadMessage = new EmbedBuilder()
                            .setDescription(`**${isAnonymous ? '匿名' : interaction.user.username}** さんがこのスレッドを作成しました。ここにメッセージを入力してください。`)
                            .setColor(EMBED_COLOR)
                            .setTimestamp();

                        await thread.send({ embeds: [threadMessage] });

                    
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = thread.createMessageCollector({ filter, idle: 300000 });
                    
                        collector.on('end', collected => {
                            if (!thread.archived) {
                                thread.setArchived(true);
                            }
                        });
                    
                        return true;
                    };
                    
                    const anonymousThreadCreated = await createThread(true, interaction);
            
                    // 非匿名スレッドを作成
                    const nonAnonymousThreadCreated = await createThread(false, interaction);
            
                    if (anonymousThreadCreated && nonAnonymousThreadCreated) {
                        await interaction.editReply({ content: '匿名および非匿名のスレッドが作成されました。' });
                    } else if (!anonymousThreadCreated && !nonAnonymousThreadCreated) {
                        await interaction.editReply({ content: 'すでに匿名および非匿名のスレッドが存在します。' });
                    } else if (!anonymousThreadCreated) {
                        await interaction.editReply({ content: '匿名スレッドは既に存在しますが、非匿名スレッドが作成されました。' });
                    } else {
                        await interaction.editReply({ content: '非匿名スレッドは既に存在しますが、匿名スレッドが作成されました。' });
                    }
                    
                } catch (error) {
                    console.error('Error handling button interaction:', error);
                    if (!interaction.deferred && !interaction.replied) {
                        await interaction.followUp({ content: 'スレッドの作成中にエラーが発生しました。', ephemeral: true });
                    }
                }
            }
            if (interaction.customId === "threadButton") {
                const existingThread = await Thread.findOne({ userId: userId });
                if (existingThread) {
                    await interaction.reply({ content: '既にスレッドを作成しています。', ephemeral: true });
                    return;
                }
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
                    await interaction.reply({ content: 'スレッドを削除しています。', ephemeral: true });
                    const threads = await Thread.find({ userId: userId });
                    if (threads.length > 0) {
                        for (const thread of threads) {
                            const channelId = thread.channelIds.main;
                            const channel = client.channels.cache.get(channelId);
                            if (channel) {
                                // Delete derived threads first
                                try {
                                    const derivedThreads = await channel.threads.fetchActive();
                                    for (const [, derivedThread] of derivedThreads.threads) {
                                        await derivedThread.delete();
                                    }
                                } catch (error) {
                                    console.error(`Error fetching or deleting derived threads for channel ${channelId}:`, error);
                                }
        
                                try {
                                    await channel.delete();
                                } catch (error) {
                                    if (error.code === 10003) {
                                        console.warn(`Channel ${channelId} not found (possibly already deleted).`);
                                    } else {
                                        console.error(`Error deleting channel ${channelId}:`, error);
                                    }
                                }
                            } else {
                                console.warn(`Channel ${channelId} not found in cache.`);
                            }
                        }
                        await Thread.deleteMany({ userId: userId });
                        await interaction.editReply({ content: 'スレッドを削除しました。', ephemeral: true });
                    } else {
                        await interaction.editReply({ content: 'スレッドがありません。', ephemeral: true });
                    }
                } catch (error) {
                    console.error('スレッドの削除中にエラーが発生しました:', error);
                    await interaction.editReply({ content: 'スレッドの削除中にエラーが発生しました。', ephemeral: true });
                }
            }
            
            
        }
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'sendreport') {
                await interaction.deferReply({ ephemeral: true });
                const reportContent = interaction.fields.getTextInputValue("reportInput");
        
                const reportChannel = client.channels.cache.get(process.env.REPORT_CHANNEL_ID);
        
                if (reportChannel) {
                    const reportEmbed = new EmbedBuilder()
                        .setTitle('新しい通報がありました！')
                        .addFields(
                            { name: '通報内容', value: reportContent },
                            { name: '通報者', value: interaction.user.tag },
                        )
                        .setTimestamp();
            
                    await reportChannel.send({ embeds: [reportEmbed] });
                    await interaction.editReply({ content: '通報が送信されました。ありがとうございます。' });
                } else {
                    await interaction.editReply({ content: '通報チャンネルが見つかりません。' });
                }
            }
            if (interaction.customId === "threadModal") {
                await interaction.deferReply({ ephemeral: true });
                const threadTitle = interaction.fields.getTextInputValue("threadTitle");
                const threadRule= interaction.fields.getTextInputValue("ruleInput");
                const mainParentCategoryId = MAIN_THREAD_PARENT;

                const guild = client.guilds.cache.get(MAIN_SERVER_ID);
                if (!guild) {
                    await interaction.editReply({ content: "サーバーが見つかりません。", ephemeral: true });
                    return;
                }

                const category = guild.channels.cache.get(mainParentCategoryId);
                if (!category) {
                    await interaction.editReply({ content: "カテゴリが見つかりません。", ephemeral: true });
                    return;
                }

                const permissions = [
                    {
                        id: guild.roles.everyone,
                        deny: [ 
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.CreatePublicThreads,
                            PermissionsBitField.Flags.CreatePrivateThreads
                        ],
                        allow: [
                            PermissionsBitField.Flags.SendMessagesInThreads
                        ]
                    }
                ];

                const newChannel = await guild.channels.create({
                    name: threadTitle,
                    type: ChannelType.GuildText,
                    parent: category,
                    permissionOverwrites: permissions
                });
                
                const ruleEmbed = new EmbedBuilder()
                    .setTitle(threadRule)
                    .setColor(EMBED_COLOR);

                await newChannel.send({ embeds: [ruleEmbed] });

                const newThread = new Thread({
                    userId: userId,
                    channelIds: {
                        main: newChannel.id
                    },
                    threadName: threadTitle,
                    postCounter: 0,
                });
                await newThread.save();

                await sendButtonToThread(true, newChannel.id);

                await interaction.editReply({ content: `スレッド '${threadTitle}' が作成されました！`, ephemeral: true });
            }
        }
    } catch (err) {
        console.log(err)
    }
});

client.login(process.env.BOT_TOKEN);
