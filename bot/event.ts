import { config } from "../config";
import { connectMongoDB } from "../lib/MongoClient";
import { client } from "./client";

export async function initialize(): Promise<void> {
    if (config.MONGODB_URI) {
        await connectMongoDB(config.MONGODB_URI!);
    } else {
        console.log("[×] MONGODB_URIが設定されていません。")
    }
    client.user?.setActivity({ name: 'Created by rinapen'});
    console.log(`[✓] ログインに成功しました: [${client.user?.tag}]`);
}