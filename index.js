const { Client, Events, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, Partials, ChannelType, PermissionFlagsBits, PermissionsBitField, AttachmentBuilder, Embed } = require('discord.js');
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
const SUB_SERVER_ID = process.env.SUB_SERVER_ID;

const MAIN_TIMELINE_CHANNEL = process.env.MAIN_TIMELINE_CHANNEL;
const SUB_TIMELINE_CHANNEL = process.env.SUB_TIMELINE_CHANNEL;

const MAIN_THREAD_PEARENT = process.env.MAIN_THREAD_PEARENT;
const SUB_THREAD_PEARENT = process.env.SUB_THREAD_PEARENT;

const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
    partials: [Partials.Message, Partials.Reaction, Partials.Channel],
    restTimeOffset: 100
});

const buttonMessageMap = new Map();
const blacklistedWords = require("./blacklist.json")

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

const serverInfo = {
    [SUB_SERVER_ID]: {
        inviteURL: "https://discord.gg/2UWzZdbRru",
        channelId: MAIN_TIMELINE_CHANNEL
    },
    [MAIN_SERVER_ID]: {
        inviteURL: "https://discord.gg/nhQagdVJgk",
        channelId: SUB_TIMELINE_CHANNEL
    }
};

const channelIdMap = {
    [SUB_SERVER_ID]: SUB_TIMELINE_CHANNEL,
    [MAIN_SERVER_ID]: MAIN_TIMELINE_CHANNEL
};

const channelId1Map = {
    [MAIN_TIMELINE_CHANNEL]: SUB_TIMELINE_CHANNEL,
    [SUB_TIMELINE_CHANNEL]: MAIN_TIMELINE_CHANNEL
};

const serverIdMap = {
    [SUB_SERVER_ID]: MAIN_SERVER_ID,
    [MAIN_SERVER_ID]: SUB_SERVER_ID
};

const sendEmbedToChannels = async (serverId, embed, respost, interaction) => {

    const correspondingChannelId = channelIdMap[serverId];
    const channel1Id = channelId1Map[correspondingChannelId];

    const channel = await client.channels.cache.get(correspondingChannelId);
    const channel1 = await client.channels.cache.get(channel1Id);

    const message = await channel.send({ embeds: [embed] });
    const emojis = ["♥️", "😂", "🥺"]
    for (const emoji of emojis) {
        await message.react(emoji);
    }
    if (respost) {
        embed.setDescription(respost);
    }
    const message1 = await channel1.send({ embeds: [embed] });
    for (const emoji of emojis) {
        await message1.react(emoji);
    }
    return [message, message1];
};

