export const config = {
    BOT_ID: process.env.BOT_ID, // BotのユーザーID
    BOT_TOKEN: process.env.BOT_TOKEN, // Botのトークン
    GUILD_ID: process.env.GUILD_ID, // DiscordサーバーのID
    TIMELINE_CHANNEL_ID: process.env.TIMELINE_CHANNEL_ID, // 投稿するチャンネルのID
    LOG_CHANNEL_ID: process.env.LOG_CHANNEL_ID, // ログを送信するチャンネルのID 
    REPORT_CHANNEL_ID: process.env.REPORT_CHANNEL_ID, // 通報内容を送信するチャンネルのID
    MONGODB_URI: process.env.MONGODB_URI // データを保存するMongoDBのURI
}