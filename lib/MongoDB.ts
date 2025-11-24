import { Db, MongoClient, ServerApiVersion } from "mongodb";
import { config } from "../config";
require("dotenv").config();

let db: Db | null = null;
let mongoClient: MongoClient | null = null;

export const connectMongoDB = async (uri: string): Promise<Db> => {
    if (db) return db;    
    mongoClient = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    const client = await mongoClient.connect();
    console.log("[✓] MongoDB 接続に成功しました。");
    db = client.db(config.DB_NAME);
    return db;
};

export const getDB = (): Db => {
    if (!db) throw new Error("[×] MongoDBに接続されていません");
    return db;
};
