import {
    ButtonInteraction,
    ModalSubmitInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    EmbedBuilder,
    ChannelType,
    PermissionsBitField,
    TextChannel,
    ThreadChannel
} from "discord.js";
import { client } from "./BotClient";
import { config } from "../config";
import { EMBED_COLOR, ANONYMOUS_THUMBNAIL } from "./constant";
import { Thread } from "../models/Thread";
import { buttonMessageMap } from "./buttonManager";

export async function handleInteraction(interaction: ButtonInteraction | ModalSubmitInteraction): Promise<void> {
    try {
        if (interaction.isButton()) {
            await handleButtonInteraction(interaction);
        } else if (interaction.isModalSubmit()) {
            await handleModalInteraction(interaction);
        }
    } catch (error) {
        console.error("Error handling interaction:", error);
        if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: "エラーが発生しました。", ephemeral: true }).catch(() => {});
        }
    }
}

async function handleButtonInteraction(interaction: ButtonInteraction): Promise<void> {
    const userId = interaction.user.id;

    switch (interaction.customId) {
        case "report":
            await handleReportButton(interaction);
            break;
        case "post":
            await handlePostButton(interaction);
            break;
        case "threadButton":
            await handleThreadButton(interaction);
            break;
        case "delete":
            await handleDeleteButton(interaction);
            break;
    }
}

async function handleReportButton(interaction: ButtonInteraction): Promise<void> {
    const modal = new ModalBuilder()
        .setCustomId("sendreport")
        .setTitle('通報');

    const reportInput = new TextInputBuilder()
        .setCustomId('reportInput')
        .setLabel("通報内容")
        .setMaxLength(1000)
        .setPlaceholder("例: 〇〇番の投稿が卑猥です！消してください。")
        .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(reportInput);
    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
}

async function handlePostButton(interaction: ButtonInteraction): Promise<void> {
    try {
        await interaction.deferReply({ ephemeral: true });

        const createThread = async (isAnonymous: boolean): Promise<boolean> => {
            let threadName: string;
            const channel = interaction.channel;
            
            if (channel?.id === config.MAIN_TIMELINE_CHANNEL) {
                threadName = isAnonymous ? `匿名-${userId}` : `非匿名-${userId}`;
            } else if (channel && 'name' in channel && channel.name && channel.name.includes('t-')) {
                threadName = isAnonymous ? `匿名-${userId}` : `非匿名-${userId}`;
            } else {
                threadName = isAnonymous ? `t-匿名-${userId}` : `t-非匿名-${userId}`;
            }

            if (!channel || !('threads' in channel)) {
                return false;
            }

            const existingThread = channel.threads.cache.find(thread =>
                thread.name === threadName && !thread.archived
            );

            if (existingThread) {
                return false;
            }

            const threadOptions: any = {
                name: threadName,
                autoArchiveDuration: 1440,
                reason: 'User requested thread'
            };
            if ('threads' in channel && 'create' in (channel as any).threads) {
                threadOptions.type = ChannelType.PrivateThread;
            }
            const thread = await (channel as any).threads.create(threadOptions);

            await thread.setRateLimitPerUser(5);
            await thread.members.add(interaction.user.id);

            const threadMessage = new EmbedBuilder()
                .setDescription(`**${isAnonymous ? '匿名' : interaction.user.username}** さんがこのスレッドを作成しました。ここにメッセージを入力してください。`)
                .setColor(EMBED_COLOR)
                .setTimestamp();

            await thread.send({ embeds: [threadMessage] });

            const filter = (m: any) => m.author.id === interaction.user.id;
            const collector = thread.createMessageCollector({ filter, idle: 300000 });

            collector.on('end', async () => {
                if (!thread.archived) {
                    await thread.setArchived(true);
                }
            });

            return true;
        };

        const userId = interaction.user.id;
        const anonymousThreadCreated = await createThread(true);
        const nonAnonymousThreadCreated = await createThread(false);

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
        console.error('Error handling post button:', error);
        if (interaction.deferred) {
            await interaction.editReply({ content: 'スレッドの作成中にエラーが発生しました。' }).catch(() => {});
        }
    }
}

