import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config();

let isConnect = false;
export const connectMongoDB = async (uri: string): Promise<void> => {
    if (isConnect) return;
    try {
        const client = new MongoClient(uri!, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
        client.connect();
        isConnect = true;
        console.log('[✓] MongoDB接続に成功しました。');
    } catch (err) {
        console.error('[×] MongoDB接続に失敗しました:', err)
        throw err;
    }
}