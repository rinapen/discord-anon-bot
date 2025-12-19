import "dotenv/config";

export const config = {
    BOT_TOKEN: process.env.BOT_TOKEN || process.env.MAIN_BOT_TOKEN, // Botのトークン
    MAIN_SERVER_ID: process.env.MAIN_SERVER_ID, // メインDiscordサーバーのID
    MAIN_TIMELINE_CHANNEL: process.env.MAIN_TIMELINE_CHANNEL, // 投稿するチャンネルのID
    MAIN_THREAD_PARENT: process.env.MAIN_THREAD_PARENT, // スレッドを格納するカテゴリのID
    LOG_CHANNEL_ID: process.env.LOGCHANNEL || process.env.LOG_CHANNEL_ID, // ログを送信するチャンネルのID 
    REPORT_CHANNEL_ID: process.env.REPORT_CHANNEL_ID, // 通報内容を送信するチャンネルのID
    MONGODB_URI: process.env.MONGODB_URL || process.env.MONGODB_URI, // データを保存するMongoDBのURI
    DB_NAME: process.env.DB_NAME || "discord-anon-bot"
}