async function handleThreadButton(interaction: ButtonInteraction): Promise<void> {
    const userId = interaction.user.id;
    const existingThread = await Thread.findByUserId(userId);
    
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

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(ruleInput);

    modal.addComponents(firstActionRow, secondActionRow);
    await interaction.showModal(modal);
}

async function handleDeleteButton(interaction: ButtonInteraction): Promise<void> {
    try {
        await interaction.reply({ content: 'スレッドを削除しています。', ephemeral: true });
        const userId = interaction.user.id;
        const threads = await Thread.collection().find({ userId }).toArray();
        
        if (threads.length > 0) {
            for (const thread of threads) {
                const channelId = thread.channelIds.main;
                const channel = client.channels.cache.get(channelId) as TextChannel;
                
                if (channel) {
                    try {
                        const activeThreads = await channel.threads.fetchActive();
                        for (const [, derivedThread] of activeThreads.threads) {
                            await derivedThread.delete();
                        }
                    } catch (error) {
                        console.error(`Error fetching or deleting derived threads for channel ${channelId}:`, error);
                    }

                    try {
                        await channel.delete();
                    } catch (error: any) {
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
            await Thread.collection().deleteMany({ userId });
            await interaction.editReply({ content: 'スレッドを削除しました。' });
        } else {
            await interaction.editReply({ content: 'スレッドがありません。' });
        }
    } catch (error) {
        console.error('スレッドの削除中にエラーが発生しました:', error);
        await interaction.editReply({ content: 'スレッドの削除中にエラーが発生しました。' }).catch(() => {});
    }
}

async function handleModalInteraction(interaction: ModalSubmitInteraction): Promise<void> {
    switch (interaction.customId) {
        case 'sendreport':
            await handleReportModal(interaction);
            break;
        case 'threadModal':
            await handleThreadModal(interaction);
            break;
    }
}

async function handleReportModal(interaction: ModalSubmitInteraction): Promise<void> {
    await interaction.deferReply({ ephemeral: true });
    const reportContent = interaction.fields.getTextInputValue("reportInput");

    const reportChannel = client.channels.cache.get(config.REPORT_CHANNEL_ID!) as TextChannel;

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

async function handleThreadModal(interaction: ModalSubmitInteraction): Promise<void> {
    await interaction.deferReply({ ephemeral: true });
    const threadTitle = interaction.fields.getTextInputValue("threadTitle");
    const threadRule = interaction.fields.getTextInputValue("ruleInput");
    const mainParentCategoryId = config.MAIN_THREAD_PARENT;

    const guild = client.guilds.cache.get(config.MAIN_SERVER_ID!);
    if (!guild) {
        await interaction.editReply({ content: "サーバーが見つかりません。" });
        return;
    }

    const category = guild.channels.cache.get(mainParentCategoryId!);
    if (!category) {
        await interaction.editReply({ content: "カテゴリが見つかりません。" });
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
        parent: category.id,
        permissionOverwrites: permissions
    }) as TextChannel;

    const ruleEmbed = new EmbedBuilder()
        .setTitle(threadRule)
        .setColor(EMBED_COLOR);

    await newChannel.send({ embeds: [ruleEmbed] });

    const userId = interaction.user.id;
    const newThread = {
        userId: userId,
        channelIds: {
            main: newChannel.id
        },
        threadName: threadTitle,
        postCounter: 0,
    };
    await Thread.create(newThread);

    const { sendButtonToThread } = await import("./buttonManager");
    await sendButtonToThread(true, newChannel.id);

    await interaction.editReply({ content: `スレッド '${threadTitle}' が作成されました！` });
}

