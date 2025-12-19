import {
    Message,
    TextChannel,
    EmbedBuilder,
    PermissionsBitField,
    GuildMember
} from "discord.js";
import { client } from "./BotClient";
import { config } from "../config";
import {
    CHANNEL_PREFIXES,
    REGEX,
    EMBED_COLOR,
    ANONYMOUS_THUMBNAIL,
    REACTION_EMOJIS,
    OWNER_EMOJI,
    ADMIN_EMOJI
} from "./constant";
import { Post } from "../models/Post";
import { Thread } from "../models/Thread";
import { ThreadPost } from "../models/ThreadPost";
import { GlobalPostCount } from "../models/GlobalPostCount";
import { UniqueID } from "../models/UniqueID";
import { sendButton, sendButtonToThread } from "./buttonManager";
import blacklistedWords from "../blacklist";

const blacklistRegexes = blacklistedWords.map((word: string) => ({
    word: word,
    regex: new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi")
}));

export async function handleMessage(message: Message): Promise<void> {
    try {
        // ボットのメッセージを無視する
        if (message.author.bot) return;

        // サーバーがメインサーバーでない場合は無視
        if (message.guild?.id !== config.MAIN_SERVER_ID) return;

        // チャンネル名を取得し、匿名・非匿名およびスレッドかどうかを判定する
        const channelName = message.channel instanceof TextChannel ? message.channel.name : "";
        const isTimelineAnonymous = channelName.startsWith(CHANNEL_PREFIXES.TIMELINE_ANONYMOUS);
        const isTimelineNonAnonymous = channelName.startsWith(CHANNEL_PREFIXES.TIMELINE_NON_ANONYMOUS);
        const isThreadAnonymous = channelName.startsWith(CHANNEL_PREFIXES.THREAD_ANONYMOUS);
        const isThreadNonAnonymous = channelName.startsWith(CHANNEL_PREFIXES.THREAD_NON_ANONYMOUS);

        // 匿名・非匿名のタイムラインまたはスレッドでないチャンネルの場合は終了
        if (!isTimelineAnonymous && !isTimelineNonAnonymous && !isThreadAnonymous && !isThreadNonAnonymous) return;

        // 共通処理
        const userID = message.author.id;
        let originalContent = message.content || "";
        let attachedImageURLs: string[] = [];
        let attachedFiles: string[] = [];

        const getParentId = (): string | null => {
            if ('parentId' in message.channel && message.channel.parentId) {
                return message.channel.parentId;
            }
            return null;
        };

        // 引用投稿の処理
        const quoteMatch = originalContent.match(REGEX.QUOTE);
        if (quoteMatch) {
            const quotedPostNumber = quoteMatch[0].replace('>>', '');
            let referencedPost;
            if (isTimelineAnonymous || isTimelineNonAnonymous) {
                referencedPost = await Post.findByPostCount(parseInt(quotedPostNumber));
            } else if (isThreadAnonymous || isThreadNonAnonymous) {
                referencedPost = await ThreadPost.findByPostCount(parseInt(quotedPostNumber));
            }

            if (referencedPost && referencedPost.url) {
                const primaryServerId = message.guildId!;
                const urlMap = referencedPost.url instanceof Map 
                    ? referencedPost.url 
                    : new Map(Object.entries(referencedPost.url));
                const primaryServerPostLink = urlMap.get(primaryServerId);

                if (primaryServerPostLink) {
                    const primaryQuotedLink = `[>>${quotedPostNumber}](${primaryServerPostLink})`;
                    originalContent = originalContent.replace(quoteMatch[0], '').trim();
                    originalContent = `${primaryQuotedLink} ${originalContent}`;
                } else {
                    originalContent = originalContent.replace(quoteMatch[0], '').trim();
                    originalContent = `>>${quotedPostNumber} ${originalContent}`;
                }
            } else {
                originalContent = originalContent.replace(quoteMatch[0], '').trim();
                originalContent = `>>${quotedPostNumber} ${originalContent}`;
            }
        }

        const referenceMatch = originalContent.match(REGEX.REFERENCE);
        let first: string | undefined;
        if (referenceMatch) {
            const referencedPostNumber = referenceMatch[1];
            const referencedMessage = referenceMatch[2];
            first = referencedMessage;
            let referencedPost: any;
            if (isThreadAnonymous || isThreadNonAnonymous) {
                const parentId = getParentId();
                if (parentId) {
                    const threadRef = await Thread.findByChannelId(parentId);
                    if (threadRef && (threadRef as any).postCounter === parseInt(referencedPostNumber)) {
                        // スレッドの投稿を参照する場合はThreadPostから取得
                        referencedPost = await ThreadPost.findByPostCount(parseInt(referencedPostNumber));
                    } else {
                        referencedPost = await ThreadPost.findByPostCount(parseInt(referencedPostNumber));
                    }
                } else {
                    referencedPost = await ThreadPost.findByPostCount(parseInt(referencedPostNumber));
                }
            } else if (isTimelineAnonymous || isTimelineNonAnonymous) {
                referencedPost = await Post.findByPostCount(parseInt(referencedPostNumber));
            }
            
            if (referencedPost && referencedPost.content && !referencedPost.isQuoted) {
                const referencedContent = referencedPost.content;
                const referencedAuthorName = referencedPost.authorName || "匿名ちゃん";
                const borderedContent = `**${referencedMessage}**\n---------------------------\n[${referencedPostNumber}] ${referencedAuthorName}\n\n${referencedContent}\n---------------------------`;
                originalContent = borderedContent;
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
                if (attachment.contentType?.includes("image") || attachment.contentType?.includes("video")) {
                    attachedImageURLs.push(attachment.url);
                } else {
                    attachedFiles.push(attachment.url);
                }
            });
        }

        // グローバル投稿カウントを増加
        const postCount = await GlobalPostCount.increment();

        // ブラックリストにある単語を検閲（事前コンパイル済みの正規表現を使用）
        let censoredOriginalContent = originalContent;
        blacklistRegexes.forEach(({ word, regex }) => {
            censoredOriginalContent = censoredOriginalContent.replace(regex, "*".repeat(word.length));
        });
        censoredOriginalContent = censoredOriginalContent.replace(/(https?:\/\/discord(?:"|\.com)\/channels\/\d+\/\d+\/\d+)/gi, (match, p1) => {
            return `<${p1}>`;
        }).replace(/\.(?=https?:\/\/discord(?:"|\.com)\/channels\/\d+\/\d+)/gi, (match) => {
            return match === '.' ? match : '';
        });

        // ユーザーの一意のIDを生成
        const uniqueID = await UniqueID.getOrCreate(userID);
        const thread1 = await Thread.findByUserId(userID);

        // 匿名性に基づいて作者名を決定
        let authorName: string;
        if (isTimelineAnonymous || isThreadAnonymous) {
            authorName = `匿名ちゃん`;
        } else {
            authorName = message.author.username;
            const parentId = getParentId();
            if (thread1 && parentId === thread1.channelIds.main) {
                authorName = `${OWNER_EMOJI} ${authorName}`;
            }
            if (message.member?.permissions.has(PermissionsBitField.Flags.Administrator)) {
                authorName = `${ADMIN_EMOJI} ${authorName}`;
            }
        }

        // 投稿の送信と記録
        if (!message.guild) {
            console.error('Message is not from a guild');
            return;
        }
        const primaryServerId = message.guild.id;

        let mainTimeline: TextChannel | null = null;
        let finalPostCount: number;
        let threadData: any = null;

        if (isTimelineAnonymous || isTimelineNonAnonymous) {
            mainTimeline = client.channels.cache.get(config.MAIN_TIMELINE_CHANNEL!) as TextChannel;
            finalPostCount = postCount;
        } else if (isThreadAnonymous || isThreadNonAnonymous) {
            const mainTimelineChannelId = getParentId();
            if (!mainTimelineChannelId) {
                console.error('Parent channel ID not found');
                return;
            }
            mainTimeline = client.channels.cache.get(mainTimelineChannelId) as TextChannel;

            threadData = await Thread.findByChannelId(mainTimelineChannelId);
            if (threadData) {
                finalPostCount = threadData.postCounter + 1;
                await Thread.collection().updateOne(
                    { _id: (threadData as any)._id },
                    { $set: { postCounter: finalPostCount } }
                );
            } else {
                console.error('Thread not found for channel:', mainTimelineChannelId);
                return;
            }
        } else {
            return;
        }

        if (!mainTimeline) {
            console.error('Main timeline channel not found');
            return;
        }

        let postContent = `\n\n\n${censoredOriginalContent || ''}`;

        let postEmbed = new EmbedBuilder()
            .setTimestamp()
            .setColor(EMBED_COLOR)
            .setTitle(`[${finalPostCount}] ${authorName}`)
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
        const messageURL = `https://discord.com/channels/${sentMessage.guild?.id}/${sentMessage.channel.id}/${sentMessage.id}`;

        if (isThread) {
            const existingThreadPost = await ThreadPost.findByPostCount(finalPostCount);
            const urlMap = existingThreadPost?.url 
                ? (existingThreadPost.url instanceof Map 
                    ? existingThreadPost.url 
                    : new Map(Object.entries(existingThreadPost.url)))
                : new Map<string, string>();
            
            urlMap.set(primaryServerId, messageURL);
            
            await ThreadPost.upsert(
                { postCount: finalPostCount },
                {
                    channelId: getParentId() || "",
                    postCount: finalPostCount,
                    uniqueID: uniqueID,
                    author: userID,
                    authorName: authorName,
                    content: contentToStore,
                    url: Object.fromEntries(urlMap),
                    imageURL: attachedImageURLs[0]
                }
            );
        } else {
            const existingPost = await Post.findByPostCount(finalPostCount);
            const urlMap = existingPost?.url 
                ? (existingPost.url instanceof Map 
                    ? existingPost.url 
                    : new Map(Object.entries(existingPost.url)))
                : new Map<string, string>();
            
            urlMap.set(primaryServerId, messageURL);
            
            await Post.upsert(
                { postCount: finalPostCount },
                {
                    postCount: finalPostCount,
                    uniqueID: uniqueID,
                    author: userID,
                    authorName: authorName,
                    content: contentToStore,
                    url: Object.fromEntries(urlMap),
                    imageURL: attachedImageURLs[0]
                }
            );
        }

        // 添付ファイルを並列送信（パフォーマンス向上）
        const allAttachments = [...attachedImageURLs, ...attachedFiles];
        await Promise.all(allAttachments.map(url => mainTimeline.send(url)));

        // ボタンの更新
        if (isTimelineAnonymous || isTimelineNonAnonymous) {
            await sendButton(true);
        } else if (isThreadAnonymous || isThreadNonAnonymous) {
            const parentId = getParentId();
            if (parentId) {
                await sendButtonToThread(true, parentId);
            }
        }

        // 投稿をログチャンネルに記録
        const logChannel = client.channels.cache.get(config.LOG_CHANNEL_ID!) as TextChannel;
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
}
