import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config();

let mongoClient: MongoClient | null = null;

export const connectMongoDB = async (uri: string): Promise<MongoClient> => {
    if (mongoClient) return mongoClient;

    mongoClient = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await mongoClient.connect();
    console.log("[✓] MongoDB 接続に成功しました。");

    return mongoClient;
};

export const getMongoClient = (): MongoClient => {
    if (!mongoClient) throw new Error("[×] MongoDBに接続されていません");
    return mongoClient;
};
