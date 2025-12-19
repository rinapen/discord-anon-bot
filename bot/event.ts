import { config } from "../config";
import { connectMongoDB } from "../lib/MongoDB";
import { client } from "./BotClient";
import { sendButton } from "./buttonManager";
import schedule from "node-schedule";
import { UniqueID } from "../models/UniqueID";

export async function initialize(): Promise<void> {
    if (config.MONGODB_URI) {
        await connectMongoDB(config.MONGODB_URI!);
    } else {
        console.log("[×] MONGODB_URIが設定されていません。")
    }
    client.user?.setActivity({ name: 'Created by rinapen'});
    console.log(`[✓] ログインに成功しました: [${client.user?.tag}]`);
    
    try {
        await sendButton(true);
        console.log('✅ 初期ボタンを送信しました');
    } catch (err) {
        console.error('❌ 初期ボタンの送信に失敗:', err);
    }

    // Schedule the updateUniqueIDs function to run daily at midnight
    schedule.scheduleJob('0 0 * * *', async () => {
        console.log('Updating unique IDs...');
        await UniqueID.updateAll();
        console.log('Unique IDs updated.');
    });
}