async function sendButton(sendOK, serverId) {
    try {
        const info = serverInfo[serverId];

        if (!info) {
            console.log(`このサーバー (${serverId}) では有効なURLが指定されていません。`);
            return;
        }

        const inviteURLButton = new ButtonBuilder()
            .setLabel("相互鯖")
            .setURL(info.inviteURL)
            .setStyle(ButtonStyle.Link);

        const channel = client.channels.cache.get(info.channelId);
        if (!channel) {
            console.log(`指定されたIDのチャンネルが見つかりません: ${info.channelId}`);
            return;
        }

        if (sendOK) {
            const row = new ActionRowBuilder()
                .addComponents(anonymousButton, createThreadButton, deleteButton, reportButton, inviteURLButton);

            const interaction = await channel.send({ components: [row] });

            buttonMessageMap.set(serverId, interaction);
        } else {
            const buttonMessage = buttonMessageMap.get(serverId);
            if (buttonMessage) {
                await buttonMessage.delete();
                buttonMessageMap.delete(serverId);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function sendButtonToThread(sendOK, threadId) {
    try {
        const thread = await Thread.findOne({
            $or: [
                { 'channelIds.main': threadId },
                { 'channelIds.sub': threadId }
            ]
        });

        if (thread) {
            // Get both channel IDs
            const mainChannelId = thread.channelIds.main;
            const subChannelId = thread.channelIds.sub;

            // Get both channels from the client's channel cache
            const mainChannel = client.channels.cache.get(mainChannelId);
            const subChannel = client.channels.cache.get(subChannelId);

            // Function to handle sending or deleting the button in a channel
            const handleChannel = async (channelId, channel) => {
                if (channel) {
                    if (sendOK) {
                        const row = new ActionRowBuilder()
                            .addComponents(anonymousButton);

                        const interaction = await channel.send({ components: [row] });
                        buttonMessageMap.set(channelId, interaction);
                    } else {
                        const buttonMessage = buttonMessageMap.get(channelId);
                        if (buttonMessage) {
                            await buttonMessage.delete();
                            buttonMessageMap.delete(channelId);
                        }
                    }
                }
            };

            // Handle both channels
            await handleChannel(mainChannelId, mainChannel);
            await handleChannel(subChannelId, subChannel);
        }
    } catch (err) {
        console.error('Error in sendButtonToThread:', err);
    }
}



async function updatePostURLs(isThread, message1, message2, postCount, userID, authorName, imageURL, primaryServerId, secondaryServerId, uniqueID, content, channelId) {
    if (isThread) {
        const updateThreadPostURL = async (message, serverId) => {
            let thread = await ThreadPost.findOne({ postCount: postCount });
            console.log("a")
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
            console.log("b")
            const messageURL = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
            if (!thread.url) {
                thread.url = new Map();
            }
            console.log(messageURL)
            thread.url.set(serverId, messageURL);
            await thread.save();
        };
        await updateThreadPostURL(message1, primaryServerId);
        await updateThreadPostURL(message2, secondaryServerId);
    } else {
        const updatePostURL = async (message, serverId) => {
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
            const messageURL = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
            if (!post.url) {
                post.url = new Map();
            }
            post.url.set(serverId, messageURL);
            await post.save();

        };
        await updatePostURL(message1, primaryServerId);
        await updatePostURL(message2, secondaryServerId);
    }
}

const createThreadChannel = async (isAnonymous, userId, serverId, channelId, threadName) => {
    // モデルに保存するデータを作成
    const threadData = new Thread({
        userId: userId,
        serverId: serverId,
        channelId: channelId,
        threadId: threadId,
        threadName: threadName,
    });

    // データベースに保存
    await threadData.save();
};
const getUniqueID = async (userId) => {
    try {
        if (!userId) {
            throw new Error('userId is required');
        }
        
        console.log("Received userId:", userId);

        let uniqueIDDoc = await Unique.findOne({ userId });
        
        if (!uniqueIDDoc) {
            console.log("AA")
            const newUniqueID = await generateUniqueID();
            console.log(newUniqueID)
            console.log(userId)
            uniqueIDDoc = new Unique({ userId:  userId, uniqueID:  newUniqueID });
            await uniqueIDDoc.save();
        }
        
        return uniqueIDDoc.uniqueID;
    } catch (err) {
        console.error('Error in getUniqueID:', err);
        throw err; // Re-throw the error for further handling if needed
    }
};

// Function to update unique IDs for all users
const updateUniqueIDs = async () => {
    try {
        const users = await Unique.find({});
        
        for (const user of users) {
            user.uniqueID = await generateUniqueID();
            user.updatedAt = new Date();
            await user.save();
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
        const isTimelineAnonymous = channelName.startsWith('匿名-');
        const isTimelineNonAnonymous = channelName.startsWith('非匿名-');
        const isThreadAnonymous = channelName.startsWith('t-匿名');
        const isThreadNonAnonymous = channelName.startsWith('t-非匿名');

        // 匿名・非匿名のタイムラインまたはスレッドでないチャンネルの場合は終了
        if (!isTimelineAnonymous && !isTimelineNonAnonymous && !isThreadAnonymous && !isThreadNonAnonymous) return;

        // 共通処理
        const userID = message.author.id;
        let originalContent = message.content;
        let secondaryContent;
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
                const secondaryServerId = serverIdMap[primaryServerId];
                const primaryServerPostLink = referencedPost.url.get(primaryServerId);
                const secondaryServerPostLink = referencedPost.url.get(secondaryServerId);

                const primaryQuotedLink = `[>>${quotedPostNumber}](${primaryServerPostLink})`;
                const secondaryQuotedLink = `[>>${quotedPostNumber}](${secondaryServerPostLink})`;

                originalContent = originalContent.replace(quoteMatch[0], '').trim();
                secondaryContent = `${secondaryQuotedLink} ${originalContent}`;
                originalContent = `${primaryQuotedLink} ${originalContent}`;
            } else {
                originalContent = originalContent.replace(quoteMatch[0], '').trim();
                originalContent = `>>${quotedPostNumber} ${originalContent}`;
            }
        }

        const referenceMatch = originalContent.match(/^\^(\d+)\s+(.+)/); // 番号とメッセージを別々にマッチさせる
        let first;
        if (referenceMatch) {
            const referencedPostNumber = referenceMatch[1];
            const referencedMessage = referenceMatch[2]; // メッセージ部分を取得
            first = referencedMessage;
            let referencedPost;
            if ( isThreadAnonymous|| isThreadNonAnonymous) {
                referencedPost = await Thread.findOne({ postCounter: referencedPostNumber });
            } if (isTimelineAnonymous || isTimelineNonAnonymous) {
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

        // ブラックリストにある単語を検閲
        let censoredOriginalContent = originalContent;
        blacklistedWords.forEach(word => {
            const regex = new RegExp(word, "gi");
            censoredOriginalContent = censoredOriginalContent.replace(regex, "*".repeat(word.length));
        });
        censoredOriginalContent = censoredOriginalContent.replace(/(https?:\/\/discord(?:\"|\.com)\/channels\/\d+\/\d+\/\d+)/gi, (match, p1) => {
            return `<${p1}>`;
        }).replace(/\.(?=https?:\/\/discord(?:\"|\.com)\/channels\/\d+\/\d+)/gi, (match) => {
            return match === '.' ? match : '';
        });

        // 二次コンテンツの検閲
        let censoredSecondaryContent;
        if (secondaryContent) {
            while ((imageURLMatch = imageURLRegex.exec(secondaryContent)) !== null) {
                attachedImageURLs.push(imageURLMatch[0]);
                secondaryContent = secondaryContent.replace(imageURLMatch[0], '');
            }
            while ((fileURLMatch = fileURLRegex.exec(secondaryContent)) !== null) {
                attachedFiles.push(fileURLMatch[0]);
                secondaryContent = secondaryContent.replace(fileURLMatch[0], '');
            }

            censoredSecondaryContent = secondaryContent;
            blacklistedWords.forEach(word => {
                const regex = new RegExp(word, "gi");
                censoredSecondaryContent = censoredSecondaryContent.replace(regex, "*".repeat(word.length));
            });
            censoredSecondaryContent = censoredSecondaryContent.replace(/(https?:\/\/discord(?:\"|\.com)\/channels\/\d+\/\d+\/\d+)/gi, (match, p1) => {
                return `<${p1}>`;
            }).replace(/\.(?=https?:\/\/discord(?:\"|\.com)\/channels\/\d+)/gi, (match) => {
                return match === '.' ? match : '';
            });
        }

        // ユーザーの一意のIDを生成
        const uniqueID = await getUniqueID(userID);
        const thread1 = await Thread.findOne({ userId: userID})
        // 匿名性に基づいて作者名を決定
        let authorName;
        if (isTimelineAnonymous || isThreadAnonymous) {
            authorName = `匿名ちゃん`;
        } else {
            authorName = `${message.author.username}`;
            if (thread1) {
                if (message.channel.parentId === thread1.channelIds.main || message.channel.parentId === thread1.channelIds.sub) {
                    const ownerEmoji = "<:owner:1220362869439467591>";
                    authorName = `${ownerEmoji} ${authorName}`;
                }
            }
            if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                const adminEmoji = "<:Admin:1249110303593992202>";
                authorName = `${adminEmoji} ${authorName}`;
            }
        }

        // 投稿の送信と記録
        const primaryServerId = message.guild.id;
        const secondaryServerId = serverIdMap[primaryServerId];

        const mainTimelineChannelId = message.channel.parentId;

        // First, find the Thread document where mainTimelineChannelId matches either main or sub channel ID
        let mainTimeline, subTimeline;
        const thread = await Thread.findOne({
            $or: [
                { 'channelIds.main': mainTimelineChannelId },
                { 'channelIds.sub': mainTimelineChannelId }
            ]
        });
            if (isTimelineAnonymous || isTimelineNonAnonymous) {
                mainTimeline = client.channels.cache.get(MAIN_TIMELINE_CHANNEL);
                subTimeline = client.channels.cache.get(SUB_TIMELINE_CHANNEL)
            } else if (isThreadAnonymous || isThreadNonAnonymous) {
                mainTimeline = client.channels.cache.get(message.channel.parentId)
                if (thread.channelIds.main === mainTimelineChannelId) {
                    subTimeline  = client.channels.cache.get(thread.channelIds.sub);
                } else {
                    subTimeline = client.channels.cache.get(thread.channelIds.main);
                }
            }

        let postContentMain = `\n\n\n${censoredOriginalContent || censoredSecondaryContent || ''}`;
        let postContentSub;
        if (censoredSecondaryContent) {
            postContentSub = `\n\n\n${censoredSecondaryContent}`;
        } else {
            postContentSub = `\n\n\n${censoredOriginalContent || censoredSecondaryContent || ''}`;
        }

        let postEmbedMain, postEmbedSub;
        let postCount;
        if (isThreadAnonymous || isThreadNonAnonymous) {
            const thread = await Thread.findOne({ 'channelIds.main': message.channel.parentId });
            if (thread) {
                postCount = thread.postCounter + 1; // Increment post counter
                console.log(postCount);
                thread.postCounter = postCount; // Update post counter in thread object
                await thread.save(); // Save updated thread object to database
            } else {
                console.error('Thread not found for channel:', message.channel.parentId);
            }

            postEmbedMain = new EmbedBuilder()
                .setTimestamp()
                .setColor(0x2b2d31)
                .setTitle(`[${thread.postCounter}] ${authorName}`)
                .setDescription(postContentMain);

            postEmbedSub = new EmbedBuilder()
                .setTimestamp()
                .setColor(0x2b2d31)
                .setTitle(`[${thread.postCounter}] ${authorName}`)
                .setDescription(postContentSub);
        } 
        if (isTimelineAnonymous || isTimelineNonAnonymous) {
            postCount = globalPostCount.postCount;
            postEmbedMain = new EmbedBuilder()
                .setTimestamp()
                .setColor(0x2b2d31)
                .setTitle(`[${globalPostCount.postCount}] ${authorName}`)
                .setDescription(postContentMain);

            postEmbedSub = new EmbedBuilder()
                .setTimestamp()
                .setColor(0x2b2d31)
                .setTitle(`[${globalPostCount.postCount}] ${authorName}`)
                .setDescription(postContentSub);
        }

        if (isThreadAnonymous || isTimelineAnonymous) {
            postEmbedMain.setThumbnail("https://media.discordapp.net/attachments/1220269370580795482/1250382302073327738/OIG2.hBuT.jpg?ex=666abcc3&is=66696b43&hm=91c2d82b0b13e6ec5f6e9f08dfa861f904ed80d158d4ef54d2233e84e6cf2438&=&format=webp&width=595&height=595");
            if (subTimeline) {
                postEmbedSub.setThumbnail("https://media.discordapp.net/attachments/1220269370580795482/1250382302073327738/OIG2.hBuT.jpg?ex=666abcc3&is=66696b43&hm=91c2d82b0b13e6ec5f6e9f08dfa861f904ed80d158d4ef54d2233e84e6cf2438&=&format=webp&width=595&height=595");
            }
        } else {
            postEmbedMain.setThumbnail(message.author.displayAvatarURL());
            if (subTimeline) {
                postEmbedSub.setThumbnail(message.author.displayAvatarURL());
            }
        }

        const message1 = await mainTimeline.send({ embeds: [postEmbedMain] });
        const emojis = ["❤", "😂", "🥺"];
        for (const emoji of emojis) {
            message1.react(emoji);
        }
        if (subTimeline) {
            const message2 = await subTimeline.send({ embeds: [postEmbedSub] });
            for (const emoji of emojis) {
                message2.react(emoji);
            }
            
            if (first) {
                if (isThreadAnonymous || isThreadNonAnonymous) {
                    await updatePostURLs(true, message1, message2, postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, first, message.channel.parentId);
                } else {
                    await updatePostURLs(false, message1, message2,postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, first, message.channel.parentId);
                }
                
            } else {
                if (isThreadAnonymous || isThreadNonAnonymous) {
                    await updatePostURLs(true, message1, message2, postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, censoredOriginalContent, message.channel.parentId);
                } else {
                    await updatePostURLs(false, message1, message2, postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, censoredOriginalContent, message.channel.parentId);
                }
            }
        } else {
            if (first) {
                if (isThreadAnonymous || isThreadNonAnonymous) {
                    await updatePostURLs(true, message1, null, postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, first, message.channel.parentId);
                } else {
                    await updatePostURLs(false, message1, null, postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, first, message.channel.parentId);
                }
            } else {
                if (isThreadAnonymous || isThreadNonAnonymous) {
                    await updatePostURLs(true, message1, message2, postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, censoredOriginalContent, message.channel.parentId);
                } else {
                    await updatePostURLs(false, message1, message2, postCount, userID, authorName, attachedImageURLs[0], message.guildId, serverIdMap[message.guildId], uniqueID, censoredOriginalContent, message.channel.parentId);
                }
            }
        }

        for (const url of attachedImageURLs) {
            await mainTimeline.send(url);
            if (subTimeline) await subTimeline.send(url);
        }
        for (const url of attachedFiles) {
            await mainTimeline.send(url);
            if (subTimeline) await subTimeline.send(url);
        }
        if (isTimelineAnonymous || isTimelineNonAnonymous) {
            await sendButton(false, MAIN_SERVER_ID);
            await sendButton(true, MAIN_SERVER_ID);
            if (subTimeline) await sendButton(false, SUB_SERVER_ID);
            if (subTimeline) await sendButton(true, SUB_SERVER_ID);
        }
        if (isThreadAnonymous || isThreadNonAnonymous) {
            await sendButtonToThread(false, message.channel.parentId)
            await sendButtonToThread(true, message.channel.parentId) 
        }
        // 投稿をログチャンネルに記録
        const logChannel = client.channels.cache.get(process.env.LOGCHANNEL);
        const logEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('投稿ログ')
            .addFields(
                { name: '匿名', value: isTimelineAnonymous || isThreadAnonymous ? 'Yes' : 'No', inline: true },
                { name: 'ユーザーネーム', value: message.author.username, inline: true },
                { name: 'ユーザーID', value: message.author.id, inline: true },
                { name: '投稿内容', value: message.content },
                { name: 'タイムスタンプ', value: new Date().toLocaleString() }
            )
            .setTimestamp();
        logChannel.send({ embeds: [logEmbed] });

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
                        if (interaction.channelId === MAIN_TIMELINE_CHANNEL || interaction.channelId === SUB_TIMELINE_CHANNEL) {
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
                    
                        const parentChannel = client.channels.cache.get(thread.id); // 親チャンネルを取得

                        if (parentChannel) {
                            const threadMessage = new EmbedBuilder()
                                .setDescription(`**${isAnonymous ? '匿名' : interaction.user.username}** さんがこのスレッドを作成しました。ここにメッセージを入力してください。`)
                                .setColor(0x2b2d31)
                                .setTimestamp();

                            await parentChannel.send({ embeds: [threadMessage] });

                            // 匿名、非匿名の両方のチャンネルにメッセージを送信
                            if (isAnonymous) {
                                const anonymousChannel = client.channels.cache.get('匿名チャンネルのID');
                                if (anonymousChannel) {
                                    await anonymousChannel.send({ embeds: [threadMessage] });
                                }
                            } else {
                                const nonAnonymousChannel = client.channels.cache.get('非匿名チャンネルのID');
                                if (nonAnonymousChannel) {
                                    await nonAnonymousChannel.send({ embeds: [threadMessage] });
                                }
                            }
                        }

                    
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
                            for (const channelId of Object.values(thread.channelIds)) {
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
                const reportContent = interaction.fields.getTextInputValue("reportInput"); // 通報内容を取得
        
                const reportChannel = client.channels.cache.get(process.env.REPORT_CHANNEL_ID); // 'REPORT_CHANNEL_ID'を実際の通報用チャンネルのIDに置き換えてください
        
                const reportEmbed = new EmbedBuilder()
                    .setTitle('新しい通報がありました！')
                    .addFields(
                        { name: '通報内容', value: reportContent },
                        { name: '通報者', value: interaction.user.tag },
                    )
                    .setTimestamp();
        
                await reportChannel.send({ embeds: [reportEmbed] });
        
                await interaction.reply({ content: '通報が送信されました。ありがとうございます。', ephemeral: true });
            }
            if (interaction.customId === "threadModal") {
                await interaction.deferReply({ ephemeral: true });
                const threadTitle = interaction.fields.getTextInputValue("threadTitle");
                const threadRule= interaction.fields.getTextInputValue("ruleInput");
                const mainParentCategoryId = MAIN_THREAD_PEARENT;
                const subParentCategoryId = SUB_THREAD_PEARENT;

                const serverList = [MAIN_SERVER_ID, SUB_SERVER_ID];

                const createdChannels = await Promise.all(serverList.map(async serverId => {
                    const guild = client.guilds.cache.get(serverId);
                    if (!guild) return null;

                    let parentCategoryId;
                    if (serverId === MAIN_SERVER_ID) {
                        parentCategoryId = mainParentCategoryId;
                    } else if (serverId === SUB_SERVER_ID) {
                        parentCategoryId = subParentCategoryId;
                    }

                    const category = guild.channels.cache.get(parentCategoryId);
                    if (!category) return null;

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
                        .setColor(0x2b2d31)

                    await newChannel.send({embeds: [ruleEmbed]})

                    return { serverId, channelId: newChannel.id };
                }));

                const mainChannel = createdChannels.find(channel => channel && channel.serverId === MAIN_SERVER_ID);
                const subChannel = createdChannels.find(channel => channel && channel.serverId === SUB_SERVER_ID);

                if (mainChannel && subChannel) {
                    const newThread = new Thread({
                        userId: userId,
                        channelIds: {
                            main: mainChannel.channelId,
                            sub: subChannel.channelId
                        },
                        threadName: threadTitle,
                        postCounter: 0,
                    });
                    await newThread.save();

                    await sendButtonToThread(true, mainChannel.channelId);

                    await interaction.editReply({ content: `スレッド '${threadTitle}' が作成されました！`, ephemeral: true });
                } else {
                    await interaction.editReply({ content: "スレッドの作成に失敗しました。", ephemeral: true });
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
});

client.login(process.env.BOT_TOKEN